
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface LoginFormProps {
  onSubmit: (e: React.FormEvent) => Promise<void>;
  formData: {
    email: string;
    password: string;
    rememberMe: boolean;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: {
    email: string;
    password: string;
  };
  isLoading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  formData,
  handleChange,
  errors,
  isLoading
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="space-y-4 animate-fade-up">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            name="email"
            type="email" 
            placeholder="name@example.com" 
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && (
            <p className="text-destructive text-sm">{errors.email}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link to="/forgot-password" className="text-sm text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <Input 
            id="password"
            name="password" 
            type="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? "border-destructive" : ""}
          />
          {errors.password && (
            <p className="text-destructive text-sm">{errors.password}</p>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="remember" 
            name="rememberMe"
            checked={formData.rememberMe}
            onCheckedChange={(checked) => 
              handleChange({
                target: {
                  name: "rememberMe",
                  type: "checkbox",
                  checked: checked === true,
                  value: ""
                }
              } as React.ChangeEvent<HTMLInputElement>)
            }
          />
          <Label htmlFor="remember" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Remember me
          </Label>
        </div>
      </div>
      
      <div className="flex flex-col space-y-4 mt-6">
        <Button 
          type="submit" 
          className="w-full animate-fade-up"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
        <div className="text-center text-sm animate-fade-up">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
