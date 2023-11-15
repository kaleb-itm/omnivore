import Models
import Services
import SwiftUI
import Views

@MainActor final class SubscriptionsViewModel: ObservableObject {
  @Published var isLoading = true
  @Published var subscriptions = [Subscription]()
  @Published var popularSubscriptions = [Subscription]()
  @Published var hasNetworkError = false
  @Published var subscriptionNameToCancel: String?

  func loadSubscriptions(dataService: DataService) async {
    isLoading = true

    do {
      subscriptions = try await dataService.subscriptions().filter { $0.status == SubscriptionStatus.active }
    } catch {
      hasNetworkError = true
    }

    isLoading = false
  }

  func cancelSubscription(dataService: DataService) async -> Bool {
    guard let subscriptionName = subscriptionNameToCancel else { return false }

    do {
      try await dataService.deleteSubscription(subscriptionName: subscriptionName)
      let index = subscriptions.firstIndex { $0.name == subscriptionName }
      if let index = index {
        subscriptions.remove(at: index)
      }
      return true
    } catch {
      appLogger.debug("failed to remove subscription")
      return false
    }
  }
}

struct SubscriptionsView: View {
  @EnvironmentObject var dataService: DataService
  @StateObject var viewModel = SubscriptionsViewModel()
  @State private var deleteConfirmationShown = false
  @State private var progressViewOpacity = 0.0

  var body: some View {
    Group {
      if viewModel.isLoading {
        ProgressView()
          .opacity(progressViewOpacity)
          .onAppear {
            DispatchQueue.main.asyncAfter(deadline: .now() + .milliseconds(1000)) {
              progressViewOpacity = 1
            }
          }
          .task { await viewModel.loadSubscriptions(dataService: dataService) }
      } else if viewModel.hasNetworkError {
        VStack {
          Text(LocalText.subscriptionsErrorRetrieving).multilineTextAlignment(.center)
          Button(
            action: { Task { await viewModel.loadSubscriptions(dataService: dataService) } },
            label: { Text(LocalText.genericRetry) }
          )
          .buttonStyle(RoundedRectButtonStyle())
        }
      } else if viewModel.subscriptions.isEmpty {
        VStack(alignment: .center) {
          Spacer()
          Text(LocalText.subscriptionsNone)
          Spacer()
        }
      } else {
        Group {
          #if os(iOS)
            Form {
              innerBody
            }
          #elseif os(macOS)
            List {
              innerBody
            }
            .listStyle(InsetListStyle())
          #endif
        }
      }
    }
    .navigationTitle("Subscriptions")
    #if os(iOS)
      .navigationBarTitleDisplayMode(.inline)
    #endif
  }

  private var innerBody: some View {
    Group {
      ForEach(viewModel.subscriptions, id: \.subscriptionID) { subscription in
        SubscriptionCell(subscription: subscription)
          .swipeActions(edge: .trailing) {
            Button(
              role: .destructive,
              action: {
                deleteConfirmationShown = true
                viewModel.subscriptionNameToCancel = subscription.name
              },
              label: {
                Image(systemName: "trash")
              }
            )
          }
      }
    }
    .alert("Are you sure you want to cancel this subscription?", isPresented: $deleteConfirmationShown) {
      Button("Yes", role: .destructive) {
        Task {
          let unsubscribed = await viewModel.cancelSubscription(dataService: dataService)
          // Snackbar.show(message: unsubscribed ? "Subscription cancelled." : "Could not unsubscribe.")
        }
      }
      Button("No", role: .cancel) {
        viewModel.subscriptionNameToCancel = nil
      }
    }
    .navigationTitle(LocalText.subscriptionsGeneric)
  }
}

struct SubscriptionCell: View {
  let subscription: Subscription

  var body: some View {
    HStack {
      VStack(alignment: .leading, spacing: 6) {
        Text(subscription.name)
          .font(.appCallout)
          .lineSpacing(1.25)
          .foregroundColor(.appGrayTextContrast)
          .fixedSize(horizontal: false, vertical: true)

        if let updatedDate = subscription.updatedAt {
          Text("Last received: \(updatedDate.formatted())")
            .font(.appCaption)
            .foregroundColor(.appGrayText)
            .fixedSize(horizontal: false, vertical: true)
        }
      }
      .multilineTextAlignment(.leading)
      .padding(.vertical, 8)

      Spacer()

      Group {
        if let icon = subscription.icon, let imageURL = URL(string: icon) {
          AsyncImage(url: imageURL) { phase in
            if let image = phase.image {
              image
                .resizable()
                .aspectRatio(contentMode: .fill)
                .frame(width: 40, height: 40)
                .cornerRadius(6)
            } else if phase.error != nil {
              EmptyView().frame(width: 40, height: 40, alignment: .top)
            } else {
              Color.appButtonBackground
                .frame(width: 40, height: 40)
                .cornerRadius(2)
            }
          }
        }
      }.frame(minHeight: 50)
    }
  }
}
