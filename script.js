document.getElementById("loadBtn").addEventListener("click", function() {
  const url = document.getElementById("urlInput").value.trim();
  const iframe = document.getElementById("browserFrame");

  // Add 'http://' if the URL doesn't include a scheme
  if (!/^https?:\/\//i.test(url)) {
    url = 'http://' + url;
  }

  // Validate the URL
  try {
    new URL(url); // This will throw an error if the URL is invalid
    iframe.src = url;
  } catch (e) {
    alert("Please enter a valid URL.");
  }
});
