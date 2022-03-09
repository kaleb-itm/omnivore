import Models
import SwiftUI
import Utils

public enum GridCardAction {
  case toggleArchiveStatus
  case delete
}

public struct GridCard: View {
  @Binding var isContextMenuOpen: Bool
  let item: FeedItem
  let actionHandler: (GridCardAction) -> Void
  let tapAction: () -> Void

  public init(
    item: FeedItem,
    isContextMenuOpen: Binding<Bool>,
    actionHandler: @escaping (GridCardAction) -> Void,
    tapAction: @escaping () -> Void
  ) {
    self.item = item
    self._isContextMenuOpen = isContextMenuOpen
    self.actionHandler = actionHandler
    self.tapAction = tapAction
  }

  // Menu doesn't provide an API to observe it's open state
  // so we have keep track of it's state manually
  func tapHandler() {
    if isContextMenuOpen {
      isContextMenuOpen = false
    } else {
      tapAction()
    }
  }

  func menuActionHandler(_ action: GridCardAction) {
    isContextMenuOpen = false
    actionHandler(action)
  }

  var contextMenuView: some View {
    Group {
      Button(
        action: { menuActionHandler(.toggleArchiveStatus) },
        label: {
          Label(
            item.isArchived ? "Unarchive" : "Archive",
            systemImage: item.isArchived ? "tray.and.arrow.down.fill" : "archivebox"
          )
        }
      )
      Button(
        action: { menuActionHandler(.delete) },
        label: { Label("Delete Link", systemImage: "trash") }
      )
    }
  }

  public var body: some View {
    VStack(alignment: .leading, spacing: 16) {
      // Progress Bar
      Group {
        // Remove os check when dropping macOS 11
        #if os(iOS)
          if #available(iOS 15.0, *) {
            ProgressView(value: min(abs(item.readingProgress) / 100, 1))
              .tint(.appYellow48)
              .frame(maxWidth: .infinity, alignment: .leading)
          } else {
            ProgressView(value: max(abs(item.readingProgress) / 100, 1))
              .frame(maxWidth: .infinity, alignment: .leading)
          }
        #else
          ProgressView(value: max(abs(item.readingProgress) / 100, 1))
            .frame(maxWidth: .infinity, alignment: .leading)
        #endif
      }
      .onTapGesture { tapHandler() }

      // Title, Subtitle, Menu Button
      VStack(alignment: .leading, spacing: 4) {
        HStack {
          Text(item.title)
            .font(.appHeadline)
            .foregroundColor(.appGrayTextContrast)
            .lineLimit(1)
            .onTapGesture { tapHandler() }
          Spacer()

          Menu(
            content: { contextMenuView },
            label: { Image.profile }
          )
          .onTapGesture { isContextMenuOpen = true }
        }

        HStack {
          if let author = item.author {
            Text("by \(author)")
              .font(.appCaptionTwo)
              .foregroundColor(.appGrayText)
              .lineLimit(1)
          }

          if let publisherURL = item.publisherHostname {
            Text(publisherURL)
              .font(.appCaptionTwo)
              .foregroundColor(.appGrayText)
              .underline()
              .lineLimit(1)
          }

          Spacer()
        }
        .onTapGesture { tapHandler() }
      }
      .frame(height: 30)
      .padding(.horizontal)

      // Link description and image
      HStack(alignment: .top) {
        Text(item.description ?? item.title)
          .font(.appFootnote)
          .foregroundColor(.appGrayTextContrast)
          .lineLimit(nil)
          .multilineTextAlignment(.leading)

        Spacer()

        if let imageURL = item.imageURL {
          AsyncImage(url: imageURL, isResizable: true)
            .aspectRatio(1, contentMode: .fill)
            .frame(width: 135, height: 90)
            .cornerRadius(3)
        }
      }
      .frame(height: 95)
      .padding(.horizontal)
      .onTapGesture { tapHandler() }

      // Category Labels
      if FeatureFlag.showFeedItemTags {
        ScrollView(.horizontal, showsIndicators: false) {
          HStack {
            TextChip(text: "label", color: .red)
            TextChip(text: "longer label", color: .blue)
            Spacer()
          }
          .frame(height: 30)
          .padding(.horizontal)
          .padding(.bottom, 8)
        }
      } else {
        Spacer(minLength: 8)
      }
    }
    .background(
      Color.secondarySystemGroupedBackground
        .onTapGesture { tapHandler() }
    )
    .cornerRadius(6)
    .contextMenu { contextMenuView }
  }
}
