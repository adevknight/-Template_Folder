@echo off
chdir
pause
cmd /c npm install grunt --save-dev
@echo GRUNT CREATION SUCCESS
pause
cmd /c npm install grunt-contrib-watch --save-dev
@echo GRUNT-CONTRIB-WATCH CREATION SUCCESS
pause
cmd /c npm install grunt-autoprefixer --save-dev
@echo GRUNT-AUTOPREFIXER CREATION SUCCESS
pause
cmd /c npm install grunt-contrib-cssmin --save-dev
@echo GRUNT-CONTRIB-CSSMIN CREATION SUCCESS
pause