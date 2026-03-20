/**
 * three-scene.js � Pir�mide 3D Interativa com OrbitControls
 * Controles suaves para desktop e mobile
 */

'use strict';

window.pyramidScene = (() => {
  const canvas = document.getElementById('pyramidCanvas');
  if (!canvas) {
    console.error('Canvas n�o encontrado');
    return null;
  }

  let scene;
  let camera;
  let renderer;
  let orbitControls;
  let pyramidGroup = null;
  let pyramidMesh = null;
  let wireframeLines = null;
  let isWireframe = false;

  function init() {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x020617, 1);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020617);

    camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    camera.position.set(8, 7, 10);

    setupLights();

    pyramidGroup = new THREE.Group();
    scene.add(pyramidGroup);
    updatePyramid(4, 6, '#e0f2fe');

    setupControls();

    onWindowResize();
    window.addEventListener('resize', onWindowResize);

    animate();
  }

  function setupLights() {
    const ambient = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambient);

    const directionalA = new THREE.DirectionalLight(0xffffff, 0.9);
    directionalA.position.set(6, 10, 6);
    scene.add(directionalA);

    const directionalB = new THREE.DirectionalLight(0xffffff, 0.45);
    directionalB.position.set(-6, 5, -8);
    scene.add(directionalB);
  }

  function setupControls() {
    if (typeof THREE.OrbitControls !== 'function') {
      console.error('OrbitControls n�o carregado.');
      return;
    }

    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
    orbitControls.enableDamping = true;
    orbitControls.dampingFactor = 0.08;
    orbitControls.rotateSpeed = 0.85;
    orbitControls.zoomSpeed = 0.9;
    orbitControls.panSpeed = 0.6;
    orbitControls.minDistance = 5;
    orbitControls.maxDistance = 24;
    orbitControls.target.set(0, 2.5, 0);
    orbitControls.maxPolarAngle = Math.PI * 0.9;
    orbitControls.minPolarAngle = Math.PI * 0.1;
    orbitControls.update();
  }

  function onWindowResize() {
    const width = canvas.parentElement.clientWidth;
    const height = canvas.parentElement.clientHeight || 360;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  }

  function createPyramidGeometry(baseSize, height) {
    const geo = new THREE.BufferGeometry();
    const b = baseSize / 2;

    const vertices = new Float32Array([
      -b, 0, -b,
      b, 0, -b,
      b, 0, b,
      -b, 0, b,
      0, height, 0
    ]);

    const indices = [
      0, 2, 1,
      0, 3, 2,
      0, 4, 1,
      1, 4, 2,
      2, 4, 3,
      3, 4, 0
    ];

    geo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    return geo;
  }

  function updatePyramid(baseSize, height, colorHex) {
    if (!pyramidGroup) return;
    pyramidGroup.clear();
    pyramidMesh = null;
    wireframeLines = null;

    const geo = createPyramidGeometry(baseSize, height);

    let colorNum = 0xe0f2fe;
    if (typeof colorHex === 'string') {
      colorNum = parseInt(colorHex.replace('#', ''), 16);
    }

    const material = new THREE.MeshPhongMaterial({
      color: colorNum,
      shininess: 45,
      emissive: 0x0f172a,
      emissiveIntensity: 0.15,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
      side: THREE.DoubleSide
    });

    pyramidMesh = new THREE.Mesh(geo, material);
    pyramidMesh.material.wireframe = isWireframe;
    pyramidGroup.add(pyramidMesh);

    const edges = new THREE.EdgesGeometry(geo);
    wireframeLines = new THREE.LineSegments(
      edges,
      new THREE.LineBasicMaterial({
        color: 0xe2e8f0,
        transparent: true,
        opacity: 0.95,
        depthTest: false
      })
    );
    wireframeLines.visible = isWireframe;
    pyramidGroup.add(wireframeLines);
  }

  function toggleWireframe() {
    isWireframe = !isWireframe;
    if (wireframeLines) wireframeLines.visible = isWireframe;
    if (pyramidMesh && pyramidMesh.material) {
      pyramidMesh.material.wireframe = isWireframe;
      pyramidMesh.material.needsUpdate = true;
    }

    return isWireframe;
  }

  function resetView() {
    if (!orbitControls) return;
    camera.position.set(8, 7, 10);
    orbitControls.target.set(0, 2.5, 0);
    orbitControls.update();
  }

  function animate() {
    requestAnimationFrame(animate);
    if (orbitControls) orbitControls.update();
    renderer.render(scene, camera);
  }

  return {
    updatePyramid,
    toggleWireframe,
    resetView,
    init
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  if (window.pyramidScene) {
    window.pyramidScene.init();
  }
});
