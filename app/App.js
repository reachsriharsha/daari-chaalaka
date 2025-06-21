import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ActivityIndicator, Text } from "react-native";
import { AuthProvider, useAuth } from "./src/context";
import { PhoneAuthScreen, HomeScreen } from "./src/screens";

const AppContent = () => {
  const { user, loading } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // Show home screen if user is authenticated via Firebase or local testing
  if (user || isAuthenticated) {
    return <HomeScreen onLogout={handleLogout} />;
  }

  // Show authentication screen
  return <PhoneAuthScreen onAuthSuccess={handleAuthSuccess} />;
};

export default function App() {
  return (
    <AuthProvider>
      <View style={styles.container}>
        <AppContent />
        <StatusBar style="auto" />
      </View>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
});
