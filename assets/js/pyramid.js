// pyramid.js

import * as THREE from 'three';

// Create scene
const scene = new THREE.Scene();

// Create camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Create renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create pyramid geometry
const geometry = new THREE.ConeGeometry(5, 10, 4);

// Create material
const material = new THREE.MeshBasicMaterial({color: 0xffff00, wireframe: true});

// Create pyramid mesh
const pyramid = new THREE.Mesh(geometry, material);
scene.add(pyramid);

// Set camera position
camera.position.z = 15;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    pyramid.rotation.x += 0.01;
    pyramid.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();
