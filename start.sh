#!/usr/bin/env bash
# Start the Infyniq Solutions portfolio on http://localhost:3000
cd "$(dirname "$0")"
if command -v node >/dev/null 2>&1; then
  node server.js 3000
elif command -v python3 >/dev/null 2>&1; then
  echo "Node not found — using Python. Open http://localhost:3000"
  python3 -m http.server 3000 --bind 0.0.0.0
else
  echo "Please install Node.js (https://nodejs.org) or Python 3, then run this again."
  exit 1
fi
