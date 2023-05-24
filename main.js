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
var path = './assets/images/dark-s_';
var format = '.jpg';
var urls = [
    path +'px'+ format, path + 'nx' + format,
    path +'py'+ format, path + 'ny' + format,
    path +'pz'+ format, path + 'nz' + format,
];
var reflectionCube = new THREE.CubeTextureLoader().load(urls);
reflectionCube.format = THREE.RGBAFormat;

scene.background = reflectionCube

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
sun.name = 'sun'
scene.add(sun);

// Hàm tạo các hành tinh
function createPlanet(size, texture, position,name) {
  const planetGeo = new THREE.SphereGeometry(size, 30, 30);
  const planetMat = new THREE.MeshStandardMaterial({ map: loader.load(texture) });
  const planet = new THREE.Mesh(planetGeo, planetMat);
  const obj = new THREE.Object3D();
  planet.position.x = position;
  planet.name = name
  obj.name = name
  obj.add(planet);
  scene.add(obj);
  return { obj, planet };
}

// Hàm tạo các hành tinh có vành đai
function createPlanetHasRing(radius, outerRadius, position, planetTexture, ringTexture, name) {
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
  planet.name = name
  obj.name = name
  obj.add(planet, ring);
  scene.add(obj);
  return { obj, planet };
}

// Tạo sao Thủy
const mercury = createPlanet(3.2, "assets/images/mercury.jpg", 28,'mercury');

// Tạo sao Kim
const venus = createPlanet(5.8, "assets/images/venus.jpg", 44, 'venus');

// Tạo Trái Đất
const earth = createPlanet(6, "assets/images/earth.jpg", 62, 'earth');

// Tạo mặt trăng
const moon = createPlanet(1.5, "assets/images/moon.jpg", 10,'moon');
earth.planet.add(moon.planet);

// Tạo sao Hỏa
const mars = createPlanet(4, "assets/images/mars.jpg", 78,'mars');

// Tạo sao Mộc
const jupiter = createPlanet(8, "assets/images/jupiter.jpg", 100,'jupiter');

// Tạo sao Thổ
const saturn = createPlanetHasRing(10, 14, 138, "assets/images/saturn.jpg", "assets/images/saturn ring.png", 'saturn')

// Tạo sao Thiên Vương
const uranus = createPlanetHasRing(7, 8, 176, "assets/images/uranus.jpg", "assets/images/uranus ring.png",'uranus')

// Tạo sao Hải Vương
const neptune = createPlanet(7, "assets/images/neptune.jpg", 200,'neptune')

// Tạo sao Diêm Vương
const pluto = createPlanet(2.8, "assets/images/pluto.jpg", 216,'pluto');

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
  earth.planet.rotateY(0.01);
  moon.planet.rotateY(0.02);
  mars.planet.rotateY(0.018);
  jupiter.planet.rotateY(0.014);
  saturn.planet.rotateY(0.038);
  uranus.planet.rotateY(0.03);
  neptune.planet.rotateY(0.032);
  pluto.planet.rotateY(0.008);

  // Quay quanh mặt trời
  mercury.obj.rotateY(0.01);
  venus.obj.rotateY(0.005);
  earth.obj.rotateY(0.0055);
  moon.obj.rotateY(0.005);
  mars.obj.rotateY(0.004);
  jupiter.obj.rotateY(0.002);
  saturn.obj.rotateY(0.0005);
  uranus.obj.rotateY(0.0004);
  neptune.obj.rotateY(0.0001);
  pluto.obj.rotateY(0.00007);
  renderer.render(scene, camera);
}

function animate_stop(){
  // Tự quay quanh trục
  sun.rotateY(0.004);
  mercury.planet.rotateY(0.004);
  venus.planet.rotateY(0.002);
  earth.planet.rotateY(0.01);
  moon.planet.rotateY(0.02);
  mars.planet.rotateY(0.018);
  jupiter.planet.rotateY(0.014);
  saturn.planet.rotateY(0.038);
  uranus.planet.rotateY(0.03);
  neptune.planet.rotateY(0.032);
  pluto.planet.rotateY(0.008);
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

// --------
const stopElement = document.querySelector('.stop')

stopElement.onclick = function() {
  stopElement.classList.toggle("stopped")
  const stoppedElement = document.querySelector('.stopped')
  if (stoppedElement){
    stopElement.innerText = "Play"
    renderer.setAnimationLoop(animate_stop)
  }
  else{
    stopElement.innerText = "Stop"
    renderer.setAnimationLoop(animate)
  }
}
// --------

// console.log(scene.children)
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
var draggable = new THREE.Object3D;
window.addEventListener('click', event => {
  pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

  raycaster.setFromCamera( pointer, camera );
  const intersects = raycaster.intersectObjects( scene.children);

  if(intersects.length > 0){
    draggable = intersects[0].object;
    console.log('tim thấy', draggable.name)
  }

})

window.addEventListener('resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});