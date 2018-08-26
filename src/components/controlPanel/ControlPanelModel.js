import AbstractModel from "../../models/AbstractModel";

export default class ControlPanelModel extends AbstractModel {
    constructor(component) {
        super(component);
    }

    /**
     * Set node
     * @param node
     */
    setNode(node) {
        this.getComponent().setNode(node);
    }

    /**
     * Set edit node
     * @param editNode
     */
    setEditNode(editNode) {
        this.getComponent().setEditNode(editNode);
    }
}
