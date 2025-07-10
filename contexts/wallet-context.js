"use client"

import { createContext, useContext, useState, useEffect } from "react"

const WalletContext = createContext()

// Lisk Sepolia Network Configuration
const LISK_SEPOLIA = {
  chainId: "0x106a", // 4202 in hex
  chainName: "Lisk Sepolia Testnet",
  nativeCurrency: {
    name: "Sepolia Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: ["https://rpc.sepolia-api.lisk.com"],
  blockExplorerUrls: ["https://sepolia-blockscout.lisk.com"],
}

export function WalletProvider({ children }) {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [isConnecting, setIsConnecting] = useState(false)
  const [fluorBalance, setFluorBalance] = useState(0)
  const [nftCount, setNftCount] = useState(0)

  useEffect(() => {
    checkConnection()
  }, [])

  const checkConnection = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_accounts" })
        if (accounts.length > 0) {
          setWalletAddress(accounts[0])
          setIsConnected(true)
          // Load user data here
          setFluorBalance(15) // Mock data
          setNftCount(2) // Mock data
        }
      } catch (error) {
        console.error("Error checking connection:", error)
      }
    }
  }

  const addLiskSepoliaNetwork = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [LISK_SEPOLIA],
      })
      return true
    } catch (error) {
      console.error("Error adding network:", error)
      return false
    }
  }

  const switchToLiskSepolia = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: LISK_SEPOLIA.chainId }],
      })
      return true
    } catch (error) {
      if (error.code === 4902) {
        // Network not added, try to add it
        return await addLiskSepoliaNetwork()
      }
      console.error("Error switching network:", error)
      return false
    }
  }

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask or another Web3 wallet!")
      return
    }

    setIsConnecting(true)

    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })

      if (accounts.length > 0) {
        // Switch to Lisk Sepolia
        const networkSwitched = await switchToLiskSepolia()

        if (networkSwitched) {
          setWalletAddress(accounts[0])
          setIsConnected(true)
          setFluorBalance(15) // Mock initial balance
          setNftCount(2) // Mock initial NFT count
        } else {
          alert("Please switch to Lisk Sepolia network to continue")
        }
      }
    } catch (error) {
      console.error("Error connecting wallet:", error)
      alert("Failed to connect wallet. Please try again.")
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setIsConnected(false)
    setWalletAddress("")
    setFluorBalance(0)
    setNftCount(0)
  }

  const value = {
    isConnected,
    walletAddress,
    isConnecting,
    fluorBalance,
    nftCount,
    connectWallet,
    disconnectWallet,
    setFluorBalance,
    setNftCount,
  }

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}
