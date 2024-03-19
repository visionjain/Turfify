"use client";
import axios from "axios";
import React, { useState } from "react";
import { toast } from 'sonner';
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";


export default function LogoutButton() {
    const router = useRouter()
    const logout = async () => {
        try {
            await axios.get('/api/users/logout')

            localStorage.removeItem('token');
            
            toast.success('Logout successful', {
                style: {
                    background: 'green',
                    color: 'white',
                },
            });
            router.push('/login')
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    return (
        <div>
            <Button
                onClick={logout}
                variant='destructive'
            >Logout</Button>
        </div>


    )
}