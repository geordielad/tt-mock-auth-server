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

console.log('hash:',window.location.hash);

window.location = proxyHost+'/login-to-tableau-server/'+encUsername+'?redirect=' + getRedirectFromHash(window.location.hash) + '&site=' + getSiteFromHash(window.location.hash);

