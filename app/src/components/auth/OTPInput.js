import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

const OTPInput = ({ otp, onOtpChange, onVerifyOTP, onGoBack, loading }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Enter OTP</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter 6-digit OTP"
        placeholderTextColor="#999"
        value={otp}
        onChangeText={onOtpChange}
        keyboardType="number-pad"
        maxLength={6}
        autoFocus={true}
        selectTextOnFocus={true}
        textContentType="oneTimeCode"
        editable={true}
        multiline={false}
      />
      <Text style={styles.debugText}>
        Current OTP: "{otp}" (Length: {otp.length})
      </Text>
      <Text style={styles.testInfo}>Test OTP: 123456 (for test numbers)</Text>
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={onVerifyOTP}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Verify OTP</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.linkButton} onPress={onGoBack}>
        <Text style={styles.linkText}>Back to Phone Number</Text>
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
  debugText: {
    fontSize: 10,
    color: "#FF6600",
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "monospace",
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
  linkButton: {
    alignItems: "center",
  },
  linkText: {
    color: "#007AFF",
    fontSize: 16,
  },
});

export default OTPInput;
