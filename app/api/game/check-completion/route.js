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
  // Get all non-empty tubes
  const nonEmptyTubes = tubes.filter((tube) => tube.length > 0)

  if (nonEmptyTubes.length === 0) {
    return false // No liquids to sort
  }

  // Count total liquids by color/id
  const colorCounts = {}
  tubes.forEach((tube) => {
    tube.forEach((liquid) => {
      const key = `${liquid.color}-${liquid.id}`
      colorCounts[key] = (colorCounts[key] || 0) + 1
    })
  })

  // Check each non-empty tube for color consistency
  for (const tube of nonEmptyTubes) {
    if (tube.length === 0) continue

    // Get the first liquid's properties
    const firstColor = tube[0].color
    const firstId = tube[0].id

    // Check if all liquids in this tube have the same color AND same id
    const allSameColor = tube.every((liquid) => liquid.color === firstColor && liquid.id === firstId)

    if (!allSameColor) {
      return false // Found a tube with mixed colors/ids
    }
  }

  // Check if each color group is properly sorted into complete tubes
  // A color is properly sorted if all instances are in the same tube(s)
  const colorKeys = Object.keys(colorCounts)

  for (const colorKey of colorKeys) {
    const [color, id] = colorKey.split("-")
    const totalCount = colorCounts[colorKey]

    // Find all tubes containing this color
    const tubesWithThisColor = tubes.filter((tube) =>
      tube.some((liquid) => liquid.color === color && liquid.id.toString() === id),
    )

    // Check if this color is properly consolidated
    let foundCount = 0
    for (const tube of tubesWithThisColor) {
      const colorCountInTube = tube.filter((liquid) => liquid.color === color && liquid.id.toString() === id).length

      // If a tube has this color, it should contain ALL instances of this color
      // OR the tube should be completely filled with this color
      if (colorCountInTube > 0) {
        const hasOnlyThisColor = tube.every((liquid) => liquid.color === color && liquid.id.toString() === id)

        if (!hasOnlyThisColor) {
          return false // Mixed colors in tube
        }

        foundCount += colorCountInTube
      }
    }

    // Verify we found all instances of this color
    if (foundCount !== totalCount) {
      return false
    }
  }

  return true
}
