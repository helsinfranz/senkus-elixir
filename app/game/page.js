"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import ParticleBackground from "@/components/particle-background"
import GameBoard from "@/components/game-board"
import GameControls from "@/components/game-controls"
import LevelCompleteModal from "@/components/level-complete-modal"
import InitialTokensModal from "@/components/initial-tokens-modal"

export default function GameArena() {
  const [gameState, setGameState] = useState({
    currentLevel: 1,
    levelsCompleted: 0,
    lastRewardClaimedSet: 0,
    fluorBalance: 0,
    nftCount: 0,
    isFirstVisit: true,
    showLevelComplete: false,
    showInitialTokens: false,
  })

  const [tubes, setTubes] = useState([
    // Initial game state - 5 tubes with mixed liquids, 4 empty tubes
    [
      { color: "#FFD700", id: 1 }, // Yellow
      { color: "#FF6B35", id: 2 }, // Orange
      { color: "#DC143C", id: 3 }, // Red
      { color: "#00FF7F", id: 4 }, // Green
    ],
    [
      { color: "#FF6B35", id: 2 },
      { color: "#9932CC", id: 5 }, // Purple
      { color: "#FFD700", id: 1 },
      { color: "#9932CC", id: 5 },
    ],
    [
      { color: "#DC143C", id: 3 },
      { color: "#1E90FF", id: 6 }, // Blue
      { color: "#00FF7F", id: 4 },
      { color: "#DC143C", id: 3 },
    ],
    [
      { color: "#00FF7F", id: 4 },
      { color: "#FF6B35", id: 2 },
      { color: "#FFD700", id: 1 },
      { color: "#1E90FF", id: 6 },
    ],
    [
      { color: "#1E90FF", id: 6 },
      { color: "#9932CC", id: 5 },
      { color: "#00FF7F", id: 4 },
      { color: "#FFD700", id: 1 },
    ],
    [], // Empty tubes
    [],
    [],
    [],
  ])

  const [selectedTube, setSelectedTube] = useState(null)
  const [moveHistory, setMoveHistory] = useState([])

  useEffect(() => {
    // Show initial tokens modal for first-time players
    if (gameState.isFirstVisit && gameState.fluorBalance === 0) {
      setGameState((prev) => ({ ...prev, showInitialTokens: true }))
    }
  }, [])

  const claimInitialTokens = () => {
    setGameState((prev) => ({
      ...prev,
      fluorBalance: 5,
      isFirstVisit: false,
      showInitialTokens: false,
    }))
  }

  const payToPlay = () => {
    if (gameState.fluorBalance > 0) {
      setGameState((prev) => ({
        ...prev,
        fluorBalance: prev.fluorBalance - 1,
        currentLevel: prev.currentLevel + 1,
        showLevelComplete: false,
      }))
      // Generate new level here
    }
  }

  const claimReward = () => {
    const rewardAmount = 2
    setGameState((prev) => ({
      ...prev,
      fluorBalance: prev.fluorBalance + rewardAmount,
      lastRewardClaimedSet: Math.floor(prev.levelsCompleted / 5),
    }))
  }

  const unlockNft = () => {
    if (gameState.fluorBalance >= 10) {
      setGameState((prev) => ({
        ...prev,
        fluorBalance: prev.fluorBalance - 10,
        nftCount: prev.nftCount + 1,
      }))
    }
  }

  const resetGame = () => {
    // Reset to initial state
    setTubes([
      [
        { color: "#FFD700", id: 1 },
        { color: "#FF6B35", id: 2 },
        { color: "#DC143C", id: 3 },
        { color: "#00FF7F", id: 4 },
      ],
      [
        { color: "#FF6B35", id: 2 },
        { color: "#9932CC", id: 5 },
        { color: "#FFD700", id: 1 },
        { color: "#9932CC", id: 5 },
      ],
      [
        { color: "#DC143C", id: 3 },
        { color: "#1E90FF", id: 6 },
        { color: "#00FF7F", id: 4 },
        { color: "#DC143C", id: 3 },
      ],
      [
        { color: "#00FF7F", id: 4 },
        { color: "#FF6B35", id: 2 },
        { color: "#FFD700", id: 1 },
        { color: "#1E90FF", id: 6 },
      ],
      [
        { color: "#1E90FF", id: 6 },
        { color: "#9932CC", id: 5 },
        { color: "#00FF7F", id: 4 },
        { color: "#FFD700", id: 1 },
      ],
      [],
      [],
      [],
      [],
    ])
    setSelectedTube(null)
    setMoveHistory([])
  }

  const undoMove = () => {
    if (moveHistory.length > 0) {
      const lastMove = moveHistory[moveHistory.length - 1]
      setTubes(lastMove)
      setMoveHistory((prev) => prev.slice(0, -1))
    }
  }

  const handleTubeClick = (tubeIndex) => {
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

      if (fromTube.length > 0 && (toTube.length === 0 || toTube.length < 4)) {
        // Save current state for undo
        setMoveHistory((prev) => [...prev, [...tubes]])

        // Move top liquid
        const newTubes = [...tubes]
        const liquid = newTubes[selectedTube].pop()
        newTubes[tubeIndex].push(liquid)

        setTubes(newTubes)

        // Check if level is complete
        const isComplete = checkLevelComplete(newTubes)
        if (isComplete) {
          setGameState((prev) => ({
            ...prev,
            levelsCompleted: prev.levelsCompleted + 1,
            showLevelComplete: true,
          }))
        }
      }
      setSelectedTube(null)
    }
  }

  const checkLevelComplete = (currentTubes) => {
    // Simple completion check - all tubes either empty or contain same color
    return currentTubes.every((tube) => {
      if (tube.length === 0) return true
      const firstColor = tube[0].color
      return tube.every((liquid) => liquid.color === firstColor)
    })
  }

  const canClaimReward = Math.floor(gameState.levelsCompleted / 5) > gameState.lastRewardClaimedSet
  const canUnlockNft = gameState.fluorBalance >= 10

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleBackground />
      <Header />

      <main className="relative z-10 pt-20 pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Laboratory Arena</h1>
            <p className="text-green-400 text-lg">Level {gameState.currentLevel}</p>
          </div>

          <GameBoard tubes={tubes} selectedTube={selectedTube} onTubeClick={handleTubeClick} />

          <GameControls
            onReset={resetGame}
            onUndo={undoMove}
            onClaimReward={claimReward}
            onUnlockNft={unlockNft}
            canClaimReward={canClaimReward}
            canUnlockNft={canUnlockNft}
            canUndo={moveHistory.length > 0}
          />
        </div>
      </main>

      {gameState.showInitialTokens && <InitialTokensModal onClaim={claimInitialTokens} />}

      {gameState.showLevelComplete && (
        <LevelCompleteModal onNextLevel={payToPlay} canAfford={gameState.fluorBalance > 0} />
      )}
    </div>
  )
}
