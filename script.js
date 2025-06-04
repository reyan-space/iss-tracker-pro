// Initialize the map and set its view
const map = L.map('map').setView([0, 0], 2);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add a marker at initial position
const marker = L.marker([0, 0]).addTo(map).bindPopup('ISS is here!').openPopup();

// Function to fetch ISS location and update marker
async function getISSLocation() {
  try {
    const response = await fetch('http://api.open-notify.org/iss-now.json');
    const data = await response.json();
    const { latitude, longitude } = data.iss_position;

    // Update marker position
    marker.setLatLng([latitude, longitude]);

    // Center the map on the new position
    map.setView([latitude, longitude], 2);

    // Update popup content
    marker.getPopup().setContent(ISS is here:<br>Lat: ${latitude}<br>Lon: ${longitude});
  } catch (error) {
    console.error('Error fetching ISS location:', error);
  }
}

// Call the function once initially
getISSLocation();

// Update the ISS location every 2 seconds
setInterval(getISSLocation, 2000);
