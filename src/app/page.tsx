"use client"
import Loader from '@/components/loader/page';
import Nav from '@/components/navbar/page'
import React, { useState, useEffect } from 'react';

const IndexPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay of 2 seconds
    const timeout = setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds
    }, 500);

    // Clean up the timeout to avoid memory leaks
    return () => clearTimeout(timeout);
  }, []);


  return (
    <div>
      {loading ? ( 
        <div className='h-screen items-center justify-center flex'><Loader/></div>
      ) : (
        <div>
          <Nav showSearchBar={true} />
          <div className='pt-16'>
            Hi this is Home Page
          </div>
        </div>
      )}
    </div>
  )
}

export default IndexPage
