import Foundation
import GoogleSignIn
import Models
import Utils
import WebKit

public final class Authenticator: ObservableObject {
  public static var unregisterIntercomUser: (() -> Void)?

  public static func handleGoogleURL(url: URL) {
    GIDSignIn.sharedInstance.handle(url)
  }

  public enum AuthStatus {
    case loggedOut
    case pendingUser
    case loggedIn
  }

  @Published public internal(set) var isLoggedIn: Bool
  @Published public var showAppleRevokeTokenAlert = false

  let networker: Networker

  var pendingUserToken: String?

  public init(networker: Networker) {
    self.networker = networker
    self.isLoggedIn = ValetKey.authToken.exists
  }

  public var omnivoreAuthCookieString: String? {
    ValetKey.authCookieString.value()
  }

  public var authToken: String? {
    ValetKey.authToken.value()
  }

  public func logout(dataService: DataService, isAccountDeletion: Bool = false) {
    dataService.resetLocalStorage()
    clearCreds()
    Authenticator.unregisterIntercomUser?()
    isLoggedIn = false
    showAppleRevokeTokenAlert = isAccountDeletion
    EventTracker.reset()
  }

  public func clearCreds() {
    clearCookies()
    ValetKey.removeAllKeys()
    UserDefaults.standard.removeObject(forKey: Keys.userIdKey)
  }

  public var hasValidAuthToken: Bool {
    guard let authToken = ValetKey.authToken.value() else { return false }
    // We could do a more thorough check by decoding the token and reading it's properties
    // but then we would have to store the jwt secret client side.
    return !authToken.isEmpty
  }

  private func clearCookies() {
    HTTPCookieStorage.shared.removeCookies(since: Date.distantPast)

    WKWebsiteDataStore.default().fetchDataRecords(ofTypes: WKWebsiteDataStore.allWebsiteDataTypes()) { records in
      records.forEach { record in
        WKWebsiteDataStore.default().removeData(ofTypes: record.dataTypes, for: [record], completionHandler: {})
      }
    }
  }
}
