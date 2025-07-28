import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";

const { width } = Dimensions.get("window");

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState(["", "", "", "", ""]); // 5-digit PIN
  const [isLoading, setIsLoading] = useState(false);
  const pinRefs = useRef([]);

  const handlePinChange = (value, index) => {
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // Auto-focus next input
    if (value && index < 4) {
      pinRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && index > 0 && !pin[index]) {
      pinRefs.current[index - 1]?.focus();
    }
  };

  const handleLogin = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email");
      return;
    }

    const pinString = pin.join("");
    if (pinString.length !== 5) {
      Alert.alert("Error", "Please enter a 5-digit PIN");
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert("Success", "Login successful!");
      // navigation.navigate("Dashboard"); // Uncomment if Dashboard screen exists
    }, 2000);
  };

  const BankIcon = () => (
    <View style={styles.bankIconContainer}>
      <View style={styles.bankBuilding} />
      <View style={styles.bankPillar1} />
      <View style={styles.bankPillar2} />
      <View style={styles.bankPillar3} />
      <View style={styles.bankRoof} />
      <Text style={styles.bankText}>BANK</Text>
    </View>
  );

  const renderPinInputs = () => (
    <View style={styles.pinContainer}>
      {pin.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref) => (pinRefs.current[index] = ref)}
          style={[styles.pinInput, digit && styles.pinInputFilled]}
          value={digit}
          onChangeText={(value) => handlePinChange(value, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          keyboardType="numeric"
          maxLength={1}
          secureTextEntry
          textAlign="center"
        />
      ))}
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <BankIcon />
          <Text style={styles.welcomeText}>Welcome Back</Text>
          <Text style={styles.subtitleText}>Sign in to your account</Text>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your email"
              placeholderTextColor="#9ca3af"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* PIN Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>PIN</Text>
            <Text style={styles.pinSubtext}>Enter your 5-digit PIN</Text>
            {renderPinInputs()}
          </View>

          {/* Forgot Password */}
          {/* <TouchableOpacity
            style={styles.forgotPasswordContainer}
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text style={styles.forgotPasswordText}>Forgot PIN?</Text>
          </TouchableOpacity> */}

          {/* Login Button */}
          <TouchableOpacity
            style={[
              styles.loginButton,
              isLoading && styles.loginButtonDisabled,
            ]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text style={styles.loginButtonText}>
              {isLoading ? "Signing In..." : "Sign In"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.signupText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 30,
  },
  bankIconContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  bankBuilding: {
    width: 60,
    height: 45,
    backgroundColor: "#1e40af",
    borderRadius: 6,
  },
  bankPillar1: {
    position: "absolute",
    top: 10,
    left: 8,
    width: 6,
    height: 35,
    backgroundColor: "#ffffff",
    borderRadius: 3,
  },
  bankPillar2: {
    position: "absolute",
    top: 10,
    left: 27,
    width: 6,
    height: 35,
    backgroundColor: "#ffffff",
    borderRadius: 3,
  },
  bankPillar3: {
    position: "absolute",
    top: 10,
    right: 8,
    width: 6,
    height: 35,
    backgroundColor: "#ffffff",
    borderRadius: 3,
  },
  bankRoof: {
    position: "absolute",
    top: -3,
    width: 68,
    height: 15,
    backgroundColor: "#374151",
    borderRadius: 3,
  },
  bankText: {
    marginTop: 8,
    fontSize: 10,
    fontWeight: "bold",
    color: "#1e40af",
    letterSpacing: 1.5,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1f2937",
    marginBottom: 6,
  },
  subtitleText: {
    fontSize: 15,
    color: "#6b7280",
    fontWeight: "400",
  },
  formContainer: {
    flex: 1,
    paddingTop: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 6,
  },
  textInput: {
    height: 52,
    borderWidth: 2,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 15,
    color: "#1f2937",
    backgroundColor: "#f9fafb",
  },
  pinSubtext: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 12,
  },
  pinContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  pinInput: {
    width: 45,
    height: 52,
    borderWidth: 2,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
    backgroundColor: "#f9fafb",
    marginHorizontal: 3,
  },
  pinInputFilled: {
    borderColor: "#1e40af",
    backgroundColor: "#eff6ff",
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginBottom: 20,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "#1e40af",
    fontWeight: "600",
  },
  loginButton: {
    height: 52,
    backgroundColor: "#1e40af",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#1e40af",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  loginButtonDisabled: {
    backgroundColor: "#9ca3af",
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffff",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 24,
  },
  footerText: {
    fontSize: 15,
    color: "#6b7280",
  },
  signupText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1e40af",
  },
});

export default Login;
