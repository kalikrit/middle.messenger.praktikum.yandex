const METHODS = {
    GET: 'GET',
    PUT: 'PUT',
    POST: 'POST',
    DELETE: 'DELETE'
};

/**
* Функцию реализовывать здесь необязательно, но может помочь не плодить логику у GET-метода
* На входе: объект. Пример: {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}
* На выходе: строка. Пример: ?a=1&b=2&c=[object Object]&k=1,2,3
*/
function queryStringify(data) {
    if (typeof data !== 'object') {
      throw new Error('Data must be object');
    }
  
    // Здесь достаточно и [object Object] для объекта
    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
      return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
    }, '?');
}  

class HTTPTransport {
    get = (url, options = {}) => {
        return this.request(url, {...options, method: METHODS.GET}, options.timeout);
    };

    post = (url, options = {}) => {    
        return this.request(url, {...options, method: METHODS.POST}, options.timeout);
    };    

    put = (url, options = {}) => {    
        return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
    };
    
    delete = (url, options = {}) => {    
        return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
    };

    // options:
    // headers — obj
    // data — obj
    request = (url, options, timeout = 5000) => {
        const { headers = {}, method, data } = options;

        return new Promise((resolve, reject) => {
            if(!method) {
                reject('No method');
                return;
            }
            const xhr = new XMLHttpRequest();
            const isGet = method === METHODS.GET;

            xhr.open(
                method,
                isGet && !!data ? `${url}${queryStringify(data)}` : url
            );
            
            xhr.onload = function() {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.timeout = timeout;
            xhr.ontimeout = reject;
            
            if (isGet || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });            
    };
}

// test methods
// new HTTPTransport().get('https://httpbin.org/get', {a:1,c:[5,5,5]});
// new HTTPTransport().post('https://httpbin.org/post', {a:1, b:2});
// new HTTPTransport().put('https://httpbin.org/put', {a:1, b:2});
// new HTTPTransport().delete('https://httpbin.org/delete', {a:1});
