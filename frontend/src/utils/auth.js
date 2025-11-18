const BASE_URL = "http://localhost:3000";

export const signUp = async (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
    .then(res => {
      const data = res.json();
      if (res.ok) {
        return { data, status: res.status };
      }
    }).catch((err) => {
      throw new Error("Error en el registro: " + err.message);
    });

};

export const signIn = async (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  }).then(res => {

    if (res.ok) {
      return res.json();
    }
  }).catch((err) => {
    throw new Error("Error en el inicio de sesión: " + err.message);
  });

};

export const getUser = async (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  }).then((res) => {
    if (!res.ok) throw new Error("Error al obtener los datos del usuario");
    return res.json(); // { email }
  });
};