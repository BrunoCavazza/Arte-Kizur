/**
 * Adaptación del pen "Random, Cos and Sin" (Three.js + chroma-js)
 * https://codepen.io/soju22/pen/xxGqJxj
 * Uso: canvas fijo detrás del contenido, sin capturar puntero.
 */
import * as THREE from 'three'
import chroma from 'chroma-js'

function rnd(a, b) {
  return a + Math.random() * (b - a)
}

function randomCScale() {
  const colors = []
  for (let i = 0; i < 6; i++) {
    colors.push(
      chroma.hsl(rnd(0, 1) * 360, rnd(0.55, 0.85), rnd(0.4, 0.58)).hex(),
    )
  }
  return chroma.scale(colors).mode('lch')
}

/**
 * Geometría tipo cinta por columna de puntos (2 vértices por punto, atributo side).
 */
function createRibbonGeometry(points) {
  const n = points.length
  const positions = new Float32Array(n * 2 * 3)
  const prev = new Float32Array(n * 2 * 3)
  const next = new Float32Array(n * 2 * 3)
  const side = new Float32Array(n * 2)
  const uv = new Float32Array(n * 2 * 2)
  const indices = []

  for (let i = 0; i < n; i++) {
    const p = points[i]
    for (let k = 0; k < 2; k++) {
      const idx = i * 2 + k
      p.toArray(positions, idx * 3)
      side[idx] = k === 0 ? -1 : 1
      uv[idx * 2] = k === 0 ? 0 : 1
      uv[idx * 2 + 1] = n > 1 ? i / (n - 1) : 0
    }
  }

  for (let i = 0; i < n; i++) {
    const iPrev = Math.max(0, i - 1)
    const iNext = Math.min(n - 1, i + 1)
    const pPrev = points[iPrev]
    const pNext = points[iNext]
    for (let k = 0; k < 2; k++) {
      const idx = i * 2 + k
      pPrev.toArray(prev, idx * 3)
      pNext.toArray(next, idx * 3)
    }
  }

  for (let i = 0; i < n - 1; i++) {
    const a = i * 2
    const b = i * 2 + 1
    const c = (i + 1) * 2
    const d = (i + 1) * 2 + 1
    indices.push(a, b, c, b, d, c)
  }

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geo.setAttribute('prev', new THREE.BufferAttribute(prev, 3))
  geo.setAttribute('next', new THREE.BufferAttribute(next, 3))
  geo.setAttribute('side', new THREE.BufferAttribute(side, 1))
  geo.setAttribute('uv', new THREE.BufferAttribute(uv, 2))
  geo.setIndex(indices)
  return geo
}

const vertexShader = /* glsl */ `
uniform float uTime;
uniform float uTimeCoef;
uniform float uSize;
uniform mat2 uMat2;
uniform vec3 uRnd1;
uniform vec3 uRnd2;
uniform vec3 uRnd3;
uniform vec3 uRnd4;
uniform vec3 uRnd5;
attribute vec3 next;
attribute vec3 prev;
attribute float side;
varying vec2 vUv;

vec2 dp(vec2 sv) {
  return (1.5 * sv * uMat2);
}

void main() {
  vUv = uv;
  vec2 pos = dp(position.xy);
  vec2 normal = dp(vec2(1.0, 0.0));
  normal *= uSize;
  float time = uTime * uTimeCoef;
  vec3 rnd1 = vec3(
    cos(time * uRnd1.x + uRnd3.x),
    cos(time * uRnd1.y + uRnd3.y),
    cos(time * uRnd1.z + uRnd3.z)
  );
  vec3 rnd2 = vec3(
    cos(time * uRnd2.x + uRnd4.x),
    cos(time * uRnd2.y + uRnd4.y),
    cos(time * uRnd2.z + uRnd4.z)
  );
  normal *= 1.0
    + uRnd5.x * (cos((position.y + rnd1.x) * 20.0 * rnd1.y) + 1.0)
    + uRnd5.y * (sin((position.y + rnd2.x) * 20.0 * rnd2.y) + 1.0)
    + uRnd5.z * (cos((position.y + rnd1.z) * 20.0 * rnd2.z) + 1.0);
  pos.xy -= normal * side;
  gl_Position = vec4(pos, 0.0, 1.0);
}
`

