new Effect("godMode", "God", "All powerful.", undefined).addModifier("godMode", () => {return true;});
new Effect("essential", "Essential", "Cannot be killed.", undefined).addModifier("essential", () => {return true;});
new CharacterEntityEffect("strong", "Strong", "Strong!", undefined).addModifier("strengthOffset", (n) => {return n.strengthOffset + 2;});
new CharacterEntityEffect("weak", "Weak", "Weak.", undefined).addModifier("strengthOffset", (n) => {return n.strengthOffset - 2;});
new Effect("infiniteDollarBill", "Infinite Dollar Bill", "It's the inifinite dollar bill!", undefined).addModifier("money", (n) => {return (n.money == 0 ? 1 : n.money);});