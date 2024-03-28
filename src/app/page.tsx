"use client"
import Nav from '@/components/navbar/page'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
const IndexPage = () => {
  const [userDetails, setUserDetails] = useState<any>(null);
  const [userRole, setUserRole] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const expirylogout = async () => {
      try {
        await axios.get('/api/users/logout')
  
        localStorage.removeItem('token');
      } catch (error: any) {
      }
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/users/me');
        const { data } = response.data;
        setUserDetails(data);
        setUserRole(data.role);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        expirylogout();
      }
    };
  
    fetchUserData(); // Call the function directly inside useEffect
  
  }, []); 

  return (
    <div>
      <div>
        <Nav loading={loading} userRole={userRole} userDetails={userDetails} showSearchBar={true} />
      </div>
      <div>
        Hi this is Home Page
      </div>
    </div>

  )
}

export default IndexPage
