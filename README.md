# React Native - Production App Bootstrap
This is a production-ready React Native skeleton project. It may not suit everyone since its  dependencies are very opinionated and were hand picked to suit our needs at [Orange Digital](https://www.orangedigital.com.au/).

It has most of the features needed to ship a great quality app for iOS and Android:
- Basic folder structure
- Routing (with [`react-native-router-flux`](https://github.com/aksonov/react-native-router-flux)) 
- [Redux](https://github.com/reduxjs/redux) (with [`react-redux`](https://github.com/reduxjs/react-redux))
- Code Push (with [`react-native-code-push`](https://github.com/Microsoft/react-native-code-push)) with multi-environment deployment (Dev/Staging/Prod) pre-configured 
- Firebase (with [`react-native-firebase`](https://github.com/invertase/react-native-firebase))
- Vector Icons (with [`react-native-vector-icons`](https://github.com/oblador/react-native-vector-icons))

# Third Party Software Dependencies
Make sure you have CocoaPods installed on your machine. You can install it by executing this on the terminal: 
```
[sudo] gem install cocoapods
```

Yarn is also recommended for faster dependency downloads / updates: 
```bash
# Use the --without-node arg if you already have Node in your machine
brew install yarn --without-node 
```

# Project Setup
On the terminal, browse to the project's root folder and execute:

```bash
# Download dependencies
yarn 

# Download Pods. Might take ages the first time it is run.
cd ios && pod install && cd .. 
```

## CodePush 
You should also create new applications at Microsoft's App Center and generate new Code Push keys for your app:

* On Android, CodePush Keys should be placed in the app level **build.gradle** file (`<projectRoot>/android/app/build.gradle`), on the **buildTypes** section. Detailed instructions available [here](https://docs.microsoft.com/en-us/appcenter/distribution/codepush/react-native#android).

* On iOS, CodePush Keys are saved with User Defined variables. You can change them by opening the **.xcworkspace** file (with XCode) under the **ios** folder, selecting the app's target, opening the **Build Settings** tab and replacing the values for the variable **CODEPUSH_KEY**. Detailed instructions available [here](https://docs.microsoft.com/en-us/appcenter/distribution/codepush/react-native#ios).

Because we're running 3 different CodePush environments (Debug, Staging, Production), each one of our app variants will have a different App ID. This will allow us to have the three variants installed at the same time.

## Firebase
Firebase is a great tool for any mobile application. It gives you Crash Reports, Performance Analysis, Analytics and a bunch of other cool features. Since Firebase manages data based on your App ID, we'll need to set up 3 different apps for each platform on Firebase. 

Firebase comes pre-configured with this project, and the only thing you need to do is download your project's **GoogleService-Info** files. Think of these files like "Authentication" files. They hold your Firebase project ID and some other information required for your app to talk with Google's services.

### Firebase - iOS setup:
On iOS, each `GoogleService-Info.plist` file holds information of a single Firebase Application **ONLY**, which means we'll have to download 3 different `GoogleService-Info.plist` files. You can do this by following the steps outlined in these pages:

- [Adding Firebase to your App](https://firebase.google.com/docs/ios/setup#add_firebase_to_your_app)
- [Downloading a configuration file](https://support.google.com/firebase/answer/7015592)

Once you have the three files downloaded, place them on the appropriate folders under `<projectRoot>/ios/RNBootstrap/Firebase/`.

### Firebase - Android setup:


# Running the project
This project comes with [CodePush](https://github.com/Microsoft/react-native-code-push) pre-configured. This means you can easily deploy over-the-air updates with a single command on the terminal. 
When running this app, you can choose between 3 different deployment types: **Debug, Staging and Production**. What's cool about this is you can have the three variants installed on the same device, since each one of them have a different **App ID** (suffixes are automatically added to the **App Id** on each deployment type). 

* For iOS, deployment types are set up with [**Build Settings**](https://developer.apple.com/library/archive/featuredarticles/XcodeConcepts/Concept-Build_Settings.html).
* For Android, deployment types are set up with [**Build Variants**](https://developer.android.com/studio/build/build-variants).

Selecting deployment types can be done with the command line. Browse to the project's root folder and execute any of the following commands:

Platform  | Debug                       | Staging                       | Production    
--------- | --------------------------  | ------------------------      | -----         
iOS       | `yarn start-ios-debug`      | `yarn start-ios-staging`      | Archive the app with Xcode  
Android   | `yarn start-android-debug`  | `yarn start-android-staging`  | `cd android && ./gradlew assembleRelease`