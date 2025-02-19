"use client";

import React, { useEffect } from "react";
import { Fancybox as NativeFancybox } from "@fancyapps/ui/dist/fancybox/fancybox.esm.js";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

type FancyboxProps = {
  children: React.ReactNode;
  options?: Record<string, any>;
  delegate?: string;
};

function Fancybox({ children, options = {}, delegate = "[data-fancybox]" }: FancyboxProps) {
  useEffect(() => {
    // Initialize Fancybox bindings
    NativeFancybox.bind(delegate, options);

    // Cleanup bindings on unmount
    return () => {
      NativeFancybox.destroy();
    };
  }, [delegate, options]);

  return <>{children}</>;
}

export default Fancybox;
