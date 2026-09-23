const views = [...document.querySelectorAll("[data-view]")];
const navButtons = [...document.querySelectorAll(".nav-item")];
const menuButton = document.querySelector(".menu-button");
const drawerScrim = document.querySelector(".drawer-scrim");
const assistForm = document.querySelector("#assist-form");
const assistQuery = document.querySelector("#assist-query");
const assistResponse = document.querySelector("#assist-response");
const responseTitle = document.querySelector("#response-title");
const responseCopy = document.querySelector("#response-copy");
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
