const states = {
    DEFAULT       : 1<<0,
    CHANGE_COLOR  : 1<<1,
    CHANGE_MODEL  : 1<<2,
    SPECIFICATIONS: 1<<3
}
state = states.DEFAULT;

console.log(`${states} ${state}`);

var canvas = document.getElementById("renderCanvas");
var engine = new Engine(canvas);
engine.init();

var loading = document.getElementById("loading");

console.log("SCENE");
var scene = new Scene(engine);
scene.init();
scene.setClearColor(0,0,0.1);
// scene.setClearColor(0.8,0.8,0.8);
// scene.setFogColor(scene.getClearColor());
// scene.setFogDensity(0.05);
// scene.setFogExponentialMode();

// console.log("LIGHT");
// var light = new Light(scene);
// light.setPointLight(10,0,-10);

console.log("LIGHT2");
var light2 = new Light(scene);
light2.setAmbientLight();
light2.setIntensity(.2);

console.log("TEXTURE");
var eqTexture = new Texture(scene);
eqTexture.setEquiRectangularTexture("texturas/vista360.png", 64);

console.log("MESH");
var target = new Mesh(scene);
target.init();

var altura = 2;

target.__getMesh().position = getVec3Pos(0,altura,0);

console.log("CAMERA");
var camera = new Camera(scene, canvas);
console.log(camera.getName());
camera.setArcRotateCamera(-toRad(90), toRad(85), 35, 0,altura,0);
camera.setAngularSensibility(2);
camera.setMoveSensibility(2);
camera.setWhellPrecision(30);
camera.setPinchPrecision(60);
camera.setLowerRadiusLimit(5);
camera.setUpperRadiusLimit(100);
camera.__getCamera().upperBetaLimit = Math.PI / 2;
camera.setTarget(target.__getMesh());

console.log("IMPORT");
var watch = new ExternalImport(scene);

//watch.importFromGLTFFile("prueba.glb", ()=>{
watch.importBabylonFile("casaBake2.0.babylon",()=>{

    var meshes = watch.getMeshes();

    var reflejos = [];
    for(var j=0; j<meshes.length; ++j)
    {
        var _mesh = meshes[j].__getMesh();
        if(_mesh.name==="paredes_mansion" || _mesh.name==="pared_cuarto_mansion")
        {
            reflejos.push(_mesh);
        }
        
    }


    // for(var j=0; j<meshes.length; ++j)
    // {
    //     var _mesh = meshes[j].__getMesh();
    //     console.log(_mesh.name);
    //     if(_mesh.name==="piso0_mansion")
    //     {

    //     }
        
    // }

    loading.parentNode.removeChild(loading);
});

console.log("ALL LOADED");

/////////////////
scene.renderLoop();

console.log("LOOP");


window.addEventListener("resize", ()=>{
    scene.refreshSize();
},false);

function setMaterialColor(materialName, r, g, b)
{
    var materialSelected = scene.__getScene().getMaterialByName(materialName);
    if(materialSelected)
    {
        materialSelected.diffuseColor = getVec3Color(r, g, b);
    }
    
}