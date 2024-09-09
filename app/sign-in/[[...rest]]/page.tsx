"use client";

import React from 'react'
import { SignIn, useSignIn } from "@clerk/nextjs";
import styled from 'styled-components';

function Page() {
  const { signIn, isLoaded } = useSignIn();

  const handleGuestLogin = async () => {
    if (!isLoaded) return;

    // Replace with your actual guest user credentials
    const guestEmail = "83cf646221@mailmaxy.one";
    const guestPassword = "83cf646221@mailmaxy.one";

    try {
      // Use Clerk's signIn method
      const result = await signIn.create({
        identifier: guestEmail,
        password: guestPassword,
      });

      if (result.status === "complete") {
        // Redirect to the dashboard or home page
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error during guest login:", error);
    }
  };

  return (
    <StyledSignIn>
      <SignIn />
      <GuestLoginButton onClick={handleGuestLogin} disabled={!isLoaded}>
        Login as Guest
      </GuestLoginButton>
    </StyledSignIn>
  );
}

const StyledSignIn = styled.div`
  .cl-internal-phfxlr {
    margin: auto;
  }
`;

const GuestLoginButton = styled.button`
  display: block;
  margin: 1rem auto;
  padding: 0.5rem 1rem;
  background-color: #4a90e2; // A blue color, you can adjust as needed
  color: white; // White text for contrast
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #357abd; // Darker blue on hover
  }

  &:disabled {
    background-color: #cccccc;
    color: #666666;
    cursor: not-allowed;
  }
`;

export default Page;
