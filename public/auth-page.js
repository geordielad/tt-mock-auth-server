//var proxyHost = 'https://ttproxy.tableau.rocks:443';


function getRedirectFromHash(hash) {
  // we don't want to redirect to a signin url, so figure out where the user should end up
  // on successful authentication and redirect there instead
  
  console.log('hash:',hash);
  
  if (/^#\/signin/.test(hash)) {


    // If closePopupWhenDone is in url, redirect to http://localhost/en/closePopup.html. This is the
    // same file used by saml to close the popup in embedded authentication
    if (/closePopupWhenDone=true/.test(hash)) {
      return encodeURIComponent('/en/closePopup.html');
    }

    // externalRedirect is for non-vizportal urls.
    var externalRedirectMatch = hash.match(/externalRedirect=([^&]*)/);
    if (externalRedirectMatch) {
      // It will already be url encoded
      return externalRedirectMatch[1];
    }

    // redirect is for vizportal urls
    var redirectMatch = hash.match(/redirect=([^&]*)/);
    if (redirectMatch) {
      // it will already be encoded
      return redirectMatch[1];
    }
  }

  return encodeURIComponent('/' + window.location.hash)
}

function getSiteFromHash(hash) {
  var siteMatch = hash.match(/site=([^&]*)/);
  return siteMatch ? siteMatch[1] : ''
}

function getProxyHostFromHash(hash) {
  var proxyHostMatch = hash.match(/proxyHost=([^&]*)/);
  return proxyHostMatch ? proxyHostMatch[1] : ''
}

/*
var redirectUrl = proxyHost+'/login-to-tableau-server/rcottiss@tableau.rocks?redirect=' + getRedirectFromHash(window.location.hash) +'&site=' + getSiteFromHash(window.location.hash);

console.log('redirectUrl',redirectUrl);

document.location = redirectUrl;

document.write('<!DOCTYPE html>');
document.write('<html lang="en">');
document.write('<head>');
document.write('  <meta charset="utf-8">');
document.write('  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">');
document.write('  <title>Login Form</title>');
document.write('  <link rel="stylesheet" href="css/style.css">');
document.write('</head>');
document.write('<body>');
document.write('  <section class="container">');
document.write('    <div class="login">');
document.write('      <h1>Login to Web App</h1>');
document.write('      <form method="post" action="index.html">');
document.write('        <p><input type="text" name="login" value="" placeholder="Username or Email"></p>');
document.write('        <p><input type="password" name="password" value="" placeholder="Password"></p>');
document.write('        <p class="remember_me">');
document.write('          <label>');
document.write('            <input type="checkbox" name="remember_me" id="remember_me">');
document.write(              'Remember me on this computer');
document.write('          </label>');
document.write('        </p>');
document.write('        <p class="submit"><input type="submit" name="commit" value="Login"></p>');
document.write('      </form>');
document.write('    </div>');
document.write('    <div class="login-help">');
document.write('      <p>Forgot your password? <a href="index.html">Click here to reset it</a>.</p>');
document.write('    </div>');
document.write('  </section>');
document.write('</body>');
document.write('</html>');

*/


// Make the one link on the page
//var redirect = getRedirectFromHash(window.location.hash);

if (proxyHost == 'https://ttproxy.tableau.rocks') {
  document.write('<a href="'+proxyHost+'/login-to-tableau-server/rcottiss@tableau.rocks?');
  document.write('redirect=' + getRedirectFromHash(window.location.hash));
  document.write('&site=' + getSiteFromHash(window.location.hash));
  //document.write('&site=' + proxySite);
  document.write('">Login to ' + proxyHost + ' as rcottiss@tableau.rocks</a>');
}
else {
  document.write('<a href="'+proxyHost+'/login-to-tableau-server/awoodcock@tableau.rocks?');
  document.write('redirect=' + getRedirectFromHash(window.location.hash));
  document.write('&site=' + getSiteFromHash(window.location.hash));
  //document.write('&site=' + proxySite);
  document.write('">Login to ' + proxyHost + ' as awoodcock@tableau.rocks</a>');
}
