<platform-base-context>
User = Coach
Client = Customer of Coach

We are building a platform where user (coach) can create their AI-based clones, so those clone can interact (in terms of chatbot) with their users, talk to them, extract key insights and provide them with structured report
</platform-base-context>

<header>
- Logo / System Title
- Right: Admin Profile, Language Selection, Logout
- Center: Simple label or description of the currently active menu
</header>

<main-menu>
- User Management
- Clone Coach Training
- Messenger Management
</main-menu>

<dashboard-page-flows>

When a coach clicks on their profile photo on the homepage, the main dashboard screen opens.
From here, coaches can intuitively understand the purpose of each main menu displayed on the screen:

- User Management: Manage everything
  about your clients
- Clone Coach Training: Manage and train
  your personalized AI chatbot
- Messenger Management: Oversee all
  communications with your clients

</dashboard-page-flows>

<user-management-page-flows>

- Page Name
- Short description of the page

Highlights an overview of all users, flags potentially problematic users, and provides example alert messages to guide administrative attention.

Top: Filters and Search Bar

- Filter by user name, coach name, program stage, participation status, etc.

Center: User List (Table)
Name / Current Stage / Attendance Rate / Chatbot Match / Recent Activity / Risk Indicators / Actions

Bottom: Pagination
</user-management-page-flows>

<user-management-detail-page-flows>

Layout:

- Page Name
- Short description of the page

- 1st Row: Selected User's name and active program
- 2nd Row: Progress, Goal Achievement Graph / Session Attendance History (absense: 0, present: 1)
- 3 Columns
    - 1st Column:
        - Schedule Information
        - Planned total session: total weeks
        - current session: 3/5
        - Date of scheduled: 2025.May.25 13:00
        - Clone coach schedule: Mon-Sun (9:00 PM)
        - Box Container
            - Upload Session audio file
    - 2nd Column:
        - Last week session summary: summary of human coach and chatbot sessions
        - Overall session summaries: period select, generate report of overall session (goal achievement, graph overall, session summary, coach's opinion)
    - 3rd Column:
        - Notes of Special Cases
            - What chatbot need to do (Input type)
            - The note that necessary to remember
</user-management-detail-page-flows>

<clone-coach-training-page-flows>

Layout:

- Page Name
- Short description of the page

3 Columns Layout

- 1st Column:
    - Knowledge Base
        - For coach style
        - for program content
- 2nd Column:
    - Prompt Configuration
        - List of chatbots (button) - it will open a modal
            - Listing of chatbots
                - Name / Linked Users / Training Status / Last Used Date / Buttons: Retrain, Preview, Reassign / Linked knowledge base folder
            - Create chatbot (button) - it will change the modal to create chatbot modal
        - Selected chatbot that want to edit
        - Prompts, persona etc per chatbot
- 3rd Column:
    - Preview Chatbot
        - Select chatbot that want to preview
        - Preview chatbot response

</clone-coach-training-page-flows>

<messenger-management-page-flows>

Layout:

- Page Name
- Short description of the page

2 Columns Layout

- 1st Column:
    - Kakao Integration (popup) / Connection status / if account connected then details from kakao
        - set up profile name and photo to use by
            - kakaotalk, send test messege sending
            - function.
            - Enable linkage between chatbots and users via KakaoTalk ID
            - Configure specific chatbot-to-user
            - assignments for Kakao messaging
            - Set up automated recurring messages using schedules
            - Send manual messages directly from the dashboard
            - Manage message templates for batch messaging
            - Track and archive full KakaoTalk conversations, downloadable by coach
    - List of connection of each client by a selected chatbot through kakao
- 2nd Column:
    - Settings
    - Message/log Management
        - Scheduled Message Setup (Calendar UI + Template Selection)
        - Manual Message Entry (by coach)
        - Download Complete Chat Logs (per user or full archive)

</messenger-management-page-flows>


Notes:
- currently we don't have components and pages and your task is to create them based on the flows, we are using shadcn for the components (you can find shadcn components in src/components/ui) and nextjs app router
- You must analyze the /api-documentation folder to get the complete idea of what we are building and you will certainly find that they are some missing or maybe mismatced APIs, so in that we have find the balance as after implementing the UI, we need to integrate those APIs (not now), so must consider the api-documentation
- we are not touching the admin dashboard for, all of the work needs to be done under /app/[locale]/dashboard, obviously we will have to create the components under /components folder to keep everything clean and organized
- internationalization is already in place we have two languages (english and korean), so you not write any text directly in the code, you must use the `useTranslations` hook to get the text from the translation files