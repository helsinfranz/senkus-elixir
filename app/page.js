"use client"
import Header from "@/components/header"
import ParticleBackground from "@/components/particle-background"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { useWallet } from "@/contexts/wallet-context"
import { Atom, Beaker, Trophy, Zap } from "lucide-react"

export default function HomePage() {
  const { isConnected } = useWallet()

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleBackground />
      <Header />

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20">
        <div className="text-center max-w-6xl mx-auto">
          {/* Hero Scientific Setup */}
          <div className="mb-6 md:mb-8 relative">
            <div className="w-40 h-56 md:w-56 md:h-72 mx-auto relative">
              {/* Laboratory Stand */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-32 md:h-40 bg-gradient-to-b from-gray-600 to-gray-800 rounded-t"></div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-x-8 w-16 md:w-20 h-2 bg-gradient-to-r from-gray-700 to-gray-800 rounded"></div>

              {/* Clamp */}
              <div className="absolute top-16 md:top-20 right-8 md:right-12 w-3 h-8 bg-gradient-to-b from-gray-600 to-gray-700 rounded"></div>
              <div className="absolute top-20 md:top-24 right-6 md:right-10 w-2 h-2 bg-gray-500 rounded-full"></div>

              {/* Main Beaker */}
              <div
                className="absolute bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 w-16 md:w-20 h-28 md:h-36 bg-gradient-to-b from-gray-200/10 via-gray-100/20 to-gray-200/30 border-2 border-gray-300/40 backdrop-blur-sm"
                style={{
                  clipPath: "polygon(15% 0%, 85% 0%, 90% 100%, 10% 100%)",
                  borderRadius: "0 0 8px 8px",
                }}
              >
                {/* Glowing Liquid */}
                <div
                  className="absolute bottom-1 left-1 right-1 h-20 md:h-24 bg-gradient-to-t from-green-400 via-green-300 to-green-200 opacity-90"
                  style={{ clipPath: "polygon(5% 0%, 95% 0%, 90% 100%, 10% 100%)" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                  <div className="absolute top-0 left-0 right-0 h-1 bg-white/50"></div>
                  {/* Bubbles */}
                  <div className="absolute top-2 left-3 w-1 h-1 bg-white/60 rounded-full animate-pulse"></div>
                  <div
                    className="absolute top-6 right-3 w-0.5 h-0.5 bg-white/70 rounded-full animate-pulse"
                    style={{ animationDelay: "0.3s" }}
                  ></div>
                  <div
                    className="absolute top-10 left-5 w-0.5 h-0.5 bg-white/50 rounded-full animate-pulse"
                    style={{ animationDelay: "0.6s" }}
                  ></div>
                </div>

                {/* Beaker Spout */}
                <div className="absolute -top-2 left-0 w-4 h-3 bg-gradient-to-r from-gray-200/20 to-gray-300/30 border border-gray-300/40 rounded-tl-lg"></div>

                {/* Glass Reflection */}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-white/15 via-transparent to-white/10 pointer-events-none"
                  style={{ clipPath: "polygon(15% 0%, 85% 0%, 90% 100%, 10% 100%)" }}
                ></div>
              </div>

              {/* Animated Drops */}
              <div className="absolute top-12 md:top-16 left-1/2 transform -translate-x-1/2">
                <div
                  className="w-2 h-2 bg-green-400 rounded-full animate-bounce opacity-80"
                  style={{ animationDuration: "2s", animationDelay: "0s" }}
                ></div>
              </div>
              <div className="absolute top-8 md:top-12 left-1/2 transform -translate-x-1/2 translate-x-1">
                <div
                  className="w-1.5 h-1.5 bg-green-300 rounded-full animate-bounce opacity-60"
                  style={{ animationDuration: "2.5s", animationDelay: "0.7s" }}
                ></div>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/10 to-green-400/20 rounded-full blur-2xl"></div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
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
        </div>
      </main>
    </div>
  )
}
