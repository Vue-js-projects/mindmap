export default class Dimensions {
    constructor() {
        this.width = 0;
        this.height = 0;
    }

    /**
     * Set dimensions
     * @param width {number}
     * @param height {number}
     * @returns {Dimensions}
     */
    setDimensions(width, height) {
        this.setWidth(width);
        this.setHeight(height);

        return this;
    }

    /**
     * Set width
     * @param width {number}
     * @returns {Dimensions}
     */
    setWidth(width) {
        this.width = parseInt(width);

        return this;
    }

    /**
     * Set height
     * @param height {number}
     * @returns {Dimensions}
     */
    setHeight(height) {
        this.height = parseInt(height);

        return this;
    }

    /**
     * Get width
     * @returns {number}
     */
    getWidth() {
        return parseInt(this.width);
    }

    /**
     * Get height
     * @returns {number}
     */
    getHeight() {
        return parseInt(this.height);
    }
}
