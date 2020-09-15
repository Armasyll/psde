/**
 * Book Entity
 */
class BookEntity extends ItemEntity {
    /**
     * Creates a Book Entity
     * @param  {string}  id Unique ID
     * @param  {string}  name Name
     * @param  {string}  [description] Description
     * @param  {string}  [iconID] Image ID
     */
    constructor(id = "", name = "", description = "", iconID = "") {
        super(id, name, description, iconID);

        this.backgroundImages = {};
        this.author = "";
        this.content = "";

        this.addAvailableAction(ActionEnum.OPEN);
        this.addAvailableAction(ActionEnum.CLOSE);
        this.addAvailableAction(ActionEnum.READ);

        BookEntity.set(this.id, this);
    }

    getBackgroundImage(nth = 0) {
        return this.background[nth];
    }
    /**
     * Set background image for the nth page; default page is 0
     * 0 is the background applied to all pages
     * 1 is the background applied to the first page, overrides 0
     * -1 is the background applied to the last page, overrides 0, and 1 when there is only one page
     * @param {string} imageID 
     * @param {number} nth 
     */
    setBackgroundImage(imageID, nth = 0) {
        this.backgrounds[nth] = imageID;
        return 0;
    }
    getAuthor() {
        return this.author;
    }
    setAuthor(string) {
        this.author = string;
        return 0;
    }
    getContent() {
        return this.content;
    }
    setContent(string) {
        string = String(string).replace(/\r\n|\n|&NewLine;|&#13;/gi, "&#10;");
        this.content = string;
        return 0;
    }

    resetModifiers() {
        super.resetModifiers();
    }

    /**
     * Overrides ItemEntity.clone
     * @param  {string} id ID
     * @returns {BookEntity} new BookEntity
     */
    clone(id = "") {
        let clone = new BookEntity(id, this.name, this.description, this.icon);
        clone.assign(this);
        return clone;
    }
    /**
     * Overrides ItemEntity.createInstance
     * @param  {string} id ID
     * @returns {InstancedBookEntity} new InstancedBookEntity
     */
    createInstance(id = "") {
        return new InstancedBookEntity(id, this);
    }
    /**
     * Clones the entity's values over this
     * @param {BookEntity} entity 
     * @param {boolean} [verify] Set to false to skip verification
     */
    assign(entity, verify = true) {
        if (verify && !(entity instanceof BookEntity)) {
            return 2;
        }
        super.assign(entity, verify);
        if (entity.hasOwnProperty("author")) this.setAuthor(entity.author);
        if (entity.hasOwnProperty("content")) this.setContent(entity.content);
        return 0;
    }
    updateID(newID) {
        super.updateID(newID);
        BookEntity.updateID(this.id, newID);
        return 0;
    }
    dispose() {
        this.setLocked(true);
        this.setEnabled(false);
        BookEntity.remove(this.id);
        super.dispose();
        return undefined;
    }
    getClassName() {
        return "BookEntity";
    }

    static initialize() {
        BookEntity.bookEntityList = {};
    }
    static get(id) {
        if (BookEntity.has(id)) {
            return BookEntity.bookEntityList[id];
        }
        return 1;
    }
    static has(id) {
        return BookEntity.bookEntityList.hasOwnProperty(id);
    }
    static set(id, doorEntity) {
        BookEntity.bookEntityList[id] = doorEntity;
        return 0;
    }
    static remove(id) {
        delete BookEntity.bookEntityList[id];
        return 0;
    }
    static list() {
        return BookEntity.bookEntityList;
    }
    static clear() {
        for (let i in BookEntity.bookEntityList) {
            BookEntity.bookEntityList[i].dispose();
        }
        BookEntity.bookEntityList = {};
        return 0;
    }
    static updateID(oldID, newID) {
        if (!BookEntity.has(oldID)) {
            return 1;
        }
        BookEntity.set(newID, BookEntity.get(oldID));
        BookEntity.remove(oldID);
        return 0;
    }
}
BookEntity.initialize();