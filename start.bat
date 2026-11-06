@echo off
REM Start the Infyniq Solutions portfolio on http://localhost:3000
cd /d "%~dp0"
where node >nul 2>nul
if %errorlevel%==0 (
  node server.js 3000
) else (
  where python >nul 2>nul
  if %errorlevel%==0 (
    echo Node not found - using Python. Open http://localhost:3000
    python -m http.server 3000 --bind 0.0.0.0
  ) else (
    echo Please install Node.js from https://nodejs.org or Python 3, then run this again.
    pause
  )
)
