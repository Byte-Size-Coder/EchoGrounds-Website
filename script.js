const menuButton = document.querySelector(".menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

if (menuButton && mobileMenu) {
  menuButton.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const targetId = anchor.getAttribute("href");
    if (!targetId || targetId === "#") {
      return;
    }

    const target = document.querySelector(targetId);
    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const revealItems = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
  }
);

revealItems.forEach((item) => observer.observe(item));

const yearLabel = document.getElementById("year");
if (yearLabel) {
  yearLabel.textContent = String(new Date().getFullYear());
}

const bookingModal = document.getElementById("booking-modal");
const bookingTriggers = document.querySelectorAll("[data-book-meeting]");

if (bookingModal && bookingTriggers.length) {
  const closeButtons = bookingModal.querySelectorAll("[data-booking-close]");
  const closeButton = bookingModal.querySelector(".booking-modal__close");

  let lastFocusedElement = null;

  const openModal = () => {
    lastFocusedElement = document.activeElement;
    bookingModal.classList.add("open");
    bookingModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    if (closeButton) {
      closeButton.focus();
    }
  };

  const closeModal = () => {
    bookingModal.classList.remove("open");
    bookingModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    if (lastFocusedElement instanceof HTMLElement) {
      lastFocusedElement.focus();
    }
  };

  bookingTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      openModal();
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && bookingModal.classList.contains("open")) {
      closeModal();
    }
  });
}

const roadmapItems = [
  {
    phase: "Version 1.0",
    quarter: "Current",
    title: "EchoGrounds Web Application",
    description: "Delivers the core features currently available in the project for community language programs.",
    features: [
      "Dictionary, categories, and role-based learning workflows",
      "Journeys, assessments, and expanded language resources",
      "Community-specific branding and configuration support",
    ],
  },
  {
    phase: "Next",
    quarter: "Growth Phase",
    title: "Community Growth and Operational Support",
    description: "Focused on helping communities scale adoption, visibility, and content operations.",
    features: [
      "Community growth features and stronger social presence options",
      "Streamlined word imports to reduce manual setup time",
      "Stronger support pathways for program teams",
    ],
  },
  {
    phase: "Future",
    quarter: "Learner Experience",
    title: "Dedicated Mobile Application",
    description: "A mobile-first learner app designed for easier access, engagement, and ongoing language practice.",
    features: [
      "Dedicated learner experience optimized for phones",
      "Improved accessibility for day-to-day language practice",
      "Stronger engagement for youth and community learners",
    ],
  },
];

const roadmapList = document.getElementById("roadmap-list");

if (roadmapList) {
  roadmapList.innerHTML = roadmapItems
    .map((item) => {
      const featureItems = item.features
        .map((feature) => `<li>${feature}</li>`)
        .join("");

      return `
        <article class="roadmap-item">
          <div class="roadmap-meta">
            <span class="roadmap-phase">${item.phase}</span>
            <span class="roadmap-quarter">${item.quarter}</span>
          </div>
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          <ul>${featureItems}</ul>
        </article>
      `;
    })
    .join("");
}
