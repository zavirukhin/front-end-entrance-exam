const editableElements = document.getElementsByClassName("editable");
const matRippleElement = document.getElementsByClassName("mat-ripple");

function eventHandler(event) {
  const target = event.target;
  localStorage.setItem(this.context, target.innerText);
}

function createMatRipplePoint(targetElement, x, y) {
  const boundry = targetElement.getBoundingClientRect();
  const sizePoint = Math.max(boundry.width, boundry.height) / 5;
  const matPoint = document.createElement("div");
  
  matPoint.classList.add("mat-ripple-point");
  matPoint.style.top = y + "px";
  matPoint.style.left = x + "px";
  matPoint.style.width = sizePoint + "px";
  matPoint.style.height = sizePoint + "px";

  targetElement.appendChild(matPoint);
  matPoint.addEventListener("animationend", targetElement.remove);
}

function showMatRipple(clickEvent) {
  const x = clickEvent.pageX - clickEvent.currentTarget.offsetLeft; 
  const y = clickEvent.pageY - clickEvent.currentTarget.offsetTop; 

  const element = document.createElement("DIV");
  element.classList.add("mat-ripple-view");
  this.context.appendChild(element);

  createMatRipplePoint(element, x, y);
}

for (const element of matRippleElement) {
  const handler = showMatRipple.bind({ context: element });
  element.addEventListener("click", handler);
}

for (let i = 0; i < editableElements.length; i++) {
  const elementId = 'editable-' + i;
  const element = editableElements[i];

  const storage = localStorage.getItem(elementId);
  if (storage !== null) {
    if (element.tagName === "A") element.href = "mailto:" + storage;
    element.innerText = storage;
  }

  element.addEventListener("input", eventHandler.bind({ context: elementId }));
}