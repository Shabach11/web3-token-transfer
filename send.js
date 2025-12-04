require("dotenv").config();
const { ethers } = require("ethers");

// ===== CONFIG =====
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const RPC_URL = process.env.RPC_URL;
const RECEIVER = process.env.RECEIVER;
const AMOUNT = process.env.AMOUNT;
const TOKEN_ADDRESS = process.env.TOKEN_ADDRESS;

// ===== VALIDATION =====
if (!PRIVATE_KEY) throw new Error("❌ Missing PRIVATE_KEY in .env");
if (!RPC_URL) throw new Error("❌ Missing RPC_URL in .env");
if (!RECEIVER) throw new Error("❌ Missing RECEIVER in .env");
if (!ethers.isAddress(RECEIVER)) throw new Error("❌ RECEIVER is not a valid Ethereum address!");
if (!AMOUNT) throw new Error("❌ Missing AMOUNT in .env");

// ===== CONNECT =====
const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

async function send() {
    try {
        console.log("🔄 Preparing transaction...");
        console.log("👤 Sender:", wallet.address);
        console.log("📥 Receiver:", RECEIVER);
        console.log("💰 Amount:", AMOUNT);

        // Check wallet balance
        const balance = await provider.getBalance(wallet.address);
        const balanceEth = parseFloat(ethers.formatEther(balance));
        const amountEth = parseFloat(AMOUNT);

        if (balanceEth < amountEth) {
            throw new Error(`❌ Insufficient funds! Wallet balance: ${balanceEth} ETH, required: ${amountEth} ETH`);
        }

        if (!TOKEN_ADDRESS || TOKEN_ADDRESS.trim() === "") {
            // === SEND NATIVE ETH ===
            const tx = await wallet.sendTransaction({
                to: RECEIVER,
                value: ethers.parseEther(AMOUNT)
            });
            console.log("🚀 ETH Transaction Sent!");
            console.log("🔗 Tx Hash:", tx.hash);
            await tx.wait();
            console.log("✅ Transaction Confirmed!");
        } else {
            // === SEND ERC20 TOKEN ===
            const abi = [
                "function transfer(address to, uint256 amount) public returns (bool)",
                "function decimals() public view returns (uint8)"
            ];
            const contract = new ethers.Contract(TOKEN_ADDRESS, abi, wallet);
            const decimals = await contract.decimals();
            const amountInUnits = ethers.parseUnits(AMOUNT, decimals);
            const tx = await contract.transfer(RECEIVER, amountInUnits);
            console.log("🚀 Token Transaction Sent!");
            console.log("🔗 Tx Hash:", tx.hash);
            await tx.wait();
            console.log("✅ Token Transaction Confirmed!");
        }
    } catch (err) {
        console.error("❌ ERROR:", err.message || err);
    }
}

send();
