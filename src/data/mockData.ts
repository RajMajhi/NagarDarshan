export type ProjectCategory = 'road' | 'hospital' | 'bridge' | 'school' | 'drainage' | 'park';
export type ProjectStatus = 'active' | 'completed' | 'ongoing' | 'planning' | 'pending_l1' | 'pending_l2' | 'published' | 'rejected';
export type ProfileType = 'farmer' | 'youth' | 'women' | 'senior' | 'business' | 'student';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  ward: string;
  cost: number; // in crores
  beneficiaries: number;
  status: ProjectStatus;
  rating: number;
  ratingCount: number;
  reach: number;
  lat: number;
  lng: number;
  startDate: string;
  endDate: string;
  progress?: number;
  contractor: string;
  fundingSource: string;
  beforeDescription: string;
  afterDescription: string;
  impactDescription: string;
  linkedSchemes: string[];
}

export interface Scheme {
  id: string;
  name: string;
  nameHi: string;
  description: string;
  benefit: string;
  targetAudience: ProfileType[];
  deadline: string;
  applyLink: string;
  icon: string;
  active: boolean;
  timesTriggered: number;
}

export interface CitizenProfile {
  name: string;
  age: number;
  occupation: ProfileType;
  occupationLabel: string;
  ward: string;
  language: 'hi' | 'en';
  emoji: string;
  notificationsReceived: number;
  projectsRated: number;
  schemesApplied: number;
}

export const CATEGORY_CONFIG: Record<ProjectCategory, { label: string; icon: string; color: string; bgClass: string; textClass: string }> = {
  road: { label: 'Roads & Infrastructure', icon: '🛣️', color: '#1A56DB', bgClass: 'bg-primary/10', textClass: 'text-primary' },
  hospital: { label: 'Hospitals & Healthcare', icon: '🏥', color: '#EF4444', bgClass: 'bg-destructive/10', textClass: 'text-destructive' },
  bridge: { label: 'Bridges & Flyovers', icon: '🌉', color: '#F97316', bgClass: 'bg-secondary/10', textClass: 'text-secondary' },
  school: { label: 'Schools & Colleges', icon: '🏫', color: '#16A34A', bgClass: 'bg-accent/10', textClass: 'text-accent' },
  drainage: { label: 'Drainage & Water', icon: '🌊', color: '#0891B2', bgClass: 'bg-primary/10', textClass: 'text-primary' },
  park: { label: 'Parks & Environment', icon: '🌳', color: '#059669', bgClass: 'bg-accent/10', textClass: 'text-accent' },
};

export const STATUS_CONFIG: Record<ProjectStatus, { label: string; icon: string; className: string }> = {
  active: { label: 'Active', icon: '●', className: 'bg-accent/10 text-accent border-accent/20' },
  completed: { label: 'Completed', icon: '✓', className: 'bg-primary/10 text-primary border-primary/20' },
  ongoing: { label: 'Ongoing', icon: '⟳', className: 'bg-warning/10 text-warning border-warning/20' },
  planning: { label: 'Planning', icon: '◷', className: 'bg-muted text-muted-foreground border-border' },
  pending_l1: { label: 'Pending L1', icon: '🟡', className: 'bg-warning/15 text-warning border-warning/30' },
  pending_l2: { label: 'Pending L2', icon: '🔵', className: 'bg-primary/15 text-primary border-primary/30' },
  published: { label: 'Published', icon: '🟢', className: 'bg-accent/15 text-accent border-accent/30' },
  rejected: { label: 'Rejected', icon: '🔴', className: 'bg-destructive/15 text-destructive border-destructive/30' },
};

