# React Native Firebase Phone Authentication App

This app implements phone number authentication using Firebase Auth with a local testing bypass for development.

## Features

- Phone number authentication with OTP verification
- Firebase integration for production use
- Local testing bypass with predefined test numbers
- Clean and modern UI
- Loading states and error handling

## Setup Instructions

### 1. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use an existing one
3. Enable Authentication and set up Phone Number sign-in method
4. Get your Firebase configuration from Project Settings
5. Update `firebase.config.js` with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-actual-app-id",
};
```

### 2. Android Setup (for Firebase)

1. Download `google-services.json` from Firebase Console
2. Place it in `android/app/` directory
3. Update `android/build.gradle`:

   ```gradle
   dependencies {
     classpath 'com.google.gms:google-services:4.3.15'
   }
   ```

4. Update `android/app/build.gradle`:
   ```gradle
   apply plugin: 'com.google.gms.google-services'
   ```

### 3. iOS Setup (for Firebase)

1. Download `GoogleService-Info.plist` from Firebase Console
2. Add it to your iOS project in Xcode

## Local Testing

For local development and testing, you can use the following test credentials:

**Test Phone Numbers:**

- `+1234567890`
- `+9876543210`

**Test OTP:**

- `123456`

When you enter one of the test phone numbers, the app will show a message indicating test mode and you can use the test OTP to complete authentication.

## Running the App

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm start
   ```

3. Run on Android:

   ```bash
   npm run android
   ```

4. Run on iOS:
   ```bash
   npm run ios
   ```

## App Flow

1. **Phone Number Input**: User enters their phone number
2. **OTP Request**: App sends OTP via Firebase (or simulates for test numbers)
3. **OTP Verification**: User enters the received OTP
4. **Authentication**: Upon successful verification, user is logged in
5. **Home Screen**: User sees a welcome screen with logout option

## File Structure

- `App.js` - Main app component with authentication flow
- `AuthContext.js` - Authentication context provider
- `PhoneAuthScreen.js` - Phone number and OTP input screens
- `HomeScreen.js` - Post-authentication home screen
- `firebase.config.js` - Firebase configuration

## Dependencies

- `@react-native-firebase/app` - Firebase core
- `@react-native-firebase/auth` - Firebase Authentication
- `react-native-vector-icons` - Icons for UI

## Notes

- The app includes a local testing bypass to avoid SMS costs during development
- For production, remove or disable the test phone numbers and OTP
- Make sure to configure Firebase properly for production use
- The app handles loading states and error scenarios gracefully
