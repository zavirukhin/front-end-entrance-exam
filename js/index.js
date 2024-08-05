const editableElements = document.getElementsByClassName("editable");
const matRippleElements = document.getElementsByClassName("mat-ripple");
const buttonDownload = document.getElementById("button-download");
const animationElements = document.querySelectorAll(".editable, .container");

function eventHandler(event) {
  const target = event.target;
  localStorage.setItem(this.context, target.innerText);
}

for (const element of matRippleElements) {
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
  matPoint.addEventListener("animationend", () => targetElement.remove());
}

function showMatRipple(clickEvent) {
  const x = clickEvent.pageX - clickEvent.currentTarget.offsetLeft; 
  const y = clickEvent.pageY - clickEvent.currentTarget.offsetTop; 

  const element = document.createElement("DIV");
  element.classList.add("mat-ripple-view");
  this.context.appendChild(element);

  createMatRipplePoint(element, x, y);
}

function offAnimation() {
  for (const element of animationElements) element.style.transition = "none";
}

function onAnimation() {
  for (const element of animationElements) element.style.transition = "";
}

function exportPDF() {
  offAnimation();
  buttonDownload.style.display = "none";
  const body = document.body
  const html = document.documentElement;
  const height = Math.max(
    body.scrollHeight, 
    body.offsetHeight,
    html.clientHeight, 
    html.scrollHeight,
    html.offsetHeight,
  );

  html2pdf(body, {
    margin: 1,
    filename: "CV.pdf",
    html2canvas: {
      scrollX: 0,
      scrollY: 0,
      dpi: 300,
      letterRendering: true,
      scale: 4,
      width: 595,
    },
    jsPDF: {
      orientation: "portrait",
      unit: "px",
      format: [595, height + 50],
    }
  })
  .then(() => {
    buttonDownload.style.display = "";
    onAnimation();
  });
}

buttonDownload.addEventListener("click", exportPDF);