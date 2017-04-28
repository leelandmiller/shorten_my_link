import { Meteor } from 'meteor/meteor';
import { Links } from '../imports/collections/links';
import { WebApp } from 'meteor/webapp';
import ConnectRoute from 'connect-route';

Meteor.startup(() => {
    // code to run on server at startup
    Meteor.publish('links', function () {
        return Links.find({});
    });
});

// Executed whenever a user visits with a route like
// 'localhost:3000/abcd'
function onRoute(req, res, next) {
    // take token out of hte url and try to find
    // a matching link in Links collections
    const link = Links.findOne({ token: req.params.token });

    if (link) {
        // if we find link obj, redirect user to long url
        // link.clicks += 1 doesn't update database
        // need to use Links.update
        Links.update(link, { $inc: { clicks: 1 }});
        res.writeHead(307, { 'Location': link.url });
        res.end();
    } else {
        // if no link obj, send user to normal React app
        next();
    }
}

// Middleware

// localhost:3000/ NO MATCH
// localhost:3000/books/harry_potter NO MATCH
// localhost:3000/abcd will match!!
const middleware = ConnectRoute(function(router) {
    router.get('/:token', onRoute);
});

WebApp.connectHandlers.use(middleware);
