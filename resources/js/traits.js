new Trait("godMode", "God", "All powerful.", undefined).addModifier("godMode", () => {return true;});
new Trait("essential", "Essential", "Cannot be killed.", undefined).addModifier("essential", () => {return true;});
new CharacterEntityTrait("strong", "Strong", "Strong!", undefined).addModifier("strengthOffset", (n) => {return n + 2;});
new CharacterEntityTrait("weak", "Weak", "Weak.", undefined).addModifier("strengthOffset", (n) => {return n - 2;});
new Trait("infiniteDollarBill", "Infinite Dollar Bill", "It's the inifinite dollar bill!", undefined).addModifier("money", (n) => {return (n == 0 ? 1 : n);});