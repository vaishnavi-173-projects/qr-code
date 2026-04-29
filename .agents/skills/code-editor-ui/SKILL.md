---
name: code-editor-ui
description: UI patterns for the Monaco-based coding challenge page — problem statement, language selector, editor, test case panel, run/submit flow.
---

# Code Editor UI Pattern

Use this skill when building the `/coding/:sessionId` page.

## Layout: Split Vertical

```
┌─────────────────────────────────────────────────┐
│ Problem Statement (collapsible top panel)        │
│ Title | Difficulty badge | Description           │
│ Visible test cases                               │
├──────────────────────────┬──────────────────────┤
│ Monaco Editor (left 60%) │ Test Case Panel (40%)│
│ - vs-dark theme          │ - Visible cases      │
│ - Language switcher      │ - Run results        │
│ - Code preserved on lang │ - Pass/Fail per case │
│   switch via starter code│ - STDOUT / STDERR    │
├──────────────────────────┴──────────────────────┤
│ Toolbar: [Language ▼] [⏱ Timer] [▶ Run] [Submit]│
└─────────────────────────────────────────────────┘
```

## Key Rules

1. **Monaco Editor**: Use `@monaco-editor/react`. Default language: python. Theme: `vs-dark`.
2. **Language switch**: Load `starter_code[lang]` from the question data when language changes. Warn user code will be reset.
3. **Run flow**: POST /coding/run → show results per visible test case (pass ✅ / fail ❌ with actual vs expected).
4. **Submit flow**: POST /coding/submit → shows final score, locks editor, shows "Submitted!" state.
5. **Problem statement**: Collapsible with a toggle button. Default: expanded. Remembers collapse state in local state.
6. **Test case panel**: Tabbed (Input | Output | Expected). Color: pass=#00C853, fail=#FF1744.
7. **Timer**: Shared `useTimer` hook. Warning threshold 120s → turns red.
8. **IntegrityMonitor**: Mount during coding. Block `paste` event — show "Paste blocked" toast and log event.
9. **Locked state**: After submit, disable editor, hide Run/Submit buttons, show score card.

## Loading / Error States
- Loading question: skeleton placeholder for problem statement + editor
- Run loading: disable Run button, show spinner in test panel
- Submit loading: show "Submitting..." button state
- API error: show red banner below toolbar
