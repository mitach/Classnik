const baseUrl = 'http://localhost:8080/api/parents';

export const getCount = async () => {
    const response = await fetch(baseUrl + '/count');

    if (response.ok) {
        const result = await response.json();

        return result.count;
    } else {
        throw new Error({ message: 'Unable to get count of parents!' })
    }
}

export const getMe = async (userId) => {
    const response = await fetch(baseUrl + `/${userId}`);

    if (response.ok) {
        const result = await response.json();

        return result;
    } else {
        throw new Error({ message: 'Unable to get parent!' })
    }
}