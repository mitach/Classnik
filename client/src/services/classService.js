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

export const getClass = async (studentClassName) => {
    const response = await fetch(baseUrl + `/student-class/${studentClassName}`);

    const result = await response.json();

    return result;
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

export const updateSchedule = async (data) => {
    const response = await fetch(baseUrl + '/schedule', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    return result;
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