/**
 * Edu STUDENT - Mathematics Platform Controller, Production Video Stream, Khmer i18n & Access Control
 */

const ADMIN_EMAILS = ["penhbormey011427809@gmail.com", "admin@gmail.com"];
const CLOUD_SYNC_API = "https://crudcrud.com/api/0929e3a9f54e4f1f84ed88d80808daef";

const initialNotes = [];

const initialCourses = [];

const translations = {
  en: {
    tagline: "Learn. Practice. Grow.",
    header_sub: "learn management",
    my_favorites: "My favorites",
    recently_visited: "Recently visited",
    subject_workspace: "Subject Workspace",
    math_title: "Mathematics",
    math_subtitle: "Advanced Algebra, Calculus & Geometry Lessons",
    daily_challenge_label: "DAILY CHALLENGE",
    daily_challenge_title: "Complete Active Recall Quiz",
    daily_challenge_desc: "Earn +150 XP & increase your study streak!",
    start_btn: "Start",
    leaderboard_title: "Top Student Leaderboard",
    video_stream_title: "Mathematics Video Stream",
    my_courses_title: "My Mathematics Courses",
    notifications_title: "Notifications Feed",
    notif_1_title: "Welcome to Edu STUDENT Platform",
    notif_1_sub: "Start exploring lessons and creating your study notes.",
    pending_assignments_title: "Pending Assignments",
    no_assignments: "No pending assignments.",
    urgent_label: "Urgent",
    edit_profile_btn: "Edit Profile & Change Photo",
    achievements_title: "Achievements & Badges",
    community_title: "Student Directory & Friends",
    tools_title: "Study Tools & Platform Controls",
    pomo_btn: "Focus Timer",
    notes_btn: "Study Notes",
    admin_btn: "Educator Admin",
    tg_btn: "Telegram Bot",
    signout_btn: "Sign Out",
    nav_home: "Home",
    nav_video: "Video",
    nav_note: "Note",
    nav_notif: "Notification",
    nav_profile: "Profile"
  },
  km: {
    tagline: "រៀន។ អនុវត្ត។ រក្សាការរីកចម្រើន។",
    header_sub: "ប្រព័ន្ធគ្រប់គ្រងការសិក្សា",
    my_favorites: "មេរៀនចូលចិត្ត",
    recently_visited: "មេរៀនទើបចូលមើល",
    subject_workspace: "លំហការងារមុខវិជ្ជា",
    math_title: "គណិតវិទ្យា",
    math_subtitle: "មេរៀនពិជគណិត គណនាឌីផេរ៉ង់ស្យែល និងធរណីមាត្រ",
    daily_challenge_label: "ការប្រកួតប្រជែងប្រចាំថ្ងៃ",
    daily_challenge_title: "ធ្វើលំហាត់ស្ទង់ចំណេះដឹង",
    daily_challenge_desc: "ទទួលបាន +150 XP និងបង្កើន streak សិក្សា!",
    start_btn: "ចាប់ផ្តើម",
    leaderboard_title: "តារាងសិស្សពូកែ",
    video_stream_title: "វីដេអូបង្រៀនគណិតវិទ្យា",
    my_courses_title: "វគ្គសិក្សាគណិតវិទ្យារបស់ខ្ញុំ",
    notifications_title: "ការជូនដំណឹង",
    notif_1_title: "សូមស្វាគមន៍មកកាន់ប្រព័ន្ធ Edu STUDENT",
    notif_1_sub: "ចាប់ផ្តើមសិក្សាមេរៀន និងបង្កើតកំណត់ត្រារបស់អ្នក។",
    pending_assignments_title: "កិច្ចការផ្ទះដែលត្រូវធ្វើ",
    no_assignments: "មិនទាន់មានកិច្ចការផ្ទះត្រូវធ្វើនៅឡើយទេ។",
    urgent_label: "បន្ទាន់",
    edit_profile_btn: "កែប្រែប្រវត្តិរូប និងប្តូររូបភាព",
    achievements_title: "សមិទ្ធផល និងបេកប្តូរ",
    community_title: "សហគមន៍សិស្ស និងមិត្តភក្តិ",
    tools_title: "ឧបករណ៍សិក្សា និងការគ្រប់គ្រង",
    pomo_btn: "នាឡិកាផ្តោតអារម្មណ៍",
    notes_btn: "កំណត់ត្រាសិក្សា",
    admin_btn: "អ្នកគ្រប់គ្រង",
    tg_btn: "Telegram Bot",
    signout_btn: "ចាកចេញ",
    nav_home: "ទំព័រដើម",
    nav_video: "វីដេអូ",
    nav_note: "កំណត់ត្រា",
    nav_notif: "ដំណឹង",
    nav_profile: "ប្រវត្តិរូប"
  }
};

function getStoredCourses() {
  const cached = localStorage.getItem('edu_user_courses');
  if (!cached) return [];
  try {
    const parsed = JSON.parse(cached);
    if (parsed.some(c => c.title.includes("Artificial Intelligence") || c.title.includes("Full-Stack") || c.id === "math_calculus" || c.id === "math_algebra")) {
      localStorage.removeItem('edu_user_courses');
      return [];
    }
    return parsed;
  } catch (e) {
    return [];
  }
}

const AppState = {
  isLoggedIn: false,
  theme: "light",
  lang: localStorage.getItem("edu_lang") || "en",
  user: {
    name: "Student User",
    username: "student_user",
    studentId: "EDU-2026-8842",
    email: "student@edustudent.io",
    school: "Global Learning Institute",
    country: "United States",
    level: 1,
    xp: 0,
    coins: 0,
    streak: 0,
    aiCount: 0,
    quizzesPassed: 0,
    completedCourses: 0,
    avatar: "assets/default_avatar.jpg",
    friends: []
  },
  activeChatTargetEmail: null,
  tempAvatar: null,
  modalUploadedVideoUrl: "",
  currentTab: "home",
  favorites: [],
  favIndex: 0,
  items: [],
  videos: JSON.parse(localStorage.getItem('edu_admin_videos')) || [],
  notes: JSON.parse(localStorage.getItem('edu_user_notes')) || initialNotes,
  courses: getStoredCourses(),
  allUsers: JSON.parse(localStorage.getItem('edu_all_users')) || [],
  chats: JSON.parse(localStorage.getItem('edu_user_chats')) || {},
  badges: [
    {
      id: "streak_14",
      title: "14 Streak",
      icon: "ri-fire-fill",
      color: "#f97316",
      desc: "Maintain a 14-day consecutive study streak.",
      target: 14,
      key: "streak"
    },
    {
      id: "ai_pioneer",
      title: "AI Pioneer",
      icon: "ri-robot-fill",
      color: "#4f58f6",
      desc: "Ask 5 questions to the AI Study Assistant.",
      target: 5,
      key: "aiCount"
    },
    {
      id: "quiz_master",
      title: "Quiz Master",
      icon: "ri-trophy-fill",
      color: "#f59e0b",
      desc: "Pass 3 active recall quizzes with high score.",
      target: 3,
      key: "quizzesPassed"
    },
    {
      id: "certified_dev",
      title: "Certified",
      icon: "ri-award-fill",
      color: "#06b6d4",
      desc: "Complete 1 full course to 100% mastery.",
      target: 1,
      key: "completedCourses"
    }
  ],
  pomodoro: {
    timeLeft: 25 * 60,
    isRunning: false,
    interval: null
  }
};

