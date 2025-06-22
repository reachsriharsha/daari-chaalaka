import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import PhoneInput from "../components/auth/PhoneInput";
import OTPInput from "../components/auth/OTPInput";
import AuthService from "../services/AuthService";

const PhoneAuthScreen = ({ onAuthSuccess }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOTP = async () => {
    // Validate phone number
    const validation = AuthService.validatePhoneNumber(phoneNumber);
    if (!validation.isValid) {
      Alert.alert("Error", validation.error);
      return;
    }

    setLoading(true);

    try {
      const result = await AuthService.sendOTP(phoneNumber);
      if (result.success) {
        setOtpSent(true);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      Alert.alert("Error", "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    // Validate OTP
    const validation = AuthService.validateOTP(otp);
    if (!validation.isValid) {
      Alert.alert("Error", validation.error);
      return;
    }

    setLoading(true);

    try {
      const result = await AuthService.verifyOTP(phoneNumber, otp);
      if (result.success) {
        onAuthSuccess();
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      Alert.alert("Error", "Failed to verify OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (text) => {
    console.log("OTP input changed:", text);
    const formattedOtp = AuthService.formatOTP(text);
    setOtp(formattedOtp);
  };

  const handleGoBack = () => {
    setOtp("");
    setOtpSent(false);
  };

  const handleReset = () => {
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
        <Text style={styles.title}>Log in with Phone Number</Text>
        <Text style={styles.subtitle}>
          {otpSent
            ? "Enter the OTP sent to your phone"
            : "Enter your phone number"}
        </Text>

        {!otpSent ? (
          <PhoneInput
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            onSendOTP={handleSendOTP}
            loading={loading}
          />
        ) : (
          <OTPInput
            otp={otp}
            onOtpChange={handleOtpChange}
            onVerifyOTP={handleVerifyOTP}
            onGoBack={handleGoBack}
            loading={loading}
          />
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
});

export default PhoneAuthScreen;
