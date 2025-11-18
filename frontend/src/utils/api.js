class Api {
    constructor(baseURL, headers) {
        this.baseURL = baseURL;
        this.headers = headers;
    }
    //Metodo generico
    makeRequest(endpoint, method, body) {
        return fetch(`${this.baseURL}${endpoint}`, {
            method,
            headers: this.headers,
            body: body ? JSON.stringify(body) : undefined,
        })
            .then((response) => {
                if (!response.ok) {
                    return Promise.reject(`Error: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .catch((error) => {
                console.error("Error en la solicitud: ", error);
                throw error;
            })
    }

    getProfileInfo() {
        return this.makeRequest('/users/me', 'GET');
    }

    editProfileInfo(data) {
        return this.makeRequest('/users/me', 'PATCH', data);
    }

    editProfilePhoto(data) {
        return this.makeRequest('/users/me/avatar', 'PATCH', data);
    }

    getInitialCards() {
        return this.makeRequest('/cards/', 'GET');
    }

    addCards(data) {
        return this.makeRequest('/cards/', 'POST', data);
    }

    toggleLike(cardId, isLiked) {
        return this.makeRequest(`/cards/${cardId}/likes`, isLiked ? 'DELETE' : 'PUT')
    }

    deleteCard(cardId) {
        return this.makeRequest(`/cards/${cardId}`, 'DELETE');
    }
}
export const api = new Api('https://around-api.es.tripleten-services.com/v1', {
    authorization: "cc2dd37e-7290-4ede-a93a-4eaf9c88b109",
    "Content-Type": "application/json"
})