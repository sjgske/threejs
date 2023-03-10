import * as THREE from "three";

// ----- 주제: 배경색 / 빛

export default function example() {
  // Renderer
  const canvas = document.querySelector("canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true, // 배경 투명
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
  renderer.setClearColor(0x00ff00); // 배경색 설정
  renderer.setClearAlpha(0.5); // 배경 반투명

  // Scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("blue"); // 배경색

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75, // 시야각(field of view)
    window.innerWidth / window.innerHeight, // 종횡비(aspect)
    0.1, // near
    1000 // far
  );
  camera.position.x = 2;
  camera.position.y = 1;
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
  renderer.render(scene, camera);

  const setSize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix(); // 카메라 투영에 관련된 값에 변화가 있을 경우 실행
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  };

  // 이벤트
  window.addEventListener("resize", setSize);
}
