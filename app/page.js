"use client"
import Header from "@/components/header"
import ParticleBackground from "@/components/particle-background"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleBackground />
      <Header />

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Hero Flask Image */}
          <div className="mb-8 relative">
            <div className="w-48 h-64 mx-auto relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/20 to-green-400/40 rounded-full blur-xl"></div>
              <div className="relative w-full h-full">
                {/* Flask Neck */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-16 bg-gradient-to-b from-gray-700/80 to-gray-800/80 border-2 border-gray-600/50 backdrop-blur-sm">
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gray-600/80 rounded-t"></div>
                </div>

                {/* Animated Drop */}
                <div
                  className="absolute top-16 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-400 rounded-full animate-bounce"
                  style={{
                    animationDuration: "2s",
                    animationDelay: "0.5s",
                  }}
                ></div>

                {/* Flask Body */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-40 bg-gradient-to-b from-gray-800/80 to-gray-900/90 rounded-b-full border-2 border-gray-600/50 backdrop-blur-sm">
                  {/* Liquid */}
                  <div className="absolute bottom-2 left-2 right-2 h-24 bg-gradient-to-t from-green-400 via-green-300 to-green-200 rounded-b-full opacity-80 animate-pulse">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-b-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Text */}
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            Science Will Save the World.
            <span className="block text-green-400 text-2xl md:text-3xl mt-2 font-light">One Drop at a Time.</span>
          </h1>

          <p className="text-base md:text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Enter the Kingdom of Science and master the art of liquid alchemy. Sort, combine, and perfect your formulas
            to rebuild civilization through the power of chemistry.
          </p>

          <Link href="/game">
            <Button className="text-lg px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400 text-white font-semibold rounded-lg shadow-2xl transform hover:scale-105 transition-all duration-300">
              Enter the Lab
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}