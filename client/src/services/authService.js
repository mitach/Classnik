const baseUrl = 'http://localhost:8080/api/auth';

export const register = async (userData) => {
    try {
        const response = await fetch(baseUrl + '/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const result = await response.json();

        if (!result.role && !result.token && result.message) {
            throw new Error(result.message);
        }

        return result;
    } catch (error) {
        return error;
    }
}

export const login = async (userData) => {
    try {
        const response = await fetch(baseUrl + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const result = await response.json();

        if (!result.role && !result.token && result.message) {
            throw new Error(result.message);
        }

        return result;
    } catch (error) {
        return error;
    }
}

export const changePassword = async (userId, passwords) => {
    try {
        const response = await fetch(baseUrl + `/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(passwords),
        });

        const result = await response.json();

        if (result.message) {
            throw new Error(result.message);
        }

        return result;
    } catch (error) {
        return error;
    }
}   