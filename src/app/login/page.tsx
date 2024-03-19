"use client"
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import CopyRight from '@/components/copybar/page.';
import DarkModeButton from '@/components/darkmode/page';
import { FaRegEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading indicator
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      toast.info("Already Logged In.", {
        style: {
          background: 'red',
          color: 'white',
        },
      }),
      router.push('/'); // Redirect to home page if token exists
    }
  }, [router]); 

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user.email || !user.password) {
      alertIncompleteFields();
      return;
    }

    // Start loading
    setLoading(true);

    try {
      const response = await axios.post("/api/users/login", user);
      toast.success("Login successful", {
        style: {
          background: 'green',
          color: 'white',
        },
      });
      localStorage.setItem('token', response.data.token); // Store token in localStorage
      router.push("/");
    } catch (error: any) {
      toast.error(error.response.data.error, {
        style: {
          background: 'red',
          color: 'white',
        },
      });
    } finally {
      // Stop loading
      setLoading(false);
    }
  }

  const alertIncompleteFields = () => {
    toast.info("Please fill all fields.", {
      style: {
        background: 'red',
        color: 'white',
      },
    });
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className='flex flex-col h-screen'>
      <div className='pt-4 items-center justify-center flex italic text-2xl font-bold tracking-tight'>
        TURFIFY
      </div>
      <DarkModeButton />
      <div className='flex-1 flex items-center justify-center'>
        <div>
          <Card className="w-[350px] dark:border dark:border-white">
            <CardHeader className='flex items-center justify-center'>
              <CardTitle className='text-lg'>Log in</CardTitle>
              <CardDescription>Welcome to Turfify</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignIn}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email"
                      type="text"
                      value={user.email}
                      onChange={(e) => setUser({ ...user, email: e.target.value })}
                      placeholder="Email"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input id="password"
                        type={showPassword ? "text" : "password"}
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        placeholder="Password" />
                      <button type="button" onClick={togglePasswordVisibility} className="absolute top-1/2 right-3 transform -translate-y-1/2 focus:outline-none">
                        {showPassword ? <FaRegEye /> : <FaEyeSlash />}
                      </button>
                    </div>
                    <p>
                      <Link className='text-blue-500 text-[13px] items-end justify-end flex hover:underline' href='/forgotpass'>Forgot password?</Link>
                    </p>
                  </div>
                  <div className="flex items-center justify-center">
                    <Button className='px-20' type="submit">{loading ? "Loading..." : "Log in"}</Button>
                    {/* Show loading indicator or button text based on loading state */}
                  </div>
                  <div className='mx-auto flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>or</div>
                  <p className='text-sm'>If you don&apos;t have an account, please&nbsp;
                    <Link className='text-blue-500 text-sm hover:underline' href='/signup'>Sign Up</Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <CopyRight />
    </div>
  )
}
