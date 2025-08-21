@echo off
echo Starting LabVIEW LLM Mock WebSocket Server...
echo.

cd /d "%~dp0"
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
)

echo.
echo Server is starting on ws://localhost:6123
echo Press Ctrl+C to stop the server
echo.

node server.js

pause
