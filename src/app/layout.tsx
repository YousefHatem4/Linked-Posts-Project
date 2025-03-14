'use client';
import { Roboto } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import Navbar from "./_navbar/page";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Provider } from "react-redux";
import { store } from "./_redux/store";
import { Toaster } from "react-hot-toast";


const roboto = Roboto({
  subsets: ["cyrillic"],
  weight: ["400", "700"],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head></head>
      <body style={{ fontFamily: roboto.style.fontFamily }}>
        <Provider store={store}>
          <AppRouterCacheProvider>
            <Navbar />
            {children}
            <Toaster/>
          </AppRouterCacheProvider>
        </Provider>
      </body>
    </html>
  );
}