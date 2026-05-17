const navItems = Array.from(document.querySelectorAll("[data-view]"));
const views = Array.from(document.querySelectorAll(".view"));
const jumpButtons = Array.from(document.querySelectorAll("[data-jump-to]"));
const statEls = {
  due: document.querySelector('[data-stat="due"]'),
  cards: document.querySelector('[data-stat="cards"]'),
  lists: document.querySelector('[data-stat="lists"]'),
};
const exportButton = document.querySelector("#export-library");
const importInput = document.querySelector("#import-library");
const storageStatus = document.querySelector("#storage-status");
const sleepTargetSelect = document.querySelector("#sleep-target-setting");
const settingsKeys = document.querySelector("#settings-keys");
const homeEmpty = document.querySelector("#home-empty");
const homePreview = document.querySelector("#home-preview");
const homeCardPreview = document.querySelector("#home-card-preview");
const cardLibrary = document.querySelector("#card-library");
const listLibrary = document.querySelector("#list-library");
const listDetail = document.querySelector("#list-detail");
const trainingListSelect = document.querySelector("#training-list");
const trainingListNote = document.querySelector("#training-list-note");
const startTrainingButton = document.querySelector("#start-training");
const trainingCard = document.querySelector("#training-card");
const trainingPlayButton = document.querySelector("#training-play");
const orientKeyButton = document.querySelector("#orient-key");
const revealAnswerButton = document.querySelector("#reveal-answer");
const trainingProgress = document.querySelector("#training-progress");
const finishSessionButton = document.querySelector("#finish-session");
const showCardDetailsButton = document.querySelector("#show-card-details");
const sessionDetails = document.querySelector("#session-details");
const answerPanel = document.querySelector("#answer-panel");
const sessionProgressStrip = document.querySelector("#session-progress-strip");
const sessionProgressState = document.querySelector("#session-progress-state");
const sessionProgressPercent = document.querySelector("#session-progress-percent");
const sessionProgressFill = document.querySelector("#session-progress-fill");
const sessionWrongCount = document.querySelector("#session-wrong-count");
const sessionCorrectCount = document.querySelector("#session-correct-count");
const sessionLaterCount = document.querySelector("#session-later-count");
const sessionTitle = document.querySelector("#session-title");
const trainingPromptTitle = document.querySelector("#training-prompt-title");
const answerTitle = document.querySelector("#answer-title");
const answerAliases = document.querySelector("#answer-aliases");
const answerChords = document.querySelector("#answer-chords");
const wizardProgress = document.querySelector("#wizard-progress");
const wizardStep = document.querySelector("#wizard-step");
const wizardBackButton = document.querySelector("#wizard-back");
const wizardNextButton = document.querySelector("#wizard-next");
const addCardStatus = document.querySelector("#add-card-status");
const addCardTitle = document.querySelector("#add-card-title");
const cardDetailContent = document.querySelector("#card-detail-content");
const cardDetailBackButton = document.querySelector("#card-detail-back");
const cloudSignedOut = document.querySelector("#cloud-signed-out");
const cloudSignedIn = document.querySelector("#cloud-signed-in");
const cloudEmailInput = document.querySelector("#cloud-email");
const cloudPasswordInput = document.querySelector("#cloud-password");
const cloudLoginButton = document.querySelector("#cloud-login");
const cloudSignupButton = document.querySelector("#cloud-signup");
const cloudSyncNowButton = document.querySelector("#cloud-sync-now");
const cloudLogoutButton = document.querySelector("#cloud-logout");
const cloudUser = document.querySelector("#cloud-user");
const cloudStatus = document.querySelector("#cloud-status");

const DB_NAME = "musical-vocabulary";
const DB_VERSION = 1;
const STORE_NAME = "library";
const LIBRARY_KEY = "main";
const SUPABASE_URL = "https://auqglbikogbfdxhkmwbe.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_yOd6QXfuTbxKq0VXUYO4CA_SBgs50w3";
const SAMPLE_ROOT = "Samples/Piano";
const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const MAJOR_SCALE = [0, 2, 4, 5, 7, 9, 11];
const FLAT_NOTE_NAMES = {
  Db: "C#",
  Eb: "D#",
  Gb: "F#",
  Ab: "G#",
  Bb: "A#",
};
const CHORD_QUALITIES = {
  major: [0, 4, 7],
  minor: [0, 3, 7],
  diminished: [0, 3, 6],
  augmented: [0, 4, 8],
  sus2: [0, 2, 7],
  sus4: [0, 5, 7],
};
const EXTENSION_INTERVALS = {
  "6": 9,
  "7": 10,
  maj7: 11,
  "9": 14,
  b9: 13,
  "#9": 15,
  "11": 17,
  "#11": 18,
  "13": 21,
  b13: 20,
  "#13": 22,
  add9: 14,
  add11: 17,
};
const CHORD_EXTENSION_OPTIONS = ["6", "7", "maj7", "9", "b9", "#9", "11", "#11", "13", "b13", "#13", "add9", "add11"];
const WIZARD_STEPS = ["Context", "Count", "Chords", "Rhythm", "Variations", "Source", "Name", "Lists"];
const TIME_SIGNATURE_OPTIONS = ["2/4", "3/4", "4/4", "6/8"];
const ALL_PLAYBACK_KEYS = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
const DEFAULT_TEMPO_VARIATION = 15;
const TAP_TEMPO_WINDOW = 6;
const EXTENSION_SLOTS = [
  { key: "7", label: "7", options: [["6", "6/bb7"], ["7", "7"], ["maj7", "maj7"]] },
  { key: "9", label: "9", options: [["b9", "b9"], ["9", "9"], ["#9", "#9"]] },
  { key: "11", label: "11", options: [["11", "11"], ["#11", "#11"]] },
  { key: "13", label: "13", options: [["b13", "b13"], ["13", "13"], ["#13", "#13"]] },
];
const RHYTHM_VALUES = [
  { name: "Semibreve", beats: 4, asset: "Semibrieve.png" },
  { name: "Minim", beats: 2, asset: "Minim.png" },
  { name: "Crotchet", beats: 1, asset: "Crotchet.png" },
  { name: "Quaver", beats: 0.5, asset: "Quaver.png" },
  { name: "Semiquaver", beats: 0.25, asset: "Semiquaver.png" },
];

const defaultProgress = () => ({
  state: "live",
  intervalDays: 0,
  ease: 2.5,
  streak: 0,
  lapses: 0,
  nextReviewAt: null,
  lastReviewedAt: null,
  lastGrade: null,
  lastGradeAt: null,
  wakeCorrectCount: 0,
  wakeWrongCount: 0,
  wakeLaterCount: 0,
  requiredNetCorrectToSleep: 2,
  maxToPassThisWake: 2,
});

const defaultLibrary = () => {
  const now = new Date().toISOString();

  return {
    schemaVersion: 1,
    exportedAt: null,
    createdAt: now,
    updatedAt: now,
    cards: [],
    lists: [],
    progress: {
      recognition: {},
      audiation: {},
    },
    settings: {
      trainingDirection: "recognition",
      requiredNetCorrectToSleep: 2,
      allowedKeys: ALL_PLAYBACK_KEYS,
      tempoRange: {
        min: 70,
        max: 120,
      },
      instruments: ["piano"],
    },
  };
};

const starterCards = () => {
  const now = new Date().toISOString();

  return [
    {
      id: "card_axis_progression",
      type: "chord-progression",
      title: "Axis progression",
      aliases: ["I-V-vi-IV", "Let It Be progression"],
      mode: "major",
      defaultKey: "C",
      timeSignature: "4/4",
      tempo: {
        default: 92,
        min: 76,
        max: 116,
      },
      source: {
        url: "",
        title: "",
        startSeconds: null,
      },
      chordDurations: ["1 bar", "1 bar", "1 bar", "1 bar"],
      chords: [
        makeChord({ degree: 1, quality: "major", label: "I" }),
        makeChord({ degree: 5, quality: "major", label: "V" }),
        makeChord({ degree: 6, quality: "minor", label: "vi" }),
        makeChord({ degree: 4, quality: "major", label: "IV" }),
      ],
      listIds: ["list_pop_progressions", "list_mvp_starters"],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "card_minor_walkdown",
      type: "chord-progression",
      title: "Minor walkdown",
      aliases: ["i-bVII-bVI-V", "Minor Andalusian shape"],
      mode: "minor",
      defaultKey: "A",
      timeSignature: "4/4",
      tempo: {
        default: 84,
        min: 68,
        max: 108,
      },
      source: {
        url: "",
        title: "",
        startSeconds: null,
      },
      chordDurations: ["1 bar", "1 bar", "1 bar", "1 bar"],
      chords: [
        makeChord({ degree: 1, quality: "minor", label: "i" }),
        makeChord({ degree: 7, accidental: "flat", quality: "major", label: "bVII" }),
        makeChord({ degree: 6, accidental: "flat", quality: "major", label: "bVI" }),
        makeChord({ degree: 5, quality: "major", label: "V" }),
      ],
      listIds: ["list_mvp_starters"],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "card_secondary_dominant_pop",
      type: "chord-progression",
      title: "Secondary dominant lift",
      aliases: ["I-V/V-V-I", "II major to V"],
      mode: "major",
      defaultKey: "C",
      timeSignature: "4/4",
      tempo: {
        default: 100,
        min: 80,
        max: 124,
      },
      source: {
        url: "",
        title: "",
        startSeconds: null,
      },
      chordDurations: ["1 bar", "1 bar", "1 bar", "1 bar"],
      chords: [
        makeChord({ degree: 1, quality: "major", label: "I" }),
        makeChord({ degree: 2, quality: "major", extensions: ["7"], label: "V/V7", alternateLabels: ["II7"] }),
        makeChord({ degree: 5, quality: "major", label: "V" }),
        makeChord({ degree: 1, quality: "major", label: "I" }),
      ],
      listIds: ["list_mvp_starters", "list_borrowed_secondary"],
      createdAt: now,
      updatedAt: now,
    },
  ];
};

const starterLists = () => {
  const now = new Date().toISOString();

  return [
    {
      id: "list_mvp_starters",
      name: "MVP starters",
      description: "A tiny test collection for proving the library screens work.",
      cardIds: ["card_axis_progression", "card_minor_walkdown", "card_secondary_dominant_pop"],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "list_pop_progressions",
      name: "Pop progressions",
      description: "Common major-key shapes with strong song associations.",
      cardIds: ["card_axis_progression"],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "list_borrowed_secondary",
      name: "Borrowed and secondary chords",
      description: "Cards that need flexible labels as well as clear playback definitions.",
      cardIds: ["card_secondary_dominant_pop"],
      createdAt: now,
      updatedAt: now,
    },
  ];
};

function makeChord({
  degree,
  accidental = "natural",
  quality,
  extensions = [],
  label,
  alternateLabels = [],
}) {
  return {
    playback: {
      degree,
      accidental,
      quality,
      extensions,
      inversion: "root",
      bass: null,
      allowInversions: false,
      allowBassVariation: false,
    },
    label,
    alternateLabels,
  };
}

let library = defaultLibrary();
let selectedListId = null;
let playbackTimeouts = [];
let fadeTimers = [];
let activeChordAudios = [];
let fadingChordAudios = [];
let activePlaybackCardId = null;
let activePlaybackContext = null;
let playbackRunId = 0;
let audioContext = null;
const sampleBufferCache = new Map();
let supabaseClient = null;
let currentSupabaseUser = null;
let cloudSaveTimer = null;
let cloudSyncInProgress = false;
let trainingQueue = [];
let currentTrainingIndex = 0;
let selectedTrainingListId = null;
let sessionDueTotal = 0;
let sessionAttemptCount = 0;
let previousTrainingCardId = null;
let currentTrainingPlayback = null;
let previousViewId = "home";
let cardDetailReturnViewId = "home";
let detailCardId = null;
let wizardStepIndex = 0;
let chordEntryIndex = 0;
let rhythmChordIndex = 0;
let wizardReferenceIndex = 0;
let detailReferenceIndex = 0;
let dotNextRhythm = false;
let tieNextRhythm = false;
let rhythmMessage = "";
let tapTempoTimes = [];
let wizardMode = "create";
let editingCardId = null;
let statusModalCardId = null;
let wizardDraft = createEmptyWizardDraft();

function showView(viewId) {
  const currentView = views.find((view) => view.classList.contains("active"));
  const currentViewId = currentView?.id;

  if (currentViewId === "card-detail" && viewId !== "card-detail") {
    stopReferencePlayback();
  }

  if (currentView && currentView.id !== viewId) {
    previousViewId = currentView.id;
  }

  views.forEach((view) => {
    view.classList.toggle("active", view.id === viewId);
  });

  navItems.forEach((item) => {
    item.classList.toggle("active", item.dataset.view === viewId);
  });

  document.body.classList.toggle("session-mode", viewId === "session");
}

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    if (item.dataset.view === "add-card") {
      resetWizardForCreate();
    }
    showView(item.dataset.view);
  });
});

jumpButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.jumpTo === "add-card") {
      resetWizardForCreate();
    }
    showView(button.dataset.jumpTo);
  });
});

function setStatus(message) {
  if (storageStatus) {
    storageStatus.textContent = message;
  }
}

function setCloudStatus(message) {
  if (cloudStatus) {
    cloudStatus.textContent = message;
  }
}

function setPlaybackStatus(message) {
  document.body.dataset.playbackStatus = message;
}

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function withStore(mode, action) {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, mode);
    const store = transaction.objectStore(STORE_NAME);
    const request = action(store);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => db.close();
    transaction.onerror = () => {
      db.close();
      reject(transaction.error);
    };
  });
}

async function loadLibrary() {
  const savedLibrary = await withStore("readonly", (store) => store.get(LIBRARY_KEY));

  if (!savedLibrary) {
    library = seedStarterData(library);
    await saveLibrary(library);
    return library;
  }

  library = normalizeLibrary(savedLibrary);
  if (shouldSeedStarterData(library)) {
    library = seedStarterData(library);
    await saveLibrary(library);
  }

  return library;
}

async function saveLibrary(nextLibrary, options = {}) {
  const normalizedNextLibrary = normalizeLibrary(nextLibrary);
  const libraryToSave = {
    ...normalizedNextLibrary,
    updatedAt: options.preserveUpdatedAt ? normalizedNextLibrary.updatedAt : new Date().toISOString(),
  };

  library = libraryToSave;
  await withStore("readwrite", (store) => store.put(libraryToSave, LIBRARY_KEY));
  renderStats();

  if (options.syncCloud !== false) {
    queueCloudSave();
  }
}

function normalizeLibrary(rawLibrary) {
  const fallback = defaultLibrary();

  return {
    ...fallback,
    ...rawLibrary,
    cards: Array.isArray(rawLibrary?.cards) ? rawLibrary.cards : [],
    lists: Array.isArray(rawLibrary?.lists) ? rawLibrary.lists : [],
    progress: {
      recognition: rawLibrary?.progress?.recognition ?? {},
      audiation: rawLibrary?.progress?.audiation ?? {},
    },
    settings: {
      ...fallback.settings,
      ...(rawLibrary?.settings ?? {}),
      tempoRange: {
        ...fallback.settings.tempoRange,
        ...(rawLibrary?.settings?.tempoRange ?? {}),
      },
    },
  };
}

function shouldSeedStarterData(nextLibrary) {
  const hasCards = nextLibrary.cards.length > 0;
  const hasLists = nextLibrary.lists.length > 0;
  const hasProgress =
    Object.keys(nextLibrary.progress.recognition).length > 0 ||
    Object.keys(nextLibrary.progress.audiation).length > 0;

  return !hasCards && !hasLists && !hasProgress;
}

