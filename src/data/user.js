const storageKey = 'internx_user_plan'

function loadPlan() {
  if (typeof window === 'undefined') {
    return 'free'
  }

  const stored = window.localStorage.getItem(storageKey)

  if (stored === 'pro' || stored === 'free') {
    return stored
  }

  window.localStorage.setItem(storageKey, 'free')
  return 'free'
}

export function getUserPlan() {
  if (typeof window === 'undefined') {
    return 'free'
  }

  return loadPlan()
}

export function upgradePlan() {
  if (typeof window === 'undefined') {
    return 'pro'
  }

  window.localStorage.setItem(storageKey, 'pro')
  return 'pro'
}

export function getApplicationLimit() {
  return getUserPlan() === 'pro' ? Infinity : 3
}
