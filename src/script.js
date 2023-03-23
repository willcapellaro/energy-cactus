import * as Papa from "papaparse";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";

// the real comment is here
const barColor = "#0047FF";
var weeklyUsage = [0, 0, 0, 0, 0, 0, 0];
var cactusFrondsX = [0, 2, 4, 6, 8, 11, 13];
var weeklyUsageLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
var weeklyUsageGap = [0, 0, 0, 0, 0, 1, 1];
var weeklyUsageZ = [0, 0, 0, 0, 0, -1, -1];
var weeklyUsage2 = [6, 6, 6, 2, 4, 3, 2];

// one more comment

/**
 * Base
 */

/**
 * Debug
 */

// const gui = new dat.GUI();

/**
 * Canvas
 */

const canvas = document.querySelector("canvas.webgl");

/**
 * Scene
 */

let scene = new THREE.Scene();

/**
 * Recreate Scene on File Upload
 */
const input = document.getElementById("gbd");
input.addEventListener(
  "change",
  (event) => {
    const file = event.currentTarget.files[0];
    // Parse CSV
    Papa.parse(file, {
      header: true,
      complete: (results, file) => {
        // Create Scene with parsed data

        // Combine Interval data into a single data point for each date containing total cost and usage values
        const days = {};
        results.data.forEach((interval) => {
          if (!days[interval.DATE]) {
            days[interval.DATE] = {
              date: interval.DATE,
              cost: 0,
              usage: 0,
            };
          }
          days[interval.DATE].cost += Number(interval.COST?.slice(1));
          days[interval.DATE].usage += Number(interval.USAGE);
        });

        // Get all dates
        const dates = Object.keys(days);

        let maxDailyUsage = 0;

        // For each day of the week (Sun = 0, Sat = 6)
        for (let i = 0; i < 7; i++) {
          // Filter down to just the dates that fall on that day
          const dayDates = dates.filter(
            (date) => new Date(date).getDay() === i
          );

          // Set weeklyUsage for that day to the average of those days
          weeklyUsage[i] =
            dayDates.reduce((prev, curr) => (prev += days[curr].usage), 0) /
            dayDates.length;

          // Update the maxDailyUsage
          maxDailyUsage =
            weeklyUsage[i] > maxDailyUsage ? weeklyUsage[i] : maxDailyUsage;
        }

        console.log(weeklyUsage);

        // Scale all values so that maxDailyUsage === 14, the longest arm our cactus supports
        weeklyUsage = weeklyUsage.map(
          (dailyUsage) => dailyUsage / (maxDailyUsage / 14)
        );

        console.log(weeklyUsage);

        // Create our Cactus scene
        scene = new THREE.Scene();

        fontLoader.load("/fonts/MarkOTHeavy_Regular.json", (font) => {
          const textGeometry = new TextGeometry(weeklyUsageLabels[0], {
            font: font,
            size: 0.5,
            height: 0.5,
            curveSegments: 50,
            bevelEnabled: true,
            bevelThickness: 0.001,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 4,
          });
          textGeometry.computeBoundingBox();
          textGeometry.translate(
            -(textGeometry.boundingBox.max.x - 0.02) * 0.5 +
              cactusFrondsX[0] -
              11 +
              textWeekdayX,
            -(textGeometry.boundingBox.max.y - 0.02) * 0.5 +
              weeklyUsage[0] +
              frondTextYoffset,
            -(textGeometry.boundingBox.max.z - 0.03) * 0.5 + textWeekdayZ
          );
          const textMaterial = new THREE.MeshMatcapMaterial({
            matcap: matCapTexture3,
          });
          const text1 = new THREE.Mesh(textGeometry, textMaterial);

          scene.add(text1);

          const textGeometry2 = new TextGeometry(weeklyUsageLabels[1], {
            font: font,
            size: 0.5,
            height: 0.5,
            curveSegments: 50,
            bevelEnabled: true,
            bevelThickness: 0.001,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 4,
          });
          textGeometry2.computeBoundingBox();
          textGeometry2.translate(
            -(textGeometry2.boundingBox.max.x - 0.02) * 0.5 +
              cactusFrondsX[0] -
              9 +
              textWeekdayX,
            -(textGeometry2.boundingBox.max.y - 0.02) * 0.5 +
              weeklyUsage[1] +
              frondTextYoffset,
            -(textGeometry2.boundingBox.max.z - 0.03) * 0.5 + textWeekdayZ
          );
          const text2 = new THREE.Mesh(textGeometry2, textMaterial);
          scene.add(text2);
          // day 3 label
          const textGeometry3 = new TextGeometry(
            weeklyUsageLabels[2], //wednesday Y placement bad
            {
              font: font,
              size: 0.5,
              height: 0.5,
              curveSegments: 50,
              bevelEnabled: true,
              bevelThickness: 0.001,
              bevelSize: 0.02,
              bevelOffset: 0,
              bevelSegments: 4,
            }
          );
          textGeometry3.computeBoundingBox();
          textGeometry3.translate(
            -(textGeometry3.boundingBox.max.x - 0.02) * 0.5 +
              cactusFrondsX[2] -
              11 +
              textWeekdayX,
            -(textGeometry3.boundingBox.max.y - 0.02) * 0.5 +
              weeklyUsage[2] +
              frondTextYoffset,
            -(textGeometry3.boundingBox.max.z - 0.03) * 0.5 + textWeekdayZ
          );
          const text3 = new THREE.Mesh(textGeometry3, textMaterial);
          scene.add(text3);
          // day 4 label
          const textGeometry4 = new TextGeometry(weeklyUsageLabels[3], {
            font: font,
            size: 0.5,
            height: 0.5,
            curveSegments: 50,
            bevelEnabled: true,
            bevelThickness: 0.001,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 4,
          });
          textGeometry4.computeBoundingBox();
          textGeometry4.translate(
            -(textGeometry4.boundingBox.max.x - 0.02) * 0.5 +
              cactusFrondsX[3] -
              11 +
              textWeekdayX,
            -(textGeometry4.boundingBox.max.y - 0.02) * 0.5 +
              weeklyUsage[3] +
              frondTextYoffset,
            -(textGeometry4.boundingBox.max.z - 0.03) * 0.5 + textWeekdayZ
          );
          const text4 = new THREE.Mesh(textGeometry4, textMaterial);
          scene.add(text4);
          // day 5 label
          const textGeometry5 = new TextGeometry(weeklyUsageLabels[4], {
            font: font,
            size: 0.5,
            height: 0.5,
            curveSegments: 50,
            bevelEnabled: true,
            bevelThickness: 0.001,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 4,
          });
          textGeometry5.computeBoundingBox();
          textGeometry5.translate(
            -(textGeometry5.boundingBox.max.x - 0.02) * 0.5 +
              cactusFrondsX[4] -
              11 +
              textWeekdayX,
            -(textGeometry5.boundingBox.max.y - 0.02) * 0.5 +
              weeklyUsage[4] +
              frondTextYoffset,
            -(textGeometry5.boundingBox.max.z - 0.03) * 0.5 + textWeekdayZ
          );
          const text5 = new THREE.Mesh(textGeometry5, textMaterial);
          scene.add(text5);
          // day 6 label
          const textGeometry6 = new TextGeometry(weeklyUsageLabels[5], {
            font: font,
            size: 0.5,
            height: 0.5,
            curveSegments: 50,
            bevelEnabled: true,
            bevelThickness: 0.001,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 4,
          });
          textGeometry6.computeBoundingBox();
          textGeometry6.translate(
            -(textGeometry6.boundingBox.max.x - 0.02) * 0.5 +
              cactusFrondsX[5] -
              11 +
              textWeekdayX,
            -(textGeometry6.boundingBox.max.y - 0.02) * 0.5 +
              weeklyUsage[5] +
              frondTextYoffset,
            -(textGeometry6.boundingBox.max.z - 0.03) * 0.5 + textWeekdayZ
          );
          const text6 = new THREE.Mesh(textGeometry6, textMaterial);
          scene.add(text6);
          // day 7 label
          const textGeometry7 = new TextGeometry(weeklyUsageLabels[6], {
            font: font,
            size: 0.5,
            height: 0.5,
            curveSegments: 50,
            bevelEnabled: true,
            bevelThickness: 0.001,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 4,
          });
          textGeometry7.computeBoundingBox();
          textGeometry7.translate(
            -(textGeometry7.boundingBox.max.x - 0.02) * 0.5 +
              cactusFrondsX[6] -
              11 +
              textWeekdayX,
            -(textGeometry7.boundingBox.max.y - 0.02) * 0.5 +
              weeklyUsage[6] +
              frondTextYoffset,
            -(textGeometry7.boundingBox.max.z - 0.03) * 0.5 + textWeekdayZ
          );
          const text7 = new THREE.Mesh(textGeometry7, textMaterial);
          scene.add(text7);

          // const textGuiFolder = gui.addFolder("Frond Labels");
          // gui;
          // textGuiFolder.add(text2.position, "x", -3, 3);
          // gui;
          // textGuiFolder.add(text2.position, "y", -3, 3);
          // gui;
          // // .add(text2.textGeometry2.Mesh, 'wireframe') //why not working?
          // gui;
          // textGuiFolder.add(text2, "visible");
          // gui;
          // textGuiFolder.add(text1, "visible");
        });

        /**
         * Objects
         */

        const group = new THREE.Group();
        group.position.x = 0;
        group.position.y = -Math.max(...weeklyUsage) / 2 - 2;
        scene.add(group);
        // signage

        const signGroup = new THREE.Group();

        // load a texture, set wrap mode to repeat
        const texture = new THREE.TextureLoader().load("/images/testimg.png");
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1);

        const signGeometry = new THREE.PlaneGeometry(5, 2);
        const material = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          map: texture,
        });
        const sign = new THREE.Mesh(signGeometry, material);
        sign.rotation.x = -1;
        sign.position.x = 1.5;

        const signPole = new THREE.Mesh(
          new THREE.BoxGeometry(0.4, 2, 0.4),
          new THREE.MeshMatcapMaterial({ matcap: matCapTexture3 })
        );
        signPole.position.x = 0;
        signPole.position.y = -1.3;
        signPole.position.z = 0;
        signGroup.add(signPole);

        const signPole2 = new THREE.Mesh(
          new THREE.BoxGeometry(0.4, 2, 0.4),
          new THREE.MeshMatcapMaterial({ matcap: matCapTexture3 })
        );
        signPole2.position.x = 3;
        signPole2.position.y = -1.3;
        signPole2.position.z = 0;
        signGroup.add(signPole2);

        signGroup.add(sign);
        signGroup.position.x = -5.5;
        signGroup.position.y = -7;
        signGroup.position.z = 1;
        scene.add(signGroup);

        // const signFolderFolder = gui.addFolder('Sign Display')
        // gui
        //         signFolderFolder.add(sign.rotation, "x", -10, 10)
        //     gui
        //         signFolderFolder.add(sign.position, "x", -10, 10)
        //     gui
        //         signFolderFolder.add(sign.position, "y", -10, 10)
        //     gui
        //         signFolderFolder.add(sign.position, "z", -10, 10)

        //     const signPoleFolder = gui.addFolder('Sign Pole')

        //     gui
        //     signPoleFolder.add(signPole.position, "x", -10, 10)
        //     gui
        //     signPoleFolder.add(signPole.position, "y", -10, 10)
        //     gui
        //     signPoleFolder.add(signPole.position, "z", -10, 10)

        //     const signGroupFolder = gui.addFolder('Sign Group')

        //     gui
        //     signGroupFolder.add(signGroup.position, "x", -10, 10)
        //     gui
        //     signGroupFolder.add(signGroup.position, "y", -10, 10)
        //     gui
        //     signGroupFolder.add(signGroup.position, "z", -10, 10)

        const platform = [13, 1, 4];

        const dais = new THREE.Mesh(
          new THREE.BoxGeometry(platform[0], platform[1], platform[2]),
          // new THREE.MeshBasicMaterial({ color: 0xBBBBBB, wireframe: false})
          new THREE.MeshMatcapMaterial({ matcap: matCapTexture })
          // wireframe = true;
        );

        dais.position.x = 0;
        dais.position.y = -platform[1] / 2;
        dais.position.z = 0;
        group.add(dais);

        const cactusTrunk = new THREE.Mesh(
          new THREE.BoxGeometry(2, 4, 2),
          new THREE.MeshMatcapMaterial({ matcap: matCapTexture2 })
        );
        cactusTrunk.position.x = 2;
        cactusTrunk.position.y = 2;
        cactusTrunk.position.z = 0;
        // cactusTrunk.center()
        group.add(cactusTrunk);

        const cactusLayer2 = new THREE.Mesh(
          new THREE.BoxGeometry(4, 1, 2),
          new THREE.MeshMatcapMaterial({ matcap: matCapTexture2 })
        );
        cactusLayer2.position.x = 2;
        cactusLayer2.position.y = 4.5;
        cactusLayer2.position.z = 0;
        // cactusTrunk.center()
        group.add(cactusLayer2);

        const cactusLayer3Weekday = new THREE.Mesh(
          new THREE.BoxGeometry(9, 1, 1),
          new THREE.MeshMatcapMaterial({ matcap: matCapTexture2 })
        );
        cactusLayer3Weekday.position.x = -3.5;
        cactusLayer3Weekday.position.y = 5.5;
        cactusLayer3Weekday.position.z = 0.5;
        // cactusTrunk.center()
        group.add(cactusLayer3Weekday);

        const cactusLayer3Weekend = new THREE.Mesh(
          new THREE.BoxGeometry(3, 1, 1),
          new THREE.MeshMatcapMaterial({ matcap: matCapTexture2 })
        );
        cactusLayer3Weekend.position.x = 4.5;
        cactusLayer3Weekend.position.y = 5.5;
        cactusLayer3Weekend.position.z = -0.5;
        // cactusTrunk.center()
        group.add(cactusLayer3Weekend);

        /**
         * Cactus fronds
         *
         */

        // const cactusFrondEx1 = new THREE.Mesh(
        //     new THREE.BoxGeometry(3, 4, 3),
        //     new THREE.MeshMatcapMaterial({ matcap: matCapTexture2})
        // )
        // cactusFrondEx1.position.x = 2
        // cactusFrondEx1.position.y = 2
        // cactusFrondEx1.position.z = 0
        // cactusTrunk.center()
        // group.add(cactusFrondEx1)

        /**
         * Day Branches
         */

        for (let i = 0; i < 7; i++) {
          const day = new THREE.Mesh(
            new THREE.BoxGeometry(1, weeklyUsage[i], 1),
            new THREE.MeshMatcapMaterial({ matcap: matCapTexture2 })
          );
          // day.position.x = i * 1.3

          day.position.x = i * 2 + weeklyUsageGap[i] - 7.5;
          day.position.y = weeklyUsage[i] / 2 + 6;
          day.position.z = weeklyUsageZ[i] + 0.5;
          group.add(day);
        }

        /**
         * Days
         */

        function addSpikes(
          spikesizeX,
          spikesizeY,
          spikesizeZ,
          spikestartX,
          spikestartY,
          spikestartZ,
          spikeSpanX,
          spikeSpanY,
          spikeSpanZ,
          spikeCount,
          spikeLabel
        ) {
          for (let i = 0; i < spikeCount; i++) {
            const trunkSpikeF = new THREE.Mesh(
              new THREE.BoxGeometry(spikesizeX, spikesizeY, spikesizeZ),
              new THREE.MeshMatcapMaterial({ matcap: matCapTexture3 }),
              console.log("yup")
            );
            // trunkSpikeF.position.x = spikestartX
            // trunkSpikeF.position.y = spikestartY
            // trunkSpikeF.position.z = spikestartZ
            trunkSpikeF.position.x = spikestartX + Math.random() * spikeSpanX;
            trunkSpikeF.position.y = spikestartY + Math.random() * spikeSpanY;
            trunkSpikeF.position.z = spikestartZ + Math.random() * spikeSpanZ;

            group.add(trunkSpikeF);

            // const spikeLabelFolder = gui.addFolder(spikeLabel)
            // gui
            //     spikeLabelFolder.add(trunkSpikeF.position, 'x')
            // gui
            //     spikeLabelFolder.add(trunkSpikeF.position, 'y')
            // gui
            //     spikeLabelFolder.add(trunkSpikeF.position, 'z')
          }
        }

        addSpikes(0.2, 0.2, 0.2, 1.1, 0.2, 1.1, 1.9, 4, 0, 5); // trunk
        addSpikes(0.2, 0.2, 0.2, 1.1, 0.2, -1.1, 1.9, 4, 0, 5); // back trunk
        addSpikes(0.2, 0.2, 0.2, -8, 5.2, 1.2, 9, 0.8, 0, 10); // weekday bar

        // addSpikes(0.2, 0.2, 0.2, 0, 0, 0, 0, 0, 0, 1, 'fsfds')

        const yOffset = 5.8;
        const yRatio = 0.015;
        // addSpikes(0.2, 0.2, 0.2, cactusFrondsX[0] - 7.9, (weeklyUsage[0] * yRatio) + yOffset, weeklyUsageZ[0] + 1.15, .8, weeklyUsage[0], 0, 4, 'spikesMon')
        // addSpikes(0.2, 0.2, 0.2, cactusFrondsX[1] - 7.9, (weeklyUsage[1] * yRatio) + yOffset, weeklyUsageZ[1] + 1.15, .8, weeklyUsage[1], 0, 6, 'spikesTue')
        // addSpikes(0.2, 0.2, 0.2, cactusFrondsX[2] - 7.9, (weeklyUsage[2] * yRatio) + yOffset, weeklyUsageZ[2] + 1.15, .8, weeklyUsage[2], 0, 4, 'spikesWed')
        // addSpikes(0.2, 0.2, 0.2, cactusFrondsX[3] - 7.9, (weeklyUsage[3] * yRatio) + yOffset, weeklyUsageZ[3] + 1.15, .8, weeklyUsage[3], 0, 5, 'spikesThu')
        // addSpikes(0.2, 0.2, 0.2, cactusFrondsX[4] - 7.9, (weeklyUsage[4] * yRatio) + yOffset, weeklyUsageZ[4] + 1.15, .8, weeklyUsage[4], 0, 5, 'spikesFri')
        // addSpikes(0.2, 0.2, 0.2, cactusFrondsX[5] - 7.9, (weeklyUsage[5] * yRatio) + yOffset, weeklyUsageZ[5] + 1.15, .8, weeklyUsage[5], 0, 6, 'spikesSat')
        // addSpikes(0.2, 0.2, 0.2, cactusFrondsX[6] - 7.9, (weeklyUsage[6] * yRatio) + yOffset, weeklyUsageZ[6] + 1.15, .8, weeklyUsage[6], 0, 6, 'spikesSun')

        // function addWeeklySpikes(spikeSize,spikeX, ) {
        //     addSpikes(0.2, 0.2, 0.2, cactusFrondsX[0] - 7.9, (weeklyUsage[0] * yRatio) + yOffset, weeklyUsageZ[0] + 1.15, .8, weeklyUsage[0], 0, 4, 'spikesMon')
        // }

        for (let i = 0; i < 7; i++) {
          addSpikes(
            0.2,
            0.2,
            0.2,
            cactusFrondsX[i] - 7.9,
            weeklyUsage[i] * yRatio + yOffset,
            weeklyUsageZ[i] + 1.15,
            0.8,
            weeklyUsage[i],
            0,
            Math.floor(weeklyUsage[i])
          );
        }

        for (let i = 0; i < 7; i++) {
          addSpikes(
            0.2,
            0.2,
            0.2,
            cactusFrondsX[i] - 7.9,
            weeklyUsage[i] * yRatio + yOffset,
            weeklyUsageZ[i] - 0.1,
            0.8,
            weeklyUsage[i],
            0,
            Math.floor(weeklyUsage[i])
          );
        }

        // gui
        //    .add(yOffset.value, 'x')
        // spikesize spikesize spikesize
        // spikestartX spikestartY spikestart Z
        // spikeSpanX spikeSpanY spikeSpanZ
        // spikeCount

        // for(let i = 0; i < 7; i++) {
        //     const day = new THREE.Mesh(
        //         new THREE.BoxGeometry(1, weeklyUsage[i], 1),
        //         new THREE.MeshMatcapMaterial({ matcap: matCapTexture2})
        //     )
        //     // day.position.x = i * 1.3

        //     day.position.x = i * 2 + weeklyUsageGap[i] - 7.5
        //     day.position.y = weeklyUsage[i] / 2 + 6
        //     day.position.z = weeklyUsageZ[i] + .5
        //     group.add(day)
      },
    });
  },
  false
);

