const views = [...document.querySelectorAll("[data-view]")];
const navButtons = [...document.querySelectorAll(".nav-item")];
const menuButton = document.querySelector(".menu-button");
const drawerScrim = document.querySelector(".drawer-scrim");
const assistForm = document.querySelector("#assist-form");
const assistQuery = document.querySelector("#assist-query");
const assistResponse = document.querySelector("#assist-response");
const responseTitle = document.querySelector("#response-title");
const responseCopy = document.querySelector("#response-copy");
const composeDialog = document.querySelector("#compose-dialog");
const composeForm = document.querySelector("#compose-form");
const composeTitle = document.querySelector("#compose-title");
const composeContext = document.querySelector("#compose-context");
const postTitle = document.querySelector("#post-title");
const postBody = document.querySelector("#post-body");
const privacyWarning = document.querySelector("#privacy-warning");
const authDialog = document.querySelector("#auth-dialog");
const toast = document.querySelector("#prototype-toast");
let toastTimer;

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

assistForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = assistQuery.value.trim();
  if (!query) {
    assistQuery.focus();
    return;
  }
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

document.querySelectorAll(".vote-button").forEach((button) => {
  button.addEventListener("click", () => {
    const count = button.querySelector("strong");
    const voted = button.classList.toggle("is-voted");
    button.setAttribute("aria-pressed", String(voted));
    count.textContent = String(Number(count.textContent) + (voted ? 1 : -1));
    showToast(voted ? "Vote added. Follow this idea for roadmap updates." : "Vote removed.");
  });
});

const checklist = document.querySelector("#onboarding-checklist");
const progressCount = document.querySelector("#progress-count");
checklist?.addEventListener("change", () => {
  const boxes = [...checklist.querySelectorAll("input")];
  const complete = boxes.filter((box) => box.checked).length;
  progressCount.textContent = `${complete}/${boxes.length}`;
  document.querySelector(".progress-ring").style.background = `conic-gradient(var(--signal) ${(complete / boxes.length) * 100}%, #262831 0)`;
  if (complete === boxes.length) showToast("You’re set up. This space can now show topics you follow.");
});

document.querySelector("[data-dismiss-onboarding]")?.addEventListener("click", (event) => {
  const panel = event.currentTarget.closest(".onboarding-panel");
  panel.hidden = true;
  showToast("Getting started is still available under Learn.");
});

function openComposer(mode = "question") {
  composeForm.reset();
  privacyWarning.hidden = true;
  if (mode === "idea") {
    composeContext.textContent = "Shape the Retell roadmap";
    composeTitle.textContent = "Submit an idea";
    postTitle.placeholder = "Name the improvement…";
  } else {
    composeContext.textContent = "Get help from the community";
    composeTitle.textContent = "Ask a question";
    postTitle.placeholder = "Summarize the problem…";
    if (assistQuery.value.trim()) postTitle.value = assistQuery.value.trim();
  }
  composeDialog.showModal();
  requestAnimationFrame(() => postTitle.focus());
}

document.querySelectorAll("[data-open-compose]").forEach((button) => {
  button.addEventListener("click", () => openComposer(button.dataset.composeMode ?? "question"));
});

const sensitivePattern = /(org|agent|call)_[a-z0-9]{6,}|\+?\d[\d\s()-]{8,}\d/gi;
function inspectSensitiveText() {
  privacyWarning.hidden = !sensitivePattern.test(`${postTitle.value} ${postBody.value}`);
  sensitivePattern.lastIndex = 0;
}
postTitle?.addEventListener("input", inspectSensitiveText);
postBody?.addEventListener("input", inspectSensitiveText);

document.querySelector("[data-redact]")?.addEventListener("click", () => {
  postTitle.value = postTitle.value.replace(sensitivePattern, "[private identifier]");
  postBody.value = postBody.value.replace(sensitivePattern, "[private identifier]");
  privacyWarning.hidden = true;
  showToast("Private identifiers redacted from this draft.");
});

document.querySelector("[data-private-support]")?.addEventListener("click", () => {
  composeDialog.close();
  showToast("Private support would open here in the production forum.");
});

composeForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!composeForm.reportValidity()) return;
  composeDialog.close();
  showToast("Post preview ready. Nothing was published from this prototype.");
});

document.querySelectorAll("[data-open-auth]").forEach((button) => button.addEventListener("click", () => authDialog.showModal()));
document.querySelectorAll("[data-close-dialog]").forEach((button) => button.addEventListener("click", () => button.closest("dialog").close()));

authDialog?.querySelector("form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  authDialog.close();
  showToast("Authentication is intentionally disabled in this prototype.");
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
