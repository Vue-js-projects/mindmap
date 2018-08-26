export default class LinePositionCalculator {
    constructor(line) {
        this.line = line;
    }

    /**
     * Calculate line position
     */
    calculate() {
        let childPos = this.getChildNode().getPosition();
        let parentPos = this.getParentNode().getPosition();
        let childDim = this.getChildNode().getDimensions();
        let parentDim = this.getParentNode().getDimensions();
        let cx = childPos.getX();
        let px = parentPos.getX();
        let cy = childPos.getY();
        let py = parentPos.getY();
        let cw = childDim.getWidth();
        let pw = parentDim.getWidth();
        let ch = childDim.getHeight();
        let ph = parentDim.getHeight();
        let x = 0;
        let y = 0;
        let w = 0;
        let h = 0;
        let className = '';
        let widthClassName = '';

        if(cx < px) {
            if(cy < py) {
                y = cy + (ch/2);
                x = cx + cw;
                h = py - y + (ph/2);
                w = px - x;
                className = 'up';
                widthClassName = '-width-long';
                if(w < h) {
                    x = cx + (cw/2);
                    y = cy + (ch);
                    w = px - x + (pw/2);
                    h = py - y;
                    widthClassName = '-height-long';
                }
            } else {
                x = cx + (cw);
                y = py + (ph/2);
                w = px - x;
                h = cy - y + (ch/2);
                className = 'down';
                widthClassName = '-width-long';
                if(w < h) {
                    x = cx + (cw/2);
                    y = py + (ph);
                    w = px - x + (pw/2);
                    h = cy - y;
                    widthClassName = '-height-long';
                }
            }
            className += '-left';
        } else {
            if(cy < py) {
                y = cy + (ch/2);
                x = px + (pw);
                w = cx - px - pw;
                h = py - y + (ph/2);
                className = 'up';
                widthClassName = '-width-long';
                if(w < h) {
                    x = px + (pw/2);
                    y = cy + (ch);
                    w = cx - x + (cw/2);
                    h = py - y;
                    widthClassName = '-height-long';
                }
            } else {
                x = px + pw;
                y = py + (ph/2);
                w = cx - x;
                h = cy - y + (ch/2);
                className = 'down';
                widthClassName = '-width-long';
                if(w < h) {
                    x = px + (pw/2);
                    y = py + (ph);
                    w = cx - x + (cw/2);
                    h = cy - y;
                    widthClassName = '-height-long';
                }
            }
            className += '-right';
        }

        className += widthClassName;

        this.getLine().setClassName(className);
        this.getLine().getPosition().setPosition(x, y);
        this.getLine().getDimensions().setDimensions(w, h);

        let _this = this;
        setTimeout(function() {
            _this.changeCurveWithHeight();
        }, 5);

    }

    changeCurveWithHeight() {
        let el = this.getLine().getComponent().$el;
        let curves = el.getElementsByClassName('curve');
        for(let index in curves) {
            let curve = curves[index];
            if(typeof curve === 'object') {
                let parent = curve.parentElement;
                let pw = parent.clientWidth;
                let ph = parent.clientHeight;
                let d = pw < ph ? pw : ph;
                curve.style.width = d + 'px';
                curve.style.height = d + 'px';
                curve.style.padding = '0';

                this.changeStartEndWidthHeight();
            }
        }
    }

    changeStartEndWidthHeight() {
        let el = this.getLine().getComponent().$el;
        let starts = el.getElementsByClassName('start');
        let ends = el.getElementsByClassName('end');
        let curves = el.getElementsByClassName('curve');
        let start = null;
        let end = null;
        let curve = null;
        for(let index in curves) {
            if(typeof curves[index] === 'object') {
                curve = curves[index];
                break;
            }
        }
        if(!curve) {
            return false;
        }
        let linwWidth = el.clientWidth;
        let lineHeight = el.clientHeight;
        let curveWidth = curve.clientWidth;
        let curveHeight = curve.clientHeight;
        if(curveWidth > linwWidth) {
            curveWidth = linwWidth
        }
        if(curveHeight > lineHeight) {
            curveHeight = lineHeight;
        }
        for(let index in starts) {
            if(typeof starts[index] === 'object') {
                start = starts[index];
                if(start.clientHeight > 0) {
                    start.style.height = 'calc(100% - '+curveHeight+'px)';
                } else if(start.clientWidth > 0) {
                    start.style.width = 'calc(100% - '+curveWidth+'px)';
                }
            }
        }
        for(let index in ends) {
            if(typeof ends[index] === 'object') {
                end = ends[index];
                if(end.clientHeight > 0) {
                    end.style.height = 'calc(100% - '+curveHeight+'px)';
                } else if(end.clientWidth > 0) {
                    end.style.width = 'calc(100% - '+curveWidth+'px)';
                }
            }
        }

        this.getLine().getComponent().visible = true;
    }

    /**
     * Get parent
     * @returns {NodeModel}
     */
    getParentNode() {
        return this.getLine().getParentNode();
    }

    /**
     * Get child
     * @returns {NodeModel}
     */
    getChildNode() {
        return this.getLine().getChildNode();
    }

    /**
     * Get line
     * @returns {LineModel}
     */
    getLine() {
        return this.line;
    }
}