// --- Initialization ---
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initLanguage();
  checkPersistentAuth();
  initLaunchScreen();
  initPWA();
  renderFavoritesCard();
  renderRecentVisitedList();
  renderStudentCard();
  renderAchievementsGrid();
  renderCommunityUsers();
  renderVideoStream();
  renderUserCoursesGrid();
  renderNotes();
  setupEventListeners();
  requestNotificationPermission();
  startReminderChecker();
  startGlobalCloudSync();
});

// Start Global Real-time Cross-Device Cloud Syncing (Phone <-> PC)
function startGlobalCloudSync() {
  fetchCloudUsers();
  fetchCloudChats();
  setInterval(() => {
    fetchCloudUsers();
    fetchCloudChats();
  }, 4000);
}

// Language Switcher Engine (English <-> Khmer)
function initLanguage() {
  applyLanguage(AppState.lang);
}

function toggleLanguage() {
  AppState.lang = AppState.lang === "en" ? "km" : "en";
  localStorage.setItem("edu_lang", AppState.lang);
  applyLanguage(AppState.lang);
}

function applyLanguage(lang) {
  const dict = translations[lang] || translations.en;
  
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) {
      el.innerText = dict[key];
    }
  });

  const langBtn = document.getElementById("lang-btn");
  if (langBtn) {
    langBtn.innerHTML = lang === "en" ? `🌐 <span>ខ្មែរ</span>` : `🌐 <span>EN</span>`;
  }

  renderUserCoursesGrid();
  renderVideoStream();
  renderNotes();
  renderFavoritesCard();
  renderRecentVisitedList();
  renderAchievementsGrid();
  renderCommunityUsers();
}

// Check if current user is Super Admin (penhbormey011427809@gmail.com or admin@gmail.com)
function isSuperAdmin() {
  if (!AppState.isLoggedIn || !AppState.user.email) return false;
  return ADMIN_EMAILS.some(email => email.toLowerCase() === AppState.user.email.toLowerCase());
}

// Open Admin Modal with Permission Enforcement
function openAdminModal() {
  if (!isSuperAdmin()) {
    alert("⛔ Access Denied: Only Admin accounts (" + ADMIN_EMAILS.join(", ") + ") can access Educator Admin Controls!\n\nPlease sign in with an Admin account to access this feature.");
    openModal("auth-modal");
    return;
  }
  openModal("admin-modal");
}

// Render Real Courses Grid
function renderUserCoursesGrid() {
  const container = document.getElementById("user-courses-grid");
  if (!container) return;

  const isKm = AppState.lang === 'km';

  if (AppState.courses.length === 0) {
    container.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:24px 16px; color:var(--text-muted); font-size:13.5px;">${isKm ? 'មិនទាន់មានវគ្គសិក្សាត្រូវបានចុះឈ្មោះនៅឡើយទេ។' : 'No courses enrolled yet.'}</div>`;
    return;
  }

  container.innerHTML = AppState.courses.map(c => {
    const completedCount = c.lessons.filter(l => l.done).length;
    const totalCount = c.lessons.length;
    const percent = Math.round((completedCount / totalCount) * 100);
    const displayTitle = isKm && c.title_km ? c.title_km : c.title;

    return `
      <div onclick="openCourseDetail('${c.id}')" style="background:var(--bg-card-secondary); padding:16px; border-radius:18px; border:1px solid var(--border-subtle); cursor:pointer; transition:transform 0.2s ease;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <strong style="font-size:15px; color:var(--text-primary);">${displayTitle}</strong>
          <i class="${c.icon}" style="color:${c.color}; font-size:22px;"></i>
        </div>
        <div style="font-size:13px; color:var(--text-secondary); margin-top:4px;">${c.workspace} • ${isKm ? 'មេរៀន' : 'Lesson'} ${completedCount} / ${totalCount}</div>
        <div class="progress-bar-bg">
          <div class="progress-bar-fill" style="width:${percent}%;"></div>
        </div>
      </div>
    `;
  }).join('');
}

// Open Course Details & Syllabus Modal
function openCourseDetail(courseId) {
  const course = AppState.courses.find(c => c.id === courseId);
  if (!course) return;

  const isKm = AppState.lang === 'km';
  const titleEl = document.getElementById("course-modal-title");
  const wsEl = document.getElementById("course-modal-workspace");
  const barEl = document.getElementById("course-modal-progress-bar");
  const listEl = document.getElementById("course-lessons-list");

  const completedCount = course.lessons.filter(l => l.done).length;
  const totalCount = course.lessons.length;
  const percent = Math.round((completedCount / totalCount) * 100);
  const displayTitle = isKm && course.title_km ? course.title_km : course.title;

  if (titleEl) titleEl.innerText = displayTitle;
  if (wsEl) wsEl.innerText = `${course.workspace} • ${isKm ? 'បានបញ្ចប់' : 'Completed'} ${completedCount} / ${totalCount} (${percent}%)`;
  if (barEl) barEl.style.width = `${percent}%`;

  if (listEl) {
    listEl.innerHTML = course.lessons.map(l => `
      <div style="display:flex; align-items:center; justify-content:space-between; background:var(--bg-card); padding:12px 14px; border-radius:14px; border:1px solid var(--border-subtle);">
        <div style="display:flex; align-items:center; gap:10px;">
          <input type="checkbox" ${l.done ? 'checked' : ''} onchange="toggleLessonDone('${course.id}', ${l.num})" style="width:18px; height:18px; accent-color:var(--color-royal); cursor:pointer;">
          <span style="font-size:13.5px; font-weight:600; text-decoration:${l.done ? 'line-through' : 'none'}; opacity:${l.done ? '0.7' : '1'};">
            ${isKm ? 'មេរៀនទី' : 'Lesson'} ${l.num}: ${l.title}
          </span>
        </div>
      </div>
    `).join('');
  }

  openModal("course-detail-modal");
}

// Toggle Lesson Completion Checkbox
function toggleLessonDone(courseId, lessonNum) {
  const course = AppState.courses.find(c => c.id === courseId);
  if (!course) return;

  const lesson = course.lessons.find(l => l.num === lessonNum);
  if (lesson) {
    lesson.done = !lesson.done;
    localStorage.setItem('edu_user_courses', JSON.stringify(AppState.courses));
    renderUserCoursesGrid();
    openCourseDetail(courseId);
  }
}

