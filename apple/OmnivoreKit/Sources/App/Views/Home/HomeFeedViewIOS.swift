import Combine
import Models
import Services
import SwiftUI
import UserNotifications
import Utils
import Views

#if os(iOS)
  struct HomeFeedContainerView: View {
    @EnvironmentObject var dataService: DataService
    @AppStorage(UserDefaultKey.homeFeedlayoutPreference.rawValue) var prefersListLayout = UIDevice.isIPhone
    @State private var searchQuery = ""
    @State private var snoozePresented = false
    @State private var itemToSnooze: FeedItem?
    @State private var selectedLinkItem: FeedItem?
    @ObservedObject var viewModel: HomeFeedViewModel

    var body: some View {
      Group {
        HomeFeedView(
          prefersListLayout: $prefersListLayout,
          searchQuery: $searchQuery,
          selectedLinkItem: $selectedLinkItem,
          snoozePresented: $snoozePresented,
          itemToSnooze: $itemToSnooze,
          viewModel: viewModel
        )
        .refreshable {
          viewModel.loadItems(dataService: dataService, searchQuery: searchQuery, isRefresh: true)
        }
        .searchable(
          text: $searchQuery,
          placement: .sidebar
        ) {
          if searchQuery.isEmpty {
            Text("Inbox").searchCompletion("in:inbox ")
            Text("All").searchCompletion("in:all ")
            Text("Archived").searchCompletion("in:archive ")
            Text("Files").searchCompletion("type:file ")
          }
        }
        .onChange(of: searchQuery) { _ in
          // Maybe we should debounce this, but
          // it feels like it works ok without
          viewModel.loadItems(dataService: dataService, searchQuery: searchQuery, isRefresh: true)
        }
        .onSubmit(of: .search) {
          viewModel.loadItems(dataService: dataService, searchQuery: searchQuery, isRefresh: true)
        }
      }
      .navigationTitle("Home")
      .onReceive(NotificationCenter.default.publisher(for: UIApplication.willEnterForegroundNotification)) { _ in
        // Don't refresh the list if the user is currently reading an article
        if selectedLinkItem == nil {
          viewModel.loadItems(dataService: dataService, searchQuery: searchQuery, isRefresh: true)
        }
      }
      .onReceive(NotificationCenter.default.publisher(for: Notification.Name("PushFeedItem"))) { notification in
        if let feedItem = notification.userInfo?["feedItem"] as? FeedItem {
          viewModel.pushFeedItem(item: feedItem)
          self.selectedLinkItem = feedItem
        }
      }
      .formSheet(isPresented: $snoozePresented) {
        SnoozeView(snoozePresented: $snoozePresented, itemToSnooze: $itemToSnooze) {
          viewModel.snoozeUntil(
            dataService: dataService,
            linkId: $0.feedItemId,
            until: $0.snoozeUntilDate,
            successMessage: $0.successMessage
          )
        }
      }
      .onAppear {
        if viewModel.items.isEmpty {
          viewModel.loadItems(dataService: dataService, searchQuery: searchQuery, isRefresh: true)
        }
      }
    }
  }

  struct HomeFeedView: View {
    @EnvironmentObject var dataService: DataService

    @Binding var prefersListLayout: Bool
    @Binding var searchQuery: String
    @Binding var selectedLinkItem: FeedItem?
    @Binding var snoozePresented: Bool
    @Binding var itemToSnooze: FeedItem?

    @ObservedObject var viewModel: HomeFeedViewModel

    var body: some View {
      if prefersListLayout {
        HomeFeedListView(
          prefersListLayout: $prefersListLayout,
          searchQuery: $searchQuery,
          selectedLinkItem: $selectedLinkItem,
          snoozePresented: $snoozePresented,
          itemToSnooze: $itemToSnooze,
          viewModel: viewModel
        )
      } else {
        HomeFeedGridView(
          searchQuery: $searchQuery,
          selectedLinkItem: $selectedLinkItem,
          snoozePresented: $snoozePresented,
          itemToSnooze: $itemToSnooze,
          viewModel: viewModel
        )
        .toolbar {
          ToolbarItem {
            Button("", action: {})
              .disabled(true)
              .overlay {
                if viewModel.isLoading {
                  ProgressView()
                }
              }
          }
          ToolbarItem {
            if UIDevice.isIPad {
              Button(
                action: { prefersListLayout.toggle() },
                label: {
                  Label("Toggle Feed Layout", systemImage: prefersListLayout ? "square.grid.2x2" : "list.bullet")
                }
              )
            }
          }
        }
      }
    }
  }

  struct HomeFeedListView: View {
    @EnvironmentObject var dataService: DataService
    @Binding var prefersListLayout: Bool
    @Binding var searchQuery: String
    @Binding var selectedLinkItem: FeedItem?
    @Binding var snoozePresented: Bool
    @Binding var itemToSnooze: FeedItem?

    @State private var itemToRemove: FeedItem?
    @State private var confirmationShown = false

    @ObservedObject var viewModel: HomeFeedViewModel

    var body: some View {
      List {
        Section {
          ForEach(viewModel.items) { item in
            FeedCardNavigationLink(
              item: item,
              searchQuery: searchQuery,
              selectedLinkItem: $selectedLinkItem,
              viewModel: viewModel
            )
            .contextMenu {
              Button(action: {
                withAnimation(.linear(duration: 0.4)) {
                  viewModel.setLinkArchived(dataService: dataService, linkId: item.id, archived: !item.isArchived)
                }
              }, label: {
                Label(
                  item.isArchived ? "Unarchive" : "Archive",
                  systemImage: item.isArchived ? "tray.and.arrow.down.fill" : "archivebox"
                )
              })
              Button(
                action: {
                  itemToRemove = item
                  confirmationShown = true
                },
                label: { Label("Delete", systemImage: "trash") }
              )
              if FeatureFlag.enableSnooze {
                Button {
                  itemToSnooze = item
                  snoozePresented = true
                } label: {
                  Label { Text("Snooze") } icon: { Image.moon }
                }
              }
            }
            .swipeActions(edge: .trailing, allowsFullSwipe: true) {
              if !item.isArchived {
                Button {
                  withAnimation(.linear(duration: 0.4)) {
                    viewModel.setLinkArchived(dataService: dataService, linkId: item.id, archived: true)
                  }
                } label: {
                  Label("Archive", systemImage: "archivebox")
                }.tint(.green)
              } else {
                Button {
                  withAnimation(.linear(duration: 0.4)) {
                    viewModel.setLinkArchived(dataService: dataService, linkId: item.id, archived: false)
                  }
                } label: {
                  Label("Unarchive", systemImage: "tray.and.arrow.down.fill")
                }.tint(.indigo)
              }
            }
            .swipeActions(edge: .trailing, allowsFullSwipe: true) {
              Button(
                role: .destructive,
                action: {
                  itemToRemove = item
                  confirmationShown = true
                },
                label: {
                  Image(systemName: "trash")
                }
              )
            }.alert("Are you sure?", isPresented: $confirmationShown) {
              Button("Remove Link", role: .destructive) {
                if let itemToRemove = itemToRemove {
                  withAnimation {
                    viewModel.removeLink(dataService: dataService, linkId: itemToRemove.id)
                  }
                }
                self.itemToRemove = nil
              }
              Button("Cancel", role: .cancel) { self.itemToRemove = nil }
            }
            .swipeActions(edge: .leading, allowsFullSwipe: true) {
              if FeatureFlag.enableSnooze {
                Button {
                  itemToSnooze = item
                  snoozePresented = true
                } label: {
                  Label { Text("Snooze") } icon: { Image.moon }
                }.tint(.appYellow48)
              }
            }
          }
        }

        if viewModel.isLoading {
          LoadingSection()
        }
      }
      .listStyle(PlainListStyle())
      .toolbar {
        ToolbarItem {
          if UIDevice.isIPad {
            Button(
              action: { prefersListLayout.toggle() },
              label: {
                Label("Toggle Feed Layout", systemImage: prefersListLayout ? "square.grid.2x2" : "list.bullet")
              }
            )
          }
        }
      }
      .onAppear {
        viewModel.sendProgressUpdates = false
      }
    }
  }

  struct HomeFeedGridView: View {
    @EnvironmentObject var dataService: DataService
    @Binding var searchQuery: String
    @Binding var selectedLinkItem: FeedItem?
    @Binding var snoozePresented: Bool
    @Binding var itemToSnooze: FeedItem?

    @State private var itemToRemove: FeedItem?
    @State private var confirmationShown = false
    @State var isContextMenuOpen = false

    @ObservedObject var viewModel: HomeFeedViewModel

    func contextMenuActionHandler(item: FeedItem, action: GridCardAction) {
      switch action {
      case .toggleArchiveStatus:
        viewModel.setLinkArchived(dataService: dataService, linkId: item.id, archived: !item.isArchived)
      case .delete:
        itemToRemove = item
        confirmationShown = true
      }
    }

    var body: some View {
      ScrollView {
        LazyVGrid(columns: [GridItem(.adaptive(minimum: 325), spacing: 24)], spacing: 24) {
          ForEach(viewModel.items, id: \.renderID) { item in
            GridCardNavigationLink(
              item: item,
              searchQuery: searchQuery,
              actionHandler: { contextMenuActionHandler(item: item, action: $0) },
              selectedLinkItem: $selectedLinkItem,
              isContextMenuOpen: $isContextMenuOpen,
              viewModel: viewModel
            )
            .alert("Are you sure?", isPresented: $confirmationShown) {
              Button("Remove Link", role: .destructive) {
                if let itemToRemove = itemToRemove {
                  withAnimation {
                    viewModel.removeLink(dataService: dataService, linkId: itemToRemove.id)
                  }
                }
                self.itemToRemove = nil
              }
              Button("Cancel", role: .cancel) { self.itemToRemove = nil }
            }
          }
        }
        .padding()
        .background(
          GeometryReader {
            Color(.systemGroupedBackground).preference(
              key: ScrollViewOffsetPreferenceKey.self,
              value: $0.frame(in: .global).origin.y
            )
          }
        )
        .onPreferenceChange(ScrollViewOffsetPreferenceKey.self) { offset in
          DispatchQueue.main.async {
            if !viewModel.isLoading, offset > 240 {
              viewModel.loadItems(dataService: dataService, searchQuery: searchQuery, isRefresh: true)
            }
          }
        }

        if viewModel.items.isEmpty, viewModel.isLoading {
          LoadingSection()
        }
      }
      .onAppear {
        viewModel.sendProgressUpdates = true
      }
    }
  }

#endif

struct ScrollViewOffsetPreferenceKey: PreferenceKey {
  typealias Value = CGFloat
  static var defaultValue = CGFloat.zero
  static func reduce(value: inout Value, nextValue: () -> Value) {
    value += nextValue()
  }
}
