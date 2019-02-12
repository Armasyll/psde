console.log("Initializing items...");

Game.createProtoItem("alBuildingLocationKey", "Pack Street Bldg 3 Key", "A simple key to Pack Street Bldg 3", "key", "key01", "key", ItemEnum.KEY);
Game.createProtoItem("pandorasBoxLocationKey", "Key to Pandora's Box", "A complex brass key meant for digitigrade mammals to Pandora's Box.", "pandorasBoxLocationKey", "key01", undefined, ItemEnum.KEY);

Game.createProtoItem("packstreet23StrangeNewDay", "Pack Street Chapter 23", "In the wake of Bellwether's arrest, Remmy takes stock of a changed city.", "packstreet23StrangeNewDay", "bookHardcoverClosed01", "packStreetChapter23", ItemEnum.BOOK);
Game.createProtoItem("packstreet24PaintJob", "Pack Street Chapter 24", "Remmy finds himself doing community service.", "packstreet24StrangeNewDay", "bookHardcoverClosed01", "packStreetChapter24", ItemEnum.BOOK);
Game.createProtoItem("theLesserKeyOfSolomon", "The Lesser Key of Solomon", "The Lesser Key of Solomon, also known as Clavicula Salomonis Regis or Lemegeton, is an anonymous grimoire on demonology. It was compiled in the mid-17th century, mostly from materials a couple of centuries older.", "theLesserKeyOfSolomon", "bookHardcoverClosed01", "theLesserKeyOfSolomon", ItemEnum.BOOK);
Game.createProtoItem("bottle03RedSarcophagusJuice", "Red Sarcophagus Juice", "A small sample of some red liquid from the bottom of an obsidian sarcophagus.", "bottle03RedSarcophagusJuice", "bottle03", "bottle03RedSarcophagusJuice", ItemEnum.CONSUMABLE);
Game.createProtoItem("bottle04RedSarcophagusJuice", "Red Sarcophagus Juice", "A flask of some red liquid from the bottom of an obsidian sarcophagus.", "bottle04RedSarcophagusJuice", "bottle04", "bottle03RedSarcophagusJuice", ItemEnum.CONSUMABLE);
Game.createProtoItem("bottle05RedSarcophagusJuice", "Red Sarcophagus Juice", "A bottle of some red liquid from the bottom of an obsidian sarcophagus.", "bottle05RedSarcophagusJuice", "bottle05", "bottle03RedSarcophagusJuice", ItemEnum.CONSUMABLE);
Game.createProtoItem("mountainChocolateWrapper", "Giant Toblerone", "A giant, delicious toblerone! You don't deserve it, though.", "mountainChocolate01", "mountainChocolateWrapper01", "vChocolateV", ItemEnum.CONSUMABLE);
Game.createProtoItem("mountainChocolateBar", "Giant Toblerone", "A giant, delicious toblerone! You don't deserve it, though.", "mountainChocolate01", "mountainChocolateBar01", "vChocolateV", ItemEnum.CONSUMABLE);
Game.createProtoItem("cheeseWheel", "Cheese Wheel", "A wheel of cheese.", "cheeseWheel", "cheeseWheel", "cheeseWheel", ItemEnum.CONSUMABLE, ConsumableEnum.FOOD);
Game.createProtoItem("cheeseWheelSansWedge", "Partial Cheese Wheel", "A partially cut wheel of cheese.", "cheeseWheelSansWedge", "cheeseWheelSansWedge", "cheeseWheel", ItemEnum.CONSUMABLE, ConsumableEnum.FOOD);
Game.createProtoItem("cheeseWedge", "Cheese Wedge", "A wedge of cheese.", "cheeseWedge", "cheeseWedge", "cheeseWheel", ItemEnum.CONSUMABLE, ConsumableEnum.FOOD);

