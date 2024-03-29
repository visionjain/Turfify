"use client"
import Nav from '@/components/navbar/page'
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
const MyTurf = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [userDetails, setUserDetails] = useState<any>(null);
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
            router.push('/login');
        } else {
            fetchUserData();
        }
    }, [router]);

    const expirylogout = async () => {
        try {
            await axios.get('/api/users/logout');
            localStorage.removeItem('token');
        } catch (error) {
            console.error("Error logging out:", error);
        }
    }
    
    return (
        <div>
            <div>
                <Nav loading={loading} userRole={userRole} userDetails={userDetails} showSearchBar={false} />
            </div>
            My turf
        </div>
    )
}

export default MyTurf
