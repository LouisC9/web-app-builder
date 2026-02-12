// =========================
// Demo Data — Student Co-curricular Management System
// Mock arrays for events, clubs, merits, achievements, and users
// =========================

// =========================
// Types
// =========================

export interface EventRecord {
  id: number;
  user_id: number;
  event_name: string;
  event_type: string;
  event_date: string;
  location: string;
  organizer: string;
  description: string;
}

export interface ClubRecord {
  id: number;
  user_id: number;
  club_name: string;
  role: string;
  join_date: string;
  end_date: string;
  description: string;
}

export interface MeritRecord {
  id: number;
  user_id: number;
  activity_name: string;
  category: string;
  hours: number;
  date: string;
  description: string;
}

export interface AchievementRecord {
  id: number;
  user_id: number;
  title: string;
  level: string;
  date: string;
  awarding_body: string;
  certificate_file: string;
  description: string;
}

export interface UserRecord {
  id: number;
  student_id: string;
  full_name: string;
  email: string;
  role: "student" | "admin";
  total_events: number;
  total_clubs: number;
  total_merits: number;
  total_merit_hours: number;
  total_achievements: number;
}

// =========================
// Current Logged-in User (simulated)
// =========================
export const CURRENT_USER_ID = 1;

// =========================
// Users
// =========================
export const demoUsers: UserRecord[] = [
  { id: 1, student_id: "STU001", full_name: "Ahmad Faiz bin Razali", email: "ahmad.faiz@student.edu.my", role: "student", total_events: 4, total_clubs: 2, total_merits: 3, total_merit_hours: 24, total_achievements: 2 },
  { id: 2, student_id: "STU002", full_name: "Nurul Aisyah binti Hassan", email: "nurul.aisyah@student.edu.my", role: "student", total_events: 3, total_clubs: 3, total_merits: 5, total_merit_hours: 40, total_achievements: 3 },
  { id: 3, student_id: "STU003", full_name: "Muhammad Irfan bin Yusof", email: "irfan.yusof@student.edu.my", role: "student", total_events: 2, total_clubs: 1, total_merits: 2, total_merit_hours: 16, total_achievements: 1 },
  { id: 4, student_id: "STU004", full_name: "Siti Nur Amira binti Abdullah", email: "amira.abdullah@student.edu.my", role: "student", total_events: 5, total_clubs: 2, total_merits: 4, total_merit_hours: 32, total_achievements: 4 },
  { id: 5, student_id: "STU005", full_name: "Lee Wei Jie", email: "weijie.lee@student.edu.my", role: "student", total_events: 1, total_clubs: 1, total_merits: 1, total_merit_hours: 8, total_achievements: 1 },
  { id: 6, student_id: "ADM001", full_name: "Dr. Razak bin Othman", email: "razak.admin@edu.my", role: "admin", total_events: 0, total_clubs: 0, total_merits: 0, total_merit_hours: 0, total_achievements: 0 },
];

