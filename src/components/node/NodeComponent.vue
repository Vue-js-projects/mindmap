<template>
    <div class="node"
         v-bind:data-id="getModel().getId()"
         v-bind:style="getStyle"
         v-bind:id="nodeAttrId"
    >
        <pre class="text">{{ getText() }}</pre>
        <a @click="editNode" v-if="addRelation === false" class="overlay"></a>
        <a @click="callAddRelationCallback" v-if="addRelation === true" class="add-relation">
            Click here
        </a>
    </div>
</template>

<script>
    import Position from "../../models/Position";
    import Dimensions from "../../models/Dimensions";
    import NodeModel from "./NodeModel";

    export default {
        name: "NodeComponent",
        data () {
            return {
                text: "",
                position: new Position(),
                dimensions: new Dimensions(),
                addRelation: false,
                addRelationCallback: null
            };
        },
        props: {
            model: {
                type: NodeModel
            }
        },
        computed: {
            nodeAttrId: function () {
                return 'node-' + this.getModel().getId();
            },
            getStyle() {
                return {
                    left: this.getPosition().getX() + 'px',
                    top: this.getPosition().getY() + 'px'
                }
            }
        },
        mounted () {
            let _this = this;
            this.getModel().setComponent(this);
            this.$nextTick(function() {
                _this.getModel().changeDimensions();
                _this.getModel().callCreated();
            });
        },
        watch: {
            text () {
                this.$nextTick(function() {
                    this.getModel().changeDimensions();
                });
            },
            'position.x' () {
                this.$nextTick(function() {
                    this.getModel().changeDimensions();
                });
            }
        },
        methods: {
            /**
             * Get text
             * @returns {string}
             */
            getText() {
                return this.text;
            },
            /**
             * Set text
             */
            setText(text) {
                this.text = text;
            },
            /**
             * Get model
             * @returns {NodeModel}
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
             * Edit node
             */
            editNode: function (e) {
                if (typeof e !== 'undefined') {
                    e.preventDefault();
                }
                let controlPanel = this.getModel().getMindmap().getControlPanel();
                controlPanel.setNode(this.getModel());
                controlPanel.setEditNode(true);

                return false;
            },

            /**
             * Set add relation
             */
            setAddRelation(addRelation) {
                this.addRelation = addRelation;
            },

            /**
             * Set add relation
             */
            callAddRelation() {
                let thisNode = this.getModel();
                this.getModel().getMindmap().getNodes().itemClosure(function(node) {
                    if(node.getId() !== thisNode.getId()) {
                        node.getComponent().setAddRelation(true);
                    }
                });
            },

            callAddRelationCallback(e) {
                e.preventDefault();
                let mindmap = this.getModel().getMindmap();
                let thisNode = this.getModel();
                let node = mindmap.getControlPanel().getComponent().getNode();
                let factory = mindmap.getNodeFactory();
                factory.addRelation(node, thisNode);
                this.addRelation = false;
                mindmap.getNodes().itemClosure(function(node) {
                    node.getComponent().setAddRelation(false);
                });
                return false;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .node {
        position: absolute;
        text-align: center;
        border: 1px solid #CCC;
        border-radius: 10px;

        .text {
            position: relative;
            padding: 10px;
            margin: 0;
        }

        .overlay,
        .add-relation {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            cursor: move;
        }

        .add-relation {
            background: #fff;
            border-radius: 10px;
            vertical-align: middle;
            line-height: 3em;
        }
    }
</style>
