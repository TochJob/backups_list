const API = import.meta.env

const API_ENV = {
  apiBackups: `${API.VITE_API_URL}backups`,
  apiProjects: `${API.VITE_API_URL}projects`
}

export default API_ENV
