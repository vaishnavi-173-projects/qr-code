---
name: integrity-engine
description: Patterns for the frontend Integrity Monitor and backend Trust Score.
---

# Integrity Engine Guide

Use this skill when implementing proctoring and integrity tracking.

## 1. Frontend: IntegrityMonitor Component
- Use a hidden component `IntegrityMonitor.jsx` mounted during Aptitude and Coding phases.
- Listeners:
  - `visibilitychange`: Detect tab switching.
  - `blur` on window: Detect losing focus.
  - `paste`: Block/warn during coding.
  - `contextmenu`, `copy`: Block during aptitude.
- Batching: Store events in an array, send to `POST /api/v1/integrity/log` every 30 seconds.
- Urgent Flush: Send immediately on critical violation (e.g., paste attempt).
- Cleanup: Flush any remaining events on unmount.

## 2. Backend: Trust Score Engine
- Starts at 100.
- Rules:
  - Tab switch: -10
  - Window blur: -5
  - Multiple faces: -20
  - No face: -15
  - Copy/Paste attempt: -25
- Floor is 0 (never negative).
- Provide classification: High (80+), Medium (50-79), Low (20-49), Critical (<20).
