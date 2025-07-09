"use client"

import { Button } from "@/components/ui/button"

export default function LevelCompleteModal({ onNextLevel, canAfford }) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900/90 backdrop-blur-md border border-gray-700/50 rounded-lg max-w-md w-full p-8 text-center">
        <div className="mb-6">
          <div className="text-6xl mb-4">🧪</div>
          <h2 className="text-3xl font-bold text-white mb-2">Experiment Successful!</h2>
          <p className="text-gray-300">You've mastered this formula!</p>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-gray-400 text-sm">Moves</p>
              <p className="text-white font-bold text-xl">12</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Time</p>
              <p className="text-white font-bold text-xl">2:34</p>
            </div>
          </div>
        </div>

        <Button
          onClick={onNextLevel}
          disabled={!canAfford}
          className={`w-full text-lg py-3 ${
            canAfford
              ? "bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400"
              : "bg-gray-600/50"
          } text-white font-semibold rounded-lg transition-all duration-300`}
        >
          {canAfford ? "Begin Next Experiment" : "Insufficient FLUOR"}
        </Button>

        {canAfford && <p className="text-gray-400 text-sm mt-2">Cost: 1 FLUOR</p>}
      </div>
    </div>
  )
}
