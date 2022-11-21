//#region import
import './style.css'
import * as THREE from 'three';
import { AmbientLight, Light, RectAreaLight } from 'three';

import {PointerLockControls} from 'three/examples/jsm/controls/PointerLockControls'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import gsap from 'gsap';
import { InteractionManager } from "three.interactive";
//#endregion

//#region scene and viewer configuration

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'), antialias: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, innerHeight);

camera.position.set(10, 10, 10)
camera.rotateY(500)

renderer.render(scene, camera);

const pointLight = new THREE.PointLight(0xfcdb80, 1.2);
const pointLight2 = new THREE.PointLight(0xfcdb80, 0.2);
const pointLight3 = new THREE.PointLight(0xfcdb80, 0.1);
const pointLightTorch = new THREE.PointLight(0xf7fc6a, 1);
pointLight.position.set(8, 8, -5);
pointLight2.position.set(0, 8, 0);
pointLight3.position.set(0, 1, 1);
pointLightTorch.position.set(-0, 0.5, 1);
const ambientLight = new THREE.AmbientLight(0xffffff,2); 
const lightHelper = new THREE.PointLightHelper(pointLight);
const lightHelperTorch = new THREE.PointLightHelper(pointLightTorch);
const lightHelperDiamondLight = new THREE.PointLightHelper(pointLight3);
const gridHelper = new THREE.GridHelper(200, 50)
const helper = new THREE.CameraHelper( camera );

const loader = new GLTFLoader();
const clock = new THREE.Clock();


// scene.add(lightHelper,gridHelper, helper, lightHelperTorch);
scene.add(pointLight, pointLight2, pointLightTorch);


//#endregion

//animations variables
let mixer;
let actionChestUp;
let actionBlackChestUp;
let actionChestDown;
let actionBlueChestUp;
let actionRedChestUp;
let actionBookUp;
var blackChest;
var diamond


//#region gltf loader
loader.load( 'https://github.com/ClementVaugoyeau/Le-Coffre-du-Grenier/blob/master/docs/assets/chest.glb', function ( gltf ) {

	const modelChest = gltf.scene
  console.log(gltf.scene.children[2].name)
  
  
 
 
  
  scene.add(modelChest);

  mixer = new THREE.AnimationMixer(modelChest)
  const clips = gltf.animations;
  const clip = THREE.AnimationClip.findByName(clips, 'Chest UpAction')
  const clipChest01closing = THREE.AnimationClip.findByName(clips, 'Chest CloseAction01');
  const clip2 = THREE.AnimationClip.findByName(clips, 'blackChestUP');
  const clipBlueChestUp = THREE.AnimationClip.findByName(clips, 'BlueChestUp');
  const clipRedChestUp = THREE.AnimationClip.findByName(clips, 'RedChestUp');
  const clipBookUp = THREE.AnimationClip.findByName(clips, 'BookUp');
  actionChestUp = mixer.clipAction(clip);
  actionChestDown = mixer.clipAction(clipChest01closing)
  actionBlackChestUp = mixer.clipAction(clip2)
  actionBlueChestUp = mixer.clipAction(clipBlueChestUp)
  actionRedChestUp = mixer.clipAction(clipRedChestUp)
  actionBookUp = mixer.clipAction(clipBookUp);
  
  

  
  
}, undefined, function ( error ) {

	console.error( error );

} );


let counter = 0;
let animIsFinished = true;
let firstPoint = {x : 0, y: 0, z: 0}

camera.lookAt(0, 0, 0)

