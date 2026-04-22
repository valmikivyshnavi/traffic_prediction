// Navigation
document.getElementById("homeLink").onclick = () => showSection("homeSection");
document.getElementById("loginLink").onclick = () => showSection("loginSection");
document.getElementById("registerLink").onclick = () => showSection("registerSection");

function showSection(sectionId) {
  document.querySelectorAll(".container").forEach(sec => sec.classList.add("hidden"));
  document.getElementById(sectionId).classList.remove("hidden");
}

// Prediction Form
document.getElementById("predictForm").onsubmit = async function(e) {
  e.preventDefault();

  try {
    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        hour: document.getElementById("hour").value,
        day: document.getElementById("day").value,
        vehicle_count: document.getElementById("vehicle_count").value
      })
    });

    const data = await response.json();

    const resultElement = document.getElementById("result");
    if (data.prediction[0] === 1) {
      resultElement.innerText = "Low Congestion 🚦";
      resultElement.style.color = "green";
    } else {
      resultElement.innerText = "High Congestion 🚨";
      resultElement.style.color = "red";
    }

    // Update chart
    updateChart(data.prediction[0]);
  } catch (error) {
    const resultElement = document.getElementById("result");
    resultElement.innerText = "Error: Could not connect to backend.";
    resultElement.style.color = "orange";
  }
};

// Chart.js
let chart;
function updateChart(prediction) {
  const ctx = document.getElementById("trafficChart").getContext("2d");
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Prediction"],
      datasets: [{
        label: "Congestion Level",
        data: [prediction],
        backgroundColor: prediction === 1 ? "green" : "red"
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true, max: 2 }
      }
    }
  });
}
