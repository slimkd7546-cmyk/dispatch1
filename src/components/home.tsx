import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "@/components/layout/AuthLayout";
import LoginForm from "./auth/LoginForm";

const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (values: {
    email: string;
    password: string;
    rememberMe?: boolean;
  }) => {
    setIsLoading(true);
    setError("");

    try {
      // Simulate authentication process
      console.log("Login attempt with:", values);

      // For demo purposes, we'll simulate a successful login after a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulate role-based redirection
      // In a real app, this would come from your auth response
      const userRole = values.email.includes("admin")
        ? "Admin"
        : values.email.includes("dispatcher")
          ? "Dispatcher"
          : values.email.includes("officer")
            ? "Officer"
            : values.email.includes("reviewer")
              ? "Reviewer"
              : values.email.includes("connect")
                ? "Connect"
                : values.email.includes("driver")
                  ? "Driver"
                  : "Dispatcher";

      // Store auth info in localStorage or state management
      localStorage.setItem("userRole", userRole);
      localStorage.setItem("isAuthenticated", "true");

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AuthLayout
        title="Welcome to Dispatch Management System"
        subtitle="Sign in to access your account and manage security operations."
      >
        <LoginForm onSubmit={handleLogin} isLoading={isLoading} error={error} />
      </AuthLayout>
    </div>
  );
};

export default Home;
