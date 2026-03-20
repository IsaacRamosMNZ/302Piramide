/**
 * three-scene.js — Pirâmide 3D Interativa
 * Renderiza uma pirâmide quadrangular com Three.js, OrbitControls embutido,
 * sliders para alterar base/altura em tempo real e controles de aparência.
 *
 * Three.js é carregado via CDN (three.min.js) com defer, antes deste script,
 * garantindo que THREE está disponível quando este arquivo executa.
 */

'use strict';

/* ============================================================
   CONSTRUÇÃO DA CENA
============================================================ */
function buildScene() {
  const canvas = document.getElementById('pyramidCanvas');
  if (!canvas) return;

  // ---- Renderer ----
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setClearColor(0x0f0f1a);

  // ---- Cena ----
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x0f0f1a, 20, 80);

  // ---- Câmera ----
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 200);
  camera.position.set(8, 6, 10);
  camera.lookAt(0, 0, 0);

  // ---- Redimensionar canvas ao tamanho real ----
  function resizeRenderer() {
    const w = canvas.parentElement.clientWidth;
    const h = canvas.parentElement.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resizeRenderer();
  window.addEventListener('resize', resizeRenderer);

  // ---- Iluminação ----
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
  dirLight.position.set(8, 14, 8);
  dirLight.castShadow = true;
  dirLight.shadow.mapSize.width  = 1024;
  dirLight.shadow.mapSize.height = 1024;
  dirLight.shadow.camera.near = 0.5;
  dirLight.shadow.camera.far  = 60;
  dirLight.shadow.camera.left   = -12;
  dirLight.shadow.camera.right  =  12;
  dirLight.shadow.camera.top    =  12;
  dirLight.shadow.camera.bottom = -12;
  scene.add(dirLight);

  // Luz de preenchimento suave
  const fillLight = new THREE.PointLight(0x6c63ff, 0.8, 40);
  fillLight.position.set(-6, 4, -4);
  scene.add(fillLight);

  // ---- Plano de chão ----
  const groundGeo = new THREE.PlaneGeometry(30, 30);
  const groundMat = new THREE.MeshStandardMaterial({
    color: 0x1a1a2e,
    roughness: 0.9,
    metalness: 0.1,
  });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = 0;
  ground.receiveShadow = true;
  scene.add(ground);

  // Grid helper (sutil)
  const gridHelper = new THREE.GridHelper(20, 20, 0x333355, 0x222244);
  gridHelper.position.y = 0.01;
  scene.add(gridHelper);

  // ---- Eixos ----
  const axesHelper = new THREE.AxesHelper(4);
  scene.add(axesHelper);

  // ---- Pirâmide ----
  let pyramidGroup   = new THREE.Group();
  let pyramidMesh    = null;
  let wireframeMesh  = null;
  let baseSize       = 4;
  let pyramidHeight  = 5;

  /**
   * Cria a geometria de uma pirâmide quadrangular usando BufferGeometry.
   * Base no y=0, vértice em y=height.
   */
  function createPyramidGeometry(base, height) {
    const h  = height;
    const hb = base / 2; // metade da base

    // Vértices: 4 da base + 1 do ápice
    const vertices = new Float32Array([
      // base (no sentido anti-horário visto de cima)
      -hb, 0,  hb,  // 0
       hb, 0,  hb,  // 1
       hb, 0, -hb,  // 2
      -hb, 0, -hb,  // 3
      // ápice
       0,  h,   0,  // 4
    ]);

    // Faces (triângulos): 4 faces laterais + 2 triâng. da base (quad)
    const indices = [
      // base (dois triângulos)
      0, 2, 1,
      0, 3, 2,
      // face frontal (z+)
      0, 1, 4,
      // face direita (x+)
      1, 2, 4,
      // face traseira (z-)
      2, 3, 4,
      // face esquerda (x-)
      3, 0, 4,
    ];

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    return geo;
  }

  function buildPyramid(base, height) {
    // Remove anteriores
    pyramidGroup.clear();

    const geo = createPyramidGeometry(base, height);

    // Material principal
    const mat = new THREE.MeshStandardMaterial({
      color: 0x6c63ff,
      roughness: 0.4,
      metalness: 0.3,
      side: THREE.FrontSide,
    });

    pyramidMesh = new THREE.Mesh(geo, mat);
    pyramidMesh.castShadow    = true;
    pyramidMesh.receiveShadow = false;
    pyramidGroup.add(pyramidMesh);

    // Wireframe
    const wfGeo = new THREE.EdgesGeometry(geo);
    const wfMat = new THREE.LineBasicMaterial({ color: 0xa78bfa, linewidth: 1 });
    wireframeMesh = new THREE.LineSegments(wfGeo, wfMat);
    wireframeMesh.visible = false;
    pyramidGroup.add(wireframeMesh);

    // Centra o grupo verticalmente para que a pirâmide fique sobre o chão
    pyramidGroup.position.y = 0;
  }

  buildPyramid(baseSize, pyramidHeight);
  scene.add(pyramidGroup);

  // ---- Atualiza painel de info ----
  function updateInfoPanel() {
    const Ab = round2(baseSize * baseSize);
    const V  = round2((Ab * pyramidHeight) / 3);

    const elBase   = document.getElementById('infoBase');
    const elAltura = document.getElementById('infoAltura');
    const elVol    = document.getElementById('infoVolume');

    if (elBase)   elBase.textContent   = `${baseSize.toFixed(1)} un.`;
    if (elAltura) elAltura.textContent = `${pyramidHeight.toFixed(1)} un.`;
    if (elVol)    elVol.textContent    = `${V} un³`;
  }

  function round2(n) { return Math.round(n * 100) / 100; }

  updateInfoPanel();

  // ---- OrbitControls simplificado ----
  // Implementação básica de orbitar / zoom por mouse e touch
  const orbit = {
    theta: 0.5,    // ângulo horizontal
    phi:   0.9,    // ângulo vertical
    radius: 14,    // distância
    isDragging: false,
    lastX: 0,
    lastY: 0,
    minRadius: 4,
    maxRadius: 35,
    minPhi: 0.1,
    maxPhi: Math.PI / 2 - 0.05,
  };

  function updateCamera() {
    camera.position.set(
      orbit.radius * Math.sin(orbit.phi) * Math.sin(orbit.theta),
      orbit.radius * Math.cos(orbit.phi),
      orbit.radius * Math.sin(orbit.phi) * Math.cos(orbit.theta)
    );
    camera.lookAt(0, pyramidHeight / 2, 0);
  }

  updateCamera();

  // Mouse
  canvas.addEventListener('mousedown', e => {
    orbit.isDragging = true;
    orbit.lastX = e.clientX;
    orbit.lastY = e.clientY;
    canvas.style.cursor = 'grabbing';
  });

  window.addEventListener('mouseup', () => {
    orbit.isDragging = false;
    canvas.style.cursor = 'grab';
  });

  window.addEventListener('mousemove', e => {
    if (!orbit.isDragging) return;
    const dx = e.clientX - orbit.lastX;
    const dy = e.clientY - orbit.lastY;
    orbit.lastX = e.clientX;
    orbit.lastY = e.clientY;

    orbit.theta -= dx * 0.008;
    orbit.phi    = Math.max(orbit.minPhi, Math.min(orbit.maxPhi, orbit.phi + dy * 0.008));
    updateCamera();
  });

  canvas.addEventListener('wheel', e => {
    // preventDefault() evita o scroll da página enquanto o usuário faz zoom na cena;
    // por isso passive deve ser false.
    e.preventDefault();
    orbit.radius = Math.max(orbit.minRadius,
      Math.min(orbit.maxRadius, orbit.radius + e.deltaY * 0.02));
    updateCamera();
  }, { passive: false });

  canvas.style.cursor = 'grab';

  // Touch
  let lastTouchDist = 0;
  canvas.addEventListener('touchstart', e => {
    if (e.touches.length === 1) {
      orbit.isDragging = true;
      orbit.lastX = e.touches[0].clientX;
      orbit.lastY = e.touches[0].clientY;
    } else if (e.touches.length === 2) {
      orbit.isDragging = false;
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      lastTouchDist = Math.sqrt(dx * dx + dy * dy);
    }
  });

  canvas.addEventListener('touchmove', e => {
    // preventDefault() evita scroll da página durante interação; passive deve ser false.
    e.preventDefault();
    if (e.touches.length === 1 && orbit.isDragging) {
      const dx = e.touches[0].clientX - orbit.lastX;
      const dy = e.touches[0].clientY - orbit.lastY;
      orbit.lastX = e.touches[0].clientX;
      orbit.lastY = e.touches[0].clientY;
      orbit.theta -= dx * 0.01;
      orbit.phi    = Math.max(orbit.minPhi, Math.min(orbit.maxPhi, orbit.phi + dy * 0.01));
      updateCamera();
    } else if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const delta = lastTouchDist - dist;
      orbit.radius = Math.max(orbit.minRadius,
        Math.min(orbit.maxRadius, orbit.radius + delta * 0.05));
      lastTouchDist = dist;
      updateCamera();
    }
  }, { passive: false });

  canvas.addEventListener('touchend', () => { orbit.isDragging = false; });

  // ---- Sliders ----
  const sliderBase   = document.getElementById('slider3dBase');
  const sliderHeight = document.getElementById('slider3dHeight');
  const valBase      = document.getElementById('val3dBase');
  const valHeight    = document.getElementById('val3dHeight');

  if (sliderBase) {
    sliderBase.addEventListener('input', () => {
      baseSize = parseFloat(sliderBase.value);
      if (valBase) valBase.textContent = baseSize.toFixed(1);
      sliderBase.setAttribute('aria-valuenow', baseSize);

      pyramidGroup.clear();
      buildPyramid(baseSize, pyramidHeight);
      applyToggleStates();
      updateCamera();
      updateInfoPanel();
    });
  }

  if (sliderHeight) {
    sliderHeight.addEventListener('input', () => {
      pyramidHeight = parseFloat(sliderHeight.value);
      if (valHeight) valHeight.textContent = pyramidHeight.toFixed(1);
      sliderHeight.setAttribute('aria-valuenow', pyramidHeight);

      pyramidGroup.clear();
      buildPyramid(baseSize, pyramidHeight);
      applyToggleStates();
      updateCamera();
      updateInfoPanel();
    });
  }

  // ---- Toggles de aparência ----
  const toggleWireframe  = document.getElementById('toggleWireframe');
  const toggleAxes       = document.getElementById('toggleAxes');
  const toggleShadow     = document.getElementById('toggleShadow');
  const toggleAutoRotate = document.getElementById('toggleAutoRotate');

  function applyToggleStates() {
    if (!pyramidMesh || !wireframeMesh) return;

    if (toggleWireframe) {
      const wf = toggleWireframe.checked;
      pyramidMesh.visible    = !wf;
      wireframeMesh.visible  = wf;
    }

    if (toggleAxes) {
      axesHelper.visible = toggleAxes.checked;
    }

    if (toggleShadow) {
      dirLight.castShadow    = toggleShadow.checked;
      pyramidMesh.castShadow = toggleShadow.checked;
    }
  }

  toggleWireframe  && toggleWireframe.addEventListener('change', applyToggleStates);
  toggleAxes       && toggleAxes.addEventListener('change', applyToggleStates);
  toggleShadow     && toggleShadow.addEventListener('change', applyToggleStates);

  // ---- Reset câmera ----
  const btnReset = document.getElementById('btnResetCamera');
  btnReset && btnReset.addEventListener('click', () => {
    orbit.theta  = 0.5;
    orbit.phi    = 0.9;
    orbit.radius = 14;
    updateCamera();
  });

  // ---- Animação ----
  let autoRotate = true;
  toggleAutoRotate && toggleAutoRotate.addEventListener('change', () => {
    autoRotate = toggleAutoRotate.checked;
  });

  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();

    if (autoRotate && !orbit.isDragging) {
      orbit.theta += delta * 0.25;
      updateCamera();
    }

    renderer.render(scene, camera);
  }

  animate();
}

// Com defer, o DOM está pronto e three.min.js já foi carregado quando este script executa.
buildScene();
