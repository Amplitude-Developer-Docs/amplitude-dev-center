<pre>
<code>curl --request POST \
     --url https://api2.amplitude.com/2/httpapi \
     --data '{"api_key": "<span id="curl_api_key">api_key</span>","events":[{"event_type":"$exposure","user_id":"<span id="curl_user_id">user_id</span>","event_properties":{"flag_key":"<span id="curl_flag_key">flag_key</span>","variant":"<span id="curl_variant">variant</span>"}}]}'
</code>
</pre>

| <div class='big-column'>Variable</div> | Description |
| --- | --- |
|  <textarea class="at-field" spellcheck="false" id="api_key">api_key</textarea> | The analytics API key from [project](../../general/data-model.md#projects) which you created your [flag](../../general/data-model.md#flags-and-experiments) and [deployment](../../general/data-model.md#deployments) in. |
| <textarea class="at-field" spellcheck="false" id="user_id">user_id</textarea> | The user ID used to fetch variants. This should be the same [user](../../general/data-model.md#users) you [fetched variants](./fetch-variants.md) for. |
| <textarea class="at-field" spellcheck="false" id="flag_key">getting-started</textarea> | The flag key; `getting-started` if you're using the naming from this guide. |
| <textarea class="at-field" spellcheck="false" id="variant">on</textarea> | The variant key, `on` if you're using the default flag variant. |
| <a class="md-button" onclick="trackExposure()">Track Exposure</a> | |

Result:
<pre>
<code id="result">
</code>
</pre>

<script>
document.getElementById('api_key').value =
     localStorage.getItem('api_key') || 'api_key';

document.getElementById("curl_api_key").innerHTML =
     document.getElementById("api_key").value;
document.getElementById("api_key").addEventListener('input', function() {
     document.getElementById("curl_api_key").innerHTML =
          document.getElementById("api_key").value;
}, false);

document.getElementById("curl_user_id").innerHTML =
     document.getElementById("user_id").value;
document.getElementById("user_id").addEventListener('input', function() {
     document.getElementById("curl_user_id").innerHTML =
          document.getElementById("user_id").value;
}, false);

document.getElementById("curl_flag_key").innerHTML =
     document.getElementById("flag_key").value;
document.getElementById("flag_key").addEventListener('input', function() {
     document.getElementById("curl_flag_key").innerHTML =
          document.getElementById("flag_key").value;
}, false);

document.getElementById("curl_variant").innerHTML =
     document.getElementById("variant").value;
document.getElementById("variant").addEventListener('input', function() {
     document.getElementById("curl_variant").innerHTML =
          document.getElementById("variant").value;
}, false);

// Fetch Variants for the table above
async function trackExposure() {
     const apiKey = document.getElementById("api_key").value.trim();
     const userId = document.getElementById("user_id").value.trim();
     const flagKey = document.getElementById("flag_key").value.trim();
     const variant = document.getElementById("variant").value.trim();

     localStorage.setItem('api_key', apiKey);

     try {
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
          document.getElementById("result").innerHTML = JSON.stringify(result, null, 2);
     } catch (e) {
          document.getElementById("result").innerHTML = e;
     }
}
</script>