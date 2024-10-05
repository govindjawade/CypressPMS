// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// ++++++  Captcha Automation Code ++++++
import 'cypress-iframe';


// Cypress.Commands.add('confirmCaptcha', function () {
//   cy.wait(5000)
//   cy.get('[title = reCAPTCHA]')
//     .first()
//     .then((recaptchaIframe) => {
//       const body = recaptchaIframe.contents()
//       cy.wrap(body).find('.recaptcha-checkbox-border').should('be.visible').click()
//     })
// })
// Cypress.Commands.add("clickRecaptcha", () => {
//   cy.window().then(win => {
//     win.document
//       .querySelector("iframe[src*='recaptcha']")
//       .contentDocument.getElementById("recaptcha-token")
//       .click();
//   });
// });

// Cypress.Commands.add("login", (url, email, password) => {
//   cy.session([url, email, password], () => {
//     cy.visit(url);
//     cy.wait(3000);
//     cy.get("#mat-input-0").type(email);
//     cy.get("#mat-input-1").type(password);
//     cy.wait(4000);
//     cy.get('.btn').contains('Sign In').click();
//     cy.get(".div-otp-wrapper").find("input").eq(0).type("555555");
//     cy.wait(10000);
//     cy.get('iframe').its('length').then((length) => {
//       cy.log('Number of iframes:', length);
//       cy.get('iframe', { timeout: 10000 }).eq(1).click({ force: true });
//     });
//     cy.get('iframe', { timeout: 10000 }).eq(1).click({ force: true });
//     // then($iframe => {
//     // //   const body = $iframe.contents().find('.recaptcha-checkbox-border');
//     //   cy.wrap(body).click();
//   });



  // cy.get('[style="width: 304px; height: 78px;"] > div > iframe').then(
  //   function ($ele) {
  //     var ifele = $ele.contents().find(".recaptcha-checkbox-border");
  //     cy.wrap(ifele).click();
  //     cy.pause();
//   //     cy.get('[class="btn btn-primary login"]').click();
//   cy.wait(5000);
// },
//   {
//     cacheAcrossSpecs: true,
//   }
// );


Cypress.Commands.add("login", (url, email, password) => {
  cy.session([url, email, password], () => {
    cy.visit(url);
    cy.wait(4000);
    cy.get("#mat-input-0").type(email);
    cy.wait(5000);
    cy.get("#mat-input-1").type(password);
    cy.wait(4000);
    // cy.get('.mat-checkbox-inner-container').click({force:true})
    // cy.wait(4000);
    cy.get('[class="btn btn-primary login my-1"]').contains('Sign In').click();
    cy.wait(4000);
    cy.get(".div-otp-wrapper").find("input").eq(0).type("555555");
    cy.wait(5000);
    cy.get('[style="width: 304px; height: 78px;"] > div > iframe').then(
      function ($ele) {
        var ifele = $ele.contents().find(".recaptcha-checkbox-border");
        cy.wrap(ifele).click();
        cy.pause();
        cy.get('[class="btn btn-primary login"]').click();
        cy.wait(6000);
       
        Cypress.on('uncaught:exception', (err, runnable) => {
          return false
        })
       
      },
      {
        cacheAcrossSpecs: true,
      }
    );
 
  });
})
 


Cypress.Commands.add('SecurityQuestions', () => {
  cy.fixture('SecurityQuestions.json').then((questions) => {
    cy.get('app-password-verify-security-question[class="ng-star-inserted"]').should('be.visible').within(() => {
      cy.get('[class^="ng-tns-c89"]').then(($questions) => {
        $questions.each((index, question) => {
          const questionText = Cypress.$(question).text();
          const answer = questions.questions[index].answer;

          cy.get('[formcontrolname="answer"]').type(answer);
        });
      });

      cy.get('[class="btn btn-primary"]').contains('Submit').click();
    });
  });
});

Cypress.Commands.add('SecurityQuestionsMethod3', () => {
  cy.fixture('SecurityQuestions.json').then((questions) => {
    cy.get('app-password-verify-security-question[class="ng-star-inserted"]').should('be.visible').within(() => {
      const questionElement = cy.get('[class^="ng-tns-c89"]').first();
      const questionText = questionElement().text().trim();
      const question = questions.questions.find(q => q.question === questionText);

      if (question) {
        cy.get(questionElement).next().find('[formcontrolname="answer"]').type(question.answer, { delay: 0 });
      }

      cy.get('[class="btn btn-primary"]').contains('Submit').click();
    });
  });
});

Cypress.Commands.add('SecurityQuestions2', () => {
  cy.fixture('SecurityQuestions.json').then((questions) => {
    cy.get('[role="dialog"]').should('be.visible').within(() => {
      cy.get('[role="combobox"]').click()
      cy.wait(4000)
      cy.get('[id="mat-option-744"]').click()
        .each(($question) => {
          const questionText = $question.text().trim();
          const question = questions.questions.find(q => q.question === questionText);

          if (question && question.answer) {
            cy.get('[formcontrolname="answer"]').last().type(question.answer);
          }
        });

      cy.get('[class="btn btn-primary"]').contains('Submit').click();
    });
  });
});

Cypress.Commands.add('generate_random_alphanumeric', (string_length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let random_alphastring = '';
  for (let i = 0; i < string_length; i++) {
    const random_index = Math.floor(Math.random() * characters.length);
    random_alphastring += characters.charAt(random_index);
  }
  return random_alphastring;
});

Cypress.Commands.add("randomString", (len) => {
  function generateRandomString(length) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }
  const randomString = "Test" + generateRandomString(len);
  return randomString;
  // cy.log(randomString);

});

