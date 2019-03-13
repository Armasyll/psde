console.log("Initializing items...");

Game.createProtoItem("alBuildingLocationKey", "Pack Street Bldg 3 Key", "A simple key to Pack Street Bldg 3", "keyIcon", "key01", "key", ItemEnum.KEY);
Game.createProtoItem("pandorasBoxLocationKey", "Key to Pandora's Box", "A complex brass key meant for digitigrade mammals to Pandora's Box.", "pandorasBoxLocationKeyIcon", "key01", undefined, ItemEnum.KEY);

Game.createProtoItem("packstreet23StrangeNewDay", "Pack Street Chapter 23", "In the wake of Bellwether's arrest, Remmy takes stock of a changed city.", "packstreet23StrangeNewDayIcon", "bookHardcoverClosed01", "packStreetChapter23", ItemEnum.BOOK);
Game.createProtoItem("packstreet24PaintJob", "Pack Street Chapter 24", "Remmy finds himself doing community service.", "packstreet24StrangeNewDay", "bookHardcoverClosed01Icon", "packStreetChapter24", ItemEnum.BOOK);
Game.createProtoItem("theLesserKeyOfSolomon", "The Lesser Key of Solomon", "The Lesser Key of Solomon, also known as Clavicula Salomonis Regis or Lemegeton, is an anonymous grimoire on demonology. It was compiled in the mid-17th century, mostly from materials a couple of centuries older.", "theLesserKeyOfSolomonIcon", "bookHardcoverClosed01", "theLesserKeyOfSolomon", ItemEnum.BOOK);
Game.createProtoItem("bottle03RedSarcophagusJuice", "Red Sarcophagus Juice", "A small sample of some red liquid from the bottom of an obsidian sarcophagus.", "bottle03RedSarcophagusJuiceIcon", "bottle03", "bottle03RedSarcophagusJuice", ItemEnum.CONSUMABLE);
Game.createProtoItem("bottle04RedSarcophagusJuice", "Red Sarcophagus Juice", "A flask of some red liquid from the bottom of an obsidian sarcophagus.", "bottle04RedSarcophagusJuiceIcon", "bottle04", "bottle03RedSarcophagusJuice", ItemEnum.CONSUMABLE);
Game.createProtoItem("bottle05RedSarcophagusJuice", "Red Sarcophagus Juice", "A bottle of some red liquid from the bottom of an obsidian sarcophagus.", "bottle05RedSarcophagusJuiceIcon", "bottle05", "bottle03RedSarcophagusJuice", ItemEnum.CONSUMABLE);
Game.createProtoItem("mountainChocolateWrapper", "Giant Toblerone", "A giant, delicious toblerone! You don't deserve it, though.", "mountainChocolate01Icon", "mountainChocolateWrapper01", "vChocolateV", ItemEnum.CONSUMABLE);
Game.createProtoItem("mountainChocolateBar", "Giant Toblerone", "A giant, delicious toblerone! You don't deserve it, though.", "mountainChocolate01Icon", "mountainChocolateBar01", "vChocolateV", ItemEnum.CONSUMABLE);
Game.createProtoItem("cheeseWheel", "Cheese Wheel", "A wheel of cheese.", "cheeseWheelIcon", "cheeseWheel", "cheeseWheel", ItemEnum.CONSUMABLE, ConsumableEnum.FOOD);
Game.createProtoItem("cheeseWheelSansWedge", "Partial Cheese Wheel", "A partially cut wheel of cheese.", "cheeseWheelSansWedgeIcon", "cheeseWheelSansWedge", "cheeseWheel", ItemEnum.CONSUMABLE, ConsumableEnum.FOOD);
Game.createProtoItem("cheeseWedge", "Cheese Wedge", "A wedge of cheese.", "cheeseWedgeIcon", "cheeseWedge", "cheeseWheel", ItemEnum.CONSUMABLE, ConsumableEnum.FOOD);

Game.createProtoItem("barbute01", "Barbute", "", "barbute01Icon", "barbute01", undefined, ItemEnum.APPAREL, ApparelSlotEnum.HEAD);
Game.createProtoItem("barbuteHorned01", "Horned Barbute", "", "barbuteHorned01Icon", "barbuteHorned01", undefined, ItemEnum.APPAREL, ApparelSlotEnum.HEAD);
Game.createProtoItem("birdMask01", "Bird Mask", "A mask resembling a bird's beak.", "birdMask01Icon", "birdMask01", undefined, ItemEnum.APPAREL, ApparelSlotEnum.HEAD);
Game.createProtoItem("wizardHat02", "Wizard Hat", "A silly, wide-brimmed hat.", "wizardHat02Icon", "wizardHat02", undefined, ItemEnum.APPAREL, ApparelSlotEnum.HEAD);

