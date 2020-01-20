new Effect("godMode", "God", "All powerful.", undefined).addModifier("godMode", OperationsEnum.SET, () => {return true;});
new Effect("essential", "Essential", "Cannot be killed.", undefined).addModifier("essential", OperationsEnum.SET, () => {return true;});
new Effect("healthy", "Healthy", "Increases maximum health.", undefined).addModifier("maxHealthModifier", OperationsEnum.ADD, 5).setStackCount(5);
new Effect("strong", "Strong", "Strong!", undefined).addModifier("strengthModifier", OperationsEnum.ADD, 2);
new Effect("weak", "Weak", "Weak.", undefined).addModifier("strengthModifier", OperationsEnum.SUBTRACT, 2);
new Effect("infiniteDollarBill", "Infinite Dollar Bill", "It's the inifinite dollar bill!", undefined).addModifier("money", OperationsEnum.SET, (n) => {return (n.money == 0 ? 1 : n.money);});