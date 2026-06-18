# ON2CODE Local Development Start Script
# Run from repo root: .\RUN.ps1

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  ON2CODE Local Development Environment" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Check Go installation
Write-Host "Checking Go installation..." -ForegroundColor Yellow
$goVersion = go version 2>&1
if ($goVersion -match "go version") {
    Write-Host "✓ Go found: $goVersion" -ForegroundColor Green
} else {
    Write-Host "✗ Go not found. Please install Go 1.22+" -ForegroundColor Red
    exit 1
}

# Check Node.js installation
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
$nodeVersion = node -v 2>&1
if ($nodeVersion -match "v") {
    Write-Host "✓ Node.js found: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "✗ Node.js not found. Please install Node.js" -ForegroundColor Red
    exit 1
}

# Build backend
Write-Host ""
Write-Host "Building backend..." -ForegroundColor Yellow
Set-Location -LiteralPath "$PSScriptRoot\backend"
go mod tidy
go build ./...
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Backend build failed" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Backend built successfully" -ForegroundColor Green

# Install frontend dependencies
Write-Host ""
Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
Set-Location -LiteralPath "$PSScriptRoot\frontend"
if (-not (Test-Path "node_modules")) {
    & 'C:\Program Files\nodejs\npm.cmd' install --legacy-peer-deps
    if ($LASTEXITCODE -ne 0) {
        Write-Host "✗ Frontend install failed" -ForegroundColor Red
        exit 1
    }
    Write-Host "✓ Frontend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "✓ Frontend dependencies already installed" -ForegroundColor Green
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Ready to start!" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Run in separate terminals:" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Backend (Terminal 1):" -ForegroundColor Yellow
Write-Host "    cd backend" -ForegroundColor White
Write-Host "    `$env:PORT='4000'; ./backend" -ForegroundColor White
Write-Host ""
Write-Host "  Frontend (Terminal 2):" -ForegroundColor Yellow
Write-Host "    cd frontend" -ForegroundColor White
Write-Host "    `$env:NEXT_PUBLIC_API_URL='http://localhost:4000/api/v1'; npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "  Then visit: http://localhost:3000" -ForegroundColor Green
Write-Host ""
Write-Host "Demo credentials:" -ForegroundColor Yellow
Write-Host "  Email: student@on2code.com" -ForegroundColor White
Write-Host "  Password: password" -ForegroundColor White
Write-Host ""
