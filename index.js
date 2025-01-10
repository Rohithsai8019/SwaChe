document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.getElementById('menu-icon');
const navLinks = document.getElementById('nav-links');
  
    menuIcon.addEventListener('click', function() {
      navLinks.classList.toggle('active');
    });
  });

function setFontWeightToday() {
    const today = new Date().getDay(); 
    let todayIndex = today; 
  
    if (today === 0) {
      todayIndex = 6; 
    } else {
      todayIndex = today - 1; 
    }
  
    const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  
    for (let i = 0; i < days.length; i++) {
      document.getElementById(days[i]).style.fontWeight = "normal"; 
    }
  
    document.getElementById(days[todayIndex]).style.fontWeight = "bold"; 
}
window.onload = setFontWeightToday;





var map = L.map('map').setView([13.056159165590369, 77.66116667882062], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var marker = L.marker([13.056159165590369, 77.66116667882062]).addTo(map)
    .bindPopup('SwaChe Technologies')
    .openPopup();

var destinationMarker;

map.on('click', function(e) {
    if (destinationMarker) {
        map.removeLayer(destinationMarker);
    }

    destinationMarker = L.marker(e.latlng).addTo(map);

    if (control) {
        control.setWaypoints([
            L.latLng(13.056159165590369, 77.66116667882062),
            e.latlng
        ]);
    }
});

var control = L.Routing.control({
    waypoints: [],
    routeWhileDragging: false,
    show: false,
    createMarker: function() { return null; },
    position: 'topleft' 
}).addTo(map);

document.querySelector('.my-button').addEventListener('click', function() {
    control.show();
});

map.dragging.disable();

map.on('dblclick', function(e) {
    map.dragging.enable();
    map.panTo(e.latlng);
    setTimeout(function() {
        map.dragging.disable();
    }, 500);
});





const chatbotButton = document.querySelector('.chatbot-button');
const chatWindow = document.getElementById('chat-window');
const closeButton = document.querySelector('.close-button');
let isChatOpen = false;

chatbotButton.addEventListener('click', () => {
    if (isChatOpen) return;
    
    chatWindow.style.display = 'block';
    setTimeout(() => {
        chatWindow.classList.add('visible');
        isChatOpen = true;
    }, 10);
});

closeButton.addEventListener('click', () => {
    chatWindow.classList.remove('visible');
    setTimeout(() => {
        chatWindow.style.display = 'none';
        isChatOpen = false;
    }, 300);
});

document.addEventListener('click', (e) => {
    if (isChatOpen && 
        !chatWindow.contains(e.target) && 
        !chatbotButton.contains(e.target)) {
        closeButton.click();
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth <= 768 && isChatOpen) {
        chatWindow.style.width = '100%';
        chatWindow.style.height = '100%';
        chatWindow.style.borderRadius = '0';
    } else if (isChatOpen) {
        chatWindow.style.width = '350px';
        chatWindow.style.height = 'auto';
        chatWindow.style.borderRadius = '15px';
    }
});
