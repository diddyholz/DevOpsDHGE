# Liedumfrage DevOps Projekt
## Informationen
Dieses Projekt stellt eine Website dar, mit welcher Umfragen erstellt, bearbeitet, ausgefüllt und ausgewertet werden können.
Das Erstellen der Umfragen findet über einen Button auf der Hauptseite statt.
Hier öffnet sich ein Fenster, in welchem der Umfrage ein Name, ein Datum und ein Status gegeben werden muss. Der Status kann hier entweder Offen, Geschlossen oder Entwurf sein.
Es können weiterhin Songtitel eingegeben werden, welche dann in der Abstimmung nach präferenz geordnet werden können.
Das Ordnen der Lieder geschieht indem die Umfrage ausgefüllt wird. Offene Umfragen können auf der Hauptseite gesehen und über den Button "Abstimmen" ausgefüllt werden. Hier werden die Songs durch Verschieben der Labels angeordnet. Nachdem die Umfrage von mehreren Benutzern ausgefüllt wurde, kann sie geschlossen und ausgewertet werden. Die Auswertung der Songs geschieht in einem Microservice. Es wird einer Rangfolge der beliebtesten Lieder ausgegeben.
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
