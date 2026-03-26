"use client"

// Original Three.js/WebGL scene replaced with a lightweight CSS-only background.
// Reason: WebGL canvas + per-frame geometry updates were causing significant
// jank on lower-end hardware and slowing initial page load (heavy bundle).
// The CSS version achieves the same dark space aesthetic at near-zero CPU/GPU cost.

export function Scene3D() {
  return (
    <div className="w-full h-full relative overflow-hidden bg-[#010308]">
      {/* Static star field — pure CSS, zero JS overhead */}
      <div className="absolute inset-0" style={{
        backgroundImage: `
          radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.8) 0%, transparent 100%),
          radial-gradient(1px 1px at 25% 60%, rgba(255,255,255,0.6) 0%, transparent 100%),
          radial-gradient(1px 1px at 40% 10%, rgba(255,255,255,0.9) 0%, transparent 100%),
          radial-gradient(1px 1px at 55% 80%, rgba(255,255,255,0.5) 0%, transparent 100%),
          radial-gradient(1px 1px at 70% 35%, rgba(255,255,255,0.7) 0%, transparent 100%),
          radial-gradient(1px 1px at 85% 55%, rgba(255,255,255,0.8) 0%, transparent 100%),
          radial-gradient(1px 1px at 15% 90%, rgba(255,255,255,0.4) 0%, transparent 100%),
          radial-gradient(1px 1px at 90% 15%, rgba(255,255,255,0.6) 0%, transparent 100%),
          radial-gradient(1px 1px at 35% 45%, rgba(255,255,255,0.5) 0%, transparent 100%),
          radial-gradient(1px 1px at 60% 70%, rgba(255,255,255,0.7) 0%, transparent 100%),
          radial-gradient(1px 1px at 78% 88%, rgba(255,255,255,0.4) 0%, transparent 100%),
          radial-gradient(1px 1px at 5%  50%, rgba(255,255,255,0.6) 0%, transparent 100%),
          radial-gradient(1px 1px at 48% 28%, rgba(255,255,255,0.5) 0%, transparent 100%),
          radial-gradient(1px 1px at 92% 72%, rgba(255,255,255,0.8) 0%, transparent 100%),
          radial-gradient(1px 1px at 20% 5%,  rgba(255,255,255,0.7) 0%, transparent 100%),
          radial-gradient(1px 1px at 63% 42%, rgba(255,255,255,0.3) 0%, transparent 100%),
          radial-gradient(1px 1px at 7%  75%, rgba(255,255,255,0.6) 0%, transparent 100%),
          radial-gradient(1px 1px at 82% 30%, rgba(255,255,255,0.5) 0%, transparent 100%),
          radial-gradient(1px 1px at 45% 95%, rgba(255,255,255,0.4) 0%, transparent 100%),
          radial-gradient(1px 1px at 30% 67%, rgba(255,255,255,0.7) 0%, transparent 100%)
        `
      }} />

      {/* Subtle cyan nebula glow — top left */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #0ea5e9 0%, transparent 70%)', filter: 'blur(40px)' }} />

      {/* Subtle orange glow — bottom right */}
      <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full opacity-8"
        style={{ background: 'radial-gradient(circle, #f97316 0%, transparent 70%)', filter: 'blur(50px)' }} />

      {/* Faint center horizon line */}
      <div className="absolute top-1/2 left-0 right-0 h-px opacity-5"
        style={{ background: 'linear-gradient(90deg, transparent 0%, #0ea5e9 50%, transparent 100%)' }} />
    </div>
  )
}