// Sync Admin Videos between admin.html and main app
function renderVideoStream() {
  const container = document.getElementById("video-stream-grid");
  if (!container) return;

  AppState.videos = JSON.parse(localStorage.getItem('edu_admin_videos')) || [];
  const isKm = AppState.lang === 'km';

  if (AppState.videos.length === 0) {
    container.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:30px 20px; color:var(--text-muted); font-size:14px;">${isKm ? 'មិនទាន់មានវីដេអូមេរៀនត្រូវបានបោះពុម្ពផ្សាយនៅឡើយទេ។' : 'No math videos published yet.'} ${isSuperAdmin() ? (isKm ? 'អ្នកគ្រប់គ្រងអាចបោះពុម្ពផ្សាយវីដេអូបានខាងក្រោម!' : 'Admin can publish math videos below!') : ''}</div>`;
    return;
  }

  const hasAdminAuth = isSuperAdmin();

  container.innerHTML = AppState.videos.map(v => `
    <div class="item-row" onclick="playVideo('${v.title}', '${v.instructor || 'Instructor'}', '${v.url}')" style="border:1px solid var(--border-subtle); padding:14px; border-radius:16px; position:relative;">
      <div class="item-icon-box">
        <i class="${v.icon || 'ri-calculator-line'}"></i>
      </div>
      <div class="item-info">
        <div class="item-title">${v.title}</div>
        <div class="item-subtitle">${v.instructor || 'Instructor'} • ${v.category || 'Mathematics'}</div>
      </div>
      <div style="display:flex; align-items:center; gap:8px;">
        <i class="ri-play-circle-fill" style="font-size:28px; color:var(--color-royal);"></i>
        ${hasAdminAuth ? `
          <i class="ri-delete-bin-line" onclick="event.stopPropagation(); deleteVideoAsAdmin(${v.id})" style="color:var(--color-danger); font-size:18px; cursor:pointer;" title="Delete Video (Admin Only)"></i>
        ` : ''}
      </div>
    </div>
  `).join('');
}

// Select Video File inside Admin Modal
function handleModalFileSelect(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(event) {
    AppState.modalUploadedVideoUrl = event.target.result;
  };
  reader.readAsDataURL(file);
}

// Quick Admin Add Video directly in App
function handleQuickAddVideo(e) {
  e.preventDefault();
  if (!isSuperAdmin()) {
    alert("⛔ Access Denied: Only Admin accounts (" + ADMIN_EMAILS.join(", ") + ") can publish videos!");
    return;
  }

  const title = document.getElementById("admin-add-video-title").value.trim();
  const instructor = document.getElementById("admin-add-video-instructor").value.trim();
  const urlInput = document.getElementById("admin-add-video-url").value.trim();

  const finalUrl = AppState.modalUploadedVideoUrl || urlInput;

  if (!finalUrl) {
    alert("Please select a video file to upload or enter a video URL!");
    return;
  }

  if (title && instructor) {
    AppState.videos.unshift({
      id: Date.now(),
      title,
      instructor,
      category: "Mathematics",
      icon: "ri-calculator-line",
      url: finalUrl
    });

    localStorage.setItem('edu_admin_videos', JSON.stringify(AppState.videos));
    AppState.modalUploadedVideoUrl = "";
    document.getElementById("admin-add-video-file").value = "";
    renderVideoStream();
    closeModal("admin-modal");
    alert("✅ Math video successfully uploaded & published to Video Stream!");
    e.target.reset();
  }
}

// Quick Admin Delete Video directly in App
function deleteVideoAsAdmin(id) {
  if (!isSuperAdmin()) {
    alert("⛔ Access Denied: Only Admin accounts (" + ADMIN_EMAILS.join(", ") + ") can delete videos!");
    return;
  }

  if (confirm("Delete this video lesson from platform?")) {
    AppState.videos = AppState.videos.filter(v => v.id !== id);
    localStorage.setItem('edu_admin_videos', JSON.stringify(AppState.videos));
    renderVideoStream();
  }
}

// 🌐 Fetch Global Users from Cloud Sync API (Phone <-> PC)
async function fetchCloudUsers() {
  try {
    const res = await fetch(`${CLOUD_SYNC_API}/users`);
    if (res.ok) {
      const cloudUsers = await res.json();
      if (Array.isArray(cloudUsers) && cloudUsers.length > 0) {
        let localUsers = JSON.parse(localStorage.getItem('edu_all_users')) || [];
        
        cloudUsers.forEach(cu => {
          if (cu.email) {
            const idx = localUsers.findIndex(lu => lu.email && lu.email.toLowerCase() === cu.email.toLowerCase());
            if (idx >= 0) {
              localUsers[idx] = { ...localUsers[idx], ...cu };
            } else {
              localUsers.push(cu);
            }
          }
        });

        AppState.allUsers = localUsers;
        localStorage.setItem('edu_all_users', JSON.stringify(localUsers));
        renderCommunityUsers();
      }
    }
  } catch (e) {}
}

