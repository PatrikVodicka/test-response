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

function makeRequst(method, url, params, nameController = url) {
    abortPreviousRequest(nameController)

    return new Promise(async (resolve, reject) => {
        if (method === 'GET' && params) {
            url = mergeUrlAndParams(url, params)
        }

        try {
            const response = await fetch(url, {
                method,
                params,
                signal: abortControllerList[nameController].signal,
            })

            const responseObject = {
                headers: headersToObject(response.headers),
                data: await response.json(),
            }

            resolve(responseObject)
        } catch(err) {
            if (err.name !== 'AbortError') {
                reject(err)
            }
        }
    })
}

function get (url, params, nameController) {
    return makeRequst('GET', url, params, nameController)
}

export {
    get as fetchGet
}