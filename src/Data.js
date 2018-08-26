import AbstractModel from "./models/AbstractModel";
import NodeFactory from "./components/node/NodeFactory";

export default class Data extends AbstractModel {
    constructor(component) {
        super(component);
    }

    createNodes() {
        let _this = this;
        let rootNode = this.addNode(null, 1500, 1500, "This is\nRoot Node version 0.0.0.1\nx", function(node) {
            let n1 = _this.addNode(node, 1118, 1645, "This is\nNode nr 1", function(node) {
                let n3 = _this.addNode(node, 1900, 1450, "This is\nNode nr 3");
                let n7 = _this.addNode(node, 1200, 1900, "This is\nNode nr 7 aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
                _this.getFactory().addRelation(n3, n7);
            });
            let n2 = _this.addNode(node, 1950, 1300, "This is\nNode nr 2\n version 0.0.0.1\na\na\na");
            _this.getFactory().addRelation(n1, n2);
            // _this.addNode(node, 1900, 1500, "This is\nNode nr 3");
            let n4 =_this.addNode(node, 1925, 1700, "This is\nNode nr 4\na\na");
            _this.getFactory().addRelation(n2, n4);
            let n5 = _this.addNode(node, 1800, 1900, "This is\nNode nr 5");
            _this.getFactory().addRelation(n4, n5);
            let n6 = _this.addNode(node, 1641, 1900, "This is\nNode nr 6");
            // _this.addNode(node, 1100, 1900, "This is\nNode nr 7 aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
            let n8 = _this.addNode(node, 1100, 1700, "This is\nNode nr 8\n version 0.0.0.1\na\na\na");
            let n9 = _this.addNode(node, 1100, 1450, "This is\nNode nr 9");
            let n10 = _this.addNode(node, 1000, 1300, "This is\nNode nr 10 version 0.0.0.1\na\na\na");
            let n11 = _this.addNode(node, 1250, 1100, "This is\nNode nr 11");
            _this.getFactory().addRelation(n2, n11);
            let n12 = _this.addNode(node, 1641, 1100, "This is\nNode nr 12");
            _this.getFactory().addRelation(n2, n12);
        });
    }

    /**
     * Get model
     * @returns {MindmapModel}
     */
    getModel() {
        return this.getComponent().getModel();
    }

    addNode(parentNode, x, y, text, closure) {
        let newNode = this.getFactory().createNode(parentNode);
        newNode.created(function () {
            newNode.getPosition().setPosition(x, y);
            newNode.setText(text);

            if (typeof closure !== 'undefined') {
                closure(newNode);
            }
        });
        return newNode;
    }

    /**
     * Get factory
     * @returns {NodeFactory}
     */
    getFactory() {
        return this.getModel().getNodeFactory();
    }
}
