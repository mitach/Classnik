const baseUrl = 'http://localhost:8080/api/auth';

export const register = async (userData) => {
    const response = await fetch(baseUrl + '/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if (response.ok) {
        const result = await response.json();

        return result;
    } else {
        throw new Error({message: 'Unable to create user!'})
    }
}

export const login = async (userData) => {
    const response = await fetch(baseUrl + '/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if (response.ok) {
        const result = await response.json();
        
        console.log(result);

        return result;
    } else {
        throw new Error({message: 'Unable to create user!'})
    }
}