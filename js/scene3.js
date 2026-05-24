const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

function createScene() {
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0.1, 0.1, 0.15); 
    
    //lighting
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    // pysiscs
    scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), new BABYLON.CannonJSPlugin());

    
    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 40, height: 40}, scene);
    ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { 
        mass: 0, 
        restitution: 0.1, 
        friction: 5 
    }, scene);
    
    const groundMat = new BABYLON.StandardMaterial("groundMat", scene);
    groundMat.diffuseColor = new BABYLON.Color3(0.3, 0.3, 0.3); 
    ground.material = groundMat;

    // player adding 
    const player = BABYLON.MeshBuilder.CreateSphere("player", {diameter: 2}, scene);
    player.position.y = 2;
    
    const playerMat = new BABYLON.StandardMaterial("playerMat", scene);
    playerMat.diffuseColor = new BABYLON.Color3(0.2, 0.5, 1.0); 
    player.material = playerMat;
    
    player.physicsImpostor = new BABYLON.PhysicsImpostor(player, BABYLON.PhysicsImpostor.SphereImpostor, { 
        mass: 2, 
        restitution: 0.1, 
        friction: 2 
    }, scene);

    // the objects
    for (let i = 0; i < 15; i++) {
        let box = BABYLON.MeshBuilder.CreateBox("box" + i, {size: 1.5}, scene);
        box.position = new BABYLON.Vector3((Math.random() * 20) - 10, 5 + i, (Math.random() * 20) - 10);
        
        const boxMat = new BABYLON.StandardMaterial("boxMat", scene);
        boxMat.diffuseColor = new BABYLON.Color3(0.8, 0.2, 0.2); 
        box.material = boxMat;
        
        box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0.4 }, scene);
    }

   
    const camera = new BABYLON.FollowCamera("FollowCam", new BABYLON.Vector3(0, 15, -15), scene);
    camera.lockedTarget = player; 
    camera.radius = 15; 
    camera.heightOffset = 8; 
    camera.cameraAcceleration = 0.1; 
    camera.maxCameraSpeed = 10;


    // controls
    window.addEventListener("keydown", function (e) {
        let force = 6; // Increased push force to overcome the new friction
        let direction = new BABYLON.Vector3(0, 0, 0);

        if (e.key === "w" || e.key === "W" || e.key === "ArrowUp") direction.z = force;
        if (e.key === "s" || e.key === "S" || e.key === "ArrowDown") direction.z = -force;
        if (e.key === "a" || e.key === "A" || e.key === "ArrowLeft") direction.x = -force;
        if (e.key === "d" || e.key === "D" || e.key === "ArrowRight") direction.x = force;
        
        if (e.key === " ") direction.y = force * 2; 

        player.physicsImpostor.applyImpulse(direction, player.getAbsolutePosition());
    });

    return scene;
}

const scene = createScene();

engine.runRenderLoop(function () {
    scene.render();
});

window.addEventListener("resize", function () {
    engine.resize();
});