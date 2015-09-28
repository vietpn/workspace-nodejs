/**
 * Created by vietpn on 25/09/2015.
 */
module.exports  = {
    'facebookAuth' : {
        clientID: "1500749983571923",
        clientSecret: "7a3c23e48d48e6aa5f4a4b4bc736c9af",
        callbackURL: "http://localhost:8080/auth/facebook/callback",
        enableProof: true,
        profileFields: ['id', 'displayName', 'name','link', 'photos', 'email']
    },
    'googlekAuth' : {
        clientID: "843769526697-ea66fp76rcbpn0v02k2n33qfn9a1nilp.apps.googleusercontent.com",
        clientSecret: "__j93jiQ8vUH8PnZr4o3P6qI",
        callbackURL: "http://localhost:8080/auth/google/callback"
    }
}