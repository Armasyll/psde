/**
 * Babylon Animation Data
 */
class AnimData {
    /**
     * 
     * @param {string} name 
     */
    constructor(name) {
        this.loop = true;
        this.rate = 1;
        this.exist = false;
        this.standalone = true;
        this.name = name;
        this.from = 0;
        this.to = 0;
    }
}