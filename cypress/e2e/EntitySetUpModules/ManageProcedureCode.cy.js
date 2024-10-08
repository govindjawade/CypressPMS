import CommonCode from "../../support/EntitySetUpPageObjectFiles/CommonCodePOM";
import ProcedureCode from "../../support/EntitySetUpPageObjectFiles/ManageProcedureCodePOM";
describe("Manage Procedure Code", function () {
    beforeEach(() => {
        cy.viewport(1366, 768);
        cy.login("https://pms.hplbusiness.com/login", "ana.H@yopmail.com", "Ana@123");
    });
    
    it("Add Manage Procedure Code and validate in Approval Window", function () {
        cy.visit("https://pms.hplbusiness.com/manage-user");
        // Debugging: wait for 2 seconds to see if the page loads properly
        cy.wait(6000);
        // Ensure the "Entity Setup" menu can be clicked
        CommonCode.clickEntitySetUpMenu('Entity Setup').click({ force: true });
        cy.wait(5000);
        // Click on the "Manage Procedure Code" menu option
        ProcedureCode.clickProcedureCodeMenu('Manage Procedure Code').click({ force: true });
        cy.wait(5000);
        // Validate that the "Manage Procedure Code" page has the correct title/content
        CommonCode.homePageValidation('Manage Procedure Code');
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
        ProcedureCode.addButtonValidation(' Add Procedure Code');
        //clickOnAddButton
        ProcedureCode.clickOnAddButton(' Add Procedure Code').click();


    })

})