Game.createProtoItem("barbute01", "Barbute", "", "barbute01", "barbute01", undefined, ItemEnum.APPAREL, ApparelSlotEnum.HEAD);
Game.createProtoItem("barbuteHorned01", "Horned Barbute", "", "barbuteHorned01", "barbuteHorned01", undefined, ItemEnum.APPAREL, ApparelSlotEnum.HEAD);
Game.createProtoItem("birdMask01", "Bird Mask", "A mask resembling a bird's beak.", "birdMask01", "birdMask01", undefined, ItemEnum.APPAREL, ApparelSlotEnum.HEAD);
Game.createProtoItem("wizardHat02", "Wizard Hat", "A silly, wide-brimmed hat.", "wizardHat02", "wizardHat02", undefined, ItemEnum.APPAREL, ApparelSlotEnum.HEAD);

Game.createProtoItem("ring01Silver", "Silver Ring", "A simple silver ring.", "ring01Silver", "ring01", "ring02Silver", ItemEnum.APPRAREL, ApparelSlotEnum.FINGERS);
Game.createProtoItem("ring01Gold", "Gold Ring", "A simple gold ring.", "ring01Gold", "ring01", "ring02Gold", ItemEnum.APPRAREL, ApparelSlotEnum.FINGERS);
Game.createProtoItem("ring02SilverRuby", "Silver Ruby Ring", "A silver ring with an inset ruby.", "ring02Silver", "ring02", "ring02Silver", ItemEnum.APPRAREL, ApparelSlotEnum.FINGERS);
Game.createProtoItem("ring02GoldRuby", "Gold Ruby Ring", "A gold ring with an inset ruby.", "ring02Gold", "ring02", "ring02Gold", ItemEnum.APPRAREL, ApparelSlotEnum.FINGERS);
Game.createProtoItem("ring03SilverDRuby", "Damaged Silver Ruby Ring", "A silver ring with a damaged inset ruby.", "ring03SilverDRuby", "ring03", "ring02SilverBrokenRuby", ItemEnum.APPRAREL, ApparelSlotEnum.FINGERS);
Game.createProtoItem("ring03GoldDRuby", "Damaged Gold Ruby Ring", "A gold ring with a damaged inset ruby.", "ring03GoldDRuby", "ring03", "ring02GoldBrokenRuby", ItemEnum.APPRAREL, ApparelSlotEnum.FINGERS);

Game.createProtoItem("bottle01", "Bottle", "A simple bottle.", "bottle01", "bottle01", undefined, ItemEnum.GENERAL);
Game.createProtoItem("cup01", "Cup", "A simple cup.", "cup01", "cup01", undefined, ItemEnum.GENERAL);
Game.createProtoItem("glass01", "Glass", "A simple glass.", "glass01", "glass01", undefined, ItemEnum.GENERAL);
Game.createProtoItem("plate01", "Plate", "A simple plate.", "plate01", "plate01", undefined, ItemEnum.GENERAL);
Game.createProtoItem("trumpet01", "Trumpet", "A simple trumpet.", "trumpet01", "trumpet01", undefined, ItemEnum.GENERAL);

