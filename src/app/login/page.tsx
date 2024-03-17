"use client"
import React, { useState } from 'react';
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

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }
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
              <CardTitle className='text-lg'>Sign In</CardTitle>
              <CardDescription>Welcome to Turfify</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="framework">Email</Label>
                    <Input type="email" placeholder="Email" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input  type={showPassword ? "text" : "password"} placeholder="Password" />
                      <button type="button" onClick={togglePasswordVisibility} className="absolute top-1/2 right-3 transform -translate-y-1/2 focus:outline-none">
                        {showPassword ? <FaRegEye /> : <FaEyeSlash />}
                      </button>
                    </div>
                    <p>
                      <Link className='text-blue-500 text-[13px] items-end justify-end flex hover:underline' href='/forgotpass'>forgot password?</Link>
                    </p>
                  </div>
                  <div className="flex items-center justify-center">
                    <Button className='px-20'>Sign In</Button>
                  </div>
                  <div className='mx-auto flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>or</div>
                  <p className='text-sm'>If you don&apos;t have an account, please&nbsp;
                    <Link className='text-blue-500 text-sm hover:underline' href='/signup'>Signup</Link>
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

export default Login
