# Pack Street: The Game

<sup>(Not endorsed by TG_Weaver)</sup>

<sup>Really just a testbed for another javascript game thing I've been writing.</sup>

## Covering my rear

All visual assets (images, videos, models) used with permission from their respective owners. All characters, with the exception of Nicholas Wilde, used with permission from their respective owners. Any references to the film Zootopia are used in parody.

Zootopia belongs to Disney, Pack Street (name, setting, specific characters) belongs to TG_Weaver, and I'm sure I'm missing a few other notes.

No money is made from this game, yo.

## About the game

It's a 3D browser-based game written in JavaScript <sup>that requires a web server to access</sup>.

It uses `Babylon.JS 4.1.0` (https://github.com/BabylonJS/Babylon.js), models created and exported from `Blender 2.81`, and textures created in `Inkscape 0.92.3`.

<hr/>

## How To Install

Install Apache2

Install and enable Apache2 mods...

- mod_header or security2
    
- mod_mime

Configure Apache2 site-specific config for...

- AllowOverride FileInfo

- Require all granted

Drop files in publically accessible web directory

Go there

???

It works :V

## Object Hierarchy
```
->CharacterClass
|-->SorcererClass

->AbstractEntity
|-->Entity
| |--->CreatureEntity
| |  |---->CharacterEntity
| |
| |--->FurnitureEntity
| |  |---->DisplayEntity
| |  |---->DoorEntity
| |  |---->Lighting
| |
| |--->ItemEntity
| |  |---->ConsumableEntity
| |  |---->KeyEntity
| |  |---->EquipmentEntity
| |      |----->ClothingEntity
| |           |------>ShieldEntity
| |      |----->WeaponEntity
| |
| |--->SpellEntity
|
|-->InstancedEntity
  |--->InstancedFurnitureEntity
  |--->InstancedItemEntity
     |---->InstancedConsumableEntity
     |---->InstancedEquipmentEntity
     |   |----->InstancedClothingEntity
     |        |------>InstancedShieldEntity
     |   |----->InstancedWeaponEntity
     |---->InstancedKeyEntity

->ActionData
->AnimData
->Cell
->Cosmetic
->Dialogue
->Effect
->Inventory

->EntityController
|-->CreatureController
|  |--->CharacterController
|      |---->CharacterControllerTransform
|      |---->CharacterControllerRigidBody
|-->FurnitureController
|  |--->DisplayController
|  |--->DoorController
|  |--->LightingController
|-->ItemController

->AbstractControls
|-->CharacterControls
|-->EditControls
|-->MenuControls
  |--->DialogueControls
|-->WritingControls

->NetworkController
```