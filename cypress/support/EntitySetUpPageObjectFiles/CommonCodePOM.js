class CommonCode {

    static clickEntitySetUpMenu(text) {
        return cy.get('[class="nav-text"]').contains(text)
            .should('have.text', text)
    }


    static homePageValidation(text) {
        return cy.get('[class="page-title mb-0"]').should("have.text", text)
    }

    // static pleaseSelectAnEntityToViewTheRecords(){
    //     return cy.get('.heading').should('be.visible');
    // }
    static pleaseSelectAnEntityToViewTheRecords(partialText) {
        return cy.get('.heading')
            .should('exist') // Ensure the element exists
            .invoke('text') // Get the text content of the element
            .then((actualText) => { // Use a callback to process the actual text
                const normalizedText = actualText.replace(/\s+/g, ' ').trim(); // Normalize whitespace
                cy.log(`Actual text: "${normalizedText}"`); // Log the normalized text for debugging
                expect(normalizedText).to.include(partialText); // Check for partial match
            });
    }
    


    static addReason() {
        return cy.get('[formcontrolname="reason"]')
    }

    static saveReason(text) {
        return cy.get('[class="btn btn-primary save"]').contains(text)
            .should('have.text', text).should('be.visible')
    }

    static ReasonPopupValidation(text) {
        return cy.get('[class="heading-wrapper"]').contains(text)
            .should('have.text', text).should('be.visible')
    }

    static ToastValidation(message) {
        return cy.get('#toast-container > .ng-trigger').should('have.text', message)
    }

    static NewToastValidation(message) {
        return cy.get('#toast-container > .ng-trigger').should('have.text', message)
    }
    static ToastMessages() {

        cy.get('#toast-container > .ng-trigger').should('be.visible').invoke('text').then(($toastElement) => {

            const toastmessage = $toastElement.trim();
            if (toastmessage.includes(' Record added successfully. ')) {

                cy.get('#toast-container > .ng-trigger').should('have.text', toastmessage);

            } else if (toastmessage.includes(' Record already Exists ')) {

                cy.get('#toast-container > .ng-trigger').should('have.text', toastmessage);

            }
        });
    }

    // static ToastMessages2() {

    //     cy.get('#toast-container > .ng-trigger')
    //         .should('be.visible')
    //         .invoke('text')
    //         .then((message) => {
    //             message = message.trim();

    //             if (message.includes(' Record added successfully. ')) {
    //                 cy.contains('#toast-container > .ng-trigger', ' Record added successfully. ').should('be.visible');

    //             } else {
    //                 throw new Error(`Unexpected toast message: ${message}`);
    //             }
    //         });
    // }




    /// Edit Buttons Click /// 

    static clickEditButton(text) {
        return cy.get('[class="btn btn-primary save ng-star-inserted"]')
            .contains(text).should('have.text', text).should('be.visible')
    }

    static clickActivateDeactivate() {
        return cy.get('[formcontrolname="isActive"]')
    }

    static selectDeactivate(text) {
        return cy.get('[class="mat-option-text"]').contains(text)
    }

    static selectActive(text) {
        return cy.get('[class="mat-option-text"]').contains(text)
    }

    static clickUpdateButton(text) {
        return cy.get('[class="btn btn-primary save ng-star-inserted"]').contains(text)
            .should('have.text', text).should('be.visible')
    }

    static UpdateButtonDisabled(text) {
        return cy.get('[class="btn btn-primary save ng-star-inserted"]').contains(text)
            .should('have.text', text).should('be.disabled')
    }

    static saveReason(text) {
        return cy.get('[class="btn btn-primary save"]').contains(text).should('have.text', text)
    }

    static AddPageHeading(text) {
        return cy.get('[class="heading-wrapper"]').contains(text)
            .should('have.text', text).should('be.visible')
    }

    static clickNextButton() {
        return cy.get('[aria-label="Next page"]').should('be.visible')
    }

    static clickEdit() {
        return cy.get('[class^="btn btn-edit me-2"]').should('be.visible')
            .then($options => {
                const count = $options.length
                const randomIndex = Math.floor(Math.random() * count)
                const randomOption = $options.eq(randomIndex)
                cy.wrap(randomOption).click({ force: true })
            })
    }

    static selectStatus() {
        cy.get('[formcontrolname="isActive"]').click({ force: true })
        cy.get('[role^= "option"]')
            .then($options => {
                const count = $options.length
                const randomIndex = Math.floor(Math.random() * count)
                const randomOption = $options.eq(randomIndex)
                cy.wrap(randomOption).click({ force: true })

                const selectedStatusText = randomOption.text();
                const statusData = { status: selectedStatusText };
                const jsonData = JSON.stringify(statusData, null, 2);

                cy.writeFile('D:\\PMS PROJECT\\cypress\\fixtures\\status.json', jsonData, err => {
                    if (err) throw err;
                });

            })
    }

    static statusValidation() {
        return cy.readFile('D:\\PMS PROJECT\\cypress\\fixtures\\status.json').then((fileContent) => {
            cy.get('[formcontrolname="isActive"]').should('have.value', fileContent.status)

        });
    }

    // static selectData() {
    //     cy.get('[formcontrolname="denialCategoryId"]').click()
    //     cy.get('[id^="mat-option"]').then($options => {
    //         const count = $options.length
    //         const randomIndex = Math.floor(Math.random() * count)
    //         const randomOption = $options.eq(randomIndex)
    //         cy.wrap(randomOption).click()
    //     })

    // }

    //// Pagination Test ///

    static clickItemsPerPage() {
        return cy.get('[aria-label="Items per page:"]')
    }

    static clickCount20(text) {
        return cy.get('[class="mat-option-text"]').contains(text)
            .should('have.text', text)
    }

    static clickCount15(text) {
        return cy.get('[class="mat-option-text"]').contains(text)
            .should('have.text', text)
    }

    static clickCount10(text) {
        return cy.get('[class="mat-option-text"]').contains(text)
            .should('have.text', text)
    }

    static paginationTest() {

        let totalData = 0;
        let currentPageDataCount = 0;
        const findInPage = () => {
            cy.get('[aria-label="Next page"]').then(($el) => {
                if ($el.attr('disabled')) {
                    cy.log("This is the Last Page");
                    cy.wait(4000);
                    cy.get("tbody td:nth-child(1)").then((row) => {
                        const count = row.length;
                        currentPageDataCount = count;
                        totalData += count;

                        // cy.log("Total Data: " + totalData);
                        cy.log("Total Data Count: " + totalData);
                        cy.get('[class="mat-paginator-range-label"]').should('contain', totalData)
                        // expect(totalData).to.equal(count)
                    });
                } else {
                    cy.wrap($el).click({ force: true });
                    cy.get("tbody td:nth-child(1)").then((row) => {
                        const count = row.length;
                        currentPageDataCount = count;
                        totalData += count;
                        // cy.log("Total Data: " + totalData);
                        findInPage();
                    });
                }
            });
        };

        findInPage();
    }

    static paginationTest2() {
        const validateDataCount = () => {
            const totalDataRegex = /(\d+) of (\d+)/;
            cy.get('[class="text-end page-length ng-star-inserted"]').invoke('text').then(rangeText => {
                const [, currentPageTotal, totalPages] = rangeText.match(totalDataRegex);
                cy.get('[class="text-end page-length ng-star-inserted"]').invoke('text').then(totalDataText => {
                    const [_, totalData] = totalDataText.split(' ');
                    cy.wrap(rangeText).should('match', totalDataRegex);
                    cy.log(`Total Data Count: ${currentPageTotal} of ${totalPages}`);

                });
            });
        };

        validateDataCount();
    }

    static paginationTest3() {
        const validateDataRange = () => {
            const totalDataRegex = /(\d+) of (\d+)/;

            cy.get('[class="text-end page-length ng-star-inserted"]').invoke('text').then(rangeText => {
                const [, currentPageTotal, totalPages] = rangeText.match(totalDataRegex);

                cy.get('[class="text-end page-length ng-star-inserted"]').invoke('text').then(totalDataText => {
                    const [_, totalData] = totalDataText.split(' ');

                    cy.wrap(rangeText).should('match', totalDataRegex);

                    cy.log(`Current Page Data Range: ${currentPageTotal} of ${totalPages}`);

                    const currentPageNumber = parseInt(currentPageTotal);
                    const totalPageNumber = parseInt(totalPages);

                    if (currentPageNumber === 1) {
                        cy.log('First range of data is selected.');
                    } else if (currentPageNumber === totalPageNumber) {
                        cy.log('Last range of data is selected.');
                    } else {
                        cy.log('A middle range of data is selected.');
                    }
                });
            });
        };

        validateDataRange();
    }

    static RandomAlphaNUmericData(len) {
        function generateRandomString(length) {
            let result = "";
            const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            for (let i = 0; i < length; i++) {
                result += characters.charAt(
                    Math.floor(Math.random() * characters.length)
                );
            }
            return result;
        }
        const randomString = generateRandomString(len);
        return randomString;
    }

    // static RandomDataMinMax() {
    //     const minMaxChars = {
    //         minChars: 3,
    //         maxChars: 7,
    //     };

    //     function generateRandomString(length) {
    //         const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    //         return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
    //     }

    //     const randomStringLength = Cypress._.random(minMaxChars.minChars, minMaxChars.maxChars);
    //     const randomString = generateRandomString(randomStringLength);
    //     return randomString; 
    // }


    static RandomNumber(len) {
        function generateRandomnumber(length) {
            let result = "";
            const characters = "0123456789";
            for (let i = 0; i < length; i++) {
                result += characters.charAt(
                    Math.floor(Math.random() * characters.length)
                );
            }
            return result;
        }
        const randomNumber = generateRandomnumber(len);
        return randomNumber
    }


    static RandomString(len) {
        function generateRandomString(length) {
            let result = "";
            const characters = "ABCDEFGHIJKLMNOPQRSTUVWXY";
            for (let i = 0; i < length; i++) {
                result += characters.charAt(
                    Math.floor(Math.random() * characters.length)
                );
            }
            return result;
        }
        const randomDescription = generateRandomString(len);
        return randomDescription;
    }


    static RandomDescription(len) {
        function generateRandomString(length) {
            let result = "";
            const characters = "0123456789";
            for (let i = 0; i < length; i++) {
                result += characters.charAt(
                    Math.floor(Math.random() * characters.length)
                );
            }
            return result;
        }
        const randomDescription = 'Test Description' + generateRandomString(len);
        return randomDescription;
    }

    static Random(len) {
        function generateRandomString(length) {
            let result = "";
            const characters = "0123456789";
            for (let i = 0; i < length; i++) {
                result += characters.charAt(
                    Math.floor(Math.random() * characters.length)
                );
            }
            return result;
        }
        const randomDescription = 'Category' + generateRandomString(len);
        return randomDescription;
    }

    static RandomNote(len) {
        function generateRandomString(length) {
            let result = "";
            const characters = "0123456789";
            for (let i = 0; i < length; i++) {
                result += characters.charAt(
                    Math.floor(Math.random() * characters.length)
                );
            }
            return result;
        }
        const randomDescription = 'Testnote' + generateRandomString(len);
        return randomDescription;
    }

    //// Export File Validation ////

    static clickExportButton(text) {
        return cy.get('.d-flex > .mat-menu-trigger').contains(text)
            .should('have.text', text).should('be.visible')
    }

    static clickExcelFile(text) {
        return cy.get('.mat-menu-content > :nth-child(1)').contains(text)
            .should('have.text', text).should('be.visible')
    }

    static clickCSVFile(text) {
        return cy.get('.mat-menu-content > :nth-child(2)').contains(text).should('have.text', text)
    }

    static ReasonAddPageHeading(text) {
        return cy.get('[class="heading-wrapper"]').contains(text)
            .should('have.text', text).should('be.visible')
    }


    /// carasole Test ///

    static RightButton() {
        return cy.get('[class="btn btn-chivron right ng-star-inserted"]')
            .should('be.visible')
    }

    static LeftButton() {
        return cy.get('[class="btn btn-chivron left ng-star-inserted"]')
            .should('be.visible')
    }

    static RightButtonDisable() {
        return cy.get('[class="btn btn-chivron right ng-star-inserted"]')
            .should('be.disabled')
    }

    static LeftButtonDisable() {
        cy.log('left button is disabled Cannot Click Left Button');
        return cy.get('[class="btn btn-chivron left ng-star-inserted"]')
            .should('be.disabled')

    }

    static clickRightGivenTimes(times) {
        for (let i = 0; i < times; i++) {
            cy.get('[class="btn btn-chivron right ng-star-inserted"]').click();
        }
    }

    static clickLefttGivenTimes(times) {
        for (let i = 0; i < times; i++) {
            cy.get('[class="btn btn-chivron left ng-star-inserted"]').click();
        }
    }


    static HighLightElement() {
        return cy.get('[class="mat-row cdk-row ng-star-inserted highlighted"]').should('be.visible')
    }

    static clickEdit2() {
        return cy.get(':nth-child(10) > .cdk-column-action > .d-flex > .me-2').should('be.visible').click()
    }

    static clickApprovalWindow() {
        return cy.get('[href="/approval-window"]').should('be.visible')
    }

    static clickApproveButton() {
        return cy.get('.cdk-column-actions > .d-flex > .ng-star-inserted')
    }

    static clickApprove(text) {

        return cy.get('[class="btn btn-primary save ng-star-inserted"]').contains(text)
            .should('have.text', text).should('be.visible')
    }


    static clickEntitySetupTab(text) {
        return cy.get('[class="nav-text"]').contains(text)
            .should('have.text', text)
    }

    static AddRandomDate(getRandomDate) {

        function getRandomDate() {
            const year = Math.floor(Math.random() * (2025 - 1980 + 1)) + 1980;
            const month = (Math.floor(Math.random() * 12) + 1).toString().padStart(2, '0');
            const day = (Math.floor(Math.random() * 28) + 1).toString().padStart(2, '0');
            return `${month}/${day}/${year}`;
        }
    }


}
export default CommonCode