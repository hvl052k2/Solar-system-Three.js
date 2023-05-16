// Khởi tạo
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0x333333);
const pointLight = new THREE.PointLight(0xFFFFFF, 2, 300);

scene.add(ambientLight);
scene.add(pointLight)

// Tạo background cho scene
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
  "assets/images/stars.jpg",
  "assets/images/stars.jpg",
  "assets/images/stars.jpg",
  "assets/images/stars.jpg",
  "assets/images/stars.jpg",
  "assets/images/stars.jpg"
]);

const loader = new THREE.TextureLoader();

// Tạo quỹ đạo quay
function createOrbit(radius) {
  const orbitPath = new THREE.EllipseCurve(0, 0, radius, radius, 0, 2 * Math.PI, false);
  const orbitPoints = orbitPath.getPoints(100);
  const orbitGeometry = new THREE.BufferGeometry().setFromPoints(orbitPoints);
  const orbitMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
  const orbitLine = new THREE.Line(orbitGeometry, orbitMaterial);
  orbitLine.rotation.x = Math.PI / 2
  return orbitLine;
}

const orbitArr = [28, 44, 62, 78, 100, 138, 176, 200, 216];
orbitArr.forEach(function (item) {
  scene.add(createOrbit(item));
});

// Tạo mặt trời
const sunGeo = new THREE.SphereGeometry(16, 32, 32);
const sunMat = new THREE.MeshBasicMaterial({ map: loader.load("assets/images/sun.jpg") });
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

// Hàm tạo các hành tinh
function createPlanet(size, texture, position) {
  const planetGeo = new THREE.SphereGeometry(size, 30, 30);
  const planetMat = new THREE.MeshStandardMaterial({ map: loader.load(texture) });
  const planet = new THREE.Mesh(planetGeo, planetMat);
  const obj = new THREE.Object3D();
  planet.position.x = position;
  obj.add(planet);
  scene.add(obj);
  return { obj, planet };
}

// Hàm tạo các hành tinh có vành đai
function createPlanetHasRing(radius, outerRadius, position, planetTexture, ringTexture) {
  const planetGeo = new THREE.SphereGeometry(radius, 30, 30);
  const planetMat = new THREE.MeshStandardMaterial({ map: loader.load(planetTexture) });
  const planet = new THREE.Mesh(planetGeo, planetMat);

  const ringGeo = new THREE.RingGeometry(radius, outerRadius, 32);
  const ringMat = new THREE.MeshStandardMaterial({
    map: loader.load(ringTexture),
    side: THREE.DoubleSide
  });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  const obj = new THREE.Object3D();
  ring.position.x = position;
  ring.rotation.x = -0.5 * Math.PI;
  planet.position.x = position;
  obj.add(planet, ring);
  scene.add(obj);
  return { obj, planet };
}

// Tạo sao Thủy
const mercury = createPlanet(3.2, "assets/images/mercury.jpg", 28);

// Tạo sao Kim
const venus = createPlanet(5.8, "assets/images/venus.jpg", 44);

// Tạo Trái Đất
const earth = createPlanet(6, "assets/images/earth.jpg", 62);

// Tạo mặt trăng
const moon = createPlanet(1.5, "assets/images/moon.jpg", 10);
earth.planet.add(moon.planet);

// Tạo sao Hỏa
const mars = createPlanet(4, "assets/images/mars.jpg", 78);

// Tạo sao Mộc
const jupiter = createPlanet(12, "assets/images/jupiter.jpg", 100);

// Tạo sao Thổ
const saturn = createPlanetHasRing(10, 20, 138, "assets/images/saturn.jpg", "assets/images/saturn ring.png")

// Tạo sao Thiên Vương
const uranus = createPlanetHasRing(7, 12, 176, "assets/images/uranus.jpg", "assets/images/uranus ring.png")

// Tạo sao Hải Vương
const neptune = createPlanet(7, "assets/images/neptune.jpg", 200)

// Tạo sao Diêm Vương
const pluto = createPlanet(2.8, "assets/images/pluto.jpg", 216);

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Đặt vị trí camera
const controls = new THREE.OrbitControls(camera, renderer.domElement);
camera.position.set(-90, 140, 140);
controls.update();

camera.lookAt(new THREE.Vector3(0, 0, 0))
renderer.render(scene, camera);

function animate() {
  // Tự quay quanh trục
  sun.rotateY(0.004);
  mercury.planet.rotateY(0.004);
  venus.planet.rotateY(0.002);
  earth.planet.rotateY(0.02);
  moon.planet.rotateY(0.02);
  mars.planet.rotateY(0.018);
  jupiter.planet.rotateY(0.04);
  saturn.planet.rotateY(0.038);
  uranus.planet.rotateY(0.03);
  neptune.planet.rotateY(0.032);
  pluto.planet.rotateY(0.008);

  // Quay quanh mặt trời
  mercury.obj.rotateY(0.01);
  venus.obj.rotateY(0.015);
  earth.obj.rotateY(0.01);
  moon.obj.rotateY(0.005);
  mars.obj.rotateY(0.008);
  jupiter.obj.rotateY(0.002);
  saturn.obj.rotateY(0.0009);
  uranus.obj.rotateY(0.0004);
  neptune.obj.rotateY(0.0001);
  pluto.obj.rotateY(0.00007);
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});