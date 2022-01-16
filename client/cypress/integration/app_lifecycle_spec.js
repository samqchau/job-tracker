function shortId() {
  var text = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < 12; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

it('can create new apps, add them to a list, update the app information, favorite the app, and delete it successfully', () => {
  cy.visit('/info');
  cy.login();
  cy.findByTestId('create-new-app-1').click();
  cy.findByText(/track a new application/i).should('be.visible');
  let companyName = shortId();
  let jobTitle = shortId();

  while (companyName === jobTitle) {
    companyName = shortId();
  }

  cy.findByRole('textbox', { name: /company name \*/i }).type(companyName);
  cy.findByRole('textbox', { name: /job title \*/i }).type(jobTitle);
  cy.findByRole('button', { name: /save/i }).click();

  cy.findByText(companyName).should('be.visible');
  cy.findByText(jobTitle).should('be.visible');

  cy.findByText(companyName).click();
  cy.findByRole('button', { name: /move/i }).should('be.visible');

  companyName = shortId();
  jobTitle = shortId();
  while (companyName === jobTitle) {
    companyName = shortId();
  }
  cy.log(`companyName: ${companyName}, jobTitle: ${jobTitle}`);

  cy.findByRole('textbox', { name: /company/i }).clear();
  cy.findByRole('textbox', { name: /job/i }).clear();
  cy.findByRole('textbox', { name: /company/i }).type(companyName);
  cy.findByRole('textbox', { name: /job/i }).type(jobTitle);

  cy.findByRole('button', { name: /update/i }).click();
  cy.findByRole('button', { name: /close/i }).click();

  cy.log(companyName);

  cy.findByText(companyName).should('be.visible');

  cy.findByText(jobTitle).should('be.visible');

  //The bookmarked list is empty
  //opens favorited
  cy.findByTitle(/show bookmarked/i).click();
  cy.findByText(/favorited/i).should('be.visible');
  cy.get('[data-cy="favorited-list-body"]').then(($favoritedBody) => {
    let n = $favoritedBody.children().length;
    cy.log(`n: ${n}`);
    cy.findByRole('dialog').click('topRight');

    //The app can be added to the bookmarked list
    cy.get('.app-card')
      .get(`[data-cy="${companyName}"]`)
      .find('.favoriteButton')
      .click({ force: true });
    cy.findByTitle(/show bookmarked/i).click();

    cy.get('[data-cy="favorited-list-body"]')
      .children()
      .should('have.length', n + 1);
    cy.findByRole('dialog').click('topRight');

    //The app can be removed from the bookmarked list
    cy.get('.app-card')
      .get(`[data-cy="${companyName}"]`)
      .find('.favoriteButton')
      .click({ force: true });
    cy.findByTitle(/show bookmarked/i).click();
    cy.get('[data-cy="favorited-list-body"]')
      .children()
      .should('have.length', n);
    cy.findByRole('dialog').click('topRight');
  });
  cy.get('.app-card')
    .get(`[data-cy="${companyName}"]`)
    .find('.deleteButton')
    .click({ force: true });
  cy.findByText(/are you sure you want to delete this job\?/i).should(
    'be.visible'
  );
  cy.get('.deleteModal-delete-button').click();
  cy.findByText(companyName).should('not.exist');
});
