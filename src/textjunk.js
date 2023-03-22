const fontLoader = new FontLoader()

fontLoader.load(
    '/fonts/MarkOTHeavy_Regular.json',
    (font) =>
    {
        const textGeometryMo = new TextGeometry(
        'Mo',
        {
            font: font,
            size: 1,
            height: 0.2,
            curveSegments: 50,
            bevelEnabled: true,
            bevelThickness: .5,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 4
        }
    )
    textGeometryMo.computeBoundingBox()
    textGeometryMo.translate(
        - (textGeometryMo.boundingBox.max.x - .02) * 0.5 - 9, //needs dynamic placement
        - (textGeometryMo.boundingBox.max.y - .02) * 0.5 + 2,
        - (textGeometryMo.boundingBox.max.z - .03) * 0.5 - 3
    )
        // console.log(textGeometry.boundingBox)
        // textGeometry.center()
        // console.log(textGeometry.boundingBox)



    // const textMaterial = new THREE.MeshBasicMaterial({color: 0x003EDD})
    const textMaterial = new THREE.MeshMatcapMaterial({ matcap: matCapTexture3})
    // textMaterial.color = 'white' // (wrong)
    // textMaterial.wireframe = true
    const text = new THREE.Mesh(textGeometry, textMaterial)
    
    const textGeometryMo = new TextGeometry(
        'Mo',
        {
            font: font,
            size: 1,
            height: 0.2,
            curveSegments: 50,
            bevelEnabled: true,
            bevelThickness: .5,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 4
        }
    )
    textGeometryMo.computeBoundingBox()
    textGeometryMo.translate(
        - (textGeometryMo.boundingBox.max.x - .02) * 0.5 - 9, //needs dynamic placement
        - (textGeometryMo.boundingBox.max.y - .02) * 0.5 + 2,
        - (textGeometryMo.boundingBox.max.z - .03) * 0.5 - 3
    )
    textGeometryTu.computeBoundingBox()
    textGeometryTu.translate(
        - (textGeometryTu.boundingBox.max.x - .02) * 0.5 - 9, //needs dynamic placement
        - (textGeometryTu.boundingBox.max.y - .02) * 0.5 + 2,
        - (textGeometryTu.boundingBox.max.z - .03) * 0.5 - 3
    )
    textGeometryWe.computeBoundingBox()
    textGeometryWe.translate(
        - (textGeometryWe.boundingBox.max.x - .02) * 0.5 - 9, //needs dynamic placement
        - (textGeometryWe.boundingBox.max.y - .02) * 0.5 + 2,
        - (textGeometryWe.boundingBox.max.z - .03) * 0.5 - 3
    )
    textGeometryTh.computeBoundingBox()
    textGeometryTh.translate(
        - (textGeometryTh.boundingBox.max.x - .02) * 0.5 - 9, //needs dynamic placement
        - (textGeometryTh.boundingBox.max.y - .02) * 0.5 + 2,
        - (textGeometryTh.boundingBox.max.z - .03) * 0.5 - 3
    )
    textGeometryFr.computeBoundingBox()
    textGeometryFr.translate(
        - (textGeometryFr.boundingBox.max.x - .02) * 0.5 - 9, //needs dynamic placement
        - (textGeometryFr.boundingBox.max.y - .02) * 0.5 + 2,
        - (textGeometryFr.boundingBox.max.z - .03) * 0.5 - 3
    )
    textGeometrySa.computeBoundingBox()
    textGeometrySa.translate(
        - (textGeometrySa.boundingBox.max.x - .02) * 0.5 - 9, //needs dynamic placement
        - (textGeometrySa.boundingBox.max.y - .02) * 0.5 + 2,
        - (textGeometrySa.boundingBox.max.z - .03) * 0.5 - 3
    )
    textGeometrySu.computeBoundingBox()
    textGeometrySu.translate(
        - (textGeometrySu.boundingBox.max.x - .02) * 0.5 - 9, //needs dynamic placement
        - (textGeometrySu.boundingBox.max.y - .02) * 0.5 + 2,
        - (textGeometrySu.boundingBox.max.z - .03) * 0.5 - 3
    )

    const textMo = new THREE.Mesh(textGeometryMo, textMaterial)
    const textTu = new THREE.Mesh(textGeometryTu, textMaterial)
    const textWe = new THREE.Mesh(textGeometryWe, textMaterial)
    const textTh = new THREE.Mesh(textGeometryTh, textMaterial)
    const textFr = new THREE.Mesh(textGeometryFr, textMaterial)
    const textSa = new THREE.Mesh(textGeometrySa, textMaterial)
    const textSu = new THREE.Mesh(textGeometrySu, textMaterial)
    scene.add(textMo)
    scene.add(textTu)
    scene.add(textWe)
    scene.add(textTh)
    scene.add(textFr)
    scene.add(textSa)
    scene.add(textSu)


    }


)