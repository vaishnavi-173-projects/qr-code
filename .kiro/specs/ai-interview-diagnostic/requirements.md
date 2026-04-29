# Requirements Document

## Introduction

The AI Interview Diagnostic System is a web-based platform that conducts AI-powered mock interviews, captures multi-dimensional response data, and produces a personalized diagnostic report with a root cause analysis and improvement roadmap. The system targets engineering students, placement training cells, and first-time job seekers — particularly those from Tier-2/Tier-3 colleges and non-English backgrounds — who practice interviews but still fail because they lack deep, personalized feedback.

## Glossary

- **System**: The AI Interview Diagnostic System as a whole
- **Student**: A registered user who takes mock interviews
- **Session**: A single end-to-end mock interview interaction
- **Interviewer**: The AI component that generates and asks interview questions
- **Analyzer**: The component that processes captured responses across all dimensions
- **Root_Cause_Engine**: The component that maps symptoms to underlying causes and impacts
- **Report**: The final diagnostic output generated after a Session
- **Roadmap**: The personalized, day-by-day improvement plan generated from a Report
- **Tracker**: The component that records and visualizes progress across multiple Sessions
- **Transcript**: The text representation of a Student's spoken or typed responses
- **Readiness_Score**: A numeric score (0–100) representing overall interview readiness
- **STAR**: Situation, Task, Action, Result — a structured answer framework
- **Filler_Word**: Non-content speech tokens such as "uh", "um", "like", "you know"
- **Dimension**: One of the five analysis axes: Communication, Thinking & Structure, Confidence, Technical Depth, Behavioral Traits
- **Resume_Engine**: The component that parses uploaded PDF resumes, extracts skills, and suggests matching roles
- **Company_Engine**: The component that stores company-specific round configurations and sequences rounds for a Session
- **Aptitude_Engine**: The component that presents timed multiple-choice questions, tracks navigation state, and evaluates aptitude responses
- **Coding_Engine**: The component that presents coding problems, executes submitted code via Judge0, and evaluates test case results
- **Integrity_Engine**: The component that monitors anti-cheat signals (tab switches, paste events, typing patterns, face presence) and computes a Trust_Score
- **Trust_Score**: A numeric score (0–100) representing the estimated authenticity of a Student's Session based on integrity signals
- **AptitudeQuestion**: A multiple-choice question with one correct answer, belonging to a company's aptitude round
- **CodeSubmission**: A Student's source code submitted for a coding problem, along with the chosen programming language
- **Pipeline**: The full hiring simulation flow: Landing → Login → Resume → Role → Company → Aptitude → Coding → Interview → Analysis → Report

---

## Requirements

### Requirement 1: User Registration and Session Setup

**User Story:** As a student, I want to register and configure a mock interview session, so that I can receive role-specific questions relevant to my target job.

#### Acceptance Criteria

1. THE System SHALL allow a Student to register with a unique email address and password.
2. WHEN a Student provides an email address that is already registered, THE System SHALL return an error indicating the email is already in use.
3. WHEN a Student logs in with valid credentials, THE System SHALL create an authenticated session and return a session token.
4. IF a Student provides invalid credentials during login, THEN THE System SHALL return an authentication error without revealing which field is incorrect.
5. WHEN a Student initiates a new interview Session, THE System SHALL require the Student to select an interview role from a predefined list (e.g., Software Engineer, HR, Data Analyst).
6. WHEN a Student selects an interview role, THE System SHALL allow the Student to choose between voice input mode and text input mode.

---

### Requirement 2: AI Mock Interview Conduct

**User Story:** As a student, I want the AI to conduct a realistic mock interview with follow-up and pressure questions, so that I experience conditions close to a real interview.

#### Acceptance Criteria

1. WHEN a Session begins, THE Interviewer SHALL present an opening question appropriate to the selected role.
2. WHEN a Student submits a response, THE Interviewer SHALL generate a contextually relevant follow-up question based on the content of that response.
3. THE Interviewer SHALL include at least one pressure or cross-examination question per Session to test the Student's reaction under stress.
4. WHEN a Student's response is vague or incomplete, THE Interviewer SHALL ask a clarifying follow-up question rather than proceeding to the next topic.
5. THE Interviewer SHALL conduct a Session consisting of between 5 and 15 questions, configurable at Session setup.
6. WHEN a Student does not respond within 60 seconds of a question being presented, THE System SHALL record a timeout event and proceed to the next question.

