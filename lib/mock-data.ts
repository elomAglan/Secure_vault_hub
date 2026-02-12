// TypeScript Interfaces
export interface User {
  id: string
  name: string
  email: string
  avatar: string
  role: 'admin' | 'user' | 'viewer'
  status: 'active' | 'inactive' | 'banned'
  lastLogin: Date
  createdAt: Date
}

export interface Project {
  id: string
  name: string
  description: string
  status: 'active' | 'inactive'
  users: number
  apiKey: string
  secretKey: string
  createdAt: Date
}

export interface Session {
  id: string
  userId: string
  device: string
  browser: string
  ip: string
  location: string
  lastActivity: Date
  createdAt: Date
}

export interface AuthSettings {
  emailPassword: boolean
  googleOAuth: boolean
  githubOAuth: boolean
  magicLinks: boolean
  twoFactor: boolean
}

export interface EmailTemplate {
  id: string
  name: string
  type: 'welcome' | 'verification' | 'reset' | 'invite' | 'confirm'
  subject: string
  preview: string
  lastModified: Date
}

export interface Webhook {
  id: string
  endpoint: string
  events: string[]
  status: 'active' | 'inactive'
  lastTriggered: Date
}

export interface ActivityLog {
  id: string
  userId: string
  userName: string
  action: string
  details: string
  timestamp: Date
}

export interface Team {
  id: string
  name: string
  email: string
  role: 'owner' | 'admin' | 'member'
  joinedAt: Date
  avatar: string
}

export interface BillingInfo {
  currentPlan: 'free' | 'pro' | 'enterprise'
  status: 'active' | 'past_due' | 'cancelled'
  nextBillingDate: Date
  monthlySpend: number
  annualSpend: number
}

// Mock Data

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    role: 'admin',
    status: 'active',
    lastLogin: new Date(Date.now() - 1000 * 60 * 5),
    createdAt: new Date('2023-01-15'),
  },
  {
    id: '2',
    name: 'Mike Chen',
    email: 'mike@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
    role: 'user',
    status: 'active',
    lastLogin: new Date(Date.now() - 1000 * 60 * 30),
    createdAt: new Date('2023-02-20'),
  },
  {
    id: '3',
    name: 'Emma Davis',
    email: 'emma@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
    role: 'user',
    status: 'active',
    lastLogin: new Date(Date.now() - 1000 * 60 * 120),
    createdAt: new Date('2023-03-10'),
  },
  {
    id: '4',
    name: 'John Smith',
    email: 'john@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4',
    role: 'viewer',
    status: 'inactive',
    lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    createdAt: new Date('2023-04-05'),
  },
  {
    id: '5',
    name: 'Lisa Wang',
    email: 'lisa@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=5',
    role: 'user',
    status: 'active',
    lastLogin: new Date(Date.now() - 1000 * 60 * 45),
    createdAt: new Date('2023-05-12'),
  },
]

export const mockProjects: Project[] = [
  {
    id: 'proj_1',
    name: 'Web App',
    description: 'Main production web application',
    status: 'active',
    users: 245,
    apiKey: 'pk_live_51234567890abcdefgh',
    secretKey: 'sk_live_51234567890abcdefgh',
    createdAt: new Date('2023-01-10'),
  },
  {
    id: 'proj_2',
    name: 'Mobile App',
    description: 'iOS and Android mobile application',
    status: 'active',
    users: 1205,
    apiKey: 'pk_live_98765432100abcdefgh',
    secretKey: 'sk_live_98765432100abcdefgh',
    createdAt: new Date('2023-02-15'),
  },
  {
    id: 'proj_3',
    name: 'API Gateway',
    description: 'Internal API for microservices',
    status: 'active',
    users: 89,
    apiKey: 'pk_live_11111111110abcdefgh',
    secretKey: 'sk_live_11111111110abcdefgh',
    createdAt: new Date('2023-03-20'),
  },
  {
    id: 'proj_4',
    name: 'Legacy System',
    description: 'Deprecated legacy application',
    status: 'inactive',
    users: 0,
    apiKey: 'pk_live_22222222220abcdefgh',
    secretKey: 'sk_live_22222222220abcdefgh',
    createdAt: new Date('2022-06-01'),
  },
]

export const mockSessions: Session[] = [
  {
    id: 'sess_1',
    userId: '1',
    device: 'MacBook Pro',
    browser: 'Chrome',
    ip: '192.168.1.100',
    location: 'San Francisco, CA',
    lastActivity: new Date(Date.now() - 1000 * 60 * 5),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: 'sess_2',
    userId: '1',
    device: 'iPhone 14',
    browser: 'Safari',
    ip: '203.0.113.45',
    location: 'San Francisco, CA',
    lastActivity: new Date(Date.now() - 1000 * 60 * 15),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
  },
  {
    id: 'sess_3',
    userId: '2',
    device: 'Windows PC',
    browser: 'Firefox',
    ip: '198.51.100.20',
    location: 'New York, NY',
    lastActivity: new Date(Date.now() - 1000 * 60 * 30),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
  },
  {
    id: 'sess_4',
    userId: '2',
    device: 'iPad Air',
    browser: 'Chrome',
    ip: '198.51.100.21',
    location: 'New York, NY',
    lastActivity: new Date(Date.now() - 1000 * 60 * 120),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72),
  },
]

export const mockAuthSettings: AuthSettings = {
  emailPassword: true,
  googleOAuth: true,
  githubOAuth: true,
  magicLinks: false,
  twoFactor: false,
}

