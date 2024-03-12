"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
const Logingate = () => {
    const router = useRouter();

    const handleUserSignup = () => {
        router.push('/signupu');
    };

    const handlePartnerSignup = () => {
        router.push('/signupp');
    };
    const handlelogin = () => {
        router.push('/login');
    };
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-center flex flex-col space-y-4">
                <Button className='p-5' onClick={handleUserSignup}>User Signup</Button>
                <Button className='p-5' onClick={handlePartnerSignup}>Turf Signup</Button>
                <Button className='p-5' onClick={handlelogin}>Login</Button>
            </div>
        </div>
    )
}

export default Logingate
