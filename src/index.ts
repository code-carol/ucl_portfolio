// WINDOW DRAG FUNCTIONALITY -------------------------------------------

// Make all windows draggable:
document.querySelectorAll(".window").forEach((el) => {
  dragElement(el as HTMLElement);
  addWindowTapHandling(el as HTMLElement);
});

function dragElement(el: HTMLElement) {
  let initialX = 0,
    initialY = 0,
    currentX = 0,
    currentY = 0;

  const titleBar = el.querySelector(".title-bar");
  if (titleBar) {
    // If present, the tile bar is where you move the DIV from:
    (titleBar as HTMLElement).onmousedown = dragMouseDown;
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

// WINDOW MOVE FUNCTIONALITY -------------------------------------------

let biggestIndex: number = 0; // Initialize biggestIndex
let selectedIcon: HTMLElement | null = null; // Keep track of the selected icon

function addWindowTapHandling(el: HTMLElement): void {
  el.addEventListener("mousedown", () => handleWindowTap(el));
}

function moveWindow(el: HTMLElement): void {
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
    el.classList.remove("active");
  }
}

// WINDOW OPEN/CLOSE FUNCTIONALITY -------------------------------------------

function openWindow(el: HTMLElement): void {
  el.style.display = "block";
}

function closeWindow(el: HTMLElement): void {
  el.style.display = "none";
}

// Add event listeners to open buttons
const windowOpens = document.querySelectorAll(
  ".icon"
) as NodeListOf<HTMLElement>;

windowOpens.forEach((openButton) => {
  openButton.addEventListener("click", function () {
    const targetSelector = openButton.getAttribute("data-target");
    if (targetSelector) {
      const windowToOpen = document.querySelector(
        targetSelector
      ) as HTMLElement;
      if (windowToOpen) {
        openWindow(windowToOpen); // Open the specific window
      } else {
        console.error(`Element with selector "${targetSelector}" not found.`);
      }
    } else {
      console.error("No target specified in data-target attribute.");
    }
  });
});

// Add event listeners to close buttons
const closeButtons = document.querySelectorAll(
  ".close-btn"
) as NodeListOf<HTMLElement>;

closeButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const targetSelector = button.getAttribute("data-target");
    if (targetSelector) {
      const windowToClose = document.querySelector(
        targetSelector
      ) as HTMLElement;
      if (windowToClose) {
        closeWindow(windowToClose); // Close the specific window
      } else {
        console.error(`Element with selector "${targetSelector}" not found.`);
      }
    } else {
      console.error("No target specified in data-target attribute.");
    }
  });
});

// LINKS FUNCTIONALITY -------------------------------------------

function showFolder(el: HTMLElement): void {
  el.style.display = "block";
}
