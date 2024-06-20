@echo off
setlocal

node -v
if %errorlevel% neq 0 (
    echo "Node.js is not installed. Please install Node.js from https://nodejs.org/"
    exit /b 1
)

call npm install
if %errorlevel% neq 0 (
    echo "Failed to install dependencies"
    exit /b 1
)

call npm install -g pkg

node src\main.js

pkg out.js --compress GZip -t node18-win

del out.js