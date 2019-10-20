var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({ antialias: true });

camera.position.set(5, 5, 6);
camera.lookAt(new THREE.Vector3(0, 0, 0));
renderer.setSize(window.innerWidth, window.innerHeight);

function animate() {
    camera.updateProjectionMatrix();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};

function addPlane() {
    var plane = new THREE.Mesh(
        new THREE.PlaneGeometry(15, 15, 15, 15),
        new THREE.MeshBasicMaterial({ color: 0x2c3e50, side: THREE.DoubleSide, wireframe: false })
    );
    plane.rotateX(Math.PI / 2);
    scene.add(plane);
}

function loadGLTFObj(obj) {
    var loader = new THREE.GLTFLoader();
    loader.load(obj.file, function (data) {
        object = data.scene;
        scene.add(object);
        object.traverse(function (child) {
            if (child.isMesh) {
                child.geometry.center();
            }
        });
        object.scale.set(0.06, 0.06, 0.06);
        object.position.set(obj.z, obj.y, obj.x);
    });
}

function generateRandomJson(nbObjs) {
    var json = [];
    var min = -5;
    var max = 5;

    for (i = 0; i < nbObjs; i++) {
        json.push({
            "file": (i % 2 === 0) ? 'models/shop.glb' : 'models/building2.glb',
            "z": Math.random() * (max - min) + min,
            "y": 1,
            "x": Math.random() * (max - min) + min,
        });
    }
    return json
}

function addObjectsFromJson() {
    var objects = generateRandomJson(10);
    for (var i = 0; i < objects.length; i++) {
        var obj = objects[i];
        loadGLTFObj(obj);
    }
}

document.body.appendChild(renderer.domElement);
addPlane();
addObjectsFromJson();
animate();