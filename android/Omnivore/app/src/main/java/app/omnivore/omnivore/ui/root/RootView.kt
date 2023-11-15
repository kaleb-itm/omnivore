package app.omnivore.omnivore.ui.root

import SettingsView
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.systemBarsPadding
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.livedata.observeAsState
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import app.omnivore.omnivore.Routes
import app.omnivore.omnivore.ui.auth.LoginViewModel
import app.omnivore.omnivore.ui.auth.WelcomeScreen
import app.omnivore.omnivore.ui.components.LabelsViewModel
import app.omnivore.omnivore.ui.library.LibraryView
import app.omnivore.omnivore.ui.library.SearchView
import app.omnivore.omnivore.ui.library.LibraryViewModel
import app.omnivore.omnivore.ui.library.SearchViewModel
import app.omnivore.omnivore.ui.save.SaveViewModel
import app.omnivore.omnivore.ui.settings.PolicyWebView
import app.omnivore.omnivore.ui.settings.SettingsViewModel
import com.google.accompanist.systemuicontroller.rememberSystemUiController

@Composable
fun RootView(
  loginViewModel: LoginViewModel,
  searchViewModel: SearchViewModel,
  libraryViewModel: LibraryViewModel,
  settingsViewModel: SettingsViewModel,
  labelsViewModel: LabelsViewModel,
  saveViewModel: SaveViewModel,
) {
  val hasAuthToken: Boolean by loginViewModel.hasAuthTokenLiveData.observeAsState(false)
  val systemUiController = rememberSystemUiController()
  val useDarkIcons = !isSystemInDarkTheme()

  DisposableEffect(systemUiController, useDarkIcons) {
    systemUiController.setSystemBarsColor(
      color = Color.Black,
      darkIcons = false
    )

    onDispose {}
  }

  Box(
    modifier = Modifier
      .systemBarsPadding()
  ) {
    if (hasAuthToken) {
      PrimaryNavigator(
        loginViewModel = loginViewModel,
        searchViewModel = searchViewModel,
        libraryViewModel = libraryViewModel,
        settingsViewModel = settingsViewModel,
        labelsViewModel = labelsViewModel,
        saveViewModel = saveViewModel
      )
    } else {
      WelcomeScreen(viewModel = loginViewModel)
    }

    DisposableEffect(hasAuthToken) {
      if (hasAuthToken) {
        loginViewModel.registerUser()
      }
      onDispose {}
    }
  }
}

@Composable
fun PrimaryNavigator(
  loginViewModel: LoginViewModel,
  libraryViewModel: LibraryViewModel,
  searchViewModel: SearchViewModel,
  settingsViewModel: SettingsViewModel,
  labelsViewModel: LabelsViewModel,
  saveViewModel: SaveViewModel,
) {
  val navController = rememberNavController()

  NavHost(navController = navController, startDestination = Routes.Library.route) {
    composable(Routes.Library.route) {
      LibraryView(
        libraryViewModel = libraryViewModel,
        navController = navController,
        labelsViewModel = labelsViewModel,
        saveViewModel = saveViewModel,
      )
    }

    composable(Routes.Search.route) {
      SearchView(
        viewModel = searchViewModel,
        navController = navController
      )
    }

    composable(Routes.Settings.route) {
      SettingsView(loginViewModel = loginViewModel, settingsViewModel = settingsViewModel, navController = navController)
    }

    composable(Routes.Documentation.route) {
      PolicyWebView(navController = navController, url = "https://docs.omnivore.app")
    }

    composable(Routes.PrivacyPolicy.route) {
      PolicyWebView(navController = navController, url = "https://omnivore.app/privacy")
    }

    composable(Routes.TermsAndConditions.route) {
      PolicyWebView(navController = navController, url = "https://omnivore.app/app/terms")
    }
  }
}
