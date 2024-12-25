// Make all elements with the class "draggable" draggable:
document.querySelectorAll(".window").forEach((element) => {
  dragElement(element as HTMLElement);
  addWindowTapHandling(element as HTMLElement);
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

  function dragMouseDown(e: MouseEvent): void {
    e.preventDefault();
    // Get the mouse cursor position at startup:
    initialX = e.clientX;
    initialY = e.clientY;
    document.onmouseup = closeDragElement;
    // Call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e: MouseEvent): void {
    e.preventDefault();
    // Calculate the new cursor position:
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
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

function addWindowTapHandling(element: HTMLElement): void {
  element.addEventListener("mousedown", () => handleWindowTap(element));
}

function openWindow(element: HTMLElement): void {
  element.style.display = "flex";
  biggestIndex++; // Increment biggestIndex by 1
  element.style.zIndex = biggestIndex.toString();
}

function handleWindowTap(element: HTMLElement): void {
  biggestIndex++; // Increment biggestIndex by 1
  element.style.zIndex = biggestIndex.toString();

  deselectIcon(selectedIcon);
}

function deselectIcon(icon: HTMLElement | null): void {
  if (icon) {
    // Logic to deselect the icon, e.g., remove active class or change styles
    icon.classList.remove("active"); // Example logic
  }
}
