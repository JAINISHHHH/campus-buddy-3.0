// ─── Colleges ────────────────────────────────────────────────────────────────
export const COLLEGES = [
  { id: 'mit',  name: 'MIT College of Engineering', short: 'MIT',  city: 'Pune',    color: 'from-violet-600 to-indigo-500', emoji: '🏛️' },
  { id: 'vit',  name: 'VIT Pune',                   short: 'VIT',  city: 'Pune',    color: 'from-pink-500 to-rose-500',     emoji: '🎓' },
  { id: 'pict', name: 'PICT Pune',                  short: 'PICT', city: 'Pune',    color: 'from-cyan-500 to-teal-500',     emoji: '🔬' },
]

// ─── Faculty (per college) ────────────────────────────────────────────────────
export const FACULTY_DB = {
  mit: [
    { id: 1, name: 'Dr. Priya Sharma',   dept: 'CSE',   role: 'Professor & HOD',     email: 'priya.s@mit.edu',   phone: '+91 98765 43210', room: 'A-301', hours: 'Mon–Fri, 10–12 AM', emoji: '👩‍💼', color: 'from-violet-600 to-indigo-500', subjects: ['Data Structures', 'Algorithms'], experience: '14 years' },
    { id: 2, name: 'Prof. Arjun Mehta',  dept: 'CSE',   role: 'Associate Professor', email: 'arjun.m@mit.edu',   phone: '+91 98765 43211', room: 'A-302', hours: 'Tue–Thu, 2–4 PM',   emoji: '👨‍🏫', color: 'from-pink-500 to-rose-500',     subjects: ['DBMS', 'Cloud Computing'],   experience: '9 years'  },
    { id: 3, name: 'Dr. Kavita Joshi',   dept: 'ECE',   role: 'Professor',           email: 'kavita.j@mit.edu',  phone: '+91 98765 43212', room: 'B-201', hours: 'Mon–Wed, 11–1 PM',  emoji: '👩‍🔬', color: 'from-cyan-500 to-teal-500',     subjects: ['Signals', 'VLSI'],           experience: '11 years' },
    { id: 4, name: 'Prof. Ravi Patel',   dept: 'Mech',  role: 'Asst. Professor',     email: 'ravi.p@mit.edu',    phone: '+91 98765 43213', room: 'C-105', hours: 'Wed–Fri, 3–5 PM',   emoji: '👨‍🔧', color: 'from-amber-500 to-orange-400',  subjects: ['Thermodynamics', 'CAD'],     experience: '6 years'  },
    { id: 5, name: 'Dr. Sneha Gupta',    dept: 'Civil', role: 'Professor',           email: 'sneha.g@mit.edu',   phone: '+91 98765 43214', room: 'D-203', hours: 'Mon, Wed, 9–11 AM', emoji: '👩‍💻', color: 'from-emerald-500 to-teal-400',  subjects: ['Structures', 'Soil Mech'],   experience: '13 years' },
    { id: 6, name: 'Prof. Amit Kumar',   dept: 'ECE',   role: 'Senior Lecturer',     email: 'amit.k@mit.edu',    phone: '+91 98765 43215', room: 'B-105', hours: 'Thu–Fri, 10–12 PM', emoji: '👨‍🎓', color: 'from-indigo-500 to-violet-500',  subjects: ['Microprocessors', 'IoT'],    experience: '7 years'  },
  ],
  vit: [
    { id: 1, name: 'Dr. Meera Singh',    dept: 'CSE',   role: 'Professor & HOD',     email: 'meera.s@vit.edu',   phone: '+91 97654 32100', room: 'C-401', hours: 'Mon–Fri, 9–11 AM',  emoji: '👩‍🏫', color: 'from-rose-500 to-pink-500',     subjects: ['ML', 'Deep Learning'],       experience: '15 years' },
    { id: 2, name: 'Prof. Vikram Rao',   dept: 'CSE',   role: 'Associate Professor', email: 'vikram.r@vit.edu',  phone: '+91 97654 32101', room: 'C-402', hours: 'Tue–Fri, 1–3 PM',   emoji: '👨‍💼', color: 'from-teal-500 to-cyan-500',     subjects: ['OS', 'Compiler Design'],     experience: '10 years' },
    { id: 3, name: 'Dr. Nisha Verma',    dept: 'ECE',   role: 'Professor',           email: 'nisha.v@vit.edu',   phone: '+91 97654 32102', room: 'D-201', hours: 'Mon–Wed, 10–12 PM', emoji: '👩‍🔬', color: 'from-violet-600 to-purple-500', subjects: ['Analog', 'Communications'],  experience: '12 years' },
    { id: 4, name: 'Prof. Raj Malhotra', dept: 'IT',    role: 'Asst. Professor',     email: 'raj.m@vit.edu',     phone: '+91 97654 32103', room: 'A-110', hours: 'Wed–Fri, 2–4 PM',   emoji: '👨‍🎓', color: 'from-amber-500 to-yellow-400',  subjects: ['Web Dev', 'Mobile Apps'],    experience: '5 years'  },
    { id: 5, name: 'Dr. Pooja Desai',    dept: 'Mech',  role: 'Professor',           email: 'pooja.d@vit.edu',   phone: '+91 97654 32104', room: 'E-302', hours: 'Mon, Thu, 11–1 PM',  emoji: '👩‍💻', color: 'from-emerald-500 to-green-400', subjects: ['Fluid Mech', 'Heat Trans'],  experience: '10 years' },
  ],
  pict: [
    { id: 1, name: 'Dr. Suresh Iyer',   dept: 'CSE',   role: 'Professor & HOD',     email: 'suresh.i@pict.edu', phone: '+91 96543 21000', room: 'F-201', hours: 'Mon–Fri, 10–12 AM', emoji: '👨‍🏫', color: 'from-cyan-600 to-blue-500',     subjects: ['Network Security', 'OS'],    experience: '16 years' },
    { id: 2, name: 'Prof. Anita Kulkarni', dept: 'CSE', role: 'Associate Professor', email: 'anita.k@pict.edu', phone: '+91 96543 21001', room: 'F-202', hours: 'Tue–Thu, 3–5 PM',   emoji: '👩‍💼', color: 'from-pink-500 to-fuchsia-500',  subjects: ['Java', 'Software Eng'],      experience: '8 years'  },
    { id: 3, name: 'Dr. Rajan Bhosale', dept: 'ECE',   role: 'Professor',           email: 'rajan.b@pict.edu',  phone: '+91 96543 21002', room: 'G-101', hours: 'Mon–Wed, 9–11 AM',  emoji: '👨‍🔬', color: 'from-violet-600 to-indigo-500', subjects: ['Digital Circuits', 'VLSI'],  experience: '13 years' },
    { id: 4, name: 'Prof. Sunita Patil', dept: 'IT',   role: 'Asst. Professor',     email: 'sunita.p@pict.edu', phone: '+91 96543 21003', room: 'H-205', hours: 'Wed–Fri, 11–1 PM',  emoji: '👩‍🎓', color: 'from-teal-500 to-emerald-400',  subjects: ['AI', 'Big Data'],            experience: '7 years'  },
    { id: 5, name: 'Dr. Deepak Joshi',  dept: 'Mech',  role: 'Professor',           email: 'deepak.j@pict.edu', phone: '+91 96543 21004', room: 'I-303', hours: 'Mon, Wed, 2–4 PM',  emoji: '👨‍💻', color: 'from-orange-500 to-amber-400',  subjects: ['Manufacturing', 'Robotics'], experience: '11 years' },
  ],
}

