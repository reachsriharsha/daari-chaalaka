import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

const PhoneInput = ({ phoneNumber, setPhoneNumber, onSendOTP, loading }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder="+1234567890"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        autoComplete="tel"
      />
      <Text style={styles.testInfo}>
        For testing, use: +1234567890 or +9876543210
      </Text>
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={onSendOTP}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Send OTP</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 18,
    backgroundColor: "#fff",
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
  },
  testInfo: {
    fontSize: 12,
    color: "#007AFF",
    marginBottom: 20,
    fontStyle: "italic",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default PhoneInput;
