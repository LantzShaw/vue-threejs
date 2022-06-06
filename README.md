# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)





**文章参考**

https://blog.csdn.net/qq_42987283/article/details/122728409

https://blog.csdn.net/qq_30100043/article/details/79054862?spm=1001.2101.3001.6650.6&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-6-79054862-blog-113373093.pc_relevant_antiscanv2&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-6-79054862-blog-113373093.pc_relevant_antiscanv2&utm_relevant_index=13


https://blog.csdn.net/ithanmang/article/details/80897888?spm=1001.2101.3001.6650.2&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-2-80897888-blog-118548928.pc_relevant_paycolumn_v3&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-2-80897888-blog-118548928.pc_relevant_paycolumn_v3&utm_relevant_index=5


https://blog.csdn.net/weixin_43081805/article/details/88672290


https://blog.csdn.net/qq_44787943/article/details/115672140

https://blog.csdn.net/weixin_41111068/article/details/81213950


**点击事件**
https://blog.csdn.net/Beam007/article/details/106838433



```sh
# obj
$ obj2gltf -i 1-9.obj -o ../gltf/1-9.gltf

# gltf 
$ gltf-pipeline -i pm.gltf -o ../../Lantz/vue/vue-threejs/public/static/models/pm-processed.gltf -d
```

### Record

1. `obj2gltf`转的gltf格式的模型，只有通过`gltf-pipeline`压缩后才能被`GLTFLoader().load()`加载

2. `.gltf`文件需要放在`static`文件夹下，vue等脚手架项目，需要放在`publick/static/`文件夹下

3. 可能要用到的一些loader

```js
// OBJLoader与MTLLoader会结合使用
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader' // 加载mtl

// example: 
const loadBuilding = () => {

// 可以放在全局声明
const objLoader = new OBJLoader()
const mtlLoader = new MTLLoader()

    // static/modelss/1-1.mtl 文件放在了public下，注意不要加public
  mtlLoader.load('static/models/1-1.mtl', function (materials) {
    console.log('----material-----', materials)

    objLoader.setMaterials(materials)

    objLoader.load('static/models/1-1.obj', function (obj) {
      console.log('----object-----', obj)

      obj.scale.set(0.005, 0.005, 0.005)
      obj.position.set(10, -10, 0)

      scene.add(obj)

    // 添加了模型render()一次
      render()
    })
  })
}


// GLTFLoader与DRACOLoader结合使用
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader' // 加载gltf
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader' // 将压缩了的gltf，进行解密


// 可以放在全局声明
const loadFloorModel = () => {
const dracoLoader = new DRACOLoader()
const gLTFLoader = new GLTFLoader().setPath('static/models/')

dracoLoader.setDecoderPath('node_modules/three/examples/js/libs/draco/')
dracoLoader.setDecoderConfig({ type: 'js' })
dracoLoader.preload()

gLTFLoader.setDRACOLoader(dracoLoader)

  gltfLoader.load('pm-processed.gltf', gltf => {
    gltf.scene.scale.set(0.00084, 0.001, 0.001)

    gltf.scene.position.set(-196.5, -0.1, 4)

    scene.add(gltf.scene)
  })
}


import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
```

4. 外部加载成功，但是页面上看不到模型

原因很可能是模型太小了

- 首先，打开network检查资源是否加载成功
- 确保， 可以设置辅助线
```sh
# 红色代表 X 轴. 绿色代表 Y 轴. 蓝色代表 Z 轴.
const axesHelper = new THREE.AxesHelper(500)
scene.add(axesHelper)
  ```
- 将camera看向原点
```js
  cosnt width = window.innerWidth // 窗口宽度
  cosnt height = window.innerHeight // 窗口高度
  cosnt k = width / height // 窗口宽高比
  cosnt s = 5 // 三维场景显示范围控制系数，系数越大，显示的范围越大

  camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 2000)

  camera.position.set(-1000, 800, -1500)

camera.lookAt(new THREE.Vector3(0, 0, 0)) // 让相机指向原点
const pointLight = new THREE.PointLight(0xffffff, 1)
camera.add(pointLight)
```

- 设置OrbitControls，可以进行缩放，一直缩小查看

```js
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
```
- 在gltfLoader.load()中，设置gltf的scale，如下所示:

```js
 gltfLoader.load('pm-processed.gltf', gltf => {
    // 设置scale属性，参数大小根据模型自行设置
    gltf.scene.scale.set(0.00084, 0.001, 0.001)

    gltf.scene.position.set(-196.5, -0.1, 4)

    scene.add(gltf.scene)
  })
```

5. 外部模型点击事件，更改颜色

确保当前视野下，看到的模型与其他模型不会重叠，不然点击会有问题，

```js
const initRaycater = () => {
  raycaster = new THREE.Raycaster()
  mouse = new THREE.Vector2()
}

//  点击事件
const clickModel = event => {
event.preventDefault()

let x = (event.offsetX / 1920) * 2 - 1
let y = -(event.offsetY / 993) * 2 + 1 //宽高可根据实际项目要求更改 如果是窗口高度改为innerHeight

mouse.set(x, y, 0.5)

raycaster.setFromCamera(mouse, camera)

// 参数1：检测对象，参数2：是否检测该对象的children
const intersects = raycaster.intersectObjects(scene.children, true) 



// 判断是否进行了操作
if (intersects.length) {
const res = intersects[0]

if (res) {
    if (selectedModel.aid) {
    if (selectedModel.aid !== res.object.id) {
        changeColor()
        assignmentActive(res.object)
        res.object.material.color.set(0xffffff)
        //   activeCabinetID = res.object.parent.name
    }
    } else {
    assignmentActive(res.object)
    res.object.material.color.set(0xffffff)
    // activeCabinetID = res.object.parent.name
    }

    // TODO: 需要render一次
    render()

}
}
}
```

6. 两种方式都可以
```js
renderer.domElement.addEventListener('click', clickModel, false)
//   window.addEventListener('click', clickModel, false)
```