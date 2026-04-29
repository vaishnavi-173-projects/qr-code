---
description: Audio capture pattern for AI Placement Intel using MediaRecorder and Whisper
---

# Audio Capture Pattern

## Frontend (React)
Use the `MediaRecorder` API to capture audio during the interview simulation.
1. Request `getUserMedia({ audio: true })`.
2. Store chunks of data on `ondataavailable`.
3. Resolve the Blob as `audio/webm` on `onstop`.
4. Upload to the FastAPI backend using multipart/form-data.

## Backend (FastAPI + Python)
1. Accept the WebM upload and save the file with a unique name matching the session and question id.
2. Use `ffmpeg-python` or a subprocess to convert WebM to WAV (Whisper requires standard audio formats).
3. Use the OpenAI Whisper model (local `tiny` or `base` model to save costs/time, or API) to transcribe the audio.
4. Provide metrics: Words Per Minute (WPM), Filler Word Count, Pause Count, and Average Pause Duration.
