// Function to force HTTPS and handle URL input
function fixURL(url) {
  // Add HTTPS if missing
  if (!/^https?:\/\//i.test(url)) {
    return 'https://' + url;
  }
  return url;
}

// Add event listener for the Load button
document.getElementById("loadBtn").addEventListener("click", function() {
  let url = document.getElementById("urlInput").value.trim();
  if (url === "") {
    alert("Please enter a URL!");
    return;
  }

  // Fix the URL to use HTTPS if it's not already
  url = fixURL(url);

  // Show a loading message
  const iframe = document.getElementById("browserFrame");
  document.getElementById("errorMessage").innerText = "Loading...";

  // Try loading the URL into the iframe
  iframe.src = url;

  // Handle iframe load error
  iframe.onerror = function() {
    document.getElementById("errorMessage").innerText = "There was an error loading the page. Please try another website.";
  };

  // Add onload event without accessing the iframe content directly
  iframe.onload = function() {
    document.getElementById("errorMessage").innerText = "";
  };
});
