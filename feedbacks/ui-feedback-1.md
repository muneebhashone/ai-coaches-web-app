# 2025.APR.11 Feedback After First Meeting on 2025.APR.10

## Overall Feedback

### 1. User-Centric Coach Dashboard

- The main dashboard should display the total number of users. Clicking on this count should lead to the user management interface.
- Selecting a user should open a single comprehensive user management view where coaches can:
  - View the user's past session summaries
  - Track goal achievement progress (with visual indicators)
  - Review user-specific notes or issues
  - Input tailored instructions to the chatbot for that specific user

### 2. Chatbot Alerts & Critical Topic Detection

- The chatbot must be able to detect sensitive or alarming topics (e.g., distress, crisis language) during user conversations.
- In such cases, it should immediately notify the coach and trigger an automated message to the user suggesting a referral to a professional counselor.
- **Scheduling Interface**: Coaches can set specific times for daily chatbot-initiated check-ins for each user.
- **Retry Mechanism**: If a user does not respond, the system should automatically attempt to resend the check-in after a configurable interval.
- **Customization**: Allow coaches to customize the initial greeting message, e.g., “Hi [Name], ready for today’s check-in?”

### 3. Weekly Coaching Report Functionality

- After each weekly coaching session, the coach should have the option to automatically generate a summary report for the user.
- The report should include a brief textual summary and simple progress graphs.
- This report should be sent to the user via the integrated messenger (e.g., KakaoTalk).

### 4. End-of-Program Summary Report

- At the completion of the entire coaching program, the system should generate a comprehensive progress summary, showing:
  - Overall goal achievements
  - Emotional journey
  - Key highlights or challenges
  - Visual analytics and summary charts

### 5. Integration of Human Coaching Session Audio

- Human coaches should be able to upload audio files of their sessions.
- The AI must process these recordings (after conversion to text) to adapt chatbot conversations accordingly in follow-up interactions.
- A clear uploading interface and guideline should be provided to the coach for this purpose.

### 6. Simplified and Functional Menu Design

- Avoid clutter by minimizing menu categories in the coach dashboard.
- Recommended core menus:
  1. User Management – View and manage all users
  2. Chatbot Training – Input and manage training data for chatbot customization
  3. Messenger Integration – Manage connections and settings for external messaging platforms

### 7. Admin Dashboard Functions

- Admins should be able to click on any coach and instantly view:
  - The current status of all users managed by that coach
  - A total summary of progress and engagement metrics per coach
- Admin-level analytics should show total user stats per coach, allowing for system-wide monitoring.

### 8. Prioritize UI/UX Intuitiveness

- The interface must be intuitive and beginner-friendly, especially for users unfamiliar with coaching platforms or tech tools.
- This usability-first approach is crucial for the future scalability and marketing potential of the solution.

---

For this solution to succeed, it is essential that a coach can fully manage a user's journey from a single view and interact with the AI chatbot effectively. Key features such as alert-based notifications, automated reporting, integration of human session data, and a simple UI are critical. Intuitive design is not just a preference—it is a strategic necessity for user adoption and future growth.

---

## Overall Structure – Flowchart Outline

**[Coach login] -> [Main Dashboard]**

- Total User count and Summary stats (attendance, goal attain progress)

**[User Management] [Clone Coach Training] [Messenger Manage]**

---

## User Management Flow

**Click “User management” -> User List screen -> Click on a specific User**

### Single-Page User Management View – UI Structure Summary

#### 1. Initial User Click → Enters User Detail View

- When a coach clicks on a specific user, they enter the User Detail View (user profile).
- This screen includes an overview of the user’s currently active program and allows managing all aspects in one place.

#### 2. UI Layout Structure (from top to bottom)

- **Current Program Banner**

  - Show the currently ongoing coaching program title at the top
  - _Ex: “Currently in: Stress Reduction Coaching Program”_

- **List of All Coaching Programs (Joined by the User)**

  - Display a list of past and current coaching programs (selectable)
  - Coaches can add a new program to this list as needed

- **When a Program is Selected → Show Sessions Below**

  - Each program expands to show its related session slot list  
    _E.g.:_
    - Session 1 (H10APR2025) – Human Coach  
      _Coach uploads Audio file → AI converts Audio to text → AI learns from it → chatbot adapts follow-up conversation_
    - Session 2 (C11APR2025) – Chatbot

