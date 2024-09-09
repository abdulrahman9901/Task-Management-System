"use client";

import React, { useState } from 'react'
import styled from 'styled-components';
import { useGlobalState } from '@/app/Context/globalProviders';
import Image from "next/image"
import menu from "@/app/utils/menu";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import profileImage from '@/public/avatar.jpg'; 
import { UserButton, useUser, useClerk } from "@clerk/nextjs";
import { arrowLeft, bars, logout } from '@/app/utils/icons';

function Sidebar() {
  const { theme, collapsed, collapseMenu } = useGlobalState();
  const router = useRouter();
  const pathname = usePathname();

  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();

  const isGuestUser = user?.primaryEmailAddress?.emailAddress === "83cf646221@mailmaxy.one";

  const displayName = isLoaded 
    ? (isGuestUser ? "Guest User" : user?.fullName || "Guest User") 
    : "Loading...";
  const displayImage = user?.imageUrl || profileImage;

  const handleClick = (link: string) => {
    router.push(link);
  };

  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut();
      // Immediately redirect to sign-in page
      router.push('/sign-in');
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setIsSigningOut(false);
    }
  };

  if (!isLoaded || !user) {
    return null; // Don't render the sidebar if there's no authenticated user
  }

  return (
    <SidebarStyled theme={theme} collapsed={collapsed}>
      <button className="toggle-nav" onClick={collapseMenu}>
        {collapsed ? bars : arrowLeft}
      </button>
      <div className="profile">
        <div className="profile-overlay"></div>
        <div className="image">
          <Image width={70} height={70} src={displayImage} alt="profile" />
        </div>
        <div className="user-btn absolute z-20 top-0 w-full h-full">
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
        <h1 className="capitalize">
          {displayName}
        </h1>
      </div>
      <ul className="nav-items">
        {menu.map((item) => (
          <li
            key={item.id}
            className={`nav-item ${pathname === item.link ? "active" : ""}`}
            onClick={() => {
              if (pathname !== item.link) {
                handleClick(item.link);
              }
            }}
          >
            {item.icon}
            <Link href={item.link}>{item.title}</Link>
          </li>
        ))}
      </ul>
      <button 
        className="signout" 
        onClick={handleSignOut} 
        disabled={isSigningOut}
      >
        {logout}
        <span>{isSigningOut ? 'Signing Out...' : 'Sign Out'}</span>
      </button>
    </SidebarStyled>
  );
}

const SidebarStyled = styled.nav<{ collapsed: boolean }>`
  width: ${(props) => props.theme.sidebarWidth};
  background: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  color: ${(props) => props.theme.colorGrey3};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  transition: all 0.3s cubic-bezier(0.53, 0.21, 0, 1);

  @media screen and (max-width: 768px) {
    position: fixed;
    height: calc(100vh - 2rem);
    z-index: 100;
    transform: ${(props) =>
      props.collapsed ? "translateX(-107%)" : "translateX(0)"};

    .toggle-nav {
      display: block !important;
    }
  }

  .toggle-nav {
    display: none;
    padding: 0.8rem 0.9rem;
    position: absolute;
    right: -69px;
    top: 1.8rem;

    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;

    background-color: ${(props) => props.theme.colorBg2};
    border-right: 2px solid ${(props) => props.theme.borderColor2};
    border-top: 2px solid ${(props) => props.theme.borderColor2};
    border-bottom: 2px solid ${(props) => props.theme.borderColor2};
  }

  .user-btn {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    .cl-userButtonBox {
      width: 100%;
      height: 100%;
    }

    .cl-userButtonTrigger {
      width: 100%;
      height: 100%;
      opacity: 0;
    }
  }

  .profile {
    margin: 1.5rem;
    padding: 1rem 0.8rem;
    position: relative;
    border-radius: 1rem;
    cursor: pointer;
    font-weight: 500;
    color: ${(props) => props.theme.colorGrey0};
    display: flex;
    align-items: center;

    .profile-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      backdrop-filter: blur(10px);
      z-index: 0;
      background: ${(props) => props.theme.colorBg3};
      transition: all 0.55s linear;
      border-radius: 1rem;
      border: 2px solid ${(props) => props.theme.borderColor2};
      opacity: 0.2;
    }

    h1 {
      font-size: 1.2rem;
      display: flex;
      flex-direction: column;
      line-height: 1.4rem;
    }

    .image,
    h1 {
      position: relative;
      z-index: 1;
    }

    .image {
      flex-shrink: 0;
      display: inline-block;
      overflow: hidden;
      transition: all 0.5s ease;
      border-radius: 100%;
      width: 70px;
      height: 70px;

      img {
        border-radius: 100%;
        transition: all 0.5s ease;
      }
    }

    > h1 {
      margin-left: 0.8rem;
      font-size: clamp(1.2rem, 4vw, 1.4rem);
      line-height: 100%;
    }

    &:hover {
      .profile-overlay {
        opacity: 1;
        border: 2px solid ${(props) => props.theme.borderColor2};
      }

      img {
        transform: scale(1.1);
      }
    }
  }

  .nav-item {
    position: relative;
    padding: 0.8rem 1rem 0.9rem 2.1rem;
    margin: 0.3rem 0;
    display: grid;
    grid-template-columns: 40px 1fr;
    cursor: pointer;
    align-items: center;

    &::after {
      position: absolute;
      content: "";
      left: 0;
      top: 0;
      width: 0;
      height: 100%;
      background-color: ${(props) => props.theme.activeNavLinkHover};
      z-index: 1;
      transition: all 0.3s ease-in-out;
    }

    &::before {
      position: absolute;
      content: "";
      right: 0;
      top: 0;
      width: 0%;
      height: 100%;
      background-color: ${(props) => props.theme.colorGreenDark};

      border-bottom-left-radius: 5px;
      border-top-left-radius: 5px;
    }

    a {
      font-weight: 500;
      transition: all 0.3s ease-in-out;
      z-index: 2;
      line-height: 0;
    }

    i {
      display: flex;
      align-items: center;
      color: ${(props) => props.theme.colorIcons};
    }

    &:hover {
      &::after {
        width: 100%;
      }
    }
  }

  .active {
    background-color: ${(props) => props.theme.activeNavLink};

    i,
    a {
      color: ${(props) => props.theme.colorIcons2};
    }
  }

  .active::before {
    width: 0.3rem;
  }

  > button {
    margin: 1.5rem;
  }

  .signout {
    display: flex;
    align-items: center;
    gap: 1rem;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    padding: 1rem;
    padding-left: 2.1rem;
    margin: 1.5rem 0;
    color: ${(props) => props.theme.colorGrey3};
    background: transparent;
    border: none;
    width: 100%;

    i {
      font-size: 1.5rem;
      color: ${(props) => props.theme.colorIcons};
    }

    &:hover {
      background-color: ${(props) => props.theme.colorGreenDark};
      color: ${(props) => props.theme.colorWhite};

      i {
        color: ${(props) => props.theme.colorWhite};
      }
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;

export default Sidebar;
