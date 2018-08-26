<template>
    <div id="mindmap">
        <div class="container"
             v-bind:style="getStyle"
        >
            <ControlPanelComponent
                    v-bind:mindmap="model"
            ></ControlPanelComponent>
            <div class="lines">
                <LineComponent v-for="line in getLines()"
                               :key="line.getId()"
                               :model="line"
                ></LineComponent>
            </div>
            <div class="nodes">
                <NodeComponent v-for="node in getNodes()"
                               :key="node.getId()"
                               :model="node"
                ></NodeComponent>
            </div>
        </div>
    </div>
</template>

<script>
    import MindmapModel from "./MindmapModel";
    import Position from "../../models/Position";
    import Dimensions from "../../models/Dimensions";
    import NodeComponent from "../node/NodeComponent";
    import LineComponent from "../line/LineComponent";
    import ControlPanelComponent from "../controlPanel/ControlPanelComponent";
    import Data from "../../Data";
    import DragAndDrop from "../../models/DragAndDrop";

    export default {
        name: "MindmapComponent",
        data () {
            return {
                model: new MindmapModel(this),
                position: new Position(),
                dimensions: new Dimensions(),
                dragAndDrop: new DragAndDrop()
            };
        },
        computed: {
            getStyle() {
                return {
                    left: this.getPosition().getX() + 'px',
                    top: this.getPosition().getY() + 'px',
                    width: this.getDimensions().getWidth() + 'px',
                    height: this.getDimensions().getHeight() + 'px'
                }
            }
        },
        mounted () {
            this.getDimensions().setDimensions(4000, 4000);
            this.getPosition().setPosition(-1000, -1000);

            let dragAndDrop = this.dragAndDrop;
            let _this = this;
            document.documentElement.addEventListener('mousemove', function (ev) {
                dragAndDrop.setPosition(ev.x, ev.y);
                _this.dragElement();
            });
            document.documentElement.addEventListener('mouseup', function () {
                dragAndDrop.setMouseDown(false);
                dragAndDrop.setDraging(false);
                dragAndDrop.setTarget(null);
            });
            document.documentElement.addEventListener('mousedown', function (ev) {
                dragAndDrop.setMouseDown(true);
                dragAndDrop.setTarget(ev.target);
                dragAndDrop.setStartPosition(ev.x, ev.y);
            });
            document.documentElement.removeEventListener('mouseleave', function () {
                dragAndDrop.setMouseDown(false);
                dragAndDrop.setDraging(false);
                dragAndDrop.setTarget(null);
            });
            document.documentElement.addEventListener('touchmove', function (ev) {
                dragAndDrop.setPosition(ev.x, ev.y);
                dragAndDrop.setMouseDown(true);
                dragAndDrop.setTarget(ev.target);
                _this.dragElement();
            }, true);
            document.documentElement.addEventListener('touchend touchcancel', function () {
                dragAndDrop.setMouseDown(false);
                dragAndDrop.setDraging(false);
                dragAndDrop.setTarget(null);
            }, true);
            document.documentElement.addEventListener('touchstart', function () {
                dragAndDrop.setMouseDown(false);
                dragAndDrop.setDraging(false);
                dragAndDrop.setTarget(null);
                dragAndDrop.setStartPosition(ev.x, ev.y);
            }, true);

            let data = new Data(this);
            data.createNodes();
        },
        methods: {
            /**
             * Get model
             * @returns {MindmapModel}
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
             * Get Lines
             * @returns {Array}
             */
            getLines() {
                return this.getModel().getLines().getLines();
            },

            /**
             * Get nodes
             * @returns {Array}
             */
            getNodes() {
                return this.getModel().getNodes().getNodes();
            },

            dragElement() {
                let dragAndDrop = this.dragAndDrop;
                if (dragAndDrop.isMouseDown() !== true) {
                    return false;
                }
                let target = dragAndDrop.getTarget();
                if (target === null) {
                    dragAndDrop.setMouseDown(false);
                    return false;
                }
                let nodeId = target.getAttribute('data-id');
                let node = null;
                try {
                    node = this.getModel().getNodes().getNodeById(nodeId);
                } catch (e) {
                    dragAndDrop.setMouseDown(false);
                    return false;
                }
                let startX = dragAndDrop.getStartPosition().getX();
                let startY = dragAndDrop.getStartPosition().getY();
                let nodeX = node.getPosition().getX();
                let nodeY = node.getPosition().getY();

                if (dragAndDrop.isDragging() !== true) {
                    dragAndDrop.setDraging(true);
                    dragAndDrop.setTargetStartPosition(nodeX, nodeY);
                }

                let nodeStartX = dragAndDrop.getTargetStartPosition().getX();
                let nodeStartY = dragAndDrop.getTargetStartPosition().getY();
                let currentX = dragAndDrop.getPosition().getX();
                let currentY = dragAndDrop.getPosition().getY();
                let newNodeX = nodeStartX - (startX - currentX);
                let newNodeY = nodeStartY - (startY - currentY);
                node.getPosition().setPosition(newNodeX, newNodeY);

            }
        },
        components: {
            ControlPanelComponent,
            LineComponent,
            NodeComponent
        }
    }
</script>

<style lang="scss" scoped>
    #mindmap {
        position: relative;
        display: block;
        width: 100%;
        height: 100%;
        overflow: hidden;

        .container {
            position: absolute;
            display: block;
        }
    }
</style>
