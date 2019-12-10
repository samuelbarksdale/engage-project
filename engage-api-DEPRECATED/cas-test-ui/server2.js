var app = require('express')();
var session = require('express-session');
var CASAuthentication = require('express-cas-authentication');
 
// Set up an Express session, which is required for CASAuthentication.
app.use( session({
    secret            : 'super secret key',
    resave            : false,
    saveUninitialized : true
}));
 
// Create a new instance of CASAuthentication.
var cas = new CASAuthentication({
    cas_url     : 'https://shib.idm.umd.edu/shibboleth-idp/profile/cas',
    service_url : 'http://localhost:3001'
});
 
// Unauthenticated clients will be redirected to the CAS login and then back to
// this route once authenticated.
app.get( '/', cas.bounce, function ( req, res ) {
    res.send( '<html><body>Hello!</body></html>' );
});
 
// An example of accessing the CAS user session variable. This could be used to
// retrieve your own local user records based on authenticated CAS username.
app.get( '/api/user', cas.block, function ( req, res ) {
    res.json( { cas_user: req.session[ cas.session_name ] } );
});

app.listen(3001, (err) => {
    if (err) console.error(err)
    console.log("Listening on port 3001")
})