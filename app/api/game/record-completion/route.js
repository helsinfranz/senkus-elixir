import { NextResponse } from "next/server"
import { ethers } from "ethers"
import { CONTRACT_ADDRESSES, GAME_CONTROLLER_ABI } from "@/utils/contracts"

// This would be your backend private key for the owner account
// In production, use environment variables and proper key management
const BACKEND_PRIVATE_KEY = process.env.BACKEND_PRIVATE_KEY || "your-private-key-here"

export async function POST(request) {
    try {
        const { playerAddress, tubes } = await request.json()

        if (!playerAddress || !tubes || !Array.isArray(tubes)) {
            return NextResponse.json({ error: "Invalid request data" }, { status: 400 })
        }

        // Check if the game is completed
        const isCompleted = checkGameCompletion(tubes)

        if (!isCompleted) {
            return NextResponse.json({
                success: false,
                isCompleted: false,
                message: "Level not completed yet!",
            })
        }

        // Record completion on blockchain (only if completed)
        try {
            // Initialize provider and signer for backend
            const provider = new ethers.JsonRpcProvider("https://rpc.sepolia-api.lisk.com")
            const signer = new ethers.Wallet(BACKEND_PRIVATE_KEY, provider)

            // Create contract instance
            const gameController = new ethers.Contract(CONTRACT_ADDRESSES.GAME_CONTROLLER, GAME_CONTROLLER_ABI, signer)

            // Record level completion on blockchain
            const tx = await gameController.recordLevelComplete(playerAddress)
            await tx.wait()

            return NextResponse.json({
                success: true,
                isCompleted: true,
                message: "Level completed successfully!",
                transactionHash: tx.hash,
            })
        } catch (blockchainError) {
            console.error("Blockchain error:", blockchainError)
            // Return success for game logic but note blockchain issue
            return NextResponse.json({
                success: true,
                isCompleted: true,
                message: "Level completed! (Blockchain recording pending)",
                blockchainError: blockchainError.message,
            })
        }
    } catch (error) {
        console.error("Error recording completion:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}

function checkGameCompletion(tubes) {
    const nonEmptyTubes = tubes.filter((tube) => tube.length > 0)

    if (nonEmptyTubes.length === 0) {
        return false
    }

    const colorCounts = {}
    tubes.forEach((tube) => {
        tube.forEach((liquid) => {
            const key = `${liquid.color}-${liquid.id}`
            colorCounts[key] = (colorCounts[key] || 0) + 1
        })
    })

    for (const tube of nonEmptyTubes) {
        if (tube.length === 0) continue

        const firstColor = tube[0].color
        const firstId = tube[0].id

        const allSameColor = tube.every((liquid) => liquid.color === firstColor && liquid.id === firstId)

        if (!allSameColor) {
            return false
        }
    }

    const colorKeys = Object.keys(colorCounts)

    for (const colorKey of colorKeys) {
        const [color, id] = colorKey.split("-")
        const totalCount = colorCounts[colorKey]

        const tubesWithThisColor = tubes.filter((tube) =>
            tube.some((liquid) => liquid.color === color && liquid.id.toString() === id),
        )

        let foundCount = 0
        for (const tube of tubesWithThisColor) {
            const colorCountInTube = tube.filter((liquid) => liquid.color === color && liquid.id.toString() === id).length

            if (colorCountInTube > 0) {
                const hasOnlyThisColor = tube.every((liquid) => liquid.color === color && liquid.id.toString() === id)

                if (!hasOnlyThisColor) {
                    return false
                }

                foundCount += colorCountInTube
            }
        }

        if (foundCount !== totalCount) {
            return false
        }
    }

    return true
}
