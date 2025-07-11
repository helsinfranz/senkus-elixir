import { NextResponse } from "next/server"
import gameLevels from "@/data/game-levels.json"

export async function GET(request, { params }) {
    try {
        const { levelId } = await params

        // Simulate network delay for loading state
        await new Promise((resolve) => setTimeout(resolve, 500))

        const level = gameLevels.levels[levelId]

        if (!level) {
            return NextResponse.json({ error: "Level not found" }, { status: 404 })
        }

        return NextResponse.json({
            success: true,
            level: level,
        })
    } catch (error) {
        console.error("Error fetching level:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
