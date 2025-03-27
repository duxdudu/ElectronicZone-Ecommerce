'use client';
import { Button } from "@/components/ui/button";
import { Check, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useState } from 'react';
// Authentication removed
import { useRouter } from 'next/navigation';

export default function SignUp(){
  const router = useRouter();
  const { toast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  return(
    <main className=" mt-48 flex-1 py-8">
    <div className="container mx-auto px-4">
      <div className="max-w-5xl mx-auto border rounded-lg p-8 grid md:grid-cols-2 gap-8">
        {/* Left Side - Form */}
        <div>
          <h2 className="text-2xl font-bold text-[#FF5722] mb-4">Create an account</h2>
          <h3 className="text-xl font-bold mb-6">Your Shopping Journey Starts Here - Create an Account Now!</h3>

          <form className="space-y-6" onSubmit={async (e) => {
            e.preventDefault();
            setError('');

            try {
              const response = await fetch('http://localhost:3002/auth/signup', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
              });

              const data = await response.json();

              if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
              }

              // Store the token
              localStorage.setItem('token', data.token);

              toast({
                title: "Success!",
                description: "Your account has been created successfully.",
                variant: "default",
              });

              router.push('/SignIn');
            } catch (err: any) {
              setError(err.message);
              toast({
                title: "Error",
                description: err.message,
                variant: "destructive",
              });
            }
          }}>
                <div>
                  <label htmlFor="fullname" className="block mb-2 font-medium">
                    FullName
                  </label>
                  <div className="flex">
                    <div className="bg-gray-100 flex items-center justify-center px-3 border border-r-0 rounded-l-md">
                      <User className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      type="text"
                      id="fullname"
                      name="fullname"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      className="flex-1 border rounded-r-md p-2 focus:outline-none focus:ring-1 focus:ring-[#FF5722]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block mb-2 font-medium">
                    Email Address
                  </label>
                  <div className="flex">
                    <div className="bg-gray-100 flex items-center justify-center px-3 border border-r-0 rounded-l-md">
                      <div className="w-5 h-5 flex items-center justify-center bg-white rounded">
                        <span className="text-xs font-bold text-red-500">M</span>
                      </div>
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@gmail.com"
                      className="flex-1 border rounded-r-md p-2 focus:outline-none focus:ring-1 focus:ring-[#FF5722]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block mb-2 font-medium">
                    Password
                  </label>
                  <div className="flex">
                    <div className="bg-gray-100 flex items-center justify-center px-3 border border-r-0 rounded-l-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-500"
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
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="flex-1 border rounded-r-md p-2 focus:outline-none focus:ring-1 focus:ring-[#FF5722]"
                      required
                      minLength={8}
                    />
                    
                  </div>
                </div>

                <div className="text-sm">
                  I have an account.{" "}
                  <Link href="/signIn" className="text-[#FF5722]">
                    Sign in here
                  </Link>
                </div>

                <Button className="w-full bg-[#FF5722] hover:bg-[#E64A19] text-white py-3 text-lg font-medium">
                  SIGN UP
                </Button>
              </form>
            </div>

            {/* Right Side - Image */}
            <div className="relative hidden md:block rounded-xl">
                <div className="absolute inset-0 bg-black/20 z-10 flex items-center justify-center text-white">
                  <div className="text-center p-6">
                    <h2 className="text-3xl font-bold mb-2">Your priority,</h2>
                    <p className="text-2xl">our destinations</p>
                  </div>
                </div>
                <Image
                  src="/signup.avif"
                  alt="Sign up background image"
                  width={600}
                  height={600}
                  className="object-cover h-full w-full rounded-2xl"
                />
              </div>
          </div>
        </div>
      </main>
    )
}