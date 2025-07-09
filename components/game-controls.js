"use client"

import { Button } from "@/components/ui/button"
import { RotateCcw, Undo, Gift, Dna } from "lucide-react"

export default function GameControls({
  onReset,
  onUndo,
  onClaimReward,
  onUnlockNft,
  canClaimReward,
  canUnlockNft,
  canUndo,
}) {
  return (
    <div className="flex justify-center">
      <div className="bg-gray-900/60 backdrop-blur-md border border-gray-700/50 rounded-lg p-4">
        <div className="flex space-x-4">
          <Button
            onClick={onReset}
            variant="outline"
            size="lg"
            className="bg-gray-800/50 border-gray-600/50 text-white hover:bg-gray-700/50"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Reset
          </Button>

          <Button
            onClick={onUndo}
            disabled={!canUndo}
            variant="outline"
            size="lg"
            className="bg-gray-800/50 border-gray-600/50 text-white hover:bg-gray-700/50 disabled:opacity-50"
          >
            <Undo className="w-5 h-5 mr-2" />
            Undo
          </Button>

          <Button
            onClick={onClaimReward}
            disabled={!canClaimReward}
            size="lg"
            className={`${
              canClaimReward
                ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 animate-pulse"
                : "bg-gray-600/50"
            } text-white`}
          >
            <Gift className="w-5 h-5 mr-2" />
            Reward
          </Button>

          <Button
            onClick={onUnlockNft}
            disabled={!canUnlockNft}
            size="lg"
            className={`${
              canUnlockNft
                ? "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-400 hover:to-blue-400"
                : "bg-gray-600/50"
            } text-white`}
          >
            <Dna className="w-5 h-5 mr-2" />
            Unlock NFT
          </Button>
        </div>
      </div>
    </div>
  )
}
