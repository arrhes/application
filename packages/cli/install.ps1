# Arrhes CLI installer for Windows
# Usage: irm https://arrhes.com/cli/install.ps1 | iex
$ErrorActionPreference = "Stop"

$REPO = "arrhes/application"
$INSTALL_DIR = if ($env:ARRHES_INSTALL_DIR) { $env:ARRHES_INSTALL_DIR } else { "$env:LOCALAPPDATA\Programs\arrhes" }
$DEST = "$INSTALL_DIR\arrhes.exe"

$URL = "https://github.com/$REPO/releases/latest/download/arrhes-windows-x64.exe"

Write-Host "Downloading arrhes CLI..."
New-Item -ItemType Directory -Force -Path $INSTALL_DIR | Out-Null
Invoke-WebRequest -Uri $URL -OutFile $DEST

Write-Host "Installed: $DEST"
Write-Host "Version:   $(& $DEST --version)"

# PATH hint
$userPath = [Environment]::GetEnvironmentVariable("PATH", "User")
$paths = $userPath -split ";"
if ($INSTALL_DIR -notin $paths) {
    Write-Host ""
    Write-Host "Add to PATH by running:"
    Write-Host "  [Environment]::SetEnvironmentVariable('PATH', `$env:PATH + ';$INSTALL_DIR', 'User')"
    Write-Host "Then restart your terminal."
} else {
    Write-Host "Run: arrhes --help"
}
