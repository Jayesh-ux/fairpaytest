# PowerShell Script to Copy Generated Images
Write-Host "Copying Generated Images..." -ForegroundColor Cyan

# Create directory
$targetDir = "public\images\generated"
New-Item -ItemType Directory -Force -Path $targetDir | Out-Null

# Source directory
$sourceDir = "C:\Users\hsing\.gemini\antigravity\brain\4da7bb40-8865-4965-be1b-57ec3836f0fb"

# Copy images
Copy-Item "$sourceDir\financial_consultation_hero_1768298489064.png" "$targetDir\financial-consultation-hero.png" -Force
Copy-Item "$sourceDir\debt_free_celebration_1768298515113.png" "$targetDir\debt-free-celebration.png" -Force
Copy-Item "$sourceDir\credit_card_relief_1768298536883.png" "$targetDir\credit-card-relief.png" -Force
Copy-Item "$sourceDir\personal_loan_settlement_1768298583795.png" "$targetDir\personal-loan-settlement.png" -Force
Copy-Item "$sourceDir\anti_harassment_protection_1768298601765.png" "$targetDir\anti-harassment-protection.png" -Force

Write-Host "Done! Images copied to $targetDir" -ForegroundColor Green
Get-ChildItem $targetDir
