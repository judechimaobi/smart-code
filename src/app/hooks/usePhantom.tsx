import { useEffect, useState } from "react";

export function usePhantom() {
  const [wallet, setWallet] = useState<any>(null);
  const [publicKey, setPublicKey] = useState<string | null>(null);

  useEffect(() => {
    if ("solana" in window) {
      const provider = (window as any).solana;
      if (provider?.isPhantom) {
        setWallet(provider);
        provider.connect({ onlyIfTrusted: true }).then((res: any) => {
          setPublicKey(res.publicKey.toString());
        });
      }
    }
  }, []);

  const connect = async () => {
    if (!wallet) return;
    const res = await wallet.connect();
    setPublicKey(res.publicKey.toString());
  };

  return { wallet, publicKey, connect };
}
