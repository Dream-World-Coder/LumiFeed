function copyToClipboard(element) {
  let commandElement = null;
  const preElement = element.closest("pre");
  const languageNoneElement = element.closest(".language-none");

  if (preElement) {
    commandElement = preElement.querySelector("code");
  } else if (languageNoneElement) {
    commandElement = languageNoneElement.querySelector(".command");
  }

  if (!commandElement) {
    console.error("No code or command element found");
    return;
  }

  const code = commandElement.textContent ? commandElement.textContent.trim() : commandElement.value;

  navigator.clipboard.writeText(code).then(() => {
    const copyIcon = element.querySelector(".copy-icon");
    const checkIcon = element.querySelector(".check-icon");

    copyIcon.classList.add("hidden");
    checkIcon.classList.remove("hidden");

    setTimeout(() => {
      copyIcon.classList.remove("hidden");
      checkIcon.classList.add("hidden");
    }, 2000);
  });
}