Game.createProtoItem("ring01Silver", "Silver Ring", "A simple silver ring.", "ring01SilverIcon", "ring01", "ring02Silver", ItemEnum.APPRAREL, ApparelSlotEnum.FINGERS);
Game.createProtoItem("ring01Gold", "Gold Ring", "A simple gold ring.", "ring01GoldIcon", "ring01", "ring02Gold", ItemEnum.APPRAREL, ApparelSlotEnum.FINGERS);
Game.createProtoItem("ring02SilverRuby", "Silver Ruby Ring", "A silver ring with an inset ruby.", "ring02SilverIcon", "ring02", "ring02Silver", ItemEnum.APPRAREL, ApparelSlotEnum.FINGERS);
Game.createProtoItem("ring02GoldRuby", "Gold Ruby Ring", "A gold ring with an inset ruby.", "ring02GoldIcon", "ring02", "ring02Gold", ItemEnum.APPRAREL, ApparelSlotEnum.FINGERS);
Game.createProtoItem("ring03SilverDRuby", "Damaged Silver Ruby Ring", "A silver ring with a damaged inset ruby.", "ring03SilverDRubyIcon", "ring03", "ring02SilverBrokenRuby", ItemEnum.APPRAREL, ApparelSlotEnum.FINGERS);
Game.createProtoItem("ring03GoldDRuby", "Damaged Gold Ruby Ring", "A gold ring with a damaged inset ruby.", "ring03GoldDRubyIcon", "ring03", "ring02GoldBrokenRuby", ItemEnum.APPRAREL, ApparelSlotEnum.FINGERS);

Game.createProtoItem("bottle01", "Bottle", "A simple bottle.", "bottle01Icon", "bottle01", undefined, ItemEnum.GENERAL);
Game.createProtoItem("cup01", "Cup", "A simple cup.", "cup01Icon", "cup01", undefined, ItemEnum.GENERAL);
Game.createProtoItem("glass01", "Glass", "A simple glass.", "glass01Icon", "glass01", undefined, ItemEnum.GENERAL);
Game.createProtoItem("plate01", "Plate", "A simple plate.", "plate01Icon", "plate01", undefined, ItemEnum.GENERAL);
Game.createProtoItem("trumpet01", "Trumpet", "A simple trumpet.", "trumpet01Icon", "trumpet01", undefined, ItemEnum.GENERAL);

