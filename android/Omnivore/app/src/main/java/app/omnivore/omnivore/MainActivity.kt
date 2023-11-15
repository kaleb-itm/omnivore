package app.omnivore.omnivore

import android.os.Bundle
import android.view.View
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.viewModels
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.core.view.ViewCompat
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import app.omnivore.omnivore.ui.auth.LoginViewModel
import app.omnivore.omnivore.ui.components.LabelsViewModel
import app.omnivore.omnivore.ui.library.LibraryViewModel
import app.omnivore.omnivore.ui.library.SearchViewModel
import app.omnivore.omnivore.ui.root.RootView
import app.omnivore.omnivore.ui.save.SaveViewModel
import app.omnivore.omnivore.ui.settings.SettingsViewModel
import app.omnivore.omnivore.ui.theme.OmnivoreTheme
import com.pspdfkit.PSPDFKit
import dagger.hilt.android.AndroidEntryPoint
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch


@AndroidEntryPoint
class MainActivity : ComponentActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    val loginViewModel: LoginViewModel by viewModels()
    val libraryViewModel: LibraryViewModel by viewModels()
    val settingsViewModel: SettingsViewModel by viewModels()
    val searchViewModel: SearchViewModel by viewModels()
    val labelsViewModel: LabelsViewModel by viewModels()
    val saveViewModel: SaveViewModel by viewModels()

    val context = this

    GlobalScope.launch(Dispatchers.IO) {
      val licenseKey = getString(R.string.pspdfkit_license_key)

      if (licenseKey.length > 30) {
        PSPDFKit.initialize(context, licenseKey)
      } else {
        PSPDFKit.initialize(context, null)
      }
    }

    setContent {
      OmnivoreTheme {
        Box(
          modifier = Modifier
            .fillMaxSize()
            .background(color = Color.Black)
        ) {
          RootView(
            loginViewModel,
            searchViewModel,
            libraryViewModel,
            settingsViewModel,
            labelsViewModel,
            saveViewModel)
        }
      }
    }

    // animate the view up when keyboard appears
    WindowCompat.setDecorFitsSystemWindows(window, false)
    val rootView = findViewById<View>(android.R.id.content).rootView
    ViewCompat.setOnApplyWindowInsetsListener(rootView) { _, insets ->
      val imeHeight = insets.getInsets(WindowInsetsCompat.Type.ime()).bottom
      rootView.setPadding(0, 0, 0, imeHeight)
      insets
    }
  }
}
