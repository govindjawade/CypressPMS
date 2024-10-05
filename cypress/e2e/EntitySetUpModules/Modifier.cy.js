import Modifier from "../../support/EntitySetUpPageObjectFiles/ModifierPOM";
import CommonCode from "../../support/EntitySetUpPageObjectFiles/CommonCodePOM";

describe("Manage Modifier", function () {
    beforeEach(() => {
        cy.viewport(1366, 768);
        cy.login("https://pms.hplbusiness.com/login", "ana.H@yopmail.com", "Ana@123");
    });
    it("Add Manage Modifier", function () {
        cy.visit("https://pms.hplbusiness.com/manage-user");
        // Debugging: wait for 2 seconds to see if the page loads properly
        cy.wait(6000);
        let modifier_code = CommonCode.RandomAlphaNUmericData(2);
        let modifier_description = CommonCode.RandomDescription(4);

        // Ensure the "Entity Setup" menu can be clicked
        CommonCode.clickEntitySetUpMenu('Entity Setup').click({ force: true });
        cy.wait(5000);
        // Click on the "Manage Modifiers" menu option
        Modifier.clickModifierMenu('Manage Modifiers').click({ force: true });
        cy.wait(5000);
        // Validate that the "Manage Modifier" page has the correct title/content
        CommonCode.homePageValidation('Manage Modifier');
        // Click the element that prompts to select an entity
        CommonCode.pleaseSelectAnEntityToViewTheRecords(' Please Select an Entity to View the Records.');

    });
});
