# Arrhes CLI installer for Windows (Git Bash / WSL)
# Usage: irm https://arrhes.com/cli/install.ps1 | iex
$ErrorActionPreference = "Stop"

$REPO = "arrhes/application"
$INSTALL_DIR = if ($env:ARRHES_INSTALL_DIR) { $env:ARRHES_INSTALL_DIR } else { "$env:USERPROFILE\.local\bin" }
$DEST = "$INSTALL_DIR\arrhes"

$URL = "https://github.com/$REPO/releases/latest/download/arrhes.sh"

Write-Host "Downloading arrhes CLI..."
New-Item -ItemType Directory -Force -Path $INSTALL_DIR | Out-Null
Invoke-WebRequest -Uri $URL -OutFile $DEST

Write-Host "Installed: $DEST"
Write-Host ""
Write-Host "Note: arrhes requires Git Bash or WSL to run."
Write-Host "From Git Bash / WSL, run: arrhes --help"

# PATH hint
$userPath = [Environment]::GetEnvironmentVariable("PATH", "User")
$paths = $userPath -split ";"
if ($INSTALL_DIR -notin $paths) {
    Write-Host ""
    Write-Host "Add to PATH by running:"
    Write-Host "  [Environment]::SetEnvironmentVariable('PATH', `$env:PATH + ';$INSTALL_DIR', 'User')"
    Write-Host "Then restart your terminal."
}
