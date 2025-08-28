import { driver } from "driver.js";

export const driverInstance = driver({
  showProgress: true,
  steps: [],
  allowClose: false,
  overlayOpacity: 0.5,
  stagePadding: 10,
  stageRadius: 5,
  popoverOffset: 10,
  showButtons: ["next", "previous", "close"],
  disableActiveInteraction: false,
  allowKeyboardControl: true,
  popoverClass: "custom-driver-popover",
});
