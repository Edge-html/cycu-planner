import { initializeApp } from "firebase/app";
import { initializeFirestore, doc, setDoc, deleteDoc, collection, onSnapshot } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBG1wcxGu6blff0neiewvqWraKQzOssJdU",
  authDomain: "cycu-trip-planner.firebaseapp.com",
  projectId: "cycu-trip-planner",
  storageBucket: "cycu-trip-planner.firebasestorage.app",
  messagingSenderId: "173000508891",
  appId: "1:173000508891:web:d2d43ec89231fa678693fe",
  measurementId: "G-5E57MRWB25"
};

// Initialize Firebase & Firestore with adblocker-friendly long polling
const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true
});

document.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEY = 'cycu-trip-plans-v3';

  const DEFAULT_PLANS = {
    "2026-07-31": [
      {
        id: 1001,
        location: "Re Cheng Hall (CYCU Dormitory)",
        desc: "Dormitory Check-in (12:00-16:00) & Meet & Greet (18:00). Please gather in front of the dormitory gate.",
        time: "12:00",
        author: "Camp Coordinator",
        address: "Chung Yuan Christian University, Zhongli District, Taoyuan City",
        lat: 24.9576,
        lng: 121.2407,
        createdAt: 1720000000000
      }
    ],
    "2026-08-03": [
      {
        id: 1005,
        location: "CYCU EE Building (EE105)",
        desc: "10:20 Opening Ceremony. 12:00 Welcome Lunch. 14:00 Introduction to Taiwan. 16:00 Lab Check-in.",
        time: "10:20",
        author: "Camp Coordinator",
        address: "CYCU Electrical Engineering Building, Zhongli District, Taoyuan City",
        lat: 24.9582,
        lng: 121.2415,
        createdAt: 1720000000004
      }
    ],
    "2026-08-04": [
      {
        id: 1006,
        location: "CYCU EE Building (EE105)",
        desc: "09:30 Lecture (Speakers A & B). 14:00 Lecture (Speakers C & D).",
        time: "09:30",
        author: "Camp Coordinator",
        address: "CYCU Electrical Engineering Building, Zhongli District, Taoyuan City",
        lat: 24.9582,
        lng: 121.2415,
        createdAt: 1720000000005
      }
    ],
    "2026-08-05": [
      {
        id: 1007,
        location: "Field Trip Day 1",
        desc: "All-day off-campus cultural/scientific field trip. Meet at the dormitory gate in the morning.",
        time: "09:00",
        author: "Camp Coordinator",
        address: "Taoyuan, Taiwan",
        lat: 24.9600,
        lng: 121.2300,
        createdAt: 1720000000006
      }
    ],
    "2026-08-06": [
      {
        id: 1008,
        location: "CYCU Campus",
        desc: "09:10-12:00 Mandarin Course. 14:00-17:00 Project Collaboration.",
        time: "09:10",
        author: "Camp Coordinator",
        address: "Chung Yuan Christian University, Zhongli District, Taoyuan City",
        lat: 24.9576,
        lng: 121.2407,
        createdAt: 1720000000007
      }
    ],
    "2026-08-07": [
      {
        id: 1009,
        location: "CYCU Lab / Project Room",
        desc: "09:10-17:00 Dedicated Project Work Day.",
        time: "09:10",
        author: "Camp Coordinator",
        address: "Chung Yuan Christian University, Zhongli District, Taoyuan City",
        lat: 24.9576,
        lng: 121.2407,
        createdAt: 1720000000008
      }
    ],
    "2026-08-10": [
      {
        id: 1012,
        location: "CYCU EE Building (EE105)",
        desc: "09:30 Lecture (Speakers E & F). 14:00-17:00 Dedicated project work.",
        time: "09:30",
        author: "Camp Coordinator",
        address: "CYCU Electrical Engineering Building, Zhongli District, Taoyuan City",
        lat: 24.9582,
        lng: 121.2415,
        createdAt: 1720000000011
      }
    ],
    "2026-08-11": [
      {
        id: 1013,
        location: "CYCU Lab / Project Room",
        desc: "09:10-17:00 Dedicated Project Work Day.",
        time: "09:10",
        author: "Camp Coordinator",
        address: "Chung Yuan Christian University, Zhongli District, Taoyuan City",
        lat: 24.9576,
        lng: 121.2407,
        createdAt: 1720000000012
      }
    ],
    "2026-08-12": [
      {
        id: 1014,
        location: "Field Trip Day 2",
        desc: "Second all-day field trip. Details to be announced.",
        time: "09:00",
        author: "Camp Coordinator",
        address: "Taoyuan, Taiwan",
        lat: 24.9600,
        lng: 121.2300,
        createdAt: 1720000000013
      }
    ],
    "2026-08-13": [
      {
        id: 1015,
        location: "CYCU Lab / Project Room",
        desc: "09:10-17:00 Dedicated Project Work Day.",
        time: "09:10",
        author: "Camp Coordinator",
        address: "Chung Yuan Christian University, Zhongli District, Taoyuan City",
        lat: 24.9576,
        lng: 121.2407,
        createdAt: 1720000000014
      }
    ],
    "2026-08-14": [
      {
        id: 1016,
        location: "CYCU Lab / Project Room",
        desc: "09:10-17:00 Dedicated Project Work Day.",
        time: "09:10",
        author: "Camp Coordinator",
        address: "Chung Yuan Christian University, Zhongli District, Taoyuan City",
        lat: 24.9576,
        lng: 121.2407,
        createdAt: 1720000000015
      }
    ],
    "2026-08-17": [
      {
        id: 1019,
        location: "CYCU Lab / Project Room",
        desc: "09:10-17:00 Dedicated Project Work Day.",
        time: "09:10",
        author: "Camp Coordinator",
        address: "Chung Yuan Christian University, Zhongli District, Taoyuan City",
        lat: 24.9576,
        lng: 121.2407,
        createdAt: 1720000000018
      }
    ],
    "2026-08-18": [
      {
        id: 1020,
        location: "CYCU Lab / Project Room",
        desc: "09:10-17:00 Project wrapping up and testing.",
        time: "09:10",
        author: "Camp Coordinator",
        address: "Chung Yuan Christian University, Zhongli District, Taoyuan City",
        lat: 24.9576,
        lng: 121.2407,
        createdAt: 1720000000019
      }
    ],
    "2026-08-19": [
      {
        id: 1021,
        location: "CYCU Hall / Banquet Room",
        desc: "09:30-12:00 Closing & Project Presentation. 14:00-16:00 Free time. 17:00-19:30 Award Ceremony, Closing Ceremony & Banquet.",
        time: "09:30",
        author: "Camp Coordinator",
        address: "Chung Yuan Christian University, Zhongli District, Taoyuan City",
        lat: 24.9576,
        lng: 121.2407,
        createdAt: 1720000000020
      }
    ],
    "2026-08-20": [
      {
        id: 1022,
        location: "Dormitory Check-out & Drop-off",
        desc: "09:30-12:00 Dormitory Check-out. 12:00-14:00 Drop-off service.",
        time: "09:30",
        author: "Camp Coordinator",
        address: "Chung Yuan Christian University, Zhongli District, Taoyuan City",
        lat: 24.9576,
        lng: 121.2407,
        createdAt: 1720000000021
      }
    ]
  };

  // State
  let plans = {};
  let currentMonth = 7; // August (0-indexed)
  let currentYear = 2026;
  let editingDate = null;
  let editingPlanId = null;

  // Map
  let map = null;
  let markers = [];
  let isInitialLoad = true;

  // DOM refs
  const calendarGrid = document.getElementById('calendar-grid');
  const calMonthTitle = document.getElementById('cal-month-year');
  const prevBtn = document.getElementById('prev-month');
  const nextBtn = document.getElementById('next-month');
  const modal = document.getElementById('plan-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDate = document.getElementById('modal-date');
  const modalClose = document.getElementById('modal-close');
  const modalScheduleView = document.getElementById('modal-schedule-view');
  const modalFormView = document.getElementById('modal-form-view');
  const scheduleTitle = document.getElementById('schedule-title');
  const scheduleDate = document.getElementById('schedule-date');
  const scheduleTimeline = document.getElementById('schedule-timeline');
  const btnAddPlanTrigger = document.getElementById('btn-add-plan-trigger');
  const btnBackToSchedule = document.getElementById('btn-back-to-schedule');
  const planForm = document.getElementById('plan-form');
  const planLocation = document.getElementById('plan-location');
  const planCategory = document.getElementById('plan-category');
  const planDesc = document.getElementById('plan-desc');
  const planTime = document.getElementById('plan-time');
  const planAuthor = document.getElementById('plan-author');
  const planAddress = document.getElementById('plan-address');
  const btnGeocode = document.getElementById('btn-geocode');
  const geocodeStatus = document.getElementById('geocode-status');
  const planLat = document.getElementById('plan-lat');
  const planLng = document.getElementById('plan-lng');
  const btnSavePlan = document.getElementById('btn-save-plan');
  const btnDeletePlan = document.getElementById('btn-delete-plan');
  const mapCount = document.getElementById('map-count');
  const pinCoords = document.getElementById('pin-coords');
  // Pin map modal
  const pinMapModal = document.getElementById('pin-map-modal');
  const pinMapContainer = document.getElementById('pin-map-container');
  const btnClosePinMap = document.getElementById('btn-close-pin-map');
  const btnCancelPinMap = document.getElementById('btn-cancel-pin-map');
  const btnConfirmPinMap = document.getElementById('btn-confirm-pin-map');
  const pinMapCoords = document.getElementById('pin-map-coords');

  const btnPinMapLocation = document.getElementById('btn-pin-map-location');
  const pinStatus = document.getElementById('pin-status');
  let tempMarker = null;
  let pinMap = null;
  let pinMapMarker = null;
  let pendingLat = null;
  let pendingLng = null;
  const itineraryBody = document.getElementById('itinerary-body');
  const itineraryCount = document.getElementById('itinerary-count');
  const itineraryEmpty = document.getElementById('itinerary-empty');
  const btnExport = document.getElementById('btn-export');

  // Helpers
  function to12h(time24) {
    if (!time24) return '--:--';
    const [h, m] = time24.split(':').map(Number);
    if (isNaN(h) || isNaN(m)) return time24;
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${String(m).padStart(2, '0')}${ampm}`;
  }

  function startRealtimeSync() {
    console.log("Starting Firestore real-time listener...");
    const plansCol = collection(db, "plans");
    onSnapshot(plansCol, (snapshot) => {
      console.log("Firestore snapshot received! Document count:", snapshot.size);
      if (snapshot.empty) {
        console.log("Firestore collection 'plans' is empty. Seeding DEFAULT_PLANS...");
        Object.keys(DEFAULT_PLANS).forEach(async (dateKey) => {
          try {
            await setDoc(doc(db, "plans", dateKey), { items: DEFAULT_PLANS[dateKey] });
            console.log("Successfully seeded document for date:", dateKey);
          } catch (e) {
            console.error("Error seeding document for date " + dateKey + ":", e);
          }
        });
        plans = DEFAULT_PLANS;
      } else {
        const newPlans = {};
        snapshot.forEach((doc) => {
          newPlans[doc.id] = doc.data().items || [];
        });
        console.log("Parsed plans from Firestore:", newPlans);
        plans = newPlans;
      }
      renderCalendar();
      renderItinerary();
      updateMapMarkers();
      
      // If modal schedule view is currently open, refresh it dynamically
      if (currentModalDate && !modalScheduleView.classList.contains('hidden')) {
        console.log("Refreshing open modal schedule view for:", currentModalDate);
        showScheduleView(currentModalDate);
      }
    }, (error) => {
      console.error("Firestore snapshot listener failed with error:", error);
    });
  }

  function savePlansLocal() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
    } catch (e) {
      console.error('Error writing to local storage:', e);
    }
  }

  function formatDateKey(year, month, day) {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }

  function formatDateDisplay(year, month, day) {
    const d = new Date(year, month, day);
    return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  }

  function getMonthName(month) {
    return new Date(currentYear, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

  function getPlansForDate(dateKey) {
    return plans[dateKey] || [];
  }

  function todayKey() {
    const d = new Date();
    return formatDateKey(d.getFullYear(), d.getMonth(), d.getDate());
  }

  // Calendar rendering
  function renderCalendar() {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInPrev = new Date(currentYear, currentMonth, 0).getDate();

    calMonthTitle.textContent = getMonthName(currentMonth);

    calendarGrid.innerHTML = '';

    // Day headers
    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayHeaders.forEach(h => {
      const div = document.createElement('div');
      div.className = 'cal-day-header';
      div.textContent = h;
      calendarGrid.appendChild(div);
    });

    // Helper to create and append day cells
    function createDayCell(dateKey, dayNum, isToday, isOtherMonth) {
      const div = document.createElement('div');
      div.className = 'cal-day' + (isOtherMonth ? ' other-month' : '') + (isToday ? ' today' : '');
      div.dataset.date = dateKey;

      const cellHeader = document.createElement('div');
      cellHeader.className = 'cal-day-cell-header';

      const numSpan = document.createElement('span');
      numSpan.className = 'day-num';
      numSpan.textContent = dayNum;
      cellHeader.appendChild(numSpan);

      const addIndicator = document.createElement('span');
      addIndicator.className = 'add-indicator';
      addIndicator.innerHTML = '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>';
      cellHeader.appendChild(addIndicator);

      div.appendChild(cellHeader);

      const dayPlans = [...getPlansForDate(dateKey)];
      if (dayPlans && dayPlans.length > 0) {
        // Sort plans by time
        dayPlans.sort((a, b) => {
          if (!a.time) return 1;
          if (!b.time) return -1;
          return a.time.localeCompare(b.time);
        });

        const eventsContainer = document.createElement('div');
        eventsContainer.className = 'day-events';

        dayPlans.forEach(plan => {
          const badge = document.createElement('div');
          const badgeClass = plan.author === 'Camp Coordinator' ? 'event-badge coordinator' : (plan.author === 'Ian' ? 'event-badge exploration' : 'event-badge other');
          badge.className = badgeClass;
          
          const timePrefix = plan.time ? `${to12h(plan.time)} ` : '';
          badge.textContent = `${timePrefix}${plan.location}`;
          badge.title = `${timePrefix}${plan.location} (${plan.author})`;
          
          badge.addEventListener('click', (e) => {
            e.stopPropagation();
            openPlanModal(dateKey, plan.id);
          });

          eventsContainer.appendChild(badge);
        });

        div.appendChild(eventsContainer);
      }

      div.addEventListener('click', () => openPlanModal(dateKey));
      calendarGrid.appendChild(div);
    }

    // Previous month tail
    for (let i = firstDay - 1; i >= 0; i--) {
      const prevM = currentMonth === 0 ? 11 : currentMonth - 1;
      const prevY = currentMonth === 0 ? currentYear - 1 : currentYear;
      const prevD = daysInPrev - i;
      const dateKey = formatDateKey(prevY, prevM, prevD);
      createDayCell(dateKey, prevD, false, true);
    }

    // Current month
    for (let d = 1; d <= daysInMonth; d++) {
      const dateKey = formatDateKey(currentYear, currentMonth, d);
      const isToday = dateKey === todayKey();
      createDayCell(dateKey, d, isToday, false);
    }

    // Next month start
    const totalCells = firstDay + daysInMonth;
    const remaining = (7 - (totalCells % 7)) % 7;
    for (let i = 1; i <= remaining; i++) {
      const nextM = currentMonth === 11 ? 0 : currentMonth + 1;
      const nextY = currentMonth === 11 ? currentYear + 1 : currentYear;
      const dateKey = formatDateKey(nextY, nextM, i);
      createDayCell(dateKey, i, false, true);
    }
  }

  // Modal Navigation / Display
  let currentModalDate = null;

  function openPlanModal(dateKey, planId = null) {
    currentModalDate = dateKey;
    modal.classList.remove('hidden');

    if (planId) {
      showFormView(planId);
    } else {
      showScheduleView(dateKey);
    }
  }

  function showScheduleView(dateKey) {
    modalScheduleView.classList.remove('hidden');
    modalFormView.classList.add('hidden');

    const parts = dateKey.split('-');
    scheduleDate.textContent = formatDateDisplay(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));

    const datePlans = [...getPlansForDate(dateKey)];
    scheduleTimeline.innerHTML = '';

    if (datePlans.length === 0) {
      scheduleTimeline.innerHTML = `
        <div class="no-schedule">
          No activities scheduled for this day.
        </div>
      `;
    } else {
      // Sort plans chronologically by time
      datePlans.sort((a, b) => {
        if (!a.time) return 1;
        if (!b.time) return -1;
        return a.time.localeCompare(b.time);
      });

      datePlans.forEach(plan => {
        const item = document.createElement('div');
        item.className = 'schedule-item';

        const timeDisplay = to12h(plan.time);
        
        item.innerHTML = `
          <div class="schedule-time">${timeDisplay}</div>
          <div class="schedule-details">
            <div class="schedule-location">${plan.location}<span class="category-badge ${plan.category || 'sightseeing'}">${plan.category || 'sightseeing'}</span></div>
            ${plan.desc ? `<div class="schedule-desc">${plan.desc}</div>` : ''}
            <div class="schedule-meta">Suggested by ${plan.author}${plan.lat ? ' &middot; Mapped' : ''}</div>
          </div>
          <div class="schedule-actions">
            <button type="button" class="btn-icon edit-btn" title="Edit Plan">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
            </button>
            <button type="button" class="btn-icon delete-btn" title="Delete Plan">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            </button>
          </div>
        `;

        // Action events
        item.querySelector('.edit-btn').addEventListener('click', () => {
          showFormView(plan.id);
        });

        item.querySelector('.delete-btn').addEventListener('click', () => {
          if (confirm(`Are you sure you want to delete "${plan.location}"?`)) {
            deletePlanById(plan.id);
          }
        });

        scheduleTimeline.appendChild(item);
      });
    }
  }

  function showFormView(planId = null) {
    modalScheduleView.classList.add('hidden');
    modalFormView.classList.remove('hidden');

    editingDate = currentModalDate;
    editingPlanId = planId;

    const parts = currentModalDate.split('-');
    modalDate.textContent = formatDateDisplay(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));

    const datePlans = getPlansForDate(currentModalDate);

    clearPin();

    if (planId) {
      const plan = datePlans.find(p => p.id === planId);
      if (plan) {
        modalTitle.textContent = 'Edit Plan';
        planLocation.value = plan.location || '';
        planCategory.value = plan.category || 'sightseeing';
        planDesc.value = plan.desc || '';
        planTime.value = plan.time || '';
        planAuthor.value = plan.author || '';
        planAddress.value = plan.address || '';
        planLat.value = plan.lat || '';
        planLng.value = plan.lng || '';
        btnDeletePlan.classList.remove('hidden');
        if (plan.lat && plan.lng) setPin(plan.lat, plan.lng);
        return;
      }
    }

    // New plan
    modalTitle.textContent = 'Suggest a Plan';
    planLocation.value = '';
    planCategory.value = 'sightseeing';
    planDesc.value = '';
    planTime.value = '';
    planAuthor.value = '';
    planAddress.value = '';
    planLat.value = '';
    planLng.value = '';
    geocodeStatus.textContent = '';
    btnDeletePlan.classList.add('hidden');
  }

  function closeModal() {
    modal.classList.add('hidden');
    editingDate = null;
    editingPlanId = null;
    clearPin();
  }

  // Itinerary Spreadsheet
  function renderItinerary() {
    const rows = [];
    Object.keys(plans).forEach(dateKey => {
      const datePlans = plans[dateKey];
      if (!datePlans || !datePlans.length) return;
      datePlans.forEach(plan => {
        rows.push({ ...plan, dateKey });
      });
    });

    rows.sort((a, b) => a.dateKey.localeCompare(b.dateKey) || (a.time || '').localeCompare(b.time || ''));

    itineraryBody.innerHTML = '';
    itineraryCount.textContent = `${rows.length} entries`;

    if (rows.length === 0) {
      itineraryEmpty.classList.remove('hidden');
      return;
    }
    itineraryEmpty.classList.add('hidden');

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    rows.forEach(plan => {
      const parts = plan.dateKey.split('-');
      const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
      const dayName = dayNames[d.getDay()];
      const dateStr = `${parts[1]}/${parts[2]}`;

      const authorClass = plan.author === 'Camp Coordinator' ? 'coordinator' : (plan.author === 'Ian' ? 'exploration' : 'other');

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="td-date">${dateStr}</td>
        <td class="td-day">${dayName}</td>
        <td class="td-time">${to12h(plan.time)}</td>
        <td class="td-location">${plan.location}<span class="category-badge ${plan.category || 'sightseeing'}">${plan.category || 'sightseeing'}</span></td>
        <td class="td-desc">${plan.desc || ''}</td>
        <td class="td-author"><span class="author-badge ${authorClass}">${plan.author}</span></td>
        <td class="td-actions"><button class="td-edit-btn" title="Edit"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg></button></td>
      `;

      tr.addEventListener('click', (e) => {
        if (e.target.closest('.td-edit-btn')) return;
        openPlanModal(plan.dateKey, plan.id);
      });
      tr.querySelector('.td-edit-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        openPlanModal(plan.dateKey, plan.id);
      });

      itineraryBody.appendChild(tr);
    });
  }

  // Auto-geocode a location name
  async function autoGeocode(locationName) {
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationName + ', Taiwan')}&limit=1`;
      const res = await fetch(url, { headers: { 'Accept-Language': 'en' } });
      const data = await res.json();
      if (data && data.length > 0) {
        return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon), address: data[0].display_name };
      }
    } catch {}
    return null;
  }

  // Save plan
  async function savePlan(e) {
    console.log("savePlan entered! Event:", e);
    console.log("editingDate values:", { editingDate, editingPlanId });
    if (e) e.preventDefault();
    if (!editingDate) {
      console.warn("savePlan aborted: editingDate is falsy!");
      return;
    }

    const location = planLocation.value.trim();
    console.log("Input location:", location);
    if (!location) {
      console.warn("savePlan aborted: location name is empty!");
      return;
    }

    const datePlans = plans[editingDate] || [];
    let lat = planLat.value ? parseFloat(planLat.value) : null;
    let lng = planLng.value ? parseFloat(planLng.value) : null;
    let address = planAddress.value.trim();

    // Auto-geocode if no coordinates set
    if (!lat || !lng) {
      const geo = await autoGeocode(location);
      if (geo) {
        lat = geo.lat;
        lng = geo.lng;
        address = address || geo.address;
      }
    }

    const planData = {
      id: editingPlanId || Date.now(),
      location,
      category: planCategory.value,
      desc: planDesc.value.trim(),
      time: planTime.value,
      author: planAuthor.value.trim() || 'Anonymous',
      address,
      lat,
      lng,
      createdAt: editingPlanId ? (datePlans.find(p => p.id === editingPlanId)?.createdAt || Date.now()) : Date.now()
    };

    console.log("Created planData object successfully:", planData);

    if (editingPlanId) {
      const idx = datePlans.findIndex(p => p.id === editingPlanId);
      if (idx !== -1) datePlans[idx] = planData;
    } else {
      datePlans.push(planData);
    }

    // Save optimistically to local cache/storage fallback
    plans[editingDate] = datePlans;
    savePlansLocal();
    console.log("Optimistically updated local plans:", plans[editingDate]);

    // Write to Firestore (triggers realtime onSnapshot sync to update UI)
    try {
      console.log("Sending setDoc write request to Cloud Firestore...");
      await setDoc(doc(db, "plans", editingDate), { items: datePlans });
      console.log("setDoc request completed successfully!");
    } catch (e) {
      console.error("Error writing to Firestore:", e);
    }

    showScheduleView(editingDate);
  }

  async function deletePlanById(planId) {
    if (!currentModalDate) return;

    console.log("Triggered deletePlanById! Date:", currentModalDate, "PlanId:", planId);
    const datePlans = (plans[currentModalDate] || []).filter(p => p.id !== planId);
    
    // Save optimistically to local cache/storage fallback
    if (datePlans.length === 0) {
      delete plans[currentModalDate];
    } else {
      plans[currentModalDate] = datePlans;
    }
    savePlansLocal();
    console.log("Optimistically deleted local plan.");

    // Remove or update document in Firestore
    try {
      console.log("Sending delete/update request to Cloud Firestore...");
      if (datePlans.length === 0) {
        await deleteDoc(doc(db, "plans", currentModalDate));
        console.log("deleteDoc request completed successfully!");
      } else {
        await setDoc(doc(db, "plans", currentModalDate), { items: datePlans });
        console.log("setDoc update request completed successfully!");
      }
    } catch (e) {
      console.error("Error deleting from Firestore:", e);
    }

    showScheduleView(currentModalDate);
  }

  // Delete plan
  function deletePlan() {
    if (!editingDate || !editingPlanId) return;
    deletePlanById(editingPlanId);
  }

  // Detect Plus Code prefix (e.g. "X64Q+PR", "7JQ2+8C")
  function isPlusCode(text) {
    const firstToken = text.trim().split(/\s+/)[0].replace(/[,;:]+$/, '');
    return /^[23456789CFGHJMPQRVWX]{4,8}\+[23456789CFGHJMPQRVWX]{2,}/i.test(firstToken);
  }

  // Geocode
  async function geocodeAddress() {
    const addr = planAddress.value.trim();
    if (!addr) return;

    geocodeStatus.textContent = 'Searching...';
    geocodeStatus.className = 'geocode-status';

    // Try client-side Plus Code decoding first
    if (isPlusCode(addr)) {
      try {
        let codeOnly = addr.split(/\s+/)[0].replace(/[,;:]+$/, '').toUpperCase();
        if (OpenLocationCode.isShort(codeOnly)) {
          // Recover full code using CYCU coordinates [24.9576, 121.2407] as reference
          codeOnly = OpenLocationCode.recoverNearest(codeOnly, 24.9576, 121.2407);
        }
        const decoded = OpenLocationCode.decode(codeOnly);
        if (decoded) {
          const lat = decoded.latitudeCenter;
          const lng = decoded.longitudeCenter;
          planAddress.value = codeOnly + (addr.slice(addr.split(/\s+/)[0].length) || '');
          setPin(lat, lng);
          geocodeStatus.textContent = 'Pinned from Plus Code';
          geocodeStatus.className = 'geocode-status success';
          return;
        }
      } catch (e) {
        console.error("Plus Code decoding error, falling back:", e);
      }
    }

    // Fallback: Nominatim search
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(addr)}&limit=1`;
      const res = await fetch(url, { signal: controller.signal, headers: { 'Accept-Language': 'en' } });
      const data = await res.json();

      if (data && data.length > 0) {
        const result = data[0];
        const lat = parseFloat(result.lat);
        const lng = parseFloat(result.lon);
        planAddress.value = result.display_name;
        setPin(lat, lng);
        geocodeStatus.textContent = 'Found';
        geocodeStatus.className = 'geocode-status success';
      } else {
        geocodeStatus.textContent = 'Location not found';
        geocodeStatus.className = 'geocode-status error';
        clearPin();
      }
    } catch {
      geocodeStatus.textContent = 'Search timed out';
      geocodeStatus.className = 'geocode-status error';
    } finally {
      clearTimeout(timeout);
    }
  }

  // Map
  function setPin(lat, lng) {
    planLat.value = lat;
    planLng.value = lng;
    pinCoords.textContent = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
    pinCoords.className = 'pin-coords has-pin';
    pinStatus.textContent = 'Location pinned';
    resetPinButton();
    if (tempMarker) map.removeLayer(tempMarker);
    tempMarker = L.circleMarker([lat, lng], {
      radius: 10, fillColor: '#F28E73', color: '#fff', weight: 3, fillOpacity: 1
    }).addTo(map).bindPopup(`<b>Pinned</b><br>${lat.toFixed(5)}, ${lng.toFixed(5)}`).openPopup();
  }

  function resetPinButton() {
    btnPinMapLocation.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg> Pin Map Location';
  }

  function clearPin() {
    planLat.value = '';
    planLng.value = '';
    pinCoords.textContent = 'No pin set';
    pinCoords.className = 'pin-coords';
    pinStatus.textContent = '';
    resetPinButton();
    if (tempMarker) { map.removeLayer(tempMarker); tempMarker = null; }
  }

  // Pin map modal
  function openPinMap() {
    pinMapModal.classList.remove('hidden');
    pinMapCoords.textContent = 'Click the map to drop a pin';
    btnConfirmPinMap.disabled = true;
    pendingLat = null;
    pendingLng = null;

    if (planLat.value && planLng.value) {
      pendingLat = parseFloat(planLat.value);
      pendingLng = parseFloat(planLng.value);
    }

    // Small delay to let the modal render, then init map
    setTimeout(() => {
      if (pinMap) pinMap.remove();
      pinMap = L.map('pin-map-container', {
        center: [pendingLat || 24.9576, pendingLng || 121.2407],
        zoom: 16,
        zoomControl: true,
        attributionControl: false
      });

      L.tileLayer('https://mt1.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}', {
        maxZoom: 21,
        attribution: '&copy; Google Maps'
      }).addTo(pinMap);

      if (pendingLat && pendingLng) {
        pinMapMarker = L.marker([pendingLat, pendingLng], { draggable: true }).addTo(pinMap);
        pinMapCoords.textContent = `${pendingLat.toFixed(5)}, ${pendingLng.toFixed(5)}`;
        btnConfirmPinMap.disabled = false;
        pinMapMarker.on('dragend', function () {
          const pos = pinMapMarker.getLatLng();
          pendingLat = pos.lat;
          pendingLng = pos.lng;
          pinMapCoords.textContent = `${pos.lat.toFixed(5)}, ${pos.lng.toFixed(5)}`;
        });
      }

      pinMap.on('click', function (e) {
        if (pinMapMarker) pinMap.removeLayer(pinMapMarker);
        pendingLat = e.latlng.lat;
        pendingLng = e.latlng.lng;
        pinMapMarker = L.marker([pendingLat, pendingLng], { draggable: true }).addTo(pinMap);
        pinMapCoords.textContent = `${pendingLat.toFixed(5)}, ${pendingLng.toFixed(5)}`;
        btnConfirmPinMap.disabled = false;
        pinMapMarker.on('dragend', function () {
          const pos = pinMapMarker.getLatLng();
          pendingLat = pos.lat;
          pendingLng = pos.lng;
          pinMapCoords.textContent = `${pos.lat.toFixed(5)}, ${pos.lng.toFixed(5)}`;
        });
      });

      pinMap.invalidateSize();
    }, 200);
  }

  function closePinMap() {
    pinMapModal.classList.add('hidden');
    if (pinMap) { pinMap.remove(); pinMap = null; }
    pinMapMarker = null;
    pendingLat = null;
    pendingLng = null;
  }

  function confirmPin() {
    if (pendingLat !== null && pendingLng !== null) {
      setPin(pendingLat, pendingLng);
    }
    closePinMap();
  }

  function initMap() {
    map = L.map('real-map', {
      center: [24.9576, 121.2407],
      zoom: 16,
      zoomControl: true,
      attributionControl: false
    });

    L.tileLayer('https://mt1.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}', {
      maxZoom: 21,
      attribution: '&copy; Google Maps'
    }).addTo(map);

    window.addEventListener('resize', () => {
      if (map) map.invalidateSize();
    });

    setTimeout(() => { if (map) map.invalidateSize(); }, 150);

    updateMapMarkers();
  }

  function createCustomIcon(category) {
    let color = '#4D8CD6'; // Default blue
    let svg = '';

    if (category === 'food') {
      color = '#EF4444'; // Red-orange for food
      svg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>`;
    } else if (category === 'roam') {
      color = '#F59E0B'; // Amber/orange for roam
      svg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`;
    } else if (category === 'sightseeing') {
      color = '#EC4899'; // Pink/coral for sightseeing
      svg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>`;
    } else if (category === 'academic') {
      color = '#10B981'; // Emerald green for academic
      svg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>`;
    } else {
      color = '#4D8CD6';
      svg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>`;
    }

    const html = `
      <div style="
        background-color: ${color};
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        ${svg}
      </div>
    `;

    return L.divIcon({
      html: html,
      className: 'custom-map-pin',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -16]
    });
  }

  function updateMapMarkers() {
    // Clear old markers
    markers.forEach(m => map.removeLayer(m));
    markers = [];

    let count = 0;

    Object.keys(plans).forEach(dateKey => {
      const datePlans = plans[dateKey];
      datePlans.forEach(plan => {
        if (plan.lat && plan.lng) {
          const parts = dateKey.split('-');
          const dateStr = formatDateDisplay(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
          const timeStr = plan.time ? ` at ${to12h(plan.time)}` : '';

          const marker = L.marker([plan.lat, plan.lng], {
            icon: createCustomIcon(plan.category)
          }).addTo(map);

          marker.bindPopup(`
            <div class="popup-title">${plan.location}</div>
            <div class="popup-date">${dateStr}${timeStr}</div>
            ${plan.desc ? `<div class="popup-desc">${plan.desc}</div>` : ''}
            <div style="font-size:0.75rem;color:#64748b;margin-top:4px;">Suggested by ${plan.author}</div>
          `);

          markers.push(marker);
          count++;
        }
      });
    });

    mapCount.textContent = `${count} location${count !== 1 ? 's' : ''}`;

    if (count > 0) {
      if (isInitialLoad) {
        map.setView([24.9576, 121.2407], 16);
        isInitialLoad = false;
      } else {
        const group = L.featureGroup(markers);
        map.fitBounds(group.getBounds().pad(0.15));
      }
    } else {
      map.setView([24.9576, 121.2407], 16);
    }
  }

  // Navigation
  prevBtn.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) { currentMonth = 11; currentYear--; }
    renderCalendar();
  });

  nextBtn.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) { currentMonth = 0; currentYear++; }
    renderCalendar();
  });

  // Modal events
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  btnAddPlanTrigger.addEventListener('click', () => { showFormView(); });
  btnBackToSchedule.addEventListener('click', () => { showScheduleView(currentModalDate); });
  planForm.addEventListener('submit', savePlan);
  btnSavePlan.addEventListener('click', (e) => {
    console.log("btnSavePlan click detected!");
    if (!planForm.checkValidity()) {
      console.log("Form is invalid, reporting validity...");
      planForm.reportValidity();
      return;
    }
    savePlan(e);
  });
  btnDeletePlan.addEventListener('click', deletePlan);
  btnGeocode.addEventListener('click', geocodeAddress);
  planAddress.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); geocodeAddress(); } });
  planAddress.addEventListener('paste', () => { setTimeout(geocodeAddress, 100); });
  planAddress.addEventListener('change', geocodeAddress);
  let geocodeTimeout = null;
  planAddress.addEventListener('input', () => {
    if (geocodeTimeout) clearTimeout(geocodeTimeout);
    geocodeTimeout = setTimeout(geocodeAddress, 800);
  });

  // Pin on map button
  btnPinMapLocation.addEventListener('click', () => {
    openPinMap();
  });

  // Pin map modal events
  btnClosePinMap.addEventListener('click', closePinMap);
  btnCancelPinMap.addEventListener('click', closePinMap);
  btnConfirmPinMap.addEventListener('click', confirmPin);
  pinMapModal.addEventListener('click', (e) => { if (e.target === pinMapModal) closePinMap(); });

  // Export handler
  btnExport.addEventListener('click', function (e) {
    e.preventDefault();
    try {
      const allPlans = [];
      Object.keys(plans).forEach(dateKey => {
        (plans[dateKey] || []).forEach(p => allPlans.push({ date: dateKey, ...p }));
      });
      allPlans.sort((a, b) => a.date.localeCompare(b.date) || (a.time || '').localeCompare(b.time || ''));

      const esc = (v) => {
        const s = (v === null || v === undefined ? '' : String(v)).replace(/"/g, '""');
        return '"' + s + '"';
      };
      const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

      const h = ['Date','Day','Time','Location','Description','Address','Latitude','Longitude','Suggested By'];
      const r = allPlans.map(p => {
        const parts = p.date.split('-');
        const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
        return [
          p.date, days[d.getDay()], p.time || '--:--',
          p.location, p.desc || '', p.address || '',
          p.lat ?? '', p.lng ?? '', p.author || 'Anonymous'
        ].map(esc).join(',');
      });

      const csv = '\uFEFF' + h.join(',') + '\n' + r.join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'itinerary.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(url); }, 100);
    } catch (err) {
      console.error('Export failed:', err);
      alert('Export failed. Check the console for details.');
    }
  });

  // Init
  initMap();
  startRealtimeSync();
});
