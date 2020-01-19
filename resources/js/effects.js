new Effect("godMode", "God", "All powerful.", undefined).addModifier("godMode", () => {return true;});
new Effect("essential", "Essential", "Cannot be killed.", undefined).addModifier("essential", () => {return true;});
new Effect("healthy", "Healthy", "Increases maximum health.", undefined).addModifier("healthMaxModifier", (n) => {return n.healthMaxModifier + 5;}).setStackCount(5);
new Effect("strong", "Strong", "Strong!", undefined).addModifier("strengthModifier", (n) => {return n.strengthModifier + 2;});
new Effect("weak", "Weak", "Weak.", undefined).addModifier("strengthModifier", (n) => {return n.strengthModifier - 2;});
new Effect("infiniteDollarBill", "Infinite Dollar Bill", "It's the inifinite dollar bill!", undefined).addModifier("money", (n) => {return (n.money == 0 ? 1 : n.money);});