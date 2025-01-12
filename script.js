// Function to force HTTPS and handle URL input
function fixURL(url) {
  // Add HTTPS if missing
  if (!/^https?:\/\//i.test(url)) {
    return 'https://' + url;
  }
  return url;
}

// Function to check WebAssembly support
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
      const text = await response.text();
      return text; // Return the fetched content
    } else {
      throw new Error("Network error: Unable to load content");
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

// Service Worker registration (for modern features like caching if available)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
      console.log('Service Worker registered with scope:', registration.scope);
    }).catch(function(error) {
      console.log('Service Worker registration failed:', error);
    });
  });
}

// Function to handle iframe load errors
function handleIframeError() {
  document.getElementById("errorMessage").innerText = "There was an error loading the page. Please try another website.";
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
  iframe.onerror = handleIframeError;

  // Handle successful iframe load
  iframe.onload = function() {
    document.getElementById("errorMessage").innerText = "";
  };

  // Check WebAssembly support and log if it's available
  if (checkWebAssembly()) {
    console.log("WebAssembly is supported on this device!");
  } else {
    console.log("WebAssembly is not supported on this device.");
  }

  // Attempt a network fetch as a fallback for the site loading (not required but can be added for extra functionality)
  fetchWithFallback(url)
    .then(content => {
      if (!content) {
        document.getElementById("errorMessage").innerText = "This site is not compatible with your device.";
      }
    });
});