export const PROJECTS: Project[] = [
  {
    id: '1', title: 'Bharat Mandapam Pariskar — Phase 2', category: 'road', ward: 'New Delhi Central',
    cost: 270, beneficiaries: 500000, status: 'completed', rating: 4.8, ratingCount: 1247, reach: 12847,
    lat: 28.6129, lng: 77.2295, startDate: '2024-01-15', endDate: '2025-06-30',
    contractor: 'Larsen & Toubro Ltd', fundingSource: 'Central Government',
    beforeDescription: 'Cramped, outdated convention center with poor infrastructure and limited capacity for international events.',
    afterDescription: 'World-class convention center with modern amenities, 7000+ seating, green building certified.',
    impactDescription: 'Transformed India\'s premier convention venue, hosting G20 Summit and international events. Boosted tourism revenue by 340%.',
    linkedSchemes: ['smart-cities', 'pmay'],
  },
  {
    id: '2', title: 'GTB Hospital Emergency Wing Expansion', category: 'hospital', ward: 'Shahdara East',
    cost: 45, beneficiaries: 300000, status: 'completed', rating: 4.6, ratingCount: 892, reach: 8234,
    lat: 28.6867, lng: 77.3105, startDate: '2024-03-01', endDate: '2025-09-15',
    contractor: 'NCC Limited', fundingSource: 'State Government',
    beforeDescription: 'Overcrowded emergency wing with 50-bed capacity, patients on floor, 4-hour average wait time.',
    afterDescription: 'Modern 200-bed emergency wing with triage system, dedicated trauma center, 45-min average wait time.',
    impactDescription: 'Reduced emergency wait times by 75%. Added CT scan, MRI facilities. Serving 800+ patients daily.',
    linkedSchemes: ['ayushman-bharat'],
  },
  {
    id: '3', title: 'Rohini Sector 7-12 Road Resurfacing', category: 'road', ward: 'Rohini Ward 34',
    cost: 3.2, beneficiaries: 80000, status: 'completed', rating: 4.1, ratingCount: 523, reach: 5621,
    lat: 28.7158, lng: 77.1219, startDate: '2024-06-01', endDate: '2025-02-28',
    contractor: 'MCD Road Division', fundingSource: 'MCD Budget',
    beforeDescription: 'Pothole-ridden roads causing accidents, waterlogging during monsoon, daily traffic jams.',
    afterDescription: 'Smooth asphalt roads with proper drainage, speed breakers, road markings, and LED street lights.',
    impactDescription: 'Zero waterlogging complaints. Accident rate reduced by 60%. Commute time cut by 25 minutes.',
    linkedSchemes: ['smart-cities'],
  },
  {
    id: '4', title: 'Yamuna Riverfront Beautification Phase 1', category: 'park', ward: 'East Delhi Riverside',
    cost: 137.5, beneficiaries: 200000, status: 'ongoing', rating: 4.4, ratingCount: 678, reach: 9876,
    lat: 28.6353, lng: 77.2509, startDate: '2024-09-01', endDate: '2026-03-31', progress: 67,
    contractor: 'Shapoorji Pallonji', fundingSource: 'Smart Cities Mission',
    beforeDescription: 'Polluted riverbank with sewage discharge, encroachments, and zero recreational space.',
    afterDescription: 'Green promenade with jogging tracks, amphitheater, water treatment plants, and biodiversity park.',
    impactDescription: 'Creating 5km riverfront promenade. Water quality improved by 40%. 3 new parks under construction.',
    linkedSchemes: ['smart-cities'],
  },
  {
    id: '5', title: 'Solar Panels — 100 Government Schools', category: 'school', ward: 'Multiple Wards',
    cost: 12, beneficiaries: 150000, status: 'completed', rating: 4.7, ratingCount: 445, reach: 7432,
    lat: 28.6448, lng: 77.1734, startDate: '2024-04-01', endDate: '2025-03-31',
    contractor: 'Tata Solar Systems', fundingSource: 'PPP',
    beforeDescription: 'Schools running on grid power with ₹8L annual electricity bills. Frequent power cuts disrupting classes.',
    afterDescription: '100 schools now solar-powered, generating surplus energy. Zero electricity bills, uninterrupted power.',
    impactDescription: 'Saving ₹8 Crore annually. 150,000 students benefiting. Schools selling surplus power back to grid.',
    linkedSchemes: ['beti-bachao', 'skill-india'],
  },
  {
    id: '6', title: 'Najafgarh Drainage Canal Upgrade', category: 'drainage', ward: 'Najafgarh West',
    cost: 8, beneficiaries: 50000, status: 'completed', rating: 4.2, ratingCount: 312, reach: 3214,
    lat: 28.6092, lng: 76.9798, startDate: '2024-05-15', endDate: '2025-01-15',
    contractor: 'Delhi Jal Board', fundingSource: 'State Government',
    beforeDescription: 'Blocked drainage causing annual flooding, mosquito breeding, waterborne diseases in 5 colonies.',
    afterDescription: 'Desilted and widened canal with concrete lining, trash screens, and monsoon overflow chambers.',
    impactDescription: 'Zero flooding in 2025 monsoon. Dengue cases reduced by 80%. 50,000 residents directly benefited.',
    linkedSchemes: ['smart-cities'],
  },
  {
    id: '7', title: 'Dwarka Flyover — Phase 3', category: 'bridge', ward: 'Dwarka Sector 21',
    cost: 89, beneficiaries: 250000, status: 'ongoing', rating: 4.0, ratingCount: 234, reach: 6543,
    lat: 28.5562, lng: 77.0658, startDate: '2024-08-01', endDate: '2026-06-30', progress: 45,
    contractor: 'Afcons Infrastructure', fundingSource: 'Central Government',
    beforeDescription: 'Severe traffic congestion at Dwarka Mor junction. 45-min average delay during peak hours.',
    afterDescription: '3-lane elevated corridor connecting Dwarka to IGI Airport. Expected to cut travel time by 70%.',
    impactDescription: '2.8km flyover under construction. Will serve 250,000 daily commuters. Airport connectivity boost.',
    linkedSchemes: ['smart-cities'],
  },
];

