max = 0;
min= 16;

function addCone(i, j){
    rand = Math.random() * 0.1;
    var geometry = new THREE.ConeGeometry( 0.05 + rand, 0.2 + rand, 0.1 + rand);
    var material = new THREE.MeshBasicMaterial( {color: 0x395738, wireframe:false} );
    var cone = new THREE.Mesh( geometry, material );
    cone.position.set(i + rand, j + rand,  0.1);
    cone.rotateX(90);
    scene.add( cone );

}

function addTerrain() {
    pSize = range * 2;
    var plane = new THREE.Mesh(
        new THREE.PlaneGeometry(pSize, pSize, pSize, pSize),
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
    plane.position.set(a + 0.5, b - 0.5, 0);
}

function addCube(i, j, _color){
    rand = Math.random() * 0.1;
    var geometry = new THREE.BoxGeometry( 0.1 + rand, 0.1 + rand, 0.1 + rand );
    var material = new THREE.MeshBasicMaterial( {color:_color} );
    var cube = new THREE.Mesh( geometry, material );
    cube.position.set(i + rand, j + rand,  0.05);
    //cube.position.set(i, j,  0);
    scene.add( cube );
}

function addZone(x, y, type){
    switch (type) {
        case 0:
            addPlane(x, y, 0x988c77);
            break;
        case 1:
            addObjects(x, y, type);
            addPlane(x, y, 0x50704f);
            break;
        case 2:
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
            addPlane(x, y, 0xadaca8);
            break;
        case 8:
            addPlane(x, y, 0x5a9ea1);
            break;
        case 9:
            addPlane(x, y, 0x3757ad);
            break;
    }
}

function addObjects(x, y, type){

    for(let yC = y; yC >= y - 1; yC -= 0.18){
        for(let xC=x; xC<= x + 1; xC += 0.18){
            
            random = Math.floor(Math.random()*(max-min+1)+min);
            if( random > 4 && random < 16){
                switch (type) {
                    case 1 :
                        addCone(xC,yC)
                        break
                    case 4 :
                        addCube(xC,yC, 0x807e77)
                        break  
                    case 7 :
                        addCube(xC,yC, 0x636363)
                        break
                    }
                }
            }
            //addZone(x, y, terrainType[count]);
            //addPlane(x2, y2, 0x8da832)
    
        }
    }
