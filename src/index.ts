// WINDOWS -------------------------------------------

const allWindows = document.querySelectorAll(".windows");

allWindows.forEach((w) => {
  dragWindow(w as HTMLElement);
  moveWindow(w as HTMLElement);
});

// ICONS -------------------------------------------

const allIcons = document.querySelectorAll(".icon");

allIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    const window = icon.getAttribute("data-window");
    const content = icon.getAttribute("data-content");
    const imgElement = icon.querySelector<HTMLImageElement>("img");
    const headingElement = icon.querySelector<HTMLElement>("h3");

    if (window) {
      const windowToOpen = document.querySelector(window) as HTMLElement;
      openWindow(windowToOpen);

      if (window === "#finder" && imgElement && headingElement) {
        const imgSrc = imgElement.src;
        const headingText = headingElement.textContent || "";
        const dataWindow = window;
        updateTitle(imgSrc, headingText);
        showTab(imgSrc, headingText, dataWindow);
      }

      if (content) {
        const contentToShow = document.querySelector(content) as HTMLElement;
        showContent(contentToShow);
      }
    } else {
      console.error(`Window element not found: ${window}`);
    }
  });
});

// CLOSE BUTTONS  -------------------------------------------

// Select all close buttons
const allCloseBtn = document.querySelectorAll<HTMLButtonElement>(".close-btn");
// Select the container that holds the tabs
const tabDiv = document.querySelector(".tab-container") as HTMLElement | null;

if (tabDiv) {
  allCloseBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Get the data-window attribute value from the clicked button
      const windowSelector = btn.getAttribute("data-window");

      if (windowSelector) {
        // Find the window element using the selector
        const windowToClose =
          document.querySelector<HTMLElement>(windowSelector);
        if (windowToClose) {
          windowToClose.hidden = true;
        } else {
          console.error(`Element with selector "${windowSelector}" not found.`);
        }

        // Find the associated tab in the tab container
        const tabToClose = tabDiv.querySelector(
          `[data-window="${windowSelector}"]`
        ) as HTMLElement | null;

        if (tabToClose) {
          // Hide the tab
          hideTab(tabToClose);
        } else {
          console.error(`Tab with data-window="${windowSelector}" not found.`);
        }
      } else {
        console.error("No data-window attribute found on the clicked button.");
      }
    });
  });
} else {
  console.error("Tab container not found.");
}

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

// SHOW/HIDE TAB FUNCTIONALITY -------------------------------------------
const tabBtn = document.querySelector(".tab") as HTMLButtonElement | null;

function showTab(
  imgSrc: string,
  headingText: string,
  dataWindow: string
): void {
  const tabImg = document.querySelector(".tab-img") as HTMLImageElement;
  const tabHeading = document.querySelector(".tab-heading") as HTMLElement;

  if (tabDiv && tabImg && tabHeading && tabBtn) {
    tabBtn.setAttribute("data-window", dataWindow);
    tabDiv.style.display = "flex";
    tabImg.src = imgSrc;
    tabHeading.textContent = headingText;
  }
}

function hideTab(el: HTMLElement): void {
  if (el) {
    console.log(el);
    el.style.display = "none";
  }
}
