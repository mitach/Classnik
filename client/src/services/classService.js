const baseUrl = 'http://localhost:8080/api/studentclass';

export const getCount = async () => {
    const response = await fetch(baseUrl + '/count');

    if (response.ok) {
        const result = await response.json();

        return result.count;
    } else {
        throw new Error({ message: 'Unable to get count of classes!' })
    }
}

export const getClasses = async () => {
    const response = await fetch(baseUrl);

    if (response.ok) {
        const result = await response.json();

        return result;
    } else {
        throw new Error({ message: 'Unable to get classes!' })
    }
}

export const getClassStudents = async (id) => {
    const response = await fetch(baseUrl + `/${id}`);

    if (response.ok) {
        const result = await response.json();

        return result.students;
    }
}

export const createClass = async (classInfo) => {
    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(classInfo),
    });

    if (response.ok) {
        const result = await response.json();

        return result;
    } else {
        throw new Error({ message: 'Unable to create class!' })
    }
}