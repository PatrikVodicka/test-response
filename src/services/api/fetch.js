let abortControllerList = {}

function abortPreviousRequest(nameController) {
    if (abortControllerList[nameController]) {
        abortControllerList[nameController].abort()
    }

    abortControllerList[nameController] = new AbortController()
}

function mergeUrlAndParams(url, params) {
    return `${url}?${new URLSearchParams(params).toString()}`
}

function headersToObject(headers) {
    let headersObject = {}

    for (let [key, value] of headers) {
        headersObject[key] =  value
    }

    return headersObject
}

function makeRequest(method, url, params, nameController = url) {
    abortPreviousRequest(nameController)

    return new Promise( (resolve, reject) => {
        if (method === 'GET' && params) {
            url = mergeUrlAndParams(url, params)
        }

        fetch(url, {
            method,
            params,
            signal: abortControllerList[nameController].signal
        }).then(response => resolve({
            headers: headersToObject(response.headers),
            data: response.json(),
        })).catch(reject)
    })
}

function get (url, params, nameController) {
    return makeRequest('GET', url, params, nameController)
}

export {
    get as fetchGet
}