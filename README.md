# Web3 Token Transfer Script

## Description
A Node.js script to send **ETH** or **ERC20 tokens** on an Ethereum network using [ethers.js](https://docs.ethers.org/).  
It supports sending funds from a sender wallet to a receiver wallet with proper validation and error handling.

---

## Features
- Send **ETH** or ERC20 tokens.
- Validates **receiver address**.
- Checks sender wallet balance before sending.
- Displays **transaction hash** in the console.
- Confirms transaction after it is mined.
- Handles common errors gracefully.

---

## Requirements
- Node.js (v18+ recommended)
- npm
- ethers.js library
- An Ethereum wallet private key (sender)
- RPC URL (Alchemy, Infura, or other)
- Receiver wallet address
- Amount to send

---

## Setup

1. **Clone the repository:**

```bash
git clone https://github.com/Shabach11/web3-token-transfer.git
cd web3-token-transfer
```
2. Install dependencies:

npm install

3. Create a .env file in the project root with the following variables:

# Your wallet private key (sender)
PRIVATE_KEY=your_private_key_here

# RPC URL (Sepolia or other testnet, e.g., Alchemy/Infura)
RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY

# Receiver wallet address
RECEIVER=0xReceiverWalletAddress

# Amount of ETH to send
AMOUNT=0.01

# Optional: ERC20 token address (leave empty if sending ETH)
TOKEN_ADDRESS=

Usage
npm start


Output:
Displays sender and receiver addresses.
Displays amount to send.
Shows transaction hash.
Confirms transaction after it is mined.


Example console output:
🔄 Preparing transaction...
👤 Sender: 0xYourSenderAddress
📥 Receiver: 0xReceiverWalletAddress
💰 Amount: 0.01
🚀 ETH Transaction Sent!
🔗 Tx Hash: 0xTransactionHashHere
✅ Transaction Confirmed!

Notes
Recommended to use Sepolia testnet or other test networks for testing.
Ensure the sender wallet has enough balance for amount + gas fees.
ERC20 token sending requires a valid token contract address and sufficient token balance.

## License
This project is licensed under the MIT License.

