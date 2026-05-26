# 🛡 CipherVault

A modern, cybersecurity-themed web app for **secure text encryption and decryption**, built with Python, Flask, and a sleek dark-neon UI.

## ✨ Features
- 🔒 Encrypt any text using **Fernet (AES-128-CBC + HMAC)**
- 🔓 Decrypt cipher text back to the original message
- 🎨 Dark cybersecurity theme with glassmorphism & neon accents
- ✨ Animated particle background, typewriter hero text, glowing buttons
- 📋 Copy-to-clipboard, toast notifications, status indicators
- 📱 Fully responsive (mobile & desktop)
- 🛡 Input validation, sanitization, and clean error handling

## 🧰 Tech Stack
- **Backend:** Python, Flask, cryptography
- **Frontend:** HTML5, CSS3, vanilla JavaScript

## 📁 Project Structure
```
CipherVault/
├── app.py
├── requirements.txt
├── README.md
├── static/
│   ├── style.css
│   ├── script.js
│   └── images/
└── templates/
    └── index.html
```

## 🚀 Installation & Run

```bash
# 1. Clone or unzip the project
cd CipherVault

# 2. (Recommended) create a virtual environment
python -m venv venv
source venv/bin/activate         # macOS / Linux
venv\Scripts\activate            # Windows

# 3. Install dependencies
pip install -r requirements.txt

# 4. Run the app
python app.py
```

Then open **http://127.0.0.1:5000** in your browser.

> A `secret.key` file is generated on first run. **Keep it safe** — without it, previously encrypted text cannot be decrypted.

## 🔌 API Endpoints
| Method | Route       | Body                  | Response                          |
|--------|-------------|-----------------------|-----------------------------------|
| GET    | `/`         | —                     | Home page                         |
| POST   | `/encrypt`  | `{ "text": "..." }`   | `{ success, result \| error }`    |
| POST   | `/decrypt`  | `{ "text": "..." }`   | `{ success, result \| error }`    |

## 📸 Screenshots
_Add screenshots of the hero, encrypt, and decrypt sections here._

## 🔮 Future Improvements
- User accounts with per-user keys
- Asymmetric encryption (RSA) support
- File encryption (upload/download)
- Password-protected vaults
- Dark/light theme toggle

## 👤 Credits
Built with 🛡 by Tammina Prasad.  
GitHub:https://github.com/Tammina-Prasad

---
_For educational and demonstration purposes._