function seedStarterData(nextLibrary) {
  const cards = starterCards();
  const lists = starterLists();
  const recognition = {};
  const audiation = {};

  cards.forEach((card) => {
    recognition[card.id] = defaultProgress();
    audiation[card.id] = defaultProgress();
  });

  return {
    ...nextLibrary,
    cards,
    lists,
    progress: {
      recognition,
      audiation,
    },
  };
}

function renderStats() {
  if (!statEls.due || !statEls.cards || !statEls.lists) {
    return;
  }

  const dueCount = library.cards.filter((card) => isCardLive(card, "recognition")).length;

  statEls.due.textContent = dueCount;
  statEls.cards.textContent = library.cards.length;
  statEls.lists.textContent = library.lists.length;
}

function renderLibraryViews() {
  renderHomePreview();
  renderCards();
  renderLists();
  renderSelectedList();
  renderTrainingSetup();
  renderSettings();
  renderWizard();
}

function renderAddCardListOptions() {
  renderWizard();
}

function renderHomePreview() {
  const hasCards = library.cards.length > 0;

  homeEmpty.hidden = hasCards;
  homePreview.hidden = !hasCards;
  homeCardPreview.innerHTML = "";

  library.cards.slice(0, 3).forEach((card) => {
    homeCardPreview.append(createCardElement(card, { compact: true }));
  });
}

function renderCards() {
  cardLibrary.innerHTML = "";

  if (library.cards.length === 0) {
    cardLibrary.append(createEmptyPanel("No cards yet", "Cards you add will appear here."));
    return;
  }

  library.cards.forEach((card) => {
    cardLibrary.append(createCardElement(card));
  });
}

function renderLists() {
  listLibrary.innerHTML = "";

  if (library.lists.length === 0) {
    listLibrary.append(createEmptyPanel("No lists yet", "Study lists you create will appear here."));
    selectedListId = null;
    return;
  }

  if (!selectedListId || !library.lists.some((list) => list.id === selectedListId)) {
    selectedListId = library.lists[0].id;
  }

  library.lists.forEach((list) => {
    const cardCount = list.cardIds.length;
    const button = document.createElement("button");

    button.className = `list-card${list.id === selectedListId ? " active" : ""}`;
    button.type = "button";
    button.dataset.listId = list.id;
    button.innerHTML = `
      <div>
        <h3>${escapeHtml(list.name)}</h3>
        <p class="card-note">${escapeHtml(list.description)}</p>
      </div>
      <div class="meta-row">
        <span class="pill">${cardCount} ${cardCount === 1 ? "card" : "cards"}</span>
      </div>
    `;
    button.addEventListener("click", () => {
      selectedListId = list.id;
      renderLists();
      renderSelectedList();
    });
    listLibrary.append(button);
  });
}

function renderSelectedList() {
  const selectedList = library.lists.find((list) => list.id === selectedListId);

  listDetail.innerHTML = "";

  if (!selectedList) {
    listDetail.hidden = true;
    return;
  }

  const cardsInList = selectedList.cardIds
    .map((cardId) => library.cards.find((card) => card.id === cardId))
    .filter(Boolean);
  const cardCount = cardsInList.length;
  const heading = document.createElement("div");
  const cardsGrid = document.createElement("div");

  heading.className = "panel detail-heading";
  heading.innerHTML = `
    <div>
      <h3>${escapeHtml(selectedList.name)}</h3>
      <p>${escapeHtml(selectedList.description)}</p>
    </div>
    <div class="detail-heading-actions">
      <span class="pill">${cardCount} ${cardCount === 1 ? "card" : "cards"}</span>
      <button class="danger-action compact-danger" type="button" data-confirm-delete-list="${escapeHtml(selectedList.id)}">Delete list</button>
    </div>
  `;

  cardsGrid.className = "card-grid compact";
  if (cardsInList.length === 0) {
    cardsGrid.append(createEmptyPanel("No cards in this list", "Cards added to this list will appear here."));
  } else {
    cardsInList.forEach((card) => {
      cardsGrid.append(createCardElement(card, { compact: true }));
    });
  }

  listDetail.append(heading, cardsGrid);
  listDetail.hidden = false;
}

function createCardElement(card, options = {}) {
  const article = document.createElement("article");
  const recognition = getVisibleProgress(card, "recognition");
  const badge = getProgressBadgeData(recognition);
  const aliases = card.aliases
    .map((alias) => `<span class="pill">${escapeHtml(alias)}</span>`)
    .join("");

  article.className = "library-card";
  article.dataset.cardDetail = card.id;
  article.tabIndex = 0;
  article.setAttribute("role", "button");
  article.setAttribute("aria-label", `Open details for ${card.title}`);
  article.innerHTML = `
    <div class="card-summary-row">
      <div>
        <h3>${escapeHtml(card.title)}</h3>
        <p class="card-note">${escapeHtml(card.mode)} context, default key ${escapeHtml(card.defaultKey)}</p>
      </div>
      <button class="progress-badge ${badge.kind}" type="button" title="${escapeHtml(badge.title)}" data-progress-card="${escapeHtml(card.id)}" aria-label="Change progress for ${escapeHtml(card.title)}">
        <span class="badge-icon">${badge.icon}</span>
        <strong>${escapeHtml(badge.value)}</strong>
        ${badge.caption ? `<small>${escapeHtml(badge.caption)}</small>` : ""}
      </button>
    </div>
    <div class="chord-row">
      ${card.chords.map((chord) => `<span class="pill chord-pill">${renderChordSymbol(chord)}</span>`).join("")}
    </div>
    ${options.compact ? "" : `<div class="alias-row">${aliases}</div>`}
    <div class="card-actions">
      <button class="audio-toggle" type="button" data-play-card="${escapeHtml(card.id)}" aria-label="Play ${escapeHtml(card.title)}" title="Play">&#9654;</button>
    </div>
  `;

  return article;
}

function createEmptyPanel(title, text) {
  const panel = document.createElement("div");

  panel.className = "panel";
  panel.innerHTML = `<h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p>`;
  return panel;
}

function formatChordLabel({ degree, accidental, quality, extensions }) {
  const parts = getAutoChordSymbolParts({ degree, accidental, quality, extensions });

  return `${parts.base}${parts.qualitySuffix}${parts.extensions.join("")}`;
}

function getAutoChordSymbolParts({ degree, accidental, quality, extensions }) {
  const degreeLabels = ["I", "II", "III", "IV", "V", "VI", "VII"];
  const accidentalLabel = accidental === "flat" ? "b" : accidental === "sharp" ? "#" : "";
  const baseLabel = `${accidentalLabel}${degreeLabels[degree - 1] ?? "I"}`;
  const qualityLabel = quality === "minor" ? baseLabel.toLowerCase() : baseLabel;
  const qualitySuffixes = {
    diminished: "dim",
    augmented: "aug",
    sus2: "sus2",
    sus4: "sus4",
  };
  const extensionLabels = extensions.map((extension) => getExtensionDisplayLabel(extension, quality));

  return {
    base: qualityLabel,
    qualitySuffix: qualitySuffixes[quality] ?? "",
    extensions: extensionLabels,
  };
}

function getExtensionDisplayLabel(extension, quality) {
  if (extension === "6" && quality === "diminished") {
    return "bb7";
  }

  return extension;
}