// 👥 Render Student Directory & Friends System
function renderCommunityUsers() {
  const container = document.getElementById("community-users-list");
  if (!container) return;

  AppState.allUsers = JSON.parse(localStorage.getItem('edu_all_users')) || [];
  const isKm = AppState.lang === 'km';
  const currentUserEmail = AppState.user.email ? AppState.user.email.toLowerCase() : "";

  // Filter out current user from student directory
  const otherStudents = AppState.allUsers.filter(u => u.email && u.email.toLowerCase() !== currentUserEmail);

  if (otherStudents.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:18px 0; color:var(--text-muted); font-size:13px;">
        ${isKm ? 'មិនទាន់មានសិស្សផ្សេងទៀតបានចុះឈ្មោះនៅឡើយទេ។ បង្កើតគណនីបន្ថែមដើម្បីធ្វើការឆាត!' : 'No other students registered yet. Create another account to add friends & chat!'}
      </div>
    `;
    return;
  }

  const userFriends = AppState.user.friends || [];

  container.innerHTML = otherStudents.map(u => {
    const isFriend = userFriends.includes(u.email);
    return `
      <div class="item-row" style="border:1px solid var(--border-subtle); padding:10px 14px; border-radius:16px;">
        <img src="${u.avatar || 'assets/default_avatar.jpg'}" style="width:40px; height:40px; border-radius:50%; object-fit:cover; border:2px solid var(--color-royal);">
        <div class="item-info">
          <div class="item-title">${u.name}</div>
          <div class="item-subtitle">${u.school || 'Student'} • @${u.username || 'user'}</div>
        </div>
        ${isFriend ? `
          <button class="btn-primary" onclick="openChatModal('${u.email}')" style="width:auto; padding:6px 14px; font-size:12px;">
            <i class="ri-chat-3-line"></i> ${isKm ? 'ឆាត' : 'Chat'}
          </button>
        ` : `
          <button class="btn-secondary" onclick="addFriend('${u.email}')" style="width:auto; padding:6px 14px; font-size:12px; border-color:var(--color-royal); color:var(--color-royal);">
            <i class="ri-user-add-line"></i> ${isKm ? '+ បន្ថែមមិត្ត' : '+ Add Friend'}
          </button>
        `}
      </div>
    `;
  }).join('');
}

// Add Friend Action
function addFriend(targetEmail) {
  if (!AppState.isLoggedIn) {
    alert("Please sign in to add friends!");
    openModal("auth-modal");
    return;
  }

  if (!AppState.user.friends) AppState.user.friends = [];
  if (!AppState.user.friends.includes(targetEmail)) {
    AppState.user.friends.push(targetEmail);
    if (AppState.isLoggedIn) {
      localStorage.setItem("edu_user_session", JSON.stringify(AppState.user));
      registerUserInMemory(AppState.user);
    }
    renderCommunityUsers();
    playAudioChime("success");
    alert("✅ Friend added successfully! You can now send real-time chat messages.");
  }
}

// Open Live Chat Modal with selected Friend
function openChatModal(targetEmail) {
  AppState.allUsers = JSON.parse(localStorage.getItem('edu_all_users')) || [];
  const targetUser = AppState.allUsers.find(u => u.email && u.email.toLowerCase() === targetEmail.toLowerCase());
  
  if (!targetUser) return;

  AppState.activeChatTargetEmail = targetEmail;

  const nameEl = document.getElementById("chat-target-name");
  const avatarEl = document.getElementById("chat-target-avatar");
  if (nameEl) nameEl.innerText = targetUser.name;
  if (avatarEl) avatarEl.src = targetUser.avatar || "assets/default_avatar.jpg";

  renderChatMessages();
  openModal("chat-modal");
}

// Fetch Real-time Cloud Chats
async function fetchCloudChats() {
  if (!AppState.activeChatTargetEmail || !AppState.user.email) return;

  const myEmail = AppState.user.email.toLowerCase();
  const friendEmail = AppState.activeChatTargetEmail.toLowerCase();
  const chatKey = [myEmail, friendEmail].sort().join("___");

  try {
    const res = await fetch(`${CLOUD_SYNC_API}/chats`);
    if (res.ok) {
      const cloudChats = await res.json();
      if (Array.isArray(cloudChats)) {
        const filtered = cloudChats.filter(c => c.chatKey === chatKey);
        if (filtered.length > 0) {
          AppState.chats = JSON.parse(localStorage.getItem('edu_user_chats')) || {};
          AppState.chats[chatKey] = filtered.map(c => ({ sender: c.sender, text: c.text, time: c.time }));
          localStorage.setItem('edu_user_chats', JSON.stringify(AppState.chats));
          renderChatMessages();
        }
      }
    }
  } catch (e) {}
}

// Render Messages between current user and target friend
function renderChatMessages() {
  const container = document.getElementById("chat-messages-box");
  if (!container || !AppState.activeChatTargetEmail) return;

  AppState.chats = JSON.parse(localStorage.getItem('edu_user_chats')) || {};

  const myEmail = AppState.user.email.toLowerCase();
  const friendEmail = AppState.activeChatTargetEmail.toLowerCase();
  const chatKey = [myEmail, friendEmail].sort().join("___");

  const thread = AppState.chats[chatKey] || [];

  if (thread.length === 0) {
    container.innerHTML = `<div style="text-align:center; margin:auto; color:var(--text-muted); font-size:12.5px;">Say hello to start chatting! 👋</div>`;
    return;
  }

  container.innerHTML = thread.map(m => {
    const isMine = m.sender === myEmail;
    return `
      <div class="chat-bubble ${isMine ? 'chat-bubble-own' : 'chat-bubble-other'}">
        <div>${m.text}</div>
        <div class="chat-time">${m.time}</div>
      </div>
    `;
  }).join('');

  container.scrollTop = container.scrollHeight;
}

// Send Live Chat Message to Cloud Sync API
async function handleSendChatMessage(e) {
  e.preventDefault();
  const input = document.getElementById("chat-input-text");
  if (!input || !input.value.trim() || !AppState.activeChatTargetEmail) return;

  const text = input.value.trim();
  const myEmail = AppState.user.email.toLowerCase();
  const friendEmail = AppState.activeChatTargetEmail.toLowerCase();
  const chatKey = [myEmail, friendEmail].sort().join("___");

  AppState.chats = JSON.parse(localStorage.getItem('edu_user_chats')) || {};
  if (!AppState.chats[chatKey]) AppState.chats[chatKey] = [];

  const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const msgObj = {
    chatKey: chatKey,
    sender: myEmail,
    text: text,
    time: timeStr
  };

  AppState.chats[chatKey].push({ sender: myEmail, text: text, time: timeStr });
  localStorage.setItem('edu_user_chats', JSON.stringify(AppState.chats));
  input.value = "";
  playAudioChime("success");
  renderChatMessages();

  try {
    await fetch(`${CLOUD_SYNC_API}/chats`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(msgObj)
    });
  } catch (err) {}
}

// Register user in global cloud user registry
async function registerUserInMemory(userData) {
  AppState.allUsers = JSON.parse(localStorage.getItem('edu_all_users')) || [];
  const existingIndex = AppState.allUsers.findIndex(u => u.email && u.email.toLowerCase() === userData.email.toLowerCase());
  
  if (existingIndex >= 0) {
    AppState.allUsers[existingIndex] = { ...AppState.allUsers[existingIndex], ...userData };
  } else {
    AppState.allUsers.push(userData);
  }

  localStorage.setItem('edu_all_users', JSON.stringify(AppState.allUsers));
  renderCommunityUsers();

  try {
    await fetch(`${CLOUD_SYNC_API}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: userData.name,
        username: userData.username || userData.email.split("@")[0],
        email: userData.email,
        school: userData.school || "Student",
        avatar: userData.avatar || "assets/default_avatar.jpg"
      })
    });
  } catch (err) {}
}

// Web Audio API Sound Synthesizer
function playAudioChime(type = "alarm") {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    if (type === "alarm" || type === "reminder") {
      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = "sine";
      osc2.type = "sine";
      
      osc1.frequency.setValueAtTime(880, now);
      osc1.frequency.setValueAtTime(1046.5, now + 0.15);
      osc1.frequency.setValueAtTime(1318.5, now + 0.3);

      osc2.frequency.setValueAtTime(440, now);
      osc2.frequency.setValueAtTime(523.25, now + 0.15);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.8);
      osc2.stop(now + 0.8);
    } else if (type === "success") {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.1);
      osc.frequency.setValueAtTime(783.99, now + 0.2);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.5);
    }
  } catch (e) {
    console.log("Audio play error:", e);
  }
}

