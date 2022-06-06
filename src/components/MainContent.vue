<template>
  <div id="container"></div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

import { OrbitControls } from '@/common/tool/OrbitControls'

let scene = null
let camera = null
let mesh = null
let renderer = null
let raycaster = null
let mouse = null
let controls = null
let selectedModel = {
  color: {
    r: 0,
    g: 0,
    b: 0,
  },
  aid: '',
  cid: '',
  fid: '',
  name: '',
}

const dracoLoader = new DRACOLoader()
const gltfLoader = new GLTFLoader().setPath('static/models/')

dracoLoader.setDecoderPath('node_modules/three/examples/js/libs/draco/')
dracoLoader.setDecoderConfig({ type: 'js' })
dracoLoader.preload()

gltfLoader.setDRACOLoader(dracoLoader)

const init = () => {
  initScene()

  initCamera()

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
  const aspect = 1920 / 993

  // 窗口宽度
  const width = 1920

  // 窗口高度
  const height = 993

  // 窗口宽高比
  const k = width / height

  // 三维场景显示范围控制系数，系数越大，显示的范围越大
  const s = 8

  camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 2000)

  camera.position.set(-50, 1300, -1500)

  // 让相机指向原点
  camera.lookAt(new THREE.Vector3(0, 0, 0))

  const pointLight = new THREE.PointLight(0xafc2db, 1)
  camera.add(pointLight)
}

/**
 * 加载地板模型
 */
const loadFloorModel = () => {
  gltfLoader.load('pm-processed.gltf', gltf => {
    gltf.scene.scale.set(0.00084, 0.001, 0.001)

    //   gltf.scene.position.set(-190, -0.1, 5)
    gltf.scene.position.set(-196.5, -0.1, 4)

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
        }
      })

      gltf.scene.scale.set(0.00084, 0.001, 0.001)
      gltf.scene.position.set(-196.5, 0, 3.8) // 正常
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
        }
      })

      // -0.00084 代表相反方向
      // gltf.scene.scale.set(0.0008, 0.0008, -0.00084)
      gltf.scene.scale.set(0.00084, 0.001, 0.001)

      gltf.scene.position.set(-196.5, 0, 4) // 正常

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
        }
      })

      gltf.scene.scale.set(0.00084, 0.001, 0.001)

      gltf.scene.position.set(-196.5, 0, 3.8) // 正常

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
  selectedModel.color.r = obj.material.color.r
  selectedModel.color.g = obj.material.color.g
  selectedModel.color.b = obj.material.color.b

  selectedModel.aid = obj.id
  selectedModel.cid = obj.parent.id
  selectedModel.fid = obj.parent.parent.id
}

const initRenderer = () => {
  renderer = new THREE.WebGLRenderer({ antialias: true, alph: true })

  // 设置背景色
  renderer.setClearColor('#101E2F', 0.1)

  renderer.setPixelRatio(window.devicePixelRatio)

  renderer.setSize(1920, 993)

  // 处理颜色偏差
  renderer.outputEncoding = THREE.sRGBEncoding

  const container = document.getElementById('container')

  container.appendChild(renderer.domElement)
}

const render = () => {
  renderer.render(scene, camera)
}

const initRaycater = () => {
  raycaster = new THREE.Raycaster()
  mouse = new THREE.Vector2()
}

const changeColor = () => {
  let obj = scene.children

  for (let i = 0; i < obj.length; i++) {
    if (obj[i].id == selectedModel.cid) {
      for (let j = 0; j < obj[i].children.length; j++) {
        if (obj[i].children[j].id == selectedModel.aid) {
          console.log(
            selectedModel.color.r,
            selectedModel.color.g,
            selectedModel.color.b,
            'changeColor'
          )
          obj[i].children[j].material.color.r = selectedModel.color.r
          obj[i].children[j].material.color.g = selectedModel.color.g
          obj[i].children[j].material.color.b = selectedModel.color.b
        }
      }
    }
  }
}

const clickModel = event => {
  event.preventDefault()

  let x = (event.offsetX / 1920) * 2 - 1
  // 宽高可根据实际项目要求更改 如果是窗口高度改为innerHeight
  let y = -(event.offsetY / 993) * 2 + 1

  mouse.set(x, y, 0.5)

  raycaster.setFromCamera(mouse, camera)

  // const intersects = raycaster.intersectObject(scene, true)

  //参数1：检测对象，参数2：是否检测该对象的children
  const intersects = raycaster.intersectObjects(scene.children, true)

  // 判断是否进行了操作
  if (intersects.length) {
    console.log('----intersects----', intersects[0].object.parent)

    const res = intersects[0]

    if (res) {
      if (selectedModel.aid) {
        if (selectedModel.aid !== res.object.id) {
          changeColor()
          assignmentActive(res.object)
          res.object.material.color.set(0xffffff)
          //   activeCabinetID = res.object.parent.$data.name
          //   changeActiveCabinet();
        }
      } else {
        assignmentActive(res.object)
        res.object.material.color.set(0xffffff)
        // activeCabinetID = res.object.parent.$data.name
        // changeActiveCabinet();
      }

      // TODO: 需要render一次
      render()
    }
  }
}

onMounted(() => {
  init()

  // 红色代表 X 轴. 绿色代表 Y 轴. 蓝色代表 Z 轴.
  // const axesHelper = new THREE.AxesHelper(500)
  // scene.add(axesHelper)

  loadFloorModel()

  loadFirstModel()

  loadSecondModel()

  loadThirdModel()

  window.addEventListener('resize', onWindowResize, false)

  // TODO: 两种方式都可以
  renderer.domElement.addEventListener('click', clickModel, false)
  //   window.addEventListener('click', clickModel, false)
})

const initControls = () => {
  // //建立控件对象  相机对象camera做为参数   控件能够监听鼠标的变化，改变相机对象的属性
  controls = new OrbitControls(camera, renderer.domElement)

  // //监听鼠标事件，触发渲染函数，更新canvas画布渲染效果
  controls.addEventListener('change', render)
  // controls.minDistance = 2
  // controls.maxDistance = 10
  //   controls.target.set(0, 0, -0.2)
  controls.target = new THREE.Vector3(0, 0, 0)

  controls.update()
}

const onWindowResize = () => {
  camera.aspect = 1920 / 993
  camera.updateProjectionMatrix()

  renderer.setSize(1920, 993)

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
</script>
