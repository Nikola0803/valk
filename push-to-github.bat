@echo off
setlocal enabledelayedexpansion
cd /d "%~dp0"

echo ============================================
echo   Push Valkyrie Peptides site to GitHub
echo   Target: https://github.com/cavancook/warrior-distributions
echo ============================================
echo.

where git >nul 2>nul
if errorlevel 1 (
    echo ERROR: Git is not installed, or not on your PATH.
    echo Install it from https://git-scm.com/download/win and run this again.
    echo.
    pause
    exit /b 1
)

if not exist ".git" (
    echo Initializing git repository...
    git init
    git branch -M main
)

echo Configuring remote "origin"...
git remote get-url origin >nul 2>nul
if errorlevel 1 (
    git remote add origin https://github.com/cavancook/warrior-distributions.git
) else (
    git remote set-url origin https://github.com/cavancook/warrior-distributions.git
)

echo.
echo Staging files (node_modules, dist, and .env.local are excluded via .gitignore)...
git add -A

git diff --cached --quiet
if errorlevel 1 (
    set "COMMIT_MSG="
    set /p COMMIT_MSG="Commit message (press Enter to use 'Update site'): "
    if "!COMMIT_MSG!"=="" set "COMMIT_MSG=Update site"
    git commit -m "!COMMIT_MSG!"
) else (
    echo Nothing new to commit - working tree matches last commit.
)

echo.
echo Pushing to GitHub...
echo (If this is your first push, a browser window may open asking you to sign in to GitHub.)
echo.
git push -u origin main

if errorlevel 1 (
    echo.
    echo ============================================
    echo   Push failed. See the error above.
    echo   Common cause: the GitHub repo already has
    echo   commits ^(e.g. an auto-created README^) that
    echo   conflict with this push. Check the repo at
    echo   https://github.com/cavancook/warrior-distributions
    echo ============================================
) else (
    echo.
    echo ============================================
    echo   Done. Pushed to
    echo   https://github.com/cavancook/warrior-distributions
    echo ============================================
)

echo.
pause
