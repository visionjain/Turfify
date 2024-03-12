import React from 'react';
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

const Login = () => {
  return (
    <div className='flex flex-col h-screen'>
      <div className='flex-1 flex items-center justify-center'>
        <div>
          <Card className="w-[350px]">
            <CardHeader className='flex items-center justify-center'>
              <CardTitle className='text-lg'>Login</CardTitle>
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
                    <Label htmlFor="framework">Password</Label>
                    <Input type="password" placeholder="Password" />
                  </div>
                  <div className="flex items-center justify-center">
                    <Button className='px-20'>Login</Button>
                  </div>
                  <div className='mx-auto flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>or</div>
                  <p className='text-sm'>If you don&apos;t have an account, please&nbsp;
                    <Link className='text-blue-500 text-sm hover:underline' href='/logingate'>Signup</Link>
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
