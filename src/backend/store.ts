import bcrypt from 'bcryptjs';
import { User, Company, Job, Application } from '../types.js';

// Pre-seeded initial data for instant out-of-the-box demo functionality
const hashedPassword = bcrypt.hashSync('password123', 10);

export const INITIAL_USERS: User[] = [
  {
    id: 'user-applicant-1',
    name: 'Alex Morgan',
    email: 'applicant@taliohub.com',
    role: 'applicant',
    phone: '+1 (555) 019-2834',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    title: 'Senior Full Stack Engineer',
    bio: 'Passionate software craftsman with 6+ years experience in React, Node.js, TypeScript, and Cloud Architecture. Enthusiastic about AI workflows.',
    location: 'San Francisco, CA',
    skills: ['React', 'TypeScript', 'Node.js', 'Express', 'Tailwind CSS', 'GraphQL', 'Docker', 'AWS'],
    resumeUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    resumeName: 'Alex_Morgan_Resume_2026.pdf',
    savedJobs: ['job-1', 'job-3'],
    createdAt: new Date('2026-01-10').toISOString(),
  },
  {
    id: 'user-recruiter-1',
    name: 'Sarah Jenkins',
    email: 'recruiter@taliohub.com',
    role: 'recruiter',
    phone: '+1 (555) 432-8910',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    title: 'Lead Technical Recruiter at TechPulse',
    companyId: 'comp-1',
    createdAt: new Date('2026-01-05').toISOString(),
  },
  {
    id: 'user-admin-1',
    name: 'Talio System Admin',
    email: 'admin@taliohub.com',
    role: 'admin',
    phone: '+1 (555) 999-0000',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    title: 'Talio Hub Platform Manager',
    createdAt: new Date('2026-01-01').toISOString(),
  },
];

