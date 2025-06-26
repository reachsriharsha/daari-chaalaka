import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  FlatList,
} from "react-native";
import * as Contacts from "expo-contacts";
import Logger from "../services/Logger";

const CreateGroupScreen = ({ onClose, user }) => {
  const [groupName, setGroupName] = useState("");
  const [contacts, setContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [contactsLoading, setContactsLoading] = useState(false);

  useEffect(() => {
    Logger.info("CreateGroupScreen mounted, loading contacts...");
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      setContactsLoading(true);
      Logger.info("Requesting contacts permission...");

      // Request permission first
      const { status } = await Contacts.requestPermissionsAsync();
      Logger.info("Permission status:", status);

      if (status === "granted") {
        Logger.info("Contacts permission granted, loading contacts...");

        // Get contacts with the correct API for v14
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
          sort: Contacts.SortTypes.FirstName,
        });

        Logger.info(`Total contacts found: ${data.length}`);

        // Filter contacts that have phone numbers
        const contactsWithPhones = data.filter(
          (contact) => contact.phoneNumbers && contact.phoneNumbers.length > 0
        );

        Logger.info(
          `Loaded ${contactsWithPhones.length} contacts with phone numbers`
        );
        setContacts(contactsWithPhones);
      } else {
        Logger.warn("Contacts permission denied, status:", status);
        Alert.alert(
          "Permission Required",
          "Please grant contacts permission to add contacts to groups. Go to Settings > Permissions > Contacts and enable access.",
          [
            { text: "Cancel" },
            {
              text: "Open Settings",
              onPress: () => Contacts.requestPermissionsAsync(),
            },
          ]
        );
      }
    } catch (error) {
      Logger.error("Error loading contacts:", error);
      Alert.alert(
        "Error",
        `Failed to load contacts: ${error.message}. Please try again.`
      );
    } finally {
      setContactsLoading(false);
    }
  };

  const toggleContactSelection = (contact) => {
    const isSelected = selectedContacts.some((c) => c.id === contact.id);
    if (isSelected) {
      setSelectedContacts((prev) => prev.filter((c) => c.id !== contact.id));
    } else {
      setSelectedContacts((prev) => [...prev, contact]);
    }
  };

  const createGroup = async () => {
    if (!groupName.trim()) {
      Alert.alert("Error", "Please enter a group name");
      return;
    }

    if (selectedContacts.length === 0) {
      Alert.alert("Error", "Please select at least one contact");
      return;
    }

    try {
      setLoading(true);
      Logger.info("Creating group:", groupName);

      const groupData = {
        name: groupName.trim(),
        createdBy: user?.phoneNumber || "test-user",
        contacts: selectedContacts.map((contact) => ({
          id: contact.id,
          name: contact.name,
          phoneNumbers: contact.phoneNumbers.map((phone) => phone.number),
        })),
        createdAt: new Date().toISOString(),
      };

      Logger.info("Group data:", groupData);

      const response = await fetch("http://localhost:8080/api/v1/groupadd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token || "mock-token"}`,
        },
        body: JSON.stringify(groupData),
      });

      if (response.ok) {
        const result = await response.json();
        Logger.info("Group created successfully:", result);
        Alert.alert(
          "Success",
          `Group "${groupName}" created successfully with ${selectedContacts.length} contacts!`,
          [{ text: "OK", onPress: onClose }]
        );
      } else {
        const errorData = await response.json();
        Logger.error("API error:", errorData);
        throw new Error(errorData.message || "Failed to create group");
      }
    } catch (error) {
      Logger.error("Error creating group:", error);
      Alert.alert(
        "Error",
        "Failed to create group. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const renderContact = ({ item }) => {
    const isSelected = selectedContacts.some((c) => c.id === item.id);
    const phoneNumber = item.phoneNumbers?.[0]?.number || "No phone";

    return (
      <TouchableOpacity
        style={[styles.contactItem, isSelected && styles.contactItemSelected]}
        onPress={() => toggleContactSelection(item)}
      >
        <View style={styles.contactInfo}>
          <Text style={styles.contactName}>{item.name}</Text>
          <Text style={styles.contactPhone}>{phoneNumber}</Text>
        </View>
        <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
          {isSelected && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </TouchableOpacity>
    );
  };

  const renderHeader = () => (
    <View style={styles.contentContainer}>
      {/* Selected Contacts Summary */}
      {selectedContacts.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Selected Contacts ({selectedContacts.length})
          </Text>
          <View style={styles.selectedContactsContainer}>
            {selectedContacts.map((contact, index) => (
              <Text key={contact.id} style={styles.selectedContactText}>
                {contact.name}
                {index < selectedContacts.length - 1 ? ", " : ""}
              </Text>
            ))}
          </View>
        </View>
      )}

      {/* Contacts List Header */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Select Contacts {contactsLoading ? "(Loading...)" : ""}
          </Text>
          <TouchableOpacity
            style={styles.refreshButton}
            onPress={loadContacts}
            disabled={contactsLoading}
          >
            <Text style={styles.refreshButtonText}>
              {contactsLoading ? "Loading..." : "Refresh"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderEmptyComponent = () => {
    if (contactsLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading contacts...</Text>
        </View>
      );
    }

    return (
      <View style={styles.noContactsContainer}>
        <Text style={styles.noContactsText}>
          No contacts available. This could be because:
        </Text>
        <Text style={styles.noContactsSubText}>
          • Contacts permission was denied
        </Text>
        <Text style={styles.noContactsSubText}>
          • No contacts with phone numbers found
        </Text>
        <Text style={styles.noContactsSubText}>
          • Contacts are still loading
        </Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadContacts}>
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onClose}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Group</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Group Name Input - Fixed outside of FlatList */}
      <View style={styles.groupNameSection}>
        <Text style={styles.sectionTitle}>Group Name</Text>
        <TextInput
          style={styles.groupNameInput}
          placeholder="Enter group name"
          value={groupName}
          onChangeText={setGroupName}
          maxLength={50}
          autoFocus={true}
        />
      </View>

      {/* Main Content - Using FlatList for contacts */}
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={renderContact}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyComponent}
        showsVerticalScrollIndicator={false}
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      />

      {/* Create Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.createButton, loading && styles.createButtonDisabled]}
          onPress={createGroup}
          disabled={
            loading || !groupName.trim() || selectedContacts.length === 0
          }
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.createButtonText}>Create Group</Text>
          )}
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
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonText: {
    fontSize: 20,
    color: "#333",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  placeholder: {
    width: 40,
  },
  groupNameSection: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  refreshButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  refreshButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  groupNameInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  selectedContactsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#E3F2FD",
    padding: 10,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#2196F3",
  },
  selectedContactText: {
    fontSize: 14,
    color: "#1976D2",
  },
  loadingContainer: {
    alignItems: "center",
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  contactItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: "#fff",
    marginVertical: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  contactItemSelected: {
    backgroundColor: "#E3F2FD",
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  contactPhone: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxSelected: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  checkmark: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  noContactsContainer: {
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  noContactsText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    fontWeight: "600",
    marginBottom: 10,
  },
  noContactsSubText: {
    textAlign: "center",
    fontSize: 14,
    color: "#888",
    marginBottom: 5,
  },
  retryButton: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 15,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  createButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  createButtonDisabled: {
    backgroundColor: "#ccc",
  },
  createButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default CreateGroupScreen;
