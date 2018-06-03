// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyD9xx7CtzAi5IQ3wjdXy-v_wjM_ST3oYno",
    authDomain: "footyverse-202523.firebaseapp.com",
    databaseURL: "https://footyverse-202523.firebaseio.com",
    projectId: "footyverse-202523",
    storageBucket: "footyverse-202523.appspot.com",
    messagingSenderId: "678639283287"
  },
  adClient: 'ca-pub-1686891852898803',
  sentryDSN: 'https://8f469024e59444a88a4619db5b7170f1@sentry.io/1215012'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
