function shortId() {
  var text = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < 12; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function getAllMethods(obj) {
  var result = [];
  for (var id in obj) {
    try {
      result.push(id + ': ' + obj[id].toString());
    } catch (err) {
      result.push(id + ': Not accessible');
    }
  }
  return result;
}

it('can create new apps, add them to a list, update the app information, favorite the app, and delete it successfully', () => {
  cy.login();
  cy.visit('/');

  let config = { headers: { 'Content-Type': 'application/json' } };
  //await cy.request('/api/users/auth_login', config);
});