export const SCHEMES: Scheme[] = [
  { id: 'pm-kisan', name: 'PM-KISAN Samman Nidhi', nameHi: 'पीएम-किसान सम्मान निधि', description: 'Direct income support of ₹6,000 per year to farmer families.', benefit: '₹6,000/year', targetAudience: ['farmer'], deadline: 'Dec 2025', applyLink: '#', icon: '🌾', active: true, timesTriggered: 432 },
  { id: 'mudra-loan', name: 'Mudra Loan Yojana', nameHi: 'मुद्रा लोन योजना', description: 'Collateral-free loans up to ₹10 Lakh for small businesses.', benefit: 'Up to ₹10L loan', targetAudience: ['business', 'youth'], deadline: 'Mar 2026', applyLink: '#', icon: '💼', active: true, timesTriggered: 287 },
  { id: 'ayushman-bharat', name: 'Ayushman Bharat', nameHi: 'आयुष्मान भारत', description: 'Free health insurance cover of ₹5 Lakh per family per year.', benefit: '₹5L health cover', targetAudience: ['farmer', 'women', 'senior'], deadline: 'Ongoing', applyLink: '#', icon: '🏥', active: true, timesTriggered: 567 },
  { id: 'skill-india', name: 'Skill India Mission', nameHi: 'स्किल इंडिया मिशन', description: 'Free skill training and certification for youth employment.', benefit: 'Free training', targetAudience: ['youth', 'student'], deadline: 'Jun 2026', applyLink: '#', icon: '🎓', active: true, timesTriggered: 198 },
  { id: 'ujjwala', name: 'Ujjwala Yojana', nameHi: 'उज्ज्वला योजना', description: 'Free LPG connection and subsidized refills for BPL families.', benefit: 'Free LPG + subsidy', targetAudience: ['women', 'farmer'], deadline: 'Ongoing', applyLink: '#', icon: '🔥', active: true, timesTriggered: 345 },
  { id: 'beti-bachao', name: 'Beti Bachao Beti Padhao', nameHi: 'बेटी बचाओ बेटी पढ़ाओ', description: 'Scholarship and protection programs for girl child.', benefit: 'Scholarship', targetAudience: ['women', 'student'], deadline: 'Ongoing', applyLink: '#', icon: '👧', active: true, timesTriggered: 156 },
  { id: 'smart-cities', name: 'Smart Cities Mission', nameHi: 'स्मार्ट सिटी मिशन', description: 'Urban development and smart infrastructure projects.', benefit: 'Infrastructure', targetAudience: ['farmer', 'youth', 'women', 'senior', 'business', 'student'], deadline: 'Dec 2025', applyLink: '#', icon: '🏙️', active: true, timesTriggered: 89 },
  { id: 'pmay', name: 'PM Awas Yojana', nameHi: 'पीएम आवास योजना', description: 'Affordable housing for all with interest subsidy on home loans.', benefit: '₹2.67L subsidy', targetAudience: ['farmer', 'women', 'senior'], deadline: 'Mar 2026', applyLink: '#', icon: '🏠', active: true, timesTriggered: 421 },
];

