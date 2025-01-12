document.getElementById("loadBtn").addEventListener("click", function() {
  let url = document.getElementById("urlInput").value.trim(); // Use let here
  const iframe = document.getElementById("browserFrame");

  // Add 'http://' if the URL doesn't include a scheme
  if (!/^https?:\/\//i.test(url)) {
    url = 'http://' + url; // This is fine, since it's let
  }

  // Validate the URL
  try {
    new URL(url); // Validate the URL
    iframe.src = url;
  } catch (e) {
    showAlert("Please enter a valid URL.");
  }
});

function showAlert(message) {
  const alertBox = document.getElementById("alertBox");
  const alertMessage = document.getElementById("alertMessage");
  alertMessage.textContent = message;
  alertBox.style.display = 'block';
}

function closeAlert() {
  const alertBox = document.getElementById("alertBox");
  alertBox.style.display = 'none';
}
