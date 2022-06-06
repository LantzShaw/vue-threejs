<template>
  <div id="container"></div>
</template>
<script setup>
import { onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

import { OrbitControls } from './common/tool/OrbitControls'
import { CSS2DRenderer } from './common/tool/CSS2DRenderer'

let scene = null
let camera = null
let mesh = null
let renderer = null
let raycaster = null
let mouse = null
let objects = []
let controls = null

const dracoLoader = new DRACOLoader()
const gltfLoader = new GLTFLoader().setPath('static/models/')

dracoLoader.setDecoderPath('node_modules/three/examples/js/libs/draco/')
dracoLoader.setDecoderConfig({ type: 'js' })
dracoLoader.preload()

gltfLoader.setDRACOLoader(dracoLoader)

const init = () => {
  initScene()

  initCamera()

  initMaterial()

  // initCSSRender()

  initRenderer()

  initRaycater()

  initControls()

  render()
}

const initScene = () => {
  scene = new THREE.Scene()

  // 环境光
  const ambientLight = new THREE.AmbientLight(0xafc2db, 1)

  scene.add(ambientLight)
}

const initCamera = () => {
  const aspect = window.innerWidth / 1080

  // camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10)
  // camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 20)

  var width = window.innerWidth // 窗口宽度
  var height = window.innerHeight // 窗口高度
  var k = width / height // 窗口宽高比
  var s = 5 // 三维场景显示范围控制系数，系数越大，显示的范围越大

  camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 2000)
  // camera.position.set(20, 20, 20)

  // camera.lookAt(new THREE.Vector3(0, 0, 0))

  // camera = new THREE.OrthographicCamera(45, aspect, 1, 2000)
  // camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000)
  // camera.position.set(0, 25, 14)
  camera.position.set(-1000, 800, -1500)

  // camera.rotation.z = 800
  // camera.rotation.y = -90
  // camera.rotation.z = 100

  camera.lookAt(new THREE.Vector3(0, 0, 0)) // 让相机指向原点
  const pointLight = new THREE.PointLight(0xafc2db, 1)
  camera.add(pointLight)

  // camera.position.z = 1
}

const initMaterial = () => {
  const geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8)
  const material = new THREE.MeshNormalMaterial()
  mesh = new THREE.Mesh(geometry, material)
  // scene.add(mesh)

  const grid = new THREE.GridHelper(100, 300, 0xff4400, 0x01aaed)

  grid.position.x = -30
  grid.position.y = -0
  grid.position.z = -14
  // grid.rotation.z = 200

  // scene.add(grid)
}

// const loadPlant = () => {
//   const loader = new GLTFLoader().setPath('static/models/')
//   loader.load('hello.gltf', function (gltf) {
//     console.log('----gltf-----', gltf)

//     scene.add(gltf.scene)
//     renderer.render(scene, camera)
//   })
// }

/**
 *  普通gltf模型加载
 * */