export const INITIAL_COMPANIES: Company[] = [
  {
    id: 'comp-1',
    name: 'TechPulse AI',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=200',
    website: 'https://techpulse.ai',
    location: 'San Francisco, CA (Remote Friendly)',
    industry: 'Artificial Intelligence & Software',
    description: 'TechPulse AI is building next-generation enterprise autonomous workflows powered by LLMs and predictive neural engines.',
    companySize: '50-200 employees',
    founded: '2021',
    recruiterId: 'user-recruiter-1',
    jobsCount: 4,
    rating: 4.8,
    createdAt: new Date('2026-01-05').toISOString(),
  },
  {
    id: 'comp-2',
    name: 'CloudScale Networks',
    logo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=200',
    website: 'https://cloudscale.io',
    location: 'Seattle, WA',
    industry: 'Cloud Computing & Infrastructure',
    description: 'Hyper-scalable cloud management and Kubernetes orchestration platform trusted by Fortune 500 engineering teams.',
    companySize: '500-1000 employees',
    founded: '2018',
    recruiterId: 'user-recruiter-1',
    jobsCount: 3,
    rating: 4.6,
    createdAt: new Date('2026-01-08').toISOString(),
  },
  {
    id: 'comp-3',
    name: 'FinFlow Global',
    logo: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=200',
    website: 'https://finflow.com',
    location: 'New York, NY',
    industry: 'Fintech & Digital Banking',
    description: 'Democratizing global digital payments and cross-border instant settlements through unified API rails.',
    companySize: '200-500 employees',
    founded: '2019',
    recruiterId: 'user-recruiter-1',
    jobsCount: 5,
    rating: 4.7,
    createdAt: new Date('2026-01-12').toISOString(),
  },
  {
    id: 'comp-4',
    name: 'PixelCraft Studio',
    logo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&q=80&w=200',
    website: 'https://pixelcraft.design',
    location: 'Austin, TX',
    industry: 'UI/UX Design & Creative Tech',
    description: 'Award-winning digital product design agency shaping iconic mobile and web interfaces for global brands.',
    companySize: '20-50 employees',
    founded: '2022',
    recruiterId: 'user-recruiter-1',
    jobsCount: 2,
    rating: 4.9,
    createdAt: new Date('2026-01-15').toISOString(),
  },
];

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job-1',
    title: 'Senior Full Stack Engineer (React & Node)',
    companyId: 'comp-1',
    companyName: 'TechPulse AI',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=200',
    location: 'San Francisco, CA / Remote',
    jobType: 'Full-Time',
    salaryMin: 140000,
    salaryMax: 185000,
    salaryPeriod: 'Year',
    experienceLevel: 'Senior Level',
    category: 'Software Engineering',
    description: 'We are seeking an exceptional Senior Full Stack Engineer to drive core features across our flagship AI orchestration dashboard. You will design, build, and optimize high-throughput React frontends and Node.js microservices.',
    requirements: [
      '5+ years production experience with React 18/19, TypeScript, and Node.js/Express',
      'Solid expertise in PostgreSQL, MongoDB, Redis, and RESTful API architecture',
      'Demonstrated experience building responsive UI with Tailwind CSS and Framer Motion',
      'Familiarity with Gemini/OpenAI API integrations, vector databases, or AI agent tooling is a big plus',
      'Strong automated testing mindset (Jest, Cypress, Playwright)'
    ],
    responsibilities: [
      'Lead design and architectural implementations for high-traffic Web UI components',
      'Build end-to-end serverless and containerized microservices handling real-time WebSocket payloads',
      'Collaborate closely with product managers, UX designers, and ML researchers',
      'Mentor junior engineers and champion modern engineering best practices'
    ],
    benefits: [
      'Competitive base salary + equity options package',
      '100% remote flexibility with home office stipend ($1,500)',
      'Unlimited Paid Time Off (PTO) with mandatory 3 weeks off',
      'Comprehensive health, dental, vision & 401(k) matching'
    ],
    status: 'Active',
    recruiterId: 'user-recruiter-1',
    applicantsCount: 14,
    viewsCount: 340,
    createdAt: new Date('2026-02-01').toISOString(),
    isFeatured: true,
  },
  {
    id: 'job-2',
    title: 'Lead AI / Machine Learning Scientist',
    companyId: 'comp-1',
    companyName: 'TechPulse AI',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=200',
    location: 'San Francisco, CA',
    jobType: 'Full-Time',
    salaryMin: 180000,
    salaryMax: 240000,
    salaryPeriod: 'Year',
    experienceLevel: 'Senior Level',
    category: 'Data Science',
    description: 'Join TechPulse AI to pioneer fine-tuned transformer models and agentic workflows. You will lead research to production pipelines for real-time natural language reasoning.',
    requirements: [
      'MS or PhD in Computer Science, AI, Machine Learning, or related field',
      'Proficiency in PyTorch, Python, HuggingFace transformers, and vLLM',
      'Hands-on experience with RAG, embedding search, and fine-tuning LLMs',
      'Track record of publishing research or delivering production AI solutions'
    ],
    responsibilities: [
      'Architect fine-tuning workflows for custom domain-adapted foundation models',
      'Optimize model inference latency and token context efficiency',
      'Partner with product teams to embed state-of-the-art AI into customer workflows'
    ],
    benefits: [
      'Top tier compensation with substantial equity grant',
      'Relocation assistance to San Francisco Bay Area',
      'Conference travel stipend ($5,000/year) and hardware setup of choice'
    ],
    status: 'Active',
    recruiterId: 'user-recruiter-1',
    applicantsCount: 8,
    viewsCount: 280,
    createdAt: new Date('2026-02-05').toISOString(),
    isFeatured: true,
  },
  {
    id: 'job-3',
    title: 'Senior DevOps & Cloud Engineer',
    companyId: 'comp-2',
    companyName: 'CloudScale Networks',
    companyLogo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=200',
    location: 'Seattle, WA / Remote',
    jobType: 'Full-Time',
    salaryMin: 135000,
    salaryMax: 170000,
    salaryPeriod: 'Year',
    experienceLevel: 'Senior Level',
    category: 'DevOps & Cloud',
    description: 'CloudScale Networks needs a DevOps pro to scale multi-cloud infrastructure across AWS, GCP, and Kubernetes clusters.',
    requirements: [
      '4+ years managing Kubernetes (EKS/GKE), Terraform, and Docker containers',
      'Strong expertise in CI/CD pipelines (GitHub Actions, GitLab CI, ArgoCD)',
      'Experience with Prometheus, Grafana, and Datadog monitoring setups',
      'Knowledge of AWS IAM, zero-trust security, and Cloud Run deployments'
    ],
    responsibilities: [
      'Maintain 99.99% uptime SLA across multi-region infrastructure',
      'Automate infrastructure provisioning via Terraform and Ansible scripts',
      'Implement robust security scanning and compliance automation'
    ],
    benefits: [
      'Flexible work location (Hybrid or 100% Remote)',
      'Health & Wellness allowance ($200/month)',
      'Generous learning stipend for cloud certifications'
    ],
    status: 'Active',
    recruiterId: 'user-recruiter-1',
    applicantsCount: 11,
    viewsCount: 210,
    createdAt: new Date('2026-02-10').toISOString(),
    isFeatured: false,
  },
  {
    id: 'job-4',
    title: 'Product UI/UX Designer',
    companyId: 'comp-4',
    companyName: 'PixelCraft Studio',
    companyLogo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&q=80&w=200',
    location: 'Austin, TX / Remote',
    jobType: 'Full-Time',
    salaryMin: 110000,
    salaryMax: 145000,
    salaryPeriod: 'Year',
    experienceLevel: 'Mid Level',
    category: 'Design & UX',
    description: 'We are looking for a creative UI/UX Product Designer with a keen eye for dark mode aesthetics, interactive micro-animations, and clean typography.',
    requirements: [
      '3+ years experience designing web and mobile applications using Figma',
      'Strong portfolio showcasing design systems, wireframes, and interactive prototypes',
      'Deep understanding of glassmorphism, modern design trends, and design token architecture',
      'Basic familiarity with HTML, CSS, and Tailwind UI constraints'
    ],
    responsibilities: [
      'Conduct user research, journey mapping, and usability testing sessions',
      'Build scalable component libraries in Figma for web and iOS/Android',
      'Work alongside frontend developers to ensure flawless pixel-perfect execution'
    ],
    benefits: [
      'MacBook Pro M3 Max + Studio Display provided',
      'Flexible working hours & 4-day work week trial',
      'Annual design retreat in Costa Rica or Bali'
    ],
    status: 'Active',
    recruiterId: 'user-recruiter-1',
    applicantsCount: 19,
    viewsCount: 410,
    createdAt: new Date('2026-02-12').toISOString(),
    isFeatured: true,
  },
  {
    id: 'job-5',
    title: 'Fintech Backend Developer (Node & PostgreSQL)',
    companyId: 'comp-3',
    companyName: 'FinFlow Global',
    companyLogo: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=200',
    location: 'New York, NY',
    jobType: 'Full-Time',
    salaryMin: 130000,
    salaryMax: 165000,
    salaryPeriod: 'Year',
    experienceLevel: 'Mid Level',
    category: 'Software Engineering',
    description: 'Join FinFlow Global to build resilient, low-latency transaction processing APIs and automated fraud detection pipelines.',
    requirements: [
      '3+ years experience with Node.js, Express, TypeScript, and SQL databases',
      'Experience with financial payment rails (Stripe, Plaid, SWIFT) or double-entry ledgers',
      'High commitment to unit testing, zero-downtime migrations, and OAuth security',
      'Strong understanding of caching strategies using Redis'
    ],
    responsibilities: [
      'Design idempotent payment processing endpoints and webhooks',
      'Optimize database queries and transaction isolation levels for high throughput',
      'Collaborate with compliance and security audit teams'
    ],
    benefits: [
      'Annual performance bonus up to 20%',
      'Commuter subsidies & NYC office catered lunches',
      'Comprehensive medical, dental and pension match'
    ],
    status: 'Active',
    recruiterId: 'user-recruiter-1',
    applicantsCount: 9,
    viewsCount: 195,
    createdAt: new Date('2026-02-14').toISOString(),
    isFeatured: false,
  },
  {
    id: 'job-6',
    title: 'Junior Frontend Developer (React)',
    companyId: 'comp-4',
    companyName: 'PixelCraft Studio',
    companyLogo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&q=80&w=200',
    location: 'Remote',
    jobType: 'Remote',
    salaryMin: 70000,
    salaryMax: 90000,
    salaryPeriod: 'Year',
    experienceLevel: 'Entry Level',
    category: 'Software Engineering',
    description: 'Great entry-level opportunity for a passionate React developer looking to build polished, animated user experiences under mentorship from senior engineers.',
    requirements: [
      'Strong fundamentals in HTML5, CSS3, JavaScript ES6+, and React Basics',
      'Experience with Tailwind CSS and Git workflows',
      'Eagerness to learn modern animation libraries like Framer Motion',
      'Strong communication skills and attention to UI details'
    ],
    responsibilities: [
      'Translate design wireframes into clean, reusable React components',
      'Fix bug tickets and write unit tests for UI views',
      'Participate in weekly team code reviews and learning sessions'
    ],
    benefits: [
      'Comprehensive mentorship program',
      'Equipment allowance',
      'Flexible vacation time'
    ],
    status: 'Active',
    recruiterId: 'user-recruiter-1',
    applicantsCount: 32,
    viewsCount: 620,
    createdAt: new Date('2026-02-15').toISOString(),
    isFeatured: false,
  }
];

