var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({ antialiasing: true, preserveDrawingBuffer: true});

camera.position.set(5, 5, 6);
camera.lookAt(new THREE.Vector3(0, 0, 0));
renderer.setSize(window.innerWidth, window.innerHeight);

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

function addObjectsFromJson(json) {
    for (var i = 0; i < json.length; i++) {
        var obj = json[i];
        loadGLTFObj(obj);
    }  
}

function resetScene(){
    scene.remove.apply(scene, scene.children);
}

// function animate() {
//     camera.updateProjectionMatrix();
//     requestAnimationFrame(animate);
//     renderer.render(scene, camera);
// };


