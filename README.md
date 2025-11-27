# 🌱 Activateur de Compost – Tableau de Bord (Projet STI2D)

Projet mené dans le cadre du **BAC STI2D – Spécialité SIN / ITEC**.  
L’objectif est de concevoir un **système permettant de faciliter l’utilisation d’un composteur**, d’en améliorer le suivi et d’aider l’utilisateur à obtenir un compost de meilleure qualité.

Ce document contient **la partie SIN du projet** :  
- Interface web  
- Affichage des données capteurs  
- Gestion des alertes  
- Historique local  
- Préparation à la connexion avec un microcontrôleur (ESP32)

---

# 📌 1. Objectif du Projet

Une famille souhaite utiliser son composteur avec plus d’aisance, réduire ses efforts musculaires et être assistée dans l’identification des bonnes conditions d’utilisation (température, humidité, pH…), afin d’obtenir un compost de meilleure qualité.

La partie SIN vise à fournir :
- une page web claire permettant d’afficher les données du compost  
- un système d’alertes automatiques basé sur des seuils définis  
- un suivi de l’autonomie (batterie)  
- un historique des dernières mesures  
- une architecture prête à l’intégration avec un ESP32  

---

# 🖥️ 2. Fonctionnalités de l’Interface Web

### ✔ Surveillance en temps réel :
- Température  
- Humidité  
- pH  
- Niveau de batterie  

### ✔ Gestion des alertes (visuelles)  
### ✔ Historique des 10 dernières mesures  
### ✔ Mise à jour automatique (toutes les 5 secondes)  
### ✔ Design moderne (HTML / CSS / JS)

---

# 📁 3. Structure du Projet

### - index.html # Interface utilisateur
### - style.css # Design
### - script.js # Logique & alertes
