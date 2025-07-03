const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('solarCanvas') });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const pointLight = new THREE.PointLight(0xffffff, 1.2, 0);
scene.add(pointLight);

// Sun
const sunGeometry = new THREE.SphereGeometry(4, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Planets configuration
const planets = [
  { name: "Mercury", color: 0xaaaaaa, size: 0.3, distance: 6, speed: 0.04 },
  { name: "Venus", color: 0xffcc66, size: 0.5, distance: 8, speed: 0.015 },
  { name: "Earth", color: 0x0033cc, size: 0.6, distance: 10, speed: 0.01 },
  { name: "Mars", color: 0xff3300, size: 0.4, distance: 12, speed: 0.008 },
  { name: "Jupiter", color: 0xff9966, size: 1.2, distance: 16, speed: 0.002 },
  { name: "Saturn", color: 0xffff99, size: 1.0, distance: 20, speed: 0.001 },
  { name: "Uranus", color: 0x66ffff, size: 0.8, distance: 24, speed: 0.0008 },
  { name: "Neptune", color: 0x6666ff, size: 0.7, distance: 28, speed: 0.0005 },
];

const planetMeshes = [];
const planetAngles = [];

planets.forEach((planet, index) => {
  const geometry = new THREE.SphereGeometry(planet.size, 32, 32);
  const material = new THREE.MeshStandardMaterial({ color: planet.color });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  planetMeshes.push({ mesh, distance: planet.distance, speed: planet.speed, name: planet.name });
  planetAngles.push(0);

  // Add UI Slider
  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = 0.0001;
  slider.max = 0.1;
  slider.step = 0.0001;
  slider.value = planet.speed;
  slider.id = planet.name;
  slider.oninput = (e) => {
    planetMeshes[index].speed = parseFloat(e.target.value);
  };

  const label = document.createElement('label');
  label.innerHTML = `${planet.name}<br/>`;
  label.appendChild(slider);
  document.getElementById('controls').appendChild(label);
});

// Camera Position
camera.position.z = 40;

// Animation
function animate() {
  requestAnimationFrame(animate);

  planetMeshes.forEach((p, i) => {
    planetAngles[i] += p.speed;
    const x = Math.cos(planetAngles[i]) * p.distance;
    const z = Math.sin(planetAngles[i]) * p.distance;
    p.mesh.position.set(x, 0, z);
  });

  renderer.render(scene, camera);
}
animate();
