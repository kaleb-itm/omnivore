function saveAPIKey() {
  var apiKey = document.getElementById('api-key').value
  if (!apiKey) {
    alert(
      'No api-key specified, please create an API key at https://omnivore.app/settings/api'
    )
    return
  }

  setStorage({
    apiKey: apiKey,
  }).then(() => {
    alert('API key saved!')
  })
}

function loadAPIKey() {
  getStorageItem('apiKey').then((apiKey) => {
    if (apiKey) {
      document.getElementById('api-key').value = apiKey
    } else {
      alert('No API key found in storage.')
    }
  })
}

function clearAPIKey() {
  document.getElementById('api-key').value = ''

  setStorage({
    apiKey: undefined,
  }).then(() => {
    alert('API key cleared!')
  })
}

function autoDismissChanged(event) {
  const value = document.getElementById('disable-auto-dismiss').checked
  console.log(
    ' value: ',
    value,
    document.getElementById('disable-auto-dismiss')
  )

  setStorage({
    disableAutoDismiss: value ? 'true' : null,
  }).then(() => {
    console.log('disableAutoDismiss updated', value)
  })
}

function saveAutoDismissTime() {
  const value = document.getElementById('auto-dismiss-time').value

  if (value.length < 1 || Number.isNaN(Number(value))) {
    alert('Invalid value')
    return
  }

  setStorage({
    autoDismissTime: value,
  }).then(() => {
    console.log('autoDismissTime updated', value)
  })
}

;(() => {
  document
    .getElementById('save-api-key-btn')
    .addEventListener('click', saveAPIKey)
  document
    .getElementById('load-api-key-btn')
    .addEventListener('click', loadAPIKey)
  document
    .getElementById('clear-api-key-btn')
    .addEventListener('click', clearAPIKey)

  getStorageItem('disableAutoDismiss').then((value) => {
    document.getElementById('disable-auto-dismiss').checked = value
      ? true
      : false
  })

  document
    .getElementById('disable-auto-dismiss')
    .addEventListener('change', autoDismissChanged)

  getStorageItem('autoDismissTime').then((value) => {
    document.getElementById('auto-dismiss-time').value = value ?? '2500'
  })
  document
    .getElementById('auto-dismiss-time-btn')
    .addEventListener('click', saveAutoDismissTime)
})()
