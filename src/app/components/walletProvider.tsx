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
// require("@solana/wallet-adapter-react-ui/styles.css");
import "@solana/wallet-adapter-react-ui/styles.css";

export const SolanaWalletProvider: FC<{ children: ReactNode }> = ({ children }) => {
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
