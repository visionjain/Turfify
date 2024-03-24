"use client"
import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from 'sonner';
import { useRouter } from "next/navigation";
import Nav from '@/components/navbar/page';
import Loader from "@/components/loader/page";
import { Button } from "@/components/ui/button";


const Bookings = () => {
    const router = useRouter();
    const [userDetails, setUserDetails] = useState<any>(null); // Set the type to any
    const [userRole, setUserRole] = useState("");
    const [loading, setLoading] = useState(true);

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
            setLoading(false);
        } catch (error) {
            console.error("Error fetching user data:", error);
            toast.error("Failed to fetch user data");
            setLoading(false);
        }
    }

    const loginredirect = () => {
        router.push('/login');
    }
    if (!userDetails) {
        return <div className="flex items-center justify-center h-screen">
            <Loader />
        </div>;
    }
    if (userRole === "user") {
        return (
            <div>
                <Nav loading={loading} userRole={userRole} userDetails={userDetails} showSearchBar={false} />
                <div className='flex items-center justify-center h-screen text-5xl'>
                    Bana Raha hu BSDK
                    <div>
                        <Loader />
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <div>There is an issue, please login again</div>
                <Button variant='outline' onClick={loginredirect}>Login</Button>
            </div>
        );
    }
}

export default Bookings
