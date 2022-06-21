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

/**
 * Setup an interactive api table.
 *
 * @param {object} ids map of textarea id to bool, if the field is a query param
 * @param {async function(object): string} action the async action function, takes a map of id:value as input and
 * should return a string.
 */
function setupApiTable(ids, action) {
    for (const id of Object.keys(ids)) {
        let value = ids[id];
        setupCurlVariable(id, value || false);
    }
    const button = document.getElementById('at-action-button');
    button.addEventListener('click', async function() {
        let fields = {};
        for (const id of Object.keys(ids)) {
            let value = document.getElementById(id).value.trim();
            fields[id] = value;
        }
        try {
            const result = await action(fields);
            document.getElementById("result").innerHTML = result;
        } catch (e) {
            document.getElementById("result").innerHTML = e;
        }
    });
}