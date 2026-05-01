const storageKey = 'internx_applications'

const seedApplications = [
  {
    id: '1',
    title: 'UI Design Task',
    company: 'StartupX',
    deadline: 'May 08, 2026',
    status: 'Open',
    appliedDate: 'April 28, 2026',
  },
  {
    id: '2',
    title: 'Frontend Feature Build',
    company: 'Google',
    deadline: 'May 11, 2026',
    status: 'Closing Soon',
    appliedDate: 'April 26, 2026',
  },
  {
    id: '3',
    title: 'Backend API Integration',
    company: 'Microsoft',
    deadline: 'May 14, 2026',
    status: 'Completed',
    appliedDate: 'April 20, 2026',
    completedDate: 'April 25, 2026',
  },
]

function loadApplications() {
  if (typeof window === 'undefined') {
    return seedApplications
  }

  try {
    const stored = window.localStorage.getItem(storageKey)
    if (!stored) {
      window.localStorage.setItem(storageKey, JSON.stringify(seedApplications))
      return [...seedApplications]
    }

    const parsed = JSON.parse(stored)
    return Array.isArray(parsed) ? parsed : [...seedApplications]
  } catch {
    return [...seedApplications]
  }
}

function persistApplications(nextApplications) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(storageKey, JSON.stringify(nextApplications))
}

export let applications = loadApplications()

export function addApplication(item) {
  const appliedDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  const existingIndex = applications.findIndex((application) => application.id === item.id)
  const nextItem = {
    ...item,
    status: item.status || 'Applied',
    appliedDate,
  }

  if (existingIndex >= 0) {
    applications = applications.map((application, index) =>
      index === existingIndex ? { ...application, ...nextItem } : application,
    )
  } else {
    applications = [nextItem, ...applications]
  }

  persistApplications(applications)
  return nextItem
}

export function removeApplication(id) {
  applications = applications.filter((application) => application.id !== id)
  persistApplications(applications)
}

export function getApplicationStats() {
  return {
    total: applications.length,
    open: applications.filter((application) => application.status === 'Open').length,
    closing: applications.filter((application) => application.status === 'Closing Soon').length,
    completed: applications.filter((application) => application.status === 'Completed').length,
  }
}
