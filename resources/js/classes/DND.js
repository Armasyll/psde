/**
 * DND methods
 * @class
 * @typedef {Object} DND
 */
class DND {
    /**
     * Roll a die
     * @param {number} die Number of times to roll
     * @param {number} faces Number of faces
     * @param {RollEnum} rollType 
     */
    static roll(die = 1, faces = 6, rollType = RollEnum.TOTAL) {
        let result = 1.0;
        switch (rollType) {
            case RollEnum.TOTAL: {
                let total = 0;
                for (let i = 0; i < die; i++) {
                    total += Math.ceil(Math.random() * faces);
                }
                result = Number.parseFloat(total);
                break;
            }
            case RollEnum.MIN: {
                let min = 1;
                let roll = 0;
                for (let i = 0; i < die; i++) {
                    roll = Math.ceil(Math.random() * faces);
                    if (roll < min) {
                        min = roll;
                    }
                }
                result = Number.parseFloat(min);
                break;
            }
            case RollEnum.AVG: {
                let total = 0;
                for (let i = 0; i < die; i++) {
                    total += Math.ceil(Math.random() * faces);
                }
                result = Number.parseFloat(total / die);
                break;
            }
            case RollEnum.MAX: {
                let max = 1;
                let roll = 0;
                for (let i = 0; i < die; i++) {
                    roll = Math.ceil(Math.random() * faces);
                    if (roll > max) {
                        max = roll;
                    }
                }
                result = Number.parseFloat(max);
                break;
            }
        }
        return result;
    }
}