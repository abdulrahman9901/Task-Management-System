"use client";

import React from 'react'
import {SignUp } from "@clerk/nextjs";
import styled from 'styled-components';

function page() {
  return (
    <StyledSignUp>
      <SignUp />
    </StyledSignUp>
  );
}

const StyledSignUp = styled.div`
  .cl-internal-phfxlr {
    margin: auto;
  }
`; 
export default page;
