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
  const { fluorBalance, setFluorBalance, nftCount, setNftCount } = useWallet()

  const [gameState, setGameState] = useState({
    currentLevel: 1,
    levelsCompleted: 0,
    lastRewardClaimedSet: 0,
    isFirstVisit: true,
    showLevelComplete: false,
    showInitialTokens: false,
  })

  const [tubes, setTubes] = useState([])
  const [selectedTube, setSelectedTube] = useState(null)
  const [moveHistory, setMoveHistory] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCheckingCompletion, setIsCheckingCompletion] = useState(false)

  useEffect(() => {
    loadLevel(gameState.currentLevel)
  }, [gameState.currentLevel])

  useEffect(() => {
    // Show initial tokens modal for first-time players
    if (gameState.isFirstVisit && fluorBalance === 0) {
      setGameState((prev) => ({ ...prev, showInitialTokens: true }))
    }
  }, [])

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
      const response = await fetch("/api/game/check-completion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tubes: tubes }),
      })

      const data = await response.json()

      if (data.success && data.isCompleted) {
        setGameState((prev) => ({
          ...prev,
          levelsCompleted: prev.levelsCompleted + 1,
          showLevelComplete: true,
        }))
      } else {
        // Show feedback that the level is not complete
        alert("Level not complete yet! Keep sorting the liquids.")
      }
    } catch (error) {
      console.error("Error checking completion:", error)
      alert("Error checking completion. Please try again.")
    } finally {
      setIsCheckingCompletion(false)
    }
  }

  const claimInitialTokens = () => {
    setFluorBalance(5)
    setGameState((prev) => ({
      ...prev,
      isFirstVisit: false,
      showInitialTokens: false,
    }))
  }

  const payToPlay = () => {
    if (fluorBalance > 0) {
      setFluorBalance(fluorBalance - 1)
      setGameState((prev) => ({
        ...prev,
        currentLevel: prev.currentLevel + 1,
        showLevelComplete: false,
      }))
    }
  }

  const claimReward = () => {
    const rewardAmount = 2
    setFluorBalance(fluorBalance + rewardAmount)
    setGameState((prev) => ({
      ...prev,
      lastRewardClaimedSet: Math.floor(prev.levelsCompleted / 5),
    }))
  }

  const unlockNft = () => {
    if (fluorBalance >= 10) {
      setFluorBalance(fluorBalance - 10)
      setNftCount(nftCount + 1)
    }
  }

  const resetGame = () => {
    loadLevel(gameState.currentLevel)
  }

  const undoMove = () => {
    if (moveHistory.length > 0) {
      const lastMove = moveHistory[moveHistory.length - 1]
      setTubes(lastMove)
      setMoveHistory((prev) => prev.slice(0, -1))
    }
  }

  const handleTubeClick = (tubeIndex) => {
    if (isCheckingCompletion) return // Prevent clicks during completion check

    if (selectedTube === null) {
      // Select tube if it has liquid
      if (tubes[tubeIndex].length > 0) {
        setSelectedTube(tubeIndex)
      }
    } else if (selectedTube === tubeIndex) {
      // Deselect if clicking same tube
      setSelectedTube(null)
    } else {
      // Pour liquid
      const fromTube = tubes[selectedTube]
      const toTube = tubes[tubeIndex]

      if (
        fromTube.length > 0 &&
        (toTube.length === 0 ||
          (toTube.length < 4 && toTube[toTube.length - 1].color === fromTube[fromTube.length - 1].color))
      ) {
        // Save current state for undo
        setMoveHistory((prev) => [...prev, JSON.parse(JSON.stringify(tubes))])

        // Move top liquid
        const newTubes = JSON.parse(JSON.stringify(tubes))
        const liquid = newTubes[selectedTube].pop()
        newTubes[tubeIndex].push(liquid)

        setTubes(newTubes)
      }
      setSelectedTube(null)
    }
  }

  const canClaimReward = Math.floor(gameState.levelsCompleted / 5) > gameState.lastRewardClaimedSet
  const canUnlockNft = fluorBalance >= 10

  if (isLoading) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <ParticleBackground />
        <Header />
        <main className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-400 mx-auto mb-4"></div>
            <p className="text-white text-xl">Loading Laboratory...</p>
            <p className="text-gray-400 text-sm mt-2">Preparing Level {gameState.currentLevel}</p>
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
            <p className="text-green-400 text-base md:text-lg">Level {gameState.currentLevel}</p>
            {isCheckingCompletion && (
              <p className="text-yellow-400 text-sm mt-2 animate-pulse">Analyzing solution...</p>
            )}
          </div>

          <GameBoard tubes={tubes} selectedTube={selectedTube} onTubeClick={handleTubeClick} />

          <GameControls
            onReset={resetGame}
            onUndo={undoMove}
            onClaimReward={claimReward}
            onUnlockNft={unlockNft}
            onSubmit={handleSubmit}
            canClaimReward={canClaimReward}
            canUnlockNft={canUnlockNft}
            canUndo={moveHistory.length > 0}
            isCheckingCompletion={isCheckingCompletion}
          />
        </div>
      </main>

      {gameState.showInitialTokens && <InitialTokensModal onClaim={claimInitialTokens} />}

      {gameState.showLevelComplete && <LevelCompleteModal onNextLevel={payToPlay} canAfford={fluorBalance > 0} />}
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