// Request Web Browser Notification Permission
function requestNotificationPermission() {
  if ("Notification" in window && Notification.permission !== "granted" && Notification.permission !== "denied") {
    Notification.requestPermission();
  }
}

// Background Reminder Loop (Checks every 5 seconds)
function startReminderChecker() {
  setInterval(checkNoteReminders, 5000);
}

function checkNoteReminders() {
  const now = new Date();
  
  AppState.notes.forEach(note => {
    if (note.reminderTime && !note.notified) {
      const remDate = new Date(note.reminderTime);
      if (now >= remDate) {
        note.notified = true;
        localStorage.setItem('edu_user_notes', JSON.stringify(AppState.notes));
        sendWebNotification(note);
        renderNotes();
      }
    }
  });
}

// Dispatch Web Browser Push Notification & Play Alarm Sound
function sendWebNotification(note) {
  playAudioChime("alarm");

  const title = `📌 Math Study Reminder: ${note.title}`;
  const options = {
    body: note.content,
    icon: "assets/default_avatar.jpg",
    badge: "assets/default_avatar.jpg",
    tag: `note-rem-${note.id}`
  };

  if ("Notification" in window && Notification.permission === "granted") {
    new Notification(title, options);
  } else {
    alert(`📌 MATH STUDY REMINDER ALARM!\n\nTitle: ${note.title}\nContent: ${note.content}`);
  }
}

// Theme Management (Dark & Light Mode)
function initTheme() {
  const savedTheme = localStorage.getItem("edu_theme") || "light";
  AppState.theme = savedTheme;
  applyTheme(savedTheme);
}

function applyTheme(theme) {
  const toggleBtn = document.getElementById("theme-toggle-btn");
  if (theme === "dark") {
    document.body.classList.add("dark-mode");
    if (toggleBtn) toggleBtn.innerHTML = `<i class="ri-sun-line" style="color:#f59e0b;"></i>`;
  } else {
    document.body.classList.remove("dark-mode");
    if (toggleBtn) toggleBtn.innerHTML = `<i class="ri-moon-line"></i>`;
  }
}

function toggleDarkMode() {
  AppState.theme = AppState.theme === "dark" ? "light" : "dark";
  localStorage.setItem("edu_theme", AppState.theme);
  applyTheme(AppState.theme);
}

// Render Real Interactive Achievements Grid
function renderAchievementsGrid() {
  const container = document.getElementById("achievements-badge-grid");
  if (!container) return;

  container.innerHTML = AppState.badges.map(b => {
    const currentVal = AppState.user[b.key] || 0;
    const isUnlocked = currentVal >= b.target;
    return `
      <div class="btn-secondary" onclick="openBadgeDetail('${b.id}')" style="padding:14px; flex-direction:column; text-align:center; position:relative; opacity:${isUnlocked ? '1' : '0.65'}; border:${isUnlocked ? `1px solid ${b.color}` : '1px solid var(--border-subtle)'};">
        <i class="${b.icon}" style="font-size:26px; color:${b.color};"></i>
        <strong style="font-size:12.5px; margin-top:6px; color:var(--text-primary);">${b.title}</strong>
        ${isUnlocked ? `<span style="font-size:10px; color:${b.color}; font-weight:700; margin-top:2px;">Unlocked</span>` : `<span style="font-size:10px; color:var(--text-muted); font-weight:600; margin-top:2px;">${currentVal} / ${b.target}</span>`}
      </div>
    `;
  }).join('');
}

// Open Badge Detail Modal
function openBadgeDetail(badgeId) {
  const badge = AppState.badges.find(b => b.id === badgeId);
  if (!badge) return;

  const currentVal = AppState.user[badge.key] || 0;
  const isUnlocked = currentVal >= badge.target;
  const percent = Math.min(100, Math.round((currentVal / badge.target) * 100));

  const iconBox = document.getElementById("badge-detail-icon-box");
  const titleEl = document.getElementById("badge-detail-title");
  const descEl = document.getElementById("badge-detail-desc");
  const progressText = document.getElementById("badge-detail-progress-text");
  const progressBar = document.getElementById("badge-detail-progress-bar");

  if (iconBox) {
    iconBox.style.background = isUnlocked ? `${badge.color}22` : "rgba(100,100,100,0.1)";
    iconBox.innerHTML = `<i class="${badge.icon}" style="color:${badge.color};"></i>`;
  }
  if (titleEl) titleEl.innerText = `${badge.title} ${isUnlocked ? '🏆' : '🔒'}`;
  if (descEl) descEl.innerText = badge.desc;
  if (progressText) progressText.innerText = `${currentVal} / ${badge.target} (${percent}%)`;
  if (progressBar) {
    progressBar.style.width = `${percent}%`;
    progressBar.style.background = badge.color;
  }

  openModal("badge-detail-modal");
}

// Check if user is already logged in via localStorage
function checkPersistentAuth() {
  const savedSession = localStorage.getItem("edu_user_session");
  if (savedSession) {
    try {
      const userData = JSON.parse(savedSession);
      Object.assign(AppState.user, userData);
      AppState.user.streak = 0; // Always start streak from 0
      AppState.isLoggedIn = true;
      registerUserInMemory(userData);
    } catch (e) {
      localStorage.removeItem("edu_user_session");
    }
  }
  updateAuthUI();
}

// Update UI based on logged in / logged out state and Admin status
function updateAuthUI() {
  const accountBtn = document.getElementById("header-account-btn");
  const adminControlBtn = document.getElementById("admin-control-btn");
  
  if (AppState.isLoggedIn) {
    if (accountBtn) {
      accountBtn.innerHTML = `<img src="${AppState.user.avatar || 'assets/default_avatar.jpg'}" style="width:100%; height:100%; border-radius:50%; object-fit:cover;">`;
      accountBtn.onclick = () => switchTab("profile");
      accountBtn.title = `Signed in as ${AppState.user.name}`;
    }
    renderStudentCard();
  } else {
    if (accountBtn) {
      accountBtn.innerHTML = `<i class="ri-user-add-line"></i>`;
      accountBtn.onclick = () => openModal("auth-modal");
      accountBtn.title = "Sign In / Create Account";
    }
  }

  // Toggle Admin button visibility based on Super Admin email match
  if (adminControlBtn) {
    if (isSuperAdmin()) {
      adminControlBtn.style.display = "flex";
    } else {
      adminControlBtn.style.display = "none";
    }
  }

  // Update profile tab display elements
  const profileNameEl = document.getElementById("profile-display-name");
  const profileEmailEl = document.getElementById("profile-display-email");
  const profileSchoolEl = document.getElementById("profile-display-school");
  const profileAvatarEl = document.getElementById("profile-display-avatar");
  const leaderboardImgEl = document.getElementById("leaderboard-user-img");
  
  if (profileNameEl) profileNameEl.innerText = AppState.user.name;
  if (profileEmailEl) profileEmailEl.innerText = AppState.user.email;
  if (profileSchoolEl) profileSchoolEl.innerText = AppState.user.school;
  if (profileAvatarEl) profileAvatarEl.src = AppState.user.avatar || "assets/default_avatar.jpg";
  if (leaderboardImgEl) leaderboardImgEl.src = AppState.user.avatar || "assets/default_avatar.jpg";

  renderVideoStream();
  renderAchievementsGrid();
  renderCommunityUsers();
}

