Write-Host "🔧 Export de la base de données PostgreSQL..." -ForegroundColor Yellow

# Configuration
$pgDumpPath = "C:\Program Files\PostgreSQL\17\bin\pg_dump.exe"
$host = "localhost"
$username = "postgres"
$database = "newyorkcafe"
$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm"
$backupFile = "backup_complete_$timestamp.sql"

Write-Host "📝 Paramètres:" -ForegroundColor Cyan
Write-Host "   Host: $host"
Write-Host "   Database: $database"
Write-Host "   User: $username"
Write-Host "   Fichier: $backupFile"

# Demander le mot de passe
$password = Read-Host "🔑 Entrez le mot de passe PostgreSQL" -AsSecureString
$env:PGPASSWORD = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($password))

try {
    Write-Host "🚀 Démarrage de l'export..." -ForegroundColor Green
    
    & $pgDumpPath -h $host -U $username -d $database > $backupFile
    
    if ($LASTEXITCODE -eq 0) {
        $fileSize = (Get-Item $backupFile).Length / 1KB
        Write-Host "✅ Export terminé avec succès!" -ForegroundColor Green
        Write-Host "📄 Fichier: $backupFile ($([math]::Round($fileSize, 2)) KB)" -ForegroundColor Green
        Write-Host ""
        Write-Host "💡 Pour restaurer:" -ForegroundColor Cyan
        Write-Host "   psql -h localhost -U postgres -d newyorkcafe < $backupFile" -ForegroundColor White
    } else {
        Write-Host "❌ Erreur lors de l'export" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Erreur: $($_.Exception.Message)" -ForegroundColor Red
} finally {
    # Nettoyer la variable mot de passe
    $env:PGPASSWORD = $null
}

Write-Host ""
Write-Host "🔄 Appuyez sur une touche pour continuer..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") 