<pre>
<code>curl --request POST \
     --url https://api2.amplitude.com/2/httpapi \
     --data '{"api_key":"<span id="curl_api_key"></span>","events":[{"event_type":"$exposure","user_id":"<span id="curl_user_id"></span>","device_id":"<span id="curl_device_id"></span>","event_properties":{"flag_key":"<span id="curl_flag_key"></span>","variant":"<span id="curl_variant"></span>"}}]}'
</code>
</pre>

| <div class='big-column'>Variable</div> | Description |
| --- | --- |
|  <textarea class="at-field" spellcheck="false" placeholder="analytics_api_key" id="api_key"></textarea> | The analytics API key from [project](../../general/data-model.md#projects) which you created your [flag](../../general/data-model.md#flags-and-experiments) and [deployment](../../general/data-model.md#deployments) in. |
| <textarea class="at-field" spellcheck="false" placeholder="user_id" id="user_id"></textarea> | The user's ID. |
| <textarea class="at-field" spellcheck="false" placeholder="device_id" id="device_id"></textarea> | The user's device ID. |
| <textarea class="at-field" spellcheck="false" placeholder="flag_key" id="flag_key"></textarea> | The flag key of the flag or experiment the user has been exposed to. |
| <textarea class="at-field" spellcheck="false" placeholder="variant" id="variant"></textarea> | The variant key (e.g. `on`, `control`, `treatment`). |
| <a class="md-button" onclick="trackExposure()">Track Exposure</a> | |

Result:
<pre>
<code id="result">
</code>
</pre>

<script>
function setCurlVariable(id, query) {
    let value = document.getElementById(id).value;
    if (value) {
        value = value.trim();
    }
    if (query) {
        if (value && value.length > 0) {
            document.getElementById('curl_' + id).innerHTML =
                '&' + id + '=' + encodeURIComponent(value);
        } else {
            document.getElementById('curl_' + id).innerHTML = '';
        }
    } else {
        document.getElementById('curl_' + id).innerHTML = value;
    }
}
function setupCurlVariable(id, query) {
    setCurlVariable(id, query);
    document.getElementById(id).addEventListener('input', function() {
        setCurlVariable(id, query);
    }, false);
}

document.getElementById('api_key').value =
     localStorage.getItem('api_key') || 'api_key';

setupCurlVariable('api_key', false);
setupCurlVariable('user_id', false);
setupCurlVariable('device_id', false);
setupCurlVariable('flag_key', false);
setupCurlVariable('variant', false);

// Fetch Variants for the table above
async function trackExposure() {
     const apiKey = document.getElementById("api_key").value.trim();
     const userId = document.getElementById("user_id").value.trim();
     const deviceId = document.getElementById("device_id").value.trim();
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
          document.getElementById("result").innerHTML = JSON.stringify(result, null, 2);
     } catch (e) {
          document.getElementById("result").innerHTML = e;
     }
}
</script>