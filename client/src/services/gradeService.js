const baseUrl = 'http://localhost:8080/api/grades';

export const add = async (data) => {
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
        throw new Error({ message: 'Unable to create teacher!' });
    }
}