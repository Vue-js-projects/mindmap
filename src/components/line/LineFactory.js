import LineModel from "./LineModel";

export default class LineFactory {
    constructor(mindmapModel) {
        this.mindmapModel = mindmapModel;
    }

    createLine(parentNode, childNode) {
        let newLine = new LineModel(null, parentNode, childNode, this.getMindmap());
        let countItems = this.getMindmap().getLines().count();
        let lastItem = this.getMindmap().getLines().getItem(countItems-1);
        let id = (typeof lastItem !== 'undefined' && lastItem !== null ? lastItem.getId() : 0) + 1;
        newLine.setId(id);
        this.getMindmap().getLines().addLine(newLine);

        newLine.created(function(line) {
            line.changePosition();
        });

        return newLine;
    }

    /**
     * Get mindmap model
     * @returns {MindmapModel}
     */
    getMindmap() {
        return this.mindmapModel;
    }
}
