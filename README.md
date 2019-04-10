# Pack Street: The Game

<sup>(Not endorsed by TG_Weaver)</sup>

<sup>Really just a testbed for another javascript game thing I've been writing.</sup>

## Covering my rear

All visual assets (images, videos, models) used with permission from their respective owners. All characters, with the exception of Nicholas Wilde, used with permission from their respective owners. Any references to the film Zootopia are used in parody.

Zootopia belongs to Disney, Pack Street (name, setting, specific characters) belongs to TG_Weaver, and I'm sure I'm missing a few other notes.

No money is made from this game, yo.

## About the game

It's a 3D browser-based game written in JavaScript.

It uses `Babylon.JS 3.3.0` (https://github.com/BabylonJS/Babylon.js), models created and exported from `Blender 2.79`, and textures created in `Inkscape 0.92.3`.

<hr/>

## Object Hierarchy
```
->AbstractEntity
|-->Entity
| |--->EntityWithStorage
| |  |---->CharacterEntity
| |  |---->FurnitureEntity
| |
| |--->ItemEntity
| |  |---->ConsumableEntity
| |  |---->KeyEntity
| |  |---->EquipmentEntity
| |      |----->ClothingEntity
| |      |----->WeaponEntity
| |
| |--->SpellEntity
|
|-->InstancedEntity
  |--->InstancedFurnitureEntity
  |--->InstancedItemEntity
     |---->InstancedEquipmentEntity
         |----->InstancedClothingEntity
         |----->InstancedWeaponEntity

->ActionData
->AnimData
->Cosmetic
->Dialogue

->EntityController
|--->CharacterController
|--->FurnitureController
|  |---->DoorController
|  |---->LightingController
|--->ItemController
|  |---->EquipmentController
|      |----->ClothingController
|      |----->WeaponController
|
|--->SpellController

->NetworkController
```