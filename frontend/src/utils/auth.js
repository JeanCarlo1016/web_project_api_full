const BASE_URL = "http://localhost:3000";

// ---------- SIGN UP ----------
export const signUp = async (email, password) => {
  return fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
    .then(async res => {
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Error en el registro");
      }
      return data;
    })
    .catch((err) => {
      throw new Error("Error en el registro: " + err.message);
    });
};


// ---------- SIGN IN ----------
export const signIn = async (email, password) => {
  return fetch(`${BASE_URL}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
    .then(async res => {
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Error en el inicio de sesión");
      }
      return data;
    })
    .catch((err) => {
      throw new Error("Error en el inicio de sesión: " + err.message);
    });
};


// ---------- GET USER ----------
export const getUser = async (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })
    .then(async (res) => {
      if (!res.ok) throw new Error("Error al obtener los datos del usuario");
      return res.json();
    });
};
