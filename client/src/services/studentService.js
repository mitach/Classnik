const baseUrl = 'http://localhost:8080/api/students';

export const getStudents = async (pageSize, currPage) => {
    const response = await fetch(baseUrl + `?pagesize=${pageSize}&page=${currPage}`);

    const result = await response.json();

    return result;
}

export const getMe = async (userId) => {
    const response = await fetch(baseUrl + `/${userId}`);

    if (response.ok) {
        const result = await response.json();

        return result;
    } else {
        throw new Error({ message: 'Unable to get student!' })
    }
}

export const getMeByEmail = async (email) => {
    const response = await fetch(baseUrl + `/byemail/${email}`);

    if (response.ok) {
        const result = await response.json();

        return result;
    } else {
        throw new Error({ message: 'Unable to get student!' })
    }
}

export const getCount = async () => {
    const response = await fetch(baseUrl + '/count');

    if (response.ok) {
        const result = await response.json();

        return result.count;
    } else {
        throw new Error({ message: 'Unable to get count of teachers!' })
    }
}

export const create = async (studentInfo) => {
    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentInfo),
    });

    if (response.ok) {
        const result = await response.json();

        return result;
    } else {
        throw new Error({ message: 'Unable to create student!' })
    }
}

export const remove = async (studentId) => {
    const response = await fetch(baseUrl + `/${studentId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (response.ok) {
        const result = await response.json();

        return result.id;
    } else {
        throw new Error({ message: 'Unable to delete student!' });
    }
}