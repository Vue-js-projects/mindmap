<template>
    <div id="app">
        <MindmapComponent></MindmapComponent>
    </div>
</template>

<script>
    import MindmapComponent from './components/mindmap/MindmapComponent';

    export default {
        name: 'app',
        components: {
            MindmapComponent
        }
    }
</script>

<style lang="scss">
    html, body {
        position: relative;
        display: block;
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
    }

    #app {
        position: relative;
        display: block;
        width: 100%;
        height: 100%;
    }
</style>
