/* 
  📚 Import knižníc
*/
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

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

const controls = new OrbitControls(camera, document.body)

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





const sphere = new THREE.Mesh(
  new THREE.IcosahedronGeometry(1, 3),
  new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
)

const planes = []

for (let i = 0; i < sphere.geometry.attributes.position.count; i++) {
  const point = new THREE.Mesh(
    new THREE.SphereGeometry(0.02, 8, 8),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
  )

  point.position.x = sphere.geometry.attributes.position.array[i * 3]
  point.position.y = sphere.geometry.attributes.position.array[i * 3 + 1]
  point.position.z = sphere.geometry.attributes.position.array[i * 3 + 2]

  scene.add(point)

  const line = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(
        sphere.geometry.attributes.normal.array[i * 3],
        sphere.geometry.attributes.normal.array[i * 3 + 1],
        sphere.geometry.attributes.normal.array[i * 3 + 2]
      )
    ]),
    new THREE.LineBasicMaterial({ color: 0x00ffff })
  )

  line.scale.set(0.2, 0.2, 0.2)

  line.position.copy(point.position)

  scene.add(line)

  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(0.2, 0.2),
    new THREE.MeshBasicMaterial({ color: 0x0000ff })
  )


  const normal = new THREE.Vector3(
    sphere.geometry.attributes.normal.array[i * 3],
    sphere.geometry.attributes.normal.array[i * 3 + 1],
    sphere.geometry.attributes.normal.array[i * 3 + 2]
  )

  // plane.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal)
  plane.lookAt(normal)

  plane.position.copy(point.position)

  scene.add(plane)

  planes.push(plane)
}

scene.add(sphere)




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

  // for (const plane of planes) {

  // }

  const cameraDirection = new THREE.Vector3()
  camera.getWorldDirection(cameraDirection)

  for (const plane of planes) {
    const planeDirection = new THREE.Vector3()
    plane.getWorldDirection(planeDirection)

    let dot = cameraDirection.dot(planeDirection)
    dot = Math.abs(dot)

    plane.scale.set(dot, dot, dot)
  }
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