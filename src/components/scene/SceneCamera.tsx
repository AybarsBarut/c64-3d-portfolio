import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useSceneStore } from '@/stores/sceneStore';

export function SceneCamera() {
  const { camera } = useThree();
  const { deskOffset, setDeskOffset, activeSection } = useSceneStore();
  const mouseRef = useRef({ x: 0, y: 0, isDown: false, startX: 0, startY: 0 });
  const targetOffset = useRef({ x: 0, z: 0 });
  
  // Initial Camera Zoom Distance (5.2 = Classic Retro Desk Workspace View)
  const zoomRef = useRef(5.2);

  useEffect(() => {
    const handlePointerDown = (e: MouseEvent) => {
      mouseRef.current.isDown = true;
      mouseRef.current.startX = e.clientX;
      mouseRef.current.startY = e.clientY;
    };

    const handlePointerMove = (e: MouseEvent) => {
      if (!mouseRef.current.isDown) {
        const mx = (e.clientX / window.innerWidth - 0.5) * 0.5;
        const my = (e.clientY / window.innerHeight - 0.5) * 0.5;
        mouseRef.current.x = mx;
        mouseRef.current.y = my;
        return;
      }

      const dx = (e.clientX - mouseRef.current.startX) * 0.004;
      const dy = (e.clientY - mouseRef.current.startY) * 0.004;
      mouseRef.current.startX = e.clientX;
      mouseRef.current.startY = e.clientY;

      targetOffset.current.x = Math.max(-2.0, Math.min(2.0, targetOffset.current.x + dx));
      targetOffset.current.z = Math.max(-1.2, Math.min(1.2, targetOffset.current.z + dy));
    };

    const handlePointerUp = () => {
      mouseRef.current.isDown = false;
    };

    // Smooth Mouse Wheel Zoom (Scroll UP -> Zoom close to CRT screen, Scroll DOWN -> Zoom out)
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomDelta = e.deltaY * 0.0035;
      zoomRef.current = Math.max(1.8, Math.min(6.5, zoomRef.current + zoomDelta));
    };

    window.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  useEffect(() => {
    if (activeSection === 'home') {
      targetOffset.current = { x: 0, z: 0 };
    } else if (activeSection === 'about') {
      targetOffset.current = { x: -0.5, z: 0.2 };
    } else if (activeSection === 'projects') {
      targetOffset.current = { x: 0.5, z: -0.2 };
    } else if (activeSection === 'contact') {
      targetOffset.current = { x: 0, z: 0.4 };
    }
  }, [activeSection]);

  useFrame(() => {
    const lerpX = THREE.MathUtils.lerp(deskOffset.x, targetOffset.current.x, 0.08);
    const lerpZ = THREE.MathUtils.lerp(deskOffset.z, targetOffset.current.z, 0.08);
    setDeskOffset({ x: lerpX, z: lerpZ });

    // Dynamic Camera Height & Pitch based on Zoom Distance
    const normalizedZoom = (zoomRef.current - 1.8) / 4.7;
    const targetCamY = THREE.MathUtils.lerp(1.45, 4.4, Math.max(0, Math.min(1, normalizedZoom))) + mouseRef.current.y * 0.2;
    const targetCamZ = zoomRef.current + lerpZ * 0.4;

    const baseCamPos = new THREE.Vector3(
      mouseRef.current.x * 0.3 + lerpX * 0.3,
      targetCamY,
      targetCamZ
    );

    camera.position.lerp(baseCamPos, 0.09);

    // Look Target adjusts seamlessly between CRT screen center (y = 1.45) and desk center (y = 0.3)
    const lookTargetY = THREE.MathUtils.lerp(1.45, 0.3, Math.max(0, Math.min(1, normalizedZoom)));
    const lookTargetZ = THREE.MathUtils.lerp(-1.8, 0.2, Math.max(0, Math.min(1, normalizedZoom)));
    camera.lookAt(lerpX * 0.3, lookTargetY, lookTargetZ + lerpZ * 0.2);
  });

  return null;
}
