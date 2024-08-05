const container = document.getElementById("container");

function animateBar(elementId, duration) {
  return new Promise((resolve, reject) => {
    let start = null;
    const loadingBar = document.createElement("div");
    loadingBar.classList.add("loadingBar");
    loadingBar.id = elementId;
    loadingBar.style.height = "100%";
    loadingBar.style.backgroundColor = "blue";
    loadingBar.style.width = "0";
    container.appendChild(loadingBar);

    function animate(timestamp) {
      if (!start) {
        start = timestamp;
      }
      const elapsedTime = timestamp - start;
      const progress = Math.min((elapsedTime / duration) * 100, 100);
      loadingBar.style.width = progress + "%";
      if (elapsedTime < duration) {
        requestAnimationFrame(animate);
      } else {
        resolve();
      }
    }
    requestAnimationFrame(animate);
  });
}

async function animateBarsSequentially() {
  const barsConfig = [
    { id: "loadingBar1", duration: 3000 },
    { id: "loadingBar2", duration: 4000 },
    { id: "loadingBar3", duration: 5000 },
  ];

  for (const { id, duration } of barsConfig) {
    await animateBar(id, duration);
  }

  console.log("All animations complete");
}

// Start animating the bars sequentially
animateBarsSequentially().catch((error) =>
  console.error("Animation error:", error)
);
