# Liedumfrage DevOps Projekt
## Informationen
- TODO
## Aufbau
- TODO
## CI/CD
Bei jedem Push oder gemergten Pull Request wird automatisch eine CI/CD Pipeline gestartet. Diese führt die folgenden Aktionen aus:
1. Jest Tests für Node.js Anwendungen ausführen (Backend und Survey Evaluation)
2. Container für Frontend, Backend und Survey Evaluation bauen und auf docker hub publishen
    - [Frontend](https://hub.docker.com/r/diddyholz/dhge-devops-surveyevaluation/tags)
    - [Backend](https://hub.docker.com/r/diddyholz/dhge-devops-backend/tags)
    - [Survey Evaluation](https://hub.docker.com/r/diddyholz/dhge-devops-surveyevaluation/tags)

## Ausführung
**Vorraussetzung:** Funktionierende Docker-Installation
1. Entweder gesamtes Repo, oder [docker-compose.yml](/docker-compose.yml) und [nginx.conf](/nginx.conf) clonen
2. Im Hauptverzeichnis der Repo `docker compose up -d` ausführen
3. Die Anwendung ist unter `localhost` verfügbar

**Hinweis:** Bei Änderungen an den Images muss vor Schritt 2 `docker compose pull` ausgeführt werden!