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
    <div className="flex justify-center px-4">
      <div className="bg-gray-900/60 backdrop-blur-md border border-gray-700/50 rounded-lg p-3 md:p-4 w-full max-w-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
          <Button
            onClick={onReset}
            variant="outline"
            size="sm"
            className="bg-gray-800/50 border-gray-600/50 text-white hover:bg-gray-700/50 text-xs md:text-sm"
          >
            <RotateCcw className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
            Reset
          </Button>

          <Button
            onClick={onUndo}
            disabled={!canUndo}
            variant="outline"
            size="sm"
            className="bg-gray-800/50 border-gray-600/50 text-white hover:bg-gray-700/50 disabled:opacity-50 text-xs md:text-sm"
          >
            <Undo className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
            Undo
          </Button>

          <Button
            onClick={onClaimReward}
            disabled={!canClaimReward}
            size="sm"
            className={`${
              canClaimReward
                ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 animate-pulse"
                : "bg-gray-600/50"
            } text-white text-xs md:text-sm`}
          >
            <Gift className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
            Reward
          </Button>

          <Button
            onClick={onUnlockNft}
            disabled={!canUnlockNft}
            size="sm"
            className={`${
              canUnlockNft
                ? "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-400 hover:to-blue-400"
                : "bg-gray-600/50"
            } text-white text-xs md:text-sm`}
          >
            <Dna className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
            NFT
          </Button>
        </div>
      </div>
    </div>
  )
}