export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 'app-1',
    jobId: 'job-1',
    jobTitle: 'Senior Full Stack Engineer (React & Node)',
    companyName: 'TechPulse AI',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=200',
    applicantId: 'user-applicant-1',
    applicantName: 'Alex Morgan',
    applicantEmail: 'applicant@taliohub.com',
    applicantPhone: '+1 (555) 019-2834',
    applicantAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    applicantTitle: 'Senior Full Stack Engineer',
    applicantSkills: ['React', 'TypeScript', 'Node.js', 'Express', 'Tailwind CSS', 'Docker'],
    resumeUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    resumeName: 'Alex_Morgan_Resume_2026.pdf',
    coverLetter: 'Dear Hiring Manager,\n\nI am thrilled to submit my application for the Senior Full Stack Engineer role at TechPulse AI. With over 6 years of hands-on experience crafting high-performance React architectures and scalable Express microservices, I am confident in my ability to make an immediate positive impact on your AI orchestration platforms.\n\nLooking forward to speaking with you!\nBest regards,\nAlex Morgan',
    status: 'Accepted',
    appliedAt: new Date('2026-02-02').toISOString(),
    matchScore: 94,
    notes: 'Outstanding candidate with deep experience in React 19 and AI SDKs.'
  },
  {
    id: 'app-2',
    jobId: 'job-4',
    jobTitle: 'Product UI/UX Designer',
    companyName: 'PixelCraft Studio',
    companyLogo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&q=80&w=200',
    applicantId: 'user-applicant-1',
    applicantName: 'Alex Morgan',
    applicantEmail: 'applicant@taliohub.com',
    applicantPhone: '+1 (555) 019-2834',
    applicantAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    applicantTitle: 'Senior Full Stack Engineer & UI Enthusiast',
    applicantSkills: ['Figma', 'Tailwind CSS', 'Design Systems', 'React UI'],
    resumeUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    resumeName: 'Alex_Morgan_Resume_2026.pdf',
    coverLetter: 'I am applying for the UI/UX Product Designer position as I bridge design and frontend implementation seamlessly.',
    status: 'Pending',
    appliedAt: new Date('2026-02-13').toISOString(),
    matchScore: 82,
  }
];

