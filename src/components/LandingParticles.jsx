import React, { useState, useEffect } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; // or loadBasic, loadFull

export default function LandingParticles() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  // Optional: define particlesLoaded if you want to use it
  const particlesLoaded = async () => {};

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      particlesLoaded={particlesLoaded}
      options={{
            background: { color: "transparent" },
            fpsLimit: 60,
            interactivity: {
                events: {
                onClick: { enable: false }, // ✅ Disable burst
                onHover: { enable: true, mode: "repulse" },
                resize: true
                },
                modes: {
                repulse: { distance: 100, duration: 0.4 }
                }
            },
            particles: {
                color: { value: ["#00ffe0", "#ff9aff", "#80d8ff", "#b388ff"] },
                links: { enable: true, distance: 150, color: "#ffffff", opacity: 0.2 },
                move: { enable: true, speed: 1.5, direction: "none", outModes: "bounce" },
                number: { value: 60, density: { enable: true, area: 800 } },
                opacity: { value: 0.4 },
                shape: { type: "circle" },
                size: { value: { min: 1, max: 3 } }
            },
            detectRetina: true
            }}
    />
  );
}
