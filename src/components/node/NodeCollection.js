import Collection from "../../collections/Collection";

export default class NodeCollection extends Collection {

    /**
     * add node
     * @param node
     */
    addNode(node) {
        this.addItem(node);
    }

    /**
     * Get nodes
     * @returns {Array}
     */
    getNodes() {
        return this.getItems();
    }

    /**
     * Remove node
     * @param node {NodeModel}
     * @returns {NodeCollection}
     */
    removeNode(node) {
        let index = this.getItems().findIndex(item => item.getId() === node.getId());
        if(index) {
            this.getItems().splice(index, 1);
        }
        return this;
    }

    getNodeById(id) {
        let index = this.getItems().findIndex(item => item.getId() === parseInt(id));
        return this.getItem(index);
    }
}
