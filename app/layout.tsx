import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Sidebar from "./Components/Sidebar/Sidebar";
import GlobalStylesProviders from "./Providers/GlobalStylesProviders"
import ContextProvider from './Providers/ContextProvider'
import {
  ClerkProvider,
  SignedIn,
} from "@clerk/nextjs";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import Footer from "./Components/Footer/Footer";

const nunito = Nunito({weight:["400","500","600","700","800"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TaskMate",
  description: "Your Task Managment Companion",
  icons: {
    icon: "/task-management.png", // Replace with your custom icon path
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          />
          <link rel="icon" href="/task-management.png" type="image/x-icon" />
        </head>
        <body className={nunito.className}>
          <NextTopLoader
            height={2}
            color="#27AE60"
            easing="cubic-bezier(0.53,0.21,0,1)"
            showSpinner={false}
          />
          <GlobalStylesProviders>
            <ContextProvider>
              <SignedIn>
                <Sidebar />
              </SignedIn>
              <div className="w-full flex justify-center items-center">
                {children}
              </div>
            </ContextProvider>
          </GlobalStylesProviders>
        </body>
      </html>
    </ClerkProvider>
  );
}