---

### Requirement 3: Response Capture

**User Story:** As a student, I want the system to capture everything about how I answer — not just what I say — so that the analysis is comprehensive.

#### Acceptance Criteria

1. WHERE voice input mode is selected, THE System SHALL capture the Student's audio response and convert it to a Transcript using a speech-to-text engine (Whisper).
2. WHERE text input mode is selected, THE System SHALL record the Student's typed response as the Transcript directly.
3. WHEN a response is captured, THE System SHALL record the response start time and end time to compute response duration in seconds.
4. WHEN a voice response is captured, THE System SHALL detect and count Filler_Words present in the Transcript.
5. WHEN a voice response is captured, THE System SHALL detect and record the count and total duration of pauses exceeding 2 seconds.
6. IF the speech-to-text conversion fails for a voice response, THEN THE System SHALL notify the Student and allow one retry before recording the response as empty.

---

### Requirement 4: Communication Analysis

**User Story:** As a student, I want the system to evaluate how clearly and fluently I communicate, so that I understand my verbal communication weaknesses.

#### Acceptance Criteria

1. WHEN a Transcript is available for a response, THE Analyzer SHALL compute a grammar score by checking for subject-verb agreement errors, tense inconsistencies, and sentence fragments.
2. WHEN a Transcript is available for a response, THE Analyzer SHALL compute a fluency score based on Filler_Word density (count of Filler_Words divided by total word count).
3. WHEN a Transcript is available for a response, THE Analyzer SHALL compute a clarity score based on average sentence length and vocabulary complexity.
4. THE Analyzer SHALL produce a Communication score between 0 and 100 for each response, derived as a weighted average of grammar, fluency, and clarity sub-scores.
5. WHEN all responses in a Session are analyzed, THE Analyzer SHALL compute an aggregate Communication score for the Session as the mean of per-response Communication scores.

---

### Requirement 5: Thinking and Structure Analysis

**User Story:** As a student, I want the system to evaluate whether my answers are logically structured, so that I can learn to use frameworks like STAR.

#### Acceptance Criteria

1. WHEN a Transcript is available for a behavioral question response, THE Analyzer SHALL detect whether the response contains identifiable STAR components (Situation, Task, Action, Result).
2. THE Analyzer SHALL assign a structure score between 0 and 100 based on the proportion of STAR components present and their logical ordering.
3. WHEN a Transcript is available for any response, THE Analyzer SHALL evaluate logical coherence by checking for topic continuity between consecutive sentences.
4. THE Analyzer SHALL produce a Thinking & Structure score between 0 and 100 for each response, derived as a weighted average of structure and coherence sub-scores.
5. WHEN all responses in a Session are analyzed, THE Analyzer SHALL compute an aggregate Thinking & Structure score for the Session as the mean of per-response scores.

---

### Requirement 6: Confidence Detection

**User Story:** As a student, I want the system to detect signs of low confidence in my responses, so that I can work on projecting confidence during interviews.

#### Acceptance Criteria

1. WHERE voice input mode is selected, THE Analyzer SHALL compute a voice stability score based on variance in speech rate (words per minute) across the response.
2. WHERE voice input mode is selected, THE Analyzer SHALL compute a hesitation score based on the count and duration of pauses exceeding 2 seconds.
3. THE Analyzer SHALL produce a Confidence score between 0 and 100 for each response, derived from voice stability, hesitation, and Filler_Word density.
4. WHERE text input mode is selected, THE Analyzer SHALL compute a Confidence score based solely on Filler_Word density and response length relative to question complexity.
5. WHEN all responses in a Session are analyzed, THE Analyzer SHALL compute an aggregate Confidence score for the Session as the mean of per-response Confidence scores.

---

### Requirement 7: Technical Depth Analysis