const fragmentShader = /* glsl */ `
uniform vec3 uColor1;
uniform vec3 uColor2;
varying vec2 vUv;
void main() {
  gl_FragColor = vec4(mix(uColor1, uColor2, vUv.x), 1.0);
}
`

export function createRibbonBackground(canvas) {
  const conf = {
    nx: 40,
    ny: 100,
    cscale: chroma
      .scale(['#2175D8', '#DC5DCE', '#CC223D', '#F07414', '#FDEE61', '#74C425'])
      .mode('lch'),
    darken: -1,
    angle: Math.PI / 3,
    timeCoef: 0.035,
  }

  const uTime = { value: 0 }
  const uTimeCoef = { value: conf.timeCoef }
  const meshes = []

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance',
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  const camera = new THREE.PerspectiveCamera()

  let width = 0
  let height = 0
  let scene = null
  let raf = 0
  let disposed = false

  function updateSize() {
    width = window.innerWidth
    height = window.innerHeight
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
  }

  function disposeScene() {
    if (!scene) return
    for (const mesh of meshes) {
      mesh.geometry?.dispose()
      mesh.material?.dispose()
      scene.remove(mesh)
    }
    meshes.length = 0
    scene.clear()
    scene = null
  }

  function buildScene() {
    disposeScene()
    scene = new THREE.Scene()

    const dx = 2 / conf.nx
    const dy = -2 / (conf.ny - 1)
    const ox = -1 + dx / 2
    const oy = 1
    const c = Math.cos(conf.angle)
    const s = Math.sin(conf.angle)
    // mat2 column-major: [cos, sin, -sin, cos]
    const uMat2Uniform = { value: new Float32Array([c, s, -s, c]) }

    for (let i = 0; i < conf.nx; i++) {
      const points = []
      for (let j = 0; j < conf.ny; j++) {
        const x = ox + i * dx
        const y = oy + j * dy
        points.push(new THREE.Vector3(x, y, 0))
      }

      const geometry = createRibbonGeometry(points)
      const c1 = new THREE.Color(conf.cscale(i / conf.nx).hex())
      const c2 = new THREE.Color(conf.cscale(i / conf.nx).darken(conf.darken).hex())

      const material = new THREE.ShaderMaterial({
        uniforms: {
          uTime,
          uTimeCoef,
          uMat2: uMat2Uniform,
          uSize: { value: 1.5 / conf.nx },
          uRnd1: { value: new THREE.Vector3(rnd(-1, 1), rnd(-1, 1), rnd(-1, 1)) },
          uRnd2: { value: new THREE.Vector3(rnd(-1, 1), rnd(-1, 1), rnd(-1, 1)) },
          uRnd3: { value: new THREE.Vector3(rnd(-1, 1), rnd(-1, 1), rnd(-1, 1)) },
          uRnd4: { value: new THREE.Vector3(rnd(-1, 1), rnd(-1, 1), rnd(-1, 1)) },
          uRnd5: { value: new THREE.Vector3(rnd(0.2, 0.5), rnd(0.3, 0.6), rnd(0.4, 0.7)) },
          uColor1: { value: c1 },
          uColor2: { value: c2 },
        },
        vertexShader,
        fragmentShader,
      })

      const mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)
      meshes.push(mesh)
    }
  }

  function randomize() {
    conf.nx = Math.floor(rnd(20, 120))
    conf.cscale = randomCScale()
    conf.darken = Math.random() > 0.5 ? rnd(-4, -0.5) : rnd(0.5, 4)
    conf.angle = rnd(0, 2 * Math.PI)
    uTimeCoef.value = rnd(0.018, 0.07)
    buildScene()
  }

  function animate() {
    if (disposed) return
    raf = requestAnimationFrame(animate)
    uTime.value += 0.0032
    renderer.render(scene, camera)
  }

  function onResize() {
    updateSize()
  }

  updateSize()
  buildScene()
  window.addEventListener('resize', onResize)
  animate()

  return {
    randomize,
    destroy() {
      disposed = true
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      disposeScene()
      renderer.dispose()
    },
  }
}
