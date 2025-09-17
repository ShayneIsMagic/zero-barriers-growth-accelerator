// Application Constants for Zero Barriers Growth Accelerator

// User Roles and Permissions
export const USER_ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  C_SUITE: 'C_SUITE',
  PRODUCER: 'PRODUCER',
  USER: 'USER',
} as const;

export const USER_ROLE_HIERARCHY = {
  [USER_ROLES.USER]: 1,
  [USER_ROLES.PRODUCER]: 2,
  [USER_ROLES.C_SUITE]: 3,
  [USER_ROLES.ADMIN]: 4,
  [USER_ROLES.SUPER_ADMIN]: 5,
} as const;

// Project Status
export const PROJECT_STATUS = {
  ACTIVE: 'ACTIVE',
  PAUSED: 'PAUSED',
  COMPLETED: 'COMPLETED',
  ARCHIVED: 'ARCHIVED',
} as const;

// Content Types
export const CONTENT_TYPES = {
  WEBSITE_COPY: 'WEBSITE_COPY',
  MARKETING_COPY: 'MARKETING_COPY',
  SOCIAL_MEDIA: 'SOCIAL_MEDIA',
  EMAIL_SEQUENCE: 'EMAIL_SEQUENCE',
  LANDING_PAGE: 'LANDING_PAGE',
  AD_COPY: 'AD_COPY',
  PRODUCT_DESCRIPTION: 'PRODUCT_DESCRIPTION',
  COMPANY_OVERVIEW: 'COMPANY_OVERVIEW',
  OTHER: 'OTHER',
} as const;

// Analysis Status
export const ANALYSIS_STATUS = {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
} as const;

// Priority Levels
export const PRIORITY_LEVELS = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL',
} as const;

// Severity Levels
export const SEVERITY_LEVELS = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL',
} as const;

// Score Ranges
export const SCORE_RANGES = {
  EXCELLENT: { min: 90, max: 100, label: 'Excellent' },
  GOOD: { min: 80, max: 89, label: 'Good' },
  AVERAGE: { min: 70, max: 79, label: 'Average' },
  BELOW_AVERAGE: { min: 60, max: 69, label: 'Below Average' },
  POOR: { min: 0, max: 59, label: 'Poor' },
} as const;

// Golden Circle Elements
export const GOLDEN_CIRCLE_ELEMENTS = {
  WHY: 'WHY',
  HOW: 'HOW',
  WHAT: 'WHAT',
} as const;

// Consumer Value Elements (30 elements)
export const CONSUMER_VALUE_ELEMENTS = {
  // Functional Value
  SAVES_TIME: 'Saves Time',
  SIMPLIFIES: 'Simplifies',
  MAKES_MONEY: 'Makes Money',
  REDUCES_RISK: 'Reduces Risk',
  ORGANIZES: 'Organizes',
  INTEGRATES: 'Integrates',
  CONNECTS: 'Connects',
  REDUCES_EFFORT: 'Reduces Effort',
  AVOIDS_HASSLES: 'Avoids Hassles',
  REDUCES_COST: 'Reduces Cost',
  QUALITY: 'Quality',
  VARIETY: 'Variety',
  SENSORY_APPEAL: 'Sensory Appeal',
  INFORMS: 'Informs',

  // Emotional Value
  REDUCES_ANXIETY: 'Reduces Anxiety',
  REWARDS: 'Rewards',
  NOSTALGIA: 'Nostalgia',
  DESIGN: 'Design',
  BADGE_VALUE: 'Badge Value',
  WELLNESS: 'Wellness',
  THERAPEUTIC: 'Therapeutic',
  FUN: 'Fun',
  ATTRACTIVENESS: 'Attractiveness',
  PROVIDES_ACCESS: 'Provides Access',

  // Life-Changing Value
  PROVIDES_HOPE: 'Provides Hope',
  SELF_ACTUALIZATION: 'Self-Actualization',
  MOTIVATION: 'Motivation',
  HEIRLOOM: 'Heirloom',
  AFFILIATION: 'Affiliation',

  // Social Impact Value
  SELF_TRANSCENDENCE: 'Self-Transcendence',
} as const;

