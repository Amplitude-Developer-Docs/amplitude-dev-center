<pre>
<code id="curl">curl --request GET \
     --url 'https://api.lab.amplitude.com/v1/vardata?user_id=<span id='curl_user_id'>user_id</span>' \
     --header 'Authorization: Api-Key <span id='curl_deployment_key'>deployment_key</span>'
</code>
</pre>

| <div class='big-column'>Variable</div> | Description |
| --- | --- |
|   <textarea spellcheck="false" style="resize:none" id="deployment_key" rows="1" cols="40">deployment_key</textarea> | The [deployment](../../general/data-model.md#deployments) key you [created](./create-a-deployment.md). |
| <textarea spellcheck="false" style="resize:none" id="user_id" rows="1" cols="40">user_id</textarea> | The user ID used to fetch variants. This should be the same [user](../../general/data-model.md#users) you [track exposure](./track-exposure.md) for. |
| <a id="fetch_button" class="md-button" onclick="fetchVariants()">Fetch Variants</a> | |

<script>
// Set the deployment key from local storage in table
document.getElementById('deployment_key').value =
     localStorage.getItem('deployment_key') || 'deployment_key';
// Set the deployment key and user id in the curl command
document.getElementById("curl_deployment_key").innerHTML =
     document.getElementById("deployment_key").value;
document.getElementById("curl_user_id").innerHTML =
     document.getElementById("user_id").value;
// Update deployment key and user id in curl command when table input changes
document.getElementById("deployment_key").addEventListener('input', function() {
     document.getElementById("curl_deployment_key").innerHTML =
          document.getElementById("deployment_key").value;
}, false);
document.getElementById("user_id").addEventListener('input', function() {
     document.getElementById("curl_user_id").innerHTML =
          document.getElementById("user_id").value;
}, false);
// Fetch Variants for the table above
async function fetchVariants() {
     const dk = document.getElementById("deployment_key").value.trim();
     localStorage.setItem('deployment_key', dk);
     const id = document.getElementById("user_id").value.trim();
     try {
          const response = await fetch('https://api.lab.amplitude.com/v1/vardata?user_id=' + id, {
               headers: {
                    'Authorization': 'Api-Key ' + dk,
               },
          });
          if (response.status != 200) {
               const body = await response.text();
               throw Error(response.status + ': ' + body);
          }
          const result = await response.json();
          console.log(result);
          document.getElementById("result").innerHTML = JSON.stringify(result, null, 2);
     } catch (e) {
          document.getElementById("result").innerHTML = e;
     }
}
</script>

Result:
<pre>
<code id="result">
</code>
</pre>