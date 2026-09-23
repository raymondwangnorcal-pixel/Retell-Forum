const views = [...document.querySelectorAll("[data-view]")];
const navButtons = [...document.querySelectorAll(".nav-item")];
const menuButton = document.querySelector(".menu-button");
const drawerScrim = document.querySelector(".drawer-scrim");
const assistForm = document.querySelector("#assist-form");
const assistQuery = document.querySelector("#assist-query");
const assistResponse = document.querySelector("#assist-response");
const responseTitle = document.querySelector("#response-title");
const responseCopy = document.querySelector("#response-copy");
const assistSuggestions = document.querySelector("#assist-suggestions");
const suggestionStatus = document.querySelector("#assist-suggestion-status");
const toast = document.querySelector("#prototype-toast");
let toastTimer;
let suggestionMatches = [];
let activeSuggestionIndex = -1;

const answerLibrary = [
  {
    pattern: /webhook|endpoint|event/i,
    title: "Check the webhook event and endpoint logs first",
    copy: "Retell sends post-call events after the call analysis completes. Confirm that your endpoint accepts POST requests, returns a 2xx response, and is subscribed to the event you expect.",
  },
  {
    pattern: /interrupt|mid-sentence|talk over/i,
    title: "Tune interruption sensitivity before changing the prompt",
    copy: "Start with interruption sensitivity and backchannel settings. Then test the same prompt against short acknowledgements, genuine interruptions, and background noise.",
  },
  {
    pattern: /transfer|handoff|live agent/i,
    title: "Choose the transfer mode that matches your call path",
    copy: "Use warm transfer when the agent should introduce the caller and context. Use cold transfer when the destination should receive the call immediately without an agent handoff step.",
  },
];

const searchLibrary = [
  {
    type: "Forum topic",
    title: "Global webhook URL not being used: caching issue?",
    description: "Troubleshoot an agent that keeps calling an older webhook endpoint.",
    keywords: "endpoint event publish cache 401",
    url: "https://community.retellai.com/t/global-webhook-url-not-being-used-caching-issue/772",
  },
  {
    type: "Forum topic",
    title: "V3 gateway speaks before the browser media path is live",
    description: "Diagnose clipped first words and begin-message timing in web calls.",
    keywords: "web call browser sdk audio start gateway delay",
    url: "https://community.retellai.com/t/v3-gateway-plays-the-agents-first-utterance-1s-before-the-browsers-media-path-is-live/3660",
  },
  {
    type: "Forum topic",
    title: "Agent continues its sentence after an interruption",
    description: "Discuss barge-in behavior, interruption sensitivity, and broken sentence fragments.",
    keywords: "mid sentence talk over caller interruption sensitivity",
    url: "https://community.retellai.com/t/agent-speaks-the-remainder-of-its-sentence-as-a-separate-turn-after-barge-in/3580",
  },
  {
    type: "Forum topic",
    title: "Accidentally deleted agent: recovery options",
    description: "See what configuration can be recovered after an agent is deleted.",
    keywords: "restore missing workspace account configuration",
    url: "https://community.retellai.com/t/accidentally-deleted-agent-need-restore/3047",
  },
  {
    type: "Support category",
    title: "Browse Support Help",
    description: "Read technical questions answered by Retell staff and community builders.",
    keywords: "help bug problem question troubleshooting solved",
    url: "https://community.retellai.com/c/support-help/6",
  },
  {
    type: "Guide",
    title: "Build your first phone agent in 15 minutes",
    description: "Create, test, deploy, and call a Retell voice agent.",
    keywords: "quick start beginner setup phone number",
    url: "https://docs.retellai.com/get-started/quick-start",
    newTab: true,
  },
  {
    type: "Guide",
    title: "Register and set up a Retell webhook",
    description: "Receive call events and verify your server integration.",
    keywords: "endpoint call started ended analyzed signature debug",
    url: "https://docs.retellai.com/features/register-webhook",
    newTab: true,
  },
  {
    type: "Guide",
    title: "Transfer a call to a human",
    description: "Configure cold, warm, and agentic warm transfers.",
    keywords: "handoff live agent transfer call route human",
    url: "https://docs.retellai.com/build/single-multi-prompt/transfer-call",
    newTab: true,
  },
  {
    type: "Guide",
    title: "Tune interruptions and background noise",
    description: "Adjust denoising and interruption sensitivity for natural conversations.",
    keywords: "barge in mid sentence talk over audio noise",
    url: "https://docs.retellai.com/build/handle-background-noise",
    newTab: true,
  },
  {
    type: "Guide",
    title: "Custom LLM integration best practices",
    description: "Keep a custom LLM voice agent fast, reliable, and conversational.",
    keywords: "websocket latency prompt tools response",
    url: "https://docs.retellai.com/integrate-llm/llm-best-practice",
    newTab: true,
  },
  {
    type: "Migration notice",
    title: "Move from V2 to V3 web calls",
    description: "Migrate the legacy browser SDK and Create Web Call integration.",
    keywords: "browser javascript sdk deprecation create web call",
    url: "https://docs.retellai.com/deprecation-notice/2026/09-30_create_web_call_v2",
    newTab: true,
  },
  {
    type: "Feature request",
    title: "Webhook replay for missed call events",
    description: "Follow the request to resend events after an application outage.",
    keywords: "retry resend recovery missed event",
    url: "https://community.retellai.com/t/request-webhook-replay-for-missed-call-events/1091",
  },
  {
    type: "Feature request",
    title: "More emotionally expressive realtime voices",
    description: "Join the discussion about voice emotion, naturalness, and latency.",
    keywords: "elevenlabs openai tts natural voice model",
    url: "https://community.retellai.com/t/request-more-emotionally-expressive-realtime-voices-eleven-v3-openai-level/856",
  },
  {
    type: "Roadmap",
    title: "Browse the Retell feature roadmap",
    description: "See what is next, in progress, and already shipped.",
    keywords: "product planned progress released features",
    url: "https://community.retellai.com/c/feature-roadmap/18",
  },
  {
    type: "Status",
    title: "Check Retell system status",
    description: "View live component uptime and incident history.",
    keywords: "outage incident operational down service health",
    url: "https://status.retellai.com/",
    newTab: true,
  },
];

