<template>
    <div class="control-panel"
    >

        <div v-if="isEditNode() === true" class="edit-node">
            <textarea v-model="getNode().getComponent().text" rows="5" title="text"></textarea><br/>
            <input v-model="getNode().getPosition().x" type="number" title="position x"/><br/>
            <input v-model="getNode().getPosition().y" type="number" title="position y"/><br/>
            <button @click="addChild">Add new child</button><br/>
            <button @click="addRelation" v-if="relatinHasBeenAdded === true">Add relation to child node</button>
        </div>

        <div v-if="isEditNode() === false" class="info-edit-node">
            Click a node to edit
        </div>

    </div>
</template>

<script>
    import Position from "../../models/Position";
    import Dimensions from "../../models/Dimensions";
    import ControlPanelModel from "./ControlPanelModel";
    import MindmapModel from "../mindmap/MindmapModel";

    export default {
        name: "ControlPanelComponent",
        data () {
            return {
                editNode: false,
                node: null,
                model: new ControlPanelModel(this),
                position: new Position().setPosition(10, 10),
                dimensions: new Dimensions().setDimensions(300, 45),
                relatinHasBeenAdded: true
            };
        },
        props: {
            mindmap: {
                type: MindmapModel
            }
        },
        computed: {
            getStyle() {
                return {
                    right: this.getPosition().getX() + 'px',
                    top: this.getPosition().getY() + 'px',
                    width: this.getDimensions().getWidth() + 'px',
                    height: this.getDimensions().getHeight() + 'px'
                }
            }
        },
        mounted () {
            this.getMindmap().setControlPanel(this.getModel());
        },
        watch: {

        },
        methods: {
            /**
             * Get model
             * @returns {ControlPanelModel}
             */
            getModel() {
                return this.model;
            },

            /**
             * Get position
             * @returns {Position}
             */
            getPosition() {
                return this.position;
            },

            /**
             * Get dimensions
             * @returns {Dimensions}
             */
            getDimensions() {
                return this.dimensions;
            },

            /**
             * @returns {NodeModel}
             */
            getNode() {
                return this.node;
            },

            /**
             * Set node
             * @param node {NodeModel}
             */
            setNode(node) {
                this.node = node;
            },

            /**
             * Is edit node
             * @returns {Boolean}
             */
            isEditNode() {
                return this.editNode === true;
            },

            /**
             * Set edit node
             */
            setEditNode(editNode) {
                this.editNode = editNode;
            },

            /**
             * Get control panel
             * @returns {ControlPanelModel}
             */
            getControlPanel() {
                return this.getModel()
            },

            /**
             * Get mindmap
             * @returns {MindmapModel}
             */
            getMindmap() {
                return this.mindmap;
            },

            /**
             * Add child
             */
            addChild(e) {
                e.preventDefault();
                let node = this.getNode();
                let nodePosition = node.getPosition();
                let nodeDimension = node.getDimensions();
                let x = nodePosition.getX() + nodeDimension.getWidth() + 100;
                let y = nodePosition.getY() - 75;
                let text = "Text";
                let newNode = this.getMindmap().getNodeFactory().createNode(node);
                newNode.created(function () {
                    newNode.getPosition().setPosition(x, y);
                    newNode.setText(text);
                });

                return false;
            },

            /**
             * Add relation
             */
            addRelation(e) {
                e.preventDefault();

                let thisNode = this.getModel();
                let factory = this.getMindmap().getNodeFactory();
                this.getNode().getComponent().callAddRelation();

                return false;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .control-panel {
        position: fixed;
        display: block;
        right: 10px;
        top: 10px;
        width: 300px;
        border: 1px solid #646464;
        padding: 15px;
        z-index: 1000;

        .info-edit-node {
            height: 50px;
            line-height: 50px;
            vertical-align: middle;
            text-align: center;
        }
    }
</style>
