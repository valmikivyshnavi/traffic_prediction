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
  } catch (error) {
    document.getElementById("result").innerText = "Error: Could not connect to backend.";
    document.getElementById("result").style.color = "orange";
  }
};
