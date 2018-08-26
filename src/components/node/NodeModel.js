import AbstractModel from "../../models/AbstractModel";
import NodeCollection from "./NodeCollection";
import LineCollection from "../line/LineCollection";

export default class NodeModel extends AbstractModel {
    constructor(component, mindmap) {
        super(component);
        this.parentNodes = new NodeCollection();
        this.childNodes = new NodeCollection();
        this.linesToMe = new LineCollection();
        this.mindmap = mindmap;
    }

    /**
     * Add child node
     * @param childNode {NodeModel}
     * @returns {NodeModel}
     */
    addChild(childNode) {
        let _this = this;
        this.getChildNodes().addNode(childNode);
        childNode.created(function(node) {
            let line = node.getMindmap().getLineFactory().createLine(_this, node);
            line.created(function(line) {
                line.changePosition();
            });
        });

        return this;
    }

    /**
     * Add parent node
     * @param parentNode {NodeModel}
     * @returns {NodeModel}
     */
    addParent(parentNode) {
        this.getParentNodes().addNode(parentNode);

        return this;
    }

    /**
     * Remove child node
     * @param childNode {NodeModel}
     * @returns {NodeModel}
     */
    removeChild(childNode) {
        this.getChildNodes().removeNode(childNode);

        return this;
    }

    /**
     * Remove parent node
     * @param parentNode {NodeModel}
     * @returns {NodeModel}
     */
    removeParent(parentNode) {
        this.getParentNodes().removeNode(parentNode);

        return this;
    }

    /**
     * Get text
     * @returns {string}
     */
    getText() {
        return this.getComponent().getText();
    }

    /**
     * Set text
     * @param text
     * @returns {NodeModel}
     */
    setText(text) {
        this.getComponent().setText(text);

        return this;
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
     * Get parent nodes
     * @returns {NodeCollection}
     */
    getParentNodes() {
        return this.parentNodes;
    }

    /**
     * Get child nodes
     * @returns {NodeCollection}
     */
    getChildNodes() {
        return this.childNodes;
    }

    /**
     * Get lines to me
     * @returns {LineCollection}
     */
    getLinesToMe() {
        return this.linesToMe;
    }

    /**
     * Get mindmap model
     * @returns {MindmapModel}
     */
    getMindmap() {
        return this.mindmap;
    }

    /**
     * Remove node
     */
    remove() {
        this.getMindmap().getNodes().removeNode(this);
    }

    changeDimensions() {
        let $el = this.getComponent().$el;
        let width = $el.offsetWidth;
        let height = $el.offsetHeight;
        this.getDimensions().setDimensions(width, height);
        this.lineClosure(function(line) {
            line.created(function(line) {
                line.changePosition();
            });
        });
    }

    lineClosure(closure) {
        if(typeof closure === 'undefined') {
            throw 'Invalid closure';
        }

        let node = this;
        this.getLinesToMe().itemClosure(function(line) {
            closure(line);
        });
        this.getChildNodes().itemClosure(function(childNode) {
            let lines = childNode.getLinesToMe().filter(line => line.getParentNode().getId() === node.getId());
            for(let index in lines) {
                let line = lines[index];
                closure(line);
            }
        });
    }
}
