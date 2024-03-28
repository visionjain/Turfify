"use client"
import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from 'sonner';
import LogoutButton from "@/components/logoutbutton/page";
import Loader from "@/components/loader/page";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Nav from "@/components/navbar/page";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator"

export default function ProfilePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [userDetails, setUserDetails] = useState<any>(null); // Set the type to any
    const [userRole, setUserRole] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('/api/users/me');
                const { data } = response.data;
                setUserDetails(data);
                setUserRole(data.role);
                setLoading(false);
            } catch (error) {
                expirylogout();
                router.push('/login');
            }
        }
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login'); // Redirect to login page if token doesn't exist
        } else {
            fetchUserData();
        }
    }, [router]);
    const expirylogout = async () => {
        try {
            await axios.get('/api/users/logout')
            localStorage.removeItem('token');
        } catch (error: any) {
        }
    }

    const loginredirect = () => {
        router.push('/login');
    }
    const getInitials = (name: string) => {
        const names = name.split(' ');
        return names.map((word) => word[0]).join('').toUpperCase();
    };

    if (!userDetails) {
        return <div className="flex items-center justify-center h-screen">
            <Loader />
        </div>;
    }

    if (userRole === "user") {
        return (
            <div className="h-screen">
                <div>
                    <Nav loading={loading} userRole={userRole} userDetails={userDetails} showSearchBar={false} />
                </div>
                <div className="flex h-[92%]">
                    <div className="flex-col flex w-1/4 items-center pt-10">
                        <Avatar className="h-40 w-40">
                            <AvatarFallback className='text-7xl'>{getInitials(userDetails.name)}</AvatarFallback>
                        </Avatar>
                        <p className="text-3xl pt-2 font-normal">{userDetails.name}</p>
                        <p>{userDetails.phoneNumber}</p>
                    </div>
                    <div>
                    <Separator  orientation="vertical" />
                    </div>
                    <div className="flex w-3/4">
                        <div className="w-[100%]">
                            <div className="font-normal ml-4 my-4 text-3xl">General account settings</div>
                            <Separator />
                            <div className="w-[80%] ml-4 mt-2">
                            <div className="p-2">
                                <Label htmlFor="email">Name</Label>
                                <Input type="text" className="border-black dark:border-white" id="name" placeholder={userDetails.name} readOnly />
                            </div>
                            <div className="p-2">
                                <Label htmlFor="email">Email</Label>
                                <Input type="email" id="email" className="border-black dark:border-white" placeholder={userDetails.email} readOnly />
                            </div>
                            <div className="p-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input type="text" id="phone" className="border-black dark:border-white" placeholder={userDetails.phoneNumber} readOnly />
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else if (userRole === "admin") {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h2>Welcome Admin</h2>
                <p>Name: {userDetails.name}</p>
                <p>Email: {userDetails.email}</p>
                <p>Phone Number: {userDetails.phoneNumber}</p>
                <LogoutButton />
            </div>
        );
    } else if (userRole === "turf") {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h2>Welcome Turf</h2>
                <p>Name: {userDetails.name}</p>
                <p>Email: {userDetails.email}</p>
                <p>Phone Number: {userDetails.phoneNumber}</p>
                <LogoutButton />
            </div>
        );
    } else {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <div>There is an issue, please login again</div>
                <LogoutButton />
                <Button variant='outline' onClick={loginredirect}>Login</Button>
            </div>
        );
    }
}