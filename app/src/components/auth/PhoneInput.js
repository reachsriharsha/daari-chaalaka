import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Modal,
  FlatList,
  Dimensions,
} from "react-native";
import {
  countries,
  getCountryByCode,
  searchCountries,
} from "../../data/countries";

const PhoneInput = ({ phoneNumber, setPhoneNumber, onSendOTP, loading }) => {
  const [selectedCountry, setSelectedCountry] = useState(
    getCountryByCode("US")
  );
  const [phoneValue, setPhoneValue] = useState("");
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const onSelectCountry = (country) => {
    setSelectedCountry(country);
    setShowCountryPicker(false);
    setSearchQuery("");
    // Update the full phone number when country changes
    const fullPhoneNumber = `+${country.callingCode}${phoneValue}`;
    setPhoneNumber(fullPhoneNumber);
  };

  const onPhoneChange = (text) => {
    // Remove any non-numeric characters
    const cleanedText = text.replace(/[^0-9]/g, "");
    setPhoneValue(cleanedText);
    // Combine country code and phone number
    const fullPhoneNumber = `+${selectedCountry.callingCode}${cleanedText}`;
    setPhoneNumber(fullPhoneNumber);
  };

  const filteredCountries = searchCountries(searchQuery);

  const renderCountryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.countryItem}
      onPress={() => onSelectCountry(item)}
    >
      <Text style={styles.countryFlag}>{item.flag}</Text>
      <Text style={styles.countryName}>{item.name}</Text>
      <Text style={styles.countryCode}>+{item.callingCode}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Phone Number</Text>
      {/* Country Code Picker */}
      <View style={styles.phoneInputRow}>
        {" "}
        <TouchableOpacity
          style={styles.countrySelector}
          onPress={() => setShowCountryPicker(true)}
        >
          <Text style={styles.flagText}>{selectedCountry.flag}</Text>
          <Text style={styles.countryCodeText}>
            +{selectedCountry.callingCode}
          </Text>
          <Text style={styles.dropdownArrow}>▼</Text>
        </TouchableOpacity>
        {/* Phone Number Input */}
        <TextInput
          style={styles.phoneInput}
          placeholder="Phone number"
          value={phoneValue}
          onChangeText={onPhoneChange}
          keyboardType="phone-pad"
          autoComplete="tel"
          maxLength={15}
        />{" "}
      </View>
      {/* Custom Country Picker Modal */}
      <Modal
        visible={showCountryPicker}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowCountryPicker(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Country</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowCountryPicker(false)}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.searchInput}
            placeholder="Search countries..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCorrect={false}
          />

          <FlatList
            data={filteredCountries}
            keyExtractor={(item) => item.code}
            renderItem={renderCountryItem}
            style={styles.countriesList}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </Modal>
      {/* Full Phone Number Display */}
      <View style={styles.phonePreview}>
        <Text style={styles.phonePreviewLabel}>Full number:</Text>
        <Text style={styles.phonePreviewText}>
          {phoneNumber || `+${selectedCountry.callingCode}`}
        </Text>
      </View>{" "}
      <Text style={styles.testInfo}>
        For testing, try: 234567890 (US) or 76543210 (with any country code)
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
  phoneInputRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  countrySelector: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#fff",
    marginRight: 10,
    minWidth: 100,
  },
  flagText: {
    fontSize: 20,
    marginRight: 5,
  },
  countryCodeText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginRight: 5,
  },
  dropdownArrow: {
    fontSize: 12,
    color: "#666",
  },
  phoneInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#333",
  },
  phonePreview: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  phonePreviewLabel: {
    fontSize: 14,
    color: "#666",
    marginRight: 8,
  },
  phonePreviewText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007AFF",
  },
  testInfo: {
    fontSize: 12,
    color: "#007AFF",
    marginBottom: 20,
    fontStyle: "italic",
    textAlign: "center",
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
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#f8f9fa",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#e9ecef",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "bold",
  },
  searchInput: {
    margin: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: "#f8f9fa",
  },
  countriesList: {
    flex: 1,
  },
  countryItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  countryFlag: {
    fontSize: 24,
    marginRight: 15,
  },
  countryName: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  countryCode: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "600",
  },
});

export default PhoneInput;
