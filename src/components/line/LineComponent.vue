<template>
    <div class="line"
         v-bind:class="className"
         v-bind:style="getStyle"
    >
        <div class="top-line">
            <div class="start"></div>
            <div class="curve">
                <div class="border"></div>
            </div>
            <div class="end"></div>
        </div>
        <div class="bottom-line">
            <div class="start"></div>
            <div class="curve">
                <div class="border"></div>
            </div>
            <div class="end"></div>
        </div>
    </div>
</template>

<script>
    import Position from "../../models/Position";
    import Dimensions from "../../models/Dimensions";
    import LineModel from "./LineModel";

    export default {
        name: "LineComponent",
        data () {
            return {
                position: new Position(),
                dimensions: new Dimensions(),
                className: '',
                visible: false
            };
        },
        props: {
            model: {
                type: LineModel
            }
        },
        computed: {
            getStyle() {
                return {
                    left: this.getPosition().getX() + 'px',
                    top: this.getPosition().getY() + 'px',
                    width: this.getDimensions().getWidth() + 'px',
                    height: this.getDimensions().getHeight() + 'px',
                    display: this.visible === true ? 'block' : 'none'
                }
            }
        },
        mounted() {
            let _this = this;
            this.getModel().setComponent(this);
            this.$nextTick(function() {
                _this.getModel().callCreated();
            });
        },
        methods: {
            /**
             * Get model
             * @returns {LineModel}
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
             * Get class name
             * @returns {string}
             */
            getClassName() {
                return this.className
            },

            /**
             * Set class name
             * @param className
             */
            setClassName(className) {
                this.className = className;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .line {
        $borderWidth: 2px;
        $borderColor: #999;
        $curveHeight: 90%;
        $defaultCurveWidth: 1px;

        position: absolute;
        display: block;

        &.up-left-width-long,
        &.up-left-height-long,
        &.up-right-width-long,
        &.up-right-height-long,
        &.down-left-width-long,
        &.down-left-height-long,
        &.down-right-width-long,
        &.down-right-height-long {
            display: block;
        }

        .top-line,
        .bottom-line {
            $width: calc(50% + #{$borderWidth/2});
            position: absolute;
            display: block;
            height: $width;
            width: $width;
            box-sizing: border-box;
            overflow: hidden;

            .start,
            .curve,
            .end {
                box-sizing: border-box;
                position: absolute;
                display: block;
                overflow: hidden;
                border: 0 solid $borderColor;
                width: 0;
                height: 0;
            }

            .curve {
                $width: 90%;
                width: $width;
                padding-top: $width;
                height: auto;
                z-index: 10;

                .border {
                    position: absolute;
                    display: block;
                    $width: 200%;
                    width: 200%;
                    height: 200%;
                    border: 0 solid $borderColor;
                    border-radius: 50%;
                }
            }
        }

        .bottom-line {
            bottom: 0;
        }

        @mixin curve-border($borderWidth, $borderRadius, $top: auto, $bottom: auto, $left: auto, $right: auto) {
            .border {
                top: $top;
                bottom: $bottom;
                left: $left;
                right: $right;
                border-width: $borderWidth;
                border-radius: $borderRadius;
            }
        }

        @mixin curve-simple($borderWidth, $borderRadius, $top: auto, $bottom: auto, $left: auto, $right: auto) {
            .curve {
                bottom: $bottom;
                right: $right;
                top: $top;
                left: $left;

                .border {
                    bottom: $bottom;
                    right: $right;
                    top: $top;
                    left: $left;
                    border-width: $borderWidth;
                    border-radius: $borderRadius;
                }
            }
        }

        @mixin curve-simple-with-start($borderWidth, $borderRadius, $top: auto, $bottom: auto, $left: auto, $right: auto, $sright: auto, $sbottom: auto, $eright: auto, $ebottom: auto) {
            .start {
                right: $sright;
                bottom: $sbottom;
                border-width: $borderWidth;
            }
            @include curve-simple($borderWidth, $borderRadius, $top, $bottom, $left, $right);
            .end {
                right: $eright;
                bottom: $ebottom;
                border-width: $borderWidth;
            }
        }

        @mixin curve($borderWidth, $borderRadius, $top: auto, $bottom: auto, $left: auto, $right: auto, $height: $curveHeight, $width: $defaultCurveWidth, $paddingTop: 0) {
            .curve {
                top: $top;
                left: $left;
                bottom: $bottom;
                right: $right;
                padding-top: $paddingTop;
                height: $height;
                width: $width;
                @include curve-border($borderWidth, $borderRadius, $top, $bottom, $left, $right);
            }
        }

        @mixin curve-with-start($borderWidth, $borderRadius, $top: auto, $bottom: auto,
            $left: auto, $right: auto, $sright: auto, $sbottom: auto, $eright: auto, $ebottom: auto,
            $cwidth: $defaultCurveWidth, $cheight: $curveHeight, $cpaddingTop: 0
        ) {
            .start {
                right: $sright;
                bottom: $sbottom;
                border-width: $borderWidth;
            }
            @include curve($borderWidth, $borderRadius, $top, $bottom, $left, $right, $width: $cwidth, $height: $cheight, $paddingTop: $cpaddingTop);
            .end {
                right: $eright;
                bottom: $ebottom;
                border-width: $borderWidth;
            }
        }

        &.down-right-height-long,
        &.up-right-height-long,
        &.down-left-height-long,
        &.up-left-height-long {
            .top-line {
                .start {
                    width: 100%;
                }
            }
        }

        &.down-right-height-long,
        &.up-right-height-long,
        &.down-left-height-long,
        &.up-left-height-long {
            .top-line {
                .end {
                    height: 100%;
                }
            }
        }

        &.down-right-height-long,
        &.up-right-height-long,
        &.down-left-height-long,
        &.up-left-height-long {
            .bottom-line {
                .start {
                    height: 100%
                }
            }
        }

        &.down-right-height-long,
        &.up-right-height-long,
        &.down-left-height-long,
        &.up-left-height-long {
            .bottom-line {
                .end {
                    width: 100%;
                }
            }
        }





        &.up-right-width-long,
        &.down-right-width-long,
        &.up-left-width-long,
        &.down-left-width-long {
            .top-line {
                .start {
                    width: 100%;
                }
            }
        }

        &.up-right-width-long,
        &.down-right-width-long,
        &.up-left-width-long,
        &.down-left-width-long {
            .top-line {
                .end {
                    height: 100%;
                }
            }
        }

        &.up-right-width-long,
        &.down-right-width-long,
        &.up-left-width-long,
        &.down-left-width-long {
            .bottom-line {
                .start {
                    height: 100%
                }
            }
        }

        &.up-right-width-long,
        &.down-right-width-long,
        &.up-left-width-long,
        &.down-left-width-long {
            .bottom-line {
                .end {
                    width: 100%;
                }
            }
        }




        &.up-right-width-long,
        &.up-right-height-long,
        &.down-left-width-long,
        &.down-left-height-long,{
            .top-line {
                right: 0;
            }
        }

        &.down-right-height-long,
        &.down-right-width-long,
        &.up-left-height-long,
        &.up-left-width-long {
            .bottom-line {
                right: 0;
            }
        }

        &.down-left-width-long,
        &.up-right-width-long{
            .top-line {
                @include curve-simple-with-start(
                        $borderWidth: $borderWidth 0 0 $borderWidth,
                        $borderRadius: 50% 0 0 0,
                        $top: 0,
                        $left: 0,
                        $sright: 0,
                        $ebottom: 0
                );
            }
            .bottom-line {
                @include curve-simple-with-start(
                        $borderWidth: 0 $borderWidth $borderWidth 0,
                        $borderRadius: 0 0 50% 0,
                        $bottom: 0,
                        $right: 0,
                        $sright: 0,
                        $ebottom: 0
                );
            }
        }

        &.down-right-width-long,
        &.up-left-width-long {
            .top-line {
                @include curve-with-start(
                        $borderWidth: $borderWidth $borderWidth 0 0,
                        $borderRadius: 0 50% 0 0,
                        $top: 0,
                        $right: 0,
                        $ebottom: 0,
                        $eright: 0
                );
            }
            .bottom-line {
                @include curve-with-start(
                        $borderWidth: 0 0 $borderWidth $borderWidth,
                        $borderRadius: 0 0 0 50%,
                        $bottom: 0,
                        $ebottom: 0,
                        $eright: 0
                );
            }
        }

        &.down-right-height-long,
        &.up-left-height-long {
            .top-line {
                @include curve-with-start(
                        $borderWidth: 0 0 $borderWidth $borderWidth,
                        $borderRadius: 0 0 0 50%,
                        $bottom: 0,
                        $left: 0,
                        $sright: 0,
                        $sbottom: 0,
                        $cwidth: 90%,
                        $cheight: 0,
                        $cpaddingTop: 90%
                );
            }
            .bottom-line {
                @include curve-with-start(
                        $borderWidth: $borderWidth $borderWidth 0 0,
                        $borderRadius: 0 50% 0 0,
                        $top: 0,
                        $right: 0,
                        $sright: 0,
                        $sbottom: 0,
                        $cwidth: 90%,
                        $cheight: 0,
                        $cpaddingTop: 90%
                );
            }
        }


        &.up-right-height-long,
        &.down-left-height-long  {
            .top-line {
                @include curve-with-start(
                        $borderWidth: 0 $borderWidth $borderWidth 0,
                        $borderRadius: 0 0 50% 0,
                        $bottom: 0,
                        $right: 0,
                        $sbottom: 0,
                        $eright: 0,
                        $cwidth: 90%,
                        $cheight: 0,
                        $cpaddingTop: 90%
                );
            }
            .bottom-line {
                @include curve-with-start(
                        $borderWidth: $borderWidth 0 0 $borderWidth,
                        $borderRadius: 50% 0 0 0,
                        $top: 0,
                        $left: 0,
                        $sbottom: 0,
                        $eright: 0,
                        $cwidth: 90%,
                        $cheight: 0,
                        $cpaddingTop: 90%
                );
            }
        }


    }
</style>
