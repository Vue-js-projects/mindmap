export default class Collection {

    constructor() {
        this.items = [];
    }

    /**
     * Count items
     * @returns {number}
     */
    count() {
        return this.items.length;
    }

    /**
     * Get item
     * @param index
     * @returns {*}
     * @throws
     */
    getItem(index) {
        if (this.hasItem(index)) {
            return this.items[index];
        }

        throw 'Invalid index';
    }

    /**
     * Add item
     * @param item
     */
    addItem(item) {
        this.items.push(item);
    }

    /**
     * Get items
     * @returns {Array}
     */
    getItems() {
        return this.items;
    }

    /**
     * Remove item
     * @param index
     */
    removeItem(index) {
        if (this.hasItem(index)) {
            this.items.splice(index, 1);
        }
    }

    /**
     * Has item
     * @param index
     * @returns {boolean}
     */
    hasItem(index) {
        return this.count() > index;
    }

    itemClosure(closure) {
        if(typeof closure === 'undefined') {
            throw 'Invalid closure';
        }

        let items = this.getItems();
        for(let index in items) {
            let item = this.getItem(index);
            closure(item);
        }
    }

    filter(closure) {
        return this.getItems().filter(closure);
    }
};
