const baseUrl = 'http://localhost:8080/api/studentclass';

export const getClasses = async () => {
    const response = await fetch(baseUrl);

    if (response.ok) {
        const result = await response.json();

        return result;
    } else {
        throw new Error({ message: 'Unable to get classes!' })
    }
}

export const createClass = async (classData) => {
    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(classData),
    });

    if (response.ok) {
        const result = await response.json();

        return result;
    } else {
        throw new Error({ message: 'Unable to create class!' })
    }
}
