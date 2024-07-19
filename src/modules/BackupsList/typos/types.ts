interface Project {
  id: string
  name: string
}

interface Backup extends Project {
  date: string
  size: string
}
export type { Backup, Project }
