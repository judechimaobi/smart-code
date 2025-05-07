// components/WalletProvider.tsx
"use client";
import { FC, ReactNode, useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider
} from "@solana/wallet-adapter-react";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter
} from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
// Removed unused commented-out import to satisfy ESLint rules
import "@solana/wallet-adapter-react-ui/styles.css";

interface SolanaWalletProviderProps {
  children: ReactNode;
}

export const SolanaWalletProvider: FC<SolanaWalletProviderProps> = ({ children }) => {
  const endpoint = "https://api.mainnet-beta.solana.com"; // Use devnet for testing
  const wallets = useMemo(() => [new PhantomWalletAdapter(), new SolflareWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
