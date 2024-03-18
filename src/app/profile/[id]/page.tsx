import React from 'react'

const ProfilePage = ({params}: any) => {
  return (
    <div className='flex items-center justify-center h-screen'>
      <h1>profile</h1>
      <hr/>
      <p>profile page {params.id}</p>
    </div>
  )
}

export default ProfilePage
