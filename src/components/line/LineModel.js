import AbstractModel from "../../models/AbstractModel";
import LinePositionCalculator from "./LinePositionCalculator";

export default class LineModel extends AbstractModel {
    constructor(component, parentNode, childNode, mindmap) {
        super(component);
        this.parentNode = parentNode;
        this.childNode = childNode;
        this.mindmap = mindmap;
        this.positionCalculator = new LinePositionCalculator(this);
        childNode.getLinesToMe().addLine(this);
    }

    /**
     * Get position
     * @returns {Position}
     */
    getPosition() {
        return this.getComponent().getPosition();
    }

    /**
     * Get dimensions
     * @returns {Dimensions}
     */
    getDimensions() {
        return this.getComponent().getDimensions();
    }

    /**
     * Get class name
     * @returns {string}
     */
    getClassName() {
        return this.getComponent().getClassName();
    }

    /**
     * Set class name
     * @param className
     */
    setClassName(className) {
        this.getComponent().setClassName(className);
    }

    /**
     * Get parent node
     * @returns {NodeModel}
     */
    getParentNode() {
        return this.parentNode;
    }

    /**
     * Get child node
     * @returns {NodeModel}
     */
    getChildNode() {
        return this.childNode;
    }

    /**
     * Get mindmap model
     * @returns {MindmapModel}
     */
    getMindmap() {
       return this.mindmap;
    }

    /**
     * Remove line
     */
    remove() {
        $this.getMindmap().getLines().removeLine(this);
    }

    /**
     * Get line position calculator
     * @returns {LinePositionCalculator}
     */
    getPositionCalculator() {
        return this.positionCalculator;
    }

    changePosition() {
        this.getPositionCalculator().calculate();
    }

    changeDimensions() {

    }
}
