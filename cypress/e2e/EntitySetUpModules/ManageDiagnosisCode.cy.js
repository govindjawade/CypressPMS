import ManageDiagnosisCode from "../../support/EntitySetUpPageObjectFiles/ManageDiagnosisCodePOM";
import CommonCode from "../../support/EntitySetUpPageObjectFiles/CommonCodePOM";

describe("Manage Diagnosis Code", function () {
    beforeEach(() => {
        cy.viewport(1366, 768);
        cy.login("https://pms.hplbusiness.com/login", "ana.H@yopmail.com", "Ana@123");
    });
    it("Add Manage Diagnosis Code and validate in Approval Window", function () {
        cy.visit("https://pms.hplbusiness.com/manage-user");
        // Debugging: wait for 2 seconds to see if the page loads properly
        cy.wait(6000);
        // Ensure the "Entity Setup" menu can be clicked
        CommonCode.clickEntitySetUpMenu('Entity Setup').click({ force: true });
        cy.wait(5000);
        // Click on the "Manage Modifiers" menu option
        ManageDiagnosisCode.clickManageDiagnosisCodeMenu('Manage Diagnosis Codes').click({ force: true });
        cy.wait(5000);
        // Validate that the "Manage Modifier" page has the correct title/content
        CommonCode.homePageValidation('Manage Diagnosis Code');
        CommonCode.pleaseSelectAnEntityToViewTheRecords(' Please Select an Entity to View the Records.');
        //select entity dropdown
        CommonCode.selectEntitySetUpDropdown('Select Entity').click();
        //select Proper entity
        CommonCode.selectActiveEntity(' Demo Practice ').click();
        // Validate the entity pop up text
        CommonCode.entitySelectionPopScreenValidation();
        //click on "OK" Button on entity switching pop up screen
        CommonCode.entitySelectionPopScreenOKButton('OK').click();

        let ManageDiagnosis_code = CommonCode.getRandomICD10Code(8);
        let ManageDiagnosis_description = CommonCode.RandomDescription(20);
        //add button validation
        cy.wait(4000);
        ManageDiagnosisCode.addButtonValidation(' Add diagnosis Code');
        //clickOnAddButton
        ManageDiagnosisCode.clickOnAddButton(' Add diagnosis Code').click();

        // Add a modifier code and ensure its length is at least 2 characters
        ManageDiagnosisCode.addManageDiagnosisCodeMenu().type(ManageDiagnosis_code)
            .invoke("val")                    // Gets the current value of the input field
            .should("have.length.at.least", 2);  // Asserts that the length is at least 2

        // Add a modifier description and ensure its length is at most 50 characters
        ManageDiagnosisCode.addDescription().type(ManageDiagnosis_description)
            .invoke("val")                    // Gets the current value of the input field
            .should("have.length.at.most", 300);  // Asserts that the length is no more than 50

        // Write the modifier code and description to a JSON file
        cy.writeFile('C:\\Users\\Admin\\Desktop\\PMS\\CypressPMS\\cypress\\fixtures\\EntitySetupDiagnosisCodeDescription.json', {
            ManageDiagnosisCode: ManageDiagnosis_code,
            DiagnosisCodeDescription: ManageDiagnosis_description
        });

        ManageDiagnosisCode.clickOnAddManageDiagnosisCodeAddForm('Add').click();

        ManageDiagnosisCode.addModifierToastmessage();
        cy.wait(3500)
    });


});
