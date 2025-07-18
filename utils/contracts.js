import { ethers } from "ethers"

// Contract addresses
export const CONTRACT_ADDRESSES = {
    FLUORITE_TOKEN: "0xCe95F6042F0859c046Ab0CdF9aEf69237b096300",
    KINGDOM_NFT: "0x096991aCB60160EF7B2344F9739Cd80d87AD5cEc",
    GAME_CONTROLLER: "0x3A2CBB7F0A7Cfa7C16F8b15bCfFa5c7C0864375E",
}

// Contract ABIs
export const FLUORITE_TOKEN_ABI = [
    "function balanceOf(address owner) view returns (uint256)",
    "function approve(address spender, uint256 amount) returns (bool)",
    "function allowance(address owner, address spender) view returns (uint256)",
]

export const KINGDOM_NFT_ABI = [
    "function balanceOf(address owner) view returns (uint256)",
    "function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)",
    "function tokenURI(uint256 tokenId) view returns (string)",
]

export const GAME_CONTROLLER_ABI = [
    "function claimInitialTokens()",
    "function payToPlay()",
    "function claimReward()",
    "function recordLevelComplete(address playerAddress)",
    "function unlockNft()",
    "function getPlayerInfo(address player) view returns (uint256 fluorBalance, uint256 currentLevel, uint256 levelsCompleted, uint256 nftCount, uint256 claimableRewardSets)",
    "event LevelPlayed(address indexed player, uint256 currentLevel)",
    "event LevelCompleted(address indexed player, uint256 totalLevelsCompleted)",
    "event RewardClaimed(address indexed player, uint256 amount)",
    "event NftUnlocked(address indexed player)",
]

// Contract instances
export const getContracts = (provider) => {
    const fluoriteToken = new ethers.Contract(CONTRACT_ADDRESSES.FLUORITE_TOKEN, FLUORITE_TOKEN_ABI, provider)
    const kingdomNFT = new ethers.Contract(CONTRACT_ADDRESSES.KINGDOM_NFT, KINGDOM_NFT_ABI, provider)
    const gameController = new ethers.Contract(CONTRACT_ADDRESSES.GAME_CONTROLLER, GAME_CONTROLLER_ABI, provider)

    return {
        fluoriteToken,
        kingdomNFT,
        gameController,
    }
}

// Helper functions
export const getProvider = () => {
    return new ethers.JsonRpcProvider("https://rpc.sepolia-api.lisk.com")
}

export const getSigner = async () => {
    const provider = getProvider()
    if (provider) {
        return await provider.getSigner()
    }
    return null
}
