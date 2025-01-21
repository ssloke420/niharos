  function updateDateTime() {
    const timeElement = document.getElementById('time');
    const now = new Date();

    // Format the time
    const timeOptions = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    };
    const time = now.toLocaleTimeString('en-US', timeOptions);

    // Format the date
    const dateOptions = {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    };
    let date = now.toLocaleDateString('en-US', dateOptions);
    date = date.replace(',', ''); // Remove the comma

    timeElement.innerHTML = `${date} &nbsp; &nbsp; ${time}`;
}
// Update the time every second
    setInterval(updateDateTime, 1000);

// Initial call to set the time immediately on page load
    updateDateTime();
//nihar trivedi
navigator.getBattery().then(function(battery) {
    function updateBatteryStatus() {
      const batteryLevel = Math.floor(battery.level * 100);
      document.getElementById('battery-fill').style.width = batteryLevel + '%';
      document.getElementById('battery-level').textContent = batteryLevel + '%';
      
      // Change color based on level
      const fillColor = batteryLevel > 20 ? '#0f0' : '#f00';
      document.getElementById('battery-fill').style.background = fillColor;
    }
  
    // Initial update
    updateBatteryStatus();
  
    // Update when the battery level or charging status changes
    battery.addEventListener('levelchange', updateBatteryStatus);
    battery.addEventListener('chargingchange', updateBatteryStatus);
  });
document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("start-button");
  const startMenu = document.getElementById("start-menu");
  const appContainer = document.getElementById("app-container");
  const taskbarApps = document.getElementById("taskbar-apps");

  // Toggle Start Menu
  startButton.addEventListener("click", () => {
    startMenu.style.display = startMenu.style.display === "block" ? "none" : "block";
  });

  // Open App from Start Menu
  startMenu.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      const appId = e.target.dataset.app;
      openApp(appId);
      startMenu.style.display = "none"; // Close the start menu
    }
  });

  // Function to Open Apps
  function openApp(appId) {
    if (document.getElementById(appId)) return; // App already open

    // Create App Window
    const appWindow = document.createElement("div");
    appWindow.id = appId;
    appWindow.classList.add("app-window");
    appWindow.innerHTML = `
      <div class="app-header">
        <span>${capitalize(appId)}</span>
        <button class="close-btn">X</button>
      </div>
      <div class="app-content">${getAppContent(appId)}</div>
    `;
    appContainer.appendChild(appWindow);

    // Add to Taskbar
    const taskbarIcon = document.createElement("div");
    taskbarIcon.classList.add("taskbar-icon");
    taskbarIcon.dataset.app = appId;
    taskbarIcon.innerText = appId[0].toUpperCase(); // App icon
    taskbarApps.appendChild(taskbarIcon);

    // Close App Logic
    appWindow.querySelector(".close-btn").addEventListener("click", () => {
      appContainer.removeChild(appWindow);
      taskbarApps.removeChild(taskbarIcon);
    });

    // Focus App on Taskbar Icon Click
    taskbarIcon.addEventListener("click", () => {
      appWindow.style.zIndex = 1000; // Bring to front
    });
  }

  // Get Content for Apps
  function getAppContent(appId) {
    switch (appId) {
      case "file-explorer":
        return "<p>File Explorer content goes here.</p>";
      case "calculator":
        return `<input type="text" id="calc-display" readonly>
                <div id="calc-buttons">
                  ${[...Array(10).keys()].map((n) => `<button>${n}</button>`).join("")}
                </div>`;
      case "text-editor":
        return `<textarea placeholder="Type here..."></textarea>`;
      default:
        return "<p>App not implemented yet.</p>";
    }
  }

  // Helper: Capitalize App Names
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).replace("-", " ");
  }
});
