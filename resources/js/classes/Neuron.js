/**
 * Neuron
 * @class
 * @typedef {Object} Neuron
 */
class Neuron {
    constructor() {
        this.id = Tools.genUUIDv4();
        this.currentValue = 0;
        this.lastValue = 0;
        this.childNeurons = {};
        this.parentNeurons = {};
    }
    add(neuron) {
        this.childNeurons[neuron.id] = neuron;
        neuron.parentNeurons[this.id] = this;
    }
    fire() {
        let value = 0;
        let count = Object.keys(this.parentNeurons).length;
        for (let neuron in this.parentNeurons) {
            value += this.parentNeurons[neuron].currentValue
        }
        if (value < 0) {
            return -1;
        }
        else if (value > Number.parseInt(count / 2)) {
            return 1;
        }
        else {
            return 0;
        }
    }
    update() {
        this.lastValue = this.currentValue;
        this.currentValue = this.fire();
    }
    static create() {
        let neuron = new Neuron();
        neuron.add(new Neuron());
        neuron.add(new Neuron());
    }
}