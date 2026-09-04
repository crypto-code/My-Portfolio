#!/usr/bin/env python3
"""
Automated Academic & GitHub Stats Collector
Fetches citations from Google Scholar and Semantic Scholar, and repository metrics from GitHub.
"""

import os
import json
import re
import datetime
import subprocess
import urllib.request
import urllib.error

SCHOLAR_USER_ID = "DARNIXMAAAAJ"
SEMANTIC_AUTHOR_ID = "2232951291"
GITHUB_USERNAME = "crypto-code"
OUTPUT_FILE = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "assets", "data", "stats.json")

def get_google_scholar_stats(user_id):
    """Scrapes Google Scholar citation table stats for the given user ID."""
    url = f"https://scholar.google.com/citations?hl=en&user={user_id}"
    
    # Use curl with browser headers to avoid SSL/TLS fingerprint blocking
    try:
        cmd = [
            "curl", "-s", "-L",
            "-H", "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "-H", "Accept-Language: en-US,en;q=0.9",
            url
        ]
        res = subprocess.run(cmd, capture_output=True, text=True, timeout=25)
        html = res.stdout
        
        matches = re.findall(r'<td class="gsc_rsb_std">(\d+)</td>', html)
        if matches:
            return {
                "citations": int(matches[0]),
                "citationsRecent": int(matches[1]) if len(matches) > 1 else None,
                "hIndex": int(matches[2]) if len(matches) > 2 else None,
                "i10Index": int(matches[4]) if len(matches) > 4 else None,
            }
        else:
            print("[Google Scholar] Warning: Could not parse citation numbers from response.")
    except Exception as e:
        print(f"[Google Scholar] Error fetching stats: {e}")
        
    return None

def get_semantic_scholar_stats(author_id):
    """Fetches citation count and metrics from Semantic Scholar REST API."""
    url = f"https://api.semanticscholar.org/graph/v1/author/{author_id}?fields=paperCount,citationCount,hIndex"
    try:
        cmd = ["curl", "-s", "-L", url]
        res = subprocess.run(cmd, capture_output=True, text=True, timeout=15)
        data = json.loads(res.stdout)
        return {
            "citations": data.get("citationCount", 0),
            "hIndex": data.get("hIndex", 0),
            "paperCount": data.get("paperCount", 0)
        }
    except Exception as e:
        print(f"[Semantic Scholar] Error fetching stats: {e}")
        return None

def get_github_stats(username):
    """Fetches total public repos and stars from GitHub REST API."""
    url = f"https://api.github.com/users/{username}/repos?per_page=100"
    total_stars = 0
    total_repos = 0
    page = 1
    
    headers = {"User-Agent": "Mozilla/5.0"}
    token = os.environ.get("GITHUB_TOKEN")
    if token:
        headers["Authorization"] = f"token {token}"
        
    try:
        while True:
            req_url = f"https://api.github.com/users/{username}/repos?per_page=100&page={page}"
            req = urllib.request.Request(req_url, headers=headers)
            with urllib.request.urlopen(req, timeout=15) as resp:
                repos = json.loads(resp.read().decode())
                if not repos:
                    break
                total_repos += len(repos)
                total_stars += sum(repo.get("stargazers_count", 0) for repo in repos)
                
                link_header = resp.headers.get("Link", "")
                if 'rel="next"' in link_header:
                    page += 1
                else:
                    break
        return {
            "totalRepos": total_repos,
            "totalStars": total_stars
        }
    except Exception as e:
        print(f"[GitHub] Error fetching stats: {e}")
        # Fallback to curl
        try:
            cmd = ["curl", "-s", f"https://api.github.com/users/{username}/repos?per_page=100"]
            res = subprocess.run(cmd, capture_output=True, text=True, timeout=15)
            repos = json.loads(res.stdout)
            if isinstance(repos, list):
                return {
                    "totalRepos": len(repos),
                    "totalStars": sum(r.get("stargazers_count", 0) for r in repos)
                }
        except Exception:
            pass
            
    return None

def main():
    print("=== Fetching Academic & Project Stats ===")
    
    # Load existing stats for fallback values
    existing = {}
    if os.path.exists(OUTPUT_FILE):
        try:
            with open(OUTPUT_FILE, "r") as f:
                existing = json.load(f)
        except Exception:
            pass
            
    google_stats = get_google_scholar_stats(SCHOLAR_USER_ID)
    semantic_stats = get_semantic_scholar_stats(SEMANTIC_AUTHOR_ID)
    github_stats = get_github_stats(GITHUB_USERNAME)
    
    # Determine primary citations: Google Scholar is primary, fallback to Semantic Scholar or existing
    if google_stats and google_stats.get("citations"):
        citations = google_stats["citations"]
        source = "Google Scholar"
    elif semantic_stats and semantic_stats.get("citations"):
        citations = semantic_stats["citations"]
        source = "Semantic Scholar (Fallback)"
    else:
        citations = existing.get("citations", 339)
        source = "Existing Cache (Fallback)"
        
    papers_count = 5 # Set to 5 per user requirement
    h_index = (google_stats.get("hIndex") if google_stats else None) or (semantic_stats.get("hIndex") if semantic_stats else None) or existing.get("hIndex", 5)
    
    github_repos = (github_stats.get("totalRepos") if github_stats else None) or existing.get("githubRepos", 39)
    github_stars = (github_stats.get("totalStars") if github_stats else None) or existing.get("githubStars", 527)
    
    output_data = {
        "citations": citations,
        "citationsGoogle": google_stats.get("citations") if google_stats else existing.get("citationsGoogle", 339),
        "citationsSemantic": semantic_stats.get("citations") if semantic_stats else existing.get("citationsSemantic", 187),
        "hIndex": h_index,
        "i10Index": google_stats.get("i10Index") if google_stats else existing.get("i10Index", 4),
        "papers": papers_count,
        "githubRepos": github_repos,
        "githubStars": github_stars,
        "primarySource": source,
        "lastUpdated": datetime.datetime.now(datetime.timezone.utc).isoformat()
    }
    
    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    with open(OUTPUT_FILE, "w") as f:
        json.dump(output_data, f, indent=2)
        
    print("\n✅ Successfully updated stats.json:")
    print(json.dumps(output_data, indent=2))

if __name__ == "__main__":
    main()
