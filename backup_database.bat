@echo off
echo 🔧 Export complet de la base de données...

set PGPASSWORD=your_password
"C:\Program Files\PostgreSQL\17\bin\pg_dump.exe" -h localhost -U postgres -d newyorkcafe > "backup_complete_%date:~-4,4%-%date:~-10,2%-%date:~-7,2%_%time:~0,2%h%time:~3,2%m.sql"

echo ✅ Export terminé dans backup_complete_%date:~-4,4%-%date:~-10,2%-%date:~-7,2%_%time:~0,2%h%time:~3,2%m.sql
pause 