- **Click on a Session → Show Session Details**

  - View the full conversation log from both human and chatbot sessions
  - Highlight key exchanges if needed

- **Integrated Timeline**

  - Display both AI chatbot conversations and human coaching session logs in a chronological timeline

- **Session Details**

  - Include timestamps, session types (AI or human), and brief summaries for quick reference

- **Search and Filter**
  - Enable coaches to search and filter sessions based on date ranges, session types, or keywords

#### 3. Additional Features on the Same Page

- **Weekly Summary Button**: See summary for selected week
- **Whole Summary Button**: See entire session history grouped by program
- **Goal & Attendance Progress**: Display graphs showing progress over time
- **Alerts and Notifications**: Highlight any missed check-ins
- **Special Notes**: Add/view any important notes per user
- **Custom Chatbot Instructions**: Input tailored guidance for the chatbot
- **Send Report**: Option to send weekly or final report to the user via messenger

#### 4. Next Session Preparation Widget

- **Weekly Summary**: Aggregate data from the past week, including goal progress and notable interactions
- **Emotional Analysis**: Summarize detected emotional trends from AI chatbot interactions
- **Key Highlights**: Identify significant events or concerns that may need to be addressed in the next session

#### 5. Predefined AI Response Templates

- **Template Library**: Coaches can create and manage a library of response templates
- **Trigger Conditions**: Define specific conditions or keywords that trigger the use of a particular template
- **Editing Tools**: Provide a user-friendly interface for creating and editing templates

---

**Visual Layout Tip:**  
Use a collapsible card-style layout:

- Top = Current Program
- Below = List of Programs (expandable)
- Inside = Session List
- Inside Session = Logs, Summaries, Goals, Notes, Buttons (all inline or tabs)

---

## Clone Coach Training

### Chatbot Training Flowchart

**Top-level menu: “Clone Coach Training”**

**Chatbot Training Main Interface**

- Upload Knowledge Base File
- View Uploaded Files List
- Add Chatbot Instructions
- **Engagement Metrics**: Check-in completion rates, average response times, sentiment analysis
- **User Activity Feed**: Show recent chatbot-user interactions with timestamps and summaries
- **Anomaly Detection**: Highlight any irregularities or concerns

**Step 1: Upload Knowledge File**

- Click “Upload Knowledge File” → File upload window opens → Coach selects file (.txt, .docx, .pdf, etc.)
  - No need to enforce strict file types
  - Suggest naming convention, e.g., `sessionNote_StressProgram_Apr2025`

**Step 2: Manage Uploaded Files**

- Coach sees list of uploaded files
- Each file can be tagged with optional notes (e.g., “Use for tone adjustment”, “case example”)

**Step 3: Add Custom Instruction**

- Click “Add chatbot Instructions” → Input Box opens
- Coaches can add prompt engineering or behavioral notes (e.g., Persona guidelines)

**Step 4: Group Knowledge Base Files**

- Allow grouping by program or theme

_Example:_

- **"Stress Reduction Program"**
  - stress_notes.pdf
  - example_dialogues.txt
- **"Career Coaching"**
  - reflective_prompts.docx

---

## Messenger Manage

### 1. Connection Status

- Show whether KakaoTalk is properly linked for each user
- Allow reconnection if needed
- Coach: Manage own account
- Admin: Manage all users/coaches

### 2. Message Logs

- Display history of:
  - Messages sent by the chatbot
  - Messages sent manually by the coach
- Coach: Own users only
- Admin: All users

### 3. Manual Message Sender

- Coaches can send personalized messages via KakaoTalk  
  _Examples: motivational messages, reminders, announcements_
- Coach: Yes
- Admin: Optional (toggle-based)

### 4. Auto Message Templates

- Triggered by:
  - Session reminders (custom greeting, retry mechanism)
  - Crisis detection
  - Weekly/final report delivery
- Admin: Can create/edit templates
- Coach: Can select and use approved templates

### 5. Chatbot Test Console

- Interface to simulate chatbot interactions
- Useful for testing responses and prompts
- Admin: Full access
- Coach: Optional (training use only)

### 6. Conversation Backup / Export

- Export logs in PDF or CSV
- Coach: Own users only
- Admin: All users
