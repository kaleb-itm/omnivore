import SwiftUI
import WebKit

final class WebAppViewCoordinator: NSObject {
  var webViewActionHandler: (WKScriptMessage) -> Void = { _ in }
  var linkHandler: (URL) -> Void = { _ in }
  var needsReload = true
  var lastSavedAnnotationID: UUID?
  var updateNavBarVisibilityRatio: (Double) -> Void = { _ in }
  private var yOffsetAtStartOfDrag: Double?
  private var lastYOffset: Double = 0
  private var hasDragged = false
  private var isNavBarHidden = false

  override init() {
    super.init()
  }

  var navBarVisibilityRatio: Double = 1.0 {
    didSet {
      isNavBarHidden = navBarVisibilityRatio == 0
      updateNavBarVisibilityRatio(navBarVisibilityRatio)
    }
  }
}

extension WebAppViewCoordinator: WKScriptMessageHandler {
  func userContentController(_: WKUserContentController, didReceive message: WKScriptMessage) {
    webViewActionHandler(message)
  }
}

extension WebAppViewCoordinator: WKNavigationDelegate {
  // swiftlint:disable:next line_length
  func webView(_: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
    if navigationAction.navigationType == .linkActivated {
      if let linkURL = navigationAction.request.url {
        linkHandler(linkURL)
      }
      decisionHandler(.cancel)
    } else {
      decisionHandler(.allow)
    }
  }

  func webView(_ webView: WKWebView, didFinish _: WKNavigation!) {
    webView.isOpaque = true
    webView.backgroundColor = .systemBackground
  }
}

#if os(iOS)
  extension WebAppViewCoordinator: UIScrollViewDelegate {
    func scrollViewWillBeginDragging(_ scrollView: UIScrollView) {
      hasDragged = true
      yOffsetAtStartOfDrag = scrollView.contentOffset.y + scrollView.contentInset.top
    }

    func scrollViewDidScroll(_ scrollView: UIScrollView) {
      guard hasDragged else { return }

      let yOffset = scrollView.contentOffset.y

      if yOffset == 0 {
        scrollView.contentInset.top = readerViewNavBarHeight
        navBarVisibilityRatio = 1
        return
      }

      if yOffset < 0 {
        navBarVisibilityRatio = 1
        scrollView.contentInset.top = readerViewNavBarHeight
        return
      }

      if yOffset < readerViewNavBarHeight {
        let isScrollingUp = yOffsetAtStartOfDrag ?? 0 > yOffset
        navBarVisibilityRatio = isScrollingUp || yOffset < 0 ? 1 : min(1, 1 - (yOffset / readerViewNavBarHeight))
        scrollView.contentInset.top = navBarVisibilityRatio * readerViewNavBarHeight
        return
      }

      guard let yOffsetAtStartOfDrag = yOffsetAtStartOfDrag else { return }

      if yOffset > yOffsetAtStartOfDrag, !isNavBarHidden {
        let translation = yOffset - yOffsetAtStartOfDrag
        let ratio = translation < readerViewNavBarHeight ? 1 - (translation / readerViewNavBarHeight) : 0
        navBarVisibilityRatio = min(ratio, 1)
        scrollView.contentInset.top = navBarVisibilityRatio * readerViewNavBarHeight
      }
    }

    func scrollViewDidEndDragging(_ scrollView: UIScrollView, willDecelerate decelerate: Bool) {
      if decelerate, scrollView.contentOffset.y + scrollView.contentInset.top < (yOffsetAtStartOfDrag ?? 0) {
        scrollView.contentInset.top = readerViewNavBarHeight
        navBarVisibilityRatio = 1
      }
    }

    func scrollViewShouldScrollToTop(_ scrollView: UIScrollView) -> Bool {
      scrollView.contentInset.top = readerViewNavBarHeight
      navBarVisibilityRatio = 1
      return false
    }
  }
#endif

struct WebViewConfig {
  let url: URL
  let themeId: String
  let margin: Int
  let fontSize: Int
  let fontFamily: String
  let rawAuthCookie: String?
}

extension WKWebView {
  func configureForOmnivoreAppEmbed(config: WebViewConfig) {
    // Set cookies to pass article preferences to web view
    injectCookie(cookieString: "theme=\(config.themeId); Max-Age=31536000;", url: config.url)
    injectCookie(cookieString: "margin=\(config.margin); Max-Age=31536000;", url: config.url)
    injectCookie(cookieString: "fontSize=\(config.fontSize); Max-Age=31536000;", url: config.url)
    injectCookie(cookieString: "fontFamily=\(config.fontFamily); Max-Age=31536000;", url: config.url)

    let authToken = extractAuthToken(rawAuthCookie: config.rawAuthCookie, url: config.url)

    if let authToken = authToken {
      injectCookie(cookieString: "authToken=\(authToken); Max-Age=31536000;", url: config.url)
    } else {
      injectCookie(cookieString: config.rawAuthCookie, url: config.url)
    }
  }

  func injectCookie(cookieString: String?, url: URL) {
    if let cookieString = cookieString {
      for cookie in HTTPCookie.cookies(withResponseHeaderFields: ["Set-Cookie": cookieString], for: url) {
        configuration.websiteDataStore.httpCookieStore.setCookie(cookie) {}
      }
    }
  }
}

// Temp utility until we swap out the web build used in prod.
// Once we do that we can just pass in the authToken directly
// and remove the rawAuthCookie param.
// This util just makes it easier to feature flag the web build used
private func extractAuthToken(rawAuthCookie: String?, url: URL) -> String? {
  guard let rawAuthCookie = rawAuthCookie else { return nil }
  let cookies = HTTPCookie.cookies(withResponseHeaderFields: ["Set-Cookie": rawAuthCookie], for: url)
  return cookies.first?.value
}
