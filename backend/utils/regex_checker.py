import re

def regex_check(url):
    score = 0
    reasons = []

    suspicious_patterns = [
        r"@",
        r"-{3,}",
        r"bit\.ly",
        r"tinyurl",
        r"ngrok",
        r"trycloudflare",
        r"serveo",
        r"login",
        r"verify",
        r"secure",
        r"update"
    ]

    for pattern in suspicious_patterns:
        if re.search(pattern, url):
            score += 10
            reasons.append(f"Matched suspicious pattern: {pattern}")

    return score, reasons