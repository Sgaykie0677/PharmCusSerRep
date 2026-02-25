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
  // home doesn't count, so we divide by total sections - 1
  const progress = (completed.length / (sections.length - 1)) * 100;
  const bar = document.getElementById("progressBar");
  if (bar) {
    bar.style.width = progress + "%";
  }
}

/* -------------------------------
   4. MARK SECTION AS COMPLETE
--------------------------------*/
function completeSection(sectionId) {
  if (!completed.includes(sectionId) && sectionId !== "finalExam" && sectionId !== "home") {
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
    const targetId = link.getAttribute("href").replace("#", "");
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* -------------------------------
   8. FINAL EXAM UNLOCK LOGIC
--------------------------------*/
function unlockFinalExam() {
  // Final Exam unlocks when all 10 modules are finished
  const allModulesComplete = completed.length >= 10;
  const finalExamLink = document.querySelector('a[href="#finalExam"]');

  if (finalExamLink) {
    if (allModulesComplete) {
      finalExamLink.classList.remove("locked");
      finalExamLink.textContent = "Final Exam";
    } else {
      finalExamLink.classList.add("locked");
      finalExamLink.textContent = "Final Exam (Locked)";
    }
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
    // If the section is in the top 40% of the viewport
    if (rect.top < window.innerHeight * 0.4 && rect.bottom > 0) {
      completeSection(id);
      highlightActiveLink(id);
      unlockFinalExam();
    }
  });
});

/* -------------------------------
   10. QUIZ & DARK MODE LOGIC
--------------------------------*/
document.addEventListener("DOMContentLoaded", () => {
  // Option Selection
  document.querySelectorAll('.quiz-option').forEach(button => {
    button.addEventListener('click', function() {
      const parent = this.parentElement;
      parent.querySelectorAll('.quiz-option').forEach(btn => btn.classList.remove('selected'));
      this.classList.add('selected');
    });
  });

  // Check Answers
  document.querySelectorAll('.primary-btn').forEach(btn => {
    if (btn.textContent.includes("Check") || btn.textContent.includes("Submit")) {
      btn.addEventListener('click', function() {
        const quizSection = this.closest('.quiz') || this.closest('.content-section');
        const questions = quizSection.querySelectorAll('.quiz-question');
        let correctCount = 0;

        questions.forEach(q => {
          const selected = q.querySelector('.quiz-option.selected');
          const answer = q.getAttribute('data-answer');
          if (selected && selected.textContent.trim() === answer) {
            correctCount++;
          }
        });

        const result = quizSection.querySelector('.quiz-result');
        if (result) {
          result.textContent = `You got ${correctCount} out of ${questions.length} correct!`;
        }

        // Show Certificate button if final exam is submitted
        if (this.textContent.includes("Final Exam") && correctCount >= 1) {
           const certBtn = document.getElementById("viewCertificateBtn");
           if(certBtn) certBtn.style.display = "block";
        }
      });
    }
  });

  // Dark Mode
  const darkToggle = document.getElementById("darkModeToggle");
  if (darkToggle) {
    darkToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      localStorage.setItem("pcsrDarkMode", document.body.classList.contains("dark"));
    });
  }

  // Load Saved Progress
  updateProgressBar();
  updateSidebarChecks();
  unlockFinalExam();
  if (localStorage.getItem("pcsrDarkMode") === "true") {
    document.body.classList.add("dark");
  }
});
