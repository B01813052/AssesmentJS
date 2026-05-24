const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

function createScene() {
    const scene = new BABYLON.Scene(engine);

    //camera and lighting 
    const camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, Math.PI / 3, 15, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);
    light.intensity = 0.9;

    
    const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 30, height: 30 }, scene);
    const groundMat = new BABYLON.StandardMaterial("groundMat", scene);
    groundMat.diffuseTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/floor.png", scene);
    ground.material = groundMat;

    // the box to click
    const box = BABYLON.MeshBuilder.CreateBox("box", { size: 2 }, scene);
    box.position.y = 1;

    const boxMat = new BABYLON.StandardMaterial("boxMat", scene);
    boxMat.diffuseTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/crate.png", scene);
    box.material = boxMat;

    
    const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    
    const scoreText = new BABYLON.GUI.TextBlock();
    scoreText.text = "Score: 0";
    scoreText.color = "white";
    scoreText.fontSize = 48;
    scoreText.fontWeight = "bold";
    scoreText.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    scoreText.top = "20px"; 
    
    
    advancedTexture.addControl(scoreText);

   
    let score = 0;

    
    box.actionManager = new BABYLON.ActionManager(scene);
    
    
    box.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
            
            //update score
            score++; 
            
            //add score to text
            scoreText.text = "Score: " + score; 
            
            //move box to diffrent position 
            box.position.x = (Math.random() * 20) - 10;
            box.position.z = (Math.random() * 20) - 10;
        })
    );

    return scene;
}

const scene = createScene();

engine.runRenderLoop(() => {
    scene.render();
});

window.addEventListener("resize", () => {
    engine.resize();
});