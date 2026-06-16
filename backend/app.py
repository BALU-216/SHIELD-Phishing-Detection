from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)

CORS(app)


def expand_url(url):
    try:
        response = requests.get(url, allow_redirects=True, timeout=5)
        return response.url
    except:
        return url


def regex_check(url):

    score = 0

    reasons = []

    url_lower = url.lower()

    suspicious_keywords = [
        "login",
        "verify",
        "secure",
        "update",
        "bank",
        "paypal",
        "free",
        "bonus",
        "crypto",
        "wallet",
        "signin",
        "account",
        "password",
        "otp",
        "gift",
        "claim",
    ]

    suspicious_domains = [
        "trycloudflare.com",
        "ngrok.io",
        "duckdns.org",
        "000webhostapp.com",
        "netlify.app",
        "vercel.app",
    ]

    trusted_domains = [
        "google.com",
        "youtube.com",
        "github.com",
        "microsoft.com",
        "amazon.com",
        "facebook.com",
        "instagram.com",
        "wikipedia.org",
    ]

    # -----------------------------
    # Trusted domain check
    # -----------------------------
    for trusted in trusted_domains:
        if trusted in url_lower:
            score -= 40
            reasons.append(f"Trusted domain detected: {trusted}")

    # -----------------------------
    # Suspicious hosting providers
    # -----------------------------
    for domain in suspicious_domains:
        if domain in url_lower:
            score += 50
            reasons.append(f"Suspicious hosting domain: {domain}")

    # -----------------------------
    # Suspicious keywords
    # -----------------------------
    for keyword in suspicious_keywords:
        if keyword in url_lower:
            score += 15
            reasons.append(f"Contains suspicious keyword: {keyword}")

    # -----------------------------
    # Too many hyphens
    # -----------------------------
    hyphen_count = url.count("-")

    if hyphen_count >= 2:
        score += 20
        reasons.append("Too many hyphens in URL")

    # -----------------------------
    # Long URL
    # -----------------------------
    if len(url) > 60:
        score += 20
        reasons.append("Very long URL")

    # -----------------------------
    # Too many dots
    # -----------------------------
    if url.count(".") >= 4:
        score += 15
        reasons.append("Too many subdomains")

    # -----------------------------
    # @ symbol
    # -----------------------------
    if "@" in url:
        score += 25
        reasons.append("Contains @ symbol")

    # -----------------------------
    # Shortened URL
    # -----------------------------
    if "bit.ly" in url_lower or "tinyurl" in url_lower:
        score += 30
        reasons.append("Shortened URL detected")

    # -----------------------------
    # IP address instead of domain
    # -----------------------------
    import re

    ip_pattern = r"(https?:\/\/)?(\d{1,3}\.){3}\d{1,3}"

    if re.search(ip_pattern, url_lower):
        score += 40
        reasons.append("IP address used instead of domain")

    # -----------------------------
    # Normalize score
    # -----------------------------
    score = max(0, min(score, 100))

    return score, reasons

@app.route('/analyze', methods=['POST'])
def analyze():

    try:

        data = request.json

        url = data.get("url")

        expanded_url = expand_url(url)

        score, reasons = regex_check(expanded_url)

        if score >= 70:
            risk = "High Risk"

        elif score >= 40:
            risk = "Suspicious"

        else:
            risk = "Safe"

        return jsonify({
            "original_url": url,
            "expanded_url": expanded_url,
            "risk": risk,
            "score": score,
            "reasons": reasons
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500


if __name__ == '__main__':
    app.run(debug=True)