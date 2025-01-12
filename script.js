// Function to force HTTPS and handle URL input
function fixURL(url) {
  // Add HTTPS if missing
  if (!/^https?:\/\//i.test(url)) {
    return 'https://' + url;
  }
  return url;
}

// Function to check if the browser supports WebGL
function checkWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return !!window.WebGLRenderingContext && canvas.getContext('webgl');
  } catch (e) {
    return false;
  }
}

// Function to check if the browser supports WebAssembly
function checkWebAssembly() {
  try {
    return typeof WebAssembly === "object" && typeof WebAssembly.instantiate === "function";
  } catch (e) {
    return false;
  }
}

// Function to handle network requests with fetch
async function fetchWithFallback(url) {
  try {
    const response = await fetch(url, { method: 'GET' });
    if (response.ok) {
      return await response.text();
    } else {
      throw new Error("Network error: Unable to load content");
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
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
    console.log("WebGL is not supported on this device");
  }

  if (!checkWebAssembly()) {
    console.log("WebAssembly is not supported on this device");
  }

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

  // Attempt a network fetch as a fallback (for progressive loading)
  fetchWithFallback(url)
    .then(content => {
      if (!content) {
        document.getElementById("errorMessage").innerText = "This site is not compatible with your device.";
      }
    });
});
