'use client';
// import React, { useState, useEffect } from 'react';
import PlayGround from './components/playGround';
import { SolanaWalletProvider } from './components/walletProvider';

export default function Home() {
  return (
    <SolanaWalletProvider>
      <PlayGround />
    </SolanaWalletProvider>
  );
}