**User Story:** As a student applying for technical roles, I want the system to evaluate the correctness and depth of my technical answers, so that I know where my knowledge gaps are.

#### Acceptance Criteria

1. WHERE the selected role is a technical role (e.g., Software Engineer, Data Analyst), THE Analyzer SHALL evaluate each technical question response for keyword coverage against an expected concept list for that question.
2. WHEN keyword coverage is computed, THE Analyzer SHALL produce a correctness sub-score between 0 and 100 based on the proportion of expected concepts mentioned.
3. THE Analyzer SHALL produce an explanation clarity sub-score between 0 and 100 based on the Communication score of the response to a technical question.
4. THE Analyzer SHALL produce a Technical Depth score between 0 and 100 for each technical response, derived as a weighted average of correctness and explanation clarity.
5. WHEN all technical responses in a Session are analyzed, THE Analyzer SHALL compute an aggregate Technical Depth score for the Session as the mean of per-response Technical Depth scores.
6. WHERE the selected role is non-technical (e.g., HR), THE System SHALL omit the Technical Depth Dimension from the Session Report.

---

### Requirement 8: Behavioral Traits Analysis

**User Story:** As a student, I want the system to detect whether my answers seem rehearsed or emotionally unstable under pressure, so that I can present more authentically.

#### Acceptance Criteria

1. WHEN a Transcript is available, THE Analyzer SHALL compute an authenticity score by comparing response phrasing against a corpus of known memorized answer templates and flagging high-similarity matches.
2. WHEN a pressure question response is captured, THE Analyzer SHALL compare the Student's Confidence score on that response against the Session's mean Confidence score to detect emotional stability under pressure.
3. THE Analyzer SHALL produce a Behavioral Traits score between 0 and 100 for each response, derived from authenticity and emotional stability sub-scores.
4. WHEN all responses in a Session are analyzed, THE Analyzer SHALL compute an aggregate Behavioral Traits score for the Session as the mean of per-response Behavioral Traits scores.

---

### Requirement 9: Root Cause Engine

**User Story:** As a student, I want the system to tell me *why* I'm failing, not just *what* is wrong, so that I can address the actual underlying issues.

#### Acceptance Criteria

1. WHEN Session analysis is complete, THE Root_Cause_Engine SHALL identify the lowest-scoring Dimension as the primary weakness.
2. WHEN a primary weakness is identified, THE Root_Cause_Engine SHALL map it to a predefined root cause from a cause library (e.g., "low structure score" → "no answering framework").
3. WHEN a root cause is identified, THE Root_Cause_Engine SHALL produce an impact statement describing how that root cause affects interview performance (e.g., "leads to low confidence perception").
4. THE Root_Cause_Engine SHALL produce a minimum of 1 and a maximum of 3 root cause entries per Session, ordered by severity.
5. WHEN multiple Dimensions score below 50, THE Root_Cause_Engine SHALL identify a cross-dimensional pattern and produce a combined root cause entry.

---

### Requirement 10: Diagnostic Report Generation

**User Story:** As a student, I want to receive a complete diagnostic report after my interview, so that I have a clear picture of my performance and what to fix.

#### Acceptance Criteria

1. WHEN a Session is complete and all Dimension scores are computed, THE System SHALL generate a Report containing the Readiness_Score, per-Dimension scores, root cause entries, and key recommendations.
2. THE System SHALL compute the Readiness_Score as a weighted average of all applicable Dimension scores, with weights: Communication 25%, Thinking & Structure 25%, Confidence 20%, Technical Depth 20% (if applicable), Behavioral Traits 10% (remaining weight redistributed proportionally when Technical Depth is omitted).
3. THE Report SHALL include a minimum of 3 and a maximum of 5 actionable recommendations, each linked to a specific root cause entry.
4. WHEN a Report is generated, THE System SHALL persist it and associate it with the Student's account for future retrieval.
5. WHEN a Student requests a previously generated Report, THE System SHALL return the full Report within 2 seconds.

---

### Requirement 11: Personalized Roadmap Generation