function splitCommaList(value) {
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function createInitialProgress() {
  const requiredNetCorrectToSleep = getRequiredNetCorrectToSleep();

  return {
    ...defaultProgress(),
    requiredNetCorrectToSleep,
    maxToPassThisWake: requiredNetCorrectToSleep,
  };
}

function createId(prefix) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function uniqueValues(values) {
  return Array.from(new Set(values));
}

function parseYouTubeStartSeconds(url) {
  try {
    const parsedUrl = new URL(url);
    const timestamp = parsedUrl.searchParams.get("t") ?? parsedUrl.searchParams.get("start");

    if (!timestamp) {
      return null;
    }

    return parseTimestamp(timestamp);
  } catch {
    return null;
  }
}

function parseTimestamp(timestamp) {
  if (/^\d+$/.test(timestamp)) {
    return Number(timestamp);
  }

  const hours = Number(timestamp.match(/(\d+)h/)?.[1] ?? 0);
  const minutes = Number(timestamp.match(/(\d+)m/)?.[1] ?? 0);
  const seconds = Number(timestamp.match(/(\d+)s/)?.[1] ?? 0);

  return hours * 3600 + minutes * 60 + seconds;
}

function setAddCardStatus(message) {
  addCardStatus.textContent = message;
}

function createEmptyWizardDraft() {
  return {
    mode: "major",
    defaultKey: "C",
    timeSignature: "4/4",
    tempo: { default: 92, min: 78, max: 106, variationPercent: DEFAULT_TEMPO_VARIATION },
    chordCount: 4,
    chords: Array.from({ length: 4 }, () => ({
      degree: 1,
      accidental: "natural",
      quality: "major",
      extensions: [],
      label: "",
      rhythms: [],
      duration: 4,
      variation: "fixed",
    })),
    references: [createEmptyReference()],
    source: { url: "", title: "", startSeconds: null },
    variation: {
      varyKey: true,
      varyTempo: true,
    },
    rhythmVariation: {
      level: "off",
    },
    title: "",
    aliases: [],
    listIds: [],
    newListName: "",
  };
}

function createWizardDraftFromCard(card) {
  const defaultTempo = Number(card.tempo?.default) || 92;
  const minTempo = Number(card.tempo?.min) || Math.round(defaultTempo * 0.85);
  const maxTempo = Number(card.tempo?.max) || Math.round(defaultTempo * 1.15);
  const references = getCardReferences(card);
  const variationPercent = Math.round(Math.max(
    Math.abs(defaultTempo - minTempo),
    Math.abs(maxTempo - defaultTempo),
  ) / defaultTempo * 100) || DEFAULT_TEMPO_VARIATION;

  return {
    mode: card.mode || "major",
    defaultKey: card.defaultKey || "C",
    timeSignature: TIME_SIGNATURE_OPTIONS.includes(card.timeSignature) ? card.timeSignature : "4/4",
    tempo: {
      default: defaultTempo,
      min: minTempo,
      max: maxTempo,
      variationPercent,
    },
    chordCount: Math.max(1, card.chords.length),
    chords: card.chords.map((chord, index) => {
      const extensions = normalizeExtensionTokens(chord.playback?.extensions ?? []);
      const autoLabel = formatChordLabel({
        degree: chord.playback?.degree ?? 1,
        accidental: chord.playback?.accidental ?? "natural",
        quality: chord.playback?.quality ?? "major",
        extensions,
      });

      return {
        degree: chord.playback?.degree ?? 1,
        accidental: chord.playback?.accidental ?? "natural",
        quality: chord.playback?.quality ?? "major",
        extensions,
        label: chord.label && chord.label !== autoLabel ? chord.label : "",
        rhythms: Array.isArray(chord.rhythms) ? chord.rhythms : [],
        duration: typeof card.chordDurations?.[index] === "number" ? card.chordDurations[index] : 4,
        variation: chord.playback?.allowInversions ? "allow-inversions" : "fixed",
      };
    }),
    references: references.length > 0 ? references : [createEmptyReference()],
    source: references[0] ?? createEmptyReference(),
    variation: {
      varyKey: card.variation?.varyKey ?? true,
      varyTempo: card.variation?.varyTempo ?? true,
    },
    rhythmVariation: {
      level: ["off", "simple", "medium"].includes(card.rhythmVariation?.level)
        ? card.rhythmVariation.level
        : "off",
    },
    title: card.title ?? "",
    aliases: card.aliases ?? [],
    listIds: card.listIds ?? [],
    newListName: "",
  };
}

function createEmptyReference() {
  return {
    id: createId("ref"),
    url: "",
    title: "",
    startSeconds: null,
  };
}

function getCardReferences(card) {
  const references = Array.isArray(card.references)
    ? card.references
    : [];
  const normalizedReferences = references
    .map(normalizeReference)
    .filter((reference) => reference.url || reference.title);

  if (normalizedReferences.length > 0) {
    return normalizedReferences;
  }

  const sourceReference = normalizeReference(card.source);
  return sourceReference.url || sourceReference.title ? [sourceReference] : [];
}

function normalizeReference(reference = {}) {
  const url = reference.url ?? "";

  return {
    id: reference.id || createId("ref"),
    url,
    title: reference.title ?? "",
    startSeconds: reference.startSeconds ?? parseYouTubeStartSeconds(url),
  };
}

function resetWizardForCreate() {
  wizardDraft = createEmptyWizardDraft();
  wizardMode = "create";
  editingCardId = null;
  wizardStepIndex = 0;
  chordEntryIndex = 0;
  rhythmChordIndex = 0;
  wizardReferenceIndex = 0;
  dotNextRhythm = false;
  tieNextRhythm = false;
  rhythmMessage = "";
  tapTempoTimes = [];
  setAddCardStatus("");
  renderWizard();
}

function normalizeExtensionTokens(extensions) {
  const normalized = extensions.map((extension) => {
    if (extension === "add9") return "9";
    if (extension === "add11") return "11";
    return extension;
  });

  return normalized.filter((extension) => getAvailableExtensionsForChord().includes(extension));
}

function renderWizard() {
  if (!wizardStep || !wizardProgress) {
    return;
  }

  wizardProgress.innerHTML = WIZARD_STEPS.map((step, index) => (
    `<button type="button" class="${index === wizardStepIndex ? "active" : ""}" data-wizard-step="${index}" aria-label="Go to ${step}">${index + 1}</button>`
  )).join("");
  addCardTitle.textContent = wizardMode === "edit" ? "Edit Card" : "Add Card";
  wizardStep.innerHTML = `${renderEditQuickActions()}${getWizardStepHtml()}`;
  wizardBackButton.hidden = wizardStepIndex === 0;
  wizardNextButton.textContent = wizardStepIndex === WIZARD_STEPS.length - 1
    ? (wizardMode === "edit" ? "Save changes" : "Save card")
    : "Next";
  bindWizardStepEvents();
}

function renderEditQuickActions() {
  if (wizardMode !== "edit") {
    return "";
  }

  return `
    <div class="edit-quick-actions">
      <button class="secondary-action" type="button" data-cancel-edit>Cancel</button>
      <button class="primary-action" type="button" data-save-edit>Save changes</button>
    </div>
  `;
}

function getWizardStepHtml() {
  const step = WIZARD_STEPS[wizardStepIndex];

  if (step === "Context") {
    return `
      <div class="wizard-step-copy"><h3>Set the musical context</h3><p>Start with the key environment the card should be generated from.</p></div>
      <div class="form-grid">
        ${selectField("wizard-mode", "Mode", [["major", "Major"], ["minor", "Minor"]], wizardDraft.mode)}
        ${selectField("wizard-key", "Default key", library.settings.allowedKeys.map((key) => [key, key]), wizardDraft.defaultKey)}
        ${selectField("wizard-time-signature", "Time signature", TIME_SIGNATURE_OPTIONS.map((value) => [value, value]), wizardDraft.timeSignature)}
        ${numberField("wizard-tempo", "Default tempo", wizardDraft.tempo.default)}
        ${numberField("wizard-tempo-variation", "Tempo variation %", wizardDraft.tempo.variationPercent, 0, 40)}
      </div>
      <div class="tap-tempo-row">
        <button class="secondary-action" type="button" id="tap-tempo">Tap tempo</button>
        <span id="tempo-range-label">${escapeHtml(getTempoRangeLabel())}</span>
      </div>
    `;
  }

  if (step === "Count") {
    return `
      <div class="wizard-step-copy"><h3>How many chords?</h3><p>Choose the number of chords in the progression.</p></div>
      <div class="form-row compact-row">${numberField("wizard-chord-count", "Number of chords", wizardDraft.chordCount, 1, 12)}</div>
    `;
  }

  if (step === "Chords") {
    return `
      <div class="wizard-step-copy"><h3>Define chord ${getCurrentChordEntryIndex() + 1}</h3><p>Degree first, then accidental, quality, colour, and optional display label.</p></div>
      ${renderChordDefinitionStrip()}
      ${renderChordWizardControls(wizardDraft.chords[getCurrentChordEntryIndex()], getCurrentChordEntryIndex())}
    `;
  }

  if (step === "Rhythm") {
    return renderRhythmStep();
  }

  if (step === "Variations") {
    return `
      <div class="wizard-step-copy"><h3>Playback variation</h3><p>Choose what should change when this card is played in recognition sessions.</p></div>
      <div class="choice-grid">
        <button class="choice-button ${wizardDraft.variation.varyKey ? "active" : ""}" type="button" data-card-variation="varyKey">Random key</button>
        <button class="choice-button ${wizardDraft.variation.varyTempo ? "active" : ""}" type="button" data-card-variation="varyTempo">Random tempo</button>
      </div>
      <div class="wizard-step-copy compact-copy"><h3>Chord inversions</h3><p>Set whether eligible chords can be inverted during playback.</p></div>
      <div class="choice-grid">
        <button class="choice-button ${allVariationsAre("fixed") ? "active" : ""}" type="button" data-variation="fixed">Fixed root position</button>
        <button class="choice-button ${allVariationsAre("allow-inversions") ? "active" : ""}" type="button" data-variation="allow-inversions">Allow inversions later</button>
      </div>
      <div class="wizard-step-copy compact-copy"><h3>Rhythm variation</h3><p>Let playback reattack chords in controlled rhythmic patterns while keeping each chord's total length.</p></div>
      <div class="choice-grid">
        <button class="choice-button ${wizardDraft.rhythmVariation.level === "off" ? "active" : ""}" type="button" data-rhythm-variation="off">Off</button>
        <button class="choice-button ${wizardDraft.rhythmVariation.level === "simple" ? "active" : ""}" type="button" data-rhythm-variation="simple">Simple</button>
        <button class="choice-button ${wizardDraft.rhythmVariation.level === "medium" ? "active" : ""}" type="button" data-rhythm-variation="medium">Medium</button>
      </div>
    `;
  }

  if (step === "Source") {
    return renderReferenceWizardStep();
  }

  if (step === "Name") {
    return `
      <div class="wizard-step-copy"><h3>Name the item</h3><p>Give the card a memorable title and any aliases you use for it.</p></div>
      <div class="form-grid">
        ${inputField("wizard-title", "Title", wizardDraft.title, "text", "Axis progression")}
        ${inputField("wizard-aliases", "Aliases", wizardDraft.aliases.join(", "), "text", "I-V-vi-IV, Let It Be progression")}
      </div>
    `;
  }

  return `
    <div class="wizard-step-copy"><h3>Save to lists</h3><p>Select one or more lists, or create a new list for this card.</p></div>
    <div class="list-checkbox-grid">
      ${library.lists.map((list) => `
        <label class="checkbox-card">
          <input type="checkbox" value="${escapeHtml(list.id)}" ${wizardDraft.listIds.includes(list.id) ? "checked" : ""} data-wizard-list />
          <span>${escapeHtml(list.name)}</span>
        </label>
      `).join("")}
    </div>
    <div class="form-row">${inputField("wizard-new-list", "New list", wizardDraft.newListName, "text", "R&B progressions")}</div>
  `;
}

function renderChordWizardControls(chord, index) {
  return `
    <div class="form-grid">
      ${selectField("wizard-chord-degree", "Degree", [[1, "I"], [2, "II"], [3, "III"], [4, "IV"], [5, "V"], [6, "VI"], [7, "VII"]], chord.degree)}
      ${selectField("wizard-chord-accidental", "Accidental", [["natural", "Natural"], ["flat", "Flat"], ["sharp", "Sharp"]], chord.accidental)}
      ${selectField("wizard-chord-quality", "Quality", [["major", "Major"], ["minor", "Minor"], ["diminished", "Diminished"], ["augmented", "Augmented"], ["sus2", "Sus2"], ["sus4", "Sus4"]], chord.quality)}
      ${inputField("wizard-chord-label", "Display label", chord.label, "text", "Auto, or V/V7")}
    </div>
    ${renderExtensionPicker(chord)}
    <div class="wizard-subnav">
      <button class="secondary-action" type="button" id="wizard-prev-chord" ${index === 0 ? "disabled" : ""}>Previous chord</button>
      <span>Chord ${index + 1} of ${wizardDraft.chordCount}</span>
      <button class="secondary-action" type="button" id="wizard-next-chord">${index === wizardDraft.chordCount - 1 ? "Done with chords" : "Next chord"}</button>
    </div>
  `;
}

function renderReferenceWizardStep() {
  ensureWizardReference();
  const reference = wizardDraft.references[wizardReferenceIndex];

  return `
    <div class="wizard-step-copy"><h3>Add references</h3><p>Add one or more songs or source clips that use this progression. You can edit one reference at a time.</p></div>
    <div class="reference-tabs" aria-label="References">
      ${wizardDraft.references.map((item, index) => `
        <button class="reference-tab ${index === wizardReferenceIndex ? "active" : ""}" type="button" data-reference-jump="${index}">
          ${escapeHtml(getReferenceTabLabel(item, index))}
        </button>
      `).join("")}
      <button class="reference-tab add-reference-tab" type="button" data-add-reference>+ Add reference</button>
    </div>
    <div class="reference-editor">
      <div class="form-grid">
        ${inputField("wizard-reference-url", "YouTube/source URL", reference.url, "url")}
        ${inputField("wizard-reference-title", "Source title or note", reference.title)}
      </div>
      <div class="button-row">
        <button class="secondary-action" type="button" data-prev-reference ${wizardReferenceIndex === 0 ? "disabled" : ""}>Previous reference</button>
        <button class="secondary-action" type="button" data-next-reference ${wizardReferenceIndex === wizardDraft.references.length - 1 ? "disabled" : ""}>Next reference</button>
        <button class="danger-action compact-danger" type="button" data-remove-reference ${wizardDraft.references.length === 1 ? "disabled" : ""}>Remove</button>
      </div>
    </div>
  `;
}

function ensureWizardReference() {
  if (!Array.isArray(wizardDraft.references) || wizardDraft.references.length === 0) {
    wizardDraft.references = [createEmptyReference()];
  }

  wizardReferenceIndex = clampNumber(wizardReferenceIndex, 0, wizardDraft.references.length - 1);
}

function getReferenceTabLabel(reference, index) {
  return reference.title?.trim() || `Reference ${index + 1}`;
}

function renderChordDefinitionStrip() {
  return `
    <div class="chord-definition-strip" aria-label="Chord definitions" id="chord-definition-strip">
      ${getChordDefinitionStripHtml()}
    </div>
  `;
}

function getChordDefinitionStripHtml() {
  return wizardDraft.chords.map((chord, index) => `
    <button class="chord-definition-chip ${index === chordEntryIndex ? "active" : ""}" type="button" data-chord-jump="${index}" aria-label="Edit chord ${index + 1}">
      <span>${index + 1}</span>
      <strong>${renderChordSymbol(chord)}</strong>
    </button>
  `).join("");
}

function refreshChordDefinitionStrip() {
  const strip = document.querySelector("#chord-definition-strip");

  if (!strip) {
    return;
  }

  strip.innerHTML = getChordDefinitionStripHtml();
  bindChordJumpEvents();
}

function renderExtensionPicker(chord) {
  return `
    <div class="extension-picker">
      ${EXTENSION_SLOTS.map((slot) => {
        return `
          <fieldset class="extension-slot">
            <legend>${escapeHtml(slot.label)}</legend>
            <div class="extension-alterations">
              ${slot.options.map(([token, label]) => `
                <label class="mini-check">
                  <input type="checkbox" value="${escapeHtml(token)}" ${chord.extensions.includes(token) ? "checked" : ""} data-extension-token />
                  <span>${escapeHtml(label)}</span>
                </label>
              `).join("")}
            </div>
          </fieldset>
        `;
      }).join("")}
    </div>
  `;
}

function renderRhythmStep() {
  const chord = wizardDraft.chords[rhythmChordIndex];

  return `
    <div class="wizard-step-copy"><h3>Rhythm for chord ${rhythmChordIndex + 1}</h3><p>Tap durations to fill the rhythm for this chord. Use dot before a duration to make the next value dotted.</p></div>
    ${renderRhythmStrip(wizardDraft.chords, wizardDraft.timeSignature, { activeIndex: rhythmChordIndex, editable: true })}
    <p class="status-message rhythm-message">${escapeHtml(rhythmMessage)}</p>
    <div class="rhythm-control-panel">
      <div class="rhythm-value-buttons">
        ${RHYTHM_VALUES.map((value) => `<button class="rhythm-button" type="button" data-rhythm-beats="${value.beats}" title="${value.name}" aria-label="${value.name}">${renderRhythmIcon(value.beats)}</button>`).join("")}
      </div>
      <div class="rhythm-edit-buttons">
        <button class="rhythm-button dot ${dotNextRhythm ? "active" : ""}" type="button" id="rhythm-dot">.</button>
        <button class="rhythm-button tie ${tieNextRhythm ? "active" : ""}" type="button" id="rhythm-tie" aria-label="Tie next rhythm">${renderTieIcon()}</button>
      <button class="secondary-action" type="button" id="rhythm-undo">Undo</button>
        <button class="secondary-action" type="button" id="rhythm-clear">Clear</button>
      </div>
    </div>
    <div class="wizard-subnav">
      <button class="secondary-action" type="button" id="wizard-prev-rhythm" ${rhythmChordIndex === 0 ? "disabled" : ""}>Previous chord</button>
      <span>${getRhythmBeatTotal(chord.rhythms)} beats</span>
      <button class="secondary-action" type="button" id="wizard-next-rhythm">${rhythmChordIndex === wizardDraft.chordCount - 1 ? "Done with rhythm" : "Next chord"}</button>
    </div>
  `;
}

function renderRhythmStrip(chords, timeSignature, options = {}) {
  return `
    <div class="rhythm-strip ${options.readOnly ? "readonly" : ""}">
      <div class="time-signature">${escapeHtml(timeSignature).replace("/", "<br />")}</div>
      <div class="rhythm-bars">${renderFullRhythmTimeline(chords, timeSignature, options)}</div>
    </div>
  `;
}

function renderFullRhythmTimeline(chords, timeSignature, options = {}) {
  const beatsPerBar = getBeatsPerBar(timeSignature);
  let beatTotal = 0;
  let html = "";

  chords.forEach((chord, chordIndex) => {
    const rhythmHtml = renderRhythmSymbols(chord.rhythms, beatsPerBar, beatTotal);
    beatTotal += getRhythmBeatTotal(chord.rhythms);

    html += `
      <button class="rhythm-chord-group ${chordIndex === options.activeIndex ? "active" : ""}" type="button" ${options.editable ? `data-rhythm-chord="${chordIndex}"` : "disabled"}>
        <span class="rhythm-chord-label">${renderChordSymbol(chord)}</span>
        <span class="rhythm-chord-symbols">${rhythmHtml}</span>
        <span class="rhythm-bracket" aria-hidden="true"></span>
      </button>
    `;
  });

  return html;
}

function renderRhythmSymbols(rhythms, beatsPerBar, startingBeat = 0) {
  let beatTotal = 0;
  let html = "";

  rhythms.forEach((rhythm, index) => {
    if (startingBeat + beatTotal > 0 && (startingBeat + beatTotal) % beatsPerBar === 0) {
      html += `<span class="bar-line"></span>`;
    }
    html += `<span class="rhythm-symbol ${rhythm.tiedFromPrevious ? "tied" : ""}" style="${getTieSpanStyle(rhythms, index)}">${renderRhythmIcon(rhythm.beats, rhythm.dotted)}</span>`;
    beatTotal += rhythm.beats;
  });

  return html || `<span class="rhythm-placeholder">Empty</span>`;
}

function getTieSpanStyle(rhythms, index) {
  if (!rhythms[index]?.tiedFromPrevious || index === 0) {
    return "";
  }

  const previous = rhythms[index - 1];
  const previousWidth = getRhythmSlotWidth(previous?.beats);
  const currentWidth = getRhythmSlotWidth(rhythms[index]?.beats);

  return `--tie-left: -${previousWidth / 2 + 5}px; --tie-right: ${currentWidth / 2 - 5}px;`;
}

function renderTieIcon() {
  return `
    <span class="tie-icon" aria-hidden="true">
      <span>${String.fromCodePoint(0x2669)}</span>
      <span>${String.fromCodePoint(0x2669)}</span>
    </span>
  `;
}

function renderRhythmIcon(beats, dotted = false) {
  const value = RHYTHM_VALUES.find((rhythmValue) => rhythmValue.beats === Number(beats)) ?? RHYTHM_VALUES[0];
  const src = `Rhythm%20value%20pngs/${value.asset}`;

  return `
    <span class="rhythm-icon-wrap ${getRhythmSizeClass(beats)}">
      <img class="rhythm-icon" src="${src}" alt="" aria-hidden="true" />
      ${dotted ? `<span class="rhythm-dot-mark" aria-hidden="true">.</span>` : ""}
    </span>
  `;
}

function getRhythmSizeClass(beats) {
  return Number(beats) === 4 ? "semibreve" : "";
}

function getRhythmSlotWidth(beats) {
  return Number(beats) === 4 ? 30 : 36;
}

function renderChordSymbol(chord) {
  if (isCustomChordLabel(chord)) {
    return escapeHtml(chord.label);
  }

  const playback = chord.playback ?? chord;
  const parts = getAutoChordSymbolParts({
    degree: Number(playback.degree),
    accidental: playback.accidental,
    quality: playback.quality,
    extensions: playback.extensions ?? [],
  });

  return `${escapeHtml(parts.base)}${escapeHtml(parts.qualitySuffix)}${parts.extensions.length > 0 ? `<sup>${parts.extensions.map(escapeHtml).join(",")}</sup>` : ""}`;
}

function bindWizardStepEvents() {
  const bindInput = (id, handler) => {
    const element = document.querySelector(`#${id}`);
    if (element) element.addEventListener("input", handler);
  };
  const bindChange = (id, handler) => {
    const element = document.querySelector(`#${id}`);
    if (element) element.addEventListener("change", handler);
  };

  bindChange("wizard-mode", (event) => (wizardDraft.mode = event.target.value));
  bindChange("wizard-key", (event) => (wizardDraft.defaultKey = event.target.value));
  bindChange("wizard-time-signature", (event) => {
    wizardDraft.timeSignature = event.target.value;
    tapTempoTimes = [];
  });
  bindInput("wizard-tempo", (event) => {
    wizardDraft.tempo.default = Number(event.target.value) || 92;
    updateWizardTempoRange();
    updateTempoRangeLabel();
  });
  bindInput("wizard-tempo-variation", (event) => {
    wizardDraft.tempo.variationPercent = clampNumber(Number(event.target.value) || 0, 0, 40);
    updateWizardTempoRange();
    updateTempoRangeLabel();
  });
  bindInput("wizard-chord-count", (event) => updateWizardChordCount(Number(event.target.value) || 1));
  bindInput("wizard-title", (event) => (wizardDraft.title = event.target.value));
  bindInput("wizard-aliases", (event) => (wizardDraft.aliases = splitCommaList(event.target.value)));
  bindInput("wizard-reference-url", (event) => {
    ensureWizardReference();
    wizardDraft.references[wizardReferenceIndex].url = event.target.value;
    wizardDraft.references[wizardReferenceIndex].startSeconds = parseYouTubeStartSeconds(event.target.value);
    wizardDraft.source = wizardDraft.references[0] ?? createEmptyReference();
  });
  bindInput("wizard-reference-title", (event) => {
    ensureWizardReference();
    wizardDraft.references[wizardReferenceIndex].title = event.target.value;
    wizardDraft.source = wizardDraft.references[0] ?? createEmptyReference();
  });
  bindInput("wizard-new-list", (event) => (wizardDraft.newListName = event.target.value));

  document.querySelectorAll("[data-wizard-list]").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      wizardDraft.listIds = Array.from(document.querySelectorAll("[data-wizard-list]:checked")).map((input) => input.value);
    });
  });

  document.querySelectorAll("[data-wizard-step]").forEach((button) => {
    button.addEventListener("click", () => {
      wizardStepIndex = Number(button.dataset.wizardStep);
      renderWizard();
    });
  });

  document.querySelector("#tap-tempo")?.addEventListener("click", handleTapTempo);
  document.querySelector("[data-cancel-edit]")?.addEventListener("click", cancelEditCard);
  document.querySelector("[data-save-edit]")?.addEventListener("click", saveWizardCard);

  document.querySelectorAll("[data-reference-jump]").forEach((button) => {
    button.addEventListener("click", () => {
      wizardReferenceIndex = Number(button.dataset.referenceJump);
      renderWizard();
    });
  });
  document.querySelector("[data-add-reference]")?.addEventListener("click", () => {
    ensureWizardReference();
    wizardDraft.references.push(createEmptyReference());
    wizardReferenceIndex = wizardDraft.references.length - 1;
    renderWizard();
  });
  document.querySelector("[data-remove-reference]")?.addEventListener("click", () => {
    ensureWizardReference();
    if (wizardDraft.references.length <= 1) return;
    wizardDraft.references.splice(wizardReferenceIndex, 1);
    wizardReferenceIndex = clampNumber(wizardReferenceIndex, 0, wizardDraft.references.length - 1);
    wizardDraft.source = wizardDraft.references[0] ?? createEmptyReference();
    renderWizard();
  });
  document.querySelector("[data-prev-reference]")?.addEventListener("click", () => {
    wizardReferenceIndex = Math.max(0, wizardReferenceIndex - 1);
    renderWizard();
  });
  document.querySelector("[data-next-reference]")?.addEventListener("click", () => {
    ensureWizardReference();
    wizardReferenceIndex = Math.min(wizardDraft.references.length - 1, wizardReferenceIndex + 1);
    renderWizard();
  });

  document.querySelectorAll("[data-card-variation]").forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.dataset.cardVariation;
      wizardDraft.variation[key] = !wizardDraft.variation[key];
      renderWizard();
    });
  });

  document.querySelectorAll("[data-rhythm-variation]").forEach((button) => {
    button.addEventListener("click", () => {
      wizardDraft.rhythmVariation.level = button.dataset.rhythmVariation;
      renderWizard();
    });
  });

  document.querySelectorAll("[data-variation]").forEach((button) => {
    button.addEventListener("click", () => {
      wizardDraft.chords = wizardDraft.chords.map((chord) => ({
        ...chord,
        variation: button.dataset.variation,
      }));
      renderWizard();
    });
  });

  bindChordWizardEvents();
  bindRhythmWizardEvents();
}