// B2B Value Elements (40 elements)
export const B2B_VALUE_ELEMENTS = {
  // Table Stakes
  ACCURACY: 'Accuracy',
  AVAILABILITY: 'Availability',
  CONTINUITY: 'Continuity',
  ETHICS: 'Ethics',
  INTEGRATION: 'Integration',
  PRIVACY: 'Privacy',
  REGULATORY_COMPLIANCE: 'Regulatory Compliance',
  RELIABILITY: 'Reliability',
  RESPONSIVENESS: 'Responsiveness',
  SECURITY: 'Security',
  USABILITY: 'Usability',

  // Functional Value
  COST_EFFECTIVENESS: 'Cost Effectiveness',
  CONVENIENCE: 'Convenience',
  CUSTOMIZATION: 'Customization',
  EFFICIENCY: 'Efficiency',
  EXPERTISE: 'Expertise',
  FUNCTIONALITY: 'Functionality',
  FLEXIBILITY: 'Flexibility',
  INNOVATION: 'Innovation',
  OPTIMIZATION: 'Optimization',
  PRODUCTIVITY: 'Productivity',
  QUALITY: 'Quality',
  SCALABILITY: 'Scalability',
  SPEED: 'Speed',
  STRATEGIC_INSIGHT: 'Strategic Insight',
  SUPPORT: 'Support',

  // Ease of Business
  ACCESSIBILITY: 'Accessibility',
  COLLABORATION: 'Collaboration',
  COMMUNICATION: 'Communication',
  COORDINATION: 'Coordination',
  DECISION_MAKING: 'Decision Making',
  IMPLEMENTATION: 'Implementation',
  MAINTENANCE: 'Maintenance',
  ONBOARDING: 'Onboarding',
  TRAINING: 'Training',
  TRANSPARENCY: 'Transparency',

  // Individual Value
  CAREER_GROWTH: 'Career Growth',
  CONFIDENCE: 'Confidence',
  PERSONAL_DEVELOPMENT: 'Personal Development',
  RECOGNITION: 'Recognition',
  SKILL_DEVELOPMENT: 'Skill Development',
} as const;

// CliftonStrengths Domains
export const CLIFTON_STRENGTHS_DOMAINS = {
  EXECUTING: 'EXECUTING',
  INFLUENCING: 'INFLUENCING',
  RELATIONSHIP_BUILDING: 'RELATIONSHIP_BUILDING',
  STRATEGIC_THINKING: 'STRATEGIC_THINKING',
} as const;

// CliftonStrengths Themes (34 themes)
export const CLIFTON_STRENGTHS_THEMES = {
  // Executing Domain
  ACHIEVER: 'Achiever',
  ARRANGER: 'Arranger',
  BELIEF: 'Belief',
  CONSISTENCY: 'Consistency',
  DELIBERATIVE: 'Deliberative',
  DISCIPLINE: 'Discipline',
  FOCUS: 'Focus',
  RESPONSIBILITY: 'Responsibility',
  RESTORATIVE: 'Restorative',

  // Influencing Domain
  ACTIVATOR: 'Activator',
  COMMAND: 'Command',
  COMMUNICATION: 'Communication',
  COMPETITION: 'Competition',
  MAXIMIZER: 'Maximizer',
  SELF_ASSURANCE: 'Self-Assurance',
  SIGNIFICANCE: 'Significance',
  WOO: 'Woo',

  // Relationship Building Domain
  ADAPTABILITY: 'Adaptability',
  CONNECTEDNESS: 'Connectedness',
  DEVELOPER: 'Developer',
  EMPATHY: 'Empathy',
  HARMONY: 'Harmony',
  INCLUDER: 'Includer',
  INDIVIDUALIZATION: 'Individualization',
  POSITIVITY: 'Positivity',
  RELATOR: 'Relator',

  // Strategic Thinking Domain
  ANALYTICAL: 'Analytical',
  CONTEXT: 'Context',
  FUTURISTIC: 'Futuristic',
  IDEATION: 'Ideation',
  INTELLECTION: 'Intellection',
  LEARNER: 'Learner',
  STRATEGIC: 'Strategic',
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    SIGNIN: '/api/auth/signin',
    SIGNOUT: '/api/auth/signout',
    CALLBACK: '/api/auth/callback',
    SESSION: '/api/auth/session',
  },
  ANALYSIS: {
    CREATE: '/api/analysis',
    GET: '/api/analysis/[id]',
    LIST: '/api/analysis',
    UPDATE: '/api/analysis/[id]',
    DELETE: '/api/analysis/[id]',
  },
  USERS: {
    PROFILE: '/api/users/profile',
    UPDATE: '/api/users/profile',
    ORGANIZATION: '/api/users/organization',
  },
  ORGANIZATIONS: {
    CREATE: '/api/organizations',
    GET: '/api/organizations/[id]',
    UPDATE: '/api/organizations/[id]',
    MEMBERS: '/api/organizations/[id]/members',
  },
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

