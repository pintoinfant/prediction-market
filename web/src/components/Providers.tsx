"use client";
import {
  getDefaultConfig,
  RainbowKitProvider,
  lightTheme,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import {
  mainnet,
  optimism,
  arbitrum,
  sepolia,
  optimismSepolia,
  arbitrumSepolia,
  polygonMumbai,
} from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
const queryClient = new QueryClient();

const config = getDefaultConfig({
  appName: "AnonKarma",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID || "",
  chains: [
    // mainnet,
    // optimism,
    // arbitrum,
    // sepolia,
    // optimismSepolia,
    // arbitrumSepolia,
    polygonMumbai,
  ],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "#111111",
            accentColorForeground: "white",
            borderRadius: "medium",
            fontStack: "system",
            overlayBlur: "small",
          })}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
