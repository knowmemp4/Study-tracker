/**
 * UMANG Bhaiya — CBSE Study Tracker
 * Sophisticated Dark Theme - Offline-first Single-Page Application (Vanilla JS)
 */

(function () {
  'use strict';

  // --- Constants & CBSE Syllabus Data ---
  const STORAGE_KEY = 'umang_profiles';
  const ACTIVE_PROFILE_KEY = 'umang_active_profile_id';
  const THEME_KEY = 'umang_theme';

  const SUBJECTS = [
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'Social Science',
    'English',
    'Hindi'
  ];

  const DEFAULT_STAGES = {
    'Mathematics': [
      'Lectures & Formula',
      'NCERT Full',
      'Modules Full',
      'ML Agarwal (HOTS)',
      'PYQ / Practice'
    ],
    'Physics': [
      'ONE SHOT',
      'NCERT & Numericals',
      'S. Chand questions',
      'PYQ / Practice'
    ],
    'Chemistry': [
      'ONE SHOT / Lectures',
      'NCERT Line by Line',
      'Exemplar & Numericals',
      'PYQ / Practice'
    ],
    'Biology': [
      'NCERT Reading & Diagrams',
      'Notes & Key Terms',
      'NCERT Back Questions',
      'PYQ / Practice'
    ],
    'Social Science': [
      'Theory Read',
      'NCERT Questions',
      'Map Work & Dates',
      'Previous Year Questions',
      'Sample Papers'
    ],
    'English': [
      'Chapter Reading',
      'Theme & Character Sketch',
      'NCERT Solutions',
      'Extract & Writing Practice'
    ],
    'Hindi': [
      'Reading & Saransh',
      'Shabdarth & Vyakarana',
      'NCERT Prashnottar',
      'Patra/Nibandh & PYQs'
    ]
  };

  const SYLLABUS_DATA = {
    'Class 10': {
      'Mathematics': [
        'Ch 1: Real Numbers',
        'Ch 2: Polynomials',
        'Ch 3: Pair of Linear Equations in Two Variables',
        'Ch 4: Quadratic Equations',
        'Ch 5: Arithmetic Progressions',
        'Ch 6: Triangles',
        'Ch 7: Coordinate Geometry',
        'Ch 8: Introduction to Trigonometry',
        'Ch 9: Some Applications of Trigonometry',
        'Ch 10: Circles',
        'Ch 11: Areas Related to Circles',
        'Ch 12: Surface Areas and Volumes',
        'Ch 13: Statistics',
        'Ch 14: Probability'
      ],
      'Physics': [
        'Ch 1: Light – Reflection & Refraction',
        'Ch 2: Human Eye & Colorful World',
        'Ch 3: Electricity',
        'Ch 4: Magnetic Effects of Electric Current'
      ],
      'Chemistry': [
        'Ch 1: Chemical Reactions & Equations',
        'Ch 2: Acids, Bases & Salts',
        'Ch 3: Metals & Non-metals',
        'Ch 4: Carbon & its Compounds'
      ],
      'Biology': [
        'Ch 1: Life Processes',
        'Ch 2: Control and Coordination',
        'Ch 3: How do Organisms Reproduce?',
        'Ch 4: Heredity',
        'Ch 5: Our Environment'
      ],
      'Social Science': [
        'Ch 1: The Rise of Nationalism in Europe',
        'Ch 2: Nationalism in India',
        'Ch 3: The Making of a Global World',
        'Ch 4: Print Culture & The Modern World',
        'Ch 5: Resources & Development',
        'Ch 6: Forest and Wildlife Resources',
        'Ch 7: Water Resources',
        'Ch 8: Agriculture',
        'Ch 9: Minerals & Energy Resources',
        'Ch 10: Manufacturing Industries',
        'Ch 11: Lifelines of National Economy',
        'Ch 12: Power Sharing',
        'Ch 13: Federalism',
        'Ch 14: Gender, Religion and Caste',
        'Ch 15: Political Parties',
        'Ch 16: Outcomes of Democracy',
        'Ch 17: Development',
        'Ch 18: Sectors of the Indian Economy',
        'Ch 19: Money and Credit',
        'Ch 20: Globalization & The Indian Economy'
      ],
      'English': [
        'Ch 1: A Letter to God & Dust of Snow / Fire and Ice',
        'Ch 2: Nelson Mandela: Long Walk to Freedom & A Tiger in the Zoo',
        'Ch 3: Two Stories About Flying & Ball Poem',
        'Ch 4: From the Diary of Anne Frank & Amanda!',
        'Ch 5: Glimpses of India & The Trees',
        'Ch 6: Mijbil the Otter & Fog',
        'Ch 7: Madam Rides the Bus & Custard the Dragon',
        'Ch 8: The Sermon at Benares & For Anne Gregory',
        'Ch 9: The Proposal',
        'Ch 10: A Triumph of Surgery',
        'Ch 11: The Thief\'s Story',
        'Ch 12: The Midnight Visitor',
        'Ch 13: A Question of Trust',
        'Ch 14: Footprints Without Feet',
        'Ch 15: The Making of a Scientist',
        'Ch 16: The Necklace',
        'Ch 17: Bholi',
        'Ch 18: The Book That Saved the Earth',
        'Ch 19: Grammar & Analytical Paragraph'
      ],
      'Hindi': [
        'Ch 1: Surdas ke Pad',
        'Ch 2: Ram-Lakshman-Parshuram Samvad',
        'Ch 3: Aatmakathya',
        'Ch 4: Utsah & At Nahi Rahi Hai',
        'Ch 5: Yah Danturit Muskan & Fasal',
        'Ch 6: Sangatkar',
        'Ch 7: Netaji Ka Chashma',
        'Ch 8: Balgobin Bhagat',
        'Ch 9: Lakhnavi Andaz',
        'Ch 10: Ek Kahani Yeh Bhi',
        'Ch 11: Naubadkhane Mein Ibadat',
        'Ch 12: Sanskriti',
        'Ch 13: Mata Ka Aanchal',
        'Ch 14: Sana-Sana Hath Jodi',
        'Ch 15: Main Kyon Likhta Hoon?',
        'Ch 16: Vyakaran: Vakya, Vachya, Pad Parichay, Alankar',
        'Ch 17: Lekhan: Patra, Nibandh, Vigyapan, Sandesh'
      ]
    },
    'Class 9': {
      'Mathematics': [
        'Ch 1: Number Systems',
        'Ch 2: Polynomials',
        'Ch 3: Coordinate Geometry',
        'Ch 4: Linear Equations in Two Variables',
        'Ch 5: Introduction to Euclid\'s Geometry',
        'Ch 6: Lines and Angles',
        'Ch 7: Triangles',
        'Ch 8: Quadrilaterals',
        'Ch 9: Circles',
        'Ch 10: Heron\'s Formula',
        'Ch 11: Surface Areas and Volumes',
        'Ch 12: Statistics'
      ],
      'Physics': [
        'Ch 1: Motion',
        'Ch 2: Force and Laws of Motion',
        'Ch 3: Gravitation',
        'Ch 4: Work and Energy',
        'Ch 5: Sound'
      ],
      'Chemistry': [
        'Ch 1: Matter in Our Surroundings',
        'Ch 2: Is Matter Around Us Pure',
        'Ch 3: Atoms and Molecules',
        'Ch 4: Structure of the Atom'
      ],
      'Biology': [
        'Ch 1: The Fundamental Unit of Life',
        'Ch 2: Tissues',
        'Ch 3: Improvement in Food Resources'
      ],
      'Social Science': [
        'Ch 1: The French Revolution',
        'Ch 2: Socialism in Europe & Russian Revolution',
        'Ch 3: Nazism and the Rise of Hitler',
        'Ch 4: India – Size and Location',
        'Ch 5: Physical Features of India',
        'Ch 6: Drainage',
        'Ch 7: Climate',
        'Ch 8: Natural Vegetation and Wildlife',
        'Ch 9: Population',
        'Ch 10: What is Democracy? Why Democracy?',
        'Ch 11: Constitutional Design',
        'Ch 12: Electoral Politics',
        'Ch 13: Working of Institutions',
        'Ch 14: Democratic Rights',
        'Ch 15: The Story of Village Palampur',
        'Ch 16: People as Resource',
        'Ch 17: Poverty as a Challenge',
        'Ch 18: Food Security in India'
      ],
      'English': [
        'Ch 1: The Fun They Had & The Road Not Taken',
        'Ch 2: The Sound of Music & Wind',
        'Ch 3: The Little Girl & Rain on the Roof',
        'Ch 4: A Truly Beautiful Mind & Lake Isle of Innisfree',
        'Ch 5: The Snake and the Mirror & Legend of the Northland',
        'Ch 6: My Childhood & No Men Are Foreign',
        'Ch 7: Reach for the Top & On Killing a Tree',
        'Ch 8: Kathmandu & A Slumber Did My Spirit Seal',
        'Ch 9: If I Were You',
        'Ch 10: The Lost Child',
        'Ch 11: The Adventures of Toto',
        'Ch 12: Iswaran the Storyteller',
        'Ch 13: In the Kingdom of Fools',
        'Ch 14: The Happy Prince',
        'Ch 15: The Last Leaf',
        'Ch 16: A House Is Not a Home',
        'Ch 17: The Beggar',
        'Ch 18: Grammar & Descriptive Paragraph'
      ],
      'Hindi': [
        'Ch 1: Do Bailon ki Katha',
        'Ch 2: Lhasa ki Aur',
        'Ch 3: Upbhoktavad ki Sanskriti',
        'Ch 4: Saanwle Sapno ki Yaad',
        'Ch 5: Premchand ke Phate Joote',
        'Ch 6: Mere Bachpan ke Din',
        'Ch 7: Sakhiyan evam Sabad',
        'Ch 8: Vaakh',
        'Ch 9: Savaiye',
        'Ch 10: Kaidi aur Kokila',
        'Ch 11: Gram Shree',
        'Ch 12: Megh Aaye',
        'Ch 13: Yamraj ki Disha',
        'Ch 14: Is Jal Pralay Mein',
        'Ch 15: Mere Sang ki Auratein',
        'Ch 16: Reedh ki Haddi',
        'Ch 17: Vyakaran & Rachnatmak Lekhan'
      ]
    }
  };

  // --- App State ---
  let profiles = [];
  let currentProfileId = null;
  let activeTab = 'home';
  let activeChaptersSubject = 'Mathematics';
  let chaptersFilter = 'all';
  let activeSettingsStageSubject = 'Mathematics';
  let expandedChapters = {};

  // Setup Wizard State
  let wizardData = {
    name: '',
    classLevel: 'Class 10',
    datesheet: {},
    selectedChapters: {}
  };
  let wizardStep = 1;

  // --- Helpers ---
  function getInitials(name) {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }

  function getDefaultDatesheet() {
    const today = new Date();
    const target = new Date(today.getTime() + 60 * 24 * 60 * 60 * 1000);
    const dates = {};
    SUBJECTS.forEach((sub, idx) => {
      const d = new Date(target.getTime() + idx * 3 * 24 * 60 * 60 * 1000);
      dates[sub] = d.toISOString().split('T')[0];
    });
    return dates;
  }

  function createProfileObject(name, classLevel, datesheet, selectedChapters) {
    const id = 'prof_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
    const customStages = JSON.parse(JSON.stringify(DEFAULT_STAGES));

    const subjectsData = {};
    const classSyllabus = SYLLABUS_DATA[classLevel] || SYLLABUS_DATA['Class 10'];

    SUBJECTS.forEach(sub => {
      const rawChapters = classSyllabus[sub] || [];
      const stagesForSub = customStages[sub] || DEFAULT_STAGES[sub];
      const includedChapters = selectedChapters && selectedChapters[sub]
        ? rawChapters.filter(ch => selectedChapters[sub].includes(ch))
        : rawChapters;

      subjectsData[sub] = {
        examDate: datesheet[sub] || new Date().toISOString().split('T')[0],
        chapters: includedChapters.map(chName => ({
          name: chName,
          stageStates: stagesForSub.map(() => 0)
        }))
      };
    });

    return {
      id,
      name: name.trim() || 'Student',
      classLevel: classLevel || 'Class 10',
      customStages,
      subjects: subjectsData,
      streak: 12,
      lastActiveDate: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    };
  }

  function getActiveProfile() {
    return profiles.find(p => p.id === currentProfileId) || profiles[0] || null;
  }

  function saveProfiles() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
      if (currentProfileId) {
        localStorage.setItem(ACTIVE_PROFILE_KEY, currentProfileId);
      }
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }

  function loadProfiles() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        profiles = JSON.parse(data);
      } else {
        profiles = [];
      }
      currentProfileId = localStorage.getItem(ACTIVE_PROFILE_KEY);
      if (!profiles.some(p => p.id === currentProfileId) && profiles.length > 0) {
        currentProfileId = profiles[0].id;
      }
    } catch (e) {
      profiles = [];
      currentProfileId = null;
    }
  }

  function updateStreak(profile) {
    if (!profile) return;
    const today = new Date().toISOString().split('T')[0];
    if (profile.lastActiveDate !== today) {
      const lastDate = new Date(profile.lastActiveDate);
      const curDate = new Date(today);
      const diffDays = Math.round((curDate - lastDate) / (1000 * 3600 * 24));
      if (diffDays === 1) {
        profile.streak = (profile.streak || 0) + 1;
      } else if (diffDays > 1) {
        profile.streak = 1;
      }
      profile.lastActiveDate = today;
      saveProfiles();
    }
  }

  function showToast(msg) {
    let toast = document.getElementById('toastNotification');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toastNotification';
      toast.className = 'toast-container';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2400);
  }

  // --- Statistics Calculation ---
  function getSubjectStats(profile, subjectName) {
    const subData = profile.subjects[subjectName];
    if (!subData) return { totalStages: 0, doneStages: 0, inProgressStages: 0, pendingStages: 0, percent: 0, daysLeft: 0, pace: '0.0', status: 'On Track', chaptersCount: 0 };

    const stagesList = profile.customStages[subjectName] || DEFAULT_STAGES[subjectName];
    const totalChapters = subData.chapters.length;
    let doneStages = 0;
    let inProgressStages = 0;
    let pendingStages = 0;

    subData.chapters.forEach(ch => {
      while (ch.stageStates.length < stagesList.length) ch.stageStates.push(0);
      ch.stageStates.slice(0, stagesList.length).forEach(state => {
        if (state === 2) doneStages++;
        else if (state === 1) inProgressStages++;
        else pendingStages++;
      });
    });

    const totalStages = totalChapters * stagesList.length;
    const percent = totalStages > 0 ? Math.round((doneStages / totalStages) * 100) : 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const examDate = new Date(subData.examDate);
    examDate.setHours(0, 0, 0, 0);
    const diffTime = examDate - today;
    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let status = 'On Track';
    let pace = '0.0';

    if (daysLeft < 0) {
      status = 'Behind';
      pace = '0.0';
    } else {
      const remainingToDone = totalStages - doneStages;
      const effectiveDays = Math.max(daysLeft, 1);
      const reqPace = remainingToDone / effectiveDays;
      pace = reqPace.toFixed(1);

      if (remainingToDone === 0) {
        status = 'On Track';
      } else if (reqPace > 2.5) {
        status = 'Action Required';
      } else {
        status = 'On Track';
      }
    }

    return {
      totalStages,
      doneStages,
      inProgressStages,
      pendingStages: (totalStages - doneStages),
      percent,
      daysLeft,
      pace,
      status,
      chaptersCount: totalChapters
    };
  }

  function getOverallStats(profile) {
    let totalStages = 0;
    let doneStages = 0;
    let inProgressStages = 0;

    SUBJECTS.forEach(sub => {
      const stats = getSubjectStats(profile, sub);
      totalStages += stats.totalStages;
      doneStages += stats.doneStages;
      inProgressStages += stats.inProgressStages;
    });

    const percent = totalStages > 0 ? Math.round((doneStages / totalStages) * 100) : 0;
    return {
      totalStages,
      doneStages,
      inProgressStages,
      pendingStages: totalStages - doneStages,
      percent
    };
  }

  // --- Render Views ---
  function renderHeader(profile) {
    const avatarBadge = document.getElementById('headerAvatarBadge');
    const profilePillText = document.getElementById('profileSelectorText');
    if (profile) {
      if (avatarBadge) avatarBadge.textContent = getInitials(profile.name);
      if (profilePillText) profilePillText.textContent = `${profile.name} - ${profile.classLevel}`;
    }
  }

  function renderHomeTab(profile) {
    const container = document.getElementById('tabContent');

    let html = `
      <div class="greeting-section">
        <div>
          <h1 class="greeting-title">Hi, ${escapeHtml(profile.name)}!</h1>
          <p class="greeting-subtitle">${escapeHtml(profile.classLevel)} Exam Preparation Tracker</p>
        </div>
        <div class="streak-badge">
          <span style="font-size: 18px;">🔥</span>
          <span>${profile.streak || 12} Day Streak</span>
        </div>
      </div>

      <div class="dashboard-grid">
        <!-- Left: Subject Status Cards -->
        <div>
          <div class="subject-grid">
    `;

    SUBJECTS.forEach(sub => {
      const stats = getSubjectStats(profile, sub);
      const badgeClass = stats.status === 'On Track' ? 'on-track' : (stats.status === 'Action Required' ? 'action-required' : 'passed');
      const daysText = stats.daysLeft >= 0 ? `${stats.daysLeft} Days Left` : `Exam passed`;
      const barColor = stats.status === 'Action Required' ? '#f59e0b' : (stats.status === 'Behind' ? '#ef4444' : '#38bdf8');

      html += `
        <div class="subject-status-card" onclick="window.UMANG_APP.navigateToSubject('${escapeHtml(sub)}')">
          <div class="subject-card-header">
            <div class="subject-card-name">${escapeHtml(sub)}</div>
            <span class="status-badge ${badgeClass}">${escapeHtml(stats.status)}</span>
          </div>
          
          <div class="subject-card-percentage-row">
            <span class="subject-card-percentage">${stats.percent}%</span>
            <span class="subject-card-completed-lbl">Completed</span>
          </div>

          <div class="subject-card-mini-bar">
            <div class="subject-card-mini-bar-fill" style="width: ${stats.percent}%; background-color: ${barColor};"></div>
          </div>

          <div class="subject-card-meta">
            <span>${daysText}</span>
            <span class="subject-card-pace">Pace: ${stats.pace} stages/day</span>
          </div>
        </div>
      `;
    });

    html += `
          </div>
        </div>

        <!-- Right: Sophisticated Today's Focus Box -->
        <div>
          <div class="focus-card-box">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 20px;">
              <svg style="width: 20px; height: 20px; color: var(--accent-cyan);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              <h3 style="font-size: 18px; font-weight: 800; color: var(--text-primary);">Today's Focus</h3>
            </div>

            <div class="focus-list">
    `;

    const focusStages = getSmartFocusStages(profile, 3);
    if (focusStages.length === 0) {
      html += `
        <div style="padding: 24px 12px; text-align: center; color: var(--text-secondary); font-size: 13px;">
          🎉 All subject stages are fully completed! Great job on your preparation.
        </div>
      `;
    } else {
      focusStages.forEach(item => {
        const isProgress = item.state === 1;
        const borderLeftColor = isProgress ? '#f59e0b' : 'var(--accent-cyan)';
        const tagText = isProgress ? 'IN PROGRESS' : 'PENDING';
        const tagDot = isProgress 
          ? `<span style="width: 10px; height: 10px; border-radius: 50%; background: #f59e0b; box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.25);"></span>` 
          : `<span style="width: 10px; height: 10px; border-radius: 50%; border: 1.5px solid var(--text-muted);"></span>`;

        html += `
          <div class="focus-item" style="border-left-color: ${borderLeftColor}; cursor: pointer;" onclick="window.UMANG_APP.cycleStageState('${escapeHtml(item.subject)}', ${item.chapterIdx}, ${item.stageIdx})">
            <div class="focus-info">
              <div class="focus-subject-chap">${escapeHtml(item.subject)} • ${escapeHtml(item.chapterName.split(':')[0] || item.chapterName)}</div>
              <div class="focus-stage-name">${escapeHtml(item.stageName)}</div>
              <div style="display: flex; align-items: center; gap: 6px; margin-top: 4px;">
                ${tagDot}
                <span style="font-size: 10px; font-weight: 800; color: var(--text-secondary); letter-spacing: 0.05em;">${tagText}</span>
              </div>
            </div>
          </div>
        `;
      });
    }

    html += `
            </div>

            <button class="btn-start-study" onclick="window.UMANG_APP.startStudyingFocus()">
              Start Studying Now ⚡
            </button>
          </div>
        </div>
      </div>

      <div class="app-footer">Built by UMANG Bhaiya</div>
    `;

    container.innerHTML = html;
  }

  function getSmartFocusStages(profile, limit = 3) {
    const sortedSubjects = [...SUBJECTS].sort((a, b) => {
      const dateA = new Date(profile.subjects[a]?.examDate || '2099-01-01');
      const dateB = new Date(profile.subjects[b]?.examDate || '2099-01-01');
      return dateA - dateB;
    });

    const results = [];

    // 1. Pick in-progress stages first
    for (const sub of sortedSubjects) {
      const subData = profile.subjects[sub];
      if (!subData) continue;
      const stagesList = profile.customStages[sub] || DEFAULT_STAGES[sub];

      for (let chIdx = 0; chIdx < subData.chapters.length; chIdx++) {
        const ch = subData.chapters[chIdx];
        for (let sIdx = 0; sIdx < stagesList.length; sIdx++) {
          if (ch.stageStates[sIdx] === 1) {
            results.push({
              subject: sub,
              chapterIdx: chIdx,
              chapterName: ch.name,
              stageIdx: sIdx,
              stageName: stagesList[sIdx],
              state: 1
            });
            if (results.length >= limit) return results;
          }
        }
      }
    }

    // 2. Pick pending stages next
    for (const sub of sortedSubjects) {
      const subData = profile.subjects[sub];
      if (!subData) continue;
      const stagesList = profile.customStages[sub] || DEFAULT_STAGES[sub];

      for (let chIdx = 0; chIdx < subData.chapters.length; chIdx++) {
        const ch = subData.chapters[chIdx];
        for (let sIdx = 0; sIdx < stagesList.length; sIdx++) {
          if (ch.stageStates[sIdx] === 0) {
            if (!results.some(r => r.subject === sub && r.chapterIdx === chIdx && r.stageIdx === sIdx)) {
              results.push({
                subject: sub,
                chapterIdx: chIdx,
                chapterName: ch.name,
                stageIdx: sIdx,
                stageName: stagesList[sIdx],
                state: 0
              });
              if (results.length >= limit) return results;
            }
          }
        }
      }
    }

    return results;
  }

  function renderChaptersTab(profile) {
    const container = document.getElementById('tabContent');
    const stagesList = profile.customStages[activeChaptersSubject] || DEFAULT_STAGES[activeChaptersSubject];
    const subData = profile.subjects[activeChaptersSubject] || { chapters: [] };

    let html = `
      <div style="margin-bottom: 20px;">
        <h2 style="font-size: 24px; font-weight: 800; color: var(--text-primary);">${escapeHtml(activeChaptersSubject)} Chapters</h2>
        <div style="font-size: 13px; color: var(--text-secondary); margin-top: 4px;">Manage your chapter progress across custom preparation stages.</div>
      </div>

      <!-- Subject Pills -->
      <div class="pill-scroll-container">
    `;

    SUBJECTS.forEach(sub => {
      const activeClass = sub === activeChaptersSubject ? 'active' : '';
      html += `<button class="subject-pill ${activeClass}" onclick="window.UMANG_APP.setChaptersSubject('${escapeHtml(sub)}')">${escapeHtml(sub)}</button>`;
    });

    html += `
      </div>

      <!-- Secondary Filter Pills -->
      <div class="filter-pills">
        <button class="filter-pill ${chaptersFilter === 'all' ? 'active' : ''}" onclick="window.UMANG_APP.setChaptersFilter('all')">All Chapters</button>
        <button class="filter-pill ${chaptersFilter === 'incomplete' ? 'active' : ''}" onclick="window.UMANG_APP.setChaptersFilter('incomplete')">Incomplete</button>
        <button class="filter-pill ${chaptersFilter === 'completed' ? 'active' : ''}" onclick="window.UMANG_APP.setChaptersFilter('completed')">Completed</button>
      </div>

      <!-- Chapter Accordions List -->
      <div class="chapter-list">
    `;

    let filteredChapters = subData.chapters.map((ch, idx) => ({ ...ch, originalIndex: idx }));

    if (chaptersFilter === 'incomplete') {
      filteredChapters = filteredChapters.filter(ch => {
        const doneCount = ch.stageStates.filter(s => s === 2).length;
        return doneCount < stagesList.length;
      });
    } else if (chaptersFilter === 'completed') {
      filteredChapters = filteredChapters.filter(ch => {
        const doneCount = ch.stageStates.filter(s => s === 2).length;
        return doneCount === stagesList.length && stagesList.length > 0;
      });
    }

    if (filteredChapters.length === 0) {
      html += `
        <div class="content-card" style="text-align: center; color: var(--text-secondary); padding: 36px;">
          No chapters match the selected filter.
        </div>
      `;
    } else {
      filteredChapters.forEach(ch => {
        const idx = ch.originalIndex;
        const isExpanded = !!expandedChapters[`${activeChaptersSubject}_${idx}`];
        const doneCount = ch.stageStates.slice(0, stagesList.length).filter(s => s === 2).length;

        html += `
          <div class="chapter-accordion ${isExpanded ? 'expanded' : ''}" id="accordion_${activeChaptersSubject}_${idx}">
            <div class="chapter-header" onclick="window.UMANG_APP.toggleAccordion('${escapeHtml(activeChaptersSubject)}', ${idx})">
              <div class="chapter-title-wrapper">
                <span class="chapter-arrow">▶</span>
                <span class="chapter-title">${escapeHtml(ch.name)}</span>
              </div>
              <div class="chapter-meta">
                <span class="chapter-counter">${doneCount}/${stagesList.length}</span>
                <div class="stage-dots">
        `;

        for (let s = 0; s < stagesList.length; s++) {
          const stateVal = ch.stageStates[s] || 0;
          const dotClass = stateVal === 2 ? 'done' : (stateVal === 1 ? 'in-progress' : 'pending');
          html += `<div class="stage-dot ${dotClass}"></div>`;
        }

        html += `
                </div>
              </div>
            </div>

            <div class="chapter-body">
              <div class="stage-chips-title">Preparation Stages (${stagesList.length})</div>
              <div class="stage-chips-grid">
        `;

        stagesList.forEach((stageTitle, sIdx) => {
          const stateVal = ch.stageStates[sIdx] || 0;
          let chipClass = 'state-pending';
          let statusText = 'Pending';
          let icon = '○';

          if (stateVal === 2) {
            chipClass = 'state-done';
            statusText = 'Done';
            icon = '✓';
          } else if (stateVal === 1) {
            chipClass = 'state-progress';
            statusText = 'In Progress';
            icon = '⏳';
          }

          html += `
            <div class="stage-chip ${chipClass}" onclick="window.UMANG_APP.cycleStageState('${escapeHtml(activeChaptersSubject)}', ${idx}, ${sIdx})">
              <span>${icon} ${escapeHtml(stageTitle)}</span>
              <span class="stage-chip-status">${statusText}</span>
            </div>
          `;
        });

        html += `
              </div>
            </div>
          </div>
        `;
      });
    }

    html += `
      </div>
      <div class="app-footer">Built by UMANG Bhaiya</div>
    `;

    container.innerHTML = html;
  }

  function renderInsightsTab(profile) {
    const container = document.getElementById('tabContent');
    const overall = getOverallStats(profile);

    let html = `
      <div class="content-card">
        <div class="card-heading">Study Insights & Analytics</div>
        <div class="card-subheading">Visual analytics and comprehensive stage progress.</div>

        <div style="margin-top: 18px;">
          <div style="display: flex; justify-content: space-between; font-weight: 800; font-size: 15px; margin-bottom: 8px;">
            <span>Overall Progress (${overall.percent}%)</span>
            <span style="color: var(--accent-cyan);">${overall.doneStages} / ${overall.totalStages} Stages Done</span>
          </div>
          <div class="progress-bar-container" style="height: 14px;">
            <div class="progress-bar-fill" style="width: ${overall.percent}%;"></div>
          </div>
        </div>
      </div>

      <div class="content-card">
        <div class="card-heading">Subject Stage Breakdown</div>
        <div class="card-subheading">Stage completion across each of the 7 core CBSE subjects.</div>
        
        <div style="margin-top: 20px;">
    `;

    SUBJECTS.forEach(sub => {
      const stats = getSubjectStats(profile, sub);
      html += `
        <div class="insight-row">
          <div class="insight-header">
            <span>${escapeHtml(sub)}</span>
            <span class="insight-val">${stats.percent}% Complete (${stats.doneStages}/${stats.totalStages})</span>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width: ${stats.percent}%;"></div>
          </div>
        </div>
      `;
    });

    html += `
        </div>
      </div>
      <div class="app-footer">Built by UMANG Bhaiya</div>
    `;

    container.innerHTML = html;
  }

  function renderResourcesTab(profile) {
    const container = document.getElementById('tabContent');
    const classLevel = profile.classLevel || 'Class 10';

    let html = `
      <div class="content-card">
        <div class="card-heading">Study Resources & Notes</div>
        <div class="card-subheading">Quick access links, formulas, and cheatsheets for ${escapeHtml(classLevel)}.</div>

        <div class="resource-item" onclick="window.UMANG_APP.openResourceModal('math')">
          <div class="resource-tag">Mathematics</div>
          <div class="resource-title">NCERT Formula Cheatsheet</div>
          <div class="resource-desc">All chapter formulas in one place (Algebra, Trigonometry, Coordinate Geometry, Surface Areas & Volumes).</div>
        </div>

        <div class="resource-item" onclick="window.UMANG_APP.openResourceModal('science')">
          <div class="resource-tag">Physics & Chemistry</div>
          <div class="resource-title">Important Equations & Numericals</div>
          <div class="resource-desc">Balanced chemical equations, reactivity series, lens & mirror formulas, Ohm's law cheatsheet.</div>
        </div>

        <div class="resource-item" onclick="window.UMANG_APP.openResourceModal('sst')">
          <div class="resource-tag">Social Science</div>
          <div class="resource-title">Dates & Events Timeline</div>
          <div class="resource-desc">Nationalism in Europe & India key dates, map pointing landmarks, and constitution points.</div>
        </div>

        <div class="resource-item" onclick="window.UMANG_APP.openResourceModal('languages')">
          <div class="resource-tag">English & Hindi</div>
          <div class="resource-title">Grammar & Writing Formats</div>
          <div class="resource-desc">Formal letter formats, analytical paragraph structure, Hindi Patra/Vigyapan guidelines.</div>
        </div>
      </div>
      <div class="app-footer">Built by UMANG Bhaiya</div>
    `;

    container.innerHTML = html;
  }

  function renderSettingsTab(profile) {
    const container = document.getElementById('tabContent');
    const currentStages = profile.customStages[activeSettingsStageSubject] || DEFAULT_STAGES[activeSettingsStageSubject];

    let html = `
      <div class="content-card">
        <div class="card-heading">Settings & Profile Management</div>
        <div class="card-subheading">Edit profile details, update datesheet, and customize chapter stages.</div>

        <!-- Student Name Edit -->
        <div class="form-group">
          <label class="form-label">Student Name</label>
          <input type="text" class="form-input" id="settingsStudentNameInput" value="${escapeHtml(profile.name)}" placeholder="Enter your name" />
        </div>

        <!-- Exam Datesheet -->
        <div style="margin-top: 28px; margin-bottom: 14px;">
          <h3 style="font-size: 16px; font-weight: 800; color: var(--text-primary); margin-bottom: 4px;">Exam Datesheet</h3>
          <div style="font-size: 13px; color: var(--text-secondary); margin-bottom: 16px;">Set exam dates to calculate daily pace and priorities.</div>

          <div style="display: flex; flex-direction: column; gap: 12px;">
    `;

    SUBJECTS.forEach(sub => {
      const curDate = profile.subjects[sub]?.examDate || '';
      html += `
        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label">${escapeHtml(sub)} Exam Date</label>
          <input type="date" class="form-input settings-date-input" data-subject="${escapeHtml(sub)}" value="${curDate}" />
        </div>
      `;
    });

    html += `
          </div>
          <button class="btn-primary" style="margin-top: 18px;" onclick="window.UMANG_APP.saveSettingsDatesheet()">Save Datesheet</button>
        </div>

        <!-- Customize Chapter Stages -->
        <div style="margin-top: 32px; border-top: 1px solid var(--border-color); padding-top: 24px;">
          <h3 style="font-size: 16px; font-weight: 800; color: var(--text-primary); margin-bottom: 4px;">Customize Chapter Stages (Variable per Subject)</h3>
          <div style="font-size: 13px; color: var(--text-secondary); margin-bottom: 16px;">Select a subject and add/remove or rename its stages.</div>

          <div class="pill-scroll-container">
    `;

    SUBJECTS.forEach(sub => {
      const activeClass = sub === activeSettingsStageSubject ? 'active' : '';
      html += `<button class="subject-pill ${activeClass}" onclick="window.UMANG_APP.setSettingsStageSubject('${escapeHtml(sub)}')">${escapeHtml(sub)}</button>`;
    });

    html += `
          </div>

          <div id="settingsStageInputsList">
    `;

    currentStages.forEach((stg, sIdx) => {
      html += `
        <div class="stage-edit-row">
          <span class="stage-num-label">Stage ${sIdx + 1}</span>
          <input type="text" class="form-input stage-custom-input" value="${escapeHtml(stg)}" placeholder="Stage Name" />
          <button class="stage-delete-btn" onclick="window.UMANG_APP.deleteSettingsStage(${sIdx})" title="Delete Stage">✕</button>
        </div>
      `;
    });

    html += `
          </div>

          <button class="btn-add-stage" onclick="window.UMANG_APP.addSettingsStage()">+ Add Stage</button>
          <button class="btn-primary" onclick="window.UMANG_APP.saveSettingsStages()">Save Custom Stages</button>
        </div>

        <!-- Profiles & Data Section -->
        <div style="margin-top: 32px; border-top: 1px solid var(--border-color); padding-top: 24px;">
          <h3 style="font-size: 16px; font-weight: 800; color: var(--text-primary); margin-bottom: 4px;">Profiles & Data</h3>
          <div style="font-size: 13px; color: var(--text-secondary); margin-bottom: 16px;">Export backup JSON, restore backup, or reset data.</div>

          <div class="btn-row">
            <button class="btn-secondary" onclick="window.UMANG_APP.exportDataJSON()">Export JSON</button>
            <label class="btn-secondary" style="cursor: pointer;">
              Import JSON
              <input type="file" id="importJsonFileInput" accept=".json" style="display: none;" onchange="window.UMANG_APP.importDataJSON(event)" />
            </label>
          </div>

          <button class="btn-danger" style="margin-top: 18px;" onclick="window.UMANG_APP.confirmResetAllData()">Reset All App Data</button>
        </div>
      </div>
      <div class="app-footer">Built by UMANG Bhaiya</div>
    `;

    container.innerHTML = html;
  }

  function renderCurrentTab() {
    const profile = getActiveProfile();
    if (!profile) {
      renderSetupWizard();
      return;
    }

    updateStreak(profile);
    renderHeader(profile);

    document.querySelectorAll('.nav-item').forEach(el => {
      const tab = el.getAttribute('data-tab');
      if (tab === activeTab) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });

    if (activeTab === 'home') renderHomeTab(profile);
    else if (activeTab === 'chapters') renderChaptersTab(profile);
    else if (activeTab === 'insights') renderInsightsTab(profile);
    else if (activeTab === 'resources') renderResourcesTab(profile);
    else if (activeTab === 'settings') renderSettingsTab(profile);
  }

  // --- Setup Wizard (3 Steps) ---
  function openSetupWizard() {
    wizardStep = 1;
    wizardData = {
      name: '',
      classLevel: 'Class 10',
      datesheet: getDefaultDatesheet(),
      selectedChapters: {}
    };

    const classSyl = SYLLABUS_DATA[wizardData.classLevel];
    SUBJECTS.forEach(sub => {
      wizardData.selectedChapters[sub] = [...(classSyl[sub] || [])];
    });

    renderSetupWizard();
  }

  function renderSetupWizard() {
    const container = document.getElementById('tabContent');
    const classSyl = SYLLABUS_DATA[wizardData.classLevel] || SYLLABUS_DATA['Class 10'];

    let html = `
      <div class="content-card" style="max-width: 600px; margin: 20px auto;">
        <div style="text-align: center; margin-bottom: 24px;">
          <div class="brand-logo-s" style="margin: 0 auto 12px auto; width: 48px; height: 48px; font-size: 26px;">S</div>
          <h2 style="font-size: 24px; font-weight: 800; color: var(--text-primary);">Welcome to UMANG Bhaiya</h2>
          <div style="font-size: 13px; color: var(--text-secondary); margin-top: 4px;">Set up your CBSE study tracker in 3 quick steps</div>
        </div>

        <div class="wizard-steps-indicator">
          <div class="wizard-step-node ${wizardStep >= 1 ? (wizardStep > 1 ? 'done' : 'active') : ''}">1</div>
          <div class="wizard-step-node ${wizardStep >= 2 ? (wizardStep > 2 ? 'done' : 'active') : ''}">2</div>
          <div class="wizard-step-node ${wizardStep >= 3 ? (wizardStep > 3 ? 'done' : 'active') : ''}">3</div>
        </div>
    `;

    if (wizardStep === 1) {
      html += `
        <div style="margin-bottom: 24px;">
          <h3 style="font-size: 17px; font-weight: 800; color: var(--text-primary); margin-bottom: 6px;">Step 1: Student Profile</h3>
          <div style="font-size: 13px; color: var(--text-secondary); margin-bottom: 16px;">Enter your name and choose your grade level.</div>

          <div class="form-group">
            <label class="form-label">Student Name</label>
            <input type="text" id="wizardNameInput" class="form-input" placeholder="e.g. Aaryan" value="${escapeHtml(wizardData.name)}" />
          </div>

          <div class="form-group">
            <label class="form-label">Select Your Class</label>
            <div class="class-toggle-group">
              <button type="button" class="class-toggle-btn ${wizardData.classLevel === 'Class 9' ? 'active' : ''}" onclick="window.UMANG_APP.setWizardClass('Class 9')">Class 9</button>
              <button type="button" class="class-toggle-btn ${wizardData.classLevel === 'Class 10' ? 'active' : ''}" onclick="window.UMANG_APP.setWizardClass('Class 10')">Class 10</button>
            </div>
          </div>

          <div style="margin-top: 24px; border-top: 1px dashed var(--border-color); padding-top: 16px; text-align: center;">
            <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 8px;">Already have a backup file?</div>
            <label class="btn-secondary" style="display: inline-block; cursor: pointer; font-size: 13px; padding: 8px 18px;">
              Restore from JSON Backup
              <input type="file" accept=".json" style="display: none;" onchange="window.UMANG_APP.importDataJSON(event)" />
            </label>
          </div>
        </div>

        <button class="btn-primary" onclick="window.UMANG_APP.wizardNextStep()">Next: Exam Datesheet →</button>
      `;
    } else if (wizardStep === 2) {
      html += `
        <div style="margin-bottom: 24px;">
          <h3 style="font-size: 17px; font-weight: 800; color: var(--text-primary); margin-bottom: 6px;">Step 2: Exam Datesheet</h3>
          <div style="font-size: 13px; color: var(--text-secondary); margin-bottom: 16px;">Enter the exam date for each of the 7 subjects.</div>

          <div style="display: flex; flex-direction: column; gap: 12px; max-height: 360px; overflow-y: auto; padding-right: 4px;">
      `;

      SUBJECTS.forEach(sub => {
        const dVal = wizardData.datesheet[sub] || '';
        html += `
          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label">${escapeHtml(sub)} Exam Date</label>
            <input type="date" class="form-input wizard-date-input" data-subject="${escapeHtml(sub)}" value="${dVal}" />
          </div>
        `;
      });

      html += `
          </div>
        </div>

        <div class="btn-row">
          <button class="btn-secondary" onclick="window.UMANG_APP.wizardPrevStep()">← Back</button>
          <button class="btn-primary" style="flex: 2;" onclick="window.UMANG_APP.wizardNextStep()">Next: Syllabus Selection →</button>
        </div>
      `;
    } else if (wizardStep === 3) {
      html += `
        <div style="margin-bottom: 24px;">
          <h3 style="font-size: 17px; font-weight: 800; color: var(--text-primary); margin-bottom: 6px;">Step 3: Syllabus Selection</h3>
          <div style="font-size: 13px; color: var(--text-secondary); margin-bottom: 16px;">Uncheck any deleted or excluded chapters from your syllabus.</div>

          <div style="max-height: 380px; overflow-y: auto; padding-right: 4px;">
      `;

      SUBJECTS.forEach(sub => {
        const chapters = classSyl[sub] || [];
        const selectedForSub = wizardData.selectedChapters[sub] || [];

        html += `
          <div class="syllabus-subject-box">
            <div class="syllabus-subject-header">
              <span>${escapeHtml(sub)} (${chapters.length} Chapters)</span>
              <button type="button" class="btn-secondary" style="font-size: 11px; padding: 4px 10px;" onclick="window.UMANG_APP.toggleAllSyllabusSubject('${escapeHtml(sub)}')">Toggle All</button>
            </div>
            <div>
        `;

        chapters.forEach(ch => {
          const isChecked = selectedForSub.includes(ch);
          html += `
            <label class="syllabus-item-label">
              <input type="checkbox" data-subject="${escapeHtml(sub)}" data-chapter="${escapeHtml(ch)}" ${isChecked ? 'checked' : ''} onchange="window.UMANG_APP.onSyllabusCheckboxChange(this)" />
              <span>${escapeHtml(ch)}</span>
            </label>
          `;
        });

        html += `
            </div>
          </div>
        `;
      });

      html += `
          </div>
        </div>

        <div class="btn-row">
          <button class="btn-secondary" onclick="window.UMANG_APP.wizardPrevStep()">← Back</button>
          <button class="btn-primary" style="flex: 2;" onclick="window.UMANG_APP.finishSetupWizard()">Finish Setup & Start Tracking 🚀</button>
        </div>
      `;
    }

    html += `
      </div>
    `;

    container.innerHTML = html;
  }

  // --- Global App Actions & Event Handlers ---
  window.UMANG_APP = {
    switchTab(tab) {
      activeTab = tab;
      renderCurrentTab();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    navigateToSubject(subjectName) {
      activeChaptersSubject = subjectName;
      activeTab = 'chapters';
      renderCurrentTab();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    startStudyingFocus() {
      const profile = getActiveProfile();
      if (!profile) return;
      const focusStages = getSmartFocusStages(profile, 1);
      if (focusStages.length > 0) {
        activeChaptersSubject = focusStages[0].subject;
        expandedChapters[`${focusStages[0].subject}_${focusStages[0].chapterIdx}`] = true;
      }
      activeTab = 'chapters';
      renderCurrentTab();
      showToast('Opening priority chapters! 📖');
    },

    setChaptersSubject(subjectName) {
      activeChaptersSubject = subjectName;
      renderCurrentTab();
    },

    setChaptersFilter(filter) {
      chaptersFilter = filter;
      renderCurrentTab();
    },

    toggleAccordion(subject, idx) {
      const key = `${subject}_${idx}`;
      expandedChapters[key] = !expandedChapters[key];
      const acc = document.getElementById(`accordion_${subject}_${idx}`);
      if (acc) {
        acc.classList.toggle('expanded', expandedChapters[key]);
      }
    },

    // 3-State Stage Tracking (0 -> 1 -> 2 -> 0)
    cycleStageState(subject, chapterIdx, stageIdx) {
      const profile = getActiveProfile();
      if (!profile) return;

      const subData = profile.subjects[subject];
      if (!subData || !subData.chapters[chapterIdx]) return;

      const ch = subData.chapters[chapterIdx];
      const currentState = ch.stageStates[stageIdx] || 0;
      const nextState = (currentState + 1) % 3;
      ch.stageStates[stageIdx] = nextState;

      updateStreak(profile);
      saveProfiles();
      renderCurrentTab();
    },

    setWizardClass(classLevel) {
      wizardData.classLevel = classLevel;
      const classSyl = SYLLABUS_DATA[classLevel] || SYLLABUS_DATA['Class 10'];
      wizardData.selectedChapters = {};
      SUBJECTS.forEach(sub => {
        wizardData.selectedChapters[sub] = [...(classSyl[sub] || [])];
      });
      renderSetupWizard();
    },

    wizardNextStep() {
      if (wizardStep === 1) {
        const nameInput = document.getElementById('wizardNameInput');
        wizardData.name = nameInput ? nameInput.value.trim() : '';
        if (!wizardData.name) {
          showToast('Please enter the student name.');
          return;
        }
        wizardStep = 2;
        renderSetupWizard();
      } else if (wizardStep === 2) {
        document.querySelectorAll('.wizard-date-input').forEach(input => {
          const sub = input.getAttribute('data-subject');
          wizardData.datesheet[sub] = input.value || new Date().toISOString().split('T')[0];
        });
        wizardStep = 3;
        renderSetupWizard();
      }
    },

    wizardPrevStep() {
      if (wizardStep > 1) {
        wizardStep--;
        renderSetupWizard();
      }
    },

    onSyllabusCheckboxChange(checkbox) {
      const sub = checkbox.getAttribute('data-subject');
      const ch = checkbox.getAttribute('data-chapter');
      if (!wizardData.selectedChapters[sub]) wizardData.selectedChapters[sub] = [];

      if (checkbox.checked) {
        if (!wizardData.selectedChapters[sub].includes(ch)) {
          wizardData.selectedChapters[sub].push(ch);
        }
      } else {
        wizardData.selectedChapters[sub] = wizardData.selectedChapters[sub].filter(c => c !== ch);
      }
    },

    toggleAllSyllabusSubject(subject) {
      const classSyl = SYLLABUS_DATA[wizardData.classLevel] || SYLLABUS_DATA['Class 10'];
      const allChapters = classSyl[subject] || [];
      const currentSelected = wizardData.selectedChapters[subject] || [];

      if (currentSelected.length === allChapters.length) {
        wizardData.selectedChapters[subject] = [];
      } else {
        wizardData.selectedChapters[subject] = [...allChapters];
      }
      renderSetupWizard();
    },

    finishSetupWizard() {
      const newProfile = createProfileObject(
        wizardData.name || 'Student',
        wizardData.classLevel,
        wizardData.datesheet,
        wizardData.selectedChapters
      );

      profiles.push(newProfile);
      currentProfileId = newProfile.id;
      saveProfiles();
      activeTab = 'home';
      showToast('Profile created successfully! 🎉');
      renderCurrentTab();
    },

    toggleProfileDropdown() {
      const menu = document.getElementById('profileDropdownMenu');
      if (!menu) return;
      menu.classList.toggle('show');

      if (menu.classList.contains('show')) {
        let html = '';
        profiles.forEach(p => {
          const isActive = p.id === currentProfileId;
          html += `
            <div class="dropdown-item ${isActive ? 'active' : ''}" onclick="window.UMANG_APP.switchProfile('${p.id}')">
              <span>${escapeHtml(p.name)} (${p.classLevel})</span>
              ${isActive ? '<span>✓</span>' : ''}
            </div>
          `;
        });
        html += `
          <div class="dropdown-divider"></div>
          <div class="dropdown-item" style="color: var(--accent-cyan);" onclick="window.UMANG_APP.addNewProfile()">
            <span>+ Add New Profile</span>
          </div>
        `;
        menu.innerHTML = html;
      }
    },

    switchProfile(id) {
      currentProfileId = id;
      saveProfiles();
      const menu = document.getElementById('profileDropdownMenu');
      if (menu) menu.classList.remove('show');
      showToast('Switched profile');
      renderCurrentTab();
    },

    addNewProfile() {
      const menu = document.getElementById('profileDropdownMenu');
      if (menu) menu.classList.remove('show');
      openSetupWizard();
    },

    setSettingsStageSubject(sub) {
      activeSettingsStageSubject = sub;
      renderCurrentTab();
    },

    addSettingsStage() {
      const profile = getActiveProfile();
      if (!profile) return;
      if (!profile.customStages[activeSettingsStageSubject]) {
        profile.customStages[activeSettingsStageSubject] = [...DEFAULT_STAGES[activeSettingsStageSubject]];
      }
      profile.customStages[activeSettingsStageSubject].push('New Stage');
      renderCurrentTab();
    },

    deleteSettingsStage(sIdx) {
      const profile = getActiveProfile();
      if (!profile) return;
      const stages = profile.customStages[activeSettingsStageSubject] || DEFAULT_STAGES[activeSettingsStageSubject];
      if (stages.length <= 1) {
        showToast('Minimum 1 stage required.');
        return;
      }
      stages.splice(sIdx, 1);
      profile.customStages[activeSettingsStageSubject] = stages;
      renderCurrentTab();
    },

    saveSettingsStages() {
      const profile = getActiveProfile();
      if (!profile) return;

      const inputs = document.querySelectorAll('.stage-custom-input');
      const newStages = [];
      inputs.forEach(input => {
        const val = input.value.trim();
        if (val) newStages.push(val);
      });

      if (newStages.length === 0) {
        showToast('At least one stage name is required.');
        return;
      }

      profile.customStages[activeSettingsStageSubject] = newStages;
      saveProfiles();
      showToast('Stages saved for ' + activeSettingsStageSubject + '! ✓');
      renderCurrentTab();
    },

    saveSettingsDatesheet() {
      const profile = getActiveProfile();
      if (!profile) return;

      const nameInput = document.getElementById('settingsStudentNameInput');
      if (nameInput && nameInput.value.trim()) {
        profile.name = nameInput.value.trim();
      }

      document.querySelectorAll('.settings-date-input').forEach(input => {
        const sub = input.getAttribute('data-subject');
        if (profile.subjects[sub]) {
          profile.subjects[sub].examDate = input.value;
        }
      });

      saveProfiles();
      showToast('Datesheet & Settings saved! ✓');
      renderCurrentTab();
    },

    exportDataJSON() {
      const exportObj = {
        umang_profiles: profiles,
        currentProfileId: currentProfileId,
        exportedAt: new Date().toISOString(),
        version: '1.0'
      };
      const blob = new Blob([JSON.stringify(exportObj, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `umang_cbse_study_tracker_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Backup JSON exported! 📁');
    },

    importDataJSON(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function (e) {
        try {
          const parsed = JSON.parse(e.target.result);
          if (Array.isArray(parsed.umang_profiles) && parsed.umang_profiles.length > 0) {
            profiles = parsed.umang_profiles;
            currentProfileId = parsed.currentProfileId || profiles[0].id;
            saveProfiles();
            activeTab = 'home';
            showToast('Backup restored successfully! 🎉');
            renderCurrentTab();
          } else if (Array.isArray(parsed) && parsed.length > 0) {
            profiles = parsed;
            currentProfileId = profiles[0].id;
            saveProfiles();
            activeTab = 'home';
            showToast('Backup restored successfully! 🎉');
            renderCurrentTab();
          } else {
            showToast('Invalid backup file format.');
          }
        } catch (err) {
          showToast('Error reading JSON file.');
          console.error(err);
        }
      };
      reader.readAsText(file);
    },

    confirmResetAllData() {
      const modal = document.getElementById('modalContainer');
      modal.innerHTML = `
        <div class="modal-overlay" onclick="window.UMANG_APP.closeModal(event)">
          <div class="modal-content" onclick="event.stopPropagation()">
            <h3 style="font-size: 18px; font-weight: 700; color: #ef4444; margin-bottom: 8px;">Reset All App Data?</h3>
            <p style="font-size: 14px; color: var(--text-secondary); margin-bottom: 20px;">
              This will permanently delete all student profiles, custom stages, and stage progress from this device. Are you sure you want to proceed?
            </p>
            <div class="btn-row">
              <button class="btn-secondary" onclick="window.UMANG_APP.closeModal()">Cancel</button>
              <button class="btn-danger" style="flex: 1;" onclick="window.UMANG_APP.executeResetAllData()">Yes, Delete Everything</button>
            </div>
          </div>
        </div>
      `;
    },

    executeResetAllData() {
      profiles = [];
      currentProfileId = null;
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(ACTIVE_PROFILE_KEY);
      this.closeModal();
      showToast('All app data has been reset.');
      openSetupWizard();
    },

    openResourceModal(type) {
      const modal = document.getElementById('modalContainer');
      let title = 'Resource';
      let content = '';

      if (type === 'math') {
        title = 'NCERT Mathematics Formula Cheatsheet';
        content = `
          <div style="font-size: 13px; line-height: 1.6; color: var(--text-primary);">
            <div style="margin-bottom: 14px;">
              <strong style="color: var(--accent-cyan);">1. Real Numbers:</strong><br/>
              • Fundamental Theorem of Arithmetic: Every composite number = product of primes uniquely.<br/>
              • HCF(a, b) × LCM(a, b) = a × b.
            </div>
            <div style="margin-bottom: 14px;">
              <strong style="color: var(--accent-cyan);">2. Polynomials & Quadratic Equations:</strong><br/>
              • Quadratic Form: ax² + bx + c = 0.<br/>
              • Sum of zeroes (α + β) = -b/a, Product (αβ) = c/a.<br/>
              • Discriminant D = b² - 4ac. Real & distinct if D > 0; equal if D = 0; no real roots if D < 0.
            </div>
            <div style="margin-bottom: 14px;">
              <strong style="color: var(--accent-cyan);">3. Arithmetic Progressions (AP):</strong><br/>
              • n-th term: aₙ = a + (n - 1)d.<br/>
              • Sum of n terms: Sₙ = (n/2)[2a + (n - 1)d] = (n/2)[a + l].
            </div>
            <div style="margin-bottom: 14px;">
              <strong style="color: var(--accent-cyan);">4. Coordinate Geometry & Trigonometry:</strong><br/>
              • Distance: √[(x₂ - x₁)² + (y₂ - y₁)²].<br/>
              • Section: ((m₁x₂ + m₂x₁)/(m₁ + m₂), (m₁y₂ + m₂y₁)/(m₁ + m₂)).<br/>
              • sin²θ + cos²θ = 1 | 1 + tan²θ = sec²θ | 1 + cot²θ = cosec²θ.
            </div>
            <div style="margin-bottom: 14px;">
              <strong style="color: var(--accent-cyan);">5. Surface Areas & Volumes:</strong><br/>
              • Sphere Volume = (4/3)πr³, Surface Area = 4πr².<br/>
              • Cylinder Volume = πr²h, Curved Surface Area = 2πrh.
            </div>
          </div>
        `;
      } else if (type === 'science') {
        title = 'Physics & Chemistry Key Formulations';
        content = `
          <div style="font-size: 13px; line-height: 1.6; color: var(--text-primary);">
            <div style="margin-bottom: 14px;">
              <strong style="color: var(--accent-cyan);">Physics - Optics & Electricity:</strong><br/>
              • Mirror Formula: 1/f = 1/v + 1/u | Magnification: m = -v/u = h'/h.<br/>
              • Lens Formula: 1/f = 1/v - 1/u | Magnification: m = v/u.<br/>
              • Power of Lens: P = 1/f (in meters), unit: Dioptre (D).<br/>
              • Ohm's Law: V = IR | Resistance in series: Rₛ = R₁ + R₂ | Parallel: 1/Rₚ = 1/R₁ + 1/R₂.<br/>
              • Joule's Heating: H = I²Rt | Power: P = VI = I²R = V²/R.
            </div>
            <div style="margin-bottom: 14px;">
              <strong style="color: var(--accent-cyan);">Chemistry - Reactions & Reactivity:</strong><br/>
              • Reactivity Series: K > Na > Ca > Mg > Al > Zn > Fe > Pb > [H] > Cu > Hg > Ag > Au.<br/>
              • Plaster of Paris: CaSO₄·½H₂O + 1½H₂O → CaSO₄·2H₂O (Gypsum).<br/>
              • Saponification: Ester + NaOH → Soap (Sodium salt of fatty acid) + Alcohol.
            </div>
          </div>
        `;
      } else if (type === 'sst') {
        title = 'Social Science Key Timeline & Maps';
        content = `
          <div style="font-size: 13px; line-height: 1.6; color: var(--text-primary);">
            <div style="margin-bottom: 14px;">
              <strong style="color: var(--accent-cyan);">History Milestones:</strong><br/>
              • 1789: French Revolution breaks out.<br/>
              • 1915: Mahatma Gandhi returns to India.<br/>
              • 1919: Rowlatt Act & Jallianwala Bagh Massacre (13 April).<br/>
              • 1920-1922: Non-Cooperation Movement (Chauri Chaura incident).<br/>
              • 1930: Dandi March & Civil Disobedience Movement.<br/>
              • 1942: Quit India Movement.
            </div>
            <div style="margin-bottom: 14px;">
              <strong style="color: var(--accent-cyan);">Geography Map Highlights:</strong><br/>
              • Major Dams: Salal, Bhakra Nangal, Tehri, Rana Pratap Sagar, Sardar Sarovar, Hirakud.<br/>
              • Iron Ore Mines: Mayurbhanj, Durg, Bailadila, Bellary, Kudremukh.
            </div>
          </div>
        `;
      } else {
        title = 'Language Writing Skills & Formats';
        content = `
          <div style="font-size: 13px; line-height: 1.6; color: var(--text-primary);">
            <div style="margin-bottom: 14px;">
              <strong style="color: var(--accent-cyan);">English Formal Letter Structure:</strong><br/>
              1. Sender's Address<br/>
              2. Date (e.g. 15 March 2026)<br/>
              3. Receiver's Designation & Address<br/>
              4. Subject (Crisp & underlined)<br/>
              5. Salutation (Sir/Madam)<br/>
              6. Body (Introduction, Details, Conclusion/Request)<br/>
              7. Subscription (Yours sincerely/faithfully) & Name.
            </div>
            <div style="margin-bottom: 14px;">
              <strong style="color: var(--accent-cyan);">Analytical Paragraph:</strong><br/>
              • Para 1: Introduction paraphrasing the given chart/graph.<br/>
              • Para 2: Detailed comparisons, highs/lows, trends.<br/>
              • Para 3: Concluding sentence summarizing the major takeaway.
            </div>
          </div>
        `;
      }

      modal.innerHTML = `
        <div class="modal-overlay" onclick="window.UMANG_APP.closeModal(event)">
          <div class="modal-content" onclick="event.stopPropagation()">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <h3 style="font-size: 17px; font-weight: 700; color: var(--text-primary);">${escapeHtml(title)}</h3>
              <button class="stage-delete-btn" style="background: none; border: none; color: var(--text-muted); font-size: 20px;" onclick="window.UMANG_APP.closeModal()">✕</button>
            </div>
            ${content}
            <button class="btn-secondary" style="width: 100%; margin-top: 20px;" onclick="window.UMANG_APP.closeModal()">Close</button>
          </div>
        </div>
      `;
    },

    closeModal(e) {
      if (e && e.target && !e.target.classList.contains('modal-overlay')) return;
      const modal = document.getElementById('modalContainer');
      if (modal) modal.innerHTML = '';
    },

    toggleTheme() {
      const isLight = document.body.classList.toggle('light-theme');
      const themeBtn = document.getElementById('themeToggleBtn');
      if (isLight) {
        if (themeBtn) themeBtn.innerHTML = '🌙 Dark';
        localStorage.setItem(THEME_KEY, 'light');
      } else {
        if (themeBtn) themeBtn.innerHTML = '☀️ Light';
        localStorage.setItem(THEME_KEY, 'dark');
      }
    }
  };

  function escapeHtml(str) {
    if (typeof str !== 'string') return String(str || '');
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function initApp() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const themeBtn = document.getElementById('themeToggleBtn');
    if (savedTheme === 'light') {
      document.body.classList.add('light-theme');
      if (themeBtn) themeBtn.innerHTML = '🌙 Dark';
    } else {
      document.body.classList.remove('light-theme');
      if (themeBtn) themeBtn.innerHTML = '☀️ Light';
    }

    document.addEventListener('click', (e) => {
      const selector = document.getElementById('profileSelectorWrapper');
      const menu = document.getElementById('profileDropdownMenu');
      if (menu && selector && !selector.contains(e.target)) {
        menu.classList.remove('show');
      }
    });

    loadProfiles();

    if (profiles.length === 0) {
      // Seed default initial profile for instant preview if empty
      const defaultProf = createProfileObject('Aaryan', 'Class 10', getDefaultDatesheet(), null);
      defaultProf.streak = 12;
      // Mark a couple of stages for instant lively dashboard
      if (defaultProf.subjects['Mathematics'] && defaultProf.subjects['Mathematics'].chapters[0]) {
        defaultProf.subjects['Mathematics'].chapters[0].stageStates = [2, 2, 2, 2, 2];
      }
      if (defaultProf.subjects['Physics'] && defaultProf.subjects['Physics'].chapters[0]) {
        defaultProf.subjects['Physics'].chapters[0].stageStates = [2, 1, 0, 0];
      }
      if (defaultProf.subjects['Chemistry'] && defaultProf.subjects['Chemistry'].chapters[0]) {
        defaultProf.subjects['Chemistry'].chapters[0].stageStates = [2, 2, 2, 0];
      }
      profiles = [defaultProf];
      currentProfileId = defaultProf.id;
      saveProfiles();
      renderCurrentTab();
    } else {
      renderCurrentTab();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
