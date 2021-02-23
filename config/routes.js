
const routesGroups = require('./router/index');

let routes = {};

for (const index in routesGroups) {
  routes = {...routes, ...routesGroups[index]};
}

const appRoutes = {
  'get /': { view: 'pages/homepage' },
  ...routes,
};

if (process.env.NODE_ENV !== 'production') {
  console.log('config/routes.js', 'appRoutes', appRoutes);
}

module.exports.routes = appRoutes;
