---
name: face-detection
description: Implementation patterns for face-api.js in React for AI Placement Intel.
---

# Face Detection Implementation Guide

Use this skill when implementing webcam-based face tracking using `face-api.js` in a React frontend.

## 1. Setup Models
- Models must be downloaded to `/public/models/`.
- Required: `tiny_face_detector_model-weights_manifest.json`, `face_landmark_68_model-weights_manifest.json`.

## 2. useFaceDetection Hook
Create `useFaceDetection.js` that:
1. Requests camera permissions.
2. Loads models on mount.
3. Sets up an interval (e.g., 3000ms) to run `faceapi.detectAllFaces`.
4. Returns state: `{ isLoaded, faceCount, isLookingAway, error }`.

## 3. Error Handling
- Handle "Camera permission denied" gracefully (do not crash).
- Show warning to user to enable permissions.

## 4. Performance
- Use `TinyFaceDetectorOptions` for speed.
- Do not run detection on every requestAnimationFrame; use a balanced interval (3s).
