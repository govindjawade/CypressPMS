import CommonCode from "./CommonCodePOM"
class ManageDiagnosisCode
{
    static clickManageDiagnosisCodeMenu(text) {
        return cy.get('[class="nav-text"]').contains(text)
            .should('have.text', text)
    }
    static addButtonValidation(text) {
        return cy.get('[type="button"]').contains(text)
            .should('have.text', text)
    }
    static clickOnAddButton(text) {
        return cy.get('[type="button"]').contains(text)
            .should('have.text', text)
    }
    static addManageDiagnosisCodeMenu() {
        return cy.get('[formcontrolname="diagnosisCode"]')
    }
    static addDescription() {
        return cy.get('[formcontrolname="description"]')

    }

    static clickOnAddManageDiagnosisCodeAddForm(text) {
        return cy.get('[type="submit"]').contains(text)
            .should('have.text', text)
    }
    static addModifierToastmessage() {

        cy.get('#toast-container > .ng-trigger').then(($toastelement) => {
            const toastermessage = $toastelement.text().trim();

            if (toastermessage.includes('Record already Exists')) {
                cy.get('#toast-container > .ng-trigger').click();
                cy.log('Record Already Exists. Re Run Script');
            }
            else {
                CommonCode.addedToastMessage(' Record added successfully. ');
                cy.wait(4000)
                CommonCode.clickEntitySetupTab('Entity Setup').click({ force: true })
                cy.wait(4000)
                ManageDiagnosisCode.clickApprovalWindowMenu('Approval Window').click()
                cy.wait(10000)
                ManageDiagnosisCode.searchAddedCode()

            }
        })
    }
    static clickApprovalWindowMenu(text) {
        return cy.get('[href="/approval-window"]').contains(text)
            .should('have.text', text)
    }
    static searchAddedCode() {

        cy.readFile('C:\\Users\\Admin\\Desktop\\PMS\\CypressPMS\\cypress\\fixtures\\EntitySetupDiagnosisCodeDescription.json').then((searchkey) => {
            cy.get('[placeholder="Master File Entry"]').type(searchkey.DiagnosisCodeDescription)
            cy.get('[placeholder="Master File Entry"]').type('{enter}')
            cy.wait(4000)
            cy.get('tbody td:nth-child(8)').each(($row) => {
                cy.wrap($row)
                    .invoke('text')
                    .then((text) => {
                        const searchKeyword = text;
                        if (text.includes(searchKeyword)) {
                            expect(text).to.includes(' 2nd level approval pending');
                            cy.log('Record Should Approve by Another Approver')

                        } else {
                            cy.log('Record Not Found ')
                        }
                    });
            });
        })
    }
}
export default ManageDiagnosisCode;