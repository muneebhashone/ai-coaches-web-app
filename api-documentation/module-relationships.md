# Module Relationships

This diagram shows the relationships and dependencies between all modules in the Julia Coach AI Backend system.

```mermaid
graph TB
    %% Core User Management
    Users[Users Module]
    Auth[Authentication Module]

    %% Client Management
    Clients[Clients Module]
    ClientKakao[Client Kakao Integration]

    %% Core AI System
    Chatbots[Chatbots Module]
    Programs[Programs Module]
    Sessions[Sessions Module]
    Chats[Chats Module]

    %% Knowledge Management
    KnowledgeBases[Knowledge Bases Module]
    Documents[Documents Module]
    HumanMimicry[Human Mimicry Module]
    AudioTranscribe[Audio Transcribe Module]

    %% AI Infrastructure
    VectorStore[Vector Store Module]
    Training[Training Module]

    %% Infrastructure
    S3[S3 Module]
    HealthCheck[Health Check Module]

    %% Authentication Flow
    Auth --> Users
    Users --> Auth

    %% Client Management Flow
    ClientKakao --> Clients
    Clients --> Auth

    %% Core System Relationships
    Users --> Chatbots
    Chatbots --> Programs
    Programs --> Sessions
    Sessions --> Chats
    Chats --> Clients
    Chats --> Chatbots

    %% Knowledge Management Flow
    Chatbots --> KnowledgeBases
    KnowledgeBases --> Documents
    Documents --> S3
    Chatbots --> HumanMimicry
    AudioTranscribe --> KnowledgeBases
    AudioTranscribe --> S3

    %% AI Infrastructure
    KnowledgeBases --> VectorStore
    Documents --> VectorStore
    Training --> Chatbots
    Training --> KnowledgeBases
    Chats --> VectorStore

    %% External Dependencies
    S3 -.-> Documents
    S3 -.-> AudioTranscribe
    VectorStore -.-> Chats

    classDef userMgmt fill:#e1f5fe
    classDef clientMgmt fill:#f3e5f5
    classDef coreSystem fill:#e8f5e8
    classDef knowledge fill:#fff3e0
    classDef infrastructure fill:#fce4ec
    classDef aiInfra fill:#f1f8e9

    class Users,Auth userMgmt
    class Clients,ClientKakao clientMgmt
    class Chatbots,Programs,Sessions,Chats coreSystem
    class KnowledgeBases,Documents,HumanMimicry,AudioTranscribe knowledge
    class S3,HealthCheck infrastructure
    class VectorStore,Training aiInfra
```

## Module Categories

### 🔐 User Management

- **Users**: Core user management (coaches, admins)
- **Authentication**: Login, registration, OAuth, JWT management

### 👥 Client Management

- **Clients**: Client profile management
- **Client Kakao**: KakaoTalk integration for client onboarding

### 🤖 Core AI System

- **Chatbots**: AI chatbot configuration and management
- **Programs**: Coaching program definitions
- **Sessions**: Individual coaching session management
- **Chats**: Real-time chat interactions between clients and AI

### 📚 Knowledge Management

- **Knowledge Bases**: Document collections for AI training
- **Documents**: File upload and processing (PDF, DOCX, etc.)
- **Human Mimicry**: Coach communication style training data
- **Audio Transcribe**: Audio file transcription and processing

### 🔧 AI Infrastructure

- **Vector Store**: Semantic search and embeddings management
- **Training**: AI model training and fine-tuning

### 🛠️ Infrastructure

- **S3**: File storage and management
- **Health Check**: System health monitoring

## Key Relationships

1. **Coach → Chatbot → Program → Session → Chat**: Core workflow
2. **Knowledge Base → Documents → Vector Store**: Knowledge processing pipeline
3. **Audio Transcribe → Knowledge Base**: Audio content integration
4. **Human Mimicry → Chatbot**: Personality training
5. **Client → Chat**: End-user interaction point
