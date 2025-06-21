// Mock Firebase configuration for Expo Go compatibility
// Real Firebase will be initialized only when building natively

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id",
};

// Mock auth object for Expo Go
const auth = {
  currentUser: null,
  // Add any other properties you might need
};

export { auth, firebaseConfig };
export default firebaseConfig;
