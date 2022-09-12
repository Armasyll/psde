class _babylon_gui_triangle extends BABYLON.GUI.Container {
    constructor(name) {
        super(name);
        this.name = name;
        this.thickness = 1;
        this.cornerRadius = 0;
    }
    
    _getTypeName() {
        return "Triangle";
    }
    _localDraw(context) {
        context.save();
        if (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) {
            context.shadowColor = this.shadowColor;
            context.shadowBlur = this.shadowBlur;
            context.shadowOffsetX = this.shadowOffsetX;
            context.shadowOffsetY = this.shadowOffsetY;
        }
        if (this._background) {
            context.fillStyle = this._background;
            if (this.cornerRadius) {
                //this._drawRoundedTri(context, this.thickness / 2);
                this._drawTri(context, this.thickness / 2);
                context.fill();
            }
            else {
                //context.fillRect(this._currentMeasure.left, this._currentMeasure.top, this._currentMeasure.width, this._currentMeasure.height);beginPath();
                this._drawTri(context, this.thickness / 2);
            }
        }
        if (this.thickness) {
            if (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) {
                context.shadowBlur = 0;
                context.shadowOffsetX = 0;
                context.shadowOffsetY = 0;
            }
            if (this.color) {
                context.strokeStyle = this.color;
            }
            context.lineWidth = this.thickness;
            if (this.cornerRadius) {
                //this._drawRoundedTri(context, this.thickness / 2);
                this._drawTri(context, this.thickness / 2);
                context.stroke();
            }
            else {
                this._drawTri(context, this.thickness / 2);
                context.stroke();
            }
        }
        context.restore();
    };
    _additionalProcessing(parentMeasure, context) {
        super._additionalProcessing.call(this, parentMeasure, context);
        this._measureForChildren.width -= 2 * this.thickness;
        this._measureForChildren.height -= 2 * this.thickness;
        this._measureForChildren.left += this.thickness;
        this._measureForChildren.top += this.thickness;
    };
    _drawTri(context, offset) {context.moveTo(75, 50);
        let x = this._currentMeasure.left + offset;
        let y = this._currentMeasure.top + offset;
        let width = this._currentMeasure.width - offset * 2;
        let height = this._currentMeasure.height - offset * 2;
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x + width, y);
        context.lineTo(x, y + height);
        context.lineTo(x, y - height);
        context.fill();
    }
    _clipForChildren(context) {
        if (this.cornerRadius) {
            //this._drawRoundedTri(context, this.thickness);
            this._drawTri(context, this.thickness);
            context.clip();
        }
    }
}
BABYLON.GUI.Triangle = _babylon_gui_triangle;