# Liedumfrage DevOps Projekt
Dieses Projekt stellt eine Website dar, mit welcher Liedumfragen für zukünftige Shows einer Band erstellt, bearbeitet, ausgefüllt und ausgewertet werden können.

## Verwendung
Das Erstellen der Umfragen findet über einen Button auf der Hauptseite statt.

Hier öffnet sich ein Fenster, in welchem der Umfrage ein Name, ein Datum und ein Status gegeben werden muss. Der Status kann hier entweder Offen, Geschlossen oder Entwurf sein.

Über eine weitere Schaltfläche können beliebige Songs hinzugefügt werden.

Offene Umfragen können auf der Hauptseite gesehen und über den Button "Abstimmen" ausgefüllt werden. Hier werden die Songs durch Verschieben der Labels angeordnet. Nachdem die Umfrage von mehreren Benutzern ausgefüllt wurde, kann sie geschlossen und ausgewertet werden. Die Auswertung der Songs geschieht mittels Microservice. 

Durch Aufteilung der Auswertung in einen Microservice können diverse Algorithmen zur Umfragenauswertung implementiert und nach belieben ausgetauscht werden werden.

## Aufbau
![Projektaufbau](/images/project_architecture.svg "Projektaufbau")

## CI/CD
Bei jedem Push oder gemergten Pull Request wird automatisch eine CI/CD Pipeline gestartet. Diese führt die folgenden Aktionen aus:
1. Jest Tests für Node.js Anwendungen ausführen (Backend und Survey Evaluation)
2. Container für Frontend, Backend und Survey Evaluation bauen und auf docker hub publishen
    - [Frontend](https://hub.docker.com/r/diddyholz/dhge-devops-frontend/tags)
    - [Backend](https://hub.docker.com/r/diddyholz/dhge-devops-backend/tags)
    - [Survey Evaluation](https://hub.docker.com/r/diddyholz/dhge-devops-surveyevaluation/tags)

## Ausführung
**Vorraussetzung:** Funktionierende Docker-Installation
1. Entweder gesamtes Repo, oder [docker-compose.yml](/docker-compose.yml) und [nginx.conf](/nginx.conf) clonen
2. Im Hauptverzeichnis der Repo `docker compose up -d` ausführen
3. Die Anwendung ist unter `localhost` verfügbar

**Hinweis:** Bei Änderungen an den Images muss vor Schritt 2 `docker compose pull` ausgeführt werden!
