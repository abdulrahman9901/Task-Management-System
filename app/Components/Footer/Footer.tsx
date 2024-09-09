import React from "react";
import styled from "styled-components";
import { useGlobalState } from '@/app/Context/globalProviders';

function Footer() {
  const { theme } = useGlobalState();

  return (
    <StyledFooter>
      <div className="footer-content">
        <p>Developed by Abdulrahman Badr. For any inquiries, contact me via:</p>
        <div className="icons">
          <a href="mailto:aba884682@gmail.com" aria-label="Email">
            <i className="fas fa-envelope"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/abdulrahmanbadr99/"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-linkedin"></i>
          </a>
          <a
            href="https://github.com/abdulrahman9901"
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-github"></i>
          </a>
        </div>
      </div>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #f8f9fa; /* Light background for better visibility */
  border-top: 1px solid #e2e2e2; /* Subtle border at the top */
  padding: 1rem;
  text-align: center;

  .footer-content {
    max-width: 1200px; /* Ensures content doesn't stretch too wide */
    margin: 0 auto; /* Centers content horizontally */
  }

  .footer-content p {
    color: #333;
    margin: 0;
    font-size: 1rem; /* Responsive font size */
  }

  .icons {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 0.5rem;
  }

  .icons a {
    color: #333; /* Default icon color */
    font-size: 1.5rem;
    text-decoration: none;
    transition: color 0.3s;
  }

  .icons a:hover {
    color: #0073b1; /* Hover effect color (LinkedIn blue) */
  }

  .icons a[aria-label="Email"]:hover {
    color: #d44638; /* Email icon color (Gmail red) */
  }

  .icons a[aria-label="GitHub"]:hover {
    color: #333; /* GitHub black */
  }

  @media (max-width: 768px) {
    .footer-content {
      padding: 0 0.5rem; /* Reduce padding on smaller screens */
    }

    .icons {
      gap: 0.5rem; /* Reduce gap between icons */
    }

    .icons a {
      font-size: 1.2rem; /* Adjust icon size on smaller screens */
    }
  }
`;

export default Footer;
