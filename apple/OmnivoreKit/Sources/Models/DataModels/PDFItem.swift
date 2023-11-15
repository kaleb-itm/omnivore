import CoreData
import Foundation
import Utils

public struct PDFItem {
  public let objectID: NSManagedObjectID
  public let itemID: String
  public let pdfURL: URL?
  public let localPDF: String?
  public let tempPDFURL: URL?
  public let title: String
  public let slug: String
  public let readingProgress: Double
  public let readingProgressAnchor: Int
  public let isArchived: Bool
  public let isRead: Bool
  public let downloadURL: String
  public let highlights: [Highlight]

  public static func make(item: LinkedItem) -> PDFItem? {
    guard item.isPDF else { return nil }

    return PDFItem(
      objectID: item.objectID,
      itemID: item.unwrappedID,
      pdfURL: URL(string: item.unwrappedPageURLString),
      localPDF: item.localPDF,
      tempPDFURL: item.tempPDFURL,
      title: item.unwrappedID,
      slug: item.unwrappedSlug,
      readingProgress: item.readingProgress,
      readingProgressAnchor: Int(item.readingProgressAnchor),
      isArchived: item.isArchived,
      isRead: item.isRead,
      downloadURL: item.unwrappedPageURLString,
      highlights: item.highlights.asArray(of: Highlight.self)
    )
  }

  public var localPdfURL: URL? {
    if let localPDF = localPDF {
      return PDFUtils.localPdfURL(filename: localPDF)
    }
    return nil
  }
}
