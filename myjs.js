var GoogleAuth; // Google Auth object.
function initClient() {
  gapi.client.init({
      'apiKey': 'Dd_OebLXkr6NCEgjMYM9ZcZj',
      'clientId': '215057135427-7gc54gtbtjf10sfjttmi616quirlaf14.apps.googleusercontent.com',
      'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly',
      'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
  }).then(function () {
      GoogleAuth = gapi.auth2.getAuthInstance();

      // Listen for sign-in state changes.
      GoogleAuth.isSignedIn.listen(updateSigninStatus);
  });
}