import React, { useState } from "react";
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

const { width, height } = Dimensions.get("window");

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert("Success", "Login successful!");
      // navigation.navigate('Dashboard');
    }, 2000);
  };

  const EyeIcon = ({ show }) => (
    <View style={styles.eyeIcon}>
      <View style={[styles.eyeOuter, !show && styles.eyeClosed]} />
      {show && <View style={styles.eyeInner} />}
    </View>
  );

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

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter your password"
                placeholderTextColor="#9ca3af"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <EyeIcon show={showPassword} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity
            style={styles.forgotPasswordContainer}
            onPress={() => navigation?.navigate("ForgotPassword")}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

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

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Biometric Login */}
          <TouchableOpacity style={styles.biometricButton}>
            <View style={styles.fingerprintIcon} />
            <Text style={styles.biometricText}>Use Fingerprint</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation?.navigate("Signup")}>
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
    paddingBottom: 40,
  },
  bankIconContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  bankBuilding: {
    width: 80,
    height: 60,
    backgroundColor: "#1e40af",
    borderRadius: 8,
  },
  bankPillar1: {
    position: "absolute",
    top: 15,
    left: 10,
    width: 8,
    height: 45,
    backgroundColor: "#ffffff",
    borderRadius: 4,
  },
  bankPillar2: {
    position: "absolute",
    top: 15,
    left: 36,
    width: 8,
    height: 45,
    backgroundColor: "#ffffff",
    borderRadius: 4,
  },
  bankPillar3: {
    position: "absolute",
    top: 15,
    right: 10,
    width: 8,
    height: 45,
    backgroundColor: "#ffffff",
    borderRadius: 4,
  },
  bankRoof: {
    position: "absolute",
    top: -5,
    width: 90,
    height: 20,
    backgroundColor: "#374151",
    borderRadius: 4,
  },
  bankText: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: "bold",
    color: "#1e40af",
    letterSpacing: 2,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1f2937",
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 16,
    color: "#6b7280",
    fontWeight: "400",
  },
  formContainer: {
    flex: 1,
    paddingTop: 20,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  textInput: {
    height: 56,
    borderWidth: 2,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#1f2937",
    backgroundColor: "#f9fafb",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    backgroundColor: "#f9fafb",
    height: 56,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#1f2937",
  },
  eyeButton: {
    padding: 16,
  },
  eyeIcon: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  eyeOuter: {
    width: 20,
    height: 12,
    borderWidth: 2,
    borderColor: "#6b7280",
    borderRadius: 10,
  },
  eyeClosed: {
    borderTopWidth: 0,
    borderBottomWidth: 2,
    height: 2,
    marginTop: 5,
  },
  eyeInner: {
    position: "absolute",
    width: 8,
    height: 8,
    backgroundColor: "#6b7280",
    borderRadius: 4,
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginBottom: 32,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "#1e40af",
    fontWeight: "600",
  },
  loginButton: {
    height: 56,
    backgroundColor: "#1e40af",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    elevation: 3,
    shadowColor: "#1e40af",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  loginButtonDisabled: {
    backgroundColor: "#9ca3af",
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#e5e7eb",
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
  },
  biometricButton: {
    height: 56,
    borderWidth: 2,
    borderColor: "#1e40af",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  fingerprintIcon: {
    width: 24,
    height: 24,
    backgroundColor: "#1e40af",
    borderRadius: 12,
    marginRight: 12,
  },
  biometricText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e40af",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 32,
  },
  footerText: {
    fontSize: 16,
    color: "#6b7280",
  },
  signupText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e40af",
  },
});

export default Login;