// Launch Screen Progress
function initLaunchScreen() {
  const fill = document.getElementById("launch-fill");
  const screen = document.getElementById("launch-screen");
  let progress = 0;
  
  const timer = setInterval(() => {
    progress += 25;
    if (fill) fill.style.width = `${progress}%`;
    
    if (progress >= 100) {
      clearInterval(timer);
      setTimeout(() => {
        if (screen) {
          screen.style.opacity = "0";
          setTimeout(() => screen.style.visibility = "hidden", 400);
        }
      }, 200);
    }
  }, 80);
}

// Safe no-op trigger function
function triggerDynamicIsland(text, type = "info") {}

// Render Student Card Details
function renderStudentCard() {
  const nameEl = document.getElementById("card-student-name");
  const idEl = document.getElementById("card-student-id");
  const schoolEl = document.getElementById("card-student-school");
  
  if (nameEl) nameEl.innerText = AppState.user.name;
  if (idEl) idEl.innerText = AppState.user.studentId;
  if (schoolEl) schoolEl.innerText = AppState.user.school;
}

// Handle Custom Profile Photo Selection
function handleAvatarFileSelect(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(event) {
    const dataUrl = event.target.result;
    AppState.tempAvatar = dataUrl;
    const previewEl = document.getElementById("edit-avatar-preview");
    if (previewEl) previewEl.src = dataUrl;
  };
  reader.readAsDataURL(file);
}

// Open Edit Profile Modal with prefilled values
function openEditProfileModal() {
  document.getElementById("edit-name").value = AppState.user.name;
  document.getElementById("edit-username").value = AppState.user.username;
  document.getElementById("edit-id").value = AppState.user.studentId;
  document.getElementById("edit-school").value = AppState.user.school;
  document.getElementById("edit-email").value = AppState.user.email;
  
  const previewEl = document.getElementById("edit-avatar-preview");
  if (previewEl) previewEl.src = AppState.user.avatar || "assets/default_avatar.jpg";
  AppState.tempAvatar = null;

  openModal("edit-profile-modal");
}

// Save Profile Edits & Avatar Photo
function handleSaveProfile(e) {
  e.preventDefault();
  AppState.user.name = document.getElementById("edit-name").value;
  AppState.user.username = document.getElementById("edit-username").value;
  AppState.user.studentId = document.getElementById("edit-id").value;
  AppState.user.school = document.getElementById("edit-school").value;
  AppState.user.email = document.getElementById("edit-email").value;

  if (AppState.tempAvatar) {
    AppState.user.avatar = AppState.tempAvatar;
  }

  if (AppState.isLoggedIn) {
    localStorage.setItem("edu_user_session", JSON.stringify(AppState.user));
    registerUserInMemory(AppState.user);
  }

  updateAuthUI();
  closeModal("edit-profile-modal");
}

// Handle Sign In Submission
async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const pass = document.getElementById("login-pass").value;

  try {
    const userData = await window.EduFirebase.loginWithEmail(email, pass);
    saveUserSession(userData);
    closeModal("auth-modal");
  } catch (err) {
    alert("Sign in failed: " + err.message);
  }
}

// Handle Account Creation Submission
async function handleSignUp(e) {
  e.preventDefault();
  const name = document.getElementById("signup-name").value;
  const username = document.getElementById("signup-username").value;
  const email = document.getElementById("signup-email").value;
  const pass = document.getElementById("signup-pass").value;
  const passConfirm = document.getElementById("signup-pass-confirm").value;

  if (pass !== passConfirm) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const userData = await window.EduFirebase.signUpWithEmail(name, username, email, pass);
    saveUserSession(userData);
    closeModal("auth-modal");
  } catch (err) {
    alert("Account creation failed: " + err.message);
  }
}

// Handle Social Logins
async function handleSocialLogin(provider) {
  try {
    let userData;
    if (provider === 'google') userData = await window.EduFirebase.loginWithGoogle();
    if (provider === 'github') userData = await window.EduFirebase.loginWithGitHub();
    
    saveUserSession(userData);
    closeModal("auth-modal");
  } catch (err) {
    alert("Social Sign-in error: " + err.message);
  }
}

// Save session persistently to localStorage
function saveUserSession(userData) {
  Object.assign(AppState.user, userData);
  AppState.user.streak = 0;
  AppState.isLoggedIn = true;
  localStorage.setItem("edu_user_session", JSON.stringify(AppState.user));
  registerUserInMemory(AppState.user);
  updateAuthUI();
}

// Sign Out Action
function signOutUser() {
  if (confirm("Are you sure you want to sign out?")) {
    localStorage.removeItem("edu_user_session");
    AppState.isLoggedIn = false;
    AppState.user = {
      name: "Student User",
      username: "student_user",
      studentId: "EDU-2026-8842",
      email: "student@edustudent.io",
      school: "Global Learning Institute",
      country: "United States",
      level: 1,
      xp: 0,
      coins: 0,
      streak: 0,
      aiCount: 0,
      quizzesPassed: 0,
      completedCourses: 0,
      avatar: "assets/default_avatar.jpg",
      friends: []
    };
    updateAuthUI();
    openModal("auth-modal");
  }
}

// Switch between Sign In and Sign Up forms inside Modal
function toggleAuthMode(mode) {
  const signinBox = document.getElementById("auth-signin-box");
  const signupBox = document.getElementById("auth-signup-box");
  const signinTabBtn = document.getElementById("tab-btn-signin");
  const signupTabBtn = document.getElementById("tab-btn-signup");

  if (mode === 'signup') {
    signinBox.style.display = "none";
    signupBox.style.display = "block";
    signupTabBtn.style.color = "var(--color-royal)";
    signupTabBtn.style.borderBottom = "2px solid var(--color-royal)";
    signinTabBtn.style.color = "var(--text-secondary)";
    signinTabBtn.style.borderBottom = "none";
  } else {
    signinBox.style.display = "block";
    signupBox.style.display = "none";
    signinTabBtn.style.color = "var(--color-royal)";
    signinTabBtn.style.borderBottom = "2px solid var(--color-royal)";
    signupTabBtn.style.color = "var(--text-secondary)";
    signupTabBtn.style.borderBottom = "none";
  }
}

