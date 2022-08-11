const baseUrl = 'http://localhost:8080/api/grades';

export const getCount = async () => {
    const response = await fetch(baseUrl + '/count');

    if (response.ok) {
        const result = await response.json();

        return result.count;
    } else {
        throw new Error({ message: 'Unable to get count of grades!' })
    }
}

export const getCountForStudent = async (userId) => {
    const response = await fetch(baseUrl + `/${userId}`);

    if (response.ok) {
        const result = await response.json();

        return result;
    } else {
        throw new Error({ message: 'Unable to get count of grades!' })
    }
}

export const getAverageGrade = async (email) => {
    try {
        const response = await fetch(baseUrl + `/byemail/${email}`);

        const result = await response.json();

        if (!result.average && result.message) {
            throw new Error(result.message);
        }

        return result;
    } catch (error) {
        return error;
    }
}

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

export const remove = async (gradeId) => {
    const response = await fetch(baseUrl + `/${gradeId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (response.ok) {
        const result = await response.json();

        return result;
    } else {
        throw new Error({ message: 'Unable to create teacher!' });
    }
}