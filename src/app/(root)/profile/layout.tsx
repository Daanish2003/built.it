import React from 'react'

const ProfileLayout = ({children}: {children : React.ReactNode}) => {
  return (
    <div className="mt-6 flex justify-center">{children}</div>
  )
}

export default ProfileLayout