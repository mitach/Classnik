const baseUrl = 'http://localhost:8080/api';

export const getClasses = async () => {
    const response = await fetch(baseUrl + '/studentclass');

    if (response.ok) {
        const result = await response.json();

        return result;
    } else {
        throw new Error({ message: 'Unable to get classes!' })
    }
}

export const createClass = async (classInfo) => {
    const response = await fetch(baseUrl + '/studentclass', {
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

export const createStudent = async (studentInfo) => {
    const response = await fetch(baseUrl + '/students', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentInfo),
    });

    if (response.ok) {
        const result = await response.json();
        console.log(result);
        return result;
    } else {
        throw new Error({ message: 'Unable to create student!' })
    }
}