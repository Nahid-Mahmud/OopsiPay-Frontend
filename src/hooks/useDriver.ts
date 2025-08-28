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

  return {
    driver: driverInstance,
    startTour,
    highlightElement,
    destroyTour,
  };
};