// ─── Announcements (per college) ─────────────────────────────────────────────
export const ANNOUNCEMENTS = {
  mit: [
    { title: 'Mid-term exams schedule released',        time: '2h ago',  tag: 'Academic', color: 'purple' },
    { title: 'Cultural fest "Crescendo" registrations', time: '5h ago',  tag: 'Event',    color: 'pink'   },
    { title: 'Library extended hours this week',        time: '1d ago',  tag: 'Notice',   color: 'cyan'   },
    { title: 'Internship drive — Infosys visiting',     time: '2d ago',  tag: 'Career',   color: 'green'  },
  ],
  vit: [
    { title: 'VIT Hackathon 2026 registrations open',   time: '1h ago',  tag: 'Event',    color: 'pink'   },
    { title: 'End-sem exam timetable published',         time: '4h ago',  tag: 'Academic', color: 'purple' },
    { title: 'New research lab inaugurated',             time: '1d ago',  tag: 'Notice',   color: 'cyan'   },
    { title: 'TCS campus placement drive — April 20',   time: '3d ago',  tag: 'Career',   color: 'green'  },
  ],
  pict: [
    { title: 'Cognizant campus drive — tomorrow',       time: '30m ago', tag: 'Career',   color: 'green'  },
    { title: 'PICT AI symposium — registration open',   time: '3h ago',  tag: 'Event',    color: 'pink'   },
    { title: 'Semester fee payment deadline — May 15',  time: '6h ago',  tag: 'Academic', color: 'purple' },
    { title: 'Sports complex renovation complete',       time: '2d ago',  tag: 'Notice',   color: 'cyan'   },
  ],
}

