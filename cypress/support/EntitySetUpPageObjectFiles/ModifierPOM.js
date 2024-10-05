class Modifier {
    static clickModifierMenu(text) {
        return cy.get('[class="nav-text"]').contains(text)
            .should('have.text', text)
    }
}
export default Modifier;