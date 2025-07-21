#!/bin/bash

echo "🔄 [MEGA-AI] Watchdog started..."

while true; do
  git fetch origin
  if ! git diff --quiet HEAD origin/main; then
    echo "🆕 [MEGA-AI] Update detected!"
    git reset --hard origin/main
    npm install || yarn install
    pkill -f "node" || true
    echo "🔁 [MEGA-AI] Restarting..."
    npm start &
  fi
  sleep 60
done