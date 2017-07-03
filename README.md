# Tableau Trusted Ticket Mock Authentication Server
## Description
This example implements a Mock Authenication Service to be used with Server Side Trusted Ticket Agent for Tableau  (https://github.com/geordielad/ttproxy.git).

The example configuration below should work on a non-SSL enabled Tableau Server with this agent and a Mock Authentication Server all on localhost. You do not need Siteminder. By deploying the various components on separate server and setting the config options appropriately you should be able to integrate this package in more complex environment.

Even though the simple example does not an encrypted username you may need to install OpenSSL and Node-Gyp for the package to install. If you want to simplify the install you can remove any references to ursa (See https://github.com/quartzjer/ursa) in the package.json and mock-auth-server.js before installing the package.

## Usage

```bash
$ git clone https://github.com/geordielad/tt-mock-auth-server.git
$ cd tt-mock-auth-server
$ npm install # Assumes ursa can build successfully
$ # Make changes to config.js as needed. Add SSL key/cert if needed. Enable Encryption of username
$ npm start
```

## Example - localhost, non-SSL, no Encryption of username

1. Install this package and https://github.com/geordielad/ttproxy.git
2. Enable Unrestricted Trusted Tickets on Tableau Server and configure trust and gateway settings
    a. tabadmin stop
    b. tabadmin set wgserver.unrestricted_ticket true
    c. tabadmin set gateway.trusted 127.0.0.1
    d. tabadmin set gateway.public_host localhost
    e. tabadmin set gateway.public_port 8000
    f. tabadmin set wgserver.trusted_hosts "127.0.0.1"
    g. tabadmin config
    h. tabadmin start
3. Create a user (default is rcottiss@tableau.rocks) on Tableau or edit config.js to use another user.
4. Configure port and hostname settings for Proxy and Auth Server
    a. Sample assumes http, localhost (for all Tableau, Proxy and Auth Server) and 8000 for the proxy and 8080 for the auth server.
5.	In a command window
    a. cd tt-mock-auth-server
    b. npm start
6. In another command window
    a. cd ttproxy
    b. npm start
7.	In your web browser go to proxy server public address (e.g. http://localhost:8000)

### config.js used in this package

```javascript

module.exports = {
    name: 'Trusted Ticket Mock Authentication Server',
    protocol: process.env.PROTOCOL || 'http', // http or https
    sslKeys: {
      key: '.ssl/private-ssl-key.key',
      cert: '.ssl/public-ssl-cert.pem'
    },
    port: process.env.PORT || 8080, // Any available port
    encUsernameFlag: false,
    encKeys: {
      key: '.enc/private-enc-key.key',
      cert: '.enc/public-enc-cert.pem'
    },
    tableauUsername: 'rcottiss@tableau.rocks'
};

```

## Authors

| [!["Robin Cottiss"](http://gravatar.com/avatar/b7ccc70dfdbfc700d88c1ca246fa4946.png?s=60)](http://tableau.com "Robin Cottiss <rcottiss@tableau.com>") |
|---|
| [@geordielad](https://twitter.com/geordielad) |

## Is this example supported?

This example is made available AS-IS with no support and no warranty whatsoever. The software is strictly “use at your own risk.”

The good news: You are free to modify it in any way to meet your needs, or use it as the basis for your own implementation.

## License

Licensed under the MIT license
