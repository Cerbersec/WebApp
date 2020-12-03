echo off

:: --------------------------------------------------
:: clear console
cls

:: --------------------------------------------------
:: Define variables

set SERVERNAME=LAPTOP-AM7IJI0V\SQLEXPRESS
set DATABASENAME=Brantano_Database

set MyTime=%TIME: =0%
set MyDate=%DATE:~-4%.%DATE:~7,2%.%DATE:~4,2%.%MyTime:~0,2%.%MyTime:~3,2%.%MyTime:~6,2%
set FileName=%DATABASENAME%_%MyDate%.bak 

set BAK_PATH=C:\Program Files\Microsoft SQL Server\MSSQL14.SQLEXPRESS\MSSQL\Backup\

set DEST_FILE=%BAK_PATH%%FileName%


:: --------------------------------------------------
:: BACKUP Database
:: NOTE: If error "access is denied" appear - go to service properties - log on. 
sqlcmd -E -S %SERVERNAME% -d master -Q "BACKUP DATABASE [%DATABASENAME%] TO DISK = N'%DEST_FILE%' WITH INIT , NOUNLOAD , NAME = N'%DATABASENAME% backup', NOSKIP , STATS = 10, NOFORMAT"


:: --------------------------------------------------
:: Deleting oldest file
forfiles /p "C:\Program Files\Microsoft SQL Server\MSSQL14.SQLEXPRESS\MSSQL\Backup" /s /m *.* /D -1 /C "cmd /c del @path"


 
