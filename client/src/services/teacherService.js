const baseUrl = 'http://localhost:8080/api/teachers';

export const getCount = async () => {
    const respone = await fetch(baseUrl + '/count');

    if (respone.ok) {
        const result = await respone.json();

        return  result.count;
    } else {
        throw new Error({ message: 'Unable to get count of teachers!' })
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
        console.log(result);
        return result;
    } else {
        throw new Error({ message: 'Unable to create teacher!' })
    }
}