// Function to force HTTPS and handle URL input
function fixURL(url) {
  // Add HTTPS if missing
  if (!/^https?:\/\//i.test(url)) {
    return 'https://' + url;
  }
  return url;
}

// Function to check for WebGL support
function checkWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return !!window.WebGLRenderingContext && canvas.getContext('webgl');
  } catch (e) {
    return false;
  }
}

// Function to check for WebAssembly support
function checkWebAssembly() {
  try {
    return typeof WebAssembly === "object" && typeof WebAssembly.instantiate === "function";
  } catch (e) {
    return false;
  }
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

  // Check WebGL and WebAssembly support
  if (!checkWebGL()) {
    alert('WebGL is not supported on your device!');
  }

  if (!checkWebAssembly()) {
    alert('WebAssembly is not supported on your device!');
  }

  // Try loading the URL into the iframe
  iframe.src = url;

  // Check if the iframe content is empty, which may indicate a load error
  iframe.onload = function() {
    if (iframe.contentWindow.document.body.innerHTML === "") {
      document.getElementById("errorMessage").innerText = "This site may not be supported on your device. Please try another website.";
    } else {
      document.getElementById("errorMessage").innerText = "";
    }
  };
});