export const mockEmailTemplates: EmailTemplate[] = [
  {
    id: 'tpl_1',
    name: 'Welcome Email',
    type: 'welcome',
    subject: 'Welcome to SecureVault',
    preview: 'Thank you for signing up...',
    lastModified: new Date('2024-01-20'),
  },
  {
    id: 'tpl_2',
    name: 'Email Verification',
    type: 'verification',
    subject: 'Verify your email address',
    preview: 'Please verify your email by clicking...',
    lastModified: new Date('2024-01-15'),
  },
  {
    id: 'tpl_3',
    name: 'Password Reset',
    type: 'reset',
    subject: 'Reset your password',
    preview: 'Click the link below to reset your password...',
    lastModified: new Date('2024-01-10'),
  },
  {
    id: 'tpl_4',
    name: 'Team Invite',
    type: 'invite',
    subject: 'You have been invited to join a team',
    preview: 'You have been invited to join SecureVault...',
    lastModified: new Date('2024-01-05'),
  },
]

export const mockWebhooks: Webhook[] = [
  {
    id: 'wh_1',
    endpoint: 'https://api.example.com/webhooks/auth',
    events: ['user.signup', 'user.login', 'user.logout'],
    status: 'active',
    lastTriggered: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: 'wh_2',
    endpoint: 'https://api.example.com/webhooks/sessions',
    events: ['session.created', 'session.ended'],
    status: 'active',
    lastTriggered: new Date(Date.now() - 1000 * 60 * 15),
  },
  {
    id: 'wh_3',
    endpoint: 'https://notifications.example.com/auth-events',
    events: ['user.signup', 'user.email.verified'],
    status: 'inactive',
    lastTriggered: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
]

export const mockActivityLogs: ActivityLog[] = [
  {
    id: 'log_1',
    userId: '1',
    userName: 'Sarah Johnson',
    action: 'user.created',
    details: 'Created new user: John Doe (john.doe@example.com)',
    timestamp: new Date(Date.now() - 1000 * 60 * 2),
  },
  {
    id: 'log_2',
    userId: '1',
    userName: 'Sarah Johnson',
    action: 'settings.updated',
    details: 'Updated authentication settings',
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
  },
  {
    id: 'log_3',
    userId: '2',
    userName: 'Mike Chen',
    action: 'project.created',
    details: 'Created new project: API Integration',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: 'log_4',
    userId: '1',
    userName: 'Sarah Johnson',
    action: 'webhook.triggered',
    details: 'Webhook triggered: user.signup event',
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
  },
  {
    id: 'log_5',
    userId: '2',
    userName: 'Mike Chen',
    action: 'api.key.regenerated',
    details: 'Regenerated API key for Web App project',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
  },
]

export const mockTeamMembers: Team[] = [
  {
    id: 'tm_1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'owner',
    joinedAt: new Date('2023-01-10'),
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
  },
  {
    id: 'tm_2',
    name: 'Mike Chen',
    email: 'mike@example.com',
    role: 'admin',
    joinedAt: new Date('2023-02-15'),
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
  },
  {
    id: 'tm_3',
    name: 'Emma Davis',
    email: 'emma@example.com',
    role: 'member',
    joinedAt: new Date('2023-03-10'),
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
  },
  {
    id: 'tm_4',
    name: 'Lisa Wang',
    email: 'lisa@example.com',
    role: 'member',
    joinedAt: new Date('2023-05-12'),
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=5',
  },
]

export const mockBillingInfo: BillingInfo = {
  currentPlan: 'pro',
  status: 'active',
  nextBillingDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10),
  monthlySpend: 2500,
  annualSpend: 25000,
}

// Dashboard Stats
export const mockDashboardStats = {
  totalUsers: 12450,
  activeSessions: 3241,
  totalLogins: 89543,
  errorRate: 0.12,
}

// User Growth Data (for charts)
export const mockUserGrowthData = [
  { month: 'Jan', users: 2400 },
  { month: 'Feb', users: 3200 },
  { month: 'Mar', users: 4100 },
  { month: 'Apr', users: 5800 },
  { month: 'May', users: 7300 },
  { month: 'Jun', users: 9200 },
  { month: 'Jul', users: 12450 },
]

// Login Activity Data (for charts)
export const mockLoginActivityData = [
  { time: '12 AM', logins: 240 },
  { time: '4 AM', logins: 180 },
  { time: '8 AM', logins: 890 },
  { time: '12 PM', logins: 1200 },
  { time: '4 PM', logins: 1500 },
  { time: '8 PM', logins: 1100 },
  { time: '12 AM', logins: 400 },
]

// Pricing Plans
export const mockPricingPlans = [
  {
    name: 'Free',
    price: 0,
    description: 'Perfect for getting started',
    features: [
      'Up to 100 users',
      'Basic email/password auth',
      'Community support',
      'Monthly login limit: 10,000',
      'Basic analytics',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: 99,
    description: 'For growing applications',
    features: [
      'Up to 10,000 users',
      'All auth methods (OAuth, Magic Links)',
      'Email support',
      'Monthly login limit: 1,000,000',
      'Advanced analytics',
      'API access',
      'Custom email templates',
    ],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: null,
    description: 'For large-scale applications',
    features: [
      'Unlimited users',
      'All Pro features',
      'Priority support',
      'Unlimited logins',
      'Advanced security features',
      'SLA guarantee',
      'Dedicated account manager',
      'Custom integrations',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
]