// Error Codes
export const ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',
  NOT_FOUND_ERROR: 'NOT_FOUND_ERROR',
  RATE_LIMIT_ERROR: 'RATE_LIMIT_ERROR',
  PROVIDER_UNAVAILABLE_ERROR: 'PROVIDER_UNAVAILABLE_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
} as const;

// Cache Keys
export const CACHE_KEYS = {
  USER: (id: string) => `user:${id}`,
  ANALYSIS: (id: string) => `analysis:${id}`,
  ORGANIZATION: (id: string) => `org:${id}`,
  USER_ANALYSES: (userId: string) => `user:${userId}:analyses`,
  ORGANIZATION_ANALYSES: (orgId: string) => `org:${orgId}:analyses`,
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  DEFAULT_PAGE: 1,
} as const;

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: ['text/plain', 'text/markdown', 'application/pdf'],
  MAX_FILES: 5,
} as const;

// Rate Limiting
export const RATE_LIMITS = {
  ANALYSIS: {
    WINDOW_MS: 15 * 60 * 1000, // 15 minutes
    MAX_REQUESTS: 100,
  },
  AUTH: {
    WINDOW_MS: 15 * 60 * 1000, // 15 minutes
    MAX_REQUESTS: 5,
  },
  API: {
    WINDOW_MS: 60 * 1000, // 1 minute
    MAX_REQUESTS: 1000,
  },
} as const;

// Time Constants
export const TIME = {
  SECOND: 1000,
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
  WEEK: 7 * 24 * 60 * 60 * 1000,
  MONTH: 30 * 24 * 60 * 60 * 1000,
  YEAR: 365 * 24 * 60 * 60 * 1000,
} as const;

// UI Constants
export const UI = {
  ANIMATION_DURATION: {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
  },
  BREAKPOINTS: {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    '2XL': 1536,
  },
  Z_INDEX: {
    DROPDOWN: 1000,
    STICKY: 1020,
    FIXED: 1030,
    MODAL_BACKDROP: 1040,
    MODAL: 1050,
    POPOVER: 1060,
    TOOLTIP: 1070,
  },
} as const;

// Export all constants as a single object
export const CONSTANTS = {
  USER_ROLES,
  USER_ROLE_HIERARCHY,
  PROJECT_STATUS,
  CONTENT_TYPES,
  ANALYSIS_STATUS,
  PRIORITY_LEVELS,
  SEVERITY_LEVELS,
  SCORE_RANGES,
  GOLDEN_CIRCLE_ELEMENTS,
  CONSUMER_VALUE_ELEMENTS,
  B2B_VALUE_ELEMENTS,
  CLIFTON_STRENGTHS_DOMAINS,
  CLIFTON_STRENGTHS_THEMES,
  API_ENDPOINTS,
  HTTP_STATUS,
  ERROR_CODES,
  CACHE_KEYS,
  PAGINATION,
  FILE_UPLOAD,
  RATE_LIMITS,
  TIME,
  UI,
} as const;

export default CONSTANTS;


