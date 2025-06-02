# Script pour corriger les données de vins
Write-Host "🔧 Correction des données de vins..." -ForegroundColor Yellow

# Correction 1: Champagne Veuve Clicquot
Write-Host "📝 Correction de Champagne Veuve Clicquot" -ForegroundColor Cyan
try {
    $body = @{
        type_vin = "CHAMPAGNE"
        origine_vin = "France"
    } | ConvertTo-Json
    
    $response = Invoke-RestMethod -Uri "http://localhost:4000/api/vins/Champagne%20Veuve%20Clicquot" -Method PUT -ContentType "application/json" -Body $body
    Write-Host "✅ Champagne Veuve Clicquot corrigé" -ForegroundColor Green
} catch {
    Write-Host "❌ Erreur: $($_.Exception.Message)" -ForegroundColor Red
}

# Correction 2: Chablis
Write-Host "📝 Correction de Chablis" -ForegroundColor Cyan
try {
    $body = @{
        type_vin = "VINS BLANC"
        origine_vin = "France"
    } | ConvertTo-Json
    
    $response = Invoke-RestMethod -Uri "http://localhost:4000/api/vins/Chablis" -Method PUT -ContentType "application/json" -Body $body
    Write-Host "✅ Chablis corrigé" -ForegroundColor Green
} catch {
    Write-Host "❌ Erreur: $($_.Exception.Message)" -ForegroundColor Red
}

# Correction 3: Sancerre
Write-Host "📝 Correction de Sancerre" -ForegroundColor Cyan
try {
    $body = @{
        type_vin = "VINS BLANC"
        origine_vin = "France"
    } | ConvertTo-Json
    
    $response = Invoke-RestMethod -Uri "http://localhost:4000/api/vins/Sancerre" -Method PUT -ContentType "application/json" -Body $body
    Write-Host "✅ Sancerre corrigé" -ForegroundColor Green
} catch {
    Write-Host "❌ Erreur: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "🎉 Corrections terminées !" -ForegroundColor Green 