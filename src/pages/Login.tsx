
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import LoginForm from "@/components/auth/LoginForm";
import DemoAccountSelector from "@/components/auth/DemoAccountSelector";
import gsap from "gsap";

// Demo credentials
const demoUsers = [
  {
    role: "candidate",
    email: "candidate@example.com",
    password: "password123"
  },
  {
    role: "employer",
    email: "employer@example.com",
    password: "password123"
  },
  {
    role: "admin",
    email: "admin@example.com",
    password: "admin123"
  }
];

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, isLoading: authLoading } = useAuth();
  const formRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".animate-fade-up", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      });
    }, formRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      email: "",
      password: ""
    };

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      await login(formData.email, formData.password);
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    const demoUser = demoUsers.find(user => user.role === role);
    if (demoUser) {
      setFormData(prev => ({
        ...prev,
        email: demoUser.email,
        password: demoUser.password
      }));
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 md:px-6 py-12 flex items-center justify-center">
        <div ref={formRef} className="w-full max-w-md">
          <Card className="animate-fade-up glass-card shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center animate-fade-up">Sign In</CardTitle>
              <CardDescription className="text-center animate-fade-up">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <DemoAccountSelector
                selectedRole={selectedRole}
                onRoleSelect={handleRoleSelect}
                demoUsers={demoUsers}
              />
              
              <LoginForm
                onSubmit={handleSubmit}
                formData={formData}
                handleChange={handleChange}
                errors={errors}
                isLoading={isLoading || authLoading}
              />
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
