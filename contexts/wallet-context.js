"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { getContracts, getSigner } from "@/utils/contracts"

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
  const [playerData, setPlayerData] = useState({
    currentLevel: 0,
    levelsCompleted: 0,
    claimableRewardSets: 0,
    hasClaimedInitialTokens: false,
  })
  const [contracts, setContracts] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    checkConnection()
  }, [])

  useEffect(() => {
    if (isConnected && walletAddress && contracts) {
      loadPlayerData()
    }
  }, [isConnected, walletAddress, contracts])

  const checkConnection = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_accounts" })
        if (accounts.length > 0) {
          setWalletAddress(accounts[0])
          setIsConnected(true)
          await initializeContracts()
        }
      } catch (error) {
        console.error("Error checking connection:", error)
      }
    }
  }

  const initializeContracts = async () => {
    try {
      const signer = await getSigner()
      if (signer) {
        const contractInstances = getContracts(signer)
        setContracts(contractInstances)
      }
    } catch (error) {
      console.error("Error initializing contracts:", error)
    }
  }

  const loadPlayerData = async () => {
    if (!contracts || !walletAddress) return

    setIsLoading(true)
    try {
      const playerInfo = await contracts.gameController.getPlayerInfo(walletAddress)
      const fluorBalanceWei = Number(playerInfo.fluorBalance)
      const fluorBalanceEther = fluorBalanceWei / 1e18

      setFluorBalance(fluorBalanceEther)
      setPlayerData({
        currentLevel: Number(playerInfo.currentLevel),
        levelsCompleted: Number(playerInfo.levelsCompleted),
        claimableRewardSets: Number(playerInfo.claimableRewardSets),
        hasClaimedInitialTokens: fluorBalanceEther > 0 || Number(playerInfo.levelsCompleted) > 0, // If they have tokens or completed levels, they've claimed
      })
      setNftCount(Number(playerInfo.nftCount))
    } catch (error) {
      console.error("Error loading player data:", error)
      // Fallback to mock data if contract calls fail
      setFluorBalance(0)
      setNftCount(0)
      setPlayerData({
        currentLevel: 0,
        levelsCompleted: 0,
        claimableRewardSets: 0,
        hasClaimedInitialTokens: false,
      })
    } finally {
      setIsLoading(false)
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
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })

      if (accounts.length > 0) {
        const networkSwitched = await switchToLiskSepolia()

        if (networkSwitched) {
          setWalletAddress(accounts[0])
          setIsConnected(true)
          await initializeContracts()
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
    setPlayerData({
      currentLevel: 0,
      levelsCompleted: 0,
      claimableRewardSets: 0,
      hasClaimedInitialTokens: false,
    })
    setContracts(null)
  }

  // Contract interaction functions
  const claimInitialTokens = async () => {
    if (!contracts) {
      console.error("Contracts not initialized")
      return false
    }

    try {
      setIsLoading(true)
      console.log("Claiming initial tokens...")

      const tx = await contracts.gameController.claimInitialTokens()
      console.log("Transaction sent:", tx.hash)

      const receipt = await tx.wait()
      console.log("Transaction confirmed:", receipt)

      // Update player data immediately to reflect the change
      setPlayerData((prev) => ({
        ...prev,
        hasClaimedInitialTokens: true,
      }))

      // Reload all player data from blockchain
      await loadPlayerData()

      return true
    } catch (error) {
      console.error("Error claiming initial tokens:", error)

      // Check if it's because they already claimed
      if (error.message && error.message.includes("Already claimed")) {
        setPlayerData((prev) => ({
          ...prev,
          hasClaimedInitialTokens: true,
        }))
        alert("You have already claimed your initial tokens!")
        return true // Return true to close the modal
      }

      alert("Failed to claim initial tokens. Please try again.")
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const payToPlay = async () => {
    if (!contracts) return false

    try {
      setIsLoading(true)

      // First approve the game controller to spend tokens
      // const approveTx = await contracts.fluoriteToken.approve(
      //   contracts.gameController.target,
      //   "1000000000000000000", // 1 FLUOR in wei
      // )
      // await approveTx.wait()

      // Then pay to play
      const tx = await contracts.gameController.payToPlay()
      await tx.wait()
      await loadPlayerData()
      return true
    } catch (error) {
      console.error("Error paying to play:", error)
      alert("Failed to start level. Please try again.")
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const claimReward = async () => {
    if (!contracts) return false

    try {
      setIsLoading(true)
      const tx = await contracts.gameController.claimReward()
      await tx.wait()
      await loadPlayerData()
      return true
    } catch (error) {
      console.error("Error claiming reward:", error)
      alert("Failed to claim reward. Please try again.")
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const unlockNft = async () => {
    if (!contracts) return false

    try {
      setIsLoading(true)

      // First approve the game controller to spend tokens
      const approveTx = await contracts.fluoriteToken.approve(
        contracts.gameController.target,
        "10000000000000000000", // 10 FLUOR in wei
      )
      await approveTx.wait()

      // Then unlock NFT
      const tx = await contracts.gameController.unlockNft()
      await tx.wait()
      await loadPlayerData()
      return true
    } catch (error) {
      console.error("Error unlocking NFT:", error)
      alert("Failed to unlock NFT. Please try again.")
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const value = {
    isConnected,
    walletAddress,
    isConnecting,
    fluorBalance,
    nftCount,
    playerData,
    contracts,
    isLoading,
    connectWallet,
    disconnectWallet,
    loadPlayerData,
    claimInitialTokens,
    payToPlay,
    claimReward,
    unlockNft,
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
