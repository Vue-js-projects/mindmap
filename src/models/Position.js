export default class Position {

    constructor() {
        this.x = 0;
        this.y = 0;
    }

    /**
     * Set position
     * @param x {number}
     * @param y {number}
     * @returns {Position}
     */
    setPosition(x, y) {
        this.setX(x);
        this.setY(y);

        return this;
    }

    /**
     * Set y
     * @param x {number}
     * @returns {Position}
     */
    setX(x) {
        this.x = parseInt(x);

        return this;
    }

    /**
     * Set x
     * @param y {number}
     * @returns {Position}
     */
    setY(y) {
        this.y = parseInt(y);

        return this;
    }

    /**
     * Get x
     * @returns {number}
     */
    getX() {
        return parseInt(this.x);
    }

    /**
     * Get y
     * @returns {number}
     */
    getY() {
        return parseInt(this.y);
    }
};
