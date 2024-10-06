import { Vector3 } from "@dcl/sdk/math";
import { CryptoRock, CryptoRockGenerator } from "../modules/CryptoMiningRock";


export const SpawnRocks = () => {
    new CryptoRock(Vector3.create(25,0,25))  
    new CryptoRock(Vector3.create(44,0,34)) 
   
    CryptoRockGenerator.spawnRandomCryptoRock();
}