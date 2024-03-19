"use client"
import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from 'sonner';
import LogoutButton from "@/components/logoutbutton/page";
import Loader from "@/components/loader/page";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const router = useRouter();
    const [userDetails, setUserDetails] = useState<any>(null); // Set the type to any
    const [userRole, setUserRole] = useState("");

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login'); // Redirect to login page if token doesn't exist
        } else {
            fetchUserData();
        }
    }, [router]);

    const fetchUserData = async () => {
        try {
            const response = await axios.get('/api/users/me');
            const { data } = response.data;
            setUserDetails(data);
            setUserRole(data.role);
        } catch (error) {
            console.error("Error fetching user data:", error);
            toast.error("Failed to fetch user data");
        }
    }
    
    const loginredirect = () => {
        router.push('/login');
    }

    if (!userDetails) {
        return <div className="flex items-center justify-center h-screen">
          <Loader/>
        </div>;
    }

    if (userRole === "user") {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h2>Welcome User</h2>
                <p>Name: {userDetails.name}</p>
                <p>Email: {userDetails.email}</p>
                <p>Phone Number: {userDetails.phoneNumber}</p>
                <LogoutButton />
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
