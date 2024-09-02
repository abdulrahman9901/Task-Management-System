"use client";
import { useGlobalState } from "@/app/Context/globalProviders";
import React from "react";
import styled from "styled-components";

interface Props {
  content: React.ReactNode;
}

function Modal({ content }: Props) {
  const { closeModal } = useGlobalState();

  const { theme } = useGlobalState();
  return (
    <ModalStyled theme={theme}>
      <div className="modal-overlay" onClick={closeModal}></div>
      <div className="modal-content">{content}</div>
    </ModalStyled>
  );
}

const ModalStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh; /* Ensures the modal container covers the full viewport height */
  z-index: 100;

  display: flex;
  justify-content: center;
  align-items: center; /* Centers the modal content vertically and horizontally */

  .modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh; /* Overlay also covers the full viewport height */
    background-color: rgba(0, 0, 0, 0.45);
    filter: blur(4px);
    z-index: 1;
  }

  .modal-content {
    padding: 2rem;
    position: relative;
    max-width: 630px;
    width: 90%;
    z-index: 2; /* Ensures modal content is above the overlay */

    border-radius: 1rem;
    background-color: ${(props) => props.theme.colorBg2};
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.3);
    border-radius: ${(props) => props.theme.borderRadiusMd2};

    @media screen and (max-width: 450px) {
      font-size: 90%;
    }
  }
`;


export default Modal;
