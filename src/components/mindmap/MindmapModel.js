import AbstractModel from "../../models/AbstractModel";
import NodeCollection from "../node/NodeCollection";
import LineCollection from "../line/LineCollection";
import NodeFactory from "../node/NodeFactory";
import LineFactory from "../line/LineFactory";

export default class MindmapModel extends AbstractModel {
    constructor(component) {
        super(component);
        this.nodes = new NodeCollection();
        this.lines = new LineCollection();
        this.nodeFactory = new NodeFactory(this);
        this.lineFactory = new LineFactory(this);
        this.controlPanel = null;
    }

    /**
     * Get control panel
     * @returns {*|ControlPanelModel}
     */
    getControlPanel() {
        return this.controlPanel;
    }

    /**
     * Set control panel
     * @param controlPanel {ControlPanelModel}
     */
    setControlPanel(controlPanel) {
        this.controlPanel = controlPanel;
    }

    /**
     * Get nodes
     * @returns {NodeCollection}
     */
    getNodes() {
        return this.nodes;
    }

    /**
     * Get lines
     * @returns {LineCollection}
     */
    getLines() {
        return this.lines;
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
     * Get node factory
     * @returns {NodeFactory}
     */
    getNodeFactory() {
        return this.nodeFactory;
    }

    /**
     * Get line factory
     * @returns {LineFactory}
     */
    getLineFactory() {
        return this.lineFactory;
    }

}
