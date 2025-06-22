import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";
import SettingsScreen from "./SettingsScreen";

const HomeScreen = ({ onLogout }) => {
  const [showSettings, setShowSettings] = useState(false);
  const { user } = useAuth();

  const handleProfilePress = () => {
    setShowSettings(true);
  };

  const handleCloseSettings = () => {
    setShowSettings(false);
  };

  if (showSettings) {
    return (
      <SettingsScreen
        onClose={handleCloseSettings}
        onLogout={onLogout}
        user={user}
      />
    );
  }
  return (
    <View style={styles.container}>
      {/* Header with Profile Button */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={handleProfilePress}
        >
          <Text style={styles.profileButtonText}>👤</Text>
        </TouchableOpacity>
      </View>

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
              : "Using mock authentication for Expo Go testing"}{" "}
          </Text>
        </View>
        {user && user.phoneNumber && (
          <View style={styles.userInfo}>
            <Text style={styles.userInfoLabel}>Phone Number:</Text>
            <Text style={styles.userInfoText}>{user.phoneNumber}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
  },
  profileButtonText: {
    fontSize: 20,
    color: "#fff",
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
    marginBottom: 30,
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
});

export default HomeScreen;
