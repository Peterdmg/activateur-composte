// Seuils du compost
const LIMITS = {
  tempMax: 65,
  tempMin: 30,
  humMin: 40,
  humMax: 70,
  phMin: 6,
  phMax: 8,
  batLow: 20
};

// Adresse IP l'ESP32 (à adapter avec l'IP affichée dans le moniteur série)
const ESP32_URL = "http://192.168.1.42/data";

//  Lecture des données RÉELLES depuis l'ESP32
function getDataFromSystem() {
  return fetch(ESP32_URL).then((res) => {
    if (!res.ok) {
      throw new Error("HTTP " + res.status);
    }
    return res.json();
  });
}

//  Mise à jour de l'interface
function updateUI(data) {
  document.getElementById("tempValue").textContent =
    data.temperature.toFixed(1) + " °C";
  document.getElementById("humValue").textContent =
    data.humidity.toFixed(1) + " %";
  document.getElementById("phValue").textContent = data.ph.toFixed(1);
  document.getElementById("batValue").textContent =
    data.battery.toFixed(0) + " %";

  const alerts = [];

  // Température
  const tempStatus = document.getElementById("tempStatus");
  if (data.temperature > LIMITS.tempMax) {
    tempStatus.textContent = "⚠️ Surchauffe";
    tempStatus.style.color = "#b91c1c";
    alerts.push("Température trop élevée !");
  } else if (data.temperature < LIMITS.tempMin) {
    tempStatus.textContent = "ℹ️ Température trop basse";
    tempStatus.style.color = "#92400e";
  } else {
    tempStatus.textContent = "✔ OK";
    tempStatus.style.color = "#15803d";
  }

  // Humidité
  const humStatus = document.getElementById("humStatus");
  if (data.humidity < LIMITS.humMin) {
    humStatus.textContent = "⚠️ Compost trop sec";
    humStatus.style.color = "#b91c1c";
    alerts.push("Humidité trop faible !");
  } else if (data.humidity > LIMITS.humMax) {
    humStatus.textContent = "⚠️ Compost trop humide";
    humStatus.style.color = "#b91c1c";
    alerts.push("Humidité trop élevée !");
  } else {
    humStatus.textContent = "✔ OK";
    humStatus.style.color = "#15803d";
  }

  // pH
  const phStatus = document.getElementById("phStatus");
  if (data.ph < LIMITS.phMin || data.ph > LIMITS.phMax) {
    phStatus.textContent = "⚠️ Hors zone idéale";
    phStatus.style.color = "#b91c1c";
    alerts.push("pH non optimal !");
  } else {
    phStatus.textContent = "✔ OK";
    phStatus.style.color = "#15803d";
  }

  // Batterie
  const batteryLevel = document.getElementById("batteryLevel");
  const batStatus = document.getElementById("batStatus");
  const bat = Math.max(0, Math.min(100, data.battery));

  batteryLevel.style.width = bat + "%";

  if (bat < LIMITS.batLow) {
    batStatus.textContent = "⚠️ Batterie faible";
    batStatus.style.color = "#b91c1c";
    alerts.push("Batterie faible, penser à recharger le système.");
  } else {
    batStatus.textContent = "✔ OK";
    batStatus.style.color = "#15803d";
  }

  // Trappe
  const doorValue = document.getElementById("doorValue");
  const doorIndicator = document.getElementById("doorIndicator");

  if (data.doorClosed) {
    doorValue.textContent = "Fermée";
    doorIndicator.className = "door-indicator closed";
  } else {
    doorValue.textContent = "Ouverte";
    doorIndicator.className = "door-indicator open";
    alerts.push("La trappe du composteur est ouverte !");
  }

  // Alertes
  const alertsList = document.getElementById("alertsList");
  alertsList.innerHTML = "";

  if (alerts.length === 0) {
    alertsList.innerHTML = "<li>Aucune alerte pour le moment.</li>";
  } else {
    alerts.forEach((msg) => {
      const li = document.createElement("li");
      li.textContent = msg;
      alertsList.appendChild(li);
    });
  }

  // Heure de mise à jour
  document.getElementById("lastUpdate").textContent =
    new Date().toLocaleTimeString("fr-FR");
}

//  Boucle de rafraîchissement
function refresh() {
  getDataFromSystem()
    .then(updateUI)
    .catch((err) => {
      console.error("Erreur de connexion à l'ESP32 :", err);
      const alertsList = document.getElementById("alertsList");
      alertsList.innerHTML =
        "<li>Erreur : impossible de contacter le système (ESP32 hors ligne).</li>";
    });
}

// Rafraîchissement d'infos toutes les 15s
refresh();
setInterval(refresh, 15000);
