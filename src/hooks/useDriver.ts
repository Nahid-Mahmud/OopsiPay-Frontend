import { useCallback } from "react";
import { driverInstance } from "../utils/driverInstance";

interface DriverStep {
  element?: string;
  popover: {
    title?: string;
    description: string;
  };
}

interface HighlightOptions {
  element: string;
  popover?: {
    title?: string;
    description: string;
  };
}

export const useDriver = () => {
  const startTour = useCallback((steps: DriverStep[]) => {
    // Check if a tour is already active
    if (driverInstance.isActive()) {
      return;
    }

    driverInstance.setSteps(steps);
    driverInstance.drive();
  }, []);

  const highlightElement = useCallback((element: string, options?: Omit<HighlightOptions, "element">) => {
    driverInstance.highlight({
      element,
      ...options,
    });
  }, []);

  const destroyTour = useCallback(() => {
    driverInstance.destroy();
  }, []);

  const isTourActive = useCallback(() => {
    return driverInstance.isActive();
  }, []);

  return {
    driver: driverInstance,
    startTour,
    highlightElement,
    destroyTour,
    isTourActive,
  };
};
