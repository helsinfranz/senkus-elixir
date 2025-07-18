"use client"
import Header from "@/components/header"
import ParticleBackground from "@/components/particle-background"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { useWallet } from "@/contexts/wallet-context"
import { Atom, Beaker, Trophy, Zap, Gem, TrendingUp, Gift } from "lucide-react"

export default function HomePage() {
  const { isConnected } = useWallet()

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleBackground />
      <Header />

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20">
        <div className="text-center max-w-6xl mx-auto">
          {/* Hero Flask Image */}
          <div className="mb-6 md:mb-8 relative">
            <div className="w-32 h-48 md:w-48 md:h-64 mx-auto relative">
              {/* Outer Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-green-500/30 via-green-400/40 to-green-300/50 rounded-full blur-3xl animate-pulse"></div>
              <div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/20 to-green-400/40 rounded-full blur-xl animate-pulse"
                style={{ animationDelay: "0.5s" }}
              ></div>

              <div className="relative w-full h-full">
                {/* Flask Body */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 md:w-24 h-32 md:h-40 bg-gradient-to-b from-gray-800/80 to-gray-900/90 rounded-b-full border-2 border-gray-600/50 backdrop-blur-sm shadow-2xl">
                  {/* Liquid with Enhanced Glow */}
                  <div className="absolute bottom-2 left-2 right-2 h-20 md:h-24 bg-gradient-to-t from-green-400 via-green-300 to-green-200 rounded-b-full opacity-90 animate-pulse shadow-inner">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-b-full"></div>
                    <div className="absolute top-0 left-0 right-0 h-1 bg-white/60 rounded-full"></div>
                    {/* Liquid Glow Effect */}
                    <div className="absolute inset-0 bg-green-400/30 rounded-b-full blur-sm"></div>
                    {/* Bubbles */}
                    <div className="absolute top-2 left-3 w-1 h-1 bg-white/70 rounded-full animate-pulse shadow-sm"></div>
                    <div
                      className="absolute top-6 right-3 w-0.5 h-0.5 bg-white/80 rounded-full animate-pulse shadow-sm"
                      style={{ animationDelay: "0.3s" }}
                    ></div>
                    <div
                      className="absolute top-10 left-5 w-0.5 h-0.5 bg-white/60 rounded-full animate-pulse shadow-sm"
                      style={{ animationDelay: "0.6s" }}
                    ></div>
                  </div>

                  {/* Flask Body Glow */}
                  <div className="absolute inset-0 bg-gradient-to-b from-green-400/10 via-green-300/20 to-green-400/30 rounded-b-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Text in Card */}
          <Card className="bg-gray-900/60 backdrop-blur-md border border-gray-700/50 mb-6 md:mb-8">
            <CardContent className="p-6 md:p-8">
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-white">
                Science Will Save the World.
                <span className="block text-green-400 text-xl md:text-2xl lg:text-3xl mt-2 font-light">
                  One Drop at a Time.
                </span>
              </h1>

              <p className="text-sm md:text-base lg:text-lg text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed">
                Enter the Kingdom of Science and master the art of liquid alchemy. Sort, combine, and perfect your
                formulas to rebuild civilization through the power of chemistry.
              </p>

              {isConnected ? (
                <Link href="/game">
                  <Button className="text-base md:text-lg px-6 md:px-8 py-2 md:py-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400 text-white font-semibold rounded-lg shadow-2xl transform hover:scale-105 transition-all duration-300">
                    Enter the Lab
                  </Button>
                </Link>
              ) : (
                <p className="text-yellow-400 font-semibold text-sm md:text-base">
                  Connect your wallet to begin your scientific journey!
                </p>
              )}
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
            <Card className="bg-gray-900/40 backdrop-blur-md border border-gray-700/30 hover:border-green-500/50 transition-all duration-300">
              <CardContent className="p-4 md:p-6 text-center">
                <Atom className="w-8 h-8 md:w-12 md:h-12 text-green-400 mx-auto mb-3 md:mb-4" />
                <h3 className="text-white font-semibold text-sm md:text-base mb-2">Liquid Alchemy</h3>
                <p className="text-gray-400 text-xs md:text-sm">
                  Master the art of sorting and combining chemical compounds
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/40 backdrop-blur-md border border-gray-700/30 hover:border-blue-500/50 transition-all duration-300">
              <CardContent className="p-4 md:p-6 text-center">
                <Beaker className="w-8 h-8 md:w-12 md:h-12 text-blue-400 mx-auto mb-3 md:mb-4" />
                <h3 className="text-white font-semibold text-sm md:text-base mb-2">FLUOR Tokens</h3>
                <p className="text-gray-400 text-xs md:text-sm">
                  Earn tokens for successful experiments and discoveries
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/40 backdrop-blur-md border border-gray-700/30 hover:border-purple-500/50 transition-all duration-300">
              <CardContent className="p-4 md:p-6 text-center">
                <Trophy className="w-8 h-8 md:w-12 md:h-12 text-purple-400 mx-auto mb-3 md:mb-4" />
                <h3 className="text-white font-semibold text-sm md:text-base mb-2">NFT Blueprints</h3>
                <p className="text-gray-400 text-xs md:text-sm">
                  Unlock rare Kingdom of Science blueprint collectibles
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/40 backdrop-blur-md border border-gray-700/30 hover:border-yellow-500/50 transition-all duration-300">
              <CardContent className="p-4 md:p-6 text-center">
                <Zap className="w-8 h-8 md:w-12 md:h-12 text-yellow-400 mx-auto mb-3 md:mb-4" />
                <h3 className="text-white font-semibold text-sm md:text-base mb-2">Lisk Network</h3>
                <p className="text-gray-400 text-xs md:text-sm">Built on Lisk Sepolia for fast, secure transactions</p>
              </CardContent>
            </Card>
          </div>

          {/* Game Guide Section */}
          <Card className="bg-gray-900/60 backdrop-blur-md border border-gray-700/50">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">How to Play Senku's Elixir</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Game Rules */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-green-400 mb-4 flex items-center">
                      <Beaker className="w-5 h-5 mr-2" />
                      Game Rules
                    </h3>
                    <div className="space-y-3 text-sm md:text-base text-gray-300">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p>Sort colored liquids by pouring them between test tubes</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p>You can only pour liquid onto the same color or into empty tubes</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p>Each tube can hold a maximum of 4 liquid units</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p>Complete the level by sorting all colors into separate tubes</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-blue-400 mb-4 flex items-center">
                      <Gem className="w-5 h-5 mr-2" />
                      Token Economics
                    </h3>
                    <div className="space-y-3">
                      <div className="bg-gradient-to-r from-green-900/30 to-green-800/30 rounded-lg p-4 border border-green-500/30">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <Gift className="w-4 h-4 text-green-400" />
                            <span className="text-green-400 font-semibold">Initial Grant</span>
                          </div>
                          <span className="text-white font-bold text-lg">5 FLUOR</span>
                        </div>
                        <p className="text-xs text-gray-300">Free tokens to start your scientific journey</p>
                      </div>

                      <div className="bg-gradient-to-r from-yellow-900/30 to-yellow-800/30 rounded-lg p-4 border border-yellow-500/30">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <Beaker className="w-4 h-4 text-yellow-400" />
                            <span className="text-yellow-400 font-semibold">Level Cost</span>
                          </div>
                          <span className="text-white font-bold text-lg">1 FLUOR</span>
                        </div>
                        <p className="text-xs text-gray-300">Required to start each new experiment</p>
                      </div>

                      <div className="bg-gradient-to-r from-purple-900/30 to-purple-800/30 rounded-lg p-4 border border-purple-500/30">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <Trophy className="w-4 h-4 text-purple-400" />
                            <span className="text-purple-400 font-semibold">NFT Unlock</span>
                          </div>
                          <span className="text-white font-bold text-lg">10 FLUOR</span>
                        </div>
                        <p className="text-xs text-gray-300">Mint rare Kingdom of Science blueprints</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rewards & Progression */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-orange-400 mb-4 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Incremental Rewards
                    </h3>
                    <div className="space-y-3">
                      <div className="bg-gradient-to-r from-orange-900/30 to-red-900/30 rounded-lg p-4 border border-orange-500/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-orange-400 font-semibold">Every 5 Levels</span>
                          <span className="text-white font-bold">Reward Set</span>
                        </div>
                        <div className="space-y-1 text-xs text-gray-300">
                          <p>
                            • Levels 1-5: <span className="text-green-400 font-semibold">6 FLUOR</span>
                          </p>
                          <p>
                            • Levels 6-10: <span className="text-green-400 font-semibold">7 FLUOR</span>
                          </p>
                          <p>
                            • Levels 11-15: <span className="text-green-400 font-semibold">8 FLUOR</span>
                          </p>
                          <p>
                            • Levels 16-20: <span className="text-green-400 font-semibold">9 FLUOR</span>
                          </p>
                          <p className="text-yellow-400">+1 FLUOR per reward set!</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-purple-400 mb-4 flex items-center">
                      <Trophy className="w-5 h-5 mr-2" />
                      Progression System
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="bg-gradient-to-r from-green-900/20 to-green-800/20 rounded-lg p-3 border border-green-500/30">
                        <div className="flex items-center space-x-2 mb-1">
                          <div className="text-lg">🧪</div>
                          <h4 className="text-green-400 font-semibold text-sm">Complete Levels</h4>
                        </div>
                        <p className="text-xs text-gray-300">Solve puzzles to progress and unlock rewards</p>
                      </div>

                      <div className="bg-gradient-to-r from-blue-900/20 to-blue-800/20 rounded-lg p-3 border border-blue-500/30">
                        <div className="flex items-center space-x-2 mb-1">
                          <div className="text-lg">💎</div>
                          <h4 className="text-blue-400 font-semibold text-sm">Claim Rewards</h4>
                        </div>
                        <p className="text-xs text-gray-300">Get increasing FLUOR rewards every 5 levels</p>
                      </div>

                      <div className="bg-gradient-to-r from-purple-900/20 to-purple-800/20 rounded-lg p-3 border border-purple-500/30">
                        <div className="flex items-center space-x-2 mb-1">
                          <div className="text-lg">🧬</div>
                          <h4 className="text-purple-400 font-semibold text-sm">Mint NFTs</h4>
                        </div>
                        <p className="text-xs text-gray-300">Collect rare scientific blueprint NFTs</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Getting Started */}
              <div className="mt-8 pt-6 border-t border-gray-700/50 text-center">
                <h3 className="text-lg md:text-xl font-semibold text-yellow-400 mb-4">Ready to Begin?</h3>
                <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 rounded-lg p-6 border border-yellow-500/30">
                  <p className="text-gray-300 text-sm md:text-base mb-4">
                    Connect your wallet to receive <span className="text-green-400 font-bold">5 free FLUOR tokens</span>{" "}
                    and start your scientific journey in the Kingdom of Science!
                  </p>
                  <div className="flex items-center justify-center space-x-2 text-xs text-gray-400">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    <span>Powered by Lisk Sepolia Network</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