// Persistent Memory Store Class
class DataStore {
  public users: User[] = [...INITIAL_USERS];
  public passwords: Record<string, string> = {
    'applicant@taliohub.com': hashedPassword,
    'recruiter@taliohub.com': hashedPassword,
    'admin@taliohub.com': hashedPassword,
  };
  public companies: Company[] = [...INITIAL_COMPANIES];
  public jobs: Job[] = [...INITIAL_JOBS];
  public applications: Application[] = [...INITIAL_APPLICATIONS];

  // User methods
  getUserByEmail(email: string) {
    return this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  getUserById(id: string) {
    return this.users.find(u => u.id === id);
  }

  createUser(userData: Partial<User>, passwordHash: string): User {
    const newUser: User = {
      id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name: userData.name || '',
      email: userData.email || '',
      role: userData.role || 'applicant',
      phone: userData.phone || '',
      avatar: userData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250',
      title: userData.title || '',
      bio: userData.bio || '',
      location: userData.location || '',
      skills: userData.skills || [],
      savedJobs: [],
      createdAt: new Date().toISOString(),
    };

    this.users.push(newUser);
    this.passwords[newUser.email.toLowerCase()] = passwordHash;
    return newUser;
  }

  updateUser(id: string, updates: Partial<User>): User | null {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) return null;
    this.users[index] = { ...this.users[index], ...updates };
    return this.users[index];
  }

