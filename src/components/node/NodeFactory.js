import NodeModel from "./NodeModel";

export default class NodeFactory {
    constructor(mindmapModel) {
        this.mindmapModel = mindmapModel;
    }

    /**
     * Create new node
     * @param parentNode {NodeModel}
     * @param childNode {NodeModel}
     * @returns {NodeModel}
     */
    createNode(parentNode, childNode) {
        let newNode = new NodeModel(null, this.getMindmap());
        let countItems = this.getMindmap().getNodes().count();
        let lastItem = this.getMindmap().getNodes().getItem(countItems-1);
        let id = (typeof lastItem !== 'undefined' && lastItem !== null ? lastItem.getId() : 0) + 1;
        newNode.setId(id);
        this.getMindmap().getNodes().addNode(newNode);

        this.addRelation(parentNode, newNode);

        if(typeof childNode !== 'undefined' && childNode !== null) {
            this.addRelation(newNode, childNode);
            childNode.removeParent(parentNode);
            parentNode.removeChild(childNode);
        }

        return newNode;
    }

    addRelation(parentNode, childNode) {
        if(typeof parentNode !== 'undefined' && parentNode !== null &&
            typeof childNode !== 'undefined' && childNode !== null
        ) {
            childNode.addParent(parentNode);
            parentNode.addChild(childNode);
        }
    }

    /**
     * Get mindmap model
     * @returns {MindmapModel}
     */
    getMindmap() {
        return this.mindmapModel;
    }
}