function bindChordWizardEvents() {
  const chord = wizardDraft.chords[getCurrentChordEntryIndex()];
  if (!chord) return;

  [["wizard-chord-degree", "degree"], ["wizard-chord-accidental", "accidental"], ["wizard-chord-quality", "quality"]].forEach(([id, key]) => {
    const element = document.querySelector(`#${id}`);
    if (element) element.addEventListener("change", (event) => {
      chord[key] = key === "degree" ? Number(event.target.value) : event.target.value;
      if (["degree", "quality"].includes(key)) {
        const availableExtensions = getAvailableExtensionsForChord(chord);
        chord.extensions = chord.extensions.filter((extension) => availableExtensions.includes(extension));
        renderWizard();
        return;
      }

      refreshChordDefinitionStrip();
    });
  });

  document.querySelectorAll("[data-extension-token]").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      chord.extensions = Array.from(document.querySelectorAll("[data-extension-token]:checked")).map((input) => input.value);
      refreshChordDefinitionStrip();
    });
  });

  const label = document.querySelector("#wizard-chord-label");
  if (label) label.addEventListener("input", (event) => {
    chord.label = event.target.value;
    refreshChordDefinitionStrip();
  });

  bindChordJumpEvents();

  document.querySelector("#wizard-prev-chord")?.addEventListener("click", () => {
    chordEntryIndex = Math.max(0, chordEntryIndex - 1);
    renderWizard();
  });
  document.querySelector("#wizard-next-chord")?.addEventListener("click", () => {
    const nextChord = chordEntryIndex + 1;
    if (nextChord < wizardDraft.chordCount) {
      chordEntryIndex = nextChord;
    } else {
      wizardStepIndex = 3;
      rhythmChordIndex = 0;
    }
    renderWizard();
  });
}

function bindChordJumpEvents() {
  document.querySelectorAll("[data-chord-jump]").forEach((button) => {
    button.addEventListener("click", () => {
      chordEntryIndex = Number(button.dataset.chordJump);
      renderWizard();
    });
  });
}

function bindRhythmWizardEvents() {
  document.querySelectorAll("[data-rhythm-beats]").forEach((button) => {
    button.addEventListener("click", () => {
      const baseBeats = Number(button.dataset.rhythmBeats);
      const dotted = dotNextRhythm;
      const beats = dotted ? baseBeats * 1.5 : baseBeats;
      const tiedFromPrevious = tieNextRhythm;

      if (!canAddRhythmValue(beats, tiedFromPrevious)) {
        rhythmMessage = "Input exceeds a bar. Use tie to continue across the bar.";
        renderWizard();
        return;
      }

      wizardDraft.chords[rhythmChordIndex].rhythms.push({
        beats,
        dotted,
        tiedFromPrevious,
        chordIndex: rhythmChordIndex,
      });
      wizardDraft.chords[rhythmChordIndex].duration = getRhythmBeatTotal(wizardDraft.chords[rhythmChordIndex].rhythms);
      dotNextRhythm = false;
      tieNextRhythm = false;
      rhythmMessage = "";
      renderWizard();
    });
  });
  document.querySelector("#rhythm-dot")?.addEventListener("click", () => {
    dotNextRhythm = !dotNextRhythm;
    renderWizard();
  });
  document.querySelector("#rhythm-tie")?.addEventListener("click", () => {
    tieNextRhythm = !tieNextRhythm;
    renderWizard();
  });
  document.querySelector("#rhythm-undo")?.addEventListener("click", () => {
    wizardDraft.chords[rhythmChordIndex].rhythms.pop();
    wizardDraft.chords[rhythmChordIndex].duration = getRhythmBeatTotal(wizardDraft.chords[rhythmChordIndex].rhythms) || 4;
    rhythmMessage = "";
    renderWizard();
  });
  document.querySelector("#rhythm-clear")?.addEventListener("click", () => {
    wizardDraft.chords[rhythmChordIndex].rhythms = [];
    wizardDraft.chords[rhythmChordIndex].duration = 4;
    dotNextRhythm = false;
    tieNextRhythm = false;
    rhythmMessage = "";
    renderWizard();
  });
  document.querySelectorAll("[data-rhythm-chord]").forEach((button) => {
    button.addEventListener("click", () => {
      rhythmChordIndex = Number(button.dataset.rhythmChord);
      rhythmMessage = "";
      renderWizard();
    });
  });
  document.querySelector("#wizard-prev-rhythm")?.addEventListener("click", () => {
    rhythmChordIndex = Math.max(0, rhythmChordIndex - 1);
    renderWizard();
  });
  document.querySelector("#wizard-next-rhythm")?.addEventListener("click", () => {
    if (rhythmChordIndex < wizardDraft.chordCount - 1) {
      rhythmChordIndex += 1;
    } else {
      wizardStepIndex += 1;
    }
    renderWizard();
  });
}

function handleWizardNext() {
  if (wizardStepIndex === WIZARD_STEPS.length - 1) {
    saveWizardCard();
    return;
  }

  wizardStepIndex += 1;
  renderWizard();
}

function handleWizardBack() {
  if (wizardStepIndex === 0) return;

  wizardStepIndex -= 1;
  renderWizard();
}

function updateWizardChordCount(count) {
  wizardDraft.chordCount = clampNumber(count, 1, 12);
  while (wizardDraft.chords.length < wizardDraft.chordCount) {
    wizardDraft.chords.push(createEmptyWizardDraft().chords[0]);
  }
  wizardDraft.chords = wizardDraft.chords.slice(0, wizardDraft.chordCount);
  chordEntryIndex = clampNumber(chordEntryIndex, 0, wizardDraft.chordCount - 1);
  rhythmChordIndex = clampNumber(rhythmChordIndex, 0, wizardDraft.chordCount - 1);
}

function getCurrentChordEntryIndex() {
  return clampNumber(chordEntryIndex, 0, wizardDraft.chordCount - 1);
}

function normalizeWizardReferences() {
  ensureWizardReference();
  return wizardDraft.references
    .map((reference) => normalizeReference({
      ...reference,
      url: reference.url.trim(),
      title: reference.title.trim(),
      startSeconds: parseYouTubeStartSeconds(reference.url),
    }))
    .filter((reference) => reference.url || reference.title);
}

async function saveWizardCard() {
  const title = wizardDraft.title.trim();
  const selectedListIds = uniqueValues(wizardDraft.listIds);
  const newListName = wizardDraft.newListName.trim();
  updateWizardTempoRange();

  if (!title) {
    wizardStepIndex = 6;
    openValidationModal("Please enter card name.");
    renderWizard();
    return;
  }

  if (selectedListIds.length === 0 && !newListName) {
    setAddCardStatus("Choose at least one list, or create a new one.");
    return;
  }

  const now = new Date().toISOString();
  const existingCard = wizardMode === "edit"
    ? library.cards.find((card) => card.id === editingCardId)
    : null;
  const cardId = existingCard?.id ?? createId("card");
  const newList = newListName
    ? {
        id: createId("list"),
        name: newListName,
        description: "Created from Add Card.",
        cardIds: [],
        createdAt: now,
        updatedAt: now,
      }
    : null;
  const listIds = uniqueValues([...selectedListIds, ...(newList ? [newList.id] : [])]);
  const references = normalizeWizardReferences();
  const primaryReference = references[0] ?? createEmptyReference();
  const chords = wizardDraft.chords.map((chord) => {
    const extensions = chord.extensions.filter((extension) => CHORD_EXTENSION_OPTIONS.includes(extension));
    const builtChord = makeChord({
      degree: Number(chord.degree),
      accidental: chord.accidental,
      quality: chord.quality,
      extensions,
      label: chord.label.trim() || formatChordLabel({
        degree: Number(chord.degree),
        accidental: chord.accidental,
        quality: chord.quality,
        extensions,
      }),
    });

    return {
      ...builtChord,
      rhythms: chord.rhythms,
      playback: {
        ...builtChord.playback,
        allowInversions: chord.variation === "allow-inversions",
      },
    };
  });
  const card = {
    id: cardId,
    type: "chord-progression",
    title,
    aliases: wizardDraft.aliases,
    mode: wizardDraft.mode,
    defaultKey: wizardDraft.defaultKey,
    timeSignature: wizardDraft.timeSignature || "4/4",
    tempo: {
      default: Number(wizardDraft.tempo.default) || 92,
      min: Number(wizardDraft.tempo.min) || 76,
      max: Number(wizardDraft.tempo.max) || 116,
    },
    source: primaryReference,
    references,
    variation: {
      varyKey: Boolean(wizardDraft.variation.varyKey),
      varyTempo: Boolean(wizardDraft.variation.varyTempo),
    },
    rhythmVariation: {
      level: ["off", "simple", "medium"].includes(wizardDraft.rhythmVariation.level)
        ? wizardDraft.rhythmVariation.level
        : "off",
    },
    chordDurations: wizardDraft.chords.map((chord) => getRhythmBeatTotal(chord.rhythms) || Number(chord.duration) || 4),
    chords,
    listIds,
    createdAt: existingCard?.createdAt ?? now,
    updatedAt: now,
  };
  const existingLists = library.lists.map((list) =>
    listIds.includes(list.id)
      ? { ...list, cardIds: uniqueValues([...list.cardIds, cardId]), updatedAt: now }
      : { ...list, cardIds: list.cardIds.filter((id) => id !== cardId), updatedAt: list.cardIds.includes(cardId) ? now : list.updatedAt },
  );

  library = {
    ...library,
    cards: existingCard
      ? library.cards.map((item) => (item.id === cardId ? card : item))
      : [...library.cards, card],
    lists: newList ? [...existingLists, { ...newList, cardIds: [cardId] }] : existingLists,
    progress: {
      recognition: {
        ...library.progress.recognition,
        [cardId]: library.progress.recognition[cardId] ?? createInitialProgress(),
      },
      audiation: {
        ...library.progress.audiation,
        [cardId]: library.progress.audiation[cardId] ?? createInitialProgress(),
      },
    },
  };

  await saveLibrary(library);
  wizardDraft = createEmptyWizardDraft();
  wizardStepIndex = 0;
  chordEntryIndex = 0;
  rhythmChordIndex = 0;
  wizardReferenceIndex = 0;
  dotNextRhythm = false;
  tieNextRhythm = false;
  rhythmMessage = "";
  tapTempoTimes = [];
  wizardMode = "create";
  editingCardId = null;
  renderLibraryViews();
  setAddCardStatus(existingCard ? `Saved changes to ${title}.` : `Saved ${title}.`);
  if (existingCard) {
    openCardDetail(cardId, cardDetailReturnViewId);
  } else {
    showView("cards");
  }
}

function getWizardChordLabel(chord) {
  return chord.label.trim() || formatChordLabel({
    degree: Number(chord.degree),
    accidental: chord.accidental,
    quality: chord.quality,
    extensions: chord.extensions,
  });
}

function getCardChordLabel(chord) {
  if (chord.label !== undefined && isCustomChordLabel(chord)) {
    return chord.label;
  }

  if (!chord.playback) {
    return getWizardChordLabel(chord);
  }

  return formatChordLabel({
    degree: Number(chord.playback.degree),
    accidental: chord.playback.accidental,
    quality: chord.playback.quality,
    extensions: chord.playback.extensions ?? [],
  });
}

function isCustomChordLabel(chord) {
  if (!chord.label?.trim()) {
    return false;
  }

  const playback = chord.playback ?? chord;
  const autoLabel = formatChordLabel({
    degree: Number(playback.degree),
    accidental: playback.accidental,
    quality: playback.quality,
    extensions: playback.extensions ?? [],
  });

  return chord.label.trim() !== autoLabel;
}

function cancelEditCard() {
  const cardId = editingCardId;

  resetWizardForCreate();
  if (cardId) {
    openCardDetail(cardId, cardDetailReturnViewId);
  } else {
    showView("cards");
  }
}