// ─── College stats (shown on dashboards) ─────────────────────────────────────
export const COLLEGE_STATS = {
  mit:  { students: '4200', faculty: 148, courses: 64, placed: '92%' },
  vit:  { students: '3800', faculty: 132, courses: 58, placed: '89%' },
  pict: { students: '2900', faculty: 110, courses: 52, placed: '95%' },
}

// ─── Mock user DB (email → user record) ──────────────────────────────────────
// Password is always "password123" for demo purposes
export const USERS_DB = {
  // ── Students ──────────────────────────────────────
  'alex@mit.edu':    { name: 'Alex Johnson',   role: 'student', college: 'mit',  dept: 'CSE',  year: '3rd Year', roll: '21CS047', password: 'password123' },
  'sara@vit.edu':    { name: 'Sara Kapoor',    role: 'student', college: 'vit',  dept: 'IT',   year: '2nd Year', roll: '22IT031', password: 'password123' },
  'rohan@pict.edu':  { name: 'Rohan Patil',    role: 'student', college: 'pict', dept: 'ECE',  year: '4th Year', roll: '20EC012', password: 'password123' },

  // ── Faculty (email matches FACULTY_DB records) ───
  'priya.s@mit.edu':   { name: 'Dr. Priya Sharma',     role: 'faculty', college: 'mit',  dept: 'CSE',  facultyId: 1, password: 'password123' },
  'arjun.m@mit.edu':   { name: 'Prof. Arjun Mehta',    role: 'faculty', college: 'mit',  dept: 'CSE',  facultyId: 2, password: 'password123' },
  'kavita.j@mit.edu':  { name: 'Dr. Kavita Joshi',     role: 'faculty', college: 'mit',  dept: 'ECE',  facultyId: 3, password: 'password123' },
  'meera.s@vit.edu':   { name: 'Dr. Meera Singh',      role: 'faculty', college: 'vit',  dept: 'CSE',  facultyId: 1, password: 'password123' },
  'vikram.r@vit.edu':  { name: 'Prof. Vikram Rao',     role: 'faculty', college: 'vit',  dept: 'CSE',  facultyId: 2, password: 'password123' },
  'suresh.i@pict.edu': { name: 'Dr. Suresh Iyer',      role: 'faculty', college: 'pict', dept: 'CSE',  facultyId: 1, password: 'password123' },
  'anita.k@pict.edu':  { name: 'Prof. Anita Kulkarni', role: 'faculty', college: 'pict', dept: 'CSE',  facultyId: 2, password: 'password123' },

  // ── Admins ────────────────────────────────────────
  'admin@mit.edu':   { name: 'Admin MIT',    role: 'admin', college: 'mit',  password: 'password123' },
  'admin@vit.edu':   { name: 'Admin VIT',    role: 'admin', college: 'vit',  password: 'password123' },
  'admin@pict.edu':  { name: 'Admin PICT',   role: 'admin', college: 'pict', password: 'password123' },
}

