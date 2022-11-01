<!-- markdown-link-check-disable -->
!!!warning "Potential data changes"
    This example makes real requests to the API and can potentially change the data in your Amplitude project. We recommend using a development project when testing APIs.

<pre>
<code>curl --request GET \
     --url 'https://api.lab.amplitude.com/v1/vardata?<span id='curl_user_id'></span>' \
     --header 'Authorization: Api-Key <span id='curl_deployment_key'></span>'
</code>
</pre>

| <div class='big-column'>Variable</div> | Description |
| --- | --- |
| <textarea class="at-field" spellcheck="false" placeholder="deployment_key" id="deployment_key"></textarea> | (Required) The [deployment](../../general/data-model.md#deployments) key you [created](./create-a-deployment.md). |
| <textarea class="at-field" spellcheck="false" placeholder="user_id" id="user_id"></textarea> | (Required) The user ID used to fetch variants. This should be the same [user](../../general/data-model.md#users) you [track exposure](./track-exposure.md) for. |
| <a class="md-button" id="at-action-button">Fetch Variants</a> | |

Result: <span id="failure_tip"></span>
<pre>
<code id="result">
</code>
</pre>

<script src="/javascripts/api-table.js">
</script>

<script>
document.getElementById('deployment_key').value =
     localStorage.getItem('deployment_key') || '';

setupApiTable({
     'deployment_key': false,
     'user_id': true
}, async function(fields) {
     const deploymentKey = fields['deployment_key'];
     const userId = fields['user_id'];

     localStorage.setItem('deployment_key', deploymentKey);

     const response = await fetch('https://api.lab.amplitude.com/v1/vardata?user_id=' + userId, {
          headers: {
               'Authorization': 'Api-Key ' + deploymentKey,
          },
     });
     if (response.status != 200) {
          const body = await response.text();
          throw Error(response.status + ': ' + body);
     }
     const result = await response.json();
     return JSON.stringify(result, null, 2);
});
</script>
