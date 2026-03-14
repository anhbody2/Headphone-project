import api from "./axios";
export const register = (data: any) =>
  api.post("/register", data);

export const login = (data: any) =>
  api.post("/login", data);

export const logout =async (token: string) =>
  await api.post("/logout", {}, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const refreshToken = (token: string) =>
  api.post("/refresh", {}, {
    headers: { Authorization: `Bearer ${token}` },
  }); 
export const changePassword = async (data: any) => {
   const res = api.post("/changepassword", data);
   return res;
};

export const loginUser = async (email: string, password: string) => {
  return await login({ email, password });;
};

export const registerUser = async (data: any) => {
  const res = await register(data);
  localStorage.setItem("token", res.data.token);
  return res.data.user_name;
};