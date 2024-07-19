const API = import.meta.env

const API_ENV = {
  apiAuthReg: `${API.VITE_API_URL}users/register`,
  apiAuthSign: `${API.VITE_API_URL}users`
}

export default API_ENV
