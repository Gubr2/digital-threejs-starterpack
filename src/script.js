/* 
  📚 Import knižníc
*/
import * as THREE from 'three'

/* 
  🌎 Inicializácia scény
    – Do scény následne vkladám jednotlivé objekty
*/
const scene = new THREE.Scene()

/* 
  🎥 Inicializácia kamery
    – Kamera slúži na zobrazenie obsahu v scéne, rovnako ako pri fotografovaní alebo natáčaní filmu
*/
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight)
camera.position.z = 3 // Posun kamery smerom dozadu, aby sme videli objekty v strede scény

/* 
  🚂 Inicializácia rendereru
    – "Motor/engine", ktorý na základe setu funkcií spracuje všetky objekty v scéne a zobrazí ich v canvase na základe pohľadu z kamery
*/
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('canvas'), // Získanie canvasu z index.html
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setAnimationLoop(animationLoop)

/* 
  \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ 
  // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
  🤯 🤯 🤯 ZAČIATOK VLASTNÉHO KÓDU 🤯 🤯 🤯
  \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ 
  // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
*/










/* 
  \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ 
  // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
  😫 😫 😫 KONIEC VLASTNÉHO KÓDU 😫 😫 😫
  \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ 
  // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
*/

/* 
  🎬 Animačný loop
    – Funkcia, ktorá sa spustí 60 krát (alebo viac krát v závislosti na frekvencii obrazovky [HZ])
    – V rámci tejto funkcie rendrujeme našu scénu pomocou rendereru
*/
function animationLoop() {
  renderer.render(scene, camera) // Funkcia rendereru, ktorá rendruje našu scénu z pohľadu kamery
}

/* 
  ↔️ Resize funkcia
  – Funkcia, ktorá po zmene veľkosti okna upraví rozmery renderera a kamery na základe nového rozlíšenia obrazovky
*/
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
})