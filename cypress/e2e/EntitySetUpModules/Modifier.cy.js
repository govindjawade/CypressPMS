import Modifier from "../../support/EntitySetUpPageObjectFiles/ModifierPOM";
import CommonCode from "../../support/EntitySetUpPageObjectFiles/CommonCodePOM";

describe("Manage Modifier", function () {
    beforeEach(() => {
        cy.viewport(1366, 768);
        cy.login("https://pms.hplbusiness.com/login", "ana.H@yopmail.com", "Ana@123");
    });
    it("Add Modifier and validate in Approval Window", function () {
        cy.visit("https://pms.hplbusiness.com/manage-user");
        // Debugging: wait for 2 seconds to see if the page loads properly
        cy.wait(6000);
        // Ensure the "Entity Setup" menu can be clicked
        CommonCode.clickEntitySetUpMenu('Entity Setup').click({ force: true });
        cy.wait(5000);
        // Click on the "Manage Modifiers" menu option
        Modifier.clickModifierMenu('Manage Modifiers').click({ force: true });
        cy.wait(5000);
        // Validate that the "Manage Modifier" page has the correct title/content
        CommonCode.homePageValidation('Manage Modifier');
        CommonCode.pleaseSelectAnEntityToViewTheRecords(' Please Select an Entity to View the Records.');
        //select entity dropdown
        CommonCode.selectEntitySetUpDropdown('Select Entity').click();
        //select Proper entity
        CommonCode.selectActiveEntity(' Demo Practice ').click();
        // Validate the entity pop up text
        CommonCode.entitySelectionPopScreenValidation();
        //click on "OK" Button on entity switching pop up screen
        CommonCode.entitySelectionPopScreenOKButton('OK').click();
        
        //add button validation
        cy.wait(4000);
        Modifier.addButtonValidation(' Add Modifier');
        //clickOnAddButton
        Modifier.clickOnAddButton(' Add Modifier').click();
        let modifier_code = CommonCode.RandomAlphaNUmericData(2);
        let modifier_description = CommonCode.RandomDescription(10);
        // Add a modifier code and ensure its length is at least 2 characters
        Modifier.addModifier().type(modifier_code)
            .invoke("val")                    // Gets the current value of the input field
            .should("have.length.at.least", 2);  // Asserts that the length is at least 2

        // Add a modifier description and ensure its length is at most 50 characters
        Modifier.addDescription().type(modifier_description)
            .invoke("val")                    // Gets the current value of the input field
            .should("have.length.at.most", 50);  // Asserts that the length is no more than 50

        // Write the modifier code and description to a JSON file
        cy.writeFile('C:\\Users\\Admin\\Desktop\\PMS\\CypressPMS\\cypress\\fixtures\\EntitySetupManageModifier.json', {
            Modifier: modifier_code,
            ModifierDescription: modifier_description
        });

        Modifier.clickOnAddModifierAddForm('Add').click();

        Modifier.addModifierToastmessage();
        cy.wait(3500)
    });


});
