# 🔐 Solana Wallet Generator (React + Chakra UI + BIP39)

A sleek and secure Solana wallet generator built with **React**, **Chakra UI**, **Framer Motion**, and **Solana Web3.js**. Generate HD wallets, view public/private keys, and manage your seed phrase with ease.

## ⚙️ Features

- 🔁 **BIP39-based mnemonic phrase generation**
- 🔐 **HD wallet derivation** using `ed25519-hd-key` & Solana's `Keypair`
- 🧠 **Seed phrase visibility toggle** with copy-to-clipboard support
- 🧾 **Multiple wallet generation** with unique keypairs
- 🔒 **Private key visibility toggle** (with warning toast)
- 🧼 Beautiful, responsive UI with Chakra UI & Framer Motion

## 📸 Preview

<img src="./screenshot.png" width="100%" alt="App Screenshot" />

## 🚀 Getting Started

```bash
git clone https://github.com/yourusername/solana-wallet-generator.git
cd solana-wallet-generator
npm install
npm run dev

```

🛠 Tech Stack
⚛️ React

💄 Chakra UI

🎞 Framer Motion

🔑 bip39 + ed25519-hd-key + tweetnacl

🌐 @solana/web3.js

📌 Project Structure
src/
│
├── App.js # Main component
├── index.js # App entry point
├── theme.js # Chakra theme
└── assets/ # Icons, images, etc
🗺️ Roadmap
✅ Implemented
Generate and display mnemonic phrase

Create multiple derived Solana wallets (HD wallet)

Toggle visibility of phrase and private key

Copy-to-clipboard for passphrase

🔜 Coming Soon
💰 Real-time SOL balance fetching

📤 Send and receive SOL transactions

📥 Import wallet using existing passphrase

🔐 Password-protected wallet file exports

🧩 Browser extension support

🧠 Security Disclaimer
This project is for educational and development purposes only. Do not use this in production with real funds. Always use hardware wallets or secure environments for mainnet assets.

🤝 Contributing
Got a feature request or improvement idea? PRs and issues are welcome!

Made with ❤️ by [Abhishek]
