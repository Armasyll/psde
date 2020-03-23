class BookGameGUI {
    static initialize() {
        BookGameGUI.initialized = true;
        BookGameGUI.controller = null;
        BookGameGUI.currentOffset = 0;
        BookGameGUI.currentBook = "";
        BookGameGUI.currentPage = 0;
        BookGameGUI.bookPageOffsets = {};
        BookGameGUI.includeCoverPage = false;
        BookGameGUI.pageWidthInPixels = 256;
        BookGameGUI.charactersPerLine = 80;
        BookGameGUI.linesPerPage = 24;
        BookGameGUI.charactersPerPage = BookGameGUI.charactersPerLine * BookGameGUI.linesPerPage;
        BookGameGUI.terminators = [',', '.', '!', '?', ' ', '-', '\n', '\b\r'];
        BookGameGUI.hasNextPage = false;
        BookGameGUI.hasPreviousPage = false;
        BookGameGUI.locked = false;
        BookGameGUI.isVisible = false;
        BookGameGUI.generateController();
    }
    static resize() {
        BookGameGUI.controller.height = String(Game.engine.getRenderHeight() - GameGUI.fontSizeInPixels * 8).concat("px");
        BookGameGUI.controller.width = String(Game.engine.getRenderWidth() - GameGUI.fontSizeInPixels * 8).concat("px");
        BookGameGUI.header.height = GameGUI.fontSize;
        BookGameGUI.header.width = BookGameGUI.controller.width;
        BookGameGUI.pageContainer.height = String(BookGameGUI.controller.heightInPixels - (GameGUI.fontSizeInPixels * 2)).concat("px");
        BookGameGUI.pageContainer.width = BookGameGUI.controller.width;
        BookGameGUI.leftPage.height = BookGameGUI.pageContainer.height;
        BookGameGUI.rightPage.height = BookGameGUI.pageContainer.height;
        BookGameGUI.footer.height = GameGUI.fontSize;
        BookGameGUI.footer.width = BookGameGUI.controller.width;
        BookGameGUI.previousPageContainer.height = BookGameGUI.footer.height;
        BookGameGUI.previousPageContainer.width = String(BookGameGUI.footer.widthInPixels / 2).concat("px");
        BookGameGUI.previousPageButton.height = BookGameGUI.previousPageContainer.height;
        BookGameGUI.previousPageButton.width = BookGameGUI.previousPageContainer.width;
        BookGameGUI.previousPageButton.fontSize = GameGUI.fontSize;
        BookGameGUI.nextPageContainer.height = BookGameGUI.footer.height;
        BookGameGUI.nextPageContainer.width = String(BookGameGUI.footer.widthInPixels / 2).concat("px");
        BookGameGUI.nextPageButton.height = BookGameGUI.nextPageContainer.height;
        BookGameGUI.nextPageButton.width = BookGameGUI.nextPageContainer.width;
        BookGameGUI.nextPageButton.fontSize = GameGUI.fontSize;

        BookGameGUI.pageWidthInPixels = BookGameGUI.pageContainer.widthInPixels / 2;

        BookGameGUI.rightPage.width = String(BookGameGUI.pageWidthInPixels).concat("px");
        BookGameGUI.leftPage.width = String(BookGameGUI.pageWidthInPixels).concat("px");

        BookGameGUI.charactersPerLine = Math.floor(BookGameGUI.pageWidthInPixels / GameGUI.fontSizeInPixels);
        BookGameGUI.linesPerPage = Math.floor(BookGameGUI.pageContainer.heightInPixels / GameGUI.fontSizeInPixels);
        BookGameGUI.charactersPerPage = BookGameGUI.charactersPerLine * BookGameGUI.linesPerPage;
    }
    static generateController() {
        let controller = GameGUI.createStackPanel("bookContainer");
            controller.height = String(Game.engine.getRenderHeight() - GameGUI.fontSizeInPixels * 8).concat("px");
            controller.width = String(Game.engine.getRenderWidth() - GameGUI.fontSizeInPixels * 8).concat("px");
            controller.isVertical = true;
            let header = GameGUI.createStackPanel("header");
                header.height = GameGUI.fontSize;
                header.width = controller.width;
                header.isVertical = false;
            controller.addControl(header);
            let pageContainer = GameGUI.createStackPanel("pageContainer");
                pageContainer.height = String(controller.heightInPixels - (GameGUI.fontSizeInPixels * 2)).concat("px");
                pageContainer.width = controller.width;
                pageContainer.isVertical = false;
                let leftPage = GameGUI.createStackPanel("leftPage");
                    leftPage.height = pageContainer.height;
                    leftPage.width = String(pageContainer.widthInPixels / 2).concat("px");
                    leftPage.isVertical = true;
                pageContainer.addControl(leftPage);
                let rightPage = GameGUI.createStackPanel("rightPage");
                    rightPage.height = pageContainer.height;
                    rightPage.width = String(pageContainer.widthInPixels / 2).concat("px");
                    rightPage.isVertical = true;
                pageContainer.addControl(rightPage);
            controller.addControl(pageContainer);
            let footer = GameGUI.createStackPanel("footer");
                footer.height = GameGUI.fontSize;
                footer.width = controller.width;
                footer.isVertical = false;
                let previousPageContainer = GameGUI.createStackPanel("previousPageContainer");
                    previousPageContainer.height = footer.height;
                    previousPageContainer.width = String(footer.widthInPixels / 2).concat("px");
                    previousPageContainer.isVertical = false;
                    previousPageContainer.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
                    let previousPageButton = GameGUI.createSimpleButton("previousPageButton", "Previous Page");
                        previousPageButton.height = previousPageContainer.height;
                        previousPageButton.width = previousPageContainer.width;
                        previousPageButton.onPointerUpObservable.add(function() {
                            if (BookGameGUI.locked) {
                                return 1;
                            }
                            BookGameGUI.updateWith(BookGameGUI.currentBook, BookGameGUI.currentPage - 2);
                            return 0;
                        });
                    previousPageContainer.addControl(previousPageButton);
                footer.addControl(previousPageContainer);
                let nextPageContainer = GameGUI.createStackPanel("nextPageContainer");
                    nextPageContainer.height = footer.height;
                    nextPageContainer.width = String(footer.widthInPixels / 2).concat("px");
                    nextPageContainer.isVertical = false;
                    nextPageContainer.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                    let nextPageButton = GameGUI.createSimpleButton("nextPageButton", "Next Page");
                        nextPageButton.height = nextPageContainer.height;
                        nextPageButton.width = nextPageContainer.width;
                        nextPageButton.onPointerUpObservable.add(function() {
                            if (BookGameGUI.locked) {
                                return 1;
                            }
                            BookGameGUI.updateWith(BookGameGUI.currentBook, BookGameGUI.currentPage + 2);
                            return 0;
                        });
                    nextPageContainer.addControl(nextPageButton);
                footer.addControl(nextPageContainer);
            controller.addControl(footer);
        BookGameGUI.controller = controller;
        BookGameGUI.header = header;
        BookGameGUI.pageContainer = pageContainer;
        BookGameGUI.leftPage = leftPage;
        BookGameGUI.rightPage = rightPage;
        BookGameGUI.footer = footer;
        BookGameGUI.previousPageContainer = previousPageContainer;
        BookGameGUI.previousPageButton = previousPageButton;
        BookGameGUI.nextPageContainer = nextPageContainer;
        BookGameGUI.nextPageButton = nextPageButton;
        return controller;
    }
    static getController() {
        return BookGameGUI.controller;
    }
    static show() {
        BookGameGUI.controller.isVisible = true;
        BookGameGUI.isVisible = true;
        return 0;
    }
    static hide() {
        BookGameGUI.controller.isVisible = false;
        BookGameGUI.isVisible = false;
        return 0;
    }
    static updateWith(abstractEntity, page = 1) {
        BookGameGUI.resize();
        if (!(abstractEntity instanceof AbstractEntity)) {
            if (AbstractEntity.has(abstractEntity)) {
                abstractEntity = AbstractEntity.get(abstractEntity);
            }
            else {
                return 2;
            }
        }
        if (abstractEntity instanceof BookEntity) {}
        else if (abstractEntity instanceof InstancedBookEntity) {
            abstractEntity = abstractEntity.getEntity();
        }
        else {
            return 1;
        }
        BookGameGUI.currentBook = abstractEntity.getID();
        if (Game.debugMode) console.log(`Running BookGameGUI.updateWith(${abstractEntity.getID()}, ${page})`);
        BookGameGUI.clearPages();
        if (!BookGameGUI.bookPageOffsets.hasOwnProperty(abstractEntity.getID())) {
            BookGameGUI.bookPageOffsets[abstractEntity.getID()] = new Map([[1, 0]]);
        }
        let bookPageOffsets = BookGameGUI.bookPageOffsets[abstractEntity.getID()];
        if (!bookPageOffsets.has(page)) {
            BookGameGUI.currentPage = 1;
            BookGameGUI.currentOffset = 0;
        }
        else {
            BookGameGUI.currentPage = page;
            BookGameGUI.currentOffset = bookPageOffsets.get(page);
        }
        BookGameGUI.currentOffset = BookGameGUI._populatePageContainer(BookGameGUI.leftPage, abstractEntity.getContent(), BookGameGUI.currentOffset);
        bookPageOffsets.set(BookGameGUI.currentPage + 1, BookGameGUI.currentOffset);
        BookGameGUI.currentOffset = BookGameGUI._populatePageContainer(BookGameGUI.rightPage, abstractEntity.getContent(), BookGameGUI.currentOffset);
        bookPageOffsets.set(BookGameGUI.currentPage + 2, BookGameGUI.currentOffset);
        if (abstractEntity.getContent().length > BookGameGUI.currentOffset + 1) {
            BookGameGUI.hasNextPage = true;
            BookGameGUI.nextPageButton.isVisible = true;
        }
        else {
            BookGameGUI.hasNextPage = false;
            BookGameGUI.nextPageButton.isVisible = false;
        }
        if (page > 1) {
            BookGameGUI.hasPreviousPage = true;
            BookGameGUI.previousPageButton.isVisible = true;
        }
        else {
            BookGameGUI.hasPreviousPage = false;
            BookGameGUI.previousPageButton.isVisible = false;
        }
        return 0;
    }
    static clearPages() {
        for (let i = BookGameGUI.leftPage.children.length - 1; i >= 0; i--) {
            BookGameGUI.leftPage.children[i].dispose();
        }
        BookGameGUI.leftPage.clearControls();
        for (let i = BookGameGUI.rightPage.children.length - 1; i >= 0; i--) {
            BookGameGUI.rightPage.children[i].dispose();
        }
        BookGameGUI.rightPage.clearControls();
        return 0;
    }
    static clear() {
        BookGameGUI.currentOffset = 0;
        BookGameGUI.currentBook = "";
        BookGameGUI.currentPage = 0;
        BookGameGUI.locked = false;
    }
    /**
     * 
     * @param {BABYLON.GUI.StackPanel} container 
     * @param {string} content 
     * @param {number} offset 
     */
    static _populatePageContainer(container = BookGameGUI.leftPage, content = "", offset = 0) {
        if (Game.debugMode) console.log(`Running BookGameGUI._populatePageContainer(${container.name}, "${content.slice(offset, offset + 6)}", ${offset})`);
        let terminate = false;
        let indexOf = 0;
        let count = 0;
        let lineCount = 5;
        while (!terminate) {
            let lines = 1;
            let textBlock = GameGUI.createTextBlock();
                textBlock.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                textBlock.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
                textBlock.textWrapping = 1;
            indexOf = content.indexOf("&#10;", offset);
            if (count > BookGameGUI.linesPerPage) {
                terminate = true;
            }
            if (count == 0 && indexOf == -1) { // if we can't find an occurrence of a newline from the get-go
                if (Game.debugMode) console.log("Terminating early because the page is short.");
                textBlock.text = content.slice(offset, BookGameGUI.charactersPerPage);
                offset = BookGameGUI.charactersPerPage + 1;
                terminate = true;
            }
            else if (offset + 5 > content.length && indexOf == -1) {
                terminate = true;
            }
            else {
                textBlock.text = content.slice(offset, indexOf);
                if (textBlock.lines instanceof Array) {
                    lines = textBlock.lines.length;
                }
                else {
                    lines = Math.ceil(textBlock.text.length / BookGameGUI.charactersPerLine)||1;
                }
                if (lineCount + lines > BookGameGUI.linesPerPage) {
                    terminate = true;
                }
                else if (content.length <= indexOf) {
                    offset = indexOf + 5;
                    terminate = true;
                }
                else {
                    offset = indexOf + 5; // +5 for &#10;
                    lineCount += lines;
                }
            }
            if (textBlock.lines instanceof Array) {
                lines = textBlock.lines.length;
            }
            else {
                lines = Math.ceil(textBlock.text.length / BookGameGUI.charactersPerLine)||1;
            }
            textBlock.height = String(GameGUI.fontSizeInPixels * lines).concat("px");
            container.addControl(textBlock);
            count++;
        }
        return offset;
    }
}