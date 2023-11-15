package app.omnivore.omnivore.ui.auth

import android.app.Activity
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.ActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.runtime.Composable
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import app.omnivore.omnivore.BuildConfig
import app.omnivore.omnivore.R
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInAccount
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import com.google.android.gms.tasks.Task

@Composable
fun GoogleAuthButton(viewModel: LoginViewModel) {
  val context = LocalContext.current


  val signInOptions = GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
    .requestIdToken(BuildConfig.OMNIVORE_GAUTH_SERVER_CLIENT_ID)
    .requestEmail()
    .build()

  val startForResult =
    rememberLauncherForActivityResult(ActivityResultContracts.StartActivityForResult()) { result: ActivityResult ->
      if (result.resultCode == Activity.RESULT_OK) {
        val intent = result.data
        if (result.data != null) {
          val task: Task<GoogleSignInAccount> = GoogleSignIn.getSignedInAccountFromIntent(intent)
          viewModel.handleGoogleAuthTask(task)
        }
      } else {
        viewModel.showGoogleErrorMessage()
      }
    }

  LoadingButtonWithIcon(
    text = stringResource(R.string.google_auth_text),
    loadingText = stringResource(R.string.google_auth_loading),
    isLoading = viewModel.isLoading,
    icon = painterResource(id = R.drawable.ic_logo_google),
    onClick = {
      val googleSignIn = GoogleSignIn.getClient(context, signInOptions)

      googleSignIn.silentSignIn()
        .addOnCompleteListener { task ->
          if (task.isSuccessful) {
            viewModel.handleGoogleAuthTask(task)
          } else {
            startForResult.launch(googleSignIn.signInIntent)
          }
        }
        .addOnFailureListener {
          startForResult.launch(googleSignIn.signInIntent)
        }
    }
  )
}
