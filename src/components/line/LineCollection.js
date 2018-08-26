import Collection from "../../collections/Collection";

export default class LineCollection extends Collection {

    /**
     * Add line
     * @param line
     */
    addLine(line) {
        this.addItem(line);
    }

    /**
     * Get lines
     * @returns {Array}
     */
    getLines() {
        return this.getItems();
    }

    /**
     * Remove line
     * @param line
     * @returns {LineCollection}
     */
    removeLine(line) {
        let index = this.getItems().findIndex(item => item.getId() === line.getId());
        if(index) {
            this.getItems().splice(index, 1);
        }
        return this;
    }
}