const loadPlant = () => {
  // 模型加载进度管理
  const manager = new THREE.LoadingManager()

  manager.onProgress = function (item, loaded, total) {
    // console.log(item, loaded, total)
  }

  // let gLTFLoader = new GLTFLoader(manager)
  const dracoLoader = new DRACOLoader()
  const gLTFLoader = new GLTFLoader().setPath('static/models/')

  // dracoLoader.setDecoderConfig({ type: 'js' })
  // dracoLoader.preload()
  // dracoLoader.setDecoderPath('/static/draco/')

  // gLTFLoader.setDRACOLoader(dracoLoader)
  // gLTFLoader.setCrossOrigin('')

  // const url = 'static/models/1-1.gltf'

  // new RGBELoader()
  //   .setPath('textures/equirectangular/')
  //   .load('royal_esplanade_1k.hdr', function (texture) {
  gLTFLoader.load(
    '1-1.gltf',
    function (gltf) {
      console.log('----gltf-----', gltf)

      // gltf.animations // Array<THREE.AnimationClip>
      // gltf.scene // THREE.Scene
      // gltf.scenes // Array<THREE.Scene>
      // gltf.cameras // Array<THREE.Camera>

      // gltf.scene.scale.set(100, 100, 100)
      // gltf.scene.rotation.set(0, 0, 0)
      // gltf.scene.position.set(0.5, 0.5, 0.5)
      gltf.scene.castShadow = true
      gltf.scene.scale.set(0.005, 0.005, 0.005)

      scene.add(gltf.scene)

      render()

      // let group = new THREE.Group()

      // group.add(gltf.scene)

      // let wrapper = new THREE.Object3D()

      // let box = new THREE.Box3()

      // box.setFromObject(group)

      // wrapper.add(group)

      // // 根据自己模型的大小设置位置

      // wrapper.position.set(0, 10, 0)

      // // 将模型加入到场景中 ! important

      // scene.add(wrapper)

      // gltf.scene.scale.set(1, 1, 1)

      // const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
      // const material = new THREE.MeshNormalMaterial()

      // const mesh2 = new THREE.Mesh(geometry, material)
      // scene.add(mesh2)

      // renderer.render(scene, camera)

      // const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1)
      // const material = new THREE.MeshNormalMaterial()

      // mesh = new THREE.Mesh(geometry, material)

      // console.log('=======scene=========', scene)

      // scene.add(mesh)

      render()

      console.log('-------step2-------', scene)
    }
    // undefined,
    // called while loading is progressing
    // function (xhr) {
    //   console.log('----xhr-----', xhr)
    //   // console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    //   // if ((xhr.loaded / xhr.total) * 100 == 1) {
    //   //   console.log('three true')
    //   // }
    // },
    // // called when loading has errors
    // function (error) {
    //   console.log('An error happened')
    // }
  )
  // })
}

const loadFloorModel = () => {
  gltfLoader.load('pm-processed.gltf', gltf => {
    console.log('----floor gltf-------', gltf)

    gltf.scene.scale.set(0.0008, 0.0008, 0.00084)
    gltf.scene.position.set(-190, -0.1, 5)

    // 91A1AD

    scene.add(gltf.scene)
  })
}

/**
 * 加载gltf压缩后模型
 */
const loadFirstModel = () => {
  for (let i = 1; i <= 12; i++) {
    gltfLoader.load(`2-${i}-processed.gltf`, function (gltf) {
      gltf.scene.traverse(function (child) {
        if (child.isMesh) {
          // child.material .wireframe =true;
          // child.material.shininess = 60;
          // child.name = 'hello' + i
          // child.$data = {
          //   name: `AH8 ${i}`,
          // }
          // objects.push(child)
        }
      })

      // gltf.scene.scale.set(0.0005, 0.0005, 0.0005)
      gltf.scene.scale.set(0.00084, 0.00085, 0.00085)
      // gltf.scene.scale.set(80, 80, 80)

      // gltf.scene.rotation.x = -Math.PI / 2

      // gltf.scene.position.set(1.2, 0, -8.281)
      // gltf.scene.position.set(10, 0, -8.281)
      // gltf.scene.position.set(-200, 0, 0) // 正常
      gltf.scene.position.set(-200, 0, 5) // 正常
      // gltf.scene.rotation.set(-10, 0, 0)

      gltf.scene.name = 'B-' + i

      gltf.$data = {
        name: `BH8 ${i}`,
      }

      gltf.userData = {
        name: `BH` + i,
      }

      scene.add(gltf.scene)

      render()
    })
  }
}

const loadSecondModel = () => {
  for (let i = 1; i <= 26; i++) {
    gltfLoader.load(`1-${i}-processed.gltf`, function (gltf) {
      gltf.scene.traverse(function (child) {
        if (child.isMesh) {
          // objects.push(child)
        }
      })

      // gltf.scene.scale.set(0.0005, 0.0005, 0.0005)
      // gltf.scene.scale.set(0.0008, 0.0008, -0.00084) // -0.00084 代表相反方向
      gltf.scene.scale.set(0.0008, 0.0008, 0.00084)
      // gltf.scene.scale.set(80, 80, 80)

      // gltf.scene.rotation.x = -Math.PI / 2

      // gltf.scene.position.set(1.2, 0, -8.281)
      // gltf.scene.position.set(10, 0, -8.281)
      // gltf.scene.position.set(-200, 0, 0) // 正常
      gltf.scene.position.set(-190, 0, 5) // 正常
      // gltf.scene.rotation.set(-10, 0, 0)

      gltf.scene.name = 'A' + i

      gltf.$data = {
        name: `AH-${i}`,
      }

      gltf.userData = {
        name: `AH` + i,
      }

      scene.add(gltf.scene)

      render()
    })
  }
}

