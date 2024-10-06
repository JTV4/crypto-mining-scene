// We define the empty imports so the auto-complete feature works as expected.
import { Vector3 } from '@dcl/sdk/math'
import { engine } from '@dcl/sdk/ecs'

import { changeColorSystem, circularSystem } from './systems'
import { setupUi } from './ui'
import { CryptoRock, CrypoRockGenerator } from './modules/CryptoMiningRock'

export function main() {
  // Defining behavior. See `src/systems.ts` file.
  engine.addSystem(circularSystem)
  engine.addSystem(changeColorSystem)

  // draw UI. Here is the logic to spawn cubes.
  setupUi()


  //new CryptoRock(Vector3.create(25,0,25))  
 // new CryptoRock(Vector3.create(44,0,34)) 
//
 CrypoRockGenerator.spawnRandomCryptoRock();
}
