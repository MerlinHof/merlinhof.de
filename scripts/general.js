import DOM from "./dom.js";

// Background Animation
export async function startBackgroundAnimation() {
   const container = DOM.create("div")
      .setStyle({
         position: "fixed",
         left: "0px",
         top: "0px",
         width: "100vw",
         height: "100vh",
         opacity: "0",
         zIndex: "-1",
         transition: "2s",
         filter: "blur(0px)",
      })
      .appendTo(document.body);

   await new Promise((resolve) => setTimeout(resolve, 50));
   container.setStyle({
      opacity: 0.4,
      filter: "blur(110px)",
   });

   const width = container.getWidth();
   const height = container.getHeight();
   const colors = [new Color(0, 60, 200), new Color(0, 200, 120), new Color(170, 0, 220), new Color(30, 140, 95)];

   for (let i = 0; i < 12; i++) {
      DOM.create("div")
         .setStyle({
            backgroundColor: colors[Math.floor(Math.random() * colors.length)].toString(),
            width: "240px",
            height: "240px",
            position: "inherit",
            borderRadius: "120px",
         })
         .appendTo(container)
         .onTransitionEnd(
            (elem) => {
               elem.setStyle({
                  transition: `all ${3 + Math.random() * 5}s linear`,
               });
               let newX = Math.random() * (width - 240);
               let newY = Math.random() * (height - 240);
               if (Math.random() < 0.5) {
                  newX = Math.random() < 0.5 ? 0 : width - 240;
               } else {
                  newY = Math.random() < 0.5 ? 0 : height - 240;
               }
               elem.setStyle({
                  left: newX + "px",
                  top: newY + "px",
               });
            },
            true,
            true,
         );
   }
}

class Color {
   constructor(r, g, b, a = 1) {
      this.r = r;
      this.g = g;
      this.b = b;
      this.a = a;
   }
   toString() {
      return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
   }
}

// Smoothly scrolls the window to a specified vertical position over a given duration.
export function smoothScrollTo(endY, duration = 1000) {
   const startY = window.scrollY;
   const maxScrollY = document.documentElement.scrollHeight - window.innerHeight;
   const targetY = Math.max(0, Math.min(endY, maxScrollY));
   const distanceY = targetY - startY;
   let startTime = null;

   // Easing-Funktion: EaseInOutCubic für weichere Übergänge
   function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
   }

   function scroll(currentTime) {
      if (startTime === null) {
         startTime = currentTime;
      }
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1); // Stellen Sie sicher, dass der Fortschritt nicht > 1 ist
      window.scrollTo(0, startY + distanceY * easeInOutCubic(progress));
      if (timeElapsed < duration) {
         requestAnimationFrame(scroll);
      }
   }
   requestAnimationFrame(scroll);
}