const loadThirdModel = () => {
  for (let i = 1; i <= 12; i++) {
    gltfLoader.load(`3-${i}-processed.gltf`, function (gltf) {
      gltf.scene.traverse(function (child) {
        if (child.isMesh) {
          // child.material .wireframe =true;
          // child.material.shininess = 60;
          // child.name = 'hello' + i
          // child.$data = {
          //   name: `AH8 ${i}`,
          // }
          // objects.push(child)
        }
      })

      gltf.scene.scale.set(0.00084, 0.00085, 0.00085)

      gltf.scene.position.set(-199, 0, 5) // 正常

      gltf.scene.name = 'C' + i

      gltf.$data = {
        name: `CH-${i}`,
      }

      gltf.userData = {
        name: `CH` + i,
      }

      scene.add(gltf.scene)

      render()
    })
  }
}

const assignmentActive = obj => {
  // that.active.color.r = obj.material.color.r;
  // that.active.color.g = obj.material.color.g;
  // that.active.color.b = obj.material.color.b;
  // that.active.aid = obj.id;
  // that.active.cid = obj.parent.id;
  // that.active.fid = obj.parent.parent.id;
}

const changeColor = () => {
  let obj = scene.children

  // console.log(this.group,'changeColor',that.active.fid,that.active.cid,that.active.aid,)

  for (let i = 0; i < obj.length; i++) {
    if (obj[i].id == that.active.cid) {
      for (let j = 0; j < obj[i].children.length; j++) {
        if (obj[i].children[j].id == 1) {
          // console.log(that.active.color.r, that.active.color.g, that.active.color.b, 'changeColor')

          obj[i].children[j].material.color.r = 255
          obj[i].children[j].material.color.g = 255
          obj[i].children[j].material.color.b = 255
        }
      }
    }
  }
}

/**
 * obj模型
 */
const loadBuilding = () => {
  const objLoader = new OBJLoader()
  const mtlLoader = new MTLLoader()

  mtlLoader.load('static/modelss/1-1.mtl', function (materials) {
    console.log('----material-----', materials)

    objLoader.setMaterials(materials)

    objLoader.load('static/modelss/1-1.obj', function (obj) {
      console.log('----object-----', obj)

      obj.scale.set(0.005, 0.005, 0.005)
      obj.position.set(10, -10, 0)

      scene.add(obj)

      render()
    })
  })
}

const initRenderer = () => {
  renderer = new THREE.WebGLRenderer({ antialias: true, alph: true })
  // If texture is used for color information, set colorspace.
  // texture.encoding = THREE.sRGBEncoding

  // // UVs use the convention that (0, 0) corresponds to the upper left corner of a texture.
  // texture.flipY = false

  // 设置背景色
  renderer.setClearColor('#000', 1)

  renderer.setSize(window.innerWidth, window.innerHeight)

  // 处理颜色偏差
  renderer.outputEncoding = THREE.sRGBEncoding

  const container = document.getElementById('container')

  container.appendChild(renderer.domElement)
}

// const initCSSRender = () => {
//   const CSSRender = new CSS2DRenderer()
//   CSSRender.setSize(window.innerWidth, 1080)
//   CSSRender.domElement.style.position = 'absolute'
//   CSSRender.domElement.style.top = 0
//   container.appendChild(CSSRender.domElement)
// }

const render = () => {
  renderer.render(scene, camera)
  // requestAnimationFrame(render)

  // renderer.setAnimationLoop(animation)

  // const controls = new OrbitControls(camera, renderer.domElement)
  // controls.addEventListener('change', renderer) // use if there is no animation loop
  // controls.minDistance = 2
  // controls.maxDistance = 10
  // controls.target.set(0, 0, -0.2)
  // controls.update()

  // window.addEventListener('resize', onWindowResize)
}