**User Story:** As a student, I want a day-by-day improvement plan based on my diagnostic results, so that I know exactly what to practice and in what order.

#### Acceptance Criteria

1. WHEN a Report is generated, THE System SHALL generate a Roadmap consisting of a sequence of daily practice tasks ordered by priority of improvement.
2. THE System SHALL order Roadmap tasks so that the weakest Dimension's improvement activities appear earliest in the plan.
3. THE Roadmap SHALL span between 7 and 30 days, with the duration determined by the number of Dimensions scoring below 60.
4. WHEN a Roadmap is generated, each day entry SHALL specify the practice type (e.g., self-introduction drill, technical explanation exercise, mock under pressure) and estimated duration in minutes.
5. THE Roadmap SHALL be regenerated when a Student completes a new Session, incorporating the latest Dimension scores.

---

### Requirement 12: Progress Tracking

**User Story:** As a student, I want to see how my scores change over time, so that I can stay motivated and know if my practice is working.

#### Acceptance Criteria

1. WHEN a Student has completed more than one Session, THE Tracker SHALL display a time-series chart of Readiness_Score across all Sessions for that Student.
2. WHEN a Student has completed more than one Session, THE Tracker SHALL display per-Dimension score trends across all Sessions.
3. THE Tracker SHALL highlight Dimensions where the score has improved by 10 or more points between the most recent two Sessions.
4. THE Tracker SHALL highlight Dimensions where the score has declined by 5 or more points between the most recent two Sessions.
5. WHEN a Student views the progress dashboard, THE System SHALL display the data within 3 seconds.

---

### Requirement 13: Data Persistence and Retrieval

**User Story:** As a student, I want all my sessions, reports, and roadmaps to be saved, so that I can access them at any time.

#### Acceptance Criteria

1. THE System SHALL persist all Session metadata, Transcripts, per-response scores, Dimension scores, Reports, and Roadmaps in a durable data store.
2. WHEN a Student's account is deleted, THE System SHALL delete all associated Session data, Reports, and Roadmaps within 24 hours.
3. WHEN a Student retrieves a list of past Sessions, THE System SHALL return the list ordered by Session start time, most recent first.
4. THE System SHALL retain Session data for a minimum of 12 months from the Session date unless the Student requests earlier deletion.

---

### Requirement 14: Parser and Serialization

**User Story:** As a developer, I want all structured data to be reliably serialized and deserialized, so that reports and session data are stored and retrieved without corruption.

#### Acceptance Criteria

1. WHEN a Report object is serialized to JSON, THE System SHALL produce a valid JSON document conforming to the Report schema.
2. WHEN a JSON document conforming to the Report schema is deserialized, THE System SHALL produce an equivalent Report object.
3. THE System SHALL serialize and deserialize Report objects such that for all valid Report objects, serializing then deserializing produces an equivalent object (round-trip property).
4. WHEN a Roadmap object is serialized to JSON, THE System SHALL produce a valid JSON document conforming to the Roadmap schema.
5. WHEN a JSON document conforming to the Roadmap schema is deserialized, THE System SHALL produce an equivalent Roadmap object.

---

### Requirement 15: Resume Engine — Upload, Extraction, and Role Suggestion

**User Story:** As a student, I want to upload my resume so that the system can extract my skills and suggest the most relevant interview roles for me.

#### Acceptance Criteria

1. WHEN a Student uploads a PDF file, THE Resume_Engine SHALL extract the raw text content from the file.
2. WHEN text is extracted from a resume, THE Resume_Engine SHALL identify and record a list of recognized skills (e.g., Python, Java, SQL, Machine Learning, DSA) present in the text.
3. WHEN skills are extracted, THE Resume_Engine SHALL map the skill set to a list of suggested roles using a predefined skill-to-role mapping (e.g., Python + Machine Learning → Data Analyst, Data Scientist; Java + DSA → Software Engineer).
4. THE Resume_Engine SHALL suggest a minimum of 1 and a maximum of 5 roles per resume, ordered by match confidence descending.
5. IF the uploaded file is not a valid PDF or exceeds 5 MB, THEN THE System SHALL reject the upload and return a descriptive error message.
6. IF no recognized skills are found in the extracted text, THEN THE Resume_Engine SHALL return an empty skills list and suggest a default set of general roles.
7. WHEN a resume is successfully processed, THE System SHALL persist the extracted text, skills list, and suggested roles associated with the Student's account.

