"use client";

import { useState, useEffect } from "react";
import { Download, Share } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PwaInstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isStandalone, setIsStandalone] = useState(true); // default true to avoid hydration mismatch flashes

  useEffect(() => {
    // Check if app is already installed
    const isPwa = window.matchMedia('(display-mode: standalone)').matches || 
                  (window.navigator as any).standalone === true;
    
    setIsStandalone(isPwa);

    // Check if iOS
    const ua = window.navigator.userAgent;
    const isIOSDevice = /iPad|iPhone|iPod/.test(ua);
    setIsIOS(isIOSDevice);

    // Register Service Worker for PWA
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(err => {
          console.error('Service Worker registration failed:', err);
        });
      });
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsStandalone(false);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setDeferredPrompt(null);
      }
    } else {
      // Fallback
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 5000);
    }
  };

  // If already installed, don't show the download button
  if (isStandalone) return null;

  return (
    <div className="relative md:hidden flex items-center pr-1">
      <Button
        variant="default"
        size="sm"
        className="h-8 rounded-full px-4 gap-1.5 text-xs font-semibold shadow-[0_0_10px_rgba(0,0,0,0.1)] bg-primary hover:bg-primary/90 transition-all duration-300 animate-in fade-in"
        onClick={handleInstallClick}
        aria-label="Download App"
      >
        <Download className="h-3.5 w-3.5 animate-bounce" />
        <span>Get App</span>
      </Button>

      {showTooltip && (
        <div className="absolute top-full right-0 mt-3 w-56 p-3 bg-card text-card-foreground text-xs rounded-xl shadow-xl border border-secondary animate-in slide-in-from-top-2 z-50">
          {isIOS ? (
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-primary">Install on iOS</p>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <span>1. Tap</span> <Share className="h-3.5 w-3.5" /> <span>in Safari menu</span>
              </div>
              <p className="text-muted-foreground">2. Select "Add to Home Screen"</p>
            </div>
          ) : (
            <p className="text-muted-foreground">
              To install, tap the browser menu and select <span className="font-semibold text-foreground">"Add to Home screen"</span> or <span className="font-semibold text-foreground">"Install app"</span>.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
