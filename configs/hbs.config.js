const hbs = require('hbs');
const path = require('path');

require('../helpers/misc.helpers')(hbs);
require('../helpers/user.helpers')(hbs);

hbs.registerPartials(path.join(__dirname, '../views'));
