// Khởi tạo
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0x333333);
const pointLight = new THREE.PointLight(0xffffff, 1.5);

scene.add(ambientLight);
scene.add(pointLight);

// Tạo background cho scene
var path = "./assets/images/dark-s_";
var format = ".jpg";
var urls = [
  path + "px" + format,
  path + "nx" + format,
  path + "py" + format,
  path + "ny" + format,
  path + "pz" + format,
  path + "nz" + format,
];
var reflectionCube = new THREE.CubeTextureLoader().load(urls);
reflectionCube.format = THREE.RGBAFormat;

scene.background = reflectionCube;

const loader = new THREE.TextureLoader();

// Tạo quỹ đạo quay
function createOrbit(radius) {
  const orbitPath = new THREE.EllipseCurve(
    0,
    0,
    radius,
    radius,
    0,
    2 * Math.PI,
    false
  );
  const orbitPoints = orbitPath.getPoints(100);
  const orbitGeometry = new THREE.BufferGeometry().setFromPoints(orbitPoints);
  const orbitMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
  const orbitLine = new THREE.Line(orbitGeometry, orbitMaterial);
  orbitLine.rotation.x = Math.PI / 2;
  return orbitLine;
}

// const orbitArr = [28, 44, 62, 78, 100, 138, 176, 200, 216];
// orbitArr.forEach(function (item) {
//   scene.add(createOrbit(item));
// });

// Tạo mặt trời
const sunGeo = new THREE.SphereGeometry(16, 32, 32);
const sunMat = new THREE.MeshBasicMaterial({
  map: loader.load("assets/images/sun.jpg"),
});
const sun = new THREE.Mesh(sunGeo, sunMat);
sun.name = "sun";
scene.add(sun);

// Hàm tạo các hành tinh
function createPlanet(size, texture, position, name) {
  const planetGeo = new THREE.SphereGeometry(size, 30, 30);
  const planetMat = new THREE.MeshStandardMaterial({
    map: loader.load(texture),
  });
  const planet = new THREE.Mesh(planetGeo, planetMat);
  const obj = new THREE.Object3D();
  planet.position.x = position;
  planet.name = name;
  obj.name = name;
  obj.add(planet);
  scene.add(obj);
  return { obj, planet };
}

// Hàm tạo các hành tinh có vành đai
function createPlanetHasRing(
  radius,
  outerRadius,
  position,
  planetTexture,
  ringTexture,
  name
) {
  const planetGeo = new THREE.SphereGeometry(radius, 30, 30);
  const planetMat = new THREE.MeshStandardMaterial({
    map: loader.load(planetTexture),
  });
  const planet = new THREE.Mesh(planetGeo, planetMat);

  const ringGeo = new THREE.RingGeometry(radius, outerRadius, 32);
  const ringMat = new THREE.MeshStandardMaterial({
    map: loader.load(ringTexture),
    side: THREE.DoubleSide,
  });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  const obj = new THREE.Object3D();
  ring.position.x = position;
  ring.rotation.x = -0.5 * Math.PI;
  planet.position.x = position;
  planet.name = name;
  obj.name = name;
  obj.add(planet, ring);
  scene.add(obj);
  return { obj, planet };
}

// Tạo sao Thủy
const mercury = createPlanet(3.2, "assets/images/mercury.jpg", 28, "mercury");

// Tạo sao Kim
const venus = createPlanet(5.8, "assets/images/venus.jpg", 44, "venus");

// Tạo Trái Đất
const earth = createPlanet(6, "assets/images/earth.jpg", 62, "earth");

// Tạo mặt trăng
const moon = createPlanet(1.5, "assets/images/moon.jpg", 10, "moon");
earth.planet.add(moon.planet);

// Tạo sao Hỏa
const mars = createPlanet(4, "assets/images/mars.jpg", 78, "mars");

// Tạo sao Mộc
const jupiter = createPlanet(8, "assets/images/jupiter.jpg", 100, "jupiter");

// Tạo sao Thổ
const saturn = createPlanetHasRing(
  10,
  14,
  138,
  "assets/images/saturn.jpg",
  "assets/images/saturn ring.png",
  "saturn"
);

