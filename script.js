document.addEventListener("DOMContentLoaded", () => {
    // Select elements
    const finalSubmitBtn = document.querySelector("#finalExam .primary-btn");
    const viewCertBtn = document.getElementById("viewCertificateBtn");
    const certMessage = document.querySelector(".certificate-message");
    const quizResult = document.querySelector(".quiz-result");

    // Handle Exam Submission
    if (finalSubmitBtn) {
        finalSubmitBtn.addEventListener("click", () => {
            let score = 0;
            const questions = document.querySelectorAll("#finalExam .quiz-question");

            questions.forEach(q => {
                const selected = q.querySelector(".quiz-option.selected");
                const answer = q.getAttribute("data-answer");
                if (selected && selected.innerText.trim() === answer) {
                    score++;
                }
            });

            // Show Score
            quizResult.innerText = "You got " + score + " out of " + questions.length + " correct!";
            quizResult.style.display = "block";

            // Reveal Certificate if score is 16+ (80%)
            if (score >= 16) {
                viewCertBtn.style.display = "block";
                certMessage.style.display = "block";
                viewCertBtn.scrollIntoView({ behavior: "smooth" });
            } else {
                alert("Score: " + score + ". You need 16 correct to pass!");
            }
        });
    }

    // Handle Certificate Click
    if (viewCertBtn) {
        viewCertBtn.addEventListener("click", () => {
            const name = prompt("Please enter your name for the certificate:");
            if (name) alert("Certificate Generated for: " + name);
        });
    }

    // Quiz Selection Logic
    document.querySelectorAll(".quiz-option").forEach(opt => {
        opt.addEventListener("click", function() {
            this.parentElement.querySelectorAll(".quiz-option").forEach(b => b.classList.remove("selected"));
            this.classList.add("selected");
        });
    });
    
    // Dark Mode Toggle
    document.getElementById("darkModeToggle").addEventListener("click", () => {
        document.body.classList.toggle("dark");
    });
});
