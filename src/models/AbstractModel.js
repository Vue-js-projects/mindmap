import Collection from "../collections/Collection";

export default class AbstractModel {
    constructor(component) {
        this.component = component;
        this.id = 0;
        this.toDoItems = new Collection();
    }

    /**
     * Get id
     * @returns {number}
     */
    getId() {
        return this.id;
    }

    /**
     * Set id
     * @param id
     */
    setId(id) {
        this.id = id;
    }

    /**
     * Get component
     * @returns {Object}
     */
    getComponent() {
        return this.component;
    }

    /**
     * Set component
     * @param component
     * @returns {AbstractModel}
     */
    setComponent(component) {
        this.component = component;

        return this;
    }

    /**
     * Call created
     */
    callCreated() {
        let closure = this.getToDoItems().getItems().shift();
        if(closure) {
            closure(this);
            this.callCreated();
        }
    }

    /**
     * Do when created
     * @param closure
     * @returns {AbstractModel}
     */
    created(closure) {
        this.addToDoItem(closure);

        if(this.getComponent()) {
            this.callCreated();
        }

        return this;
    }

    /**
     * Add to do item
     * @param item
     */
    addToDoItem(item) {
        this.toDoItems.addItem(item);
    }

    /**
     * Get to do items
     * @returns {Collection}
     */
    getToDoItems() {
        return this.toDoItems;
    }
}
