!!!warning "Potential data changes"
    This example makes real requests to the API and can potentially change the data in your Amplitude project. We recommend using a development project when testing APIs.

<pre>
<code>curl --request POST \
     --url https://api2.amplitude.com/2/httpapi \
     --data '{"api_key":"<span id="curl_api_key"></span>","events":[{"event_type":"$exposure","user_id":"<span id="curl_user_id"></span>","device_id":"<span id="curl_device_id"></span>","event_properties":{"flag_key":"<span id="curl_flag_key"></span>","variant":"<span id="curl_variant"></span>"}}]}'
</code>
</pre>

| <div class='big-column'>Variable</div> | Description |
| --- | --- |
|  <textarea class="at-field" spellcheck="false" placeholder="analytics_api_key" id="api_key"></textarea> | The analytics API key from [project](./data-model.md#projects) which you created your [flag](./data-model.md#flags-and-experiments) and [deployment](./data-model.md#deployments) in. |
| <textarea class="at-field" spellcheck="false" placeholder="user_id" id="user_id"></textarea> | The user's ID. |
| <textarea class="at-field" spellcheck="false" placeholder="device_id" id="device_id"></textarea> | The user's device ID. |
| <textarea class="at-field" spellcheck="false" placeholder="flag_key" id="flag_key"></textarea> | The flag key of the flag or experiment the user has been exposed to. |
| <textarea class="at-field" spellcheck="false" placeholder="variant" id="variant"></textarea> | The variant key (e.g. `on`, `control`, `treatment`). |
| <a class="md-button" id="at-action-button">Track Exposure</a> | |

Result: <span id="failure_tip"></span>
<pre>
<code id="result">
</code>
</pre>

<script src="/javascripts/api-table.js">
</script>

<script>
document.getElementById('api_key').value =
     localStorage.getItem('api_key') || '';

setupApiTable({
     'api_key': false,
     'user_id': false,
     'device_id': false,
     'flag_key': false,
     'variant': false
}, async function(fields) {
     const apiKey = fields['api_key'];
     const userId = fields['user_id'];
     const deviceId = fields['device_id'];
     const flagKey = fields['flag_key'];
     const variant = fields['variant'];

     localStorage.setItem('api_key', apiKey);

     const response = await fetch('https://api2.amplitude.com/2/httpapi', {
          method: 'POST',
          headers: {
               'Content-Type':'application/json',
               'Accept':'*/*'
          },
          body: JSON.stringify({
               "api_key": apiKey,
               "events":[{
                    "event_type":"$exposure",
                    "user_id": userId,
                    "device_id": deviceId,
                    "event_properties":{
                         "flag_key": flagKey,
                         "variant": variant
                    }
               }]
          })
     });
     if (response.status != 200) {
          const body = await response.text();
          throw Error(response.status + ': ' + body);
     }
     const result = await response.json();
     return JSON.stringify(result, null, 2);
});
</script>