# Setup Instruction

Install `react-native-cli` using `npm install -g react-native-cli` 

For iOS (Mac Only)
1. Install `Cocoapods` using `sudo gem install cocoapods`
2. `cd ios/` Install Pod dependencies using `pod install`
3. Download iOS Firebase API Keyfile from Firebase (GoogleService-Info.plist).
4. Open iOS Project using xcode `open ios/JobMe.xcworkspace` notice `.xcworkspace` extension.
5. Right-click on JobMe (Folder with Info.plist) -> Add file to .... -> Navigated to iOS Firebase API Keyfile. See link (https://stackoverflow.com/a/45318508/4540216)
6. `npm install` or `yarn install`
7. `react-native link`
8. `react-native run-ios` to startup iOS Development. OR open react-native project in WebStorm and 

For Android
1. Download Android Firebase API Keyfile from Firebase (google-services.json).
2. Place keyfile at `android/app/`
3. `npm install` or `yarn install` (Skip step 3 and 4 if you did this for iOS)
4. `react-native link`
5. Bootup Android Virtual Device from Android Studio
6. `react-native run-android`