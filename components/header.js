"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Atom, Gem, FileText } from "lucide-react"

export default function Header() {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [fluorBalance, setFluorBalance] = useState(15)
  const [nftCount, setNftCount] = useState(2)
  const pathname = usePathname()

  const connectWallet = () => {
    // Simulate wallet connection
    setIsConnected(true)
    setWalletAddress("0x1234...5678")
  }

  const isActivePage = (path) => pathname === path

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/20 backdrop-blur-md border-b border-green-500/30">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 text-white hover:text-green-400 transition-colors">
          <Atom className="w-8 h-8 text-green-400" />
          <span className="text-xl font-bold">Senku's Elixir</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors ${
              isActivePage("/") ? "text-green-400" : "text-white hover:text-green-400"
            }`}
          >
            Home
          </Link>
          <Link
            href="/game"
            className={`text-sm font-medium transition-colors ${
              isActivePage("/game") ? "text-green-400" : "text-white hover:text-green-400"
            }`}
          >
            Game Arena
          </Link>
          <Link
            href="/profile"
            className={`text-sm font-medium transition-colors ${
              isActivePage("/profile") ? "text-green-400" : "text-white hover:text-green-400"
            }`}
          >
            Profile
          </Link>
        </nav>

        {/* Wallet Widget */}
        <div className="flex items-center">
          {!isConnected ? (
            <Button
              onClick={connectWallet}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300"
            >
              Connect Wallet
            </Button>
          ) : (
            <div className="flex items-center space-x-4 bg-gray-800/60 backdrop-blur-sm border border-gray-600/50 rounded-lg px-4 py-2">
              <span className="text-white font-mono text-sm">{walletAddress}</span>
              <div className="flex items-center space-x-1 text-blue-400">
                <Gem className="w-4 h-4" />
                <span className="text-sm font-semibold">{fluorBalance}</span>
              </div>
              <div className="flex items-center space-x-1 text-purple-400">
                <FileText className="w-4 h-4" />
                <span className="text-sm font-semibold">{nftCount}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
