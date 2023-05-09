var feedback = document.forms.feedback

feedback.addEventListener("submit", function(ev) {
  ev.preventDefault()

  /* Retrieve page and feedback value */
  var path = document.location.pathname
  var product = document.location.pathname.split('/')[1]
  var url = document.location.href
  var isUseful = ev.submitter.getAttribute("data-md-value")

  /* Send feedback value */
  amplitude.getInstance().logEvent('feedback', {
    path: path,
    product: product,
    url: url,
    isUseful: isUseful
  });
  
})
