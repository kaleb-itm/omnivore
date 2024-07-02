package app.omnivore.omnivore.feature.onboarding.auth

import android.widget.Toast
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.text.ClickableText
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalFocusManager
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.AnnotatedString
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.unit.dp
import app.omnivore.omnivore.R
import app.omnivore.omnivore.feature.onboarding.LoginViewModel

@Composable
fun CreateUserProfileScreen(viewModel: LoginViewModel) {
    var name by rememberSaveable { mutableStateOf("") }
    var username by rememberSaveable { mutableStateOf("") }

    Row(
        horizontalArrangement = Arrangement.Center
    ) {
        Spacer(modifier = Modifier.weight(1.0F))
        Column(
            verticalArrangement = Arrangement.Center,
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                text = stringResource(R.string.create_user_profile_title),
                style = MaterialTheme.typography.headlineMedium,
                modifier = Modifier.padding(bottom = 8.dp)
            )
            UserProfileFields(name = name,
                username = username,
                usernameValidationErrorMessage = viewModel.usernameValidationErrorMessage,
                showUsernameAsAvailable = viewModel.hasValidUsername,
                onNameChange = { name = it },
                onUsernameChange = {
                    username = it
                    viewModel.validateUsername(it)
                },
                onSubmit = { viewModel.submitProfile(username = username, name = name) })

            // TODO: add a activity indicator (maybe after a delay?)
            if (viewModel.isLoading) {
                Text(stringResource(R.string.create_user_profile_loading))
            }

            ClickableText(text = AnnotatedString(stringResource(R.string.create_user_profile_action_cancel)),
                style = MaterialTheme.typography.titleMedium.plus(TextStyle(textDecoration = TextDecoration.Underline)),
                onClick = { viewModel.cancelNewUserSignUp() })
        }
        Spacer(modifier = Modifier.weight(1.0F))
    }
}

@Composable
fun UserProfileFields(
    name: String,
    username: String,
    usernameValidationErrorMessage: String?,
    showUsernameAsAvailable: Boolean,
    onNameChange: (String) -> Unit,
    onUsernameChange: (String) -> Unit,
    onSubmit: () -> Unit
) {
    val context = LocalContext.current
    val focusManager = LocalFocusManager.current

    Column(
        modifier = Modifier
            .fillMaxWidth()
            .height(300.dp),
        verticalArrangement = Arrangement.spacedBy(25.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        OutlinedTextField(
            value = name,
            placeholder = { Text(stringResource(R.string.create_user_profile_field_placeholder_name)) },
            label = { Text(stringResource(R.string.create_user_profile_field_label_name)) },
            onValueChange = onNameChange,
            keyboardOptions = KeyboardOptions(imeAction = ImeAction.Done),
            keyboardActions = KeyboardActions(onDone = { focusManager.clearFocus() })
        )

        Column(
            verticalArrangement = Arrangement.spacedBy(5.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            OutlinedTextField(value = username,
                placeholder = { Text(stringResource(R.string.create_user_profile_field_placeholder_username)) },
                label = { Text(stringResource(R.string.create_user_profile_field_label_username)) },
                onValueChange = onUsernameChange,
                keyboardOptions = KeyboardOptions(imeAction = ImeAction.Done),
                keyboardActions = KeyboardActions(onDone = { focusManager.clearFocus() }),
                trailingIcon = {
                    if (showUsernameAsAvailable) {
                        Icon(
                            imageVector = Icons.Filled.CheckCircle, contentDescription = null
                        )
                    }
                })

            if (usernameValidationErrorMessage != null) {
                Text(
                    text = usernameValidationErrorMessage,
                    style = MaterialTheme.typography.bodyLarge,
                    color = MaterialTheme.colorScheme.error,
                    textAlign = TextAlign.Center
                )
            }
        }

        Button(
            onClick = {
                if (name.isNotBlank() && username.isNotBlank()) {
                    onSubmit()
                    focusManager.clearFocus()
                } else {
                    Toast.makeText(
                        context,
                        context.getString(R.string.create_user_profile_error_msg),
                        Toast.LENGTH_SHORT
                    ).show()
                }
            }, colors = ButtonDefaults.buttonColors(
                contentColor = Color(0xFF3D3D3D), containerColor = Color(0xffffd234)
            )
        ) {
            Text(
                text = stringResource(R.string.create_user_profile_action_submit),
                modifier = Modifier.padding(horizontal = 100.dp)
            )
        }
    }
}
