class BookGameGUI {
    static getClassName() {
        return "BookGameGUI";
    }
    static initialize() {
        if (Game.debugMode) BABYLON.Tools.Log("Initializing BookGameGUI");
        BookGameGUI.initialized = true;
        BookGameGUI.isVisible = false;
        BookGameGUI.controller = null;
        BookGameGUI.titleBar = null;
        BookGameGUI.closeButton = null;
        BookGameGUI.bodyContainer = null;
        BookGameGUI.fullScreen = true;
        BookGameGUI.defaultWidthInPixels = 0;
        BookGameGUI.defaultHeightInPixels = 0;
        BookGameGUI.windowWidthInPixels = -1;
        BookGameGUI.windowHeightInPixels = -1;
        BookGameGUI.posX = 0;
        BookGameGUI.posY = 0;

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
        BookGameGUI.interfaceMode = InterfaceModeEnum.DIALOGUE;

        BookGameGUI.resetDefaultDimensions();
        BookGameGUI.generateController();
        BookGameGUI.hide();
        return 0;
    }
    static resetDefaultDimensions() {
        BookGameGUI.defaultWidthInPixels = GameGUI.renderWidth - GameGUI.fontSizeInPixels * 8;
        BookGameGUI.defaultHeightInPixels = GameGUI.renderHeight - GameGUI.fontSizeInPixels * 8;
        return 0;
    }
    static resize() {
        if (BookGameGUI.initialized != true) {
            return 1;
        }
        BookGameGUI.resetDefaultDimensions();
        if (BookGameGUI.fullScreen) {
            BookGameGUI.windowWidthInPixels = GameGUI.renderWidth;
            BookGameGUI.windowHeightInPixels = GameGUI.renderHeight;
        }

        BookGameGUI.controller.widthInPixels = BookGameGUI.defaultWidthInPixels;
        BookGameGUI.controller.heightInPixels = BookGameGUI.defaultHeightInPixels;
        BookGameGUI.titleBar.widthInPixels = BookGameGUI.controller.widthInPixels;
        BookGameGUI.titleBar.heightInPixels = GameGUI.titleBarHeightInPixels;
        BookGameGUI.title.widthInPixels = BookGameGUI.titleBar.widthInPixels - GameGUI.getFontSizeInPixels(2);
        BookGameGUI.closeButton.width = GameGUI.getFontSize(2);
        BookGameGUI.closeButton.height = GameGUI.getFontSize(2);
        BookGameGUI.bodyContainer.widthInPixels = BookGameGUI.controller.widthInPixels;
        BookGameGUI.bodyContainer.heightInPixels = BookGameGUI.controller.heightInPixels - BookGameGUI.titleBar.heightInPixels;

        BookGameGUI.header.height = GameGUI.fontSize;
        BookGameGUI.header.width = BookGameGUI.bodyContainer.width;
        BookGameGUI.pageContainer.heightInPixels = Math.floor(BookGameGUI.bodyContainer.heightInPixels - (GameGUI.fontSizeInPixels * 2));
        BookGameGUI.pageContainer.width = BookGameGUI.bodyContainer.width;
        BookGameGUI.leftPage.height = BookGameGUI.pageContainer.height;
        BookGameGUI.rightPage.height = BookGameGUI.pageContainer.height;
        BookGameGUI.footer.height = GameGUI.fontSize;
        BookGameGUI.footer.width = BookGameGUI.bodyContainer.width;
        BookGameGUI.previousPageContainer.height = BookGameGUI.footer.height;
        BookGameGUI.previousPageContainer.widthInPixels = Math.floor(BookGameGUI.footer.widthInPixels / 2);
        BookGameGUI.previousPageButton.height = BookGameGUI.previousPageContainer.height;
        BookGameGUI.previousPageButton.width = BookGameGUI.previousPageContainer.width;
        BookGameGUI.previousPageButton.fontSize = GameGUI.fontSize;
        BookGameGUI.nextPageContainer.height = BookGameGUI.footer.height;
        BookGameGUI.nextPageContainer.widthInPixels = Math.floor(BookGameGUI.footer.widthInPixels / 2);
        BookGameGUI.nextPageButton.height = BookGameGUI.nextPageContainer.height;
        BookGameGUI.nextPageButton.width = BookGameGUI.nextPageContainer.width;
        BookGameGUI.nextPageButton.fontSize = GameGUI.fontSize;

        BookGameGUI.pageWidthInPixels = BookGameGUI.pageContainer.widthInPixels / 2;

        BookGameGUI.rightPage.widthInPixels = Math.floor(BookGameGUI.pageWidthInPixels);
        BookGameGUI.leftPage.widthInPixels = Math.floor(BookGameGUI.pageWidthInPixels);

        BookGameGUI.charactersPerLine = Math.floor(BookGameGUI.pageWidthInPixels / GameGUI.fontSizeInPixels);
        BookGameGUI.linesPerPage = Math.floor(BookGameGUI.pageContainer.heightInPixels / GameGUI.fontSizeInPixels);
        BookGameGUI.charactersPerPage = BookGameGUI.charactersPerLine * BookGameGUI.linesPerPage;
    }
    static generateController() {
        [BookGameGUI.controller, BookGameGUI.titleBar, BookGameGUI.title, BookGameGUI.closeButton, BookGameGUI.bodyContainer] = GameGUI.createWindow("book", "Book", BookGameGUI.defaultWidthInPixels, BookGameGUI.defaultHeightInPixels, 0);
        BookGameGUI.controller.isVertical = true;
        BookGameGUI.header = GameGUI.createStackPanel("header");
            BookGameGUI.header.height = GameGUI.fontSize;
            BookGameGUI.header.width = BookGameGUI.bodyContainer.width;
            BookGameGUI.header.isVertical = false;
        BookGameGUI.bodyContainer.addControl(BookGameGUI.header);
        BookGameGUI.pageContainer = GameGUI.createStackPanel("pageContainer");
            BookGameGUI.pageContainer.heightInPixels = Math.floor(BookGameGUI.bodyContainer.heightInPixels - (GameGUI.fontSizeInPixels * 2));
            BookGameGUI.pageContainer.width = BookGameGUI.bodyContainer.width;
            BookGameGUI.pageContainer.isVertical = false;
            BookGameGUI.leftPage = GameGUI.createStackPanel("leftPage");
                BookGameGUI.leftPage.height = BookGameGUI.pageContainer.height;
                BookGameGUI.leftPage.widthInPixels = Math.floor(BookGameGUI.pageContainer.widthInPixels / 2);
                BookGameGUI.leftPage.isVertical = true;
            BookGameGUI.pageContainer.addControl(BookGameGUI.leftPage);
            BookGameGUI.rightPage = GameGUI.createStackPanel("rightPage");
                BookGameGUI.rightPage.height = BookGameGUI.pageContainer.height;
                BookGameGUI.rightPage.widthInPixels = Math.floor(BookGameGUI.pageContainer.widthInPixels / 2);
                BookGameGUI.rightPage.isVertical = true;
            BookGameGUI.pageContainer.addControl(BookGameGUI.rightPage);
        BookGameGUI.bodyContainer.addControl(BookGameGUI.pageContainer);
        BookGameGUI.footer = GameGUI.createStackPanel("footer");
            BookGameGUI.footer.height = GameGUI.fontSize;
            BookGameGUI.footer.width = BookGameGUI.bodyContainer.width;
            BookGameGUI.footer.isVertical = false;
            BookGameGUI.previousPageContainer = GameGUI.createStackPanel("previousPageContainer");
                BookGameGUI.previousPageContainer.height = BookGameGUI.footer.height;
                BookGameGUI.previousPageContainer.widthInPixels = Math.floor(BookGameGUI.footer.widthInPixels / 2);
                BookGameGUI.previousPageContainer.isVertical = false;
                BookGameGUI.previousPageContainer.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
                BookGameGUI.previousPageButton = GameGUI.createSimpleButton("previousPageButton", "Previous Page");
                    BookGameGUI.previousPageButton.height = BookGameGUI.previousPageContainer.height;
                    BookGameGUI.previousPageButton.width = BookGameGUI.previousPageContainer.width;
                    BookGameGUI.previousPageButton.onPointerUpObservable.add(function() {
                        if (BookGameGUI.locked) {
                            return 1;
                        }
                        BookGameGUI.updateWith(BookGameGUI.currentBook, BookGameGUI.currentPage - 2);
                        return 0;
                    });
                BookGameGUI.previousPageContainer.addControl(BookGameGUI.previousPageButton);
            BookGameGUI.footer.addControl(BookGameGUI.previousPageContainer);
            BookGameGUI.nextPageContainer = GameGUI.createStackPanel("nextPageContainer");
                BookGameGUI.nextPageContainer.height = BookGameGUI.footer.height;
                BookGameGUI.nextPageContainer.widthInPixels = Math.floor(BookGameGUI.footer.widthInPixels / 3);
                BookGameGUI.nextPageContainer.isVertical = false;
                BookGameGUI.nextPageContainer.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                BookGameGUI.nextPageButton = GameGUI.createSimpleButton("nextPageButton", "Next Page");
                    BookGameGUI.nextPageButton.height = BookGameGUI.nextPageContainer.height;
                    BookGameGUI.nextPageButton.width = BookGameGUI.nextPageContainer.width;
                    BookGameGUI.nextPageButton.onPointerUpObservable.add(function() {
                        if (BookGameGUI.locked) {
                            return 1;
                        }
                        BookGameGUI.updateWith(BookGameGUI.currentBook, BookGameGUI.currentPage + 2);
                        return 0;
                    });
                BookGameGUI.nextPageContainer.addControl(BookGameGUI.nextPageButton);
            BookGameGUI.footer.addControl(BookGameGUI.nextPageContainer);
        BookGameGUI.bodyContainer.addControl(BookGameGUI.footer);

        BookGameGUI.closeButton.onPointerUpObservable.add(function() {
            BookGameGUI.clearOptions();
            BookGameGUI.hide();
        });
        
        BookGameGUI.controller.zIndex = 75;
        return BookGameGUI.controller;
    }
    static getController() {
        return BookGameGUI.controller;
    }
    static show() {
        BookGameGUI.controller.isVisible = true;
        BookGameGUI.isVisible = true;
        GameGUI.windowStack.push(BookGameGUI);
        GameGUI.afterShow();
        return 0;
    }
    static hide(updateChildren = true) {
        BookGameGUI.controller.isVisible = false;
        BookGameGUI.isVisible = false;
        GameGUI.windowStack.remove(BookGameGUI);
        GameGUI.afterHide();
        return 0;
    }
    static update(abstractEntity, page = 1) {
        return BookGameGUI.updateWith(abstractEntity, page);
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
            textBlock.heightInPixels = Math.floor(GameGUI.fontSizeInPixels * lines);
            container.addControl(textBlock);
            count++;
        }
        return offset;
    }
}