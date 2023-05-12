// Khởi tạo
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
  "assets/images/stars.jpg",
  "assets/images/stars.jpg",
  "assets/images/stars.jpg",
  "assets/images/stars.jpg",
  "assets/images/stars.jpg",
  "assets/images/stars.jpg"
]);

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

scene.add(createOrbit(28));
scene.add(createOrbit(44));
scene.add(createOrbit(62));
scene.add(createOrbit(78));
scene.add(createOrbit(100));
scene.add(createOrbit(138));
scene.add(createOrbit(176));
scene.add(createOrbit(200));
scene.add(createOrbit(216));

// Vật thể phải xoay mới texture được
const loader = new THREE.TextureLoader();

// Tạo mặt trời
const sunGeo = new THREE.SphereGeometry(16, 32, 32);
const sunMat = new THREE.MeshBasicMaterial({ map: loader.load("assets/images/sun.jpg") });
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

// Tạo sao Thủy
const mercuryGeo = new THREE.SphereGeometry(3.2, 30, 30);
const mercuryMat = new THREE.MeshStandardMaterial({ map: loader.load("assets/images/mercury.jpg") });
const mercury = new THREE.Mesh(mercuryGeo, mercuryMat);
const objMercury = new THREE.Object3D();
mercury.position.x = 28;
objMercury.add(mercury);
scene.add(objMercury);

// Tạo sao Kim
const venusGeo = new THREE.SphereGeometry(5.8, 30, 30);
const venusMat = new THREE.MeshStandardMaterial({ map: loader.load("assets/images/venus.jpg") });
const venus = new THREE.Mesh(venusGeo, venusMat);
const objVenus = new THREE.Object3D();
venus.position.x = 44;
objVenus.add(venus)
scene.add(objVenus);

// Tạo Trái Đất
const earthGeo = new THREE.SphereGeometry(6, 30, 30);
const earthMat = new THREE.MeshStandardMaterial({ map: loader.load("assets/images/earth.jpg") });
const earth = new THREE.Mesh(earthGeo, earthMat);
const objEarth = new THREE.Object3D();
earth.position.x = 62;
earth.add(createOrbit(10));
objEarth.add(earth);
scene.add(objEarth);

// Tạo mặt trăng
const moonGeo = new THREE.SphereGeometry(1.5, 30, 30);
const moonMat = new THREE.MeshStandardMaterial({ map: loader.load("assets/images/moon.jpg") });
const moon = new THREE.Mesh(moonGeo, moonMat);
moon.position.x = 10;
earth.add(moon)

// Tạo sao Hỏa
const marsGeo = new THREE.SphereGeometry(4, 30, 30);
const marsMat = new THREE.MeshStandardMaterial({ map: loader.load("assets/images/mars.jpg") });
const mars = new THREE.Mesh(marsGeo, marsMat);
const objMars = new THREE.Object3D();
mars.position.x = 78;
objMars.add(mars)
scene.add(objMars);

// Tạo sao Mộc
const jupiterGeo = new THREE.SphereGeometry(12, 30, 30);
const jupiterMat = new THREE.MeshStandardMaterial({ map: loader.load("assets/images/jupiter.jpg") });
const jupiter = new THREE.Mesh(jupiterGeo, jupiterMat);
const objJupiter = new THREE.Object3D();
jupiter.position.x = 100;
objJupiter.add(jupiter);
scene.add(objJupiter);

// Tạo sao Thổ
const saturnGeo = new THREE.SphereGeometry(10, 30, 30);
const saturnMat = new THREE.MeshStandardMaterial({ map: loader.load("assets/images/saturn.jpg") });
const saturn = new THREE.Mesh(saturnGeo, saturnMat);
const objSaturn = new THREE.Object3D();
saturn.position.x = 138;
objSaturn.add(saturn);

// Tạo vành đai sao Thổ
const ringSaturnGeo = new THREE.RingGeometry(10, 20, 32);
const ringSaturnMat = new THREE.MeshStandardMaterial({
  map: loader.load("assets/images/saturn ring.png"),
  side: THREE.DoubleSide
});
const ringSaturnMesh = new THREE.Mesh(ringSaturnGeo, ringSaturnMat);
ringSaturnMesh.position.x = 138;
ringSaturnMesh.rotation.x = -0.5 * Math.PI;
objSaturn.add(ringSaturnMesh);
scene.add(objSaturn);

// Tạo sao Thiên Vương
const uranusGeo = new THREE.SphereGeometry(7, 30, 30);
const uranusMat = new THREE.MeshStandardMaterial({ map: loader.load("assets/images/uranus.jpg") });
const uranus = new THREE.Mesh(uranusGeo, uranusMat);
const objUranus = new THREE.Object3D();
uranus.position.x = 176;
objUranus.add(uranus);

// Tạo vành đai sao Thiên Vương
const ringUranusGeo = new THREE.RingGeometry(7, 12, 32);
const ringUranusMat = new THREE.MeshStandardMaterial({
  map: loader.load("assets/images/uranus ring.png"),
  side: THREE.DoubleSide
});
const ringUranusMesh = new THREE.Mesh(ringUranusGeo, ringUranusMat);
ringUranusMesh.position.x = 176;
ringUranusMesh.rotation.x = -0.5 * Math.PI;
objUranus.add(ringUranusMesh);
scene.add(objUranus);

// Tạo sao Hải Vương
const neptuneGeo = new THREE.SphereGeometry(7, 30, 30);
const neptuneMat = new THREE.MeshStandardMaterial({ map: loader.load("assets/images/neptune.jpg") });
const neptune = new THREE.Mesh(neptuneGeo, neptuneMat);
const objNeptune = new THREE.Object3D();
neptune.position.x = 200;
objNeptune.add(neptune);
scene.add(objNeptune);

// Tạo sao Diêm Vương
const plutoGeo = new THREE.SphereGeometry(2.8, 30, 30);
const plutoMat = new THREE.MeshStandardMaterial({ map: loader.load("assets/images/pluto.jpg") });
const pluto = new THREE.Mesh(plutoGeo, plutoMat);
const objPluto = new THREE.Object3D();
pluto.position.x = 216;
objPluto.add(pluto);
scene.add(objPluto);

const pointLight = new THREE.PointLight(0xFFFFFF, 2, 300);
scene.add(pointLight)

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Đặt vị trí camera
camera.position.set(-90, 140, 140);
camera.lookAt(new THREE.Vector3(0, 0, 0))
renderer.render(scene, camera);

function animate() {
  //Self-rotation
  sun.rotateY(0.004);
  mercury.rotateY(0.004);
  venus.rotateY(0.002);
  earth.rotateY(0.02);
  moon.rotateY(0.02);
  mars.rotateY(0.018);
  jupiter.rotateY(0.04);
  saturn.rotateY(0.038);
  uranus.rotateY(0.03);
  neptune.rotateY(0.032);
  pluto.rotateY(0.008);

  //Around-sun-rotation
  objMercury.rotateY(0.01);
  objVenus.rotateY(0.015);
  objEarth.rotateY(0.01);
  objMars.rotateY(0.008);
  objJupiter.rotateY(0.002);
  objSaturn.rotateY(0.0009);
  objUranus.rotateY(0.0004);
  objNeptune.rotateY(0.0001);
  objPluto.rotateY(0.00007);
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});