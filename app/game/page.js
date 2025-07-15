"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import ParticleBackground from "@/components/particle-background"
import GameBoard from "@/components/game-board"
import GameControls from "@/components/game-controls"
import LevelCompleteModal from "@/components/level-complete-modal"
import InitialTokensModal from "@/components/initial-tokens-modal"
import RouteGuard from "@/components/route-guard"
import { useWallet } from "@/contexts/wallet-context"

function GameArenaContent() {
  const {
    fluorBalance,
    nftCount,
    playerData,
    isLoading: walletLoading,
    claimInitialTokens,
    payToPlay,
    claimReward,
    unlockNft,
    loadPlayerData,
    walletAddress,
  } = useWallet()

  const [gameState, setGameState] = useState({
    showLevelComplete: false,
    showInitialTokens: false,
  })

  const [tubes, setTubes] = useState([])
  const [selectedTube, setSelectedTube] = useState(null)
  const [moveHistory, setMoveHistory] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCheckingCompletion, setIsCheckingCompletion] = useState(false)

  useEffect(() => {
    if (playerData.currentLevel > 0) {
      loadLevel(playerData.currentLevel)
    } else if (playerData.levelsCompleted > 0) {
      loadLevel(playerData.levelsCompleted + 1)
    } else {
      loadLevel(1)
    }
  }, [playerData.currentLevel, playerData.levelsCompleted])

  useEffect(() => {
    // Show initial tokens modal for first-time players
    // Only show if they haven't claimed initial tokens AND they have 0 balance AND wallet is not loading
    if (!playerData.hasClaimedInitialTokens && fluorBalance === 0 && !walletLoading) {
      setGameState((prev) => ({ ...prev, showInitialTokens: true }))
    } else {
      // Hide the modal if they have claimed tokens or have balance
      setGameState((prev) => ({ ...prev, showInitialTokens: false }))
    }
  }, [playerData.hasClaimedInitialTokens, fluorBalance, walletLoading])

  const loadLevel = async (levelId) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/game/level/${levelId}`)
      const data = await response.json()

      if (data.success) {
        setTubes(data.level.tubes)
        setSelectedTube(null)
        setMoveHistory([])
      } else {
        console.error("Failed to load level:", data.error)
        // Fallback to default level if API fails
        setTubes([
          [
            { color: "#FFD700", id: 1 },
            { color: "#FF6B35", id: 2 },
            { color: "#DC143C", id: 3 },
          ],
          [
            { color: "#FF6B35", id: 2 },
            { color: "#DC143C", id: 3 },
            { color: "#FFD700", id: 1 },
          ],
          [],
          [],
        ])
      }
    } catch (error) {
      console.error("Error loading level:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async () => {
    setIsCheckingCompletion(true)
    try {
      const currentLevel = playerData.currentLevel > 0 ? playerData.currentLevel : playerData.levelsCompleted + 1

      const response = await fetch("/api/game/record-completion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          playerAddress: walletAddress,
          tubes: tubes,
          levelId: currentLevel,
        }),
      })

      const data = await response.json()

      if (data.success && data.isCompleted) {
        setGameState((prev) => ({
          ...prev,
          showLevelComplete: true,
        }))
        // Reload player data to get updated stats
        await loadPlayerData()
      } else if (data.isCompleted && !data.success) {
        // Solution is correct but blockchain failed
        alert(
          `${data.message}\n\nYour progress has been saved locally, but blockchain recording failed. You can continue to the next level.`,
        )
        setGameState((prev) => ({
          ...prev,
          showLevelComplete: true,
        }))
      } else {
        alert(data.message || "Level not complete yet! Keep sorting the liquids.")
      }
    } catch (error) {
      console.error("Error checking completion:", error)
      alert("Error checking completion. Please try again.")
    } finally {
      setIsCheckingCompletion(false)
    }
  }

  const handleClaimInitialTokens = async () => {
    const success = await claimInitialTokens()
    if (success) {
      // The modal will automatically hide due to the useEffect watching hasClaimedInitialTokens
      console.log("Initial tokens claimed successfully")
    }
  }

  const handlePayToPlay = async () => {
    const success = await payToPlay()
    if (success) {
      setGameState((prev) => ({
        ...prev,
        showLevelComplete: false,
      }))
      // Load the next level
      const nextLevel = playerData.levelsCompleted + 1
      await loadLevel(nextLevel)
    }
  }

  const handleClaimReward = async () => {
    await claimReward()
  }

  const handleUnlockNft = async () => {
    await unlockNft()
  }

  const resetGame = () => {
    const currentLevel = playerData.currentLevel > 0 ? playerData.currentLevel : playerData.levelsCompleted + 1
    loadLevel(currentLevel)
  }

  const undoMove = () => {
    if (moveHistory.length > 0) {
      const lastMove = moveHistory[moveHistory.length - 1]
      setTubes(lastMove)
      setMoveHistory((prev) => prev.slice(0, -1))
    }
  }

  const handleTubeClick = (tubeIndex) => {
    if (isCheckingCompletion || walletLoading) return

    if (selectedTube === null) {
      if (tubes[tubeIndex].length > 0) {
        setSelectedTube(tubeIndex)
      }
    } else if (selectedTube === tubeIndex) {
      setSelectedTube(null)
    } else {
      const fromTube = tubes[selectedTube]
      const toTube = tubes[tubeIndex]

      if (
        fromTube.length > 0 &&
        (toTube.length === 0 ||
          (toTube.length < 4 && toTube[toTube.length - 1].color === fromTube[fromTube.length - 1].color))
      ) {
        setMoveHistory((prev) => [...prev, JSON.parse(JSON.stringify(tubes))])

        const newTubes = JSON.parse(JSON.stringify(tubes))
        const liquid = newTubes[selectedTube].pop()
        newTubes[tubeIndex].push(liquid)

        setTubes(newTubes)
      }
      setSelectedTube(null)
    }
  }

  const canClaimReward = playerData.claimableRewardSets > 0
  const canUnlockNft = fluorBalance >= 10
  const currentLevel = playerData.currentLevel > 0 ? playerData.currentLevel : playerData.levelsCompleted + 1

  if (isLoading || walletLoading) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <ParticleBackground />
        <Header />
        <main className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-400 mx-auto mb-4"></div>
            <p className="text-white text-xl">Loading Laboratory...</p>
            <p className="text-gray-400 text-sm mt-2">Preparing Level {currentLevel}</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleBackground />
      <Header />

      <main className="relative z-10 pt-20 pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">Laboratory Arena</h1>
            <p className="text-green-400 text-base md:text-lg">Level {currentLevel}</p>
            <div className="text-sm text-gray-400 mt-2">
              <p>Levels Completed: {playerData.levelsCompleted}</p>
              {playerData.currentLevel > 0 && (
                <p className="text-yellow-400">Currently Playing Level {playerData.currentLevel}</p>
              )}
            </div>
            {isCheckingCompletion && (
              <p className="text-yellow-400 text-sm mt-2 animate-pulse">Analyzing solution...</p>
            )}
          </div>

          <GameBoard tubes={tubes} selectedTube={selectedTube} onTubeClick={handleTubeClick} />

          <GameControls
            onReset={resetGame}
            onUndo={undoMove}
            onClaimReward={handleClaimReward}
            onUnlockNft={handleUnlockNft}
            onSubmit={handleSubmit}
            canClaimReward={canClaimReward}
            canUnlockNft={canUnlockNft}
            canUndo={moveHistory.length > 0}
            isCheckingCompletion={isCheckingCompletion}
          />
        </div>
      </main>

      {gameState.showInitialTokens && (
        <InitialTokensModal onClaim={handleClaimInitialTokens} isLoading={walletLoading} />
      )}

      {gameState.showLevelComplete && (
        <LevelCompleteModal onNextLevel={handlePayToPlay} canAfford={fluorBalance >= 1} isLoading={walletLoading} />
      )}
    </div>
  )
}

export default function GameArena() {
  return (
    <RouteGuard>
      <GameArenaContent />
    </RouteGuard>
  )
}
