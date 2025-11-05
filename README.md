# 🚀 Projet d’Intégration – Zedni

## 📖 Description
Ce projet est une application **full-stack** composée de :
- Un **frontend Angular** (interface utilisateur)
- Un **backend Spring Boot** (API REST)
- Une configuration **Docker Compose** pour exécuter les deux services ensemble

---

## 🧱 Structure du projet

zedni-projet-integration/
│
├── backend/ # Application Spring Boot
│ ├── src/
│ ├── pom.xml
│ ├── Dockerfile
│ └── .dockerignore
│
├── frontend/ # Application Angular
│ ├── src/
│ ├── package.json
│ ├── package-lock.json
│ ├── Dockerfile
│ └── .dockerignore
│
├── docker-compose.yml # Définit les services backend + frontend
└── README.md # Documentation du projet

 

##  Commandes utilisées 

###  Lancer le frontend (Angular)
 
cd frontend
ng serve
Accessible sur : http://localhost:4200

###  Lancer le backend (Spring Boot)
 
cd backend
mvn spring-boot:run
Accessible sur : http://localhost:9091