  deleteUser(id: string): boolean {
    const user = this.getUserById(id);
    if (!user) return false;
    delete this.passwords[user.email.toLowerCase()];
    this.users = this.users.filter(u => u.id !== id);
    // clean up associated apps
    this.applications = this.applications.filter(a => a.applicantId !== id);
    return true;
  }

  // Company methods
  getCompanyById(id: string) {
    return this.companies.find(c => c.id === id);
  }

  createCompany(compData: Partial<Company>): Company {
    const newComp: Company = {
      id: `comp-${Date.now()}`,
      name: compData.name || 'New Company',
      logo: compData.logo || 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=200',
      website: compData.website || '',
      location: compData.location || '',
      industry: compData.industry || 'Technology',
      description: compData.description || '',
      companySize: compData.companySize || '10-50 employees',
      founded: compData.founded || '2024',
      recruiterId: compData.recruiterId || '',
      jobsCount: 0,
      rating: 4.5,
      createdAt: new Date().toISOString(),
    };
    this.companies.push(newComp);
    return newComp;
  }

  updateCompany(id: string, updates: Partial<Company>): Company | null {
    const idx = this.companies.findIndex(c => c.id === id);
    if (idx === -1) return null;
    this.companies[idx] = { ...this.companies[idx], ...updates };
    return this.companies[idx];
  }

  deleteCompany(id: string): boolean {
    this.companies = this.companies.filter(c => c.id !== id);
    // Delete associated jobs
    const jobsToDelete = this.jobs.filter(j => j.companyId === id).map(j => j.id);
    this.jobs = this.jobs.filter(j => j.companyId !== id);
    this.applications = this.applications.filter(a => !jobsToDelete.includes(a.jobId));
    return true;
  }

  // Job methods
  getJobById(id: string) {
    return this.jobs.find(j => j.id === id);
  }

