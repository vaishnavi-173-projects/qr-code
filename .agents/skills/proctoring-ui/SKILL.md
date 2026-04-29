---
name: proctoring-ui
description: UI patterns for the split-screen proctored interview page — webcam feed, face detection overlay, AI avatar, audio controls, and chat conversation.
---

# Proctoring UI Pattern

Use this skill when building the `/interview/:sessionId` page.

## Layout: Split Horizontal (60/40)

```
┌─────────────────────────┬──────────────────────┐
│ Chat Conversation (60%) │ Dual Video Panel (40%)│
│ - Interviewer bubbles   │ - Webcam (You)        │
│ - Candidate bubbles     │ - AI Avatar (Alex)    │
│ - Auto scroll           │ - Face status badge   │
├─────────────────────────┴──────────────────────┤
│ Answer Input Bar                                │
│ [🎤 Mic] [Type your answer...] [Send →]        │
├─────────────────────────────────────────────────┤
│ Session Header: Role | ⏱ Timer | [End Interview]│
└─────────────────────────────────────────────────┘
```

## Key Rules

1. **Webcam feed**: Use `<video ref>` with `getUserMedia({ video: true, audio: true })`.
2. **Face detection overlay**: Draw a canvas overlay on top of the video element. Green border = face detected, red border = no face.
3. **Face status badge**: Show "✅ Face Detected" or "⚠️ No Face" in real-time.
4. **AI Avatar**: Use a static colored div with initials "AI" or an avatar image. No actual video.
5. **Audio recording**: Mic button toggles recording. Pulse animation when recording. Stop = upload blob.
6. **Send flow**: If audio recorded → upload audio first → then POST /interview/answer with audio_path. If text only → POST /interview/answer with text.
7. **IntegrityMonitor**: Mount invisibly, log face_count > 1 as multi_face event.
8. **Question flow**: On page mount → POST /interview/question to get first Q. On each Send → POST /interview/answer → then POST /interview/question for next Q.
9. **End interview**: POST /interview/end → redirect to /analysis/:sessionId.

## Accessibility
- Mic button: aria-label="Start/Stop recording"
- Video: Include a visually hidden label "Your webcam feed"
- All buttons keyboard navigable
