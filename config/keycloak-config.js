const sessions = require('express-session')
const keycloak = require('keycloak-connect')

let _keycloak

var keycloakConfig = {
    clientId: 'nodejs-microservice',
    bearerOnly: true,
    serverUrl: 'http://localhost:8080/auth',
    realm: 'Demo-Realm',
    credentials: {
        secret: 'a347601a-ef6b-4b17-b2da-bec6260d6d82'
    }
};

function initKeycloak() {
    if (_keycloak) {
        console.warn("Try to init K¿keycloak again!");
        return _keycloak;
    }
    else {
        console.log("Initializing keycloak...");
        var memoryStore = new sessions.MemoryStore();
        _keycloak = new keycloak({ store: memoryStore }, keycloakConfig);
        return _keycloak;
    }
}

function getKeycloak(){
    if(!_keycloak){
        console.error('Keycloak has no been initialized. Please called init first.')
    }
    return _keycloak;
}

module.exports = {
    initKeycloak,
    getKeycloak
};