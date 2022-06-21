<pre>
<code>curl --request GET \
     --url 'https://api.lab.amplitude.com/v1/vardata?<span id='curl_user_id'></span><span id='curl_device_id'></span><span id='curl_flag_key'></span><span id='curl_context'></span>' \
     --header 'Authorization: Api-Key <span id='curl_deployment_key'></span>'
</code>
</pre>

| <div class='big-column'>Variable</div> | Description |
| --- | --- |
| <textarea class="at-field" spellcheck="false" placeholder="deployment_key" id="deployment_key"></textarea> |  (Required) The [deployment](../../general/data-model.md#deployments) key. |
| <textarea class="at-field" spellcheck="false" placeholder="user_id" id="user_id"></textarea> | The user's ID. |
| <textarea class="at-field" spellcheck="false" placeholder="device_id" id="device_id"></textarea> | The user's device ID. |
| <textarea class="at-field" spellcheck="false" placeholder="flag_key" id="flag_key"></textarea> | A specific flag key to get the variant of. If empty/missing, all flags & experiments associated with the deployment key are evaluated. |
| <textarea class="at-field" spellcheck="false" placeholder="context" id="context"></textarea> | JSON string consisting of a full user context. Set user properties in the `user_properties` field (e.g. `{"user_properties":{"premium":true}}`). |
| <a class="md-button" id="at-action-button">Send</a> | |

Result:
<pre>
<code id="result">
</code>
</pre>

<script src="/javascripts/api-table.js">
</script>

<script>
document.getElementById('deployment_key').value =
    localStorage.getItem('deployment_key') || 'deployment_key';

setupApiTable({
    'deployment_key': false,
    'user_id': true,
    'device_id': true,
    'flag_key': true,
    'context': true,
}, async function(fields) {
    const deploymentKey = fields['deployment_key'];
    const userId = fields['user_id'];
    const deviceId = fields['device_id'];
    const flagKey = fields['flag_key'];
    const context = fields['context'];

    localStorage.setItem('deployment_key', deploymentKey);

    let uri = 'https://api.lab.amplitude.com/v1/vardata?'
    if (userId && userId.length > 0) {
        uri = uri + '&user_id=' + userId;
    }
    if (deviceId && deviceId.length > 0) {
        uri = uri + '&device_id=' + deviceId;
    }
    if (flagKey && flagKey.length > 0) {
        uri = uri + '&flag_key=' + flagKey;
    }
    if (context && context.length > 0) {
        uri = uri + '&context=' + context;
    }

    const response = await fetch(uri, {
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
