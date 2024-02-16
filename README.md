# Introduction 
Goal of this project is to automate sapfioneer.com using Playwright + Typescript.

# Getting Started
1.	Installation process
- install visual studio code
- clone repo: https://github.com/Przeprzem/sapfioneer
- install playwright using: npm init playwright@latest

# VS Code settings:
1. "editor.formatOnSave": true
2. "editor.formatOnPaste": true
3. "files.autoSave": "afterDelay"
4. "terminal.external.windowsExec": "C:\Windows\System32\cmd.exe"

# VS Code extensions:
sakamoto66.vscode-playwright-test-
ms-playwright.playwright

# Build and Test
run tests: npx playwright test
show report: npx playwright show-report

# Updating all packages
1. Install `npm-check-updates` package globally by running `npm install -g npm-check-updates`
2. Run `ncu -u`, the list of new versions of packages should appear
3. Run `npm install` to install updated packages

# Documentation link:
1. https://playwright.dev/docs/intro