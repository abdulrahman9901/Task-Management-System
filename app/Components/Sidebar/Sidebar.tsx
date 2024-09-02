"use client";

import React from 'react'
import styled from 'styled-components';
import { useGlobalState } from '@/app/Context/globalProviders';
import Image from "next/image"
import menu from "@/app/utils/menu";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import profileImage from '@/public/avatar.jpg'; 
import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import { arrowLeft, bars, logout } from '@/app/utils/icons';
  
function Sidebar() {
  const { theme, collapsed, collapseMenu } = useGlobalState();
  const router = useRouter();
  const pathname = usePathname();


  const {user} = useUser();
  console.log("user : ", user);
  const { firstName, lastName, imageUrl } = user || {
    firstName: "",
    lastName: " ",
    imageUrl : profileImage,
  };
  console.log("theme :  ", theme);  
  const handleClick = (link: string) => {
    if (link) router.push(link);
  };


  return (
    <SidebarStyles theme={theme} collapsed={collapsed}>
      <button className="toggle-nav" onClick={collapseMenu}>
        {collapsed ? bars : arrowLeft}
      </button>
      <div className="profile">
        <div className="profile-overlay"></div>
        <div className="image">
          <Image width={70} height={70} src={imageUrl} alt="profile" />
        </div>
        <div className="user-btn absolute z-20 top-0 w-full h-full">
          <UserButton />
        </div>
        <h1 className="capitalize">
          <span>{firstName}</span>
          <span>{lastName}</span>
        </h1>
      </div>
      <ul className="nav-items">
        {menu.map((item) => {
          return (
            <li
              key={item.id}
              className={`nav-item ${pathname === item.link ? "active" : ""}`}
              onClick={() => {
                pathname === item.link
                  ? null
                  : handleClick(item.link as string);
              }}
            >
              {item.icon}
              <Link href={item.link}>{item.title}</Link>
            </li>
          );
        })}
      </ul>
      <div className="signout">
        {logout}
        <SignOutButton redirectUrl={"/sign-in"} />
      </div>
    </SidebarStyles>
  );
}

const SidebarStyles = styled.nav<{ collapsed : boolean}>`
  width: ${(props) => props.theme.sidebarWidth};
  background: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  color: ${(props) => props.theme.colorGrey3};
  justify-content: space-between;
  transtion: all 0.3s ease-in-out;

  @media screen and (max-width: 768px) {
    position: fixed;
    height: calc(100vh - 2rem);
    padding: 0.2rem;
    gap: 0.3rem;
    z-index:10;
    transition: all 0.3s cubic-bezier(0.53, 0.21, 0, 1);
    transform: ${(props) =>
      props.collapsed ? "translateX(-107%)" : "translateX(0)"};

    .toggle-nav {
      display: block !important;
    }
  }

  .toggle-nav {
    display: none;
    position: absolute;
    left: 14rem;
    padding: 0.5rem 0.8rem;
    margin: 1rem 0.9rem;

    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;

    background-color: ${(props) => props.theme.colorBg2};
    border-right: 2px solid ${(props) => props.theme.borderColor2};
    border-top: 2px solid ${(props) => props.theme.borderColor2};
    border-bottom: 2px solid ${(props) => props.theme.borderColor2};
  }

  .user-btn {
    .cl-rootBox {
      width: 100%;
      height: 100%;

      button {
        width: 100%;
        height: 100%;
        opacity: 0;
      }
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

    width: 95%;
    justify-content: center;

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
      margin-left: 0.3rem;
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

  .nav-items {
    width: 100%;
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

  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;

  .signout {
    display: flex;
    padding: 1rem;

    position: relative;
    align-items: center;

    color: ${(props) => props.theme.colorGrey2};
    z-index: 5;
    cursor: pointer;

    transition: all 0.55s ease-in-out;

    i {
      padding-top: 0.2rem;
      margin-right: 0.5rem;
      color: ${(props) => props.theme.colorGrey2};
      font-size: 1.5rem;
      transition: all 0.55s ease-in-out;
    }

    &:hover {
      color: ${(props) => props.theme.colorGrey0};
      i {
        color: ${(props) => props.theme.colorGrey0};
      }
    }
  }
`;

export default Sidebar;