export const DEMO_PROFILES: Record<ProfileType, CitizenProfile> = {
  farmer: { name: 'Ramesh Kumar', age: 45, occupation: 'farmer', occupationLabel: 'Farmer', ward: 'Rohini Ward 34', language: 'hi', emoji: '👨‍🌾', notificationsReceived: 12, projectsRated: 3, schemesApplied: 2 },
  youth: { name: 'Arjun Singh', age: 22, occupation: 'youth', occupationLabel: 'Youth', ward: 'Dwarka Sector 21', language: 'en', emoji: '👦', notificationsReceived: 8, projectsRated: 5, schemesApplied: 3 },
  women: { name: 'Priya Sharma', age: 35, occupation: 'women', occupationLabel: 'Women', ward: 'Shahdara East', language: 'hi', emoji: '👩', notificationsReceived: 15, projectsRated: 7, schemesApplied: 4 },
  senior: { name: 'Ratan Lal', age: 68, occupation: 'senior', occupationLabel: 'Senior Citizen', ward: 'New Delhi Central', language: 'hi', emoji: '👴', notificationsReceived: 6, projectsRated: 2, schemesApplied: 1 },
  business: { name: 'Vikram Mehta', age: 40, occupation: 'business', occupationLabel: 'Business Owner', ward: 'East Delhi Riverside', language: 'en', emoji: '💼', notificationsReceived: 10, projectsRated: 4, schemesApplied: 2 },
  student: { name: 'Neha Gupta', age: 19, occupation: 'student', occupationLabel: 'Student', ward: 'Multiple Wards', language: 'en', emoji: '🎓', notificationsReceived: 5, projectsRated: 1, schemesApplied: 3 },
};

export const WEEKLY_NOTIFICATIONS = [
  { day: 'Mon', count: 1820 },
  { day: 'Tue', count: 2140 },
  { day: 'Wed', count: 1950 },
  { day: 'Thu', count: 2380 },
  { day: 'Fri', count: 2670 },
  { day: 'Sat', count: 1230 },
  { day: 'Sun', count: 890 },
];

export const CATEGORY_DISTRIBUTION = [
  { name: 'Roads', value: 34, fill: '#1A56DB' },
  { name: 'Hospitals', value: 18, fill: '#EF4444' },
  { name: 'Bridges', value: 12, fill: '#F97316' },
  { name: 'Schools', value: 22, fill: '#16A34A' },
  { name: 'Drainage', value: 8, fill: '#0891B2' },
  { name: 'Parks', value: 6, fill: '#059669' },
];

export const WARD_HEATMAP = [
  { name: 'Rohini', value: 87 }, { name: 'Dwarka', value: 72 }, { name: 'Shahdara', value: 65 },
  { name: 'Karol Bagh', value: 58 }, { name: 'Saket', value: 91 }, { name: 'Janakpuri', value: 45 },
  { name: 'Pitampura', value: 78 }, { name: 'Laxmi Nagar', value: 53 }, { name: 'Nehru Place', value: 82 },
  { name: 'Chandni Chowk', value: 69 }, { name: 'Vasant Kunj', value: 56 }, { name: 'Mayur Vihar', value: 74 },
  { name: 'Defence Colony', value: 41 }, { name: 'Rajouri Garden', value: 63 }, { name: 'GTB Nagar', value: 88 },
  { name: 'Kalkaji', value: 50 }, { name: 'Connaught Place', value: 95 }, { name: 'Patel Nagar', value: 47 },
  { name: 'Model Town', value: 76 }, { name: 'Hauz Khas', value: 84 }, { name: 'Narela', value: 33 },
  { name: 'Mundka', value: 28 }, { name: 'Najafgarh', value: 39 }, { name: 'Mehrauli', value: 61 },
  { name: 'Timarpur', value: 55 },
];