function closeSuggestions() {
  suggestionMatches = [];
  activeSuggestionIndex = -1;
  assistSuggestions.hidden = true;
  assistQuery.setAttribute("aria-expanded", "false");
  assistQuery.removeAttribute("aria-activedescendant");
  suggestionStatus.textContent = "";
}

function setActiveSuggestion(index) {
  const options = [...assistSuggestions.querySelectorAll("[role='option']")];
  if (!options.length) return;

  activeSuggestionIndex = (index + options.length) % options.length;
  options.forEach((option, optionIndex) => {
    const active = optionIndex === activeSuggestionIndex;
    option.classList.toggle("is-active", active);
    option.setAttribute("aria-selected", String(active));
  });
  const activeOption = options[activeSuggestionIndex];
  assistQuery.setAttribute("aria-activedescendant", activeOption.id);
  activeOption.scrollIntoView({ block: "nearest" });
}

function suggestionScore(item, query, tokens) {
  const title = item.title.toLowerCase();
  const searchable = `${item.title} ${item.description} ${item.keywords} ${item.type}`.toLowerCase();
  if (!tokens.every((token) => searchable.includes(token))) return null;
  if (title.startsWith(query)) return 0;
  if (title.includes(query)) return 1;
  if (tokens.every((token) => title.includes(token))) return 2;
  return 3;
}

function renderSuggestions() {
  const query = assistQuery.value.trim().toLowerCase();
  if (query.length < 2) {
    closeSuggestions();
    return;
  }

  const tokens = query.split(/\s+/).filter(Boolean);
  const directMatches = searchLibrary
    .map((item) => ({ item, score: suggestionScore(item, query, tokens) }))
    .filter(({ score }) => score !== null)
    .sort((a, b) => a.score - b.score || a.item.title.localeCompare(b.item.title))
    .slice(0, 4)
    .map(({ item }) => item);

  suggestionMatches = [
    ...directMatches,
    {
      type: "Search all",
      title: `Search the Retell forum for “${assistQuery.value.trim()}”`,
      description: "See every matching discussion on the official community forum.",
      url: `https://community.retellai.com/search?q=${encodeURIComponent(assistQuery.value.trim())}`,
    },
  ];

  assistSuggestions.replaceChildren();
  suggestionMatches.forEach((item, index) => {
    const link = document.createElement("a");
    link.className = "suggestion-link";
    link.id = `assist-suggestion-${index}`;
    link.href = item.url;
    link.setAttribute("role", "option");
    link.setAttribute("aria-selected", "false");
    if (item.newTab) {
      link.target = "_blank";
      link.rel = "noreferrer";
    }

    const type = document.createElement("span");
    type.className = "suggestion-type";
    type.textContent = item.type;
    const title = document.createElement("span");
    title.className = "suggestion-title";
    title.textContent = item.title;
    const description = document.createElement("span");
    description.className = "suggestion-description";
    description.textContent = item.description;
    link.append(type, title, description);
    link.addEventListener("pointerenter", () => setActiveSuggestion(index));
    assistSuggestions.append(link);
  });

  activeSuggestionIndex = -1;
  assistSuggestions.hidden = false;
  assistQuery.setAttribute("aria-expanded", "true");
  assistQuery.removeAttribute("aria-activedescendant");
  suggestionStatus.textContent = `${suggestionMatches.length} suggestions available. Use the up and down arrow keys to review them.`;
}

