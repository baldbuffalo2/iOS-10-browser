document.getElementById("loadBtn").addEventListener("click", function() {
  const url = document.getElementById("urlInput").value;
  const iframe = document.getElementById("browserFrame");

  if (url) {
    iframe.src = url;
  } else {
    alert("Please enter a valid URL.");
  }
});
