import React,{useEffect} from 'react';
import TrackballControls   from 'three-trackballcontrols';
import * as THREE from 'three';


function App() {
  useEffect(() => {
    let renderer,camera,controls, scene,
    width= window.innerWidth,
    height = window.innerHeight
    init()
    addShape()
    animate()
    render()

    function addShape(){
      let geometry = new THREE.BoxGeometry(10,10,10),
          material = new THREE.MeshNormalMaterial({color:0xFF00FF});
      let mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

    }



    function init() {
      //RENDERER
      renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('canvas'),
        antialias: true

      })
      renderer.setClearColor(0x282c34)
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height)  
      //CAMERA
      camera = new THREE.PerspectiveCamera(
        70,
        width / height,
        1,
        1000
      )
      camera.position.z = 100;
    
      //CONTROLS

      controls = new TrackballControls(camera, renderer.domElement)
      controls.addEventListener('change', render)

      //SCENE
      scene = new THREE.Scene();



      //LIGHT
    
      const light1 = new THREE.AmbientLight(0xFFFFFF, 0.5),
            light2 = new THREE.DirectionalLight(0xFFFFFFF,1);

      light2.position.set(1,1,1); 
    

      scene.add(light1)
      scene.add(light2)
      // window resize

      window.addEventListener("resize", onWindowResize, false)
  
  }

  function animate() {
    requestAnimationFrame(animate)
    controls.update()
  }

  function render() {
    renderer.render(scene, camera)
  }
  
  function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerHeight, window.innerWidth)
    controls.handleResize()
    
  }
    
  })
  return (
    <div className="App">
      <canvas id="canvas"></canvas>
    </div>
  );
}

export default App;
