"use client";

import React from 'react'
import styled from 'styled-components';
interface Props {
    children:React.ReactNode;
}

function GlobalStylesProviders({ children }: Props) {
  return <GlobalStyles>{children}</GlobalStyles>;
}

const GlobalStyles = styled.div`
  display: flex;
  height: 100vh;
  gap: 1rem;
  padding: 1.5rem;
  transition: all 0.3s ease-in-out;

  @media screen and (max-width: 768px) {
    padding: 0.8rem;
    gap: 0.5rem;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
  }
`;



export default GlobalStylesProviders;

