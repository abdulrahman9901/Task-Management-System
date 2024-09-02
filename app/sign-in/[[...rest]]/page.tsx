"use client";

import React from 'react'
import { SignIn } from "@clerk/nextjs";
import styled from 'styled-components';

function page() {
  return (
    <StyledSignIn>
      <SignIn />
    </StyledSignIn>
  );
}

const StyledSignIn = styled.div`
  .cl-internal-phfxlr {
    margin: auto;
  }
`; 
export default page;
