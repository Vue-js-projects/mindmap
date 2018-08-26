import Position from "./Position";

export default class DragAndDrop {

    constructor() {
        this.position = new Position();
        this._isMouseDown = false;
        this._isDragging = false;
        this._target = null;
        this._startPosition = new Position();
        this._targetStartPosition = new Position();
    }

    /**
     * Set position
     * @param x
     * @param y
     */
    setPosition(x, y) {
        this.position.setPosition(x, y);
    }

    /**
     * Get position
     * @returns {Position}
     */
    getPosition() {
        return this.position;
    }

    /**
     * Set mouse down
     * @param isMouseDown
     */
    setMouseDown(isMouseDown) {
        this._isMouseDown = isMouseDown;
    }

    /**
     * Is mouse down
     * @returns {boolean}
     */
    isMouseDown() {
        return this._isMouseDown;
    }

    /**
     * Set draggind
     * @param isDragging
     */
    setDraging(isDragging) {
        this._isDragging = isDragging;
    }

    /**
     * Is dragging
     * @returns {boolean}
     */
    isDragging() {
        return this._isDragging;
    }

    /**
     * Set target element
     * @param target
     */
    setTarget(target) {
        this._target = this.getClosest(target, '.node');
    }

    /**
     * Get target element
     * @returns {null}
     */
    getTarget() {
        return this._target;
    }

    /**
     * Set start position
     * @param x
     * @param y
     */
    setStartPosition(x, y) {
        this._startPosition.setPosition(x, y);
    }

    /**
     * Get start position
     * @returns {Position}
     */
    getStartPosition() {
        return this._startPosition;
    }

    /**
     * Set start position
     * @param x
     * @param y
     */
    setTargetStartPosition(x, y) {
        this._targetStartPosition.setPosition(x, y);
    }

    /**
     * Get start position
     * @returns {Position}
     */
    getTargetStartPosition() {
        return this._targetStartPosition;
    }

    /**
     * Get closest element
     * @param elem
     * @param selector
     * @returns {*}
     */
    getClosest(elem, selector) {

        // Element.matches() polyfill
        if (!Element.prototype.matches) {
            Element.prototype.matches =
                Element.prototype.matchesSelector ||
                Element.prototype.mozMatchesSelector ||
                Element.prototype.msMatchesSelector ||
                Element.prototype.oMatchesSelector ||
                Element.prototype.webkitMatchesSelector ||
                function (s) {
                    var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                        i = matches.length;
                    while (--i >= 0 && matches.item(i) !== this) {
                    }
                    return i > -1;
                };
        }

        // Get the closest matching element
        for (; elem && elem !== document; elem = elem.parentNode) {
            if (elem.matches(selector)) return elem;
        }
        return null;

    }
};