// =========================
// Events
// =========================
export const demoEvents: EventRecord[] = [
  { id: 1, user_id: 1, event_name: "Hackathon 2025", event_type: "Competition", event_date: "2025-03-15", location: "Main Hall", organizer: "IT Society", description: "24-hour coding competition" },
  { id: 2, user_id: 1, event_name: "Leadership Workshop", event_type: "Workshop", event_date: "2025-04-10", location: "Room 301", organizer: "Student Council", description: "Team leadership skills" },
  { id: 3, user_id: 1, event_name: "Career Fair 2025", event_type: "Seminar", event_date: "2025-05-20", location: "Convention Centre", organizer: "Career Services", description: "Meet potential employers" },
  { id: 4, user_id: 1, event_name: "Merdeka Night", event_type: "Cultural", event_date: "2025-08-31", location: "Auditorium", organizer: "Cultural Club", description: "National day celebration" },
  { id: 5, user_id: 2, event_name: "Public Speaking Contest", event_type: "Competition", event_date: "2025-02-28", location: "Lecture Hall A", organizer: "Toastmasters", description: "Inter-faculty speaking" },
  { id: 6, user_id: 2, event_name: "Charity Run 5K", event_type: "Sports", event_date: "2025-06-15", location: "Campus Track", organizer: "Sports Club", description: "Annual charity run" },
  { id: 7, user_id: 2, event_name: "AI Workshop", event_type: "Workshop", event_date: "2025-07-05", location: "Lab 2", organizer: "IT Society", description: "Intro to machine learning" },
  { id: 8, user_id: 3, event_name: "Blood Donation Drive", event_type: "Community Service", event_date: "2025-04-20", location: "Medical Centre", organizer: "Red Crescent", description: "Semester blood drive" },
  { id: 9, user_id: 3, event_name: "Environment Day", event_type: "Community Service", event_date: "2025-06-05", location: "Campus Garden", organizer: "Green Society", description: "Tree planting activity" },
  { id: 10, user_id: 4, event_name: "Debate Finals", event_type: "Competition", event_date: "2025-03-25", location: "Auditorium", organizer: "Debate Club", description: "Inter-university debate" },
  { id: 11, user_id: 4, event_name: "Photography Exhibition", event_type: "Cultural", event_date: "2025-05-10", location: "Art Gallery", organizer: "Photography Club", description: "Student photo showcase" },
  { id: 12, user_id: 4, event_name: "First Aid Training", event_type: "Workshop", event_date: "2025-07-20", location: "Room 105", organizer: "St John", description: "CPR and first aid" },
  { id: 13, user_id: 4, event_name: "Tech Talk", event_type: "Seminar", event_date: "2025-09-12", location: "Lecture Hall B", organizer: "IEEE", description: "Industry speaker event" },
  { id: 14, user_id: 4, event_name: "Cultural Night", event_type: "Cultural", event_date: "2025-10-15", location: "Main Hall", organizer: "Cultural Club", description: "Multicultural performance" },
  { id: 15, user_id: 5, event_name: "Chess Tournament", event_type: "Competition", event_date: "2025-04-05", location: "Room 202", organizer: "Chess Club", description: "Open chess tournament" },
];

// =========================
// Clubs
// =========================
export const demoClubs: ClubRecord[] = [
  { id: 1, user_id: 1, club_name: "IT Society", role: "Secretary", join_date: "2024-09-01", end_date: "2025-08-31", description: "Responsible for meeting minutes" },
  { id: 2, user_id: 1, club_name: "Debate Club", role: "Member", join_date: "2024-10-15", end_date: "", description: "Active debater" },
  { id: 3, user_id: 2, club_name: "Red Crescent", role: "Vice President", join_date: "2024-03-01", end_date: "2025-02-28", description: "Managing volunteer activities" },
  { id: 4, user_id: 2, club_name: "Photography Club", role: "Member", join_date: "2024-09-01", end_date: "", description: "Learning photography skills" },
  { id: 5, user_id: 2, club_name: "Toastmasters", role: "Member", join_date: "2025-01-10", end_date: "", description: "Improving public speaking" },
  { id: 6, user_id: 3, club_name: "Green Society", role: "Treasurer", join_date: "2024-09-01", end_date: "2025-08-31", description: "Managing club funds" },
  { id: 7, user_id: 4, club_name: "Debate Club", role: "President", join_date: "2024-03-01", end_date: "2025-02-28", description: "Leading the debate team" },
  { id: 8, user_id: 4, club_name: "IEEE Student Branch", role: "Committee", join_date: "2024-09-01", end_date: "", description: "Event coordination" },
  { id: 9, user_id: 5, club_name: "Chess Club", role: "Member", join_date: "2024-09-01", end_date: "", description: "Competitive chess player" },
];

