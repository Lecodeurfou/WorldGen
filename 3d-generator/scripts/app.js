var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({ antialiasing: true, preserveDrawingBuffer: true});

camera.position.set(0, 0, 5);
//camera.position.set(0, -2, 1);
camera.lookAt(new THREE.Vector3(0 ,0 ,0));
renderer.setSize(window.innerWidth, window.innerHeight);

function addZones(){
    count = 0;
    for(y2=2; y2 >=0; y2--){
        for(w=0; w<=3; w=w+1.1){
            addZone(w, y2, terrainType[count]);
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
    renderer.render(scene, camera);
};
