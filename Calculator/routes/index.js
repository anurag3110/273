
/*
 * GET home page.
 */

const index = (request, response) => {
  response.render('index', { title: 'Calculator' });
};

module.exports = index;