// Render Favorite Hero Card Carousel
function renderFavoritesCard() {
  const container = document.getElementById("fav-preview-container");
  const dotsContainer = document.getElementById("fav-dots-container");
  if (!container || !dotsContainer) return;

  const isKm = AppState.lang === 'km';

  if (AppState.favorites.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:10px 0; color:var(--text-secondary); font-size:13px;">
        <i class="ri-star-line" style="font-size:24px; color:var(--color-royal); display:block; margin-bottom:4px;"></i>
        ${isKm ? 'មិនទាន់មានមេរៀនចូលចិត្តនៅឡើយទេ' : 'No favorite lessons added yet.'}
      </div>
    `;
    dotsContainer.innerHTML = "";
    return;
  }

  const current = AppState.favorites[AppState.favIndex];
  container.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:flex-start;">
      <div style="display:flex; gap:12px; align-items:center;">
        <div style="width:40px; height:40px; border-radius:12px; background:#edf0ff; display:flex; align-items:center; justify-content:center; color:var(--color-royal);">
          <i class="${current.icon}" style="font-size:22px;"></i>
        </div>
        <div>
          <h4 style="font-size:14px; font-weight:700; color:#181925;">${current.title}</h4>
          <span style="font-size:12px; color:var(--text-secondary);">${current.subtitle}</span>
        </div>
      </div>
      <i class="ri-star-fill" style="color:var(--color-gold); font-size:18px;"></i>
    </div>
  `;

  dotsContainer.innerHTML = AppState.favorites.map((_, idx) => `
    <div class="dot ${idx === AppState.favIndex ? 'active' : ''}" onclick="nextFavorite(${idx})"></div>
  `).join('');
}

function nextFavorite(idx = null) {
  if (AppState.favorites.length === 0) return;
  if (idx !== null) {
    AppState.favIndex = idx;
  } else {
    AppState.favIndex = (AppState.favIndex + 1) % AppState.favorites.length;
  }
  renderFavoritesCard();
}

// Render Recently Visited Items
function renderRecentVisitedList() {
  const container = document.getElementById("recent-list-container");
  if (!container) return;

  const isKm = AppState.lang === 'km';

  if (AppState.items.length === 0) {
    container.innerHTML = `<div style="text-align:center; padding:18px 0; color:var(--text-muted); font-size:13px;">${isKm ? 'មិនទាន់មានប្រវត្តិចូលមើលនៅឡើយទេ' : 'No recently visited lessons yet.'}</div>`;
    return;
  }

  container.innerHTML = AppState.items.map(item => `
    <div class="item-row" onclick="switchTab('videos')">
      <div class="item-icon-box">
        <i class="${item.icon}"></i>
      </div>
      <div class="item-info">
        <div class="item-title">${item.title}</div>
        <div class="item-subtitle">${item.subtitle}</div>
      </div>
      <i class="ri-star-${item.starred ? 'fill active' : 'line'} star-icon" onclick="event.stopPropagation(); toggleStar(${item.id})"></i>
    </div>
  `).join('');
}

function toggleStar(itemId) {
  const item = AppState.items.find(i => i.id === itemId);
  if (item) {
    item.starred = !item.starred;
    renderRecentVisitedList();
  }
}

// Router Switcher
function switchTab(tabName) {
  AppState.currentTab = tabName;
  document.querySelectorAll(".tab-pane").forEach(pane => pane.style.display = "none");
  
  const selectedPane = document.getElementById(`tab-${tabName}`);
  if (selectedPane) selectedPane.style.display = "block";

  if (tabName === "videos") {
    renderVideoStream();
    renderUserCoursesGrid();
  } else if (tabName === "profile") {
    renderCommunityUsers();
  }

  document.querySelectorAll(".nav-item").forEach(item => {
    item.classList.toggle("active", item.getAttribute("data-tab") === tabName);
  });
}

// Video Player Engine
function playVideo(title, teacher, src) {
  if (!src) {
    alert("No video file URL provided for this lesson.");
    return;
  }
  const playerModal = document.getElementById("video-player-modal");
  const videoEl = document.getElementById("main-video-el");
  const titleEl = document.getElementById("video-title");
  const teacherEl = document.getElementById("video-teacher");

  if (!playerModal || !videoEl) return;

  videoEl.src = src;
  titleEl.innerText = title;
  teacherEl.innerText = `Instructor: ${teacher}`;
  
  playerModal.classList.add("active");
  videoEl.play();
}

function setPlaybackSpeed(speed) {
  const videoEl = document.getElementById("main-video-el");
  if (videoEl) videoEl.playbackRate = parseFloat(speed);
}

function togglePiP() {
  const videoEl = document.getElementById("main-video-el");
  if (document.pictureInPictureElement) {
    document.exitPictureInPicture();
  } else if (videoEl && videoEl.requestPictureInPicture) {
    videoEl.requestPictureInPicture();
  }
}

// Quiz System Engine
let currentQuiz = {
  question: "What is the derivative of f(x) = x^3 + 4x^2 - 5?",
  options: [
    "A. f'(x) = 3x^2 + 8x",
    "B. f'(x) = 3x^2 + 4x",
    "C. f'(x) = x^2 + 8x",
    "D. f'(x) = 6x + 8"
  ],
  correct: 0
};

function openQuizModal() {
  openModal("quiz-modal");
  document.getElementById("quiz-q").innerText = currentQuiz.question;
  const optionsBox = document.getElementById("quiz-options");
  optionsBox.innerHTML = "";
  
  currentQuiz.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.className = "btn-secondary";
    btn.style.width = "100%";
    btn.style.margin = "6px 0";
    btn.innerText = opt;
    btn.onclick = () => submitQuizAnswer(idx);
    optionsBox.appendChild(btn);
  });
}

function submitQuizAnswer(selectedIdx) {
  const isCorrect = selectedIdx === currentQuiz.correct;
  if (isCorrect) {
    AppState.user.xp += 150;
    AppState.user.coins += 20;
    AppState.user.quizzesPassed = (AppState.user.quizzesPassed || 0) + 1;
    playAudioChime("success");
    renderAchievementsGrid();
    alert("Correct Answer! +150 XP, +20 Coins earned.");
  } else {
    alert("Incorrect. The correct answer was A (f'(x) = 3x^2 + 8x).");
  }
  closeModal("quiz-modal");
}