/**
 * Textures
 */

const textureLoader = new THREE.TextureLoader();
const matCapTexture = textureLoader.load("/textures/matcaps/8.png"); // 8 = rust
const matCapTexture2 = textureLoader.load("/textures/matcaps/7.png"); // 7 = green
const matCapTexture3 = textureLoader.load("/textures/matcaps/3.png"); // 3 = chrome

/**
 * Axes Helper
 */

// const axesHelper = new THREE.AxesHelper( 5 );
// scene.add( axesHelper );

/**
 * Fonts
 */

const fontLoader = new FontLoader();

const textWeekdayZ = 0.75;
const textWeekdayX = 3.5;
const frondTextYoffset = -2;

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth * 0.65,
  height: window.innerHeight,
};

// console.log('dpr' + window.devicePixelRatio);

window.addEventListener("resize", () => {
  // console.log('window has been resized')
  sizes.width = window.innerWidth * 0.65;
  sizes.height = window.innerHeight;

  //update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// window.addEventListener('dblclick', () =>
// {
//     // console.log('double click')
//     if(!document.fullscreenElement)
//     {
//         // console.log('go fullscreen')
//         canvas.requestFullscreen()
//     }
//     else
//     {
//         // console.log('leave fullscreen')
//         document.exitFullscreen()
//     }
// })

window.addEventListener("click", () => {
  // console.log('click')
  // console.log(weeklyUsage[2])
  // group.position.x = group.position.x - .5

  weeklyUsage[3] = weeklyUsage[3] + 1;
  // console.log(weeklyUsage[3])
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.rotation.y = 0;
camera.position.z = 20;
scene.add(camera);
// camera.lookAt(group)
// camera.lookAt(group)
// gui
//     .add(camera.position, 'x', -10, 10)

//     gui
//     .add(camera.position, 'y', -10, 10)

//     gui
//     .add(camera.position, 'z', -10, 10)

// Controls
const controls = new OrbitControls(camera, canvas);
// controls.enabled = false
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Update objects
  // weeklyUsage[1] == weeklyUsage[1] + elapsedTime * 100
  // group.scale(1, 2, 3)
  // Render
  // group.rotation.y = Math.cos(elapsedTime) * .2
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
