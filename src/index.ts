const allWindows = document.querySelectorAll(".windows");
const allIcons = document.querySelectorAll(".icon");
const allNavBtn = document.querySelectorAll(".finder-btn");
const allCloseBtn = document.querySelectorAll(".close-btn");
const startBtn = document.querySelector(".start-btn");
const titleImg = document.getElementById("show-title-img") as HTMLImageElement;
const titleHeading = document.getElementById(
  "show-title-heading"
) as HTMLElement;

let maxWindowZIndex: number = 0;

allWindows.forEach((w) => {
  dragWindow(w as HTMLElement);
  moveWindow(w as HTMLElement);
});

allIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    const window = icon.getAttribute("data-window");
    const content = icon.getAttribute("data-content");
    const imgElement = icon.querySelector<HTMLImageElement>("img");
    const headingElement = icon.querySelector<HTMLElement>("h3");

    if (window) {
      const windowToOpen = document.querySelector(window) as HTMLElement;
      openWindow(windowToOpen);

      if (content) {
        const contentToShow = document.querySelector(content) as HTMLElement;
        showContent(contentToShow);
      }

      if (imgElement && headingElement) {
        const imgSrc = imgElement.src;
        const headingText = headingElement.textContent || "";
        updateTitle(imgSrc, headingText);
      }
    } else {
      console.error(`Window element not found: ${window}`);
    }
  });
});

allNavBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    const content = btn.getAttribute("data-content");
    if (content) {
      const contentToShow = document.querySelector(content) as HTMLElement;
      showContent(contentToShow);
    }
  });
});

allCloseBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    const window = btn.getAttribute("data-window");
    if (window) {
      const windowToClose = document.querySelector(window) as HTMLElement;
      closeWindow(windowToClose);
    } else {
      console.error(`Element with selector "${window}" not found.`);
    }
  });
});

startBtn?.addEventListener("click", function () {
  const menuBar = document.querySelector(".menu") as HTMLElement;
  const menuDiv = document.querySelector(".menu-container") as HTMLElement;
  if (menuBar && menuDiv) {
    toggleMenu(menuBar);
    handleWindowTap(menuDiv);
  }
});

document.addEventListener("click", function (event) {
  const menuBar = document.querySelector(".menu-bar") as HTMLElement;
  const menu = document.querySelector(".menu") as HTMLElement;

  if (menu && !menu.hidden) {
    if (
      !menu.contains(event.target as Node) &&
      !menuBar.contains(event.target as Node)
    ) {
      menu.hidden = true;
    }
  }
});

// WINDOWS OPEN/CLOSE FUNCTIONALITY -------------------------------------------

function openWindow(el: HTMLElement): void {
  el.hidden = false;
  maxWindowZIndex++;
  el.style.zIndex = maxWindowZIndex.toString();
}

function closeWindow(el: HTMLElement): void {
  el.hidden = true;
}

// WINDOW FINDER SHOW CONTENT FUNCTIONALITY -------------------------------------------

function showContent(el: HTMLElement): void {
  const allContent = document.querySelectorAll(".main-content > div");
  allContent.forEach((content) => {
    (content as HTMLElement).style.display = "none";
  });

  if (el) {
    (el as HTMLElement).style.display = "flex"; // Use flex since you're using .flex class
  }
}

// WINDOWS DRAG FUNCTIONALITY -------------------------------------------

function dragWindow(el: HTMLElement) {
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

// WINDOWS MOVE UPFRONT FUNCTIONALITY -------------------------------------------

function moveWindow(el: HTMLElement): void {
  el.addEventListener("mousedown", () => handleWindowTap(el));
}

function handleWindowTap(el: HTMLElement): void {
  maxWindowZIndex++;
  el.style.zIndex = maxWindowZIndex.toString();
}

// MENU BAR TOGGLE FUNCTIONALITY -------------------------------------------

function toggleMenu(el: HTMLElement): void {
  el.hidden = !el.hidden;
}

// SHOW TITLE FUNCTIONALITY -------------------------------------------

function updateTitle(imgSrc: string, headingText: string): void {
  titleImg.src = imgSrc;
  titleHeading.textContent = headingText;
}
