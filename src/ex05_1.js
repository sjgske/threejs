import * as THREE from "three";

// ----- 주제: rotation -> Date.now

export default function example() {
  // Renderer
  const canvas = document.querySelector("canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  // Scene
  const scene = new THREE.Scene();

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75, // 시야각(field of view)
    window.innerWidth / window.innerHeight, // 종횡비(aspect)
    0.1, // near
    1000 // far
  );
  camera.position.z = 5;
  scene.add(camera);

  // 빛
  const light = new THREE.DirectionalLight(0xffffff, 1); // 1: 빛의 강도
  light.position.x = 1;
  light.position.z = 2;
  scene.add(light);

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({
    // MeshBasicMaterial : 빛이 있어도 변화없음 -> Standard로 변경함
    color: "#ff0000",
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // 그리기
  let oldTime = Date.now();

  const draw = () => {
    const newTime = Date.now();
    const deltaTime = newTime - oldTime;
    oldTime = newTime;

    // mesh.rotation.y += 0.1; // 0.1 : 라디안(실수) 값
    // mesh.rotation.y += THREE.MathUtils.degToRad(1); // 도 단위
    mesh.rotation.y += deltaTime * 0.005;
    mesh.position.y += deltaTime * 0.001;
    if (mesh.position.y > 3) {
      mesh.position.y = 0;
    }
    renderer.render(scene, camera);

    // requestAnimationFrame(draw);
    renderer.setAnimationLoop(draw);
  };

  const setSize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix(); // 카메라 투영에 관련된 값에 변화가 있을 경우 실행
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  };

  // 이벤트
  window.addEventListener("resize", setSize);

  draw();
}