const btnNext = document.getElementById("btnNext")
btnNext.addEventListener("click", onButtonNext);


 function onButtonNext( event ) {
  
  if(animIsFinished){
     
    event.preventDefault();
     animIsFinished = false;

      if(counter == 0){
      
        if ( actionChestUp !== null ) {

          actionChestUp.reset()
          actionChestUp.clampWhenFinished = true;
          actionChestUp.setLoop(THREE.LoopOnce, 1);
          actionChestUp.timeScale = 1;
          actionChestUp.play();
        
          gsap.to(camera.position,{
            x: 1,
            y: 6,
            z: -1,
            duration : 4,
          })
          
          gsap.to(firstPoint,{
             x: -2,
             duration: 4,
             onUpdate: function() {
              camera.lookAt(firstPoint.x, 0, 0)
              },
              onComplete: function(){
                animIsFinished = true;
              }
          })

         
         }
      }
       //Next Action 1//
      if(counter == 1){
        if ( actionChestUp !== null ) {
          
         
         
         
          
          gsap.to(camera.position, {
            x: 1,
            y: 2,
            z: 0,
            duration : 4,
          })

          gsap.to(firstPoint,{
            x: -2,
            z: 1.5,
            duration: 4,
            onUpdate: function() {
             camera.lookAt(firstPoint.x, 0, firstPoint.z)
            },
            onComplete: function(){
              animIsFinished = true;
            }
         })

         
          
        }
      }
      //Next Action 2//
      if(counter == 2){
        
        actionBlackChestUp.clampWhenFinished = true;
        actionBlackChestUp.loop = THREE.LoopOnce;
        actionBlackChestUp.play();

        gsap.to(camera.position, {
          x: 0.1,
          y: 2.5,
          z: 0,
          duration : 4,
          ease: "power#.inOut"
        })

        gsap.to(firstPoint,{
          x: 0, 
          z: -2,
           duration: 4,
           onUpdate: function() {
            camera.lookAt(firstPoint.x, 0, firstPoint.z)
            },
            onComplete: function(){
              animIsFinished = true;
            }
        })
        
          
      }
      //Next Action 3//
      if(counter == 3){
        
        actionBlueChestUp.clampWhenFinished = true;
        actionBlueChestUp.loop = THREE.LoopOnce;
        actionBlueChestUp.play();

        gsap.to(camera.position, {
          x: 0.5,
          y: 1.5,
          z: -1,
          duration : 4,
          ease: "power#.inOut"
        })

        gsap.to(firstPoint,{
          x: -0.7, 
          z: -1.1,
           duration: 4,
           onUpdate: function() {
            camera.lookAt(firstPoint.x, 0, firstPoint.z)
            },
            onComplete: function(){
              animIsFinished = true;
            }
        })
      }

      //Next Action 4//
      if(counter == 4){
        
        actionRedChestUp.clampWhenFinished = true;
        actionRedChestUp.loop = THREE.LoopOnce;
        actionRedChestUp.play();

        gsap.to(camera.position, {
          x: -0.2,
          y: 0.8,
          z: -1,
          duration : 4,
          ease: "power#.inOut"
        })

        gsap.to(firstPoint,{
          x: -0.5, 
          z: -1.1,
           duration: 4,
           onUpdate: function() {
            camera.lookAt(firstPoint.x, 0, firstPoint.z)
            },
            onComplete: function(){
              animIsFinished = true;
            }
        })
      }

      //Next Action 5//
      if(counter == 5){
        
        actionBookUp.clampWhenFinished = true;
        actionBookUp.loop = THREE.LoopOnce;
        actionBookUp.play();

        gsap.to(camera.position, {
          x: -0.2,
          y: 0.52,
          z: -1.05,
          duration : 4,
          ease: "power#.inOut"
        })

        gsap.to(firstPoint,{
          x: -0.3, 
          z: -1,
           duration: 4,
           onUpdate: function() {
            camera.lookAt(firstPoint.x, 0, firstPoint.z)
            },
            onComplete: function(){
              animIsFinished = true;
            }
        })
      }

     
      
      
      if(counter <= 5){
      counter++;
      }
    }
}


const btnPrevious = document.getElementById("btnPrevious")
btnPrevious.addEventListener("click", onButtonPrevious);

