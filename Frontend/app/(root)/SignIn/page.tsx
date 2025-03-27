"use client"
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from 'react';
// Authentication removed
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";

export default function SignIn(){
const [showPassword, setShowPassword] = useState(false);
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');
const router = useRouter();

const { toast } = useToast();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');

  try {
    const response = await fetch('http://localhost:3002/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    // Store the token
    localStorage.setItem('token', data.token);

    toast({
      title: "Success!",
      description: "You have successfully logged in.",
      variant: "default",
    });

    router.push('/');
  } catch (err: any) {
    setError(err.message);
    toast({
      title: "Error",
      description: err.message,
      variant: "destructive",
    });
  }
};

    return (
        <main className=" mt-48 flex-1 py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-white rounded-lg border overflow-hidden">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Login Form */}
              <div className="p-8">
                <h2 className="text-2xl font-bold text-[#FF5722] mb-4">Login</h2>
                <p className="text-gray-700 mb-6">Enjoy a faster checkout experience by saving your details securely</p>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium">
                      Username/ Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input 
                        id="email" 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@gmail.com" 
                        className="pl-10" 
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </div>
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••"
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#FF5722] text-sm"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        className="data-[state=checked]:bg-[#FF5722] data-[state=checked]:border-[#FF5722]"
                      />
                      <label htmlFor="remember" className="text-sm font-medium">
                        Remember Me
                      </label>
                    </div>
                    <Link href="#" className="text-[#FF5722] text-sm hover:underline">
                      Forgot Password
                    </Link>
                  </div>

                  <Button type="submit" className="w-full bg-[#FF5722] hover:bg-[#E64A19] text-white py-6">
                    SIGN IN
                  </Button>

                  <div className="text-center">
                    <p className="text-sm">
                      I don't have account{" "}
                      <Link href="/signUp" className="text-[#FF5722] font-medium hover:underline">
                        Sign up Here
                      </Link>
                    </p>
                  </div>
                </form>
              </div>

              {/* Image Section */}
              <div className="relative hidden md:block">
                <Image
                  alt="Login"
                  className="object-cover"
                  height="600"
                  src="/signIn.avif"
                  style={{
                    aspectRatio: "500/600",
                    objectFit: "cover",
                  }}
                  width="500"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
}