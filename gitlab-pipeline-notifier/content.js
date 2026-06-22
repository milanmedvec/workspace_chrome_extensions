const interval = setInterval(() => {
    const lines = document.querySelectorAll(".term-fg-green.term-bold");

    for (const line of lines) {
        if (line.innerHTML === "Job succeeded") {
            chrome.runtime.sendMessage({
                type: "PIPELINE_DONE",
                status: "passed"
            });
            clearInterval(interval);
        }
    }
}, 15_000);