// =========================
// Merits
// =========================
export const demoMerits: MeritRecord[] = [
  { id: 1, user_id: 1, activity_name: "Campus Cleanup", category: "Community Service", hours: 4, date: "2025-02-10", description: "General campus cleanup drive" },
  { id: 2, user_id: 1, activity_name: "Peer Tutoring", category: "Academic Support", hours: 12, date: "2025-03-01", description: "Tutoring juniors in programming" },
  { id: 3, user_id: 1, activity_name: "Orientation Week Helper", category: "Student Affairs", hours: 8, date: "2025-01-05", description: "Guided new students during orientation" },
  { id: 4, user_id: 2, activity_name: "Blood Drive Volunteer", category: "Community Service", hours: 6, date: "2025-04-20", description: "Assisted in blood donation event" },
  { id: 5, user_id: 2, activity_name: "Library Assistant", category: "Academic Support", hours: 10, date: "2025-02-15", description: "Helped organize library resources" },
  { id: 6, user_id: 2, activity_name: "Open Day Volunteer", category: "Student Affairs", hours: 8, date: "2025-03-22", description: "Campus tour guide for visitors" },
  { id: 7, user_id: 2, activity_name: "Recycling Campaign", category: "Community Service", hours: 6, date: "2025-05-10", description: "Led recycling awareness campaign" },
  { id: 8, user_id: 2, activity_name: "Sports Day Crew", category: "Sports", hours: 10, date: "2025-06-15", description: "Logistics for sports day" },
  { id: 9, user_id: 3, activity_name: "Tree Planting", category: "Community Service", hours: 8, date: "2025-06-05", description: "Environment day tree planting" },
  { id: 10, user_id: 3, activity_name: "Food Bank Volunteer", category: "Community Service", hours: 8, date: "2025-03-15", description: "Helped distribute food to B40 families" },
  { id: 11, user_id: 4, activity_name: "Debate Coach", category: "Academic Support", hours: 12, date: "2025-02-01", description: "Coached juniors for inter-faculty debate" },
  { id: 12, user_id: 4, activity_name: "Event Emcee", category: "Student Affairs", hours: 4, date: "2025-05-10", description: "Emceed photography exhibition" },
  { id: 13, user_id: 4, activity_name: "Workshop Facilitator", category: "Academic Support", hours: 8, date: "2025-07-20", description: "Facilitated first aid training" },
  { id: 14, user_id: 4, activity_name: "Fundraising", category: "Community Service", hours: 8, date: "2025-04-15", description: "Charity fund collection" },
  { id: 15, user_id: 5, activity_name: "Chess Class Instructor", category: "Academic Support", hours: 8, date: "2025-04-05", description: "Taught beginners chess" },
];

// =========================
// Achievements
// =========================
export const demoAchievements: AchievementRecord[] = [
  { id: 1, user_id: 1, title: "Best App Award - Hackathon 2025", level: "University", date: "2025-03-15", awarding_body: "Faculty of Computing", certificate_file: "", description: "Won best application in hackathon" },
  { id: 2, user_id: 1, title: "Dean's List Semester 1", level: "Faculty", date: "2025-01-20", awarding_body: "Faculty of Computing", certificate_file: "", description: "CGPA above 3.5" },
  { id: 3, user_id: 2, title: "Best Speaker - Public Speaking Contest", level: "University", date: "2025-02-28", awarding_body: "Toastmasters Club", certificate_file: "", description: "First place in speaking contest" },
  { id: 4, user_id: 2, title: "Outstanding Volunteer Award", level: "State", date: "2025-04-30", awarding_body: "Red Crescent Society", certificate_file: "", description: "Recognized for volunteer contributions" },
  { id: 5, user_id: 2, title: "Photography Contest Runner-up", level: "University", date: "2025-05-10", awarding_body: "Photography Club", certificate_file: "", description: "Second place in photo contest" },
  { id: 6, user_id: 3, title: "Green Ambassador Award", level: "University", date: "2025-06-05", awarding_body: "Green Society", certificate_file: "", description: "Environmental contributions" },
  { id: 7, user_id: 4, title: "Best Debater - National", level: "National", date: "2025-03-25", awarding_body: "MADUM", certificate_file: "", description: "Top debater at nationals" },
  { id: 8, user_id: 4, title: "IEEE Paper Published", level: "International", date: "2025-07-01", awarding_body: "IEEE", certificate_file: "", description: "Conference paper accepted" },
  { id: 9, user_id: 4, title: "Leadership Excellence Award", level: "University", date: "2025-08-20", awarding_body: "Student Affairs", certificate_file: "", description: "Outstanding student leader" },
  { id: 10, user_id: 4, title: "First Aid Certified", level: "National", date: "2025-07-20", awarding_body: "St John Ambulance", certificate_file: "", description: "Certified first aider" },
  { id: 11, user_id: 5, title: "Chess Champion - Open Category", level: "University", date: "2025-04-05", awarding_body: "Chess Club", certificate_file: "", description: "Won university chess tournament" },
];

// =========================
// Event Type Options
// =========================
export const eventTypeOptions = [
  "Competition",
  "Workshop",
  "Seminar",
  "Cultural",
  "Sports",
  "Community Service",
  "Other",
];

// =========================
// Merit Category Options
// =========================
export const meritCategoryOptions = [
  "Community Service",
  "Academic Support",
  "Student Affairs",
  "Sports",
  "Other",
];

// =========================
// Achievement Level Options
// =========================
export const achievementLevelOptions = [
  "Faculty",
  "University",
  "State",
  "National",
  "International",
];

// =========================
// Club Role Options
// =========================
export const clubRoleOptions = [
  "President",
  "Vice President",
  "Secretary",
  "Treasurer",
  "Committee",
  "Member",
];
