# 🛡️ DeSage — AI-Powered Smart Contract Auditor

**DeSage** is an intelligent smart contract auditing tool that leverages AI (like OpenAI’s GPT models) to analyze, detect, and report potential vulnerabilities and inefficiencies in blockchain smart contracts — all in real time.

---

## 🚀 Features

- 🔍 **AI Code Analysis** — Analyze smart contract code using GPT-3.5 or GPT-4.
- ⚠️ **Vulnerability Detection** — Find security issues like reentrancy, overflow, and unverified dependencies.
- ⚡ **Gas Optimization Suggestions** — Get recommendations for improving gas efficiency.
- 🧠 **AI-Powered Explanations** — Understand vulnerabilities in plain language.
- 📤 **Interactive Code Input** — Paste your contract directly into the editor.
- 📋 **Detailed Audit Report** — View clean and readable AI-generated audit results.
- 💡 **Supports Ethereum, Solana & more** — Audits contracts across multiple EVM and non-EVM platforms.

---

## 📸 Demo

![DeSage UI Screenshot](./public/images/screenshot.png)

---

## 🧰 Tech Stack

| Layer         | Tools Used                                  |
| ------------- | ------------------------------------------- |
| Frontend      | React (Next.js 14, App Router), Tailwind CSS |
| AI Integration| OpenAI GPT-3.5 / GPT-4 via API               |
| Editor        | `react-simple-code-editor` + PrismJS         |
| Styling       | Tailwind CSS, Custom Cursors, Animations     |
| Hosting       | Vercel / Netlify / Custom Node Server        |

---

## 📁 Project Structure

```bash
├── public/
│   └── images/              # Cursor & background assets
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Global layout
│   │   └── page.tsx         # Main entry page
│   ├── components/
│   │   ├── Editor.tsx       # Code editor component
│   │   └── Cursor.tsx       # Custom animated cursor
│   └── styles/
│       └── globals.css      # Tailwind & custom styles
├── .env.local               # OpenAI API key (DO NOT COMMIT)
├── tailwind.config.js
├── next.config.js
└── README.md


## ⚙️ Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/judechimaobi/de-sage.git
cd de-sage
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Add Your API Key

Create a `.env.local` file in the root directory:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

### 4. Run the App

```bash
npm run dev
# or
yarn dev
```

Navigate to [http://desage.vercel.com](http://desage.vercel.com) to view the app.

---

## 🧠 How It Works

1. The user pastes a smart contract (Solidity, Rust, Vyper, etc.) into the editor.
2. On clicking **Start Audit**, the code is sent to OpenAI's API.
3. GPT analyzes the contract for:
   - Known vulnerabilities (e.g., reentrancy, access control issues)
   - Gas inefficiencies
   - Best practices compliance
4. The AI's response is rendered clearly in the results pane.

---

## 🔒 Security & Ethics

**DeSage** is a _developer-assist tool_. It does **not** guarantee vulnerability-free code. Always verify AI-generated outputs manually and/or with manual review.

---

## ✨ To-Do / Roadmap

- [x] Syntax-highlighted code editor
- [x] AI-powered auditing with GPT
- [ ] Code auto-formatting
- [ ] Save/Export Audit Reports (PDF/Markdown)
- [ ] Support uploading `.sol`/`.rs` files
- [ ] Integration with GitHub for contract import

---

## 🙌 Contributing

We welcome contributions!

1. Fork the repository
2. Create a new branch:  
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes
4. Commit and push:
   ```bash
   git commit -m "Feature: add new feature"
   git push origin feature-name
   ```
5. Open a Pull Request

---

## 📝 License

**MIT License** © 2025 [DeSage]

---

## 🌐 Connect with Us

- Twitter: [@desage_ai](https://twitter.com/desage_ai)
- Website: [https://desage.ai](https://desage.ai)
- Email: hello@desage.ai

---

> Built with 💚 by developers who care about secure smart contracts.