const initRaycater = () => {
  raycaster = new THREE.Raycaster()
  mouse = new THREE.Vector3()
}

const clickModel = event => {
  event.preventDefault()

  let x = (event.offsetX / window.innerWidth) * 2 - 1
  let y = -(event.offsetY / window.innerWidth) * 2 + 1 //宽高可根据实际项目要求更改 如果是窗口高度改为innerHeight

  mouse.set(x, y, 0.5)

  raycaster.setFromCamera(mouse, camera)

  // const intersects = raycaster.intersectObject(scene, true)
  const intersects = raycaster.intersectObjects(scene.children, true) //参数1：检测对象，参数2：是否检测该对象的children

  // for (var i = 0; i < intersects.length; i++) {
  //   intersects[i].object.material.color.set(0xff4400)
  // }

  // 判断是否进行了操作
  if (intersects.length) {
    console.log('----intersects----', intersects[0].object.parent)

    render()

    // console.log(intersects[0].object)
    // const resOne = intersects.filter(res => res && res.object)[0]
    // const resTwo = intersects.filter(res => res && res.object)[1]
    // console.log('----resOne----', resOne.object.name)
    // console.log('----resTwo----', resTwo.object.name)
    //将所有的相交的模型的颜色设置为红色
    // for (var i = 0; i < intersects.length; i++) {
    //   intersects[i].object.material.color.set(0xff4400)
    // }
    // console.log(res, 'res', that.active, 'that.active')
    // if (resOne && resOne.object && type === 'Mesh') {
    // console.log('----step222222----', resOne.object.$data)
    //是否为绑定了自定义数据的模型
    // if(!(res.object.material.color.r==1&&res.object.material.color.b==1&&res.object.material.color.g==1)){
    //   that.assignmentActive(res.object);
    // }
    // let res
    // if (resOne.object.name.substring(0, 4) == 'Text') {
    //   res = resTwo
    // } else {
    //   res = resOne
    // }
    // if (that.active.aid) {
    //   if (that.active.aid != res.object.id) {
    //     that.changeColor()
    //     that.assignmentActive(res.object)
    //     res.object.material.color.set(0xffffff)
    //     that.activeCabinetID = res.object.parent.$data.name
    //     that.changeActiveCabinet()
    //   }
    // } else {
    //   that.assignmentActive(res.object)
    //   res.object.material.color.set(0xffffff)
    //   that.activeCabinetID = res.object.parent.$data.name
    //   that.changeActiveCabinet()
    // }
    // if (that.activeCabinetType == 2) {
    //   that.changeActiveCabinet()
    // }
    // }
  }
}

onMounted(() => {
  init()

  // 红色代表 X 轴. 绿色代表 Y 轴. 蓝色代表 Z 轴.
  const axesHelper = new THREE.AxesHelper(500)
  scene.add(axesHelper)

  // loadPlant()

  loadFloorModel()

  loadFirstModel()

  loadSecondModel()

  loadThirdModel()

  // loadBuilding()

  window.addEventListener('resize', onWindowResize)

  window.addEventListener('click', clickModel, false)
})

const initControls = () => {
  // //建立控件对象  相机对象camera做为参数   控件能够监听鼠标的变化，改变相机对象的属性
  controls = new OrbitControls(camera, renderer.domElement)
  // //监听鼠标事件，触发渲染函数，更新canvas画布渲染效果
  controls.addEventListener('change', render)
  // controls.minDistance = 2
  // controls.maxDistance = 10
  controls.target.set(0, 0, -0.2)
  controls.target = new THREE.Vector3(0, 0, 0)

  controls.update()
}

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)

  render()
}

onUnmounted(() => {
  scene = null
  camera = null
  renderer = null
  controls = null

  window.removeEventListener('resize', onWindowResize, false)
  window.removeEventListener('click', clickModel, false)
})

// animation
const animation = time => {
  mesh.rotation.x = time / 2000
  mesh.rotation.y = time / 1000

  renderer.render(scene, camera)
}
</script>
