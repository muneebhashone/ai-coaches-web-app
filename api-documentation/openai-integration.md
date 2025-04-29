# OpenAI Integration

Technical documentation for the OpenAI integration in the chatbot system.

## Overview

The application integrates with OpenAI's API to power conversational AI chatbots. The integration is designed to:

1. Generate responses based on chatbot persona and conversation context
2. Apply consistent system prompts and instructions
3. Support customization of API parameters
4. Maintain conversation history in sessions

## Configuration

### Environment Variables

The OpenAI integration requires the following environment variable:

```
OPENAI_API_KEY=your_openai_api_key
```

### Model Configuration

Each chatbot can have custom API settings:

- `model`: OpenAI model to use (default: "gpt-4o")
- `temperature`: Controls randomness (0-2, default: 1)
- `maxTokens`: Maximum response length (default: 1024)

## Key Components

### OpenAI Service

Located at `/src/lib/openai.service.ts`, this service handles direct communication with the OpenAI API.

```typescript
// Main method for generating responses
async generateChatCompletion(
  messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>,
  options?: {
    model?: string;
    temperature?: number;
    maxTokens?: number;
  }
) {
  // Implementation details in the file
}
```

### Session AI Service

Located at `/src/modules/session/session.ai.service.ts`, this service:

1. Retrieves session, chatbot, and client data
2. Prepares the system prompt with persona and context
3. Formats conversation history
4. Handles the OpenAI API interaction
5. Manages error cases

### Default Prompts

Located at `/src/modules/chatbot/chatbot.prompts.ts`, this module provides:

1. Default system instructions
2. Default prompt templates
3. Helper methods for generating personas

## System Prompt Structure

The system prompt sent to OpenAI follows this structure:

```
[SYSTEM INSTRUCTIONS]

YOU ARE: [Chatbot Name]
YOUR ROLE: [Chatbot Description]

[PROMPT TEMPLATE]

CURRENT SESSION INFORMATION:
Client: [Client Name]
Email: [Client Email]
Phone: [Client Phone, if available]

ADDITIONAL CLIENT INFORMATION:
- [Metadata keys and values]

REMEMBER: Maintain the coaching approach and methodology throughout this session...
```

## Usage Flow

1. Client sends a message to an active session
2. System retrieves relevant chatbot and client information
3. System constructs a context-aware prompt with:
   - Chatbot persona instructions
   - Conversation history
   - Client information
4. Message is processed through OpenAI's API
5. Response is saved to the session and returned to the client

## Error Handling

The integration includes robust error handling:

- API errors are logged and translated to user-friendly messages
- Fallback responses when API fails
- Timeout management for long-running requests

## Security Considerations

- OpenAI API key is never exposed to clients
- User data is only included in prompts, not stored by OpenAI
- System messages explicitly instruct the AI on privacy boundaries