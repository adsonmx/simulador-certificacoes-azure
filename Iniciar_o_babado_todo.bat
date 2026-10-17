@echo off
title Simulador Azure - Inicializador Rapido
cls
echo ===================================================
echo     INICIALIZADOR DO SIMULADOR AZURE
echo     Desenvolvedor: Adson Carneiro
echo     LinkedIn: https://www.linkedin.com/in/adson-carneiro-ba08141b3/
echo ===================================================
echo.

cd /d "%~dp0"

echo [1/3] Verificando dependencias instaladas...
if not exist "node_modules\" (
    echo Instalando pacotes com npm...
    call npm install
) else (
    echo Dependencias ja estao presentes!
)

echo.
echo [2/3] Executando testes automatizados de qualidade...
call npm test

echo.
echo [3/3] Iniciando o servidor de desenvolvimento Vite...
echo.
echo O simulador ficara disponivel em: http://localhost:5173/
echo Para fechar a aplicacao, pressione Ctrl + C nesta janela.
echo.

call npm run dev
pause