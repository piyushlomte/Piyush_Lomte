import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import { setProgress } from "../Loading";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const { setLoading } = useLoading();
  const [, setChar] = useState<THREE.Object3D | null>(null);

  useEffect(() => {
    let isMounted = true;
    if (!canvasDiv.current) return;

    // Clear any leftover DOM nodes in container
    canvasDiv.current.innerHTML = "";

    let container = {
      width: canvasDiv.current.clientWidth || 300,
      height: canvasDiv.current.clientHeight || 300,
    };
    if (container.width === 0 || container.height === 0) {
      let rect = canvasDiv.current.getBoundingClientRect();
      container = { width: rect.width || 300, height: rect.height || 300 };
    }
    const aspect = container.width / container.height;
    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(container.width, container.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    canvasDiv.current.appendChild(renderer.domElement);

    // Add rim light / hover element back if cleared
    const rimDiv = document.createElement("div");
    rimDiv.className = "character-rim";
    canvasDiv.current.appendChild(rimDiv);

    const hoverDiv = document.createElement("div");
    hoverDiv.className = "character-hover";
    if (hoverDivRef.current) {
      hoverDivRef.current.appendChild(hoverDiv);
    }

    const initialFov = container.width < 600 ? 18 : container.width <= 1024 ? 16 : 14.5;
    const initialZoom = container.width < 600 ? 1.0 : container.width <= 1024 ? 1.05 : 1.1;
    const camera = new THREE.PerspectiveCamera(initialFov, aspect, 0.1, 1000);
    camera.position.set(0, 13.1, 24.7);
    camera.zoom = initialZoom;
    camera.updateProjectionMatrix();

    let headBone: THREE.Object3D | null = null;
    let screenLight: any | null = null;
    let mixer: THREE.AnimationMixer | null = null;
    let characterModel: THREE.Object3D | null = null;
    let animFrameId: number;

    const clock = new THREE.Clock();
    const light = setLighting(scene);
    let progress = setProgress((value) => {
      if (isMounted) setLoading(value);
    });

    const { loadCharacter } = setCharacter(renderer, scene, camera);

    loadCharacter().then((gltf) => {
      if (!isMounted || !gltf) return;

      const animations = setAnimations(gltf);
      if (hoverDivRef.current) {
        animations.hover(gltf, hoverDivRef.current);
      }
      mixer = animations.mixer;
      characterModel = gltf.scene;
      setChar(characterModel);

      // Make sure only 1 instance of character is in scene
      scene.clear();
      scene.add(characterModel);

      headBone = characterModel.getObjectByName("spine006") || null;
      screenLight = characterModel.getObjectByName("screenlight") || null;

      progress.loaded().then(() => {
        if (!isMounted) return;
        light.turnOnLights();
        animations.startIntro();
      });
    });

    let mouse = { x: 0, y: 0 },
      interpolation = { x: 0.1, y: 0.2 };

    const onMouseMove = (event: MouseEvent) => {
      if (!isMounted) return;
      handleMouseMove(event, (x, y) => (mouse = { x, y }));
    };

    let debounce: any;
    const onTouchStart = (event: TouchEvent) => {
      const element = event.target as HTMLElement;
      debounce = setTimeout(() => {
        element?.addEventListener("touchmove", (e: TouchEvent) =>
          handleTouchMove(e, (x, y) => (mouse = { x, y }))
        );
      }, 200);
    };

    const onTouchEnd = () => {
      handleTouchEnd((x, y, interpolationX, interpolationY) => {
        mouse = { x, y };
        interpolation = { x: interpolationX, y: interpolationY };
      });
    };

    const handleWindowResize = () => {
      if (!isMounted || !characterModel) return;
      handleResize(renderer, camera, canvasDiv, characterModel);
    };

    document.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", handleWindowResize);

    const landingDiv = document.getElementById("landingDiv");
    if (landingDiv) {
      landingDiv.addEventListener("touchstart", onTouchStart);
      landingDiv.addEventListener("touchend", onTouchEnd);
    }

    let isCanvasVisible = true;
    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isCanvasVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    if (canvasDiv.current) {
      visibilityObserver.observe(canvasDiv.current);
    }

    const animate = () => {
      if (!isMounted) return;
      animFrameId = requestAnimationFrame(animate);

      // Only perform rendering when character canvas is in viewport
      if (!isCanvasVisible) return;

      if (headBone) {
        handleHeadRotation(
          headBone,
          mouse.x,
          mouse.y,
          interpolation.x,
          interpolation.y,
          THREE.MathUtils.lerp
        );
        light.setPointLight(screenLight);
      }
      const delta = clock.getDelta();
      if (mixer) {
        mixer.update(delta);
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      isMounted = false;
      cancelAnimationFrame(animFrameId);
      clearTimeout(debounce);
      document.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", handleWindowResize);
      visibilityObserver.disconnect();
      if (landingDiv) {
        landingDiv.removeEventListener("touchstart", onTouchStart);
        landingDiv.removeEventListener("touchend", onTouchEnd);
      }
      scene.clear();
      renderer.dispose();
      if (canvasDiv.current) {
        canvasDiv.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <>
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
        </div>
      </div>
    </>
  );
};

export default Scene;