function onButtonPrevious(event){

  if(animIsFinished){
    event.preventDefault()
    animIsFinished = false;
    
    //Previous Action 1//
    if(counter <= 1 ){
      if ( actionChestUp !== null ) {

        
        
        actionChestUp.paused = false
        actionChestUp.timeScale = -1;
        actionChestUp.setLoop(THREE.LoopOnce);
        actionChestUp.play();
      
        gsap.to(camera.position, {
          x: 10,
          y: 10,
          z: 10,
          duration : 3
        })

        gsap.to(firstPoint,{
          x: 0,
          duration: 3,
          onUpdate: function() {
           camera.lookAt(firstPoint.x, 0, 0)
          },
          onComplete: function(){
            animIsFinished = true;
          }
        
        

       })
      }
        
    }
    //Previous Action 2//
    if(counter == 2){
      if ( actionChestUp !== null ) {
        
        
        actionChestUp.clampWhenFinished = true;
        actionChestUp.loop = THREE.LoopOnce;
        
        actionChestUp.play()
        
        gsap.to(camera.position,{
          x: 1,
          y: 6,
          z: -1,
          duration : 3,
        })
        
        gsap.to(firstPoint,{
           x: -2,
           duration: 3,
           onUpdate: function() {
            camera.lookAt(firstPoint.x, 0, 0)
            },
            onComplete: function(){
              animIsFinished = true;
            }
        })
      }
    }
    //Previous Action #3
    if(counter == 3){
      if(counter !== null)  {
        
     
        
        
        gsap.to(camera.position, {
          x: 1,
          y: 2,
          z: 0,
          duration : 4,
        })

        gsap.to(firstPoint,{
          x: -2,
          z: 0,
          duration: 4,
          onUpdate: function() {
           camera.lookAt(firstPoint.x, 0, firstPoint.z)
          },
          onComplete: function(){
            animIsFinished = true;
          }
       })
      }
    }
 //Previous Action #4
    if(counter == 4){
     
        
     
        
        
        gsap.to(camera.position, {
          x: 0.1,
          y: 2.5,
          z: 0,
          duration : 4,
          ease: "power#.inOut"
        })

        gsap.to(firstPoint,{
          x: 0, 
          z: -2,
           duration: 4,
           onUpdate: function() {
            camera.lookAt(firstPoint.x, 0, firstPoint.z)
            },
            onComplete: function(){
              animIsFinished = true;
            }
        })
      
    }
    //Previous Action #5
    if(counter == 5){
        
      

      gsap.to(camera.position, {
        x: 0.5,
        y: 1.5,
        z: -1,
        duration : 4,
        ease: "power#.inOut"
      })

      gsap.to(firstPoint,{
        x: -0.7, 
        z: -1.1,
         duration: 4,
         onUpdate: function() {
          camera.lookAt(firstPoint.x, 0, firstPoint.z)
          },
          onComplete: function(){
            animIsFinished = true;
          }
      })
    }
    //Previous Action #6
    if(counter == 6){
        
   

      gsap.to(camera.position, {
        x: -0.2,
        y: 0.8,
        z: -1,
        duration : 4,
        ease: "power#.inOut"
      })

      gsap.to(firstPoint,{
        x: -0.5, 
        z: -1.1,
         duration: 4,
         onUpdate: function() {
          camera.lookAt(firstPoint.x, 0, firstPoint.z)
          },
          onComplete: function(){
            animIsFinished = true;
          }
      })
    }


    if(counter > 0){
    counter--;
    }
   
  }
}


//#endregion

//#region animate function



function animate(time) {
  requestAnimationFrame(animate);

  console.log(counter)

    if(mixer)
        mixer.update(clock.getDelta());

      
  renderer.render(scene, camera);

 
}



animate()

//#endregion

//#region dialog box reaveal text
function revealText(){
  // document.getElementById("p2").style.display = "block";
}
//#endregion
