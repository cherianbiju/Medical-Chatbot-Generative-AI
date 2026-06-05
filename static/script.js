$("#messageArea").on("submit", function(event) {
    event.preventDefault();

    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const time = (hour < 10 ? "0" + hour : hour) + ":" + (minute < 10 ? "0" + minute : minute);

    const rawText = $("#text").val().trim();
    if (!rawText) return;

    // Show user message
    const userHtml = `
        <div class="user-message">
            <div class="user-bubble">
                ${rawText}
                <span class="time">${time}</span>
            </div>
        </div>`;
    $("#messageFormeight").append(userHtml);
    $("#text").val("");
    scrollToBottom();

    // Show typing indicator
    const typingHtml = `
        <div class="bot-message" id="typing">
            <div class="bot-bubble">
                <div class="typing">
                    <span></span><span></span><span></span>
                </div>
            </div>
        </div>`;
    $("#messageFormeight").append(typingHtml);
    scrollToBottom();

    // Send to Flask backend
    $.ajax({
        data: { msg: rawText },
        type: "POST",
        url: "/get",
        success: function(response) {
            $("#typing").remove();

            const botHtml = `
                <div class="bot-message">
                    <div class="bot-bubble">
                        ${response}
                        <span class="time">${time}</span>
                    </div>
                </div>`;
            $("#messageFormeight").append(botHtml);
            scrollToBottom();
        },
        error: function() {
            $("#typing").remove();
            $("#messageFormeight").append(`
                <div class="bot-message">
                    <div class="bot-bubble">
                        ⚠️ Something went wrong. Please try again.
                    </div>
                </div>`);
            scrollToBottom();
        }
    });
});

function scrollToBottom() {
    const chatBody = $("#messageFormeight");
    chatBody.scrollTop(chatBody[0].scrollHeight);
}