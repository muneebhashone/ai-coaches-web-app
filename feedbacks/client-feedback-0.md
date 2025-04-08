# For Developers: Consolidated Round 1 UI Feedback & Feature Suggestions

_(From: Julia – Based on Research & User Experience Perspective)_

Thank you for your efforts in developing the drafted UI structure and feature flow.
To further refine this solution in preparation for both research and real-world application,
I would like to provide the following detailed suggestions and feedback. These points have
been designed to integrate smoothly into the existing framework with the hope of
collaboratively achieving an even more robust and impactful result.

- The dashboard structure is well-designed around the coach's perspective, and the
  visual arrangement effectively highlights key statistics and user flow.
- Configuring chatbot prompts for each coach individually embodied well is highly
  valuable for enabling personalization and professional differentiation in coaching.
- Automatic collection of user progress and data significantly reduces the coach's
  workload, a notable strength.
- The placement and usability of core features such as Knowledge Base, Integrations,
  and Session Summary have been well thought out.

## Feature-by-Feature Feedback and Improvement/Expansion Suggestions

### 1. Dashboard: Enhanced Data Details & Automated Collection

- Enable clickable metrics to reveal detailed user insights (e.g., progress, goals, number
  of sessions).
- Automatically collect user profiles (age, gender, occupation, etc.) during the chatbot's
  initial interaction and sync with the database.
- For "Avg. Progress", track two parallel indicators: number of sessions and goal
  achievement rate.
- After each session, prompt the user with 1–2 Likert scale questions to automatically
  assess action plan follow-through, emotional state, and goal progress—visualized via
  charts.

### 2. Manage Chatbot: Fine-Tune User Style

- Add UI fields for coaches to provide specific instructions about individual users.
  - e.g., "This user is sensitive to emotional tone—please lead with empathetic
    phrases."

### 3. Knowledge Base Expansion

- The current structure allowing coaches to upload theories, tools, and program guides
  for chatbot reference is highly practical.
- Please clarify file format support (PDF, DOC, CSV) and any limits on file count.
- Consider developing a visual indicator showing what materials are currently
  integrated into the chatbot's memory.

### 4. Session & Summary Feature Enhancement

- Upon user click: display full chat log, session summary, and download option.
- Automated summary to include:
  - Key discussion topics
  - Coach reference notes for next session
  - Status of uncompleted action items
- Audio upload feature:
  - Coaches can upload session recordings for chatbot to analyze and summarize
    content.
- Add alert icons next to Status for any updates missing between chatbot and human
  sessions.

### 5. Session Analysis & Satisfaction Visualization

- At the end of each week, chatbot asks users simple Likert-scale questions (e.g., "How
  well did you follow this week's action plan?").
- Visualize weekly progress and satisfaction trends in graph format.

### 6. Feedback Messaging – Bulk Distribution Tool

- Allow admin or coach to send surveys/questions to all (or selected) users at specific
  times.
  - e.g., "March Coaching Satisfaction Survey" → All chatbots send the same
    prompt simultaneously.

### 7. Integrations: Clarify User Scenarios

- For KakaoTalk integration: provide sample screens showing how the chatbot will
  appear on both user and coach interfaces.
- Test visual elements such as sender name, profile picture, and message layout.
- Include optional interface to send announcements or bulk messages.

### 8. Suggestions

#### 8-1. User Auto-Segmentation

- Automatically tag users as "High Progress", "Low Response", or "Stalled" based on
  conversation volume and goal progress.
  → Helps coaches quickly assess user status.

#### 8-2. Chatbot-to-Coach Feedback Report

- Chatbot sends short comments like "This user may need special attention in the next
  session."
  → Creates a feedback loop between chatbot and coach.

#### 8-3. Session Timing Recommendations

- Chatbot analyzes user patterns and suggests to the coach: "Consider scheduling a
  session this week."

#### 8-4. Chatbot Training Status by Coach

- Provide a visual dashboard to see which Knowledge Base materials are active and
  what tone the chatbot is using, enabling coach-driven improvements.

#### 8-5. Multilingual Support

- Default to Korean/English, with potential expansion to selectable language settings.

#### 8-6. GDPR & Data Privacy

- Include consent check at first interaction, request data deletion, and allow setting for
  data storage frequency.

### 9. Intelligent Monitoring, Scheduled Interactions & Messaging Frequency Settings

- **Abnormal Conversation Alert**  
  If the chatbot or user engages in unusual or inappropriate conversation patterns (e.g.,
  irrelevant messages, concerning emotional cues, or offensive language), an automated
  alert should be sent to both the admin and the assigned coach. This allows for timely
  human intervention and helps ensure the coaching environment remains safe and
  supportive.

- **Scheduled Chat Notifications & Conversation Triggers**  
  The chatbot should be able to send messages at pre-agreed times based on the
  schedule set between the coach and the user. At the scheduled time, the chatbot sends
  a natural and friendly prompt to initiate the conversation, signaling that it's time for
  their check-in or session. This prompt should be conversational in tone to smoothly
  lead into meaningful interaction.
  Simultaneously, email notifications should also be sent to both the user and the coach
  to ensure no one misses the session.

- **Customizable Chat Frequency per User**  
  Coaches should be able to set the expected frequency of chatbot-user interactions on a
  per-user basis (e.g., 2 times per week). This setting will guide the chatbot's messaging
  behavior and ensure consistency in user engagement according to the coaching plan.

## User Roles & Permission Structure Proposal

| Role  | Scope of Access & Functions                                                                    |
| ----- | ---------------------------------------------------------------------------------------------- |
| Admin | Manage all coaches/users, view stats, enable/disable features, system settings                 |
| Coach | Configure own chatbot, manage users, upload knowledge materials, view session summaries        |
| User  | Interact with chatbot, respond to check-ins, submit feedback surveys (UI should be simplified) |