function updateWizardTempoRange() {
  const tempo = Number(wizardDraft.tempo.default) || 92;
  const variation = clampNumber(Number(wizardDraft.tempo.variationPercent) || 0, 0, 40);

  wizardDraft.tempo.variationPercent = variation;
  wizardDraft.tempo.min = Math.max(30, Math.round(tempo * (1 - variation / 100)));
  wizardDraft.tempo.max = Math.round(tempo * (1 + variation / 100));
}

function updateTempoRangeLabel() {
  const label = document.querySelector("#tempo-range-label");
  if (label) {
    label.textContent = getTempoRangeLabel();
  }
}

function getTempoRangeLabel() {
  updateWizardTempoRange();
  return `${wizardDraft.tempo.min}-${wizardDraft.tempo.max} bpm range`;
}

function handleTapTempo() {
  const now = performance.now();

  tapTempoTimes = [...tapTempoTimes.filter((time) => now - time < 5000), now].slice(-TAP_TEMPO_WINDOW);
  if (tapTempoTimes.length < 2) {
    setAddCardStatus("Tap a few times to find the tempo.");
    return;
  }

  const intervals = tapTempoTimes.slice(1).map((time, index) => time - tapTempoTimes[index]);
  const averageMs = intervals.reduce((sum, interval) => sum + interval, 0) / intervals.length;
  const [, denominator] = String(wizardDraft.timeSignature || "4/4").split("/").map(Number);
  const pulseAsQuarterBeats = denominator ? 4 / denominator : 1;
  const bpm = Math.round((60000 / averageMs) * pulseAsQuarterBeats);

  wizardDraft.tempo.default = clampNumber(bpm, 30, 240);
  updateWizardTempoRange();
  setAddCardStatus(`Tempo set to ${wizardDraft.tempo.default} bpm.`);
  renderWizard();
}

function getAvailableExtensionsForChord(chord) {
  return EXTENSION_SLOTS.flatMap((slot) => slot.options.map(([token]) => token));
}

function canAddRhythmValue(beats, tiedFromPrevious) {
  const beatsPerBar = getBeatsPerBar(wizardDraft.timeSignature);
  const currentBeat = getTotalRhythmBeatsBefore(rhythmChordIndex) + getRhythmBeatTotal(wizardDraft.chords[rhythmChordIndex].rhythms);

  if (tiedFromPrevious && currentBeat > 0) {
    return true;
  }

  const beatIntoBar = currentBeat % beatsPerBar;

  return beatIntoBar + beats <= beatsPerBar;
}

function getTotalRhythmBeatsBefore(chordIndex) {
  return wizardDraft.chords
    .slice(0, chordIndex)
    .reduce((sum, chord) => sum + getRhythmBeatTotal(chord.rhythms), 0);
}

function allVariationsAre(value) {
  return wizardDraft.chords.every((chord) => chord.variation === value);
}

function getRhythmBeatTotal(rhythms) {
  return rhythms.reduce((sum, rhythm) => sum + rhythm.beats, 0);
}

function getBeatsPerBar(timeSignature) {
  const [top, bottom] = String(timeSignature || "4/4").split("/").map(Number);
  return top && bottom ? top * (4 / bottom) : 4;
}

function selectField(id, label, options, value) {
  return `<div class="form-row"><label for="${id}">${label}</label><select id="${id}">${options.map(([optionValue, optionLabel]) => `<option value="${optionValue}" ${String(optionValue) === String(value) ? "selected" : ""}>${optionLabel}</option>`).join("")}</select></div>`;
}

function inputField(id, label, value, type = "text", placeholder = "") {
  return `<div class="form-row"><label for="${id}">${label}</label><input id="${id}" type="${type}" value="${escapeHtml(value ?? "")}" placeholder="${escapeHtml(placeholder)}" /></div>`;
}

function numberField(id, label, value, min = 40, max = 220) {
  return `<div class="form-row"><label for="${id}">${label}</label><input id="${id}" type="number" min="${min}" max="${max}" value="${escapeHtml(value)}" /></div>`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getVisibleProgress(card, direction) {
  const progress = {
    ...defaultProgress(),
    ...(library.progress[direction]?.[card.id] ?? {}),
  };

  if (["new", "challenge", "familiar", "comfortable"].includes(progress.state)) {
    progress.state = "live";
  }

  if (progress.state === "asleep" && isWakeTime(progress)) {
    return startWakeCycle(progress);
  }

  return progress;
}

function getProgressBadgeData(progress) {
  if (progress.state === "learned") {
    return {
      kind: "learned",
      icon: String.fromCharCode(10003),
      value: "",
      caption: "",
      title: "Learned",
    };
  }

  if (progress.state === "asleep") {
    return {
      kind: "asleep",
      icon: String.fromCharCode(9716),
      value: `${getDaysUntilWake(progress)}D`,
      caption: "",
      title: `${getDaysUntilWake(progress)} days until wake`,
    };
  }

  const toPass = getToPass(progress);
  const percent = getWakeProgressPercent(progress);

  return {
    kind: "live",
    icon: String.fromCharCode(9679),
    value: `${percent}%`,
    caption: `${toPass} to pass`,
    title: `${toPass} to pass`,
  };
}

function openProgressModal(cardId) {
  statusModalCardId = cardId;
  renderProgressModal();
}

function closeProgressModal() {
  statusModalCardId = null;
  document.querySelector(".modal-backdrop")?.remove();
}

function openValidationModal(message) {
  document.querySelector(".modal-backdrop")?.remove();
  document.body.insertAdjacentHTML("beforeend", `
    <div class="modal-backdrop" role="presentation">
      <div class="modal-panel" role="alertdialog" aria-modal="true" aria-labelledby="validation-modal-title">
        <h3 id="validation-modal-title">Missing information</h3>
        <p>${escapeHtml(message)}</p>
        <button class="primary-action" type="button" data-close-validation-modal>OK</button>
      </div>
    </div>
  `);
}

function renderProgressModal() {
  const card = library.cards.find((item) => item.id === statusModalCardId);
  if (!card) return;

  const progress = getVisibleProgress(card, "recognition");
  const actions = [];

  if (progress.state === "live") {
    actions.push(`<button class="primary-action" type="button" data-progress-action="learned">Mark as Fully Learned</button>`);
  } else if (progress.state === "asleep") {
    actions.push(`<button class="secondary-action" type="button" data-progress-action="reawaken">Reawaken</button>`);
    actions.push(`<button class="primary-action" type="button" data-progress-action="learned">Mark as Fully Learned</button>`);
  } else {
    actions.push(`<button class="secondary-action" type="button" data-progress-action="unlearn">Unlearn</button>`);
  }

  document.querySelector(".modal-backdrop")?.remove();
  document.body.insertAdjacentHTML("beforeend", `
    <div class="modal-backdrop" role="presentation">
      <div class="modal-panel" role="dialog" aria-modal="true" aria-labelledby="progress-modal-title">
        <h3 id="progress-modal-title">${escapeHtml(card.title)}</h3>
        <p>${escapeHtml(formatProgressState(progress))}</p>
        <div class="modal-actions">${actions.join("")}</div>
        <button class="secondary-action" type="button" data-close-progress-modal>Cancel</button>
      </div>
    </div>
  `);
}

async function applyProgressAction(action) {
  const card = library.cards.find((item) => item.id === statusModalCardId);
  if (!card) return;

  const currentProgress = {
    ...defaultProgress(),
    ...(library.progress.recognition[card.id] ?? {}),
  };
  let nextProgress = currentProgress;

  if (action === "learned") {
    nextProgress = {
      ...currentProgress,
      state: "learned",
      intervalDays: Math.max(currentProgress.intervalDays, 60),
      nextReviewAt: null,
    };
  }

  if (action === "reawaken") {
    nextProgress = startWakeCycle(currentProgress);
  }

  if (action === "unlearn") {
    nextProgress = {
      ...startWakeCycle(currentProgress),
      streak: 0,
      intervalDays: 0,
    };
  }

  library = {
    ...library,
    progress: {
      ...library.progress,
      recognition: {
        ...library.progress.recognition,
        [card.id]: nextProgress,
      },
    },
  };

  await saveLibrary(library);
  closeProgressModal();
  renderLibraryViews();
  if (detailCardId) renderCardDetail();
  if (document.body.classList.contains("session-mode") || cardDetailReturnViewId === "session") {
    renderTrainingCard();
  }
}

function formatProgressState(progress) {
  if (progress.state === "asleep") {
    return `asleep, wakes in ${getDaysUntilWake(progress)}D`;
  }

  if (progress.state === "learned") {
    return "learned";
  }

  return `live, ${getToPass(progress)} to pass`;
}

function getToPass(progress) {
  return Math.max(
    0,
    progress.requiredNetCorrectToSleep + progress.wakeWrongCount - progress.wakeCorrectCount,
  );
}

function getWakeProgressPercent(progress) {
  const maxToPass = Math.max(1, progress.maxToPassThisWake);
  const toPass = getToPass(progress);

  return Math.round(((maxToPass - toPass) / maxToPass) * 100);
}

function getDaysUntilWake(progress) {
  if (!progress.nextReviewAt) {
    return 0;
  }

  const msUntilWake = new Date(progress.nextReviewAt).getTime() - Date.now();

  return Math.max(0, Math.ceil(msUntilWake / 864e5));
}

function isWakeTime(progress) {
  return !progress.nextReviewAt || new Date(progress.nextReviewAt).getTime() <= Date.now();
}

function startWakeCycle(progress) {
  const requiredNetCorrectToSleep = getRequiredNetCorrectToSleep();

  return {
    ...progress,
    state: "live",
    nextReviewAt: null,
    wakeCorrectCount: 0,
    wakeWrongCount: 0,
    wakeLaterCount: 0,
    requiredNetCorrectToSleep,
    maxToPassThisWake: requiredNetCorrectToSleep,
  };
}

function getRequiredNetCorrectToSleep() {
  return Number(library.settings.requiredNetCorrectToSleep) || 2;
}

function openCardDetail(cardId, returnViewId = previousViewId) {
  detailCardId = cardId;
  cardDetailReturnViewId = returnViewId || "cards";
  detailReferenceIndex = 0;
  renderCardDetail();
  showView("card-detail");
}

function closeCardDetail() {
  showView(cardDetailReturnViewId || previousViewId || "cards");
}

function renderCardDetail() {
  const card = library.cards.find((item) => item.id === detailCardId);

  if (!card) {
    cardDetailContent.innerHTML = `
      <div class="panel">
        <h2 id="card-detail-title">Card not found</h2>
        <p>This card is no longer in the library.</p>
      </div>
    `;
    return;
  }

  const recognition = getVisibleProgress(card, "recognition");
  const badge = getProgressBadgeData(recognition);
  const listNames = library.lists
    .filter((list) => card.listIds.includes(list.id))
    .map((list) => list.name);
  const detailRhythmChords = getRhythmChordsForCard(card);

  cardDetailContent.innerHTML = `
    <article class="panel card-detail-layout">
      <div class="card-summary-row">
        <div>
          <p class="eyebrow">Card Detail</p>
          <h2 id="card-detail-title">${escapeHtml(card.title)}</h2>
          <p>${escapeHtml(card.aliases.join(", ") || "No aliases yet.")}</p>
          <button class="audio-toggle detail-play" type="button" data-play-card="${escapeHtml(card.id)}" aria-label="Play ${escapeHtml(card.title)}" title="Play">&#9654;</button>
        </div>
        <button class="progress-badge ${badge.kind}" type="button" title="${escapeHtml(badge.title)}" data-progress-card="${escapeHtml(card.id)}" aria-label="Change progress for ${escapeHtml(card.title)}">
          <span class="badge-icon">${badge.icon}</span>
          <strong>${escapeHtml(badge.value)}</strong>
          ${badge.caption ? `<small>${escapeHtml(badge.caption)}</small>` : ""}
        </button>
      </div>

      <section class="detail-section">
        <h3>Progression</h3>
        <div class="chord-row">
          ${card.chords.map((chord) => `<span class="pill chord-pill">${renderChordSymbol(chord)}</span>`).join("")}
        </div>
      </section>

      <section class="detail-section detail-grid">
        <div><span>Context</span><strong>${escapeHtml(card.mode)}</strong></div>
        <div><span>Default key</span><strong>${escapeHtml(card.defaultKey)}</strong></div>
        <div><span>Time</span><strong>${escapeHtml(card.timeSignature)}</strong></div>
        <div><span>Tempo</span><strong>${escapeHtml(card.tempo.default)} bpm</strong></div>
      </section>

      <section class="detail-section">
        <h3>Rhythm</h3>
        ${renderRhythmStrip(detailRhythmChords, card.timeSignature, { readOnly: true })}
      </section>

      <section class="detail-section">
        <h3>Lists</h3>
        <div class="alias-row">${listNames.map((name) => `<span class="pill">${escapeHtml(name)}</span>`).join("")}</div>
      </section>

      <section class="detail-section">
        ${renderReferenceDetailSection(card)}
      </section>

      <section class="detail-section detail-actions">
        <button class="secondary-action" type="button" data-edit-card="${escapeHtml(card.id)}">Edit</button>
        <button class="danger-action" type="button" data-confirm-delete="${escapeHtml(card.id)}">Delete</button>
      </section>
    </article>
  `;
  renderPlaybackButtons();
}

function renderReferenceDetailSection(card) {
  const references = getCardReferences(card);

  if (references.length === 0) {
    return `
      <h3>Reference</h3>
      <p>No embedded reference yet.</p>
    `;
  }

  detailReferenceIndex = clampNumber(detailReferenceIndex, 0, references.length - 1);
  const reference = references[detailReferenceIndex];
  const embedUrl = getYouTubeEmbedUrl(reference.url, reference.startSeconds);

  return `
    <div class="reference-detail-heading">
      <h3>Reference</h3>
      <span class="pill">${detailReferenceIndex + 1} of ${references.length}</span>
    </div>
    <div class="reference-tabs detail-reference-tabs" aria-label="Card references">
      ${references.map((item, index) => `
        <button class="reference-tab ${index === detailReferenceIndex ? "active" : ""}" type="button" data-detail-reference="${index}">
          ${escapeHtml(getReferenceTabLabel(item, index))}
        </button>
      `).join("")}
    </div>
    ${embedUrl ? `
      <iframe class="youtube-frame" id="source-player-${escapeHtml(card.id)}-${detailReferenceIndex}" src="${escapeHtml(embedUrl)}" title="${escapeHtml(reference.title || card.title)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    ` : `<p>This reference is saved, but it is not an embeddable YouTube link.</p>`}
    <div class="reference-actions">
      <button class="secondary-action" type="button" data-reference-prev ${detailReferenceIndex === 0 ? "disabled" : ""}>Previous</button>
      <button class="secondary-action source-restart" type="button" data-restart-source="${escapeHtml(card.id)}" data-reference-index="${detailReferenceIndex}" ${embedUrl ? "" : "disabled"}>Restart clip</button>
      <button class="secondary-action" type="button" data-reference-next ${detailReferenceIndex === references.length - 1 ? "disabled" : ""}>Next</button>
      ${reference.url ? `<a class="secondary-action source-link-button" href="${escapeHtml(reference.url)}" target="_blank" rel="noreferrer">${escapeHtml(reference.title || "Open source")}</a>` : ""}
    </div>
  `;
}

function startEditCard(cardId) {
  const card = library.cards.find((item) => item.id === cardId);

  if (!card) {
    return;
  }

  wizardDraft = createWizardDraftFromCard(card);
  wizardMode = "edit";
  editingCardId = card.id;
  wizardStepIndex = 0;
  chordEntryIndex = 0;
  rhythmChordIndex = 0;
  dotNextRhythm = false;
  tieNextRhythm = false;
  rhythmMessage = "";
  tapTempoTimes = [];
  setAddCardStatus(`Editing ${card.title}.`);
  renderWizard();
  showView("add-card");
}

function getRhythmChordsForCard(card) {
  return card.chords.map((chord, index) => ({
    ...chord,
    rhythms: Array.isArray(chord.rhythms) && chord.rhythms.length > 0
      ? chord.rhythms
      : [{
          beats: chordDurationToBeats(card.chordDurations?.[index], card.timeSignature),
          dotted: false,
          tiedFromPrevious: false,
          chordIndex: index,
        }],
  }));
}

function chordDurationToBeats(duration, timeSignature = "4/4") {
  if (typeof duration === "number") {
    return duration;
  }

  const normalizedDuration = String(duration ?? "").trim().toLowerCase();
  const amount = Number.parseFloat(normalizedDuration) || 1;

  if (normalizedDuration.includes("bar")) {
    return amount * getBeatsPerBar(timeSignature);
  }

  if (normalizedDuration.includes("beat")) {
    return amount;
  }

  return 4;
}

async function deleteCard(cardId) {
  const cardWasInSession = trainingQueue.some((card) => card.id === cardId);
  const nextRecognition = { ...library.progress.recognition };
  const nextAudiation = { ...library.progress.audiation };

  closeDeleteModal();
  delete nextRecognition[cardId];
  delete nextAudiation[cardId];

  library = {
    ...library,
    cards: library.cards.filter((card) => card.id !== cardId),
    lists: library.lists.map((list) => ({
      ...list,
      cardIds: list.cardIds.filter((id) => id !== cardId),
    })),
    progress: {
      recognition: nextRecognition,
      audiation: nextAudiation,
    },
  };

  await saveLibrary(library);
  detailCardId = null;
  renderLibraryViews();

  if (cardWasInSession) {
    finishTrainingSession();
    return;
  }

  closeCardDetail();
}

async function deleteList(listId) {
  const list = library.lists.find((item) => item.id === listId);

  if (!list) {
    return;
  }

  closeDeleteModal();

  library = {
    ...library,
    lists: library.lists.filter((item) => item.id !== listId),
    cards: library.cards.map((card) => ({
      ...card,
      listIds: (card.listIds ?? []).filter((id) => id !== listId),
    })),
  };

  if (selectedListId === listId) {
    selectedListId = library.lists[0]?.id ?? null;
  }

  if (selectedTrainingListId === listId) {
    finishTrainingSession();
    selectedTrainingListId = null;
  }

  await saveLibrary(library);
  renderLibraryViews();
  setStatus(`Deleted list "${list.name}". Cards were kept.`);
}

function openDeleteModal(cardId) {
  const card = library.cards.find((item) => item.id === cardId);
  if (!card) return;

  document.querySelector(".modal-backdrop")?.remove();
  document.body.insertAdjacentHTML("beforeend", `
    <div class="modal-backdrop" role="presentation">
      <div class="modal-panel danger-modal" role="dialog" aria-modal="true" aria-labelledby="delete-modal-title">
        <h3 id="delete-modal-title">Delete ${escapeHtml(card.title)}?</h3>
        <p>This will remove the card from every list and delete its progress.</p>
        <div class="button-row">
          <button class="secondary-action" type="button" data-close-delete-modal>Cancel</button>
          <button class="danger-action" type="button" data-delete-card="${escapeHtml(card.id)}">Yes, delete</button>
        </div>
      </div>
    </div>
  `);
}

function openDeleteListModal(listId) {
  const list = library.lists.find((item) => item.id === listId);
  if (!list) return;

  document.querySelector(".modal-backdrop")?.remove();
  document.body.insertAdjacentHTML("beforeend", `
    <div class="modal-backdrop" role="presentation">
      <div class="modal-panel danger-modal" role="dialog" aria-modal="true" aria-labelledby="delete-list-modal-title">
        <h3 id="delete-list-modal-title">Delete ${escapeHtml(list.name)}?</h3>
        <p>This only deletes the collection. Cards inside it will stay in your library.</p>
        <div class="button-row">
          <button class="secondary-action" type="button" data-close-delete-modal>Cancel</button>
          <button class="danger-action" type="button" data-delete-list="${escapeHtml(list.id)}">Yes, delete list</button>
        </div>
      </div>
    </div>
  `);
}

function closeDeleteModal() {
  document.querySelector(".modal-backdrop")?.remove();
}

function restartSourceClip(cardId, referenceIndex = detailReferenceIndex) {
  const card = library.cards.find((item) => item.id === cardId);
  const references = card ? getCardReferences(card) : [];
  const index = Number.isFinite(Number(referenceIndex)) ? clampNumber(Number(referenceIndex), 0, Math.max(0, references.length - 1)) : 0;
  const reference = references[index];
  const iframe = document.querySelector(`#source-player-${CSS.escape(cardId)}-${index}`);

  if (!card || !reference || !iframe?.contentWindow) {
    return;
  }

  const start = Number(reference.startSeconds) || parseYouTubeStartSeconds(reference.url) || 0;
  iframe.contentWindow.postMessage(JSON.stringify({ event: "command", func: "seekTo", args: [start, true] }), "*");
  iframe.contentWindow.postMessage(JSON.stringify({ event: "command", func: "playVideo", args: [] }), "*");
}

function stopReferencePlayback() {
  document.querySelectorAll(".youtube-frame").forEach((iframe) => {
    try {
      iframe.contentWindow?.postMessage(JSON.stringify({ event: "command", func: "stopVideo", args: [] }), "*");
    } catch (error) {
      // Cross-origin iframe command failures can be ignored.
    }
  });
}

function getYouTubeEmbedUrl(url, startSeconds) {
  const videoId = getYouTubeVideoId(url);

  if (!videoId) {
    return "";
  }

  const start = Number(startSeconds) || parseYouTubeStartSeconds(url) || 0;
  return `https://www.youtube.com/embed/${videoId}?start=${start}&enablejsapi=1`;
}

function getYouTubeVideoId(url) {
  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname.includes("youtu.be")) {
      return parsedUrl.pathname.replace("/", "");
    }

    if (parsedUrl.searchParams.get("v")) {
      return parsedUrl.searchParams.get("v");
    }

    const embedMatch = parsedUrl.pathname.match(/\/embed\/([^/?]+)/);
    return embedMatch?.[1] ?? "";
  } catch {
    return "";
  }
}

