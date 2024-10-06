import { Animator, engine, Entity, GltfContainer, InputAction, MeshCollider, pointerEventsSystem, Transform } from "@dcl/sdk/ecs";
import { Vector3 } from "@dcl/sdk/math";
import { triggerEmote } from '~system/RestrictedActions'




export const rockPositions = [
    {x: 33, y: 0, z: 44},
    {x: 34, y: 4, z: 52},
    {x: 54, y: 4.5,z: 26},
    {x: 20, y: 0, z: 17}
]


export class CrypoRockGenerator {

    static spawnRandomCryptoRock = () => { //should create a rock at a random position in the list of rock positions
        const randomNumber = Math.floor((rockPositions.length - 1)*(Math.random()))
        
        const randomPosition = rockPositions[randomNumber];

        new CryptoRock(Vector3.create(randomPosition.x,randomPosition.y,randomPosition.z))
    }


}


export class CryptoRock {
    _colliderBox: Entity;
    _rootEntity: Entity;
    _deplete1 = { clip: 'deplete1', loop: false, speed: 1 }
    _deplete2 = { clip: 'deplete2', loop: false, speed: 1 }
    _deplete3 = { clip: 'deplete3', loop: false, speed: 1 }

    depletionStep: number = 0;

    constructor(inputPosition: Vector3) {
        const rootEntity = engine.addEntity(); //Creates an empty entity (not placed, no glb model, no interactions)
        GltfContainer.createOrReplace(rootEntity,{src: 'assets/scene/cryptorock.glb'}); //adds the glb model to the entity (still not placed or spawned)
        Transform.createOrReplace(rootEntity, {position: inputPosition}) //makes the position the input position
        
        this._colliderBox = engine.addEntity();

        Transform.createOrReplace(this._colliderBox, {
            position: Vector3.create(0, 0, 0),
            scale: Vector3.create(1,1,1),
            parent: rootEntity
          })
          MeshCollider.setBox(this._colliderBox)
      

        pointerEventsSystem.onPointerDown(
            {
              entity: this._colliderBox,
              opts: {
                button: InputAction.IA_POINTER,
                hoverText: "Dance",
                maxDistance: 6
              }
            },
            (e) => {
              
                this.onClick()
              
            }
        )

        Animator.create(rootEntity, {
            states: [this._deplete1,this._deplete2,this._deplete3]
          })


        this._rootEntity = rootEntity;
    }


    onClick = () => {
        triggerEmote({ predefinedEmote: 'robot' });

        this.depleteRock();
    }


    despawn = () => {
        engine.removeEntity(this._rootEntity);
        //start a timer and respawn after X time
            //any other logic here 
    }



    //Need this to use deplete 1 + deplete 2 + deplete 3 in order, and then dissapear after deplete 3
    depleteRock = () => {

        Animator.stopAllAnimations(this._rootEntity)

        switch(this.depletionStep) {
            case 0:
                Animator.playSingleAnimation(this._rootEntity,'deplete1');
                break;
            case 1: 
                Animator.playSingleAnimation(this._rootEntity,'deplete2');
                break;
            case 2: 
                Animator.playSingleAnimation(this._rootEntity,'deplete3');
                break;
            case 3:
                // remove the rock all together
                this.despawn();
                break;


        }

        this.depletionStep = this.depletionStep + 1;
    }


}