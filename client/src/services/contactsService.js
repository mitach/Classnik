const baseUrl = 'http://localhost:8080/api/contacts';

export const get = async () => {
    const response = await fetch(baseUrl);

    if (response.ok) {
        const result = await response.json();

        return result;
    } else {
        throw new Error({ message: 'Unable to check for existance' })
    }
}

export const create = async (data) => {
    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        const result = await response.json();

        return result;
    } else {
        throw new Error({ message: 'Unable to post contacts!' })
    }
}

export const edit = async (data) => {
    const response = await fetch(baseUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });
}
