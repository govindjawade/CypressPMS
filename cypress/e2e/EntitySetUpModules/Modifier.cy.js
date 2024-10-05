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

        // Ensure the entity setup menu can be clicked
        CommonCode.clickEntitySetUpMenu('Entity Setup').click({ force: true });
        cy.wait(5000);
        Modifier.clickModifierMenu('Manage Modifiers').click({ force: true });
        CommonCode.homePageValidation('Manage Modifier').click({ force: true });

        
       
    });
});