  createJob(jobData: Partial<Job>): Job {
    const company = this.getCompanyById(jobData.companyId || '');
    const newJob: Job = {
      id: `job-${Date.now()}`,
      title: jobData.title || 'Untitled Role',
      companyId: jobData.companyId || '',
      companyName: company ? company.name : (jobData.companyName || 'Talio Partner'),
      companyLogo: company ? company.logo : (jobData.companyLogo || 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=200'),
      location: jobData.location || 'Remote',
      jobType: jobData.jobType || 'Full-Time',
      salaryMin: jobData.salaryMin || 80000,
      salaryMax: jobData.salaryMax || 120000,
      salaryPeriod: jobData.salaryPeriod || 'Year',
      experienceLevel: jobData.experienceLevel || 'Mid Level',
      category: jobData.category || 'Software Engineering',
      description: jobData.description || '',
      requirements: jobData.requirements || [],
      responsibilities: jobData.responsibilities || [],
      benefits: jobData.benefits || [],
      status: jobData.status || 'Active',
      recruiterId: jobData.recruiterId || '',
      applicantsCount: 0,
      viewsCount: 1,
      createdAt: new Date().toISOString(),
      isFeatured: !!jobData.isFeatured,
    };
    this.jobs.unshift(newJob);
    if (company) {
      company.jobsCount = (company.jobsCount || 0) + 1;
    }
    return newJob;
  }

  updateJob(id: string, updates: Partial<Job>): Job | null {
    const idx = this.jobs.findIndex(j => j.id === id);
    if (idx === -1) return null;
    this.jobs[idx] = { ...this.jobs[idx], ...updates };
    return this.jobs[idx];
  }

  deleteJob(id: string): boolean {
    const job = this.getJobById(id);
    if (!job) return false;
    this.jobs = this.jobs.filter(j => j.id !== id);
    this.applications = this.applications.filter(a => a.jobId !== id);
    // remove from user savedJobs
    this.users.forEach(u => {
      if (u.savedJobs) {
        u.savedJobs = u.savedJobs.filter(jid => jid !== id);
      }
    });
    return true;
  }

  incrementJobView(id: string) {
    const job = this.getJobById(id);
    if (job) {
      job.viewsCount = (job.viewsCount || 0) + 1;
    }
  }

  // Application methods
  createApplication(appData: Partial<Application>): Application {
    const job = this.getJobById(appData.jobId || '');
    const newApp: Application = {
      id: `app-${Date.now()}`,
      jobId: appData.jobId || '',
      jobTitle: job ? job.title : (appData.jobTitle || 'Role'),
      companyName: job ? job.companyName : (appData.companyName || 'Company'),
      companyLogo: job ? job.companyLogo : undefined,
      applicantId: appData.applicantId || '',
      applicantName: appData.applicantName || 'Applicant',
      applicantEmail: appData.applicantEmail || '',
      applicantPhone: appData.applicantPhone || '',
      applicantAvatar: appData.applicantAvatar || '',
      applicantTitle: appData.applicantTitle || '',
      applicantSkills: appData.applicantSkills || [],
      resumeUrl: appData.resumeUrl || '',
      resumeName: appData.resumeName || 'Resume.pdf',
      coverLetter: appData.coverLetter || '',
      status: 'Pending',
      appliedAt: new Date().toISOString(),
      matchScore: appData.matchScore || Math.floor(Math.random() * 25) + 75,
    };
    this.applications.unshift(newApp);
    if (job) {
      job.applicantsCount = (job.applicantsCount || 0) + 1;
    }
    return newApp;
  }

  updateApplicationStatus(id: string, status: 'Pending' | 'Reviewed' | 'Accepted' | 'Rejected', notes?: string): Application | null {
    const idx = this.applications.findIndex(a => a.id === id);
    if (idx === -1) return null;
    this.applications[idx].status = status;
    if (notes !== undefined) {
      this.applications[idx].notes = notes;
    }
    return this.applications[idx];
  }

  toggleBookmark(userId: string, jobId: string): string[] {
    const user = this.getUserById(userId);
    if (!user) return [];
    if (!user.savedJobs) user.savedJobs = [];
    
    if (user.savedJobs.includes(jobId)) {
      user.savedJobs = user.savedJobs.filter(id => id !== jobId);
    } else {
      user.savedJobs.push(jobId);
    }
    return user.savedJobs;
  }

  getDashboardStats() {
    return {
      totalJobs: this.jobs.length,
      activeJobs: this.jobs.filter(j => j.status === 'Active').length,
      totalApplicants: this.users.filter(u => u.role === 'applicant').length,
      totalApplications: this.applications.length,
      totalCompanies: this.companies.length,
      pendingApplications: this.applications.filter(a => a.status === 'Pending').length,
      acceptedApplications: this.applications.filter(a => a.status === 'Accepted').length,
      rejectedApplications: this.applications.filter(a => a.status === 'Rejected').length,
    };
  }
}

export const store = new DataStore();
