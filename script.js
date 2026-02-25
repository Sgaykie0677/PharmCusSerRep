document.addEventListener("DOMContentLoaded", () => {
    const finalSubmitBtn = document.querySelector("#finalExam .primary-btn");
    const viewCertBtn = document.getElementById("viewCertificateBtn");
    const certMessage = document.querySelector(".certificate-message");
    const quizResult = document.querySelector(".quiz-result");

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

            if (quizResult) {
                quizResult.innerText = "You got " + score + " out of " + questions.length + " correct!";
                quizResult.style.display = "block";
            }

            // Show certificate button if score is 16/20 or higher
            if (score >= 16) {
                if (viewCertBtn) viewCertBtn.style.display = "block";
                if (certMessage) certMessage.style.display = "block";
                viewCertBtn.scrollIntoView({ behavior: "smooth" });
            } else {
                alert("Score: " + score + ". You need 16 to pass!");
            }
        });
    }

    if (viewCertBtn) {
        viewCertBtn.addEventListener("click", () => {
            const name = prompt("Please enter your name for the certificate:");
            if (name) alert("Certificate Generated for: " + name);
        });
    }

    // This handles the blue highlighting when you click an answer
    document.querySelectorAll(".quiz-option").forEach(opt => {
        opt.addEventListener("click", function() {
            this.parentElement.querySelectorAll(".quiz-option").forEach(b => b.classList.remove("selected"));
            this.classList.add("selected");
        });
    });
});
