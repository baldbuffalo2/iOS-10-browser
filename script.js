document.getElementById("loadBtn").addEventListener("click", function() {
  let url = document.getElementById("urlInput").value.trim(); // Change const to let
  const iframe = document.getElementById("browserFrame");

  // Add 'http://' if the URL doesn't include a scheme
  if (!/^https?:\/\//i.test(url)) {
    url = 'http://' + url; // Now you can reassign the value of url
  }

  // Validate the URL
  try {
    new URL(url); // This will throw an error if the URL is invalid
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
