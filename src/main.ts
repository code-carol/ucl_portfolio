// Make the DIV element draggable:
dragElement(document.getElementById("my-project")!);

function dragElement(elmnt: HTMLElement) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  const header = elmnt.querySelector(".title-bar");
  if (header) {
    // If present, the header is where you move the DIV from:
    (header as HTMLElement).onmousedown = dragMouseDown;
  } else {
    // Otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e: MouseEvent): void {
    e.preventDefault();
    // Get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // Call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e: MouseEvent): void {
    e.preventDefault();
    // Calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // Set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement(): void {
    // Stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
