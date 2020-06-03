new Dialogue(
    "charlieTalk",
    "Talk to Charlie",
    function(_them, _you) {
        return "Greetings" + (_you.getLastName() != undefined && _you.getLastName().length > 0 ? (", " + _you.getLastName()) : "") + ".";
    }
);
new Dialogue(
    "charlieKiss",
    "Give Charlie a Kiss",
    function(_them, _you) {
        return "You try to give Charlie a kiss on the lips, but she dodges her head aside and glares at you.";
    }
);
new Dialogue(
    "charlieHug",
    "Give Charlie a Hug",
    "You try to give Charlie a hug, but she moves aside and glares at you."
);
new Dialogue(
    "rosieTalk",
    "Talk to Rosie",
    function(_them, _you) {
        switch(Math.floor((Math.random() * 5) + 1)) {
            case 1 : return "I'm " + _them.getAge() + ", and what is this?";
            case 2 : return "What?";
            case 3 : return "What is this? I don't even...";
            case 4 : return "Where's Melody?";
            case 5 : return "Where's Stan?";
            default : return "Where's the money, Lebowski?";
        }
    }
);
new Dialogue(
    "rinehartTalk",
    "Talk to Rinehart",
    function(_them, _you) {
        if (_them.hasItem("mountainChocolateBar")) {
            return "Oh boy, I love this giant Toblerone.";
        }
        else {
            return "Now we're just lonely people, trying to forget each other's names...";
        }
    }
);
new Dialogue(
    "rinehartTakeChocolate",
    "Steal Giant Toblerone",
    function(_them, _you) {
        var _item = _them.getItem("mountainChocolateBar");
        if (_item instanceof InstancedItemEntity) {
            _them.removeItem(_item);
            _you.addItem(_item);
            return "I guess I didn't deserve that giant Toblerone.";
        }
    }
);
new Dialogue(
    "rinehartSayHi",
    "Say 'Hi'",
    "He says 'Hi' back."
);
new Dialogue(
    "rinehartSayBye",
    "Say 'Bye'",
    "He says 'Bye' back."
);
Dialogue.get("charlieTalk").setOption("charlieKissOption", "charlieKiss");
Dialogue.get("charlieTalk").setOption("charlieHugOption", "charlieHug");

Dialogue.get("rinehartTalk").setOption(
    "rinehartTakeChocolateOption",
    "rinehartTakeChocolate",
    undefined,
    function(_them, _you) {
        if (_them instanceof CharacterEntity) {
            return _them.hasItem("mountainChocolateBar");
        }
        return false;
    }
);
Dialogue.get("rinehartTalk").setOption("rinehartHiOption", "rinehartSayHi");
Dialogue.get("rinehartTalk").setOption("rinehartByeOption", "rinehartSayBye");