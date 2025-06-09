#!/usr/bin/env bash
# bin/start-all.sh: Launch example API, backend server, and React client (dev) from app-root/bin

# Exit on any error
set -e

# Resolve script location and project root
dirname="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="${dirname}/.."

# 1. Start the example API server on port 4000
echo "[1/3] Starting example API on port 4000..."
nohup node "${PROJECT_ROOT}/example-app/example-api-app.js" > "${PROJECT_ROOT}/example-app.log" 2>&1 &
EXAMPLE_PID=$!
echo "Started example API (pid $EXAMPLE_PID)"

# 2. Start the main Express server on port 3000
echo "[2/3] Starting main server on port 3000..."
nohup bash -c "cd \"$PROJECT_ROOT\" && npm start" > "${PROJECT_ROOT}/server.log" 2>&1 &
SERVER_PID=$!
echo "Started main server (pid $SERVER_PID)"

# 3. Start the React client in development mode on port 3001
echo "[3/3] Starting React client (dev) on port 3001..."
cd "${PROJECT_ROOT}/client"

echo "Installing client dependencies if missing..."
if [ ! -d "node_modules" ]; then
  npm install
fi

# Set CRA dev server port to 3001 to avoid conflict with backend
unset HOST
export PORT=3001
npx react-scripts start

# Cleanup when client stops
echo "Shutting down background servers..."
kill $EXAMPLE_PID $SERVER_PID
echo "All background processes terminated."
