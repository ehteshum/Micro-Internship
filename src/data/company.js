const COMPANY_POSTS_KEY = 'internx_company_posts'
const COMPANY_APPLICANTS_KEY = 'internx_company_applicants'
const COMPANY_REVIEWS_KEY = 'internx_company_reviews'

const seedCompanyPosts = [
  {
    id: 'company-post-1',
    title: 'React Hiring Sprint',
    company: 'TechBridge',
    deadline: 'June 15, 2026',
    duration: '4 weeks',
    status: 'Active',
    skills: ['React', 'UI Design', 'Team Collaboration'],
    applicants: 18,
    summary: 'Post a focused front-end challenge for candidates to build a responsive product dashboard.',
  },
  {
    id: 'company-post-2',
    title: 'Design System Audit',
    company: 'Pulse Labs',
    deadline: 'June 22, 2026',
    duration: '5 weeks',
    status: 'Active',
    skills: ['Figma', 'Accessibility', 'Visual Design'],
    applicants: 12,
    summary: 'Review and improve a design system with accessible components and consistent spacing.',
  },
  {
    id: 'company-post-3',
    title: 'Product Content Sprint',
    company: 'Storyline',
    deadline: 'June 30, 2026',
    duration: '3 weeks',
    status: 'Active',
    skills: ['Content Strategy', 'Copywriting', 'Research'],
    applicants: 9,
    summary: 'Create a launch-ready content plan that aligns with product goals and learner journeys.',
  },
]

const seedCompanyApplicants = [
  {
    id: 'applicant-1',
    name: 'John Doe',
    skills: ['React', 'UI Design'],
    status: 'Pending',
    project: 'Responsive internship portal redesign',
    appliedDate: 'May 01, 2026',
  },
  {
    id: 'applicant-2',
    name: 'Ananya Rai',
    skills: ['Figma', 'Accessibility'],
    status: 'Interview',
    project: 'Design system audit for student onboarding',
    appliedDate: 'May 04, 2026',
  },
  {
    id: 'applicant-3',
    name: 'Luis Gómez',
    skills: ['Research', 'Content Strategy'],
    status: 'Reviewed',
    project: 'Landing page content sprint',
    appliedDate: 'May 09, 2026',
  },
  {
    id: 'applicant-4',
    name: 'Mina Hassan',
    skills: ['Frontend', 'Tailwind CSS'],
    status: 'Pending',
    project: 'Dashboard interaction prototype',
    appliedDate: 'May 12, 2026',
  },
]

const seedReviewSubmissions = [
  {
    id: 'review-1',
    studentName: 'Aisha Tran',
    projectLink: 'https://example.com/projects/aisha-tran',
    fileName: 'internx-portfolio.pdf',
    notes: 'Built a responsive landing page with clear hierarchy and task flow.',
    reviewed: false,
    feedback: '',
  },
  {
    id: 'review-2',
    studentName: 'Noah Kim',
    projectLink: 'https://example.com/projects/noah-kim',
    fileName: 'product-content-plan.docx',
    notes: 'Delivered a concise content strategy with measurable outcomes.',
    reviewed: false,
    feedback: '',
  },
  {
    id: 'review-3',
    studentName: 'Sara Patel',
    projectLink: 'https://example.com/projects/sara-patel',
    fileName: 'design-system-audit.pdf',
    notes: 'Completed an accessibility audit with clear recommendations.',
    reviewed: true,
    feedback: 'Strong start. Please polish the responsive grid rules and finalize the component naming.',
  },
]

function readStorage(key, fallback) {
  if (typeof window === 'undefined') {
    return [...fallback]
  }

  try {
    const stored = window.localStorage.getItem(key)
    if (!stored) {
      window.localStorage.setItem(key, JSON.stringify(fallback))
      return [...fallback]
    }

    const parsed = JSON.parse(stored)
    return Array.isArray(parsed) ? parsed : [...fallback]
  } catch {
    return [...fallback]
  }
}

function writeStorage(key, value) {
  if (typeof window === 'undefined') {
    return
  }
  window.localStorage.setItem(key, JSON.stringify(value))
}

function getVerifiedSkillsFromStorage() {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const stored = window.localStorage.getItem('verified_skills')
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveVerifiedSkills(skills) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem('verified_skills', JSON.stringify(skills))
}

let companyPosts = readStorage(COMPANY_POSTS_KEY, seedCompanyPosts)
let companyApplicants = readStorage(COMPANY_APPLICANTS_KEY, seedCompanyApplicants)
let reviewSubmissions = readStorage(COMPANY_REVIEWS_KEY, seedReviewSubmissions)

export function getCompanyPosts() {
  return [...companyPosts]
}

export function getCompanyApplicants() {
  return [...companyApplicants]
}

export function getReviewSubmissions() {
  return [...reviewSubmissions]
}

export function getVerifiedSkills() {
  return getVerifiedSkillsFromStorage()
}

export function getCompanyStats() {
  return {
    totalPosts: companyPosts.length,
    activeInternships: companyPosts.filter((post) => post.status === 'Active').length,
    applicants: companyApplicants.length,
    reviewPending: reviewSubmissions.filter((item) => !item.reviewed).length,
  }
}

export function addCompanyPost(post) {
  const companyEmail = typeof window !== 'undefined' ? window.localStorage.getItem('user_email') : ''
  const companyName = companyEmail ? companyEmail.split('@')[0] : 'Hiring Team'
  const newPost = {
    id: `company-post-${Date.now()}`,
    company: companyName,
    status: 'Active',
    applicants: 0,
    duration: post.duration || '4 weeks',
    ...post,
  }
  companyPosts = [newPost, ...companyPosts]
  writeStorage(COMPANY_POSTS_KEY, companyPosts)
  return newPost
}

export function addCompanyApplicant(applicant) {
  const appliedDate = applicant.appliedDate ||
    new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })

  const nextApplicant = {
    id: `company-applicant-${Date.now()}`,
    status: 'Pending',
    appliedDate,
    ...applicant,
  }
  companyApplicants = [nextApplicant, ...companyApplicants]
  writeStorage(COMPANY_APPLICANTS_KEY, companyApplicants)
  return nextApplicant
}

function addVerifiedSkill(skill) {
  const normalizedSkill = skill?.trim()
  if (!normalizedSkill) return
  const currentSkills = getVerifiedSkillsFromStorage()
  const nextSkills = Array.from(new Set([...currentSkills, normalizedSkill]))
  saveVerifiedSkills(nextSkills)
  return nextSkills
}

export function approveSubmission(reviewId) {
  const skillMap = {
    'review-1': 'React',
    'review-2': 'Content Strategy',
    'review-3': 'Design System',
  }

  reviewSubmissions = reviewSubmissions.map((item) =>
    item.id === reviewId ? { ...item, reviewed: true, feedback: item.feedback || 'Approved by company.' } : item,
  )
  writeStorage(COMPANY_REVIEWS_KEY, reviewSubmissions)
  addVerifiedSkill(skillMap[reviewId])
}

export function saveReviewFeedback(reviewId, feedback) {
  reviewSubmissions = reviewSubmissions.map((item) =>
    item.id === reviewId ? { ...item, feedback, reviewed: Boolean(feedback) } : item,
  )
  writeStorage(COMPANY_REVIEWS_KEY, reviewSubmissions)
}
