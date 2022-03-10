export {}

declare global {
  interface Window {
    webkit?: Webkit
    MathJax?: MathJax
    ANALYTICS_INITIALIZED: boolean
    // eslint-disable-next-line @typescript-eslint/ban-types
    Intercom: Function
    intercomSettings: IntercomSettings
    analytics?: Analytics
  }
}

declare type MathJax = {
  typeset?: () => void
}

declare type Webkit = {
  messageHandlers: MessageHandlers
}

declare type MessageHandlers = {
  viewerAction?: WebKitMessageHandler
  highlightAction?: WebKitMessageHandler
  readingProgressUpdate?: WebKitMessageHandler
}

declare type WebKitMessageHandler = {
  postMessage: (unknown) => void
}

interface IntercomSettings {
  app_id: string
  hide_default_launcher: boolean
  vertical_padding: number
  custom_launcher_selector: string
}
