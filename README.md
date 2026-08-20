# MODEL_HUB

MODEL_HUB is a desktop AI platform built around multi-model collaboration and real-time AI assistance. Users can create multiple chat rooms, select up to four active AI models per room, control their response order, and optionally let the models brainstorm and debate before presenting their conclusions.

The platform will also include an **Assist Mode** for contextual desktop assistance using screen capture, voice input, speech-to-text, vision, and coding/problem-solving support.

## Planned Structure

```text
MODEL_HUB/
├── apps/
│   ├── desktop/        # Electron desktop application and UI
│   └── web/            # Web dashboard/control plane
├── services/
│   └── api/            # Authentication, rooms, models, orchestration, usage
├── packages/
│   ├── ai-core/        # Shared AI abstractions and core logic
│   ├── providers/      # OpenAI, Anthropic, Google, DeepSeek, Ollama, etc.
│   ├── orchestration/  # Room turn-taking and Brainstorm workflows
│   ├── speech/         # Whisper/Parakeet and speech providers
│   ├── vision/         # Screen/image context processing
│   ├── capture/        # Screen, window, and region capture
│   └── shared-types/   # Shared TypeScript types
├── docs/               # Project documentation
└── tests/              # Unit and integration tests
```

## Tech Stack

- **TypeScript** — primary language
- **Electron** — desktop application
- **React** — application UI
- **Vite** — frontend/build tooling
- **Node.js** — backend and desktop services
- **SQLite** — local application data
- **PostgreSQL** — cloud/server data
- **WebSockets / SSE** — streaming AI responses
- **Whisper / Parakeet** — speech-to-text
- **AI Provider Adapters** — OpenAI, Anthropic, Google, DeepSeek, OpenRouter, Ollama and compatible providers

## Expected Capabilities

### AI Rooms

- Multiple independent rooms per user.
- Up to **4 active models per room**.
- Different model selections and roles for each room.
- Ranked or randomized model response order.
- Streaming responses and persistent room history.

### Brainstorm Mode

A user can enable Brainstorm for an individual question so the active models can independently analyze the problem, critique one another, revise their positions, and optionally produce a final synthesis.

### Assist Mode

A user can select a single model to assist with live work using:

- Full-screen, window, region, and manual capture.
- Microphone and speech-to-text input.
- Vision-based screen understanding.
- Coding and coding-challenge assistance.
- Context-aware responses based on voice and screen information.
- Guided setup and dependency checks.

The project is intended to support local-first processing where practical while allowing cloud AI providers to be configured by the user.

## Currently Looking for Contributors