// ─── Admin analytics (per college) ───────────────────────────────────────────
export const ADMIN_STATS = {
  mit:  { totalUsers: 4348, complaints: 24, lostItems: 18, resolved: 76, pending: 24, newToday: 12 },
  vit:  { totalUsers: 3932, complaints: 18, lostItems: 11, resolved: 82, pending: 18, newToday: 8  },
  pict: { totalUsers: 3010, complaints: 9,  lostItems: 7,  resolved: 91, pending: 9,  newToday: 5  },
}

// ─── Faculty timetable (generic, per dept) ───────────────────────────────────
export const TIMETABLE = {
  CSE:  [
    { day: 'Monday',    time: '9:00 – 10:30',  subject: 'Data Structures',   room: 'A-101', students: 62 },
    { day: 'Tuesday',   time: '11:00 – 12:30', subject: 'Algorithms',        room: 'A-102', students: 58 },
    { day: 'Wednesday', time: '2:00 – 3:30',   subject: 'DBMS Lab',          room: 'Lab-3', students: 30 },
    { day: 'Thursday',  time: '9:00 – 10:30',  subject: 'Data Structures',   room: 'A-101', students: 62 },
    { day: 'Friday',    time: '11:00 – 12:00', subject: 'Office Hours',      room: 'A-301', students: 0  },
  ],
  ECE:  [
    { day: 'Monday',    time: '10:00 – 11:30', subject: 'Signals & Systems', room: 'B-201', students: 54 },
    { day: 'Tuesday',   time: '9:00 – 10:30',  subject: 'VLSI Design',       room: 'B-202', students: 48 },
    { day: 'Thursday',  time: '2:00 – 3:30',   subject: 'VLSI Lab',          room: 'Lab-2', students: 24 },
    { day: 'Friday',    time: '11:00 – 12:00', subject: 'Office Hours',      room: 'B-201', students: 0  },
  ],
  Mech: [
    { day: 'Monday',    time: '8:00 – 9:30',   subject: 'Thermodynamics',    room: 'C-101', students: 67 },
    { day: 'Wednesday', time: '10:00 – 11:30', subject: 'CAD/CAM',           room: 'C-Lab', students: 33 },
    { day: 'Friday',    time: '2:00 – 3:30',   subject: 'Fluid Mechanics',   room: 'C-102', students: 65 },
  ],
  IT:   [
    { day: 'Tuesday',   time: '9:00 – 10:30',  subject: 'Web Development',   room: 'A-201', students: 55 },
    { day: 'Wednesday', time: '11:00 – 12:30', subject: 'Mobile Apps',       room: 'A-202', students: 50 },
    { day: 'Thursday',  time: '2:00 – 3:30',   subject: 'AI Fundamentals',   room: 'A-203', students: 58 },
    { day: 'Friday',    time: '10:00 – 11:00', subject: 'Office Hours',      room: 'A-201', students: 0  },
  ],
  Civil:[
    { day: 'Monday',    time: '9:00 – 10:30',  subject: 'Structural Eng',    room: 'D-101', students: 45 },
    { day: 'Wednesday', time: '11:00 – 12:30', subject: 'Soil Mechanics',    room: 'D-102', students: 43 },
    { day: 'Friday',    time: '9:00 – 10:30',  subject: 'Surveying Lab',     room: 'D-Lab', students: 22 },
  ],
}
