import $ from 'jquery';


function makeAuth(type) {
    const token = sessionStorage.getItem("authtoken");
    
    return (token && token.length)
            ? 'Bearer ' + token
            : 'Basic';
}

function makeRequest(method, url, auth) {
    
    return {
        type: method,
        url: url,
        //headers: {"X-Test-Header": "test-value"}
        headers: {
            /*'Content-Type': 'application/json',*/
            'Authorization': makeAuth(auth)
        }
    };
}

function get(url, auth) {
    return $.ajax(makeRequest('GET', url, auth));
}

function post(url, auth, data) {
    let req = makeRequest('POST', url, auth);
    req.data = data;//JSON.stringify(data);
    
    return $.ajax(req);
}


export default {
    get,
    post
}



