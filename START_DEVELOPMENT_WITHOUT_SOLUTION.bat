cd %~dp0
cd KasKamSkolingas.Server
start cmd /k "dotnet run"
cd ..
cd KasKamSkolingas.Client
start cmd /k "npm run watch"