Game.createProtoItem("axe03", "Cheap Axe", "", "axe03Icon", "axe03", undefined, ItemEnum.WEAPON);
Game.createProtoItem("axe01", "Axe", "", "axe01Icon", "axe01", undefined, ItemEnum.WEAPON);
Game.createProtoItem("axe02", "Curved Axe", "", "axe02Icon", "axe02", undefined, ItemEnum.WEAPON);
Game.createProtoItem("battleAxe01", "Double-headed Axe", "", "battleAxe01Icon", "battleAxe01", undefined, ItemEnum.WEAPON);
Game.createProtoItem("cross01", "Cross", "A metal-capped cross.", "cross01Icon", "cross01", "cross01", ItemEnum.WEAPON);
Game.createProtoItem("cudgel01", "Cudgel", "A chunk of metal attached to a stick.", "cudgel01Icon", "cudgel01", undefined, ItemEnum.WEAPON);
Game.createProtoItem("forgeHammer01", "Blacksmith's Hammer", "", "forgeHammer01Icon", "forgeHammer01", undefined, ItemEnum.WEAPON);
Game.createProtoItem("gladius01", "Gladius", "", "gladius01Icon", "gladius01", undefined, ItemEnum.WEAPON);
Game.createProtoItem("glaive01", "Glaive", "", "glaive01Icon", "glaive01", undefined, ItemEnum.WEAPON);
Game.createProtoItem("harpe", "Harpe", "A Sword with a curved falange. Not a harp, the instrument.", "harpeIcon", "harpe", undefined, ItemEnum.WEAPON);
Game.createProtoItem("katana01", "Katana", "", "katana01Icon", "katana01", undefined, ItemEnum.WEAPON);
Game.createProtoItem("knife01", "Knife", "A dull knife.", "knife01Icon", "knife01", undefined, ItemEnum.WEAPON);
Game.createProtoItem("morningstar", "Morningstar", "A spiked mace.", "morningstarIcon", "morningstar", undefined, ItemEnum.WEAPON);
Game.createProtoItem("shortSword01", "Short Sword", "A simple short Sword.", "shortSword01Icon", "shortSword01", undefined, ItemEnum.WEAPON);
Game.createProtoItem("spear01", "Spear", "", "spear01Icon", "spear01", undefined, ItemEnum.WEAPON);
Game.createProtoItem("staff01", "Staff", "A plain staff.", "staff01Icon", "staff01", undefined, ItemEnum.WEAPON);
Game.createProtoItem("staff02", "Staff", "A staff with a forked, circular head.", "staff02Icon", "staff02", undefined, ItemEnum.WEAPON);
Game.createProtoItem("staff03", "Staff", "A staff with a full circle head.", "staff03Icon", "staff03", undefined, ItemEnum.WEAPON);
Game.createProtoItem("staff04", "Staff", "A staff with a hooked head.", "staff04Icon", "staff04", undefined, ItemEnum.WEAPON);
Game.createProtoItem("staff05", "Staff", "A staff with a snake's head.", "staff05Icon", "staff05", undefined, ItemEnum.WEAPON);
Game.createProtoItem("sword01", "Sword", "A simple Sword.", "sword01Icon", "sword01", undefined, ItemEnum.WEAPON);
Game.createProtoItem("wand01", "Wand", "A simple Sword.", "wand01Icon", "wand01", undefined, ItemEnum.WEAPON);
Game.createProtoItem("wand02", "Wand", "A fine Sword.", "wand02Icon", "wand02", undefined, ItemEnum.WEAPON);
Game.createProtoItem("wand03", "Gnarled Wand", "A gnarled wand.", "wand03Icon", "wand03", undefined, ItemEnum.WEAPON);
Game.createProtoItem("warhammer01", "Warhammer", "A dangerous looking, spiked hammer.", "warhammer01Icon", "warhammer01", undefined, ItemEnum.WEAPON);
Game.createProtoItem("woodenMallet", "Wooden Mallet", "A mallet made from unrefined wood.", "mallet01Icon", "mallet01", "woodenMallet", ItemEnum.WEAPON);
Game.createProtoItem("pickaxe01", "Pickaxe", "A pickaxe.", "pickaxe01Icon", "pickaxe01", undefined, ItemEnum.WEAPON);
Game.createProtoItem("stick01", "Short Stick", "A short stick.", "stick01Icon", "stick01", "stick01", ItemEnum.WEAPON);
Game.createProtoItem("stick03", "Stick", "A stick.", "stick03Icon", "stick03", "stick01", ItemEnum.WEAPON);
Game.createProtoItem("stick04", "Long Stick", "A long stick.", "stick04Icon", "stick04", "stick01", ItemEnum.WEAPON);
Game.createProtoItem("stick02", "Broad Stick", "A broad stick.", "stick02Icon", "stick02", "woodenMallet", ItemEnum.WEAPON);
Game.createProtoItem("sticc", "Stick", "A stick.", "stick01Icon", "stick01", "stick01", ItemEnum.WEAPON);
Game.createProtoItem("rocc", "Rock", "A rock.", "rock01Icon", "rock01", "rock01", ItemEnum.WEAPON);

Game.createProtoItem("flawedGem", "Flawed Grey Gem", "A grey gem with a minor imperfection.", "gem03Icon", "gem03", undefined, ItemEnum.GENERAL);
Game.createProtoItem("regularGem", "Regular Grey Gem", "A grey gem of passing quality.", "gem04Icon", "gem04", undefined, ItemEnum.GENERAL);
Game.createProtoItem("exceptionalGem", "Exceptional Grey Gem", "An exceptional, grey-coloured gem.", "gem05Icon", "gem05", undefined, ItemEnum.GENERAL);
Game.createProtoItem("flawlessGem", "Flawless Grey Gem", "A flawless grey gem.", "gem06Icon", "gem06", undefined, ItemEnum.GENERAL);
Game.createProtoItem("perfectGem", "Perfect Grey Gem", "A grey gem of perfect quality.", "gem08Icon", "gem08", undefined, ItemEnum.GENERAL);