Game.createProtoItem("axe03", "Cheap Axe", "", "axe03", "axe03", undefined, ItemEnum.WEAPON);
Game.createProtoItem("axe01", "Axe", "", "axe01", "axe01", undefined, ItemEnum.WEAPON);
Game.createProtoItem("axe02", "Curved Axe", "", "axe02", "axe02", undefined, ItemEnum.WEAPON);
Game.createProtoItem("battleAxe01", "Double-headed Axe", "", "battleAxe01", "battleAxe01", undefined, ItemEnum.WEAPON);
Game.createProtoItem("cross01", "Cross", "A metal-capped cross.", "cross01", "cross01", "cross01", ItemEnum.WEAPON);
Game.createProtoItem("cudgel01", "Cudgel", "A chunk of metal attached to a stick.", "cudgel01", "cudgel01", undefined, ItemEnum.WEAPON);
Game.createProtoItem("forgeHammer01", "Blacksmith's Hammer", "", "forgeHammer01", "forgeHammer01", undefined, ItemEnum.WEAPON);
Game.createProtoItem("gladius01", "Gladius", "", "gladius01", "gladius01", undefined, ItemEnum.WEAPON);
Game.createProtoItem("glaive01", "Glaive", "", "glaive01", "glaive01", undefined, ItemEnum.WEAPON);
Game.createProtoItem("harpe", "Harpe", "A Sword with a curved falange. Not a harp, the instrument.", "harpe", "harpe", undefined, ItemEnum.WEAPON);
Game.createProtoItem("katana01", "Katana", "", "katana01", "katana01", undefined, ItemEnum.WEAPON);
Game.createProtoItem("knife01", "Knife", "A dull knife.", "knife01", "knife01", undefined, ItemEnum.WEAPON);
Game.createProtoItem("morningstar", "Morningstar", "A spiked mace.", "morningstar", "morningstar", undefined, ItemEnum.WEAPON);
Game.createProtoItem("shortSword01", "Short Sword", "A simple short Sword.", "shortSword01", "shortSword01", undefined, ItemEnum.WEAPON);
Game.createProtoItem("spear01", "Spear", "", "spear01", "spear01", undefined, ItemEnum.WEAPON);
Game.createProtoItem("staff01", "Staff", "A plain staff.", "staff01", "staff01", undefined, ItemEnum.WEAPON);
Game.createProtoItem("staff02", "Staff", "A staff with a forked, circular head.", "staff02", "staff02", undefined, ItemEnum.WEAPON);
Game.createProtoItem("staff03", "Staff", "A staff with a full circle head.", "staff03", "staff03", undefined, ItemEnum.WEAPON);
Game.createProtoItem("staff04", "Staff", "A staff with a hooked head.", "staff04", "staff04", undefined, ItemEnum.WEAPON);
Game.createProtoItem("staff05", "Staff", "A staff with a snake's head.", "staff05", "staff05", undefined, ItemEnum.WEAPON);
Game.createProtoItem("sword01", "Sword", "A simple Sword.", "sword01", "sword01", undefined, ItemEnum.WEAPON);
Game.createProtoItem("wand01", "Wand", "A simple Sword.", "wand01", "wand01", undefined, ItemEnum.WEAPON);
Game.createProtoItem("wand02", "Wand", "A fine Sword.", "wand02", "wand02", undefined, ItemEnum.WEAPON);
Game.createProtoItem("wand03", "Gnarled Wand", "A gnarled wand.", "wand03", "wand03", undefined, ItemEnum.WEAPON);
Game.createProtoItem("warhammer01", "Warhammer", "A dangerous looking, spiked hammer.", "warhammer01", "warhammer01", undefined, ItemEnum.WEAPON);
Game.createProtoItem("woodenMallet", "Wooden Mallet", "A mallet made from unrefined wood.", "mallet01", "mallet01", "woodenMallet", ItemEnum.WEAPON);
Game.createProtoItem("sticc", "Stick", "A stick.", "stick01", "stick01", "stick", ItemEnum.WEAPON);

Game.createProtoItem("flawedGem", "Flawed Grey Gem", "A grey gem with a minor imperfection.", "gem03Icon", "gem03", undefined, ItemEnum.GENERAL);
Game.createProtoItem("regularGem", "Regular Grey Gem", "A grey gem of passing quality.", "gem04Icon", "gem04", undefined, ItemEnum.GENERAL);
Game.createProtoItem("exceptionalGem", "Exceptional Grey Gem", "An exceptional, grey-coloured gem.", "gem05Icon", "gem05", undefined, ItemEnum.GENERAL);
Game.createProtoItem("flawlessGem", "Flawless Grey Gem", "A flawless grey gem.", "gem06Icon", "gem06", undefined, ItemEnum.GENERAL);
Game.createProtoItem("perfectGem", "Perfect Grey Gem", "A grey gem of perfect quality.", "gem08Icon", "gem08", undefined, ItemEnum.GENERAL);