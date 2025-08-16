import React from "react";
import { useWallet } from "@solana/wallet-adapter-react";

export default function CustomWalletButton({
  className = "",
  variant = "gradient", // default variant
  children,
}) {
  const { connected, connect, disconnect } = useWallet();

  // Different style options
  const baseStyles = "px-4 py-2 rounded-xl font-semibold transition shadow-md";
  const variants = {
    gradient: "bg-gradient-to-r from-[#00FFA3] via-[#03E1FF] to-[#DC1FFF] text-black",
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-800 text-white hover:bg-gray-700",
  };

  return (
    <button
      onClick={connected ? disconnect : connect}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children || (connected ? "Disconnect Wallet" : "Connect Wallet")}
    </button>
  );
}
