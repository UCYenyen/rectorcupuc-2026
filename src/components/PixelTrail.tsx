'use client'
import React, { useMemo, useEffect, useState } from 'react';
import { Canvas, useThree, CanvasProps, ThreeEvent } from '@react-three/fiber';
import { shaderMaterial, useTrailTexture } from '@react-three/drei';
import * as THREE from 'three';

interface GooeyFilterProps {
  id?: string;
  strength?: number;
}

interface DotMaterialUniforms {
  resolution: THREE.Vector2;
  mouseTrail: THREE.Texture | null;
  gridSize: number;
  pixelColor: THREE.Color;
}

interface SceneProps {
  gridSize: number;
  trailSize: number;
  maxAge: number;
  interpolate: number;
  easingFunction: (x: number) => number;
  pixelColor: string;
}

interface PixelTrailProps {
  gridSize?: number;
  trailSize?: number;
  maxAge?: number;
  interpolate?: number;
  easingFunction?: (x: number) => number;
  canvasProps?: Partial<CanvasProps>;
  glProps?: WebGLContextAttributes & { powerPreference?: string };
  gooeyFilter?: { id: string; strength: number };
  color?: string;
  className?: string;
}

const GooeyFilter: React.FC<GooeyFilterProps> = ({ id = 'goo-filter', strength = 10 }) => {
  return (
    <svg className="absolute overflow-hidden z-1 pointer-events-none" style={{ width: 0, height: 0 }}>
      <defs>
        <filter id={id}>
          <feGaussianBlur in="SourceGraphic" stdDeviation={strength} result="blur" />
          <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
};

const DotMaterial = shaderMaterial(
  {
    resolution: new THREE.Vector2(),
    mouseTrail: null,
    gridSize: 100,
    pixelColor: new THREE.Color('#ffffff')
  },
  `
    varying vec2 vUv;
    void main() {
      gl_Position = vec4(position.xy, 0.0, 1.0);
    }
  `,
  `
    uniform vec2 resolution;
    uniform sampler2D mouseTrail;
    uniform float gridSize;
    uniform vec3 pixelColor;

    vec2 coverUv(vec2 uv) {
      vec2 s = resolution.xy / max(resolution.x, resolution.y);
      vec2 newUv = (uv - 0.5) * s + 0.5;
      return clamp(newUv, 0.0, 1.0);
    }

    void main() {
      if (resolution.x <= 0.0 || resolution.y <= 0.0) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        return;
      }
      
      vec2 screenUv = gl_FragCoord.xy / resolution;
      vec2 uv = coverUv(screenUv);
      vec2 gridUvCenter = (floor(uv * gridSize) + 0.5) / gridSize;
      
      vec2 clampedUv = clamp(gridUvCenter, 0.0, 1.0);
      float trail = texture2D(mouseTrail, clampedUv).r;
      
      if (trail < 0.0 || trail > 1.0 || isnan(trail) || isinf(trail)) {
        trail = 0.0;
      }
      
      gl_FragColor = vec4(pixelColor, trail);
    }
  `
);

function Scene({ gridSize, trailSize, maxAge, interpolate, easingFunction, pixelColor }: SceneProps) {
  const size = useThree(s => s.size);
  const viewport = useThree(s => s.viewport);

  const dotMaterial = useMemo(() => new DotMaterial(), []);
  dotMaterial.uniforms.pixelColor.value = new THREE.Color(pixelColor);

  const [trail, onMove] = useTrailTexture({
    size: 512,
    radius: trailSize,
    maxAge: maxAge,
    interpolate: interpolate || 0.1,
    ease: easingFunction || ((x: number) => x)
  }) as [THREE.Texture | null, (e: ThreeEvent<PointerEvent>) => void];

  useEffect(() => {
    if (trail) {
      trail.minFilter = THREE.NearestFilter;
      trail.magFilter = THREE.NearestFilter;
      trail.wrapS = THREE.ClampToEdgeWrapping;
      trail.wrapT = THREE.ClampToEdgeWrapping;
      trail.format = THREE.RGBAFormat;
      trail.type = THREE.UnsignedByteType;
      trail.generateMipmaps = false;
      trail.needsUpdate = true;
    }
  }, [trail]);

  const scale = Math.max(viewport.width, viewport.height) / 2;

  return (
    <mesh scale={[scale, scale, 1]} onPointerMove={onMove}>
      <planeGeometry args={[2, 2]} />
      <primitive
        object={dotMaterial}
        gridSize={gridSize}
        resolution={[size.width * viewport.dpr, size.height * viewport.dpr]}
        mouseTrail={trail}
      />
    </mesh>
  );
}

export default function PixelTrail({
  gridSize = 40,
  trailSize = 0.1,
  maxAge = 250,
  interpolate = 5,
  easingFunction = (x: number) => x,
  canvasProps = {},
  glProps = {
    antialias: false,
    powerPreference: 'high-performance',
    alpha: true,
    preserveDrawingBuffer: false,
    premultipliedAlpha: true,
    depth: false,
    stencil: false
  },
  gooeyFilter,
  color = '#ffffff',
  className = ''
}: PixelTrailProps) {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setContainer(document.getElementById('root-layout'));
  }, []);

  return (
    <>
      {gooeyFilter && <GooeyFilter id={gooeyFilter.id} strength={gooeyFilter.strength} />}
      <Canvas
        {...canvasProps}
        gl={glProps}
        className={`absolute inset-0 ${className}`}
        style={{
          ...canvasProps.style,
          filter: gooeyFilter ? `url(#${gooeyFilter.id})` : undefined,
          pointerEvents: 'none'
        }}
        eventSource={container || undefined}
        eventPrefix="client"
      >
        <Scene
          gridSize={gridSize}
          trailSize={trailSize}
          maxAge={maxAge}
          interpolate={interpolate}
          easingFunction={easingFunction}
          pixelColor={color}
        />
      </Canvas>
    </>
  );
}