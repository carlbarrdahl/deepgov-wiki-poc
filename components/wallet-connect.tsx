"use client";
import React from "react";
import { Button } from "./ui/button";
import { Wallet } from "lucide-react";

export function WalletConnect() {
  return (
    <Button
      variant="outline"
      size="sm"
      className="flex items-center gap-2"
      onClick={() => alert("not implemented")}
    >
      <Wallet className="h-4 w-4" />
      <span className="hidden sm:inline-block">Connect Wallet</span>
    </Button>
  );
}