function closeNavigation() {
  document.body.classList.remove("nav-open");
  menuButton?.setAttribute("aria-expanded", "false");
}

function setView(name, { focus = true } = {}) {
  const next = document.querySelector(`[data-view="${name}"]`);
  if (!next) return;

  views.forEach((view) => {
    const active = view === next;
    view.hidden = !active;
    view.classList.toggle("is-active", active);
  });

  navButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.viewTarget === name);
  });

  closeNavigation();
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (focus) {
    const heading = next.querySelector("h1");
    heading?.setAttribute("tabindex", "-1");
    heading?.focus({ preventScroll: true });
  }
  history.replaceState(null, "", name === "home" ? "#home" : `#${name}`);
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("[data-view-target]");
  if (target) setView(target.dataset.viewTarget);
});

menuButton?.addEventListener("click", () => {
  const willOpen = !document.body.classList.contains("nav-open");
  document.body.classList.toggle("nav-open", willOpen);
  menuButton.setAttribute("aria-expanded", String(willOpen));
});
drawerScrim?.addEventListener("click", closeNavigation);

document.querySelectorAll("[data-search-jump]").forEach((button) => {
  button.addEventListener("click", () => {
    setView("home", { focus: false });
    requestAnimationFrame(() => assistQuery.focus());
  });
});

assistQuery?.addEventListener("input", renderSuggestions);
assistQuery?.addEventListener("focus", renderSuggestions);
assistQuery?.addEventListener("keydown", (event) => {
  if (assistSuggestions.hidden) return;

  if (event.key === "ArrowDown") {
    event.preventDefault();
    setActiveSuggestion(activeSuggestionIndex + 1);
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    setActiveSuggestion(activeSuggestionIndex - 1);
  } else if (event.key === "Enter" && activeSuggestionIndex >= 0) {
    event.preventDefault();
    assistSuggestions.querySelectorAll("[role='option']")[activeSuggestionIndex]?.click();
  } else if (event.key === "Escape") {
    event.preventDefault();
    closeSuggestions();
  } else if (event.key === "Tab") {
    closeSuggestions();
  }
});

document.addEventListener("click", (event) => {
  if (!assistForm?.contains(event.target)) closeSuggestions();
});

assistForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = assistQuery.value.trim();
  if (!query) {
    assistQuery.focus();
    return;
  }
  closeSuggestions();
  const answer = answerLibrary.find((item) => item.pattern.test(query)) ?? {
    title: "Start with the closest solved discussion",
    copy: "We found related questions from Retell builders. Compare your configuration and recent logs, then ask the community with the details that differ from the solved examples.",
  };
  responseTitle.textContent = answer.title;
  responseCopy.textContent = answer.copy;
  assistResponse.hidden = false;
  assistResponse.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

document.querySelectorAll("[data-support-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.supportFilter;
    document.querySelectorAll("[data-support-filter]").forEach((item) => item.classList.toggle("is-active", item === button));
    document.querySelectorAll("[data-topic-status]").forEach((topic) => {
      topic.hidden = filter !== "all" && topic.dataset.topicStatus !== filter;
    });
  });
});

const checklist = document.querySelector("#onboarding-checklist");
const progressCount = document.querySelector("#progress-count");
checklist?.addEventListener("change", () => {
  const boxes = [...checklist.querySelectorAll("input")];
  const complete = boxes.filter((box) => box.checked).length;
  document.querySelector(".progress-ring").style.setProperty("--progress", `${(complete / boxes.length) * 100}%`);
  progressCount.textContent = `${complete}/${boxes.length} complete`;
  if (complete === boxes.length) showToast("You’re set up. This space can now show topics you follow.");
});

document.querySelector("[data-dismiss-onboarding]")?.addEventListener("click", (event) => {
  const panel = event.currentTarget.closest(".onboarding-panel");
  panel.hidden = true;
  showToast("Getting started is still available under Learn.");
});

function showToast(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.hidden = false;
  toastTimer = setTimeout(() => { toast.hidden = true; }, 3600);
}

const initialView = location.hash.replace("#", "");
if (initialView && document.querySelector(`[data-view="${initialView}"]`)) {
  setView(initialView, { focus: false });
}
