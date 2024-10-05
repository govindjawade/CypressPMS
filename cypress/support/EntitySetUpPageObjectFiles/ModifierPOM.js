class Modifier {
    static clickModifierMenu(text) {
        return cy.get('[class="nav-text"]').should("have.text", text);
    }
    
    
}
export default Modifier;