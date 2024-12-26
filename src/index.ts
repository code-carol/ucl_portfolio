// Make all elements with the class "draggable" draggable:
document.querySelectorAll(".window").forEach((el) => {
  dragElement(el as HTMLElement);
  addWindowTapHandling(el as HTMLElement);
});

function dragElement(el: HTMLElement) {
  let initialX = 0,
    initialY = 0,
    currentX = 0,
    currentY = 0;

  const header = el.querySelector(".title-bar");
  if (header) {
    // If present, the header is where you move the DIV from:
    (header as HTMLElement).onmousedown = dragMouseDown;
  } else {
    // Otherwise, move the DIV from anywhere inside the DIV:
    el.onmousedown = dragMouseDown;
  }

  function dragMouseDown(event: MouseEvent): void {
    event.preventDefault();
    // Get the mouse cursor position at startup:
    initialX = event.clientX;
    initialY = event.clientY;
    document.onmouseup = closeDragElement;
    // Call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(event: MouseEvent): void {
    event.preventDefault();
    // Calculate the new cursor position:
    currentX = initialX - event.clientX;
    currentY = initialY - event.clientY;
    initialX = event.clientX;
    initialY = event.clientY;
    // Set the element's new position:
    el.style.top = el.offsetTop - currentY + "px";
    el.style.left = el.offsetLeft - currentX + "px";
  }

  function closeDragElement(): void {
    // Stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

let biggestIndex: number = 0; // Initialize biggestIndex
let selectedIcon: HTMLElement | null = null; // Keep track of the selected icon

function addWindowTapHandling(el: HTMLElement): void {
  el.addEventListener("mousedown", () => handleWindowTap(el));
}

function openWindow(el: HTMLElement): void {
  el.style.display = "flex";
  biggestIndex++; // Increment biggestIndex by 1
  el.style.zIndex = biggestIndex.toString();
}

function handleWindowTap(el: HTMLElement): void {
  biggestIndex++; // Increment biggestIndex by 1
  el.style.zIndex = biggestIndex.toString();

  deselectIcon(selectedIcon);
}

function deselectIcon(el: HTMLElement | null): void {
  if (el) {
    // Logic to deselect the icon, e.g., remove active class or change styles
    el.classList.remove("active"); // Example logic
  }
}