---

### Requirement 16: Company Engine — Company-Specific Round Configuration

**User Story:** As a student, I want to select a target company so that the system simulates that company's specific interview rounds and question style.

#### Acceptance Criteria

1. THE System SHALL maintain a configurable company catalogue containing at least the following entries: TCS and Google.
2. WHEN a Student selects a company, THE Company_Engine SHALL retrieve the round configuration for that company and present the rounds in the defined sequence.
3. THE Company_Engine SHALL define round configurations as follows:
   - TCS: Aptitude round (15 questions), Coding round (1 easy problem), Interview round (5 basic questions).
   - Google: Coding round (2 medium problems), Interview round (4 deep technical questions).
4. WHEN a Student completes a round, THE Company_Engine SHALL automatically advance the Student to the next round in the sequence.
5. IF a Student exits a round before completion, THEN THE System SHALL record the round as incomplete and allow the Student to resume from the same round.
6. WHERE a company configuration is updated in the catalogue, THE System SHALL apply the updated configuration to all new Sessions for that company without affecting Sessions already in progress.

---

### Requirement 17: Aptitude Engine — Timed MCQ Assessment

**User Story:** As a student, I want to take a timed multiple-choice aptitude test so that I can practice under realistic time pressure.

#### Acceptance Criteria

1. WHEN an aptitude round begins, THE Aptitude_Engine SHALL present questions one at a time with a countdown timer displaying the remaining time for the entire round.
2. THE Aptitude_Engine SHALL track the status of each question as one of: Not Visited, Attempted, or Skipped.
3. WHEN a Student selects an answer option, THE Aptitude_Engine SHALL record the selected option and mark the question as Attempted.
4. WHEN a Student clicks Skip on a question, THE Aptitude_Engine SHALL mark the question as Skipped and advance to the next question.
5. THE Aptitude_Engine SHALL allow a Student to navigate to any previously visited question and change their answer before final submission.
6. WHEN a Student initiates submission, THE Aptitude_Engine SHALL display a summary screen showing the count of Attempted, Skipped, and Not Visited questions before confirming submission.
7. WHEN the round timer reaches zero, THE Aptitude_Engine SHALL automatically submit all current answers without requiring Student confirmation.
8. WHEN an aptitude round is submitted, THE Aptitude_Engine SHALL evaluate each response by comparing the selected option against the correct answer and produce a result containing correct count, wrong count, skipped count, and total score as a percentage.
9. IF a Student submits with one or more Not Visited questions, THEN THE Aptitude_Engine SHALL treat those questions as unanswered and not penalize them differently from Skipped questions unless a negative marking rule is configured.

---

### Requirement 18: Coding Engine — Code Execution and Evaluation

**User Story:** As a student, I want to write and run code in a browser-based editor so that I can practice coding problems under interview conditions.

#### Acceptance Criteria

1. WHEN a coding round begins, THE Coding_Engine SHALL present a coding problem with a description, input/output specification, and a set of visible example test cases.
2. THE Coding_Engine SHALL provide a Monaco Editor interface supporting at least Python, Java, and C++ as selectable languages.
3. WHEN a Student submits code, THE Coding_Engine SHALL send the CodeSubmission to the Judge0 API for execution and await the result.
4. WHEN Judge0 returns execution results, THE Coding_Engine SHALL compare the output against both visible and hidden test cases and compute a score as (passed test cases / total test cases) × 100.
5. WHEN test case results are available, THE Coding_Engine SHALL display per-test-case pass/fail status for visible test cases and an aggregate pass rate for hidden test cases.
6. THE Coding_Engine SHALL record the time taken from problem presentation to final submission and the number of submission attempts.
7. IF the Judge0 API is unavailable or returns a timeout, THEN THE System SHALL notify the Student and allow resubmission without consuming an attempt count.
8. IF a submission results in a compilation error or runtime error, THEN THE Coding_Engine SHALL display the error message returned by Judge0 to the Student.

