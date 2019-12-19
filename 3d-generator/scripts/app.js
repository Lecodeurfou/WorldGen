var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({ antialiasing: true, preserveDrawingBuffer: true});

camera.position.set(0, 0, 5);
//camera.position.set(0, -2, 1);
camera.lookAt(new THREE.Vector3(0 ,0 ,0));
renderer.setSize(window.innerWidth, window.innerHeight);

controls = new THREE.OrbitControls (camera, renderer.domElement);
controls.update();

var range = (896 / 64) / 2;
let count = 0;



function addZones(){
    for(let y = range; y>=-range - 1; y-- ){
        for(let x=-range; x<= range - 1; x++){
            addZone(x, y, terrainType[count]);
            count ++;
        }
    }
}
    

function resetScene(){
    scene.remove.apply(scene, scene.children);
}

function animate() {
    camera.updateProjectionMatrix();
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
};
