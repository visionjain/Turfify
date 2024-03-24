"use client"
import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from 'sonner';
import LogoutButton from "@/components/logoutbutton/page";
import Loader from "@/components/loader/page";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Nav from "@/components/navbar/page";
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

    if (!userDetails) {
        return <div className="flex items-center justify-center h-screen">
            <Loader/>
        </div>;
    }

    if (userRole === "user") {
        return (
            <div>
               <Nav loading={loading} userRole={userRole} userDetails={userDetails} showSearchBar={false} />
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h2>Welcome User</h2>
                <p>Name: {userDetails.name}</p>
                <p>Email: {userDetails.email}</p>
                <p>Phone Number: {userDetails.phoneNumber}</p>
                <LogoutButton />
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