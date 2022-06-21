<pre>
<code>curl --request POST \
     --url https://api2.amplitude.com/2/httpapi \
     --data '{"api_key": "<span id="curl_api_key"></span>","events":[{"event_type":"$exposure","user_id":"<span id="curl_user_id"></span>","event_properties":{"flag_key":"<span id="curl_flag_key"></span>","variant":"<span id="curl_variant"></span>"}}]}'
</code>
</pre>

| <div class='big-column'>Variable</div> | Description |
| --- | --- |
|  <textarea class="at-field" spellcheck="false" placeholder="analytics_api_key" id="api_key">api_key</textarea> | The analytics API key from [project](../../general/data-model.md#projects) which you created your [flag](../../general/data-model.md#flags-and-experiments) and [deployment](../../general/data-model.md#deployments) in. |
| <textarea class="at-field" spellcheck="false" placeholder="user_id" id="user_id">user_id</textarea> | The user ID used to fetch variants. This should be the same [user](../../general/data-model.md#users) you [fetched variants](./fetch-variants.md) for. |
| <textarea class="at-field" spellcheck="false" placeholder="flag_key" id="flag_key">getting-started</textarea> | The flag key; `getting-started` if you're using the naming from this guide. |
| <textarea class="at-field" spellcheck="false" placeholder="variant" id="variant">on</textarea> | The variant key, `on` if you're using the default flag variant. |
| <a class="md-button" id="at-action-button">Track Exposure</a> | |

Result:
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
     'flag_key': false,
     'variant': false,
}, async function(fields) {
     const apiKey = fields['api_key'];
     const userId = fields['user_id'];
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
               "events":[
                    {
                         "event_type":"$exposure",
                         "user_id": userId,
                         "event_properties":{
                              "flag_key":flagKey,
                              "variant":variant
                         }
                    }
               ]
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