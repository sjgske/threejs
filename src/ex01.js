import * as THREE from "three";

// ----- 주제: 기본 장면

export default function example() {
  // Renderer

  // a) 동적으로 요소 생성
  // const renderer = new THREE.WebGLRenderer();
  // renderer.setSize( window.innerWidth, window.innerHeight );
  // document.body.appendChild( renderer.domElement );

  // b) html에서 canvas 가져와서 사용하기
  const canvas = document.querySelector("canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true, // 계단 현상 제거
  });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Scene
  const scene = new THREE.Scene();

  // Camera
  // Perspective Camera(원근 카메라)
  // const camera = new THREE.PerspectiveCamera(
  //   75, // 시야각(field of view)
  //   window.innerWidth / window.innerHeight, // 종횡비(aspect)
  //   0.1, // near
  //   1000 // far
  // );
  // // 카메라 위치
  // camera.position.x = 2;
  // camera.position.y = 1;
  // camera.position.z = 5;
  // scene.add(camera);

  // Orthographic Camera(직교 카메라)
  // 원근에 따라 크기가 다르게 보이지 않음
  const camera = new THREE.OrthographicCamera(
    -(window.innerWidth / window.innerHeight), // left
    window.innerWidth / window.innerHeight, // right
    1, // top
    -1, // bottom
    0.1, // near
    1000 // far
  );
  camera.position.x = 1;
  camera.position.y = 1;
  camera.position.z = 5;
  camera.lookAt(0, 0, 0); // 카메라가 원점(가운데)를 바라보게
  camera.zoom = 0.5; // 카메라가 앞뒤로 이동 (perspective camera에서 z 속성)
  camera.updateProjectionMatrix(); // zoom 반영됨
  scene.add(camera);

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({
    color: "#ff0000",
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // 그리기
  renderer.render(scene, camera);
}
