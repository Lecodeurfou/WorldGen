max = 0;
min= 16;

function addCone(i, j){
    rand = Math.random() * 0.1;
    var geometry = new THREE.ConeGeometry( 0.05, 0.2, 0.1 );
    var material = new THREE.MeshBasicMaterial( {color: 0x00ff00, wireframe:false} );
    var cone = new THREE.Mesh( geometry, material );
    cone.position.set(i + rand, j + rand,  0);
    cone.rotateX(90);
    scene.add( cone );

}

function addTerrain() {
    var plane = new THREE.Mesh(
        new THREE.PlaneGeometry(3, 3, 3, 3),
        new THREE.MeshBasicMaterial({ color: 0x2c3e50, side: THREE.DoubleSide, wireframe: true })
    );
    scene.add(plane);
}

function addPlane(a, b, hexColor){
    var plane = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1, 1, 1),
        new THREE.MeshBasicMaterial({ color: hexColor, side: THREE.DoubleSide, wireframe: false })
    );
    scene.add(plane);
    plane.position.set(a - 1, b - 1, 0);
}

function addCube(i, j){
    rand = Math.random() * 0.1;
    var geometry = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
    var material = new THREE.MeshBasicMaterial( {color: 0x948492} );
    var cube = new THREE.Mesh( geometry, material );
    cube.position.set(i + rand, j + rand,  0);
    scene.add( cube );
}

function addZone(x, y, type){
    switch (type) {
        case 0:
            addPlane(x, y, 0x8da832);
            break;
        case 1:
            addObjects(x, y, type);
            break;
        case 2:
            //addObjects(x, y, 7);
            addPlane(x, y, 0x2b7539);
            break;
        case 3:
            addPlane(x, y, 0x97a199);
            break;
        case 4:
            addObjects(x, y, type);
            break;
        case 5:
            addPlane(x, y, 0xabeb94);
            break;
        case 6:
            addPlane(x, y, 0xabeb94);
            break;
        case 7:
            addObjects(x, y, type);
            break;
        case 8:
            addPlane(x, y, 0x5a9ea1);
            break;
        case 9:
            addPlane(x, y, 0x3757ad);
            break;
    }
}

function addObjects(decX, decY, type){
    for(var i=-1.5 + decX; i<-0.5 + decX; i = i + 0.15){
        for(var j=-1.40 + decY; j<-0.5 + decY; j = j + 0.15){
        random = Math.floor(Math.random()*(max-min+1)+min);
        if( random > 5 && random < 16){
            switch (type) {
                case 1 :
                    addCone(i,j)
                    break
                case 7 :
                    addCube(i,j)
                    break
                }
            }
        }
    }
}