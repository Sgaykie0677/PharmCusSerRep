/* ================================
   PCSR TRAINING — PROGRESS ENGINE
   ================================ */

/* -------------------------------
   1. SECTION REGISTRATION
--------------------------------*/
  const sections = [
  "home",
  "module1",
  "module2",
  "module3",
  "module4",
  "module5",
  "module6",
  "module7", 
  "module8", 
  "module9", 
  "module10", 
  "finalExam"
];

/* -------------------------------
   2. LOAD SAVED PROGRESS
--------------------------------*/
let completed = JSON.parse(localStorage.getItem("pcsrProgress")) || [];

/* -------------------------------
   3. UPDATE PROGRESS BAR
--------------------------------*/
function updateProgressBar() {
  const progress = (completed.length / (sections.length - 1)) * 100;
  document.getElementById("progressBar").style.width = progress + "%";
}

/* -------------------------------
   4. MARK SECTION AS COMPLETE
--------------------------------*/
function completeSection(sectionId) {
  if (!completed.includes(sectionId) && sectionId !== "finalExam") {
    completed.push(sectionId);
    localStorage.setItem("pcsrProgress", JSON.stringify(completed));
    updateProgressBar();
    updateSidebarChecks();
  }
}

/* -------------------------------
   5. SIDEBAR CHECKMARKS
--------------------------------*/
function updateSidebarChecks() {
  document.querySelectorAll(".nav-link").forEach(link => {
    const id = link.getAttribute("href").replace("#", "");
    if (completed.includes(id)) {
      link.classList.add("completed");
    }
  });
}

/* -------------------------------
   6. ACTIVE LINK HIGHLIGHTING
--------------------------------*/
function highlightActiveLink(sectionId) {
  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + sectionId) {
      link.classList.add("active");
    }
  });
}

/* -------------------------------
   7. SMOOTH SCROLLING
--------------------------------*/
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    const target = link.getAttribute("href").replace("#", "");

    // Hide all sections
    document.querySelectorAll(".content-section").forEach(section => {
      section.classList.remove("active");
    });

    // Show selected section
    const selected = document.getElementById(target);
    if (selected) {
      selected.classList.add("active");
    }

    highlightActiveLink(target);
    completeSection(target);
    unlockFinalExam();
  });
});

/* -------------------------------
   8. FINAL EXAM UNLOCK LOGIC
--------------------------------*/
function unlockFinalExam() {
  const allModulesComplete =
    completed.length >= sections.length - 2; // excludes finalExam

  const finalExamLink = document.querySelector('a[href="#finalExam"]');

  if (allModulesComplete) {
    finalExamLink.classList.remove("locked");
    finalExamLink.textContent = "Final Exam";
  } else {
    finalExamLink.classList.add("locked");
    finalExamLink.textContent = "Final Exam (Locked)";
  }
}

/* -------------------------------
   9. SCROLL-BASED COMPLETION
--------------------------------*/
window.addEventListener("scroll", () => {
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.4 && rect.bottom > 0) {
      completeSection(id);
      highlightActiveLink(id);
      unlockFinalExam();
    }
  });
});

/* -------------------------------
   10. INITIALIZE ON PAGE LOAD
--------------------------------*/
window.onload = () => {
  updateProgressBar();
  updateSidebarChecks();
  unlockFinalExam();

  // Remove active from ALL sections
  document.querySelectorAll(".content-section").forEach(section => {
    section.classList.remove("active");
  });

// Activate Module 1 by default
const firstModule = document.getElementById("module1");
if (firstModule) {
  firstModule.classList.add("active");
  highlightActiveLink("module1");
}
};

// Load saved mode on refresh
if (localStorage.getItem("pcsrDarkMode") === "true") {
  document.body.classList.add("dark");
}

