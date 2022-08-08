const baseUrl = 'http://localhost:8080/api/teachers';

export const getMe = async (id) => {
    const response = await fetch(baseUrl + `/${id}`);

    if (response.ok) {
        const result = await response.json();

        return result;
    } else {
        throw new Error({ message: 'Unable to get teacher!' });
    }
}

export const getAll = async () => {
    const response = await fetch(baseUrl);

    if (response.ok) {
        const result = await response.json();

        return result.teachers;
    } else {
        throw new Error({ message: 'Unable to get teachers!' });
    }
}

export const getCount = async () => {
    const response = await fetch(baseUrl + '/count');

    if (response.ok) {
        const result = await response.json();

        return result.count;
    } else {
        throw new Error({ message: 'Unable to get count of teachers!' });
    }
}

export const create = async (teacherInfo) => {
    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(teacherInfo),
    });

    if (response.ok) {
        const result = await response.json();

        return result;
    } else {
        throw new Error({ message: 'Unable to create teacher!' });
    }
}

export const remove = async (teacherId) => {
    const response = await fetch(baseUrl + `/${teacherId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (response.ok) {
        const result = await response.json();

        return result.id;
    } else {
        throw new Error({ message: 'Unable to delete teacher!' });
    }
}