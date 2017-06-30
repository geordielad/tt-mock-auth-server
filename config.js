module.exports = {
    config: {
      name: 'Trusted Ticket Mock Authentication Server',
      protocol: process.env.PROTOCOL || 'http', // http or https
      sslKeys: {
        key: '.ssl/private-ssl-key.key',
        cert: '.ssl/public-ssl-cert.pem'
      },
      port: process.env.PORT || 8080 // Any available port
      encUsernameFlag: false,
      encKeys: {
        key: '.enc/private-enc-key.key',
        cert: '.enc/public-enc-cert.pem'
      },
      tableauUsername: 'rcottiss@tableau.rocks'
    }
};