// Pomodoro Timer Engine
function togglePomodoro() {
  const btn = document.getElementById("pomo-btn");
  if (AppState.pomodoro.isRunning) {
    clearInterval(AppState.pomodoro.interval);
    AppState.pomodoro.isRunning = false;
    btn.innerText = AppState.lang === 'km' ? "▶ ចាប់ផ្តើម" : "▶ Start Focus";
  } else {
    AppState.pomodoro.isRunning = true;
    btn.innerText = AppState.lang === 'km' ? "⏸ ផ្អាក" : "⏸ Pause Focus";

    AppState.pomodoro.interval = setInterval(() => {
      if (AppState.pomodoro.timeLeft > 0) {
        AppState.pomodoro.timeLeft--;
        updatePomodoroUI();
      } else {
        clearInterval(AppState.pomodoro.interval);
        AppState.pomodoro.isRunning = false;
        playAudioChime("alarm");
        alert(AppState.lang === 'km' ? "ការសិក្សាបានបញ្ចប់ដោយជោគជ័យ!" : "Pomodoro complete! Great math focus session.");
        AppState.user.xp += 100;
      }
    }, 1000);
  }
}

function updatePomodoroUI() {
  const m = Math.floor(AppState.pomodoro.timeLeft / 60).toString().padStart(2, '0');
  const s = (AppState.pomodoro.timeLeft % 60).toString().padStart(2, '0');
  const timerText = `${m}:${s}`;
  
  const timerEl = document.getElementById("pomo-display");
  if (timerEl) timerEl.innerText = timerText;
}

// AI Assistant Action Handlers
async function handleAIPrompt() {
  const input = document.getElementById("ai-input");
  const output = document.getElementById("ai-output");
  if (!input || !input.value) return;

  const prompt = input.value;
  output.innerHTML = `<div style="padding:10px; font-size:13px; color:var(--text-secondary);">AI Math Assistant is calculating...</div>`;

  AppState.user.aiCount = (AppState.user.aiCount || 0) + 1;
  renderAchievementsGrid();

  const res = await window.EduAI.ask(prompt);
  if (typeof res === "string") {
    output.innerHTML = `<div class="btn-secondary" style="justify-content:flex-start; text-align:left; line-height:1.5;">${res.replace(/\n/g, '<br>')}</div>`;
  }
}

// Open Dedicated Create Note Modal Dialog
function openCreateNoteModal() {
  document.getElementById("new-note-title").value = "";
  document.getElementById("new-note-content").value = "";
  document.getElementById("new-note-reminder").value = "";
  closeModal("notes-modal");
  openModal("create-note-modal");
}

// Save New Note Handler with LocalStorage Persistence & Web Time Reminders
function handleSaveNewNote(e) {
  e.preventDefault();
  const title = document.getElementById("new-note-title").value.trim();
  const content = document.getElementById("new-note-content").value.trim();
  const reminderTime = document.getElementById("new-note-reminder").value;

  if (title && content) {
    AppState.notes.unshift({
      id: Date.now(),
      title,
      content,
      reminderTime: reminderTime || null,
      notified: false,
      date: new Date().toISOString().split('T')[0]
    });

    localStorage.setItem('edu_user_notes', JSON.stringify(AppState.notes));
    renderNotes();
    closeModal("create-note-modal");
    openModal("notes-modal");

    if (reminderTime && "Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }
}

// Delete Note Handler with LocalStorage Sync
function deleteNote(id) {
  AppState.notes = AppState.notes.filter(n => n.id !== id);
  localStorage.setItem('edu_user_notes', JSON.stringify(AppState.notes));
  renderNotes();
}

// Render Notes Cards with Link to Full Vault
function renderNotes() {
  const box = document.getElementById("notes-container");
  if (!box) return;

  const isKm = AppState.lang === 'km';
  const notesHeader = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
      <span style="font-size:12px; color:var(--text-secondary); font-weight:600;">${isKm ? 'កំណត់ត្រាស្វ័យសិក្សា (' + AppState.notes.length + ')' : 'Saved Math Notes (' + AppState.notes.length + ')'}</span>
      <a href="notes.html" style="font-size:12px; color:var(--color-royal); font-weight:700; text-decoration:none;">${isKm ? 'មើលកំណត់ត្រាទំាងអស់' : 'View Full Vault'} <i class="ri-arrow-right-line"></i></a>
    </div>
  `;

  if (AppState.notes.length === 0) {
    box.innerHTML = notesHeader + `<div style="text-align:center; padding:20px; color:var(--text-muted); font-size:14px;">${isKm ? 'មិនទាន់មានកំណត់ត្រានៅឡើយទេ' : 'No math notes created yet.'}</div>`;
    return;
  }

  box.innerHTML = notesHeader + AppState.notes.map(n => {
    const formattedRem = n.reminderTime ? new Date(n.reminderTime).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : null;
    return `
      <div style="background:var(--bg-card-secondary); padding:16px; border-radius:18px; margin-bottom:12px; border:1px solid var(--border-subtle); box-shadow:0 4px 12px rgba(0,0,0,0.02);">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:6px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <i class="ri-sticky-note-fill" style="color:var(--color-royal); font-size:18px;"></i>
            <strong style="color:var(--text-primary); font-size:15px;">${n.title}</strong>
          </div>
          <div style="display:flex; align-items:center; gap:10px;">
            <span style="font-size:11px; color:var(--text-muted); font-weight:500;">${n.date}</span>
            <i class="ri-delete-bin-line" onclick="deleteNote(${n.id})" style="color:var(--color-danger); cursor:pointer; font-size:16px;" title="Delete Note"></i>
          </div>
        </div>
        <p style="font-size:13px; color:var(--text-secondary); line-height:1.6; white-space:pre-wrap;">${n.content}</p>
        
        ${formattedRem ? `
          <div style="margin-top:10px; display:inline-flex; align-items:center; gap:6px; font-size:11.5px; padding:4px 10px; border-radius:8px; background:${n.notified ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)'}; color:${n.notified ? 'var(--color-success)' : 'var(--color-gold)'}; font-weight:600;">
            <i class="${n.notified ? 'ri-checkbox-circle-fill' : 'ri-alarm-line'}"></i>
            <span>${n.notified ? (isKm ? 'បានផ្ញើដំណឹងនៅ' : 'Notification Sent at') : (isKm ? 'កំណត់វេលារំលឹក:' : 'Scheduled Reminder:')} ${formattedRem}</span>
          </div>
        ` : ''}
      </div>
    `;
  }).join('');
}

// Modal Helpers
function openModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.add("active");
}

function closeModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.remove("active");
}

function setupEventListeners() {
  document.querySelectorAll(".nav-item").forEach(item => {
    item.addEventListener("click", () => switchTab(item.getAttribute("data-tab")));
  });

  document.querySelectorAll(".modal-overlay").forEach(overlay => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        overlay.classList.remove("active");
      }
    });
  });

  renderNotes();
  updatePomodoroUI();
}

// PWA Service Worker Registration
function initPWA() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
      .then(reg => console.log('Edu STUDENT PWA Active.'))
      .catch(err => {});
  }
}
