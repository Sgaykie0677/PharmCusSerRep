/* === PCSR TRAINING PORTAL - MAIN JAVASCRIPT === */

document.addEventListener("DOMContentLoaded", () => {
    const finalSubmitBtn = document.querySelector("#finalExam .primary-btn");
    const quizResult = document.querySelector("#finalExam .quiz-result");
    const viewCertBtn = document.getElementById("viewCertificateBtn");
    const certMessage = document.querySelector(".certificate-message");

    // 1. FINAL EXAM SUBMISSION LOGIC
    if (finalSubmitBtn) {
        finalSubmitBtn.addEventListener("click", () => {
            let correctCount = 0;
            const totalQuestions = 20;

            // Select all quiz questions within the Final Exam section
            const questions = document.querySelectorAll("#finalExam .quiz-question");

            questions.forEach((q) => {
                const selected = q.querySelector(".quiz-option.selected");
                const correctAnswer = q.getAttribute("data-answer");

                if (selected && selected.textContent.trim() === correctAnswer) {
                    correctCount++;
                }
            });

            // Display the score result to the user
            quizResult.textContent = `You got ${correctCount} out of ${totalQuestions} correct!`;
            quizResult.style.display = "block";

            // 2. THE "VIEW CERTIFICATE" TRIGGER
            // Passing score is set to 16/20 (80%)
            if (correctCount >= 16) {
                // Reveal the hidden HTML elements already in your code
                viewCertBtn.style.display = "block";
                certMessage.style.display = "block";
                
                // Smoothly scroll down so the manager sees the certificate button appear
                viewCertBtn.scrollIntoView({ behavior: "smooth" });
            } else {
                alert(`Score: ${correctCount}/${totalQuestions}. You need at least 16 correct to earn your certificate. Please review and try again!`);
                viewCertBtn.style.display = "none";
                certMessage.style.display = "none";
            }
        });
    }

    // 3. CERTIFICATE BUTTON INTERACTION
    if (viewCertBtn) {
        viewCertBtn.addEventListener("click", () => {
            const userName = prompt("Please enter your full name for the certificate:");
            
            if (userName) {
                alert(`Success!\n\nGenerating PCSR Certification for: ${userName}\n\n(This would link to your PDF template in the final version.)`);
                // Optional: window.print(); 
            }
        });
    }

    // 4. QUIZ OPTION SELECTION LOGIC
    // This allows users to click buttons to select answers
    document.querySelectorAll(".quiz-option").forEach(button => {
        button.addEventListener("click", function() {
            const parent = this.parentElement;
            parent.querySelectorAll(".quiz-option").forEach(btn => btn.classList.remove("selected"));
            this.classList.add("selected");
        });
    });
});
