"""
CipherVault - Secure text encryption & decryption (Flask).
"""
import os
from flask import Flask, render_template, request, jsonify
from cryptography.fernet import Fernet, InvalidToken

app = Flask(__name__)

# Persist a key locally so encrypted text remains decryptable across restarts.
KEY_FILE = os.path.join(os.path.dirname(__file__), "secret.key")
if not os.path.exists(KEY_FILE):
    with open(KEY_FILE, "wb") as f:
        f.write(Fernet.generate_key())
with open(KEY_FILE, "rb") as f:
    KEY = f.read()

cipher = Fernet(KEY)


def _sanitize(text: str) -> str:
    if not isinstance(text, str):
        return ""
    return text.strip()


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/encrypt", methods=["POST"])
def encrypt():
    try:
        data = request.get_json(silent=True) or {}
        text = _sanitize(data.get("text", ""))
        if not text:
            return jsonify({"success": False, "error": "Please enter text to encrypt."}), 400
        if len(text) > 10000:
            return jsonify({"success": False, "error": "Text too long (max 10,000 chars)."}), 400
        token = cipher.encrypt(text.encode("utf-8")).decode("utf-8")
        return jsonify({"success": True, "result": token})
    except Exception as e:
        return jsonify({"success": False, "error": f"Encryption failed: {e}"}), 500


@app.route("/decrypt", methods=["POST"])
def decrypt():
    try:
        data = request.get_json(silent=True) or {}
        token = _sanitize(data.get("text", ""))
        if not token:
            return jsonify({"success": False, "error": "Please enter cipher text to decrypt."}), 400
        plain = cipher.decrypt(token.encode("utf-8")).decode("utf-8")
        return jsonify({"success": True, "result": plain})
    except InvalidToken:
        return jsonify({"success": False, "error": "Invalid or corrupted cipher text."}), 400
    except Exception as e:
        return jsonify({"success": False, "error": f"Decryption failed: {e}"}), 500


if __name__ == "__main__":
    app.run(debug=True)
