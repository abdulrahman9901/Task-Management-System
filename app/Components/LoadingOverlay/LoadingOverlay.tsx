"use client";

import React from 'react';
import styled from 'styled-components';
import { useGlobalState } from '@/app/Context/globalProviders';

const LoadingOverlay = () => {
  const { isLoggingOut, theme } = useGlobalState();

  if (!isLoggingOut) return null;

  return (
    <OverlayStyled theme={theme}>
      <div className="loading-content">
        <div className="spinner"></div>
        <h3>Signing out...</h3>
        <p>Please wait while we sign you out</p>
      </div>
    </OverlayStyled>
  );
};

const OverlayStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(5px);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .loading-content {
    text-align: center;
    color: ${(props) => props.theme.colorWhite};
    background: ${(props) => props.theme.colorBg2};
    padding: 3rem 2rem;
    border-radius: 1rem;
    border: 2px solid ${(props) => props.theme.borderColor2};
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    min-width: 300px;
    max-width: 400px;
  }

  .spinner {
    width: 50px;
    height: 50px;
    border: 4px solid ${(props) => props.theme.colorGrey3};
    border-top: 4px solid ${(props) => props.theme.colorGreenDark};
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1.5rem auto;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: ${(props) => props.theme.colorGrey0};
    font-weight: 600;
  }

  p {
    font-size: 1rem;
    color: ${(props) => props.theme.colorGrey2};
    margin: 0;
  }

  @media screen and (max-width: 450px) {
    .loading-content {
      margin: 1rem;
      padding: 2rem 1.5rem;
      min-width: auto;
    }

    h3 {
      font-size: 1.3rem;
    }

    p {
      font-size: 0.9rem;
    }
  }
`;

export default LoadingOverlay;
