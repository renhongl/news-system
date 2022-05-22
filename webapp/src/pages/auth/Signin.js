import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SignIn() {

  const navigate = useNavigate()

  const handleSignin = useCallback(() => {
    localStorage.setItem('token', 'test')
    navigate('/mgmt', {replace: true})
  })

  return (
    <section>
      <div>login</div>
      <input type='text' />
      <button onClick={() => handleSignin()}>login</button>
    </section>
  )
}
