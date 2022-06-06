const obj2gltf = require('obj2gltf')
const fs = require('fs')
const path = require('path')

console.log('path', path.join(__dirname, '../../../../work/obj'))

// /Users/Lantz/Documents/work/obj

// /Users/Lantz/Documents/Lantz/work/obj

obj2gltf(path.join(__dirname, '../../../../work/obj/1-2.obj')).then(function (gltf) {
  const data = Buffer.from(JSON.stringify(gltf))

  fs.writeFileSync(path.join(__dirname, '../public/static/models/1-2.gltf'), data)
})
