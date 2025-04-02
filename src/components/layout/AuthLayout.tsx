import React from "react";
import { motion } from "framer-motion";
import { Shield, Lock } from "lucide-react";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

const AuthLayout = ({
  children,
  title = "Welcome to Dispatch Management System",
  subtitle = "Sign in to access your account and manage dispatch operations.",
}: AuthLayoutProps) => {
  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Left side - Branding/Info section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-900 to-blue-950 text-white p-8 flex-col justify-between">
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2"
          >
            <Shield size={32} className="text-teal-400" />
            <h1 className="text-2xl font-bold">Dispatch Management System</h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-16 space-y-6"
          >
            <h2 className="text-4xl font-bold leading-tight">
              Streamline your security operations with our modern dispatch
              platform
            </h2>
            <p className="text-lg text-blue-100 max-w-md">
              Real-time tracking, task management, and seamless communication
              for security teams.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-auto space-y-8"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-800/30 p-4 rounded-lg">
              <h3 className="font-medium text-teal-400 mb-2">
                Real-time Updates
              </h3>
              <p className="text-sm text-blue-100">
                Monitor dispatch status and officer locations in real-time
              </p>
            </div>
            <div className="bg-blue-800/30 p-4 rounded-lg">
              <h3 className="font-medium text-teal-400 mb-2">
                Task Management
              </h3>
              <p className="text-sm text-blue-100">
                Create, assign, and track security tasks efficiently
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-sm text-blue-200">
            <Lock size={16} />
            <span>
              Enterprise-grade security with role-based access control
            </span>
          </div>
        </motion.div>
      </div>

      {/* Right side - Form section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <Card className="w-full max-w-md p-8 shadow-lg border-0">
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
              <p className="text-muted-foreground">{subtitle}</p>
            </div>

            <Separator />

            {children}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AuthLayout;