// Tạo sao Thiên Vương
const uranus = createPlanetHasRing(
  7,
  8,
  176,
  "assets/images/uranus.jpg",
  "assets/images/uranus ring.png",
  "uranus"
);

// Tạo sao Hải Vương
const neptune = createPlanet(7, "assets/images/neptune.jpg", 200, "neptune");

// Tạo sao Diêm Vương
const pluto = createPlanet(2.8, "assets/images/pluto.jpg", 216, "pluto");

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

camera.lookAt(new THREE.Vector3(0, 0, 0));
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

function animate_stop() {
  // Tự quay quanh trục
  sun.rotateY(0.004);
  mercury.planet.rotateY(0.004);
  venus.planet.rotateY(0.002);
  // earth.planet.rotateY(0.01);
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

const stopElement = document.querySelector(".stop");

stopElement.onclick = function () {
  stopElement.classList.toggle("stopped");
  const stoppedElement = document.querySelector(".stopped");
  if (stoppedElement) {
    stopElement.innerText = "Play";
    renderer.setAnimationLoop(animate_stop);
  } else {
    stopElement.innerText = "Stop";
    renderer.setAnimationLoop(animate);
  }
};

const orbitArr = [28, 44, 62, 78, 100, 138, 176, 200, 216];
// orbitArr.forEach(function(item) {
//   scene.add(createOrbit(item));
// });

let orbits = orbitArr.map(function(item){
  const orbit = createOrbit(item);
  scene.add(orbit);
  return orbit;
})

let showOrbit = true;
const showOrbitButton = document.querySelector(".show-orbit");

showOrbitButton.addEventListener('click', function(){
  if(showOrbit === true){
    showOrbitButton.innerText = "Hiện quỹ đạo";
    showOrbit = false;
    orbits.forEach(function(orbit){
      scene.remove(orbit);
    });
  }
  else if(showOrbit == false){
    showOrbitButton.innerText = "Tắt quỹ đạo";
    showOrbit = true;
    orbits = orbitArr.map(function(item){
      const orbit = createOrbit(item);
      scene.add(orbit);
      return orbit;
    })
  }
});

// --------
const info = {
  mercury: {
    name: "Sao Thuỷ",
    distance: 57.9,
    diameter: 4.879,
    gravity: 3.7,
    desc: "Sao Thuỷ là hành tinh nhỏ nhất trong hệ mặt trời và là hành tinh gần Mặt Trời nhất.",
  },
  venus: {
    name: "Sao Kim",
    distance: 108.2,
    diameter: 12.104,
    gravity: 8.9,
    desc: "Sao Kim là hành tinh thứ hai tính từ Mặt trời và được biết đến với bầu khí quyển dày đặc.",
  },
  earth: {
    name: "Trái Đất",
    distance: 149.6,
    diameter: 12.742,
    gravity: 9.8,
    desc: "Đây là hành tinh xinh đẹp của chúng ta đó, nó có hệ sinh thái đa dạng và có hỗ trợ sự sống.",
  },
  mars: {
    name: "Sao Hoả",
    distance: 227.9,
    diameter: 6.779,
    gravity: 3.7,
    desc: 'Sao Hỏa là hành tinh thứ tư tính từ Mặt trời và thường được gọi là "Hành tinh Đỏ" do vẻ ngoài của nó.',
  },
  jupiter: {
    name: "Sao Mộc",
    distance: 778.5,
    diameter: 139.82,
    gravity: 24.8,
    desc: "Sao Mộc là hành tinh lớn nhất trong hệ mặt trời của chúng ta và được biết đến với kích thước khổng lồ và từ trường mạnh.",
  },
  saturn: {
    name: "Sao Thổ",
    distance: 1.4,
    diameter: 116.46,
    gravity: 10.4,
    desc: "Sao Thổ nổi tiếng với vành đai tuyệt đẹp được tạo thành từ các hạt băng và đá.",
  },
  uranus: {
    name: "Sao Thiên Vương",
    distance: 2.9,
    diameter: 50.724,
    gravity: 8.7,
    desc: "Sao Thiên Vương là một hành tinh khí khổng lồ với đặc điểm độc đáo là bị nghiêng sang một bên, khiến các vành đai và mặt trăng của nó quay quanh quỹ đạo một cách bất thường.",
  },
  neptune: {
    name: "Sao Hải Vương",
    distance: 4.5,
    diameter: 49.244,
    gravity: 11.2,
    desc: "Sao Hải Vương là hành tinh xa Mặt trời nhất và được biết đến với màu xanh nổi bật và những cơn gió mạnh.",
  },
  pluto: {
    name: "Sao Diêm Vương",
    distance: 5.9,
    diameter: 2.377,
    gravity: 0.62,
    desc: "Sao Diêm Vương là một hành tinh lùn nhỏ và băng giá nằm ở vùng bên ngoài của hệ mặt trời. Nó được phát hiện vào năm 1930 và được coi là hành tinh thứ chín cho đến khi được phân loại lại vào năm 2006. Sao Diêm Vương có quỹ đạo hình elip cao và bầu khí quyển mỏng chủ yếu bao gồm nitơ, metan và carbon monoxide. Nó có năm mặt trăng được biết đến, trong đó lớn nhất là Charon.",
  },
  sun: {
    name: "Mặt Trời",
    distance: 0,
    diameter: 1.39,
    gravity: 274,
    desc: "Mặt trời là một ngôi sao lùn màu vàng, chủ yếu bao gồm hydro và heli. Nó cực kỳ lớn và chiếm khoảng 99,86% tổng khối lượng trong hệ mặt trời. Mặt trời tạo ra năng lượng thông qua phản ứng tổng hợp hạt nhân, trong đó các nguyên tử hydro kết hợp với nhau để tạo thành helium, giải phóng một lượng năng lượng khổng lồ trong quá trình này. Năng lượng này tỏa ra bên ngoài dưới dạng ánh sáng mặt trời, cung cấp nhiệt và ánh sáng cho các hành tinh trong hệ mặt trời. Lực hấp dẫn cực mạnh của Mặt trời giữ hệ mặt trời lại với nhau và ảnh hưởng đến quỹ đạo của các hành tinh và các thiên thể khác.",
  },
  moon: {
    name: "Mặt Trăng",
    distance: 0.3844,
    diameter: 1.622,
    gravity: 274,
    desc: "Mặt trăng là vệ tinh tự nhiên duy nhất của Trái đất và là vệ tinh lớn thứ năm trong hệ mặt trời. Nó có một bề mặt đá được bao phủ bởi miệng núi lửa, núi, thung lũng và đồng bằng. Lực hấp dẫn của Mặt trăng ảnh hưởng đến thủy triều trên Trái đất. Mất khoảng 27,3 ngày để Mặt trăng hoàn thành một quỹ đạo quanh Trái đất, gần bằng khoảng thời gian để hoàn thành một vòng quay trên trục của nó. Mặt trăng không có bầu khí quyển và có sự thay đổi nhiệt độ khắc nghiệt giữa ngày và đêm",
  },
};
// console.log(scene.children)
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
var draggable = new THREE.Object3D();
const getContainer = document.querySelector(".container-info");

window.addEventListener("click", (event) => {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(scene.children);

  if (intersects.length > 0) {
    draggable = intersects[0].object;

    const html = `
    <i class="fa-solid fa-square-xmark"></i>
    <div class="infor">
      <div class="infor-text">
        <div><span class="title">Hành tinh:</span> ${info[draggable.name].name}</div>
        <div><span class="title">Khoảng cách đến mặt trời:</span> ${
          info[draggable.name].distance
        } triệu km</div>
        <div><span class="title">Đường kính:</span> ${
          info[draggable.name].diameter
        } km</div>
        <div><span class="title">Lực hấp dẫn:</span> ${
          info[draggable.name].gravity
        } m/s²</div>
        <div><span class="title">Mô tả:</span> ${
          info[draggable.name].desc
        } </div>
      </div>
      <img class = "planet-gif" src="./assets/images/${draggable.name}-gif.gif" width="500px", height="500px">
      
    </div>
    `;
    getContainer.style.display = "block";
    getContainer.innerHTML = html;

    const btnCLose = document.querySelector(".fa-solid.fa-square-xmark");
    btnCLose.onclick = function () {
      getContainer.style.display = "none";
    };
  }
});

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
