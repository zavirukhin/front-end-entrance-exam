const editableElements = document.getElementsByClassName("editable");

function eventHandler(event) {
  const target = event.target;
  localStorage.setItem(this.context, target.innerText);
}

for (let i = 0; i < editableElements.length; i++) {
  const elementId = 'editable-' + i;
  const element = editableElements[i];

  const storage = localStorage.getItem(elementId);
  if (storage !== null) {
    if (element.tagName === 'A') element.href = "mailto:" + storage;
    element.innerText = storage;
  }

  element.addEventListener("input", eventHandler.bind({ context: elementId }));
}