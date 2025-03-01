// WINDOWS -------------------------------------------

const allWindows = document.querySelectorAll(".windows");

allWindows.forEach((w) => {
  dragWindow(w as HTMLElement);
  moveWindow(w as HTMLElement);
});

// SELECT ICONS TO OPEN WINDOWS -------------------------------------------

const finderIcons = document.querySelectorAll(".icon-finder");

finderIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    const windowSelector = icon.getAttribute("data-window");
    const contentSelector = icon.getAttribute("data-content");
    const imgElement = icon.querySelector("img") as HTMLImageElement;
    const headingElement = icon.querySelector("h3") as HTMLElement;

    if (!windowSelector || !contentSelector) {
      console.error("Missing required data attributes");
      return;
    }

    const windowToOpen = document.querySelector(windowSelector) as HTMLElement;
    const contentToShow = document.querySelector(
      contentSelector
    ) as HTMLElement;
    const imgSrc = imgElement.src;
    const headingText = headingElement.textContent ?? "";

    openWindow(windowToOpen);
    showContent(contentToShow);
    updateTitle(imgSrc, headingText);
    createOrUpdateTab(imgSrc, headingText, windowSelector);
  });
});

// CLOSE BUTTONS  -------------------------------------------

// Select all close buttons
const allCloseBtn = document.querySelectorAll<HTMLButtonElement>(".close-btn");

allCloseBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const windowSelector = btn.getAttribute("data-window");

    if (windowSelector) {
      const windowToClose = document.querySelector<HTMLElement>(windowSelector);
      if (windowToClose) {
        windowToClose.hidden = true;
        removeTab(windowSelector);
      } else {
        console.error(`Element with selector "${windowSelector}" not found.`);
      }
    }
  });
});

// START BUTTON  -------------------------------------------

const startBtn = document.querySelector(".start-btn");

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

// FORMAT DATE AND TIME TO DD/MM/YYYY HH:MM -------------------------------------------

function dateFormat(date: Date): string {
  const dateFormatter = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const timeFormatter = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return `${dateFormatter.format(date)} ${timeFormatter.format(date)}`;
}

// UPDATE TIME -------------------------------------------

function updateTime() {
  const date = document.getElementById("current-date");
  if (date) {
    date.innerHTML = dateFormat(new Date());
  }
}

// Initial update
updateTime();

// Update every second
setInterval(updateTime, 1000);

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
    (el as HTMLElement).style.display = "flex";
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

let maxWindowZIndex: number = 0;

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

// UPDATE TITLE FUNCTIONALITY -------------------------------------------

const titleImg = document.querySelector(".title-img") as HTMLImageElement;
const titleHeading = document.querySelector(".title-heading") as HTMLElement;

function updateTitle(imgSrc: string, headingText: string): void {
  titleImg.src = imgSrc;
  titleHeading.textContent = headingText;
}

// CREATE/REMOVE TABS  -------------------------------------------

function createOrUpdateTab(
  imgSrc: string,
  headingText: string,
  dataWindow: string
): void {
  const tabBtn = document.querySelector(".tab-btn") as HTMLButtonElement;
  const tabDataWindow = tabBtn?.getAttribute("data-window");

  if (tabBtn && tabDataWindow === dataWindow) {
    const img = tabBtn.querySelector(".tab-img") as HTMLImageElement;
    const heading = tabBtn.querySelector(
      ".tab-heading"
    ) as HTMLParagraphElement;

    img.src = imgSrc;
    heading.textContent = headingText;
  } else {
    const button = document.createElement("button");
    button.classList.add("tab-btn");
    button.setAttribute("data-window", dataWindow);

    const img = document.createElement("img");
    img.classList.add("tab-img");
    img.src = imgSrc;
    img.alt = "";

    const heading = document.createElement("p");
    heading.classList.add("tab-heading");
    heading.textContent = headingText;

    button.appendChild(img);
    button.appendChild(heading);

    const tabContainer = document.querySelector(".tab-container");

    if (tabContainer) {
      tabContainer.appendChild(button);
    } else {
      console.error('Container with class "tab-container" not found.');
    }
  }
}

function removeTab(dataWindow: string): void {
  const tabBtn = document.querySelector(".tab-btn") as HTMLButtonElement;
  const tabDataWindow = tabBtn?.getAttribute("data-window");

  if (tabBtn && tabDataWindow === dataWindow) {
    tabBtn.remove();
  } else {
    console.error(`Tab with data-window="${dataWindow}" not found.`);
  }
}
