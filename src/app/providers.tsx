"use client";

import React from 'react';
import { UserContextProvider } from '@/contexts/userContext';
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from "@/components/theme-provider"

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return <SessionProvider>
        <UserContextProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {children}
            </ThemeProvider>

        </UserContextProvider>
    </SessionProvider>
}