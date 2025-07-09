"use client"

import { useState } from "react"
import Header from "@/components/header"
import ParticleBackground from "@/components/particle-background"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Profile() {
  const [userStats] = useState({
    walletAddress: "0x1234...5678",
    levelsCompleted: 23,
    fluorBalance: 15,
    nftCount: 2,
  })

  const [nfts] = useState([
    {
      id: 1,
      name: "Atomic Structure Blueprint",
      image: "/placeholder.svg?height=300&width=300",
      rarity: "Rare",
      rarityColor: "blue",
      description: "A detailed blueprint of atomic structures discovered in the Kingdom of Science.",
    },
    {
      id: 2,
      name: "Chemical Formula Codex",
      image: "/placeholder.svg?height=300&width=300",
      rarity: "Epic",
      rarityColor: "purple",
      description: "Ancient formulas for creating advanced compounds and materials.",
    },
  ])

  const [selectedNft, setSelectedNft] = useState(null)

  const getRarityStyle = (rarity) => {
    const styles = {
      Common: "bg-gray-600/80 text-gray-200 border-gray-500",
      Rare: "bg-blue-600/80 text-blue-200 border-blue-500",
      Epic: "bg-purple-600/80 text-purple-200 border-purple-500",
      Legendary: "bg-yellow-600/80 text-yellow-200 border-yellow-500",
      Mythic: "bg-red-600/80 text-red-200 border-red-500",
    }
    return styles[rarity] || styles.Common
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleBackground />
      <Header />

      <main className="relative z-10 pt-20 pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Personal Laboratory</h1>
            <div className="bg-gray-900/60 backdrop-blur-md border border-gray-700/50 rounded-lg p-6 max-w-2xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-gray-400 text-sm">Scientist ID</p>
                  <p className="text-white font-mono text-lg">{userStats.walletAddress}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Experiments Completed</p>
                  <p className="text-green-400 font-bold text-2xl">{userStats.levelsCompleted}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">FLUOR Balance</p>
                  <p className="text-blue-400 font-bold text-2xl">{userStats.fluorBalance}</p>
                </div>
              </div>
            </div>
          </div>

          {/* NFT Gallery */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Kingdom of Science Blueprints</h2>

            {nfts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No blueprints discovered yet.</p>
                <p className="text-gray-500 mt-2">Complete experiments and unlock NFTs to build your collection!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {nfts.map((nft) => (
                  <Card
                    key={nft.id}
                    className="bg-gray-900/60 backdrop-blur-md border border-gray-700/50 hover:border-green-500/50 transition-all duration-300 cursor-pointer transform hover:scale-105"
                    onClick={() => setSelectedNft(nft)}
                  >
                    <CardContent className="p-4">
                      <div className="aspect-square bg-gradient-to-br from-green-900/20 to-blue-900/20 rounded-lg mb-4 flex items-center justify-center border border-gray-600/30">
                        <div className="text-6xl">🧬</div>
                      </div>
                      <h3 className="text-white font-semibold mb-2">{nft.name}</h3>
                      <Badge className={`text-xs ${getRarityStyle(nft.rarity)}`}>{nft.rarity}</Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* NFT Detail Modal */}
      {selectedNft && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900/90 backdrop-blur-md border border-gray-700/50 rounded-lg max-w-md w-full p-6">
            <div className="text-center mb-4">
              <div className="aspect-square bg-gradient-to-br from-green-900/20 to-blue-900/20 rounded-lg mb-4 flex items-center justify-center border border-gray-600/30">
                <div className="text-8xl">🧬</div>
              </div>
              <h3 className="text-white font-bold text-xl mb-2">{selectedNft.name}</h3>
              <Badge className={`mb-4 ${getRarityStyle(selectedNft.rarity)}`}>{selectedNft.rarity}</Badge>
              <p className="text-gray-300 text-sm">{selectedNft.description}</p>
            </div>
            <button
              onClick={() => setSelectedNft(null)}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}