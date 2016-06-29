cd %~dp0
cd KasKamSkolingas.Server
KasKamSkolingas.Server.sln
start cmd /k "dotnet run"
cd ..
cd KasKamSkolingas.Client
start cmd /k "npm run watch"