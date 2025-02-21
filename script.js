// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Load car model
const loader = new THREE.GLTFLoader();
let car;
loader.load('https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/SportCar/glTF/SportCar.gltf', function (gltf) {
    car = gltf.scene;
    car.scale.set(2, 2, 2);
    car.position.set(0, -1, 0);
    scene.add(car);
    
    // Hide loading text
    document.getElementById("loading").style.display = "none";
}, undefined, function (error) {
    console.error(error);
});

// Road
const roadGeometry = new THREE.PlaneGeometry(10, 50);
const roadMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 });
const road = new THREE.Mesh(roadGeometry, roadMaterial);
road.rotation.x = -Math.PI / 2;
road.position.y = -1.1;
scene.add(road);

// Camera position
camera.position.set(2, 1, 5);
camera.lookAt(0, 0, 0);

// Background motion effect
const bgCanvas = document.getElementById("bgCanvas");
const bgCtx = bgCanvas.getContext("2d");
bgCanvas.width = window.innerWidth;
bgCanvas.height = window.innerHeight;

// Animated background
function animateBackground() {
    bgCtx.fillStyle = "rgba(255, 255, 255, 0.05)";
    bgCtx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);

    requestAnimationFrame(animateBackground);
}
animateBackground();

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Move road to simulate driving
    road.position.z += 0.2;
    if (road.position.z > 5) {
        road.position.z = -5;
    }

    // Rotate wheels if car is loaded
    if (car) {
        car.children.forEach(part => {
            if (part.name.includes("Wheel")) {
                part.rotation.x += 0.1;
            }
        });
    }
    
    renderer.render(scene, camera);
}
animate();

// Resize handler
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
