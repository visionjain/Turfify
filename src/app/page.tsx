import Nav from '@/components/navbar/page'
import React from 'react'

const IndexPage = () => {
  return (
    <div>
      <div>
        <Nav showSearchBar={true} />
      </div>
      <div className='pt-16'>
        Hi this is Home Page
      </div>
    </div>

  )
}

export default IndexPage
