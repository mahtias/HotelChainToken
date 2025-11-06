import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { FaGoogle, FaFacebook, FaWeixin, FaWallet } from "react-icons/fa";
import { SiBinance } from "react-icons/si";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Auth() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("register");
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("tab");
    if (tab === "login" || tab === "register") {
      setActiveTab(tab);
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log("Register data:", formData);
  };

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login data:", {
      email: formData.email,
      password: formData.password,
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.formSection}>
        {/* Tabs */}
        <div style={styles.tabs}>
          <span
            style={{
              ...styles.tab,
              fontWeight: activeTab === "login" ? "bold" : "normal",
            }}
            onClick={() => setActiveTab("login")}
          >
            Login
          </span>
          <span
            style={{
              ...styles.tab,
              fontWeight: activeTab === "register" ? "bold" : "normal",
              marginLeft: 10,
            }}
            onClick={() => setActiveTab("register")}
          >
            Register
          </span>
        </div>

        {/* === LOGIN FORM === */}
        {activeTab === "login" && (
          <form onSubmit={handleLogin} style={styles.form}>
            <label htmlFor="email" style={styles.label}>
              Email
            </label>
            <input
              type="email"
              name="email"
              id="loginEmail"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              required
            />

            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <input
              type="password"
              name="password"
              id="loginPassword"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              required
            />

            <button type="submit" style={styles.registerBtn}>
              LOGIN
            </button>

            <p style={{ marginTop: "10px" }}>
              Don’t have an account?{" "}
              <span
                style={styles.loginLink}
                onClick={() => setActiveTab("register")}
              >
                REGISTER
              </span>
            </p>
          </form>
        )}

        {/* === REGISTER FORM === */}
        {activeTab === "register" && (
          <>
            <form onSubmit={handleRegister} style={styles.form}>
              <label htmlFor="firstName" style={styles.label}>
                First name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                style={styles.input}
                required
              />

              <label htmlFor="lastName" style={styles.label}>
                Last name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                style={styles.input}
                required
              />

              <label htmlFor="email" style={styles.label}>
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
                required
              />

              <label htmlFor="password" style={styles.label}>
                Create Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                style={styles.input}
                required
              />

              <label htmlFor="confirmPassword" style={styles.label}>
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                style={styles.input}
                required
              />

              <button type="submit" style={styles.registerBtn}>
                REGISTER
              </button>
            </form>

            <p style={styles.agreementText}>
              By clicking 'Register', I agree to the{" "}
              <a href="#" style={styles.link}>
                Terms of Use
              </a>{" "}
              and{" "}
              <a href="#" style={styles.link}>
                Privacy Policy
              </a>
            </p>

            <p>
              Already Registered?{" "}
              <span
                style={styles.loginLink}
                onClick={() => setActiveTab("login")}
              >
                LOGIN
              </span>
            </p>
          </>
        )}
      </div>

      {/* OAuth Buttons */}
      <div style={styles.buttonsSection}>
        <button style={{ ...styles.oauthBtn, backgroundColor: "#181a2a" }}>
          <FaWallet size={20} />
          Continue with Web3 Wallet <span style={styles.newLabel}>NEW!</span>
        </button>

        <button style={{ ...styles.oauthBtn, backgroundColor: "#f3ba2e" }}>
          <SiBinance size={20} />
          Continue with Binance
        </button>

        <button style={{ ...styles.oauthBtn, backgroundColor: "#3b5998" }}>
          <FaFacebook size={20} />
          Continue with Facebook
        </button>

        <button style={{ ...styles.oauthBtn, backgroundColor: "#d54438" }}>
          <FaGoogle size={20} />
          Continue with Google
        </button>

        <button style={{ ...styles.oauthBtn, backgroundColor: "#1ebe48" }}>
          <FaWeixin size={20} />
          Continue with WeChat
        </button>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: "40px",
    padding: "20px",
    maxWidth: "900px",
    margin: "auto",
    flexWrap: "wrap",
  },
  formSection: {
    flex: 1,
    minWidth: "280px",
  },
  buttonsSection: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    flex: 0.8,
    minWidth: "200px",
  },
  tabs: {
    marginBottom: "20px",
    fontSize: "20px",
  },
  tab: {
    cursor: "pointer",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "6px",
    fontWeight: "bold",
  },
  input: {
    marginBottom: "15px",
    padding: "8px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  registerBtn: {
    padding: "12px",
    backgroundColor: "#181a2a",
    color: "white",
    fontWeight: "bold",
    fontSize: "16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  agreementText: {
    fontSize: "12px",
    color: "#555",
    marginTop: "12px",
    marginBottom: "8px",
  },
  link: {
    textDecoration: "underline",
    cursor: "pointer",
  },
  loginLink: {
    fontWeight: "bold",
    cursor: "pointer",
    color: "#181a2a",
  },
  oauthBtn: {
    display: "flex",
    alignItems: "center",
    padding: "10px 20px",
    color: "white",
    fontWeight: "600",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    justifyContent: "start",
    gap: "10px",
  },
  newLabel: {
    backgroundColor: "red",
    fontSize: "10px",
    padding: "2px 5px",
    borderRadius: "4px",
    marginLeft: "auto",
  },
};
