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

// Simulation des données (pour tester)
// 👉 Tu remplaceras plus tard par fetch("http://ESP32/data")
function getDataFromSystem() {
  return Promise.resolve({
    temperature: 55 + Math.random() * 20,
    humidity: 30 + Math.random() * 50,
    ph: 5.5 + Math.random() * 3,
    battery: 10 + Math.random() * 80
  });
}

function updateUI(data) {
  document.getElementById("tempValue").textContent = data.temperature.toFixed(1) + " °C";
  document.getElementById("humValue").textContent = data.humidity.toFixed(1) + " %";
  document.getElementById("phValue").textContent = data.ph.toFixed(1);
  document.getElementById("batValue").textContent = data.battery.toFixed(0) + " %";

  const alertsList = document.getElementById("alertsList");
  alertsList.innerHTML = "";

  const alerts = [];

  // Temp
  const tempStatus = document.getElementById("tempStatus");
  if (data.temperature > LIMITS.tempMax) {
    tempStatus.textContent = "⚠️ Surchauffe";
    tempStatus.style.color = "#b91c1c";
    alerts.push("Température trop élevée !");
  } else if (data.temperature < LIMITS.tempMin) {
    tempStatus.textContent = "ℹ️ Trop froid";
    tempStatus.style.color = "#92400e";
  } else {
    tempStatus.textContent = "✔ OK";
    tempStatus.style.color = "#15803d";
  }

  // Humidité
  const humStatus = document.getElementById("humStatus");
  if (data.humidity < LIMITS.humMin) {
    humStatus.textContent = "⚠️ Trop sec";
    humStatus.style.color = "#b91c1c";
    alerts.push("Humidité trop faible !");
  } else if (data.humidity > LIMITS.humMax) {
    humStatus.textContent = "⚠️ Trop humide";
    humStatus.style.color = "#b91c1c";
    alerts.push("Humidité trop élevée !");
  } else {
    humStatus.textContent = "✔ OK";
    humStatus.style.color = "#15803d";
  }

  // pH
  const phStatus = document.getElementById("phStatus");
  if (data.ph < LIMITS.phMin || data.ph > LIMITS.phMax) {
    phStatus.textContent = "⚠️ Hors zone";
    phStatus.style.color = "#b91c1c";
    alerts.push("pH non optimal !");
  } else {
    phStatus.textContent = "✔ OK";
    phStatus.style.color = "#15803d";
  }

  // Batterie
  document.getElementById("batteryLevel").style.width = data.battery + "%";
  const batStatus = document.getElementById("batStatus");
  if (data.battery < LIMITS.batLow) {
    batStatus.textContent = "⚠️ Batterie faible";
    batStatus.style.color = "#b91c1c";
    alerts.push("Batterie faible !");
  } else {
    batStatus.textContent = "✔ OK";
    batStatus.style.color = "#15803d";
  }

  // Affichage des alertes
  if (alerts.length === 0) {
    alertsList.innerHTML = "<li>Aucune alerte</li>";
  } else {
    alerts.forEach(a => {
      const li = document.createElement("li");
      li.textContent = a;
      alertsList.appendChild(li);
    });
  }

  // Mise à jour de l'heure
  document.getElementById("lastUpdate").textContent =
    new Date().toLocaleTimeString("fr-FR");
}

// Mise à jour toutes les 5 secondes
function refresh() {
  getDataFromSystem().then(updateUI);
}
refresh();
setInterval(refresh, 5000);