export interface ApprovalEvent {
  action: 'submitted' | 'approved_l1' | 'approved_l2' | 'rejected';
  by: string;
  role: string;
  timestamp: string;
  comment?: string;
}

export interface PendingProject {
  id: string;
  title: string;
  category: ProjectCategory;
  ward: string;
  cost: number;
  beneficiaries: number;
  status: ProjectStatus;
  submittedBy: string;
  submittedAt: string;
  photos: string[];
  impact: string;
  contractor: string;
  fundingSource: string;
  approvalHistory: ApprovalEvent[];
  rejectReason?: string;
}

export const PENDING_PROJECTS: PendingProject[] = [
  {
    id: 'p1', title: 'Rohini Sector 7 Road Resurfacing', category: 'road', ward: 'Rohini Ward 34',
    cost: 3.2, beneficiaries: 80000, status: 'pending_l1', submittedBy: 'Junior Engineer',
    submittedAt: '2025-03-09T10:30:00', photos: ['/placeholder.svg', '/placeholder.svg'],
    impact: 'Zero waterlogging complaints. Accident rate reduced by 60%.',
    contractor: 'MCD Road Division', fundingSource: 'MCD Budget',
    approvalHistory: [{ action: 'submitted', by: 'Junior Engineer', role: 'Ward 34', timestamp: '2025-03-09T10:30:00' }],
  },
  {
    id: 'p2', title: 'Dwarka Park Renovation Phase 2', category: 'park', ward: 'Dwarka Sector 21',
    cost: 1.5, beneficiaries: 30000, status: 'pending_l1', submittedBy: 'Field Officer',
    submittedAt: '2025-03-09T08:15:00', photos: ['/placeholder.svg', '/placeholder.svg'],
    impact: 'New jogging track, children play area, and senior citizen zone added.',
    contractor: 'Green Spaces Pvt Ltd', fundingSource: 'Smart Cities Mission',
    approvalHistory: [{ action: 'submitted', by: 'Field Officer', role: 'Dwarka Zone', timestamp: '2025-03-09T08:15:00' }],
  },
  {
    id: 'p3', title: 'Najafgarh Drain Cleaning Drive', category: 'drainage', ward: 'Najafgarh West',
    cost: 0.8, beneficiaries: 20000, status: 'pending_l2', submittedBy: 'Junior Engineer',
    submittedAt: '2025-03-08T14:00:00', photos: ['/placeholder.svg', '/placeholder.svg'],
    impact: 'Monsoon preparedness improved. Mosquito breeding reduced.',
    contractor: 'Delhi Jal Board', fundingSource: 'State Government',
    approvalHistory: [
      { action: 'submitted', by: 'Junior Engineer', role: 'Najafgarh Zone', timestamp: '2025-03-08T14:00:00' },
      { action: 'approved_l1', by: 'Supervisor Sharma', role: 'L1 Officer', timestamp: '2025-03-08T16:45:00' },
    ],
  },
];

export const CITIZEN_FEEDBACK = [
  { id: '1', rating: 5, comment: 'Road bahut acchi ban gayi! Ab barish mein bhi paani nahi bharta.', ward: 'Rohini Ward 34', timeAgo: '2 hours ago', sentiment: 'positive' as const },
  { id: '2', rating: 3, comment: 'Hospital expansion helpful but parking is still a nightmare.', ward: 'Shahdara East', timeAgo: '5 hours ago', sentiment: 'neutral' as const },
  { id: '3', rating: 5, comment: 'Solar panels se school mein bijli ki koi tension nahi! Students love it.', ward: 'Multiple Wards', timeAgo: '1 day ago', sentiment: 'positive' as const },
];
