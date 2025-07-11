"use client"

export default function GameBoard({ tubes, selectedTube, onTubeClick }) {
  return (
    <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-6 md:mb-8 px-2">
      {tubes.map((tube, index) => (
        <div
          key={index}
          className={`relative cursor-pointer transition-all duration-300 ${
            selectedTube === index
              ? "transform -translate-y-3 drop-shadow-[0_0_25px_rgba(34,197,94,0.8)]"
              : "hover:transform hover:-translate-y-1"
          }`}
          onClick={() => onTubeClick(index)}
        >
          {/* Scientific Beaker Container */}
          <div className="relative w-14 h-40 md:w-20 md:h-56">
            {/* Beaker Base */}
            <div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 md:w-16 h-32 md:h-44 bg-gradient-to-b from-gray-200/10 via-gray-100/20 to-gray-200/30 border-2 border-gray-300/40 backdrop-blur-sm"
              style={{
                clipPath: "polygon(15% 0%, 85% 0%, 90% 100%, 10% 100%)",
                borderRadius: "0 0 8px 8px",
              }}
            >
              {/* Volume Markings */}
              <div className="absolute left-1 top-6 w-3 h-px bg-gray-400/60"></div>
              <div className="absolute left-1 top-12 w-3 h-px bg-gray-400/60"></div>
              <div className="absolute left-1 top-18 w-3 h-px bg-gray-400/60"></div>
              <div className="absolute left-1 top-24 w-3 h-px bg-gray-400/60"></div>

              {/* Measurement Numbers */}
              <div className="absolute -left-6 top-5 text-xs text-gray-400 font-mono">100</div>
              <div className="absolute -left-6 top-11 text-xs text-gray-400 font-mono">75</div>
              <div className="absolute -left-6 top-17 text-xs text-gray-400 font-mono">50</div>
              <div className="absolute -left-6 top-23 text-xs text-gray-400 font-mono">25</div>

              {/* Liquid Layers */}
              <div className="absolute bottom-1 left-1 right-1 flex flex-col-reverse">
                {tube.map((liquid, liquidIndex) => (
                  <div
                    key={liquidIndex}
                    className="h-7 md:h-10 relative overflow-hidden transition-all duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${liquid.color}F0, ${liquid.color}CC, ${liquid.color}E6)`,
                      clipPath: liquidIndex === 0 ? "polygon(5% 0%, 95% 0%, 90% 100%, 10% 100%)" : "none",
                    }}
                  >
                    {/* Liquid Surface Shine */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                    {/* Liquid Body Shine */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/5"></div>
                    {/* Bubbles Effect */}
                    <div className="absolute top-1 left-2 w-1 h-1 bg-white/30 rounded-full animate-pulse"></div>
                    <div
                      className="absolute top-3 right-2 w-0.5 h-0.5 bg-white/40 rounded-full animate-pulse"
                      style={{ animationDelay: "0.5s" }}
                    ></div>
                  </div>
                ))}
              </div>

              {/* Beaker Spout */}
              <div className="absolute -top-2 left-0 w-4 h-3 bg-gradient-to-r from-gray-200/20 to-gray-300/30 border border-gray-300/40 rounded-tl-lg"></div>

              {/* Glass Reflection */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-white/15 via-transparent to-white/10 pointer-events-none"
                style={{ clipPath: "polygon(15% 0%, 85% 0%, 90% 100%, 10% 100%)" }}
              ></div>
            </div>

            {/* Selection Glow Effect */}
            {selectedTube === index && (
              <>
                <div className="absolute inset-0 border-2 border-green-400 animate-pulse pointer-events-none rounded-lg"></div>
                <div className="absolute -inset-2 bg-green-400/20 blur-md rounded-lg pointer-events-none animate-pulse"></div>
              </>
            )}

            {/* Floating Particles for Selected Tube */}
            {selectedTube === index && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="w-1 h-1 bg-green-400 rounded-full animate-bounce"></div>
                <div
                  className="w-0.5 h-0.5 bg-green-300 rounded-full animate-bounce absolute -left-2 top-1"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-0.5 h-0.5 bg-green-300 rounded-full animate-bounce absolute -right-2 top-1"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
