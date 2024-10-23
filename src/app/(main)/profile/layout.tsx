import React, { PropsWithChildren } from 'react'

function ProfileLayout({ children }: PropsWithChildren) {
  return (
    <div>
      {children}
    </div>
  )
}

export default ProfileLayout