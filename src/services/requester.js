const request = async (method, url, data, format) => {
    try {
        let response;

        if (method === 'GET') {
            response = await fetch(url);
        } else {
            const body = format === 'raw' ? data : JSON.stringify(data);
            const headers = format === 'raw' ? {} : { 'Content-Type': 'application/json' };

            response = await fetch(url, {
                method,
                headers,
                body
            });
        }

        const result = await response.json();
        return result;
    }
    catch (error) {
        throw new Error(error);
    }
}

export const get = request.bind({}, 'GET');
export const post = request.bind({}, 'POST');
export const patch = request.bind({}, 'PATCH');
export const del = request.bind({}, 'DELETE');