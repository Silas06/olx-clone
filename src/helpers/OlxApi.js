import Cookies from "js-cookie";
import qs from "qs";

const BASE_URL = "http://alunos.b7web.com.br:501";

const apiFetchFile = async (endpoint, body) => {
    if (!body.token) {
    const token = Cookies.get("token");
    if (token) {
      body.token = token;
      body.append('token', token);
    }
  }

  const res = await fetch(BASE_URL + endpoint, {
    method: "POST",
  
    body
  });
  const json = res.json();

  if (json.notallowed) {
    window.location.href = "/signin";
    return;
  }

  return json;
}

const apiFetchPost = async (endpoint, body) => {
  if (!body.token) {
    const token = Cookies.get("token");
    if (token) {
      body.token = token;
    }
  }

  const res = await fetch(BASE_URL + endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const json = res.json();

  if (json.notallowed) {
    window.location.href = "/signin";
    return;
  }

  return json;
};

const apiFetchPut = async (endpoint, body) => {
  if (!body.token) {
    const token = Cookies.get("token");
    if (token) {
      body.token = token;
    }
  }

  const res = await fetch(BASE_URL + endpoint, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const json = res.json();

  if (json.notallowed) {
    window.location.href = "/signin";
    return;
  }

  return json;
};

const apiFetchGet = async (endpoint, body = []) => {
  if (!body.token) {
    const token = Cookies.get("token");
    if (token) {
      body.token = token;
    }
  }

  const res = await fetch(`${BASE_URL + endpoint}?${qs.stringify(body)}`);
  const json = res.json();

  if (json.notallowed) {
    window.location.href = "/signin";
    return;
  }

  return json;
};

const OlxAPI = {
  login: async (email, password) => {
    const json = await apiFetchPost("/user/signin", { email, password });
    return json;
  },

  register: async (name, email, password, state) => {
    const json = await apiFetchPost("/user/signup", {
      name,
      email,
      password,
      state,
    });
    return json;
  },

  editUser: async (name, email, password, state) => {
    const json = await apiFetchPut("/user/me", {
      name,
      email,
      state,
      password,
    });
    return json;
  },

  getStates: async () => {
    const json = await apiFetchGet("/states");

    return json.states;
  },

  getCategories: async () => {
    const json = await apiFetchGet("/categories");

    return json.categories;
  },

  getInfoUser: async () => {
    const json = await apiFetchGet("/user/me" );

    return json;
  },

  getAds: async (options) => {
    console.log(options)
    const json = await apiFetchGet("/ad/list", options);

    return json;
  },

  getAd: async (id, other) => {
    const json = await apiFetchGet("/ad/item", { id, other });

    return json;
  },

  addAd: async (fData) => {
    const json = await apiFetchFile('/ad/add', fData)

    return json
  },

  editAd: async (id,fData) => {
    const json = await apiFetchFile(`/ad/${id}`, fData)

    return json
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default () => OlxAPI;
