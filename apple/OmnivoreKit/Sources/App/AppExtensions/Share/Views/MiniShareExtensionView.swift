//
//  MiniShareExtensionView.swift
//
//
//  Created by Jackson Harper on 11/6/23.
//

import Foundation
import SwiftUI

struct MiniShareExtensionView: View {
  let extensionContext: NSExtensionContext?

  @State var showToast = true

  var body: some View {
    ProgressView()
      .popup(isPresented: $showToast) {
        Text("Saving to Omnivore")
          .padding(20)
      } customize: {
        $0
          .type(.toast)
          .position(.bottom)
          .animation(.spring())
          .closeOnTapOutside(true)
          .backgroundColor(.black.opacity(0.5))
      }
  }
}
