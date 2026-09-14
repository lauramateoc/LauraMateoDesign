"use client";

import { useEffect, useRef, useState } from "react";

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;

uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform vec3 u_a;
uniform vec3 u_b;
uniform vec3 u_c;
uniform float u_intensity;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y) * 2.0 - 1.0;
}

float fbm(vec2 p) {
  float v = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 4; i++) {
    v += amp * noise(p);
    p *= 2.03;
    amp *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  vec2 p = (gl_FragCoord.xy - 0.5 * u_res.xy) / min(u_res.x, u_res.y);

  float t = u_time * 0.08;
  vec2 m = (u_mouse - 0.5) * 1.2;

  vec2 q = vec2(
    fbm(p * 1.5 + t),
    fbm(p * 1.5 + vec2(3.2, 1.7) - t)
  );
  vec2 r = vec2(
    fbm(p * 1.9 + 2.2 * q + vec2(1.7, 9.2) + t * 1.4 + m * 0.7),
    fbm(p * 1.9 + 2.2 * q + vec2(8.3, 2.8) - t * 1.1 + m * 0.7)
  );
  float f = fbm(p * 1.7 + 3.0 * r + t * 0.4);

  float shade = clamp(f * 0.5 + 0.5, 0.0, 1.0);
  vec3 col = mix(u_a, u_b, smoothstep(0.05, 0.95, shade));
  col = mix(col, u_c, clamp(length(r) * 0.85, 0.0, 0.6));

  float fil = pow(clamp(1.0 - abs(f) * 1.7, 0.0, 1.0), 2.2);
  col += u_c * fil * 0.75;

  float rim = pow(clamp(1.0 - abs(f - 0.35) * 2.4, 0.0, 1.0), 3.0);
  col += u_b * rim * 0.5;

  float d = length(p - m * 0.5);
  col += u_c * 0.22 * exp(-d * 2.6);

  float vig = smoothstep(1.35, 0.2, length(uv - 0.5) * 1.5);
  col *= mix(0.85, 1.08, vig);

  float dither = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) / 255.0;
  col += dither;

  gl_FragColor = vec4(col * u_intensity, 1.0);
}
`;

function compile(
  gl: WebGLRenderingContext,
  type: number,
  src: string,
  label: string,
) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    if (process.env.NODE_ENV !== "production") {
      console.error(`ShaderField ${label}:`, gl.getShaderInfoLog(shader));
    }
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function hexToRgb(hex: string): [number, number, number] {
  const v = hex.replace("#", "");
  const n = parseInt(
    v.length === 3
      ? v
          .split("")
          .map((c) => c + c)
          .join("")
      : v,
    16,
  );
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

type ShaderFieldProps = {
  colors?: [string, string, string];
  intensity?: number;
  className?: string;
};

export function ShaderField({
  colors = ["#06060a", "#161a3a", "#4f46ff"],
  intensity = 1,
  className = "",
}: ShaderFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const key = colors.join("|");

  useEffect(() => {
    setReady(false);

    const canvas = canvasRef.current;
    if (!canvas) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: true,
      premultipliedAlpha: false,
      powerPreference: "high-performance",
    });
    if (!gl) return;

    const loseExt = gl.getExtension("WEBGL_lose_context");
    const palette = key.split("|");
    const vs = compile(gl, gl.VERTEX_SHADER, VERT, "vertex");
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG, "fragment");
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      if (process.env.NODE_ENV !== "production") {
        console.error("ShaderField link:", gl.getProgramInfoLog(program));
      }
      return;
    }
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const loc = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "u_res");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uMouse = gl.getUniformLocation(program, "u_mouse");

    gl.uniform3fv(gl.getUniformLocation(program, "u_a"), hexToRgb(palette[0]));
    gl.uniform3fv(gl.getUniformLocation(program, "u_b"), hexToRgb(palette[1]));
    gl.uniform3fv(gl.getUniformLocation(program, "u_c"), hexToRgb(palette[2]));
    gl.uniform1f(gl.getUniformLocation(program, "u_intensity"), intensity);

    const mouse = { x: 0.5, y: 0.5 };
    const target = { x: 0.5, y: 0.5 };
    let sized = false;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX / window.innerWidth;
      target.y = 1 - e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
        gl.uniform2f(uRes, w, h);
      }
      sized = canvas.clientWidth > 0 && canvas.clientHeight > 0;
    };

    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);
    resize();

    let lost = false;
    const onLost = (e: Event) => {
      e.preventDefault();
      lost = true;
      setReady(false);
    };
    canvas.addEventListener("webglcontextlost", onLost);

    let raf = 0;
    const start = performance.now();
    let drew = false;

    const render = () => {
      raf = requestAnimationFrame(render);
      if (lost || document.hidden) return;

      resize();
      if (!sized) return;

      mouse.x += (target.x - mouse.x) * 0.05;
      mouse.y += (target.y - mouse.y) * 0.05;
      gl.uniform1f(uTime, (performance.now() - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      if (!drew) {
        drew = true;
        setReady(true);
      }
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("webglcontextlost", onLost);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
      loseExt?.loseContext();
      setReady(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, intensity]);

  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
      style={{
        backgroundColor: colors[0],
        backgroundImage: [
          `radial-gradient(70% 55% at 72% 18%, ${colors[2]}88, transparent 70%)`,
          `radial-gradient(60% 60% at 18% 82%, ${colors[1]}dd, transparent 72%)`,
          `radial-gradient(120% 100% at 50% 50%, ${colors[1]}77, ${colors[0]} 78%)`,
        ].join(","),
      }}
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full transition-opacity duration-500"
        style={{ opacity: ready ? 1 : 0 }}
      />
    </div>
  );
}
