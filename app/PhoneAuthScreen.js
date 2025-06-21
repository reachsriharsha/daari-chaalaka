import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const PhoneAuthScreen = ({ onAuthSuccess }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  // Test phone numbers and OTP for Expo Go testing
  const testPhoneNumbers = ["+1234567890", "+9876543210"];
  const testOtp = "123456";

  const sendOTP = async () => {
    if (!phoneNumber) {
      Alert.alert("Error", "Please enter a valid phone number");
      return;
    }

    setLoading(true);

    // Simulate network delay
    setTimeout(() => {
      if (testPhoneNumbers.includes(phoneNumber)) {
        setOtpSent(true);
        setLoading(false);
        Alert.alert("Test Mode", "Use OTP: 123456 for testing");
      } else {
        setLoading(false);
        Alert.alert(
          "Expo Go Limitation",
          "Phone authentication requires native modules. Use test numbers: +1234567890 or +9876543210"
        );
      }
    }, 1000);
  };
  const verifyOTP = async () => {
    console.log("Current OTP value:", otp); // Debug log
    if (!otp) {
      Alert.alert("Error", "Please enter the OTP");
      return;
    }

    setLoading(true);

    // Simulate verification delay
    setTimeout(() => {
      console.log("Verifying OTP:", otp, "Expected:", testOtp); // Debug log
      if (testPhoneNumbers.includes(phoneNumber) && otp === testOtp) {
        Alert.alert("Success", "Login successful!");
        onAuthSuccess();
      } else {
        Alert.alert("Error", "Invalid OTP. Use 123456 for test numbers.");
      }
      setLoading(false);
    }, 1000);
  };

  const handleOtpChange = (text) => {
    console.log("OTP input changed:", text); // Debug log
    // Remove any non-numeric characters
    const numericText = text.replace(/[^0-9]/g, "");
    setOtp(numericText);
  };
  const resetAuth = () => {
    setPhoneNumber("");
    setOtp("");
    setOtpSent(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Phone Authentication</Text>
        <Text style={styles.subtitle}>
          {otpSent
            ? "Enter the OTP sent to your phone"
            : "Enter your phone number"}
        </Text>

        {!otpSent ? (
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
              onPress={sendOTP}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Send OTP</Text>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Enter OTP</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter 6-digit OTP"
              placeholderTextColor="#999"
              value={otp}
              onChangeText={handleOtpChange}
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
            <Text style={styles.testInfo}>
              Test OTP: 123456 (for test numbers)
            </Text>
            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={verifyOTP}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Verify OTP</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.linkButton} onPress={resetAuth}>
              <Text style={styles.linkText}>Back to Phone Number</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
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
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
    color: "#666",
  },
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
  debugText: {
    fontSize: 10,
    color: "#FF6600",
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "monospace",
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

export default PhoneAuthScreen;
