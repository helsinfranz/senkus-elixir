import { NextResponse } from "next/server"

export async function POST(request) {
  try {
    const { tubes } = await request.json()

    if (!tubes || !Array.isArray(tubes)) {
      return NextResponse.json({ error: "Invalid tubes data" }, { status: 400 })
    }

    // Check if the game is completed
    const isCompleted = checkGameCompletion(tubes)

    return NextResponse.json({
      success: true,
      isCompleted: isCompleted,
      message: isCompleted ? "Level completed successfully!" : "Keep sorting the liquids!",
    })
  } catch (error) {
    console.error("Error checking completion:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function checkGameCompletion(tubes) {
  // Count non-empty tubes
  const nonEmptyTubes = tubes.filter((tube) => tube.length > 0)

  // Check each non-empty tube
  for (const tube of nonEmptyTubes) {
    if (tube.length === 0) continue

    // Get the color of the first liquid in the tube
    const firstColor = tube[0].color
    const firstId = tube[0].id

    // Check if all liquids in this tube have the same color AND same id
    const allSameColor = tube.every((liquid) => liquid.color === firstColor && liquid.id === firstId)

    if (!allSameColor) {
      return false // Found a tube with mixed colors/ids
    }
  }

  // Additional check: ensure we have the right number of complete color sets
  const colorCounts = {}

  // Count all liquids by color/id
  tubes.forEach((tube) => {
    tube.forEach((liquid) => {
      const key = `${liquid.color}-${liquid.id}`
      colorCounts[key] = (colorCounts[key] || 0) + 1
    })
  })

  // Check if each color appears exactly 4 times (full tube)
  // and is properly sorted into single tubes
  const colorGroups = Object.values(colorCounts)
  const validColorCounts = colorGroups.every((count) => count === 4)

  return validColorCounts
}
