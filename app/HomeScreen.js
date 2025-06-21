import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useAuth } from "./AuthContext";

const HomeScreen = ({ onLogout }) => {
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      // For Expo Go, just use the logout callback
      onLogout();
      Alert.alert("Success", "Logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error);
      // Fallback to mock logout
      onLogout();
      Alert.alert("Success", "Logged out successfully!");
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.subtitle}>You are successfully logged in</Text>

        <View style={styles.modeInfo}>
          <Text style={styles.modeLabel}>
            {user ? "🔥 Firebase Mode" : "🧪 Test Mode (Expo Go)"}
          </Text>
          <Text style={styles.modeDescription}>
            {user
              ? "Connected to Firebase Authentication"
              : "Using mock authentication for Expo Go testing"}
          </Text>
        </View>

        {user && user.phoneNumber && (
          <View style={styles.userInfo}>
            <Text style={styles.userInfoLabel}>Phone Number:</Text>
            <Text style={styles.userInfoText}>{user.phoneNumber}</Text>
          </View>
        )}

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 40,
    color: "#666",
  },
  modeInfo: {
    backgroundColor: "#E3F2FD",
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
    width: "100%",
    alignItems: "center",
    borderLeftWidth: 4,
    borderLeftColor: "#2196F3",
  },
  modeLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1976D2",
    marginBottom: 5,
  },
  modeDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  userInfo: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 40,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userInfoLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
    marginBottom: 5,
  },
  userInfoText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  logoutButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default HomeScreen;
