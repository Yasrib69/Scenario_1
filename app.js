// -------------------------------
// NAVIGATION
// -------------------------------

const navButtons = document.querySelectorAll(".nav-button");
const pages = document.querySelectorAll(".page");

navButtons.forEach(button => {

    button.addEventListener("click", () => {

        navButtons.forEach(btn => btn.classList.remove("active"));
        pages.forEach(page => page.classList.remove("active-page"));

        button.classList.add("active");

        const pageId = button.dataset.page;

        document
            .getElementById(pageId)
            .classList.add("active-page");
    });

});


// -------------------------------
// TOAST
// -------------------------------

const toast = document.getElementById("toast");

function showToast(message) {

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}


// -------------------------------
// SEND MESSAGE
// -------------------------------

const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const messageContainer = document.getElementById("messageContainer");

function sendMessage() {

    const text = messageInput.value.trim();

    if (text === "") {
        return;
    }

    const message = document.createElement("div");

    message.className = "message sent";
    message.textContent = text;

    messageContainer.appendChild(message);

    messageInput.value = "";

    messageContainer.scrollTop =
        messageContainer.scrollHeight;
}

sendButton.addEventListener("click", sendMessage);

messageInput.addEventListener("keydown", event => {

    if (event.key === "Enter") {
        sendMessage();
    }

});


// -------------------------------
// CREATE POST
// -------------------------------

const postInput = document.getElementById("postInput");
const postButton = document.getElementById("postButton");
const feedContainer = document.getElementById("feedContainer");

postButton.addEventListener("click", () => {

    const text = postInput.value.trim();

    if (text === "") {
        return;
    }

    const post = document.createElement("article");

    post.className = "post";

    post.innerHTML = `
        <div class="post-header">

            <span class="avatar">Y</span>

            <div>
                <strong>You</strong>
                <small>Just now</small>
            </div>

        </div>

        <p></p>

        <div class="post-actions">
            <button class="like-button">♡ Like</button>
            <button class="report-button">⚑ Report</button>
        </div>
    `;

    post.querySelector("p").textContent = text;

    feedContainer.prepend(post);

    postInput.value = "";

    attachPostEvents(post);

    showToast("Your post was published.");
});


// -------------------------------
// LIKE POSTS
// -------------------------------

function attachPostEvents(post) {

    const likeButton =
        post.querySelector(".like-button");

    const reportButton =
        post.querySelector(".report-button");

    if (likeButton) {

        likeButton.addEventListener("click", () => {

            if (likeButton.dataset.liked === "true") {

                likeButton.dataset.liked = "false";
                likeButton.textContent = "♡ Like";

            } else {

                likeButton.dataset.liked = "true";
                likeButton.textContent = "♥ Liked";
            }

        });
    }

    if (reportButton) {

        reportButton.addEventListener("click", () => {
            openReportModal();
        });

    }
}

document.querySelectorAll(".post").forEach(post => {
    attachPostEvents(post);
});


// -------------------------------
// REPORT POST
// -------------------------------

const reportModal =
    document.getElementById("reportModal");

const cancelReport =
    document.getElementById("cancelReport");

const submitReport =
    document.getElementById("submitReport");

const reportsContainer =
    document.getElementById("reportsContainer");

function openReportModal() {

    reportModal.classList.add("show");
}

cancelReport.addEventListener("click", () => {

    reportModal.classList.remove("show");
});

submitReport.addEventListener("click", () => {

    const reason =
        document.getElementById("reportReason").value;

    reportModal.classList.remove("show");

    const report = document.createElement("div");

    report.className = "report-card";

    report.innerHTML = `
        <div>
            <strong>Reported Post</strong>

            <p>
                Report reason:
                <strong></strong>
            </p>

            <small>
                Status: Submitted for moderator review
            </small>
        </div>
    `;

    report.querySelector("p strong").textContent = reason;

    reportsContainer.prepend(report);

    showToast("Report submitted for moderator review.");
});


// Close modal when background is clicked

reportModal.addEventListener("click", event => {

    if (event.target === reportModal) {
        reportModal.classList.remove("show");
    }

});