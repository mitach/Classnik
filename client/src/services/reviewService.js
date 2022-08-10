const baseUrl = 'http://localhost:8080/api/reviews';

export const getStudentReviews = async (userId) => {
    const response = await fetch(baseUrl + `/student/${userId}`);

    if (response.ok) {
        const result = await response.json();
        console.log(result);
        return result;
    } else {
        throw new Error({ message: 'Unable to get reviews for user!' });
    }
}

export const create = async (data) => {
    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        const result = await response.json();

        return result;
    } else {
        throw new Error({ message: 'Unable to post review!' });
    }
}
