class ProcedureCode {

    static clickProcedureCodeMenu(text) {
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
}
export default ProcedureCode;