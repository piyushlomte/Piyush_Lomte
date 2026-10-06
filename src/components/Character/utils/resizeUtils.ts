import * as THREE from "three";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";

let prevWidth = typeof window !== "undefined" ? window.innerWidth : 0;

export default function handleResize(
  renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera,
  canvasDiv: React.RefObject<HTMLDivElement>,
  character: THREE.Object3D
) {
  if (!canvasDiv.current) return;
  const currentWidth = window.innerWidth;
  const widthDiff = Math.abs(currentWidth - prevWidth);

  let canvas3d = canvasDiv.current.getBoundingClientRect();
  const width = canvas3d.width || currentWidth;
  const height = canvas3d.height || window.innerHeight;

  renderer.setSize(width, height);
  camera.aspect = width / height;

  // Responsive camera framing: higher FOV on narrow mobile screens so avatar is never cropped
  if (width < 600) {
    camera.fov = 18;
    camera.zoom = 1.0;
  } else if (width <= 1024) {
    camera.fov = 16;
    camera.zoom = 1.05;
  } else {
    camera.fov = 14.5;
    camera.zoom = 1.1;
  }
  camera.updateProjectionMatrix();

  // If width hasn't changed significantly (e.g. mobile address bar hiding/showing during scroll),
  // DO NOT destroy and recreate all timelines mid-scroll!
  if (prevWidth !== 0 && widthDiff < 30) {
    return;
  }
  prevWidth = currentWidth;

  ScrollTrigger.refresh();
  setCharTimeline(character, camera);
  setAllTimeline();
}
