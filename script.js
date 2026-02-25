/* === PCSR TRAINING PORTAL - FINAL PRODUCTION SCRIPT === */

document.addEventListener("DOMContentLoaded", () => {
    // 1. SELECT UI ELEMENTS
    const finalSubmitBtn = document.querySelector("#finalExam .primary-btn");
    const quizResult = document.querySelector("#finalExam .quiz-result");
    const viewCertBtn = document.getElementById("viewCertificateBtn");
    const certMessage = document.querySelector(".certificate-message");

    // 2. FINAL EXAM SCORING & BUTTON REVEAL
    if (finalSubmitBtn) {
        finalSubmitBtn.addEventListener("click", () => {
            let correctCount = 0;
            const questions = document.querySelectorAll("#finalExam .quiz-question");
            const totalQuestions = questions.length;

            questions.forEach((q) => {
                const selected = q.querySelector(".quiz-option.selected");
                const correctAnswer = q.getAttribute("data-answer");

                if (selected && selected.textContent.trim() === correctAnswer) {
                    correctCount++;
                }
            });

            // Update result text on screen
            if (quizResult) {
                quizResult.textContent = `You got ${correctCount} out of ${totalQuestions} correct!`;
                quizResult.style.display = "block";
            }

            // Logic to show "View Certificate" (Passing score: 16/20)
            if (correctCount >= 16) {
                if (viewCertBtn) viewCertBtn.style.display = "block";
                if (certMessage) certMessage.style.display = "block";
                
                // Glide down to the reward
                viewCertBtn.scrollIntoView({ behavior: "smooth" });
            } else {
                alert(`Score: ${correctCount}/${totalQuestions}. You need 16 to pass. Keep trying!`);
                if (viewCertBtn) viewCertBtn.style.display = "none";
                if (certMessage) certMessage.style.display = "none";
            }
        });
    }

    // 3. CERTIFICATE ACTION (PROMPT FOR NAME)
    if (viewCertBtn) {
        viewCertBtn.addEventListener("click", () => {
            const userName = prompt("Please enter your full name for the certificate:");
            if (userName) {
                alert(`Official Certificate Generated for: ${userName}\n\nThis confirms completion of PCSR Training 2026.`);
            }
        });
    }

    // 4. QUIZ OPTION HIGHLIGHTING (THE BLUE SELECTION EFFECT)
    document.querySelectorAll(".quiz-option").forEach(button => {
        button.addEventListener("click", function() {
            const parent = this.parentElement;
            // Remove selection from others in the same question
            parent.querySelectorAll(".quiz-option").forEach(btn => btn.classList.remove("selected"));
            // Highlight this one
            this.classList.add("selected");
        });
    });

    // 5. DARK MODE TOGGLE
    const darkToggle = document.getElementById("darkModeToggle");
    if (darkToggle) {
        darkToggle.addEventListener("click", () => {
            document.body.classList.toggle("dark");
        });
    }
});
