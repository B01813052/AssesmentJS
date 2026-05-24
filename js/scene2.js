
const canvas = document.getElementById("renderCanvas");

const engine = new BABYLON.Engine(canvas, true);

function createScene() {
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0.5, 0.8, 0.9); 

    
    scene.gravity = new BABYLON.Vector3(0, -0.9, 0);
    scene.collisionsEnabled = true;

    const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 30, -50), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
    
    camera.applyGravity = true; 
    camera.checkCollisions = true;
    camera.ellipsoid = new BABYLON.Vector3(1, 2, 1); 

    
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.8;

    
    const ground = BABYLON.MeshBuilder.CreateGroundFromHeightMap("ground", "https://playground.babylonjs.com/textures/heightMap.png", {
        width: 200, 
        height: 200, 
        subdivisions: 50, 
        minHeight: 0, 
        maxHeight: 20
    }, scene);
    
    ground.checkCollisions = true; 
    const groundMaterial = new BABYLON.StandardMaterial("groundMat", scene);
    groundMaterial.diffuseTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/grass.png", scene);
    ground.material = groundMaterial;

    
    const originalBox = BABYLON.MeshBuilder.CreateBox("box", {size: 4}, scene);
    const boxMaterial = new BABYLON.StandardMaterial("boxMat", scene);
    boxMaterial.diffuseTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/wood.jpg", scene);
    originalBox.material = boxMaterial;

    
    for (let i = 0; i < 15; i++) {
        let clone = originalBox.clone("clone_" + i);
        clone.position.x = (Math.random() * 80) - 40;
        clone.position.z = (Math.random() * 80) - 40;
        clone.position.y = 15; 
        clone.checkCollisions = true;
    }

    
    originalBox.isVisible = false;

    return scene;
}

const scene = createScene();

engine.runRenderLoop(function () {
    scene.render();
});

window.addEventListener("resize", function () {
    engine.resize();
});