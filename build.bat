@echo off
setlocal

node -v
if %errorlevel% neq 0 (
    echo Node.js is not installed
    start https://nodejs.org/en/download
    pause
    exit
)

call npm install
if %errorlevel% neq 0 (
    echo npm install failed
    pause
    exit
)

npm install -g pkg

node src\main.js

pkg out.js --compress GZip -t node18-win

del out.js