---

### Requirement 19: Integrity Engine — Anti-Cheat Monitoring and Trust Score

**User Story:** As an evaluator, I want the system to detect suspicious behaviour during a Session so that the reported scores reflect genuine student performance.

#### Acceptance Criteria

1. WHILE a Session is active, THE Integrity_Engine SHALL detect and log each instance of the Student switching away from the application tab.
2. WHILE a Session is active, THE Integrity_Engine SHALL detect and log each paste event in any text input field.
3. WHILE a Session is active, THE Integrity_Engine SHALL record typing pattern metrics including average keystroke interval and burst typing events (sequences of keystrokes with inter-key delay below 50 ms).
4. WHERE video capture is enabled, THE Integrity_Engine SHALL detect and log frames in which no face is visible or more than one face is visible.
5. WHEN a Session is completed, THE Integrity_Engine SHALL compute a Trust_Score between 0 and 100 based on the weighted combination of: tab switch count, paste event count, burst typing ratio, and face anomaly frame ratio.
6. THE System SHALL include the Trust_Score in the final Report alongside the Readiness_Score.
7. IF the Trust_Score falls below 50, THEN THE Report SHALL include a flag indicating that the Session integrity is in question, without automatically invalidating the Session.
8. WHEN activity logs are persisted, THE System SHALL store each event with a timestamp and event type for audit purposes.

---

### Requirement 20: Full Pipeline Flow

**User Story:** As a student, I want to move through a complete hiring simulation — from uploading my resume to receiving a final report — so that I experience a realistic end-to-end placement process.

#### Acceptance Criteria

1. THE System SHALL present a Landing page with a hero section, feature highlights, a "How It Works" section, and calls to action for registration and resume upload.
2. WHEN an unauthenticated Student accesses any page beyond the Landing page, THE System SHALL redirect the Student to the Login page.
3. WHEN a Student logs in successfully, THE System SHALL redirect the Student to the Dashboard page displaying past Sessions and a prompt to start a new Pipeline.
4. WHEN a Student starts a new Pipeline, THE System SHALL guide the Student through the following ordered steps: Resume Upload → Role Selection → Company Selection → Aptitude Round (if configured) → Coding Round (if configured) → Interview Round → Analysis → Report.
5. WHEN a Student completes the Resume Upload step, THE System SHALL pre-populate the Role Selection page with the Resume_Engine's suggested roles.
6. WHEN a Student completes all rounds defined by the selected company, THE System SHALL trigger the Analysis pipeline and navigate the Student to the Report page upon completion.
7. IF a Student abandons the Pipeline mid-flow, THEN THE System SHALL persist the current step so the Student can resume from the same point on next login.

---

### Requirement 21: Frontend Pages

**User Story:** As a student, I want a clear and consistent set of pages for each stage of the pipeline so that I can navigate the system without confusion.

#### Acceptance Criteria

1. THE System SHALL provide a ResumeUpload page with a file picker accepting PDF files, an upload progress indicator, and a display of extracted skills and suggested roles after processing.
2. THE System SHALL provide a RoleSelection page listing suggested roles from the Resume_Engine alongside all available roles, allowing the Student to confirm or override the suggestion.
3. THE System SHALL provide a CompanySelection page listing all companies in the catalogue with their round configurations visible before selection.
4. THE System SHALL provide an Aptitude page displaying the current question, answer options, a countdown timer, a question navigation panel showing status (Not Visited / Attempted / Skipped) for each question, and a Submit button that triggers the summary screen.
5. THE System SHALL provide a Coding page displaying the problem statement, the Monaco Editor, a language selector, a Run button for visible test cases, a Submit button for final evaluation, and a results panel showing test case outcomes.
6. THE System SHALL provide a Report page displaying the Readiness_Score, Trust_Score, per-Dimension scores, root cause entries, recommendations, and a link to the generated Roadmap.
7. WHEN any page is loading data from the backend, THE System SHALL display a loading indicator to the Student.
