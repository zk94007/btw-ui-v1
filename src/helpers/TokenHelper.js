export function parseJwt (token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

export function isTokenValid({ expiresIn, startTime }) {
    try {
        const nowInMilliseconds = new Date().getTime();
        return ((expiresIn * 1000) + startTime) - nowInMilliseconds > 0;
    }
    catch (e) {
        return false;
    }
}
