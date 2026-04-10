# PowerShell script to force push local project to GitHub, overwriting remote main branch
# WARNING: This will replace the remote repository with your local files!

$repo = "https://github.com/rotan0/tic-tac-toe.git"

Set-Location -Path "$PSScriptRoot"

# === BACKUP CURRENT DIRECTORY ===
$backupDir = Join-Path $PSScriptRoot ("backup_" + (Get-Date -Format 'yyyyMMdd_HHmmss'))
Write-Host "Backing up current directory to: $backupDir"
Copy-Item -Path $PSScriptRoot -Destination $backupDir -Recurse -Force
Write-Host "Backup complete."

git fetch origin

git reset --hard origin/main

git add .

git commit -m "Full project sync: overwrite remote with local" --allow-empty

git push -f origin main

Write-Host "Force push complete. Remote repository is now identical to your local project."