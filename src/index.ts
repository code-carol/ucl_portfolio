const allWindows = document.querySelectorAll(".window");
const allIcons = document.querySelectorAll(".icons");

allWindows.forEach((w) => {
  dragWindow(w as HTMLElement);
  moveWindow(w as HTMLElement);
});
