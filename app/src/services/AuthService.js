import { Alert } from "react-native";

// Authentication service for handling phone auth logic
class AuthService {
  // Test phone numbers and OTP for Expo Go testing
  static testPhoneNumbers = ["+1234567890", "+9876543210"];
  static testOtp = "123456";

  // Send OTP to phone number
  static async sendOTP(phoneNumber) {
    return new Promise((resolve) => {
      // Simulate network delay
      setTimeout(() => {
        if (this.testPhoneNumbers.includes(phoneNumber)) {
          //Alert.alert("Test Mode", "Use OTP: 123456 for testing");
          resolve({ success: true, isTestMode: true });
        } else {
          Alert.alert(
            "Expo Go Limitation",
            "Phone authentication requires native modules. Use test numbers: +1234567890 or +9876543210"
          );
          resolve({ success: false, error: "Invalid test number" });
        }
      }, 1000);
    });
  }

  // Verify OTP
  static async verifyOTP(phoneNumber, otp) {
    return new Promise((resolve) => {
      console.log("Verifying OTP:", otp, "Expected:", this.testOtp);

      // Simulate verification delay
      setTimeout(() => {
        if (
          this.testPhoneNumbers.includes(phoneNumber) &&
          otp === this.testOtp
        ) {
          resolve({ success: true, isTestMode: true });
        } else {
          Alert.alert("Error", "Invalid OTP. Use 123456 for test numbers.");
          resolve({ success: false, error: "Invalid OTP" });
        }
      }, 1000);
    });
  }

  // Validate phone number format
  static validatePhoneNumber(phoneNumber) {
    if (!phoneNumber) {
      return { isValid: false, error: "Please enter a valid phone number" };
    }

    // For test mode, just check if it's one of our test numbers
    if (this.testPhoneNumbers.includes(phoneNumber)) {
      return { isValid: true };
    }

    // Basic phone number validation
    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    if (phoneRegex.test(phoneNumber)) {
      return { isValid: true };
    }

    return {
      isValid: false,
      error: "Please enter a valid phone number with country code",
    };
  }

  // Validate OTP format
  static validateOTP(otp) {
    if (!otp) {
      return { isValid: false, error: "Please enter the OTP" };
    }

    if (otp.length !== 6) {
      return { isValid: false, error: "OTP must be 6 digits" };
    }

    if (!/^\d{6}$/.test(otp)) {
      return { isValid: false, error: "OTP must contain only numbers" };
    }

    return { isValid: true };
  }

  // Format OTP input (remove non-numeric characters)
  static formatOTP(text) {
    return text.replace(/[^0-9]/g, "");
  }
}

export default AuthService;
