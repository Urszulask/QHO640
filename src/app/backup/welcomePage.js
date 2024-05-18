'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function WelcomePage() {
  const router = useRouter();

  const handleLogout = () => {
    // Perform any necessary logout actions here
    // For example, clearing user session data or tokens

    // Navigate back to the login page
    router.push('/login');
  };

  return (
    <div>
      <h1>Welcome!</h1>
      <p>You have successfully logged in.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}