function renderTrainingSetup() {
  const selectedValue = trainingListSelect.value;

  trainingListSelect.innerHTML = "";

  library.lists.forEach((list) => {
    const option = document.createElement("option");
    const liveCount = getLiveCardsForList(list).length;

    option.value = list.id;
    option.textContent = `${list.name} (${liveCount} live)`;
    trainingListSelect.append(option);
  });

  if (library.lists.some((list) => list.id === selectedValue)) {
    trainingListSelect.value = selectedValue;
  } else if (selectedListId) {
    trainingListSelect.value = selectedListId;
  }

  startTrainingButton.disabled = library.lists.length === 0;
  updateTrainingListNote();
}

function renderSettings() {
  sleepTargetSelect.value = String(getRequiredNetCorrectToSleep());
  renderAllowedKeySettings();
  renderCloudSync();
}

function renderAllowedKeySettings() {
  if (!settingsKeys) {
    return;
  }

  settingsKeys.innerHTML = ALL_PLAYBACK_KEYS.map((key) => `
    <label class="mini-check key-check">
      <input type="checkbox" value="${escapeHtml(key)}" ${library.settings.allowedKeys.includes(key) ? "checked" : ""} data-settings-key />
      <span>${escapeHtml(key)}</span>
    </label>
  `).join("");
}

function renderCloudSync() {
  if (!cloudSignedOut || !cloudSignedIn) {
    return;
  }

  const isSignedIn = Boolean(currentSupabaseUser);

  cloudSignedOut.hidden = isSignedIn;
  cloudSignedIn.hidden = !isSignedIn;

  if (cloudUser) {
    cloudUser.textContent = isSignedIn
      ? `Signed in as ${currentSupabaseUser.email ?? "your Supabase user"}`
      : "";
  }
}

async function updateSleepTargetSetting() {
  library = {
    ...library,
    settings: {
      ...library.settings,
      requiredNetCorrectToSleep: Number(sleepTargetSelect.value),
    },
  };

  await saveLibrary(library);
  renderLibraryViews();
  setStatus("Settings saved.");
}

async function updateAllowedKeysSetting() {
  const selectedKeys = Array.from(document.querySelectorAll("[data-settings-key]:checked")).map((input) => input.value);
  const allowedKeys = selectedKeys.length > 0 ? selectedKeys : [library.settings.allowedKeys[0] ?? "C"];

  library = {
    ...library,
    settings: {
      ...library.settings,
      allowedKeys,
    },
  };

  await saveLibrary(library);
  renderLibraryViews();
  setStatus("Allowed keys saved.");
}

function startTrainingSession() {
  const selectedList = library.lists.find((list) => list.id === trainingListSelect.value);

  if (!selectedList) {
    return;
  }

  if (selectedList.cardIds.length === 0) {
    trainingListNote.textContent = "This list has no cards yet.";
    return;
  }

  selectedTrainingListId = selectedList.id;
  trainingQueue = getLiveCardsForList(selectedList);
  sessionDueTotal = trainingQueue.length;
  sessionAttemptCount = 0;
  previousTrainingCardId = null;
  currentTrainingIndex = 0;

  if (sessionDueTotal === 0) {
    trainingListNote.textContent = "All cards are learned.";
    return;
  }

  renderTrainingCard();
  showView("session");
}

function renderTrainingCard() {
  const currentCard = getCurrentTrainingCard();

  stopScheduledPlayback();
  answerPanel.hidden = true;
  sessionDetails.hidden = true;
  answerTitle.textContent = "";
  answerAliases.textContent = "";
  answerChords.innerHTML = "";
  revealAnswerButton.hidden = false;
  trainingPlayButton.hidden = false;
  orientKeyButton.hidden = false;
  sessionProgressStrip.hidden = false;

  if (!currentCard) {
    renderSessionComplete();
    return;
  }

  trainingCard.hidden = false;
  sessionTitle.textContent = "Listen first";
  trainingPromptTitle.textContent = "Play the card, name it in your head, then reveal.";
  trainingPlayButton.dataset.playCard = currentCard.id;
  trainingPlayButton.dataset.trainingPlay = "progression";
  trainingPlayButton.setAttribute("aria-label", `Play ${currentCard.title}`);
  trainingPlayButton.title = "Play";
  trainingProgress.textContent = getTrainingCounterText();
  prepareTrainingPlayback(currentCard);
  renderSessionProgress(currentCard);
  renderPlaybackButtons();
  playTrainingQuestionIntro();
}

function renderSessionProgress(card) {
  const progress = getVisibleProgress(card, "recognition");
  const toPass = getToPass(progress);
  const percent = progress.state === "live" ? getWakeProgressPercent(progress) : 0;

  sessionProgressState.textContent =
    progress.state === "live" ? `${toPass} to pass` : formatProgressState(progress);
  sessionProgressPercent.textContent = progress.state === "live" ? `${percent}%` : "";
  sessionProgressFill.style.width = `${percent}%`;
  sessionWrongCount.textContent = progress.wakeWrongCount;
  sessionCorrectCount.textContent = progress.wakeCorrectCount;
  sessionLaterCount.textContent = progress.wakeLaterCount;
}

function prepareTrainingPlayback(card) {
  if (currentTrainingPlayback?.cardId === card.id && currentTrainingPlayback?.queueIndex === currentTrainingIndex) {
    return currentTrainingPlayback;
  }

  currentTrainingPlayback = {
    cardId: card.id,
    queueIndex: currentTrainingIndex,
    playbackContext: createPlaybackContext(card),
    introPlayed: false,
  };

  return currentTrainingPlayback;
}

function playTrainingQuestionIntro() {
  const currentCard = getCurrentTrainingCard();
  const trainingPlayback = currentCard ? prepareTrainingPlayback(currentCard) : null;

  if (!currentCard || !trainingPlayback || trainingPlayback.introPlayed) {
    return;
  }

  trainingPlayback.introPlayed = true;
  playCardProgression(currentCard, trainingPlayButton, {
    playbackContext: trainingPlayback.playbackContext,
    includeOrientation: true,
  });
}

function playTrainingProgressionOnly() {
  const currentCard = getCurrentTrainingCard();
  const trainingPlayback = currentCard ? prepareTrainingPlayback(currentCard) : null;

  if (!currentCard || !trainingPlayback) {
    return;
  }

  playCardProgression(currentCard, trainingPlayButton, {
    playbackContext: trainingPlayback.playbackContext,
  });
}

function playTrainingOrientationOnly() {
  const currentCard = getCurrentTrainingCard();
  const trainingPlayback = currentCard ? prepareTrainingPlayback(currentCard) : null;

  if (!currentCard || !trainingPlayback) {
    return;
  }

  playCardProgression(currentCard, orientKeyButton, {
    playbackContext: trainingPlayback.playbackContext,
    orientationOnly: true,
  });
}

function revealTrainingAnswer() {
  const currentCard = getCurrentTrainingCard();

  if (!currentCard) {
    return;
  }

  answerTitle.textContent = currentCard.title;
  answerAliases.textContent = currentCard.aliases.join(", ");
  answerChords.innerHTML = "";
  currentCard.chords.forEach((chord) => {
    const pill = document.createElement("span");

    pill.className = "pill chord-pill";
    pill.innerHTML = renderChordSymbol(chord);
    answerChords.append(pill);
  });
  answerPanel.hidden = false;
}

function finishTrainingSession() {
  stopScheduledPlayback();
  trainingQueue = [];
  currentTrainingIndex = 0;
  trainingCard.hidden = true;
  sessionProgressStrip.hidden = true;
  sessionDetails.hidden = true;
  currentTrainingPlayback = null;
  showView("train");
}

function renderSessionComplete() {
  stopScheduledPlayback();
  trainingCard.hidden = false;
  sessionTitle.textContent = "Training complete";
  trainingPromptTitle.textContent = "You have reviewed every live card in this list.";
  trainingProgress.textContent = `${sessionDueTotal} of ${sessionDueTotal}`;
  trainingPlayButton.hidden = true;
  orientKeyButton.hidden = true;
  revealAnswerButton.hidden = true;
  sessionProgressStrip.hidden = true;
  answerPanel.hidden = true;
  sessionDetails.hidden = true;
}

function toggleSessionDetails() {
  const currentCard = getCurrentTrainingCard();

  if (!currentCard) {
    return;
  }

  openCardDetail(currentCard.id, "session");
}

async function gradeTrainingCard(grade) {
  const currentCard = getCurrentTrainingCard();

  if (!currentCard) {
    return;
  }

  const existingProgress = library.progress.recognition[currentCard.id] ?? defaultProgress();
  const nextProgress = applySpacedRepetitionGrade(existingProgress, grade);

  library = {
    ...library,
    progress: {
      ...library.progress,
      recognition: {
        ...library.progress.recognition,
        [currentCard.id]: nextProgress,
      },
    },
  };

  await saveLibrary(library);
  renderLibraryViews();
  previousTrainingCardId = currentCard.id;
  sessionAttemptCount += 1;
  currentTrainingIndex += 1;
  currentTrainingPlayback = null;

  renderTrainingCard();
}

function applySpacedRepetitionGrade(progress, grade) {
  const now = new Date();
  let nextProgress = {
    ...defaultProgress(),
    ...progress,
    lastReviewedAt: now.toISOString(),
    lastGrade: grade,
    lastGradeAt: now.toISOString(),
  };

  if (nextProgress.state === "asleep" && isWakeTime(nextProgress)) {
    nextProgress = startWakeCycle(nextProgress);
  }

  if (grade === "wrong") {
    const ease = clampNumber(nextProgress.ease - 0.2, 1.3, 3.2);
    const wakeWrongCount = nextProgress.wakeWrongCount + 1;
    const maxToPassThisWake = Math.max(
      nextProgress.maxToPassThisWake,
      nextProgress.requiredNetCorrectToSleep + wakeWrongCount - nextProgress.wakeCorrectCount,
    );

    return {
      ...nextProgress,
      state: "live",
      intervalDays: 0,
      ease,
      streak: 0,
      lapses: nextProgress.lapses + 1,
      wakeWrongCount,
      maxToPassThisWake,
      nextReviewAt: null,
    };
  }

  if (grade === "later") {
    const ease = clampNumber(nextProgress.ease - 0.05, 1.3, 3.2);

    return {
      ...nextProgress,
      state: "live",
      ease,
      wakeLaterCount: nextProgress.wakeLaterCount + 1,
      nextReviewAt: null,
    };
  }

  const wakeCorrectCount = nextProgress.wakeCorrectCount + 1;
  const progressWithCorrect = {
    ...nextProgress,
    wakeCorrectCount,
  };

  if (getToPass(progressWithCorrect) > 0) {
    return {
      ...progressWithCorrect,
      state: "live",
      nextReviewAt: null,
    };
  }

  const streak = nextProgress.streak + 1;
  const intervalDays = getNextComfortableInterval(nextProgress.intervalDays, nextProgress.ease, streak);
  const ease = clampNumber(nextProgress.ease + 0.08, 1.3, 3.2);

  return {
    ...progressWithCorrect,
    state: intervalDays >= 60 ? "learned" : "asleep",
    intervalDays,
    ease,
    streak,
    nextReviewAt: addDays(now, intervalDays).toISOString(),
  };
}

function getLiveCardsForList(list) {
  return list.cardIds
    .map((cardId) => library.cards.find((card) => card.id === cardId))
    .filter(Boolean)
    .filter((card) => isCardLive(card, "recognition"));
}

function isCardLive(card, direction) {
  const progress = getVisibleProgress(card, direction);

  return progress.state !== "asleep" && progress.state !== "learned";
}

function updateTrainingListNote() {
  const selectedList = library.lists.find((list) => list.id === trainingListSelect.value);

  if (!selectedList) {
    trainingListNote.textContent = "Choose a list to train.";
    return;
  }

  const liveCount = getLiveCardsForList(selectedList).length;
  const totalCount = selectedList.cardIds.length;

  trainingListNote.textContent = `${liveCount} of ${totalCount} cards live for recognition.`;
}

function getTrainingCounterText() {
  return `${sessionAttemptCount + 1} of ${sessionDueTotal}`;
}

function getNextComfortableInterval(currentIntervalDays, ease, streak) {
  if (streak <= 1) {
    return 1;
  }

  if (streak === 2) {
    return 3;
  }

  return Math.max(4, Math.round(currentIntervalDays * ease));
}

function clampNumber(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function getCurrentTrainingCard() {
  return trainingQueue[currentTrainingIndex] ?? null;
}

function addDays(date, days) {
  const nextDate = new Date(date);

  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
}

function addMinutes(date, minutes) {
  const nextDate = new Date(date);

  nextDate.setMinutes(nextDate.getMinutes() + minutes);
  return nextDate;
}

function playCardById(cardId, triggerButton = null, options = {}) {
  const card = library.cards.find((item) => item.id === cardId);

  if (!card) {
    setPlaybackStatus("No card available to play.");
    return;
  }

  playCardProgression(card, triggerButton, options);
}

async function playCardProgression(card, triggerButton = null, options = {}) {
  stopReferencePlayback();
  stopScheduledPlayback();
  const runId = ++playbackRunId;
  const playbackContext = options.playbackContext ?? createPlaybackContext(card);

  activePlaybackCardId = card.id;
  activePlaybackContext = playbackContext;
  renderPlaybackButtons();
  setPlaybackStatus(`Loading ${card.title} in ${playbackContext.key} at ${playbackContext.tempo} bpm.`);

  const beatMs = 60000 / playbackContext.tempo;
  const playbackEvents = getProgressionPlaybackEvents(card, beatMs, playbackContext, options);
  const totalMs = playbackEvents.reduce((sum, event) => sum + event.durationMs, 0);
  let elapsedMs = 0;

  try {
    await resumeSamplePlayback();
    await preloadPlaybackSamples(card, playbackEvents);
  } catch (error) {
    stopScheduledPlayback();
    setPlaybackStatus("Could not load one of the piano samples for this progression.");
    return;
  }

  if (activePlaybackCardId !== card.id || runId !== playbackRunId) {
    return;
  }

  setPlaybackStatus(`Playing ${card.title} in ${playbackContext.key} at ${playbackContext.tempo} bpm.`);

  playbackEvents.forEach((event) => {
    const chordMs = event.durationMs;
    const timeoutId = window.setTimeout(() => {
      if (runId !== playbackRunId) {
        return;
      }

      if (event.rest) {
        fadeOutChord(activeChordAudios, getChordFadeMs(chordMs));
        return;
      }

      const notes = chordToNotes(event.chord, card, event);

      fadeOutChord(activeChordAudios, getChordFadeMs(chordMs));
      playChord(notes);
    }, elapsedMs);

    playbackTimeouts.push(timeoutId);
    elapsedMs += chordMs;
  });

  const doneId = window.setTimeout(() => {
    if (runId !== playbackRunId) {
      return;
    }

    const finalChordMs = playbackEvents.at(-1)?.durationMs ?? beatMs * 4;

    fadeOutChord(activeChordAudios, getChordFadeMs(finalChordMs));
    activePlaybackCardId = null;
    activePlaybackContext = null;
    renderPlaybackButtons();
    setPlaybackStatus("Ready to play.");
    playbackTimeouts = [];
  }, totalMs + getChordFadeMs(playbackEvents.at(-1)?.durationMs ?? beatMs * 4) + 100);

  playbackTimeouts.push(doneId);
}

function createPlaybackContext(card) {
  const allowedKeys = card.variation?.varyKey
    ? getAllowedPlaybackKeys(card)
    : [card.defaultKey || "C"];
  const minTempo = Number(card.tempo?.min) || Number(card.tempo?.default) || 90;
  const maxTempo = Number(card.tempo?.max) || Number(card.tempo?.default) || minTempo;
  const tempoMin = Math.min(minTempo, maxTempo);
  const tempoMax = Math.max(minTempo, maxTempo);
  const defaultTempo = Number(card.tempo?.default) || 90;

  return {
    key: pickRandom(allowedKeys),
    tempo: card.variation?.varyTempo ? randomInteger(tempoMin, tempoMax) : defaultTempo,
    rhythmPlan: createRhythmVariationPlan(card),
  };
}

function getAllowedPlaybackKeys(card) {
  const allowedKeys = Array.isArray(library.settings.allowedKeys) && library.settings.allowedKeys.length > 0
    ? library.settings.allowedKeys
    : [card.defaultKey || "C"];

  return allowedKeys;
}

function createRhythmVariationPlan(card) {
  const level = card.rhythmVariation?.level ?? "off";

  if (!["simple", "medium"].includes(level)) {
    return null;
  }

  return card.chords.map((chord, chordIndex) => {
    const totalBeats = getChordTotalBeatsForVariation(card, chord, chordIndex);

    return pickRandom(getRhythmVariationCandidates(totalBeats, level));
  });
}

function getChordTotalBeatsForVariation(card, chord, chordIndex) {
  if (Array.isArray(chord.rhythms) && chord.rhythms.length > 0) {
    return getRhythmBeatTotal(chord.rhythms);
  }

  return chordDurationToBeats(card.chordDurations?.[chordIndex], card.timeSignature);
}

function getRhythmVariationCandidates(totalBeats, level) {
  const beats = roundBeatValue(Number(totalBeats) || 1);
  const candidates = [[beats]];

  if (beats < 1.5) {
    return candidates;
  }

  addVariationCandidate(candidates, [beats / 2, beats / 2], beats);

  if (beats >= 2) {
    addVariationCandidate(candidates, [beats - 1, 1], beats);
    addVariationCandidate(candidates, [1, beats - 1], beats);
  }

  if (level === "medium") {
    if (beats >= 3) {
      addVariationCandidate(candidates, [1, 1, beats - 2], beats);
      addVariationCandidate(candidates, [beats - 2, 1, 1], beats);
    }

    if (beats >= 2) {
      addVariationCandidate(candidates, [1.5, 0.5, beats - 2], beats);
      addVariationCandidate(candidates, [0.5, 1.5, beats - 2], beats);
    }

    if (beats >= 4) {
      addVariationCandidate(candidates, [1, 1, 1, beats - 3], beats);
      addVariationCandidate(candidates, [2, 1, 1], beats);
      addVariationCandidate(candidates, [1, 1, 2], beats);
    }
  }

  return candidates;
}

function addVariationCandidate(candidates, values, expectedTotal) {
  const normalizedValues = values
    .map(roundBeatValue)
    .filter((value) => value >= 0.5);
  const total = roundBeatValue(normalizedValues.reduce((sum, value) => sum + value, 0));

  if (normalizedValues.length === values.length && total === roundBeatValue(expectedTotal)) {
    candidates.push(normalizedValues);
  }
}

function roundBeatValue(value) {
  return Math.round(value * 4) / 4;
}

function getPlaybackEvents(card, beatMs, playbackContext) {
  const events = [];

  card.chords.forEach((chord, chordIndex) => {
    const inversion = getPlaybackInversion(chord);
    const variationBeats = playbackContext.rhythmPlan?.[chordIndex];
    const rhythms = Array.isArray(variationBeats) && variationBeats.length > 0
      ? variationBeats.map((beats) => ({ beats, tiedFromPrevious: false }))
      : Array.isArray(chord.rhythms) && chord.rhythms.length > 0
      ? chord.rhythms
      : [{ beats: chordDurationToBeats(card.chordDurations[chordIndex], card.timeSignature), tiedFromPrevious: false }];

    rhythms.forEach((rhythm) => {
      const durationMs = (Number(rhythm.beats) || 1) * beatMs;

      if (rhythm.tiedFromPrevious && events.length > 0) {
        events[events.length - 1].durationMs += durationMs;
        return;
      }

      events.push({ chord, durationMs, key: playbackContext.key, inversion });
    });
  });

  return events.length > 0
    ? events
    : [{ chord: card.chords[0], durationMs: beatMs * 4, key: playbackContext.key, inversion: 0 }];
}

function getProgressionPlaybackEvents(card, beatMs, playbackContext, options = {}) {
  const orientationEvents = options.includeOrientation || options.orientationOnly
    ? getOrientationPlaybackEvents(card, playbackContext)
    : [];

  if (options.orientationOnly) {
    return orientationEvents;
  }

  const progressionEvents = getPlaybackEvents(card, beatMs, playbackContext);

  return options.includeOrientation
    ? [...orientationEvents, { rest: true, durationMs: 1000 }, ...progressionEvents]
    : progressionEvents;
}

function getOrientationPlaybackEvents(card, playbackContext) {
  const orientationBeatMs = 600;
  const isMinor = card.mode === "minor";
  const orientationChords = [
    makeOrientationChord(1, isMinor ? "minor" : "major", isMinor ? "i" : "I"),
    makeOrientationChord(4, isMinor ? "minor" : "major", isMinor ? "iv" : "IV"),
    makeOrientationChord(5, "major", "V"),
    makeOrientationChord(1, isMinor ? "minor" : "major", isMinor ? "i" : "I"),
  ];

  return orientationChords.map((chord) => ({
    chord,
    durationMs: orientationBeatMs,
    key: playbackContext.key,
    inversion: 0,
    orientation: true,
  }));
}

function makeOrientationChord(degree, quality, label) {
  return makeChord({
    degree,
    quality,
    label,
  });
}

function stopScheduledPlayback() {
  playbackRunId += 1;
  playbackTimeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
  fadeTimers.forEach((timerId) => {
    window.clearInterval(timerId);
    window.clearTimeout(timerId);
  });
  playbackTimeouts = [];
  fadeTimers = [];
  stopAudios(activeChordAudios);
  stopAudios(fadingChordAudios);
  activeChordAudios = [];
  fadingChordAudios = [];
  activePlaybackCardId = null;
  activePlaybackContext = null;
  renderPlaybackButtons();
}

function chordToNotes(chord, card, playbackEvent = {}) {
  const rootMidi = chordRootToMidi(chord.playback, playbackEvent.key || card.defaultKey, {
    keepScaleOctave: Boolean(playbackEvent.orientation),
  });
  const qualityIntervals = CHORD_QUALITIES[chord.playback.quality] ?? CHORD_QUALITIES.major;
  const extensionIntervals = chord.playback.extensions
    .map((extension) => EXTENSION_INTERVALS[extension])
    .filter((interval) => Number.isInteger(interval));
  const intervals = applyInversion([...qualityIntervals, ...extensionIntervals], playbackEvent.inversion || 0);

  return intervals.map((interval) => midiToNoteName(rootMidi + interval));
}

function chordRootToMidi(playback, key, options = {}) {
  const keyMidi = noteNameToMidi(`${key}4`);
  const degreeOffset = MAJOR_SCALE[playback.degree - 1] ?? 0;
  const accidentalOffset = playback.accidental === "flat" ? -1 : playback.accidental === "sharp" ? 1 : 0;
  let rootMidi = keyMidi + degreeOffset + accidentalOffset;

  if (!options.keepScaleOctave && rootMidi >= keyMidi + 7) {
    rootMidi -= 12;
  }

  return rootMidi;
}

function applyInversion(intervals, inversion) {
  const sortedIntervals = intervals.slice().sort((a, b) => a - b);
  const inversionCount = clampNumber(inversion, 0, Math.max(0, sortedIntervals.length - 1));

  for (let index = 0; index < inversionCount; index += 1) {
    sortedIntervals.push(sortedIntervals.shift() + 12);
  }

  return sortedIntervals;
}

function getPlaybackInversion(chord) {
  if (!chord.playback?.allowInversions) {
    return 0;
  }

  const chordToneCount =
    (CHORD_QUALITIES[chord.playback.quality]?.length ?? CHORD_QUALITIES.major.length) +
    (chord.playback.extensions?.length ?? 0);

  return randomInteger(0, Math.min(2, Math.max(0, chordToneCount - 1)));
}

function pickRandom(values) {
  return values[Math.floor(Math.random() * values.length)];
}

function randomInteger(min, max) {
  const low = Math.ceil(min);
  const high = Math.floor(max);

  return Math.floor(Math.random() * (high - low + 1)) + low;
}

function noteNameToMidi(noteName) {
  const match = noteName.match(/^([A-G][#b]?)(-?\d)$/);

  if (!match) {
    return 60;
  }

  const [, pitchName, octaveText] = match;
  return normalizePitchIndex(pitchName) + (Number(octaveText) + 1) * 12;
}

function midiToNoteName(midi) {
  const pitchName = NOTE_NAMES[((midi % 12) + 12) % 12];
  const octave = Math.floor(midi / 12) - 1;

  return `${pitchName}${octave}`;
}

function getAudioContext() {
  if (!audioContext) {
    const Context = window.AudioContext || window.webkitAudioContext;

    if (!Context) {
      throw new Error("Web Audio is not supported in this browser.");
    }

    audioContext = new Context();
  }

  return audioContext;
}

async function resumeSamplePlayback() {
  const context = getAudioContext();

  if (context.state === "suspended") {
    await context.resume();
  }

  return context;
}

async function loadSampleBuffer(note) {
  if (sampleBufferCache.has(note)) {
    return sampleBufferCache.get(note);
  }

  const response = await fetch(`${SAMPLE_ROOT}/${encodeURIComponent(note)}.ogg`);

  if (!response.ok) {
    throw new Error(`Missing sample ${note}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const buffer = await getAudioContext().decodeAudioData(arrayBuffer);

  sampleBufferCache.set(note, buffer);
  return buffer;
}

async function preloadPlaybackSamples(card, playbackEvents) {
  const notes = new Set();

  playbackEvents.forEach((event) => {
    if (event.rest) {
      return;
    }

    chordToNotes(event.chord, card, event).forEach((note) => notes.add(note));
  });

  await Promise.all(Array.from(notes).map((note) => loadSampleBuffer(note)));
}

function playChord(notes) {
  const context = getAudioContext();
  const startAt = context.currentTime + 0.02;
  const voices = [];

  notes.forEach((note) => {
    const buffer = sampleBufferCache.get(note);

    if (!buffer) {
      return;
    }

    const source = context.createBufferSource();
    const gain = context.createGain();

    source.buffer = buffer;
    gain.gain.setValueAtTime(0.82, startAt);
    source.connect(gain).connect(context.destination);
    source.start(startAt);
    voices.push({ source, gain });
  });

  activeChordAudios = voices;
}

function chordDurationToMs(duration, beatMs) {
  if (typeof duration === "number") {
    return duration * beatMs;
  }

  const normalizedDuration = String(duration).trim().toLowerCase();
  const amount = Number.parseFloat(normalizedDuration) || 1;

  if (normalizedDuration.includes("bar")) {
    return amount * beatMs * 4;
  }

  if (normalizedDuration.includes("beat")) {
    return amount * beatMs;
  }

  return beatMs * 4;
}

function normalizePitchIndex(pitchName) {
  const normalizedName = FLAT_NOTE_NAMES[pitchName] ?? pitchName;
  const index = NOTE_NAMES.indexOf(normalizedName);

  return index >= 0 ? index : 0;
}

function renderPlaybackButtons() {
  document.querySelectorAll("[data-play-card]").forEach((button) => {
    const isPlaying = button.dataset.playCard === activePlaybackCardId;

    button.classList.toggle("playing", isPlaying);
    button.textContent = String.fromCharCode(isPlaying ? 9632 : 9654);
    button.setAttribute("aria-label", `${isPlaying ? "Stop" : "Play"} ${getCardTitle(button.dataset.playCard)}`);
    button.title = isPlaying ? "Stop" : "Play";
  });
}

function getCardTitle(cardId) {
  return library.cards.find((card) => card.id === cardId)?.title ?? "card";
}

function setPlaybackButtonsDisabled(isDisabled) {
  document.querySelectorAll("[data-play-card]").forEach((button) => {
    button.disabled = isDisabled;
  });
}

function getChordFadeMs(chordMs) {
  return Math.min(420, Math.max(160, chordMs * 0.12));
}

function fadeOutChord(audios, fadeMs) {
  if (audios.length === 0) {
    return;
  }

  const fadingAudios = audios.slice();
  const context = getAudioContext();
  const now = context.currentTime;
  const stopAt = now + fadeMs / 1000;

  activeChordAudios = [];
  fadingChordAudios.push(...fadingAudios);

  fadingAudios.forEach((voice) => {
    try {
      voice.gain.gain.cancelScheduledValues(now);
      voice.gain.gain.setValueAtTime(voice.gain.gain.value || 0.82, now);
      voice.gain.gain.linearRampToValueAtTime(0.0001, stopAt);
      voice.source.stop(stopAt + 0.04);
    } catch (error) {
      // The source may already have ended naturally.
    }
  });

  const timerId = window.setTimeout(() => {
    fadeTimers = fadeTimers.filter((id) => id !== timerId);
    fadingChordAudios = fadingChordAudios.filter((voice) => !fadingAudios.includes(voice));
  }, fadeMs + 80);

  fadeTimers.push(timerId);
}

function stopAudios(voices) {
  voices.forEach((voice) => {
    try {
      voice.gain?.gain.cancelScheduledValues(getAudioContext().currentTime);
      voice.source?.stop();
    } catch (error) {
      // The source may already have stopped.
    }
  });
}

function downloadJson() {
  const backup = {
    ...library,
    exportedAt: new Date().toISOString(),
  };
  const blob = new Blob([JSON.stringify(backup, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const dateStamp = new Date().toISOString().slice(0, 10);

  link.href = url;
  link.download = `musical-vocabulary-backup-${dateStamp}.json`;
  link.click();
  URL.revokeObjectURL(url);
  setStatus("Exported library backup.");
}

function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}

async function importJson(event) {
  const [file] = event.target.files;

  if (!file) {
    return;
  }

  try {
    const text = await readFileAsText(file);
    const parsed = JSON.parse(text);
    const importedLibrary = normalizeLibrary(parsed);

    await saveLibrary(importedLibrary);
    renderLibraryViews();
    setStatus("Imported library backup.");
  } catch (error) {
    setStatus("Import failed. Please choose a valid JSON backup.");
    console.error(error);
  } finally {
    event.target.value = "";
  }
}

function getSupabaseClient() {
  if (supabaseClient) {
    return supabaseClient;
  }

  if (!window.supabase?.createClient) {
    return null;
  }

  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
  return supabaseClient;
}

async function initializeCloudSync() {
  const client = getSupabaseClient();

  if (!client) {
    setCloudStatus("Cloud sync could not load. Check your internet connection.");
    renderCloudSync();
    return;
  }

  const { data, error } = await client.auth.getSession();

  if (error) {
    setCloudStatus("Cloud sync could not check your login.");
    renderCloudSync();
    return;
  }

  currentSupabaseUser = data.session?.user ?? null;
  renderCloudSync();

  client.auth.onAuthStateChange((event, session) => {
    currentSupabaseUser = session?.user ?? null;
    renderCloudSync();

    if (event === "SIGNED_IN" && currentSupabaseUser) {
      syncCloudLibrary();
    }

    if (event === "SIGNED_OUT") {
      setCloudStatus("Logged out. This device will keep using local storage.");
    }
  });

  if (currentSupabaseUser) {
    await syncCloudLibrary();
  } else {
    setCloudStatus("Log in to sync this library across devices.");
  }
}

async function handleCloudLogin() {
  const client = getSupabaseClient();
  const email = cloudEmailInput?.value.trim();
  const password = cloudPasswordInput?.value;

  if (!client || !email || !password) {
    setCloudStatus("Enter your email and password.");
    return;
  }

  setCloudStatus("Logging in...");
  const { error } = await client.auth.signInWithPassword({ email, password });

  if (error) {
    setCloudStatus(error.message);
  }
}

async function handleCloudSignup() {
  const client = getSupabaseClient();
  const email = cloudEmailInput?.value.trim();
  const password = cloudPasswordInput?.value;

  if (!client || !email || !password) {
    setCloudStatus("Enter an email and password first.");
    return;
  }

  setCloudStatus("Creating account...");
  const { data, error } = await client.auth.signUp({ email, password });

  if (error) {
    setCloudStatus(error.message);
    return;
  }

  if (data.session) {
    setCloudStatus("Account created. Syncing library...");
  } else {
    setCloudStatus("Account created. Check your email if Supabase asks you to confirm it, then log in.");
  }
}

async function handleCloudLogout() {
  const client = getSupabaseClient();

  if (!client) {
    return;
  }

  await client.auth.signOut();
}

function queueCloudSave() {
  if (!currentSupabaseUser || cloudSyncInProgress) {
    return;
  }

  window.clearTimeout(cloudSaveTimer);
  setCloudStatus("Cloud save pending...");
  cloudSaveTimer = window.setTimeout(() => {
    pushLibraryToCloud();
  }, 900);
}

async function syncCloudLibrary() {
  const client = getSupabaseClient();

  if (!client || !currentSupabaseUser || cloudSyncInProgress) {
    return;
  }

  cloudSyncInProgress = true;
  window.clearTimeout(cloudSaveTimer);
  setCloudStatus("Checking cloud library...");

  try {
    const { data, error } = await client
      .from("libraries")
      .select("data, updated_at")
      .eq("user_id", currentSupabaseUser.id)
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (!data) {
      const saved = await pushLibraryToCloud({ silentStart: true });
      if (saved) setCloudStatus("Uploaded this device's library to cloud.");
      return;
    }

    const cloudLibrary = normalizeLibrary(data.data);
    const cloudTime = Date.parse(data.updated_at ?? cloudLibrary.updatedAt ?? 0);
    const localTime = Date.parse(library.updatedAt ?? 0);

    if (cloudTime > localTime + 1000) {
      await saveLibrary(cloudLibrary, { syncCloud: false, preserveUpdatedAt: true });
      renderLibraryViews();
      setCloudStatus("Downloaded latest cloud library.");
      return;
    }

    if (localTime > cloudTime + 1000) {
      const saved = await pushLibraryToCloud({ silentStart: true });
      if (saved) setCloudStatus("Uploaded latest local library.");
      return;
    }

    setCloudStatus("Cloud library is up to date.");
  } catch (error) {
    setCloudStatus("Cloud sync failed. Local storage is still working.");
    console.error(error);
  } finally {
    cloudSyncInProgress = false;
    renderCloudSync();
  }
}

async function pushLibraryToCloud(options = {}) {
  const client = getSupabaseClient();

  if (!client || !currentSupabaseUser) {
    return false;
  }

  if (!options.silentStart) {
    setCloudStatus("Saving to cloud...");
  }

  try {
    const syncedAt = library.updatedAt ?? new Date().toISOString();
    const { error } = await client
      .from("libraries")
      .upsert(
        {
          user_id: currentSupabaseUser.id,
          data: library,
          updated_at: syncedAt,
        },
        { onConflict: "user_id" },
      );

    if (error) {
      throw error;
    }

    setCloudStatus(`Cloud saved ${formatShortDateTime(syncedAt)}.`);
    return true;
  } catch (error) {
    setCloudStatus("Cloud save failed. Your local copy is still saved.");
    console.error(error);
    return false;
  }
}

function formatShortDateTime(value) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "short",
  });
}

exportButton.addEventListener("click", downloadJson);
importInput.addEventListener("change", importJson);
cloudLoginButton?.addEventListener("click", handleCloudLogin);
cloudSignupButton?.addEventListener("click", handleCloudSignup);
cloudSyncNowButton?.addEventListener("click", syncCloudLibrary);
cloudLogoutButton?.addEventListener("click", handleCloudLogout);
startTrainingButton.addEventListener("click", startTrainingSession);
trainingListSelect.addEventListener("change", updateTrainingListNote);
sleepTargetSelect.addEventListener("change", updateSleepTargetSetting);
settingsKeys?.addEventListener("change", updateAllowedKeysSetting);
revealAnswerButton.addEventListener("click", revealTrainingAnswer);
finishSessionButton.addEventListener("click", finishTrainingSession);
orientKeyButton?.addEventListener("click", playTrainingOrientationOnly);
showCardDetailsButton.addEventListener("click", toggleSessionDetails);
wizardNextButton.addEventListener("click", handleWizardNext);
wizardBackButton.addEventListener("click", handleWizardBack);
cardDetailBackButton.addEventListener("click", closeCardDetail);
document.querySelectorAll("[data-grade]").forEach((button) => {
  button.addEventListener("click", () => gradeTrainingCard(button.dataset.grade));
});
document.addEventListener("click", (event) => {
  const playButton = event.target.closest("[data-play-card]");

  if (playButton) {
    if (playButton.dataset.trainingPlay) {
      if (playButton.dataset.playCard === activePlaybackCardId) {
        stopScheduledPlayback();
        setPlaybackStatus("Ready to play.");
        return;
      }

      playTrainingProgressionOnly();
      return;
    }

    if (playButton.dataset.playCard === activePlaybackCardId) {
      stopScheduledPlayback();
      setPlaybackStatus("Ready to play.");
      return;
    }

    playCardById(playButton.dataset.playCard, playButton);
    return;
  }

  const sourceRestartButton = event.target.closest("[data-restart-source]");
  if (sourceRestartButton) {
    restartSourceClip(sourceRestartButton.dataset.restartSource, sourceRestartButton.dataset.referenceIndex);
    return;
  }

  const detailReferenceButton = event.target.closest("[data-detail-reference]");
  if (detailReferenceButton) {
    stopReferencePlayback();
    detailReferenceIndex = Number(detailReferenceButton.dataset.detailReference);
    renderCardDetail();
    return;
  }

  if (event.target.closest("[data-reference-prev]")) {
    stopReferencePlayback();
    detailReferenceIndex = Math.max(0, detailReferenceIndex - 1);
    renderCardDetail();
    return;
  }

  if (event.target.closest("[data-reference-next]")) {
    stopReferencePlayback();
    detailReferenceIndex += 1;
    renderCardDetail();
    return;
  }

  const progressButton = event.target.closest("[data-progress-card]");
  if (progressButton) {
    openProgressModal(progressButton.dataset.progressCard);
    return;
  }

  const progressAction = event.target.closest("[data-progress-action]");
  if (progressAction) {
    applyProgressAction(progressAction.dataset.progressAction);
    return;
  }

  if (event.target.closest("[data-close-progress-modal]") || event.target.classList.contains("modal-backdrop")) {
    closeProgressModal();
    return;
  }

  if (event.target.closest("[data-close-validation-modal]")) {
    document.querySelector(".modal-backdrop")?.remove();
    return;
  }

  const editButton = event.target.closest("[data-edit-card]");
  if (editButton) {
    startEditCard(editButton.dataset.editCard);
    return;
  }

  const confirmDeleteButton = event.target.closest("[data-confirm-delete]");
  if (confirmDeleteButton) {
    openDeleteModal(confirmDeleteButton.dataset.confirmDelete);
    return;
  }

  const confirmDeleteListButton = event.target.closest("[data-confirm-delete-list]");
  if (confirmDeleteListButton) {
    openDeleteListModal(confirmDeleteListButton.dataset.confirmDeleteList);
    return;
  }

  if (event.target.closest("[data-close-delete-modal]")) {
    closeDeleteModal();
    return;
  }

  const deleteButton = event.target.closest("[data-delete-card]");
  if (deleteButton) {
    deleteCard(deleteButton.dataset.deleteCard);
    return;
  }

  const deleteListButton = event.target.closest("[data-delete-list]");
  if (deleteListButton) {
    deleteList(deleteListButton.dataset.deleteList);
    return;
  }

  const cardTile = event.target.closest("[data-card-detail]");
  if (cardTile) {
    const activeView = views.find((view) => view.classList.contains("active"));
    openCardDetail(cardTile.dataset.cardDetail, activeView?.id ?? "cards");
  }
});
document.addEventListener("keydown", (event) => {
  const cardTile = event.target.closest?.("[data-card-detail]");

  if (
    !cardTile ||
    event.target.closest("[data-play-card], [data-progress-card]") ||
    !["Enter", " "].includes(event.key)
  ) {
    return;
  }

  event.preventDefault();
  const activeView = views.find((view) => view.classList.contains("active"));
  openCardDetail(cardTile.dataset.cardDetail, activeView?.id ?? "cards");
});

loadLibrary()
  .then(() => {
    renderStats();
    renderLibraryViews();
    setStatus("Storage ready.");
    return initializeCloudSync();
  })
  .catch((error) => {
    setStatus("Storage could not start in this browser.");
    setCloudStatus("Cloud sync could not start.");
    console.error(error);
  });
