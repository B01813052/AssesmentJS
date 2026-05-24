const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);


let sceneA, sceneB;
let currentScene;


function createSwitchButton(scene, buttonText, targetSceneName) {
    const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene);
    
    const btn = BABYLON.GUI.Button.CreateSimpleButton("switchBtn", buttonText);
    btn.width = "250px";
    btn.height = "60px";
    btn.color = "white";
    btn.fontSize = 20;
    btn.fontWeight = "bold";
    btn.top = "20px";
    btn.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    
  
    if (targetSceneName === "lava") {
        btn.background = "darkred";
    } else {
        btn.background = "darkgreen";
    }

    advancedTexture.addControl(btn);

   
    btn.onPointerUpObservable.add(() => {
        if (targetSceneName === "lava") {
            currentScene = sceneB; //go to lava
        } else {
            currentScene = sceneA; //go to forest
        }
    });
}

//forest scene
function createSceneA() {
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0.5, 0.8, 0.9); // Blue sky

    const camera = new BABYLON.ArcRotateCamera("camA", Math.PI / 2, Math.PI / 3, 12, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    const light = new BABYLON.HemisphericLight("lightA", new BABYLON.Vector3(1, 1, 0), scene);

    const ground = BABYLON.MeshBuilder.CreateGround("groundA", { width: 20, height: 20 }, scene);
    const gMat = new BABYLON.StandardMaterial("gMatA", scene);
    gMat.diffuseTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/grass.png", scene);
    ground.material = gMat;

    
    const trunk = BABYLON.MeshBuilder.CreateCylinder("trunk", { height: 2, diameter: 0.4 }, scene);
    trunk.position.y = 1;
    const tMat = new BABYLON.StandardMaterial("tMat", scene);
    tMat.diffuseColor = new BABYLON.Color3(0.4, 0.2, 0);
    trunk.material = tMat;

   
    const leaves = BABYLON.MeshBuilder.CreateSphere("leaves", { diameter: 3 }, scene);
    leaves.position.y = 2.5;
    const lMat = new BABYLON.StandardMaterial("lMat", scene);
    lMat.diffuseColor = new BABYLON.Color3(0.1, 0.6, 0.1);
    leaves.material = lMat;

    // button for lava
    createSwitchButton(scene, "lava", "lava");

    return scene;
}

//the lava scene
function createSceneB() {
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0.1, 0, 0); 

    const camera = new BABYLON.ArcRotateCamera("camB", Math.PI / 2, Math.PI / 3, 12, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    const light = new BABYLON.PointLight("lightB", new BABYLON.Vector3(0, 5, 0), scene);
    light.diffuse = new BABYLON.Color3(1, 0.3, 0);

    const ground = BABYLON.MeshBuilder.CreateGround("groundB", { width: 20, height: 20 }, scene);
    const lavaMat = new BABYLON.StandardMaterial("lavaMat", scene);
    lavaMat.diffuseColor = new BABYLON.Color3(0.8, 0.1, 0);
    lavaMat.emissiveColor = new BABYLON.Color3(0.6, 0.1, 0); 
    ground.material = lavaMat;

    
    const rock = BABYLON.MeshBuilder.CreateSphere("rock", { diameter: 3 }, scene);
    rock.position.y = 1.5;
    const rockMat = new BABYLON.StandardMaterial("rockMat", scene);
    rockMat.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.2);
    rock.material = rockMat;

    // button for forest 
    createSwitchButton(scene, "forest", "forest");

    return scene;
}


sceneA = createSceneA();
sceneB = createSceneB();

//start in forest
currentScene = sceneA;


engine.runRenderLoop(function () {
    currentScene.render();
});

window.addEventListener("resize", () => {
    engine.resize();
});