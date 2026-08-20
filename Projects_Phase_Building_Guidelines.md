# Multi-Model Desktop AI Platform — Project Specification & Phased Roadmap

## 1. Project Summary

This project is a **full desktop AI application** built around two complementary experiences:

1. **AI Rooms** — a group-chat environment where a user assembles up to **four active AI models** in a room. The models can answer sequentially, follow a user-defined or randomized speaking order, or enter a deeper **Brainstorm** process where they independently analyze a question, critique each other's positions, revise their reasoning, and optionally produce a synthesis.
2. **Assist Mode** — a focused desktop assistant where the user selects one AI model to help with live work using voice, screenshots, screen/window/region capture, coding context, and optional audio context.

A user can create **multiple rooms**, and every room has its own model selection, ordering, roles, memory, and settings.

### Core product idea

```text
                    Desktop AI Platform
                           │
              ┌────────────┴────────────┐
              │                         │
          AI ROOMS                  ASSIST MODE
              │                         │
     ┌────────┴────────┐        ┌───────┴────────┐
     │                 │        │                │
  Normal Chat      Brainstorm  Voice          Screen
     │                 │        │                │
  1–4 models        1–4 models STT            Vision
     │                 │        │                │
  Ranked/Random    Debate +    Contextual     Coding/
  turn order       synthesis   assistance      debugging
```

---

## 2. Goals

The application should:

- Allow users to connect multiple AI providers and models.
- Let each room have its own selection of up to four active models.
- Allow unlimited rooms, subject to eventual product/account limits.
- Support ranked and randomized turn order.
- Provide a user-triggered Brainstorm mode.
- Support model roles such as architect, critic, researcher, implementer, and judge.
- Stream model responses in real time.
- Preserve isolated room history and memory.
- Provide one-model Assist Mode for fast contextual assistance.
- Capture the whole screen, a window, or a selected region.
- Support microphone transcription through local or cloud STT.
- Support coding/problem-solving assistance.
- Provide a guided setup process that validates dependencies and permissions.
- Prefer local processing where practical and make cloud processing explicit.
- Be modular enough to add new AI providers and local models without redesigning the application.

---

## 3. Non-Goals

The first release should not attempt to:

- Train its own foundation model.
- Support unlimited simultaneously active models.
- Build a full IDE.
- Automatically modify a user's codebase without explicit user action.
- Guarantee that an overlay is invisible to every possible capture or monitoring system.
- Depend on a single model provider.
- Make every Brainstorm request use an expensive multi-round debate.

The four-model limit is a deliberate architecture and product constraint, not just a UI restriction.

---

# 4. Research Findings

## 4.1 Desktop Assist / Interview / Screen Context

### MinhOmega/interview-assistant

Repository: https://github.com/MinhOmega/interview-assistant

Relevant features:

- Electron desktop application.
- React + TypeScript + Vite.
- Screenshot-based debugging.
- Speech recognition using Whisper/Gemini audio.
- Contextual answer suggestions.
- Transparent/frameless overlay.
- Multiple model providers.
- Local API-key storage.

This is one of the closest references for the **desktop Assist Mode** architecture.

### Dimerin1/natively

Repository: https://github.com/Dimerin1/natively

Relevant features:

- Electron desktop assistant.
- System + microphone audio capture.
- Real-time speech-to-text.
- Screenshot/document understanding.
- Local RAG and rolling conversational context.
- Multiple AI providers.
- Local Ollama support.
- SQLite storage.
- React + Vite + TypeScript.
- Rust for native audio capture.

This is a strong reference for the **local-first Assist pipeline, audio architecture, provider abstraction, setup concerns, and desktop UX**. The repository is AGPL-3.0, so its implementation code should not be copied into a differently licensed product without handling the license obligations.

### MVCpp/dev-interview-assistant

Repository: https://github.com/MVCpp/dev-interview-assistant

Relevant features:

- Electron desktop app.
- Windows WASAPI loopback.
- macOS ScreenCaptureKit.
- Linux PipeWire capture.
- Real-time transcription.
- Always-on-top overlay.
- Platform capability detection.

This is useful for understanding why **audio capture must be abstracted by OS platform** rather than pretending one implementation works everywhere.

### ShiroKatsuya/open-interview-coder

Repository: https://github.com/ShiroKatsuya/open-interview-coder

Relevant features:

- Electron + TypeScript.
- React + Vite.
- Screenshot capture.
- AI vision-based problem extraction.
- Coding/problem solving.
- Local Ollama models.
- Cloud providers.
- Global shortcuts.
- Overlay window management.
- Local configuration.

This is a strong reference for the **coding-assistance pipeline and desktop capture UX**. It is AGPL-3.0.

---

## 4.2 Multi-Model Chat / Model Assignment

### sinnerconsort/ST-Multi-Model-Chat

Repository: https://github.com/sinnerconsort/ST-Multi-Model-Chat

Relevant ideas:

- Different AI models assigned to different participants.
- Profile/model switching when a participant's turn occurs.
- Per-participant assignment.
- Manual turn triggering.
- Group-chat model mapping.

This is conceptually close to the project's **model-per-participant** approach. It is AGPL-3.0.

### bjeans/Multi-AI-Chat

Repository: https://github.com/bjeans/Multi-AI-Chat

Relevant ideas:

- Multi-model orchestration.
- Concurrent model execution.
- Real-time streaming.
- Chairman/synthesis model.
- Showing consensus/debate information.

This is a useful reference for the **AI Rooms and synthesis UX**.

---

## 4.3 Brainstorm / Multi-Agent Debate

### mohamadmsalman82/multi-agent-debate

Repository: https://github.com/mohamadmsalman82/multi-agent-debate

Relevant ideas:

- Multiple providers behind one interface.
- Proposer, critic, fact checker, moderator, and judge roles.
- Round-robin, adversarial, and collaborative protocols.
- Persistence.
- Evaluation metrics.
- Configurable debate turns.

This closely informs the project's **Brainstorm orchestration engine**.

### mit-ai-studio/multi-agent-debate

Repository: https://github.com/mit-ai-studio/multi-agent-debate

Relevant ideas:

- 2–4 agent architecture.
- Distinct roles such as researcher, critic, synthesizer, judge.
- Structured multi-stage debate.

This is especially relevant because the project itself has a **maximum of four active models**.

### instadeepai/DebateLLM

Repository: https://github.com/instadeepai/DebateLLM

Relevant ideas:

- Multiple debate protocols.
- Multiple prompting strategies.
- Research-oriented evaluation of multi-agent debate.
- Apache-2.0 license.

This should be treated as a research reference for evaluating whether additional debate rounds are useful instead of assuming more calls automatically produce better answers.

### wan-huiyan/agent-review-panel

Repository: https://github.com/wan-huiyan/agent-review-panel

Relevant ideas:

- Independent reviews before debate.
- Debate phase.
- Verification phase.
- Judge/adjudication.
- Anti-conformity mechanisms.
- Dissent tracking.
- Fixed maximum rounds.
- Explicit confidence levels.

The design strongly supports having **independent analysis before cross-model debate** rather than immediately exposing every model to the others' answers. The repository is MIT licensed.

---

## 4.4 Speech-to-Text

### whisper.cpp

Repository: https://github.com/ggml-org/whisper.cpp

Relevant ideas:

- C/C++ implementation of Whisper.
- CPU execution.
- Windows/macOS/Linux support.
- Apple Silicon optimization.
- Node/Electron integration examples.
- Voice Activity Detection support.

This is the preferred initial reference for **local STT**.

### NVIDIA Parakeet references

Examples:

- https://github.com/bigsk1/parakeet
- https://github.com/ajsteiger/parakeet_web

Parakeet is a useful optional speech provider, particularly for fast local transcription on compatible hardware.

---

# 5. Recommended Product Architecture

```text
┌────────────────────────────────────────────────────────────┐
│                    Desktop Application                    │
│                                                            │
│  ┌─────────────────┐    ┌──────────────────────────────┐  │
│  │ Main UI         │    │ Assist UI / Overlay          │  │
│  │ React + TS      │    │ React + TS                  │  │
│  └────────┬────────┘    └───────────────┬──────────────┘  │
│           │                             │                 │
│           └──────────────┬──────────────┘                 │
│                          │                                │
│                ┌─────────▼──────────┐                     │
│                │ Desktop IPC Layer  │                     │
│                └─────────┬──────────┘                     │
│                          │                                │
│       ┌──────────────────┼──────────────────┐             │
│       │                  │                  │             │
│   Screen Service     Audio Service      Hotkey Service    │
│       │                  │                  │             │
│       ▼                  ▼                  ▼             │
│ Screen/Window/       Mic/System        Global shortcuts   │
│ Region Capture      Audio Capture                         │
│                          │                                │
│                          ▼                                │
│                     STT Engine                             │
│                 Whisper / Parakeet                        │
│                          │                                │
│                          ▼                                │
│                   Context Engine                           │
│                          │                                │
│           ┌──────────────┴──────────────┐                 │
│           │                             │                 │
│       Room Engine                  Assist Engine          │
│           │                             │                 │
│           ▼                             ▼                 │
│   Orchestration Engine            Single Model           │
│           │                       Inference               │
│           └──────────────┬──────────────┘                 │
│                          │                                │
│                  Provider Abstraction                      │
│                          │                                │
│     ┌────────┬──────────┼─────────┬────────┐              │
│     ▼        ▼          ▼         ▼        ▼              │
│   OpenAI  Anthropic   Google    DeepSeek  Local/Ollama   │
└────────────────────────────────────────────────────────────┘
                           │
                           ▼
                ┌──────────────────────┐
                │ Optional Cloud API   │
                │ Auth / Sync / Usage  │
                └──────────────────────┘
```

---

# 6. Recommended Technology Stack

## Desktop

**Electron + TypeScript**

Reasons:

- Strong Windows desktop integration.
- Native main-process APIs.
- Mature BrowserWindow/IPC model.
- Good ecosystem for microphone, hotkeys, capture and packaging.
- Proven by several relevant reference projects.

Electron also exposes `BrowserWindow.setContentProtection(true)`. On Windows it maps to `WDA_EXCLUDEFROMCAPTURE` on supported Windows versions. This is not a universal invisibility guarantee.

## UI

**React + TypeScript + Vite**

Use React for rooms, model management, Brainstorm visualization, Assist controls, settings, and setup.

## Styling

**Tailwind CSS** or lightweight CSS. Avoid unnecessary runtime UI dependencies.

## Client State

Recommended:

- Zustand for local state.
- TanStack Query for server state.

## Local Database

**SQLite** for rooms, messages, participants, room configuration, assistant sessions, local preferences and cached data.

## Backend

**TypeScript + Node.js**

Recommended options:

- Fastify or NestJS.
- PostgreSQL.
- Redis for ephemeral orchestration/stream state.
- WebSockets or Server-Sent Events for streaming.

## AI Provider Layer

Create a normalized provider interface:

```ts
interface ModelProvider {
  id: string;
  listModels(): Promise<ModelInfo[]>;
  generate(request: GenerateRequest): Promise<GenerateResult>;
  stream(request: GenerateRequest): AsyncIterable<StreamEvent>;
}
```

Initial adapters:

```text
OpenAIProvider
AnthropicProvider
GoogleProvider
DeepSeekProvider
OpenRouterProvider
OllamaProvider
CustomOpenAICompatibleProvider
```

## Speech-to-Text

Create:

```ts
interface SpeechProvider {
  start(): Promise<void>;
  stop(): Promise<void>;
  transcribe(audio: AudioChunk): Promise<Transcript>;
}
```

Implement:

```text
WhisperLocal
WhisperCloud
ParakeetLocal
FutureProvider
```

---

# 7. Core Domain Model

## User

```ts
interface User {
  id: string;
  email: string;
  createdAt: Date;
}
```

## Model Connection

```ts
interface ModelConnection {
  id: string;
  userId: string;
  provider: string;
  modelId: string;
  displayName: string;
  capabilities: ModelCapabilities;
}
```

## Room

```ts
interface Room {
  id: string;
  userId: string;
  name: string;
  description?: string;
  conversationMode: ConversationMode;
  createdAt: Date;
  updatedAt: Date;
}
```

## Room Model

```ts
interface RoomModel {
  roomId: string;
  modelConnectionId: string;
  active: boolean;
  position: number;
  role?: ModelRole;
}
```

Invariant:

```text
COUNT(active room models) <= 4
```

This must be enforced outside the UI.

## Message

```ts
interface Message {
  id: string;
  roomId: string;
  senderType: "user" | "model" | "system";
  senderId?: string;
  content: string;
  createdAt: Date;
}
```

## Conversation Round

```ts
interface ConversationRound {
  id: string;
  roomId: string;
  userMessageId: string;
  turnOrder: string[];
  status: "pending" | "running" | "completed" | "failed";
}
```

---

# 8. Phased Implementation Roadmap

## Phase 0 — Product Foundation

### Objectives

Define the architecture before implementing model behavior.

### Deliverables

- Monorepo.
- Desktop app shell.
- Backend service.
- Shared TypeScript package.
- Provider abstraction.
- IPC abstraction.
- Configuration management.
- Logging.
- Error-handling conventions.
- CI and test strategy.

Suggested layout:

```text
platform/
├── apps/
│   ├── desktop/
│   └── web/
├── services/
│   └── api/
├── packages/
│   ├── core/
│   ├── providers/
│   ├── orchestration/
│   ├── shared-types/
│   └── ui/
└── docs/
```

---

## Phase 1 — Desktop Shell

### Features

- Electron main process.
- Preload script.
- Context isolation.
- React renderer.
- Window management.
- Tray support.
- Global shortcut foundation.
- Typed IPC.
- Cross-platform packaging foundation.

### Acceptance

- App launches reliably.
- Renderer has no direct Node access.
- IPC is allow-listed and typed.

---

## Phase 2 — Account & Provider Management

### Features

- Sign-in/account system.
- Provider configuration.
- Model discovery.
- API-key management.
- Local encrypted credential storage.
- Provider health checks.
- Ollama detection.
- Model capability discovery.

Initial providers:

```text
OpenAI
Anthropic
Google
DeepSeek
OpenRouter
Ollama
OpenAI-compatible endpoints
```

---

## Phase 3 — Room Management

### Features

- Create, rename, archive, delete room.
- Search rooms.
- Room history.
- Room-specific settings.
- Room-specific memory foundation.
- Per-room model selection.

Example:

```text
Backend Architecture
  GPT
  Claude
  Gemini
  DeepSeek

Interview Prep
  Claude
  GPT
  Mistral
```

### Acceptance

- Multiple rooms work independently.
- Room A cannot accidentally receive Room B's messages or memory.

---

## Phase 4 — Four-Model Participant System

### Features

- Add/remove model.
- Activate/deactivate model.
- Assign display name.
- Assign optional role.
- Enforce maximum four active models.
- Maintain larger inactive model pool.

The four-model invariant must be enforced server-side.

---

## Phase 5 — Standard Group Chat

### Features

- User message.
- Sequential model response.
- Streaming.
- Per-model message cards.
- Retry.
- Stop generation.
- Error recovery.
- Timestamps.

Basic flow:

```text
User
 ↓
Model 1
 ↓
Model 2
 ↓
Model 3
 ↓
Model 4
```

---

## Phase 6 — Turn Ordering

### Ranked mode

```text
1. GPT
2. Claude
3. Gemini
4. DeepSeek
```

### Random mode

Generate one full random permutation per round:

```text
Round 1: Gemini → GPT → DeepSeek → Claude
Round 2: Claude → Gemini → GPT → DeepSeek
```

Store the generated order with the round. Do not pick each speaker independently because every active model must get at most one turn in a standard round.

Optional later feature:

- Skip one model for the current round without deactivating it from the room.

---

## Phase 7 — Model Roles

Possible roles:

```text
Architect
Researcher
Critic
Security Reviewer
Developer
Product Manager
Fact Checker
Analyst
Judge
Synthesizer
Generalist
```

Role prompts should be separate from provider adapters.

---

## Phase 8 — Brainstorm Mode

Brainstorm is a **per-message execution mode**.

```text
Normal
Brainstorm
```

### Stage 1 — Independent analysis

All active models see the user's prompt but not each other's answers.

### Stage 2 — Cross-model critique

Each model evaluates the other positions.

### Stage 3 — Revision

Each model revises its position based on the critique.

### Stage 4 — Final opinion

Each model produces a concise final answer.

### Stage 5 — Optional synthesis

One existing active model becomes the synthesizer. No fifth model is required.

---

## Phase 9 — Brainstorm UX

Normal chat should not be flooded with raw internal debate.

Example:

```text
You
 ↓
Brainstorming with 4 models...

✓ Independent analysis
✓ Cross-model critique
✓ Revision
✓ Final opinions

GPT
Final opinion...

Claude
Final opinion...
```

Optional expandable panel:

```text
View Brainstorm
  Phase 1 — Analysis
  Phase 2 — Critique
  Phase 3 — Revision
  Phase 4 — Final
  Phase 5 — Synthesis
```

---

## Phase 10 — Brainstorm Cost & Convergence Controls

MVP example:

```text
4 independent analyses
+
4 critiques
+
4 revisions
+
1 synthesis
=
13 model calls
```

Config:

```ts
interface BrainstormBudget {
  maxDebateRounds: number;
  maxTokensPerParticipant: number;
  maxTotalTokens: number;
  timeoutMs: number;
}
```

Future:

- Early stop on convergence.
- Drift detection.
- Anti-sycophancy prompts.
- Confidence scoring.
- Dissent register.

Do not assume more debate rounds are always better.

---

## Phase 11 — Assist Mode Foundation

Assist is a separate one-model session.

```text
Room:
GPT + Claude + Gemini + DeepSeek

Assist:
Claude
```

### Features

- Enter/exit Assist Mode.
- Select assistant model.
- Session state.
- Global hotkey.
- Compact overlay.
- Prompt input.
- Quick commands.

---

## Phase 12 — Screen Capture

Support:

### Full screen

Capture a selected display.

### Window

Capture a selected application/window.

### Region

User selects a region.

### Manual screenshot

Single capture triggered by the user.

### Future: contextual continuous assist

Only process the screen after meaningful changes.

```text
Screen
 ↓
Change detector
 ↓
Relevant change?
 ├─ No → ignore
 └─ Yes → capture → preprocess → vision
```

---

## Phase 13 — Voice / Speech-to-Text

```text
Microphone
 ↓
Audio buffering
 ↓
VAD
 ↓
Speech-to-text
 ↓
Transcript
 ↓
Context Engine
 ↓
AI
```

Local-first options:

```text
Whisper.cpp
Parakeet
```

Cloud STT remains optional.

---

## Phase 14 — Audio Capture

Audio must be abstracted by operating system:

```text
IAudioCapture
├── WindowsAudioCapture
├── MacAudioCapture
└── LinuxAudioCapture
```

Possible backends:

- Windows: WASAPI.
- macOS: ScreenCaptureKit/approved audio architecture.
- Linux: PipeWire/PulseAudio depending on environment.

The `MVCpp/dev-interview-assistant` project is a useful reference because it documents these platform differences explicitly.

---

## Phase 15 — Assist Context Engine

Possible inputs:

```text
User request
Voice transcript
Screen image
Previous transcript
Selected window metadata
Clipboard
Current code
Previous assistant response
```

```ts
interface AssistContext {
  userText?: string;
  transcript?: string;
  screenshot?: ImagePayload;
  windowInfo?: WindowInfo;
  clipboard?: string;
}
```

The context engine decides what to send rather than blindly transmitting every available signal.

---

## Phase 16 — Coding Assistance

### Explain code

Screenshot → vision/OCR → model → explanation.

### Debug

Screenshot + error + voice request → model.

### Coding challenge

Extract:

- Problem statement.
- Constraints.
- Examples.
- Input/output.
- Existing code.

Output:

```text
Understanding
Approach
Algorithm
Complexity
Code
Edge Cases
```

The `open-interview-coder` project is a useful reference for this pipeline.

---

## Phase 17 — Assist UI / Overlay

States:

```text
Collapsed
Expanded
Pinned
Transparent
Hidden
```

Quick actions:

```text
[Mic]
[Capture]
[Ask]
[Explain]
[Debug]
[Summarize]
[Hide]
```

Use global hotkeys for high-frequency actions.

---

## Phase 18 — Capture Protection / Privacy-Aware Window Handling

The application can expose a **Capture Protection** setting.

For supported Windows capture paths, Electron provides:

```ts
window.setContentProtection(true)
```

This maps to Windows `WDA_EXCLUDEFROMCAPTURE` on supported versions. It is not a universal stealth guarantee.

### Product wording

Prefer:

> Attempts to prevent this window from appearing in supported OS-level screen captures.

Do not promise:

> Guaranteed invisible in interviews or tests.

The feature should not be marketed as a way to defeat third-party proctoring, monitoring, DRM, or capture mechanisms.

---

## Phase 19 — Setup Wizard

First launch:

```text
Welcome
 ↓
Microphone
 ↓
Screen capture
 ↓
Speech engine
 ↓
AI provider
 ↓
Test
 ↓
Ready
```

Each component should show:

```text
✓ Ready
⚠ Needs attention
✗ Not available
```

Test actual functionality, not just file existence.

---

## Phase 20 — Local AI & Privacy

Modes:

```text
Cloud only
Local only
Hybrid
```

Examples:

```text
Local:
Screen → Local Vision → Local LLM

Hybrid:
Screen + STT local → Cloud LLM

Cloud:
Capture → Selected Cloud Provider
```

Settings must clearly tell users where data is processed.

---

## Phase 21 — Room Memory

Room memory can contain:

```text
Messages
Decisions
Files
Notes
Summaries
Model preferences
Important facts
```

Start with room history and summaries. Add vector memory after the base chat is stable.

---

## Phase 22 — Files & Knowledge

Support eventually:

- PDF.
- DOCX.
- Markdown.
- TXT.
- Images.
- Source code.
- ZIP/project summaries later.

Potential pipeline:

```text
File
 ↓
Parser
 ↓
Chunker
 ↓
Embedding
 ↓
Vector store
 ↓
Room retrieval
```

Local option:

```text
SQLite + local vector store
```

Cloud option:

```text
PostgreSQL + pgvector
```

---

## Phase 23 — Collaboration Features

Later features:

- Export room.
- Share room.
- Invite another human.
- Shared rooms.
- Room templates.
- Public/private rooms.
- Import/export model configuration.
- Debate replay.
- Brainstorm transcript export.

---

## Phase 24 — Usage, Cost & Performance

Track:

```text
Provider
Model
Tokens
Latency
Estimated cost
Brainstorm rounds
STT duration
Vision requests
```

Show users:

- Session usage.
- Daily usage.
- Monthly usage.
- Estimated Brainstorm cost before execution where possible.

Backend must enforce quotas and limits.

---

## Phase 25 — Testing

### Unit

- Provider adapters.
- Room constraints.
- Four-model enforcement.
- Turn-order generation.
- Brainstorm state machine.
- Budget limits.
- Persistence.
- Context assembly.

### Integration

```text
User → Room → Provider → Streaming → Persistence
```

### Desktop

- Window creation.
- IPC.
- Global shortcuts.
- Microphone.
- Screen capture.
- Overlay.
- Setup wizard.
- Packaging.

### Brainstorm

Use mock providers so tests do not spend real API money.

---

## Phase 26 — Security

### Secrets

Use OS-secure storage:

- Windows Credential Manager/DPAPI.
- macOS Keychain.
- Linux Secret Service where available.

### IPC

- Strict allow-listed channels.
- Context isolation.
- No raw Node access in renderer.

### Provider requests

Validate:

- Model ID.
- Provider configuration.
- Token limits.
- File size.
- Image size.
- Room permissions.

### Local files

Default temporary screenshots/audio should be deleted after use unless explicitly saved.

---

## Phase 27 — Performance Optimization

Rules:

- Do not run STT constantly unless enabled.
- Use VAD.
- Avoid sending unchanged screenshots.
- Resize/compress images before transmission.
- Stream model output.
- Limit concurrent inference.
- Cache model/provider metadata.
- Move CPU-heavy local inference to workers/processes.
- Keep renderer state lean.
- Load local AI engines only when selected.

---

## Phase 28 — Distribution & Auto-Update

Start with:

**Windows 10/11**

Then:

- macOS.
- Linux.

Packaging:

```text
Windows → NSIS
macOS   → DMG
Linux   → AppImage/deb later
```

Add signed builds, update checks, and rollback strategy.

---

## Phase 29 — Observability

Log:

```text
Provider requests
STT latency
Screen-capture latency
Model latency
IPC errors
Room orchestration
Brainstorm stages
```

Never log provider secrets or raw screenshots/transcripts by default.

---

## Phase 30 — Research / Evaluation

Build an evaluation harness comparing:

```text
Single model
vs
4 independent models
vs
4 models + critique
vs
4 models + critique + synthesis
```

Measure:

- Accuracy.
- Hallucination rate.
- Relevance.
- Agreement.
- Diversity.
- Cost.
- Latency.
- User satisfaction.

Use debate research to determine when Brainstorm actually provides value.

---

# 9. Recommended MVP Scope

Do not implement all 30 phases before testing the product.

### MVP

```text
Phase 0
Phase 1
Phase 2
Phase 3
Phase 4
Phase 5
Phase 6
Phase 11
Phase 12
Phase 13
Phase 15
```

In practical terms:

```text
Desktop application
+
Provider manager
+
Multiple rooms
+
Up to 4 active models / room
+
Sequential chat
+
Ranked / random turn order
+
Single-model Assist
+
Screen/window/region capture
+
Microphone
+
Local Whisper
+
Context engine
```

Brainstorm should be the next major milestone rather than being mixed into the first build.

---

# 10. Recommended Development Order

```text
MILESTONE 1  Desktop foundation
      ↓
MILESTONE 2  Provider abstraction
      ↓
MILESTONE 3  Rooms + persistence
      ↓
MILESTONE 4  Four-model participant system
      ↓
MILESTONE 5  Streaming group chat
      ↓
MILESTONE 6  Ranked/random turn order
      ↓
MILESTONE 7  Assist mode shell
      ↓
MILESTONE 8  Screen capture
      ↓
MILESTONE 9  Local STT
      ↓
MILESTONE 10 Context engine
      ↓
MILESTONE 11 Coding assistance
      ↓
MILESTONE 12 Brainstorm
      ↓
MILESTONE 13 Memory/files
      ↓
MILESTONE 14 Privacy/security hardening
      ↓
MILESTONE 15 Packaging + distribution
      ↓
MILESTONE 16 Evaluation + optimization
```

---

# 11. Suggested Repository Structure

```text
ai-platform/
│
├── apps/
│   ├── desktop/
│   │   ├── electron/
│   │   │   ├── main/
│   │   │   ├── preload/
│   │   │   ├── ipc/
│   │   │   ├── windows/
│   │   │   ├── capture/
│   │   │   ├── audio/
│   │   │   ├── shortcuts/
│   │   │   └── native/
│   │   │
│   │   └── renderer/
│   │       ├── pages/
│   │       ├── components/
│   │       ├── features/
│   │       │   ├── rooms/
│   │       │   ├── brainstorm/
│   │       │   ├── assist/
│   │       │   ├── providers/
│   │       │   └── settings/
│   │       ├── hooks/
│   │       ├── stores/
│   │       └── styles/
│   │
│   └── web/
│       └── dashboard/
│
├── services/
│   ├── api/
│   │   ├── auth/
│   │   ├── rooms/
│   │   ├── models/
│   │   ├── orchestration/
│   │   ├── usage/
│   │   └── sync/
│   │
│   └── workers/
│       ├── orchestration/
│       └── embeddings/
│
├── packages/
│   ├── ai-core/
│   ├── providers/
│   ├── orchestration/
│   ├── speech/
│   ├── vision/
│   ├── capture/
│   ├── database/
│   ├── shared-types/
│   ├── config/
│   └── ui/
│
├── docs/
├── tests/
├── package.json
└── pnpm-workspace.yaml
```

---

# 12. Key Architectural Rules

## Rule 1 — Four Active Models Maximum

The limit is per room and must be enforced outside the UI.

## Rule 2 — Model Connections Are Separate From Room Membership

A user can connect many models and reuse a model in multiple rooms.

## Rule 3 — Room State Is Isolated

Messages and memory from one room do not automatically appear in another.

## Rule 4 — Providers Are Pluggable

Core logic must not depend directly on one model vendor.

## Rule 5 — Assist Is Separate From Room Orchestration

Assist uses one selected model and prioritizes low latency and contextual input.

## Rule 6 — Brainstorm Is a State Machine

Represent stages explicitly:

```text
ANALYZE
→ CRITIQUE
→ REVISE
→ FINAL
→ SYNTHESIZE
```

## Rule 7 — Local Processing Is Preferred Where Practical

Especially for speech-to-text, temporary screenshots, and local room data.

## Rule 8 — Capture Protection Is Not Guaranteed Stealth

Use OS-supported content-protection APIs where available, but never promise to defeat every capture or monitoring mechanism.

## Rule 9 — Cost Is a First-Class Feature

Every multi-model action should have predictable bounds.

## Rule 10 — Measure Before Adding Debate Rounds

More calls are not automatically better.

---

# 13. Security & Responsible Use

The product will handle sensitive screen, audio and conversation context.

Users must control:

- What is captured.
- When recording begins.
- Which model receives captured data.
- Whether processing happens locally or in the cloud.
- How long data is retained.

For meetings, interviews, classes and assessments, users remain responsible for applicable laws, organizational rules, platform policies and participant consent requirements.

The product should provide clear capture-state indicators and privacy controls rather than marketing stealth as a method of evading monitoring.

---

# 14. Reference Projects & Licensing Notes

| Project | License | Use in this project |
|---|---|---|
| `agent-review-panel` | MIT | Conceptual patterns and potentially reusable code after review |
| `DebateLLM` | Apache-2.0 | Debate research/protocol reference |
| `Natively` | AGPL-3.0 | Architecture/reference unless compatible licensing is chosen |
| `open-interview-coder` | AGPL-3.0 | Architecture/reference unless compatible licensing is chosen |
| `ST-Multi-Model-Chat` | AGPL-3.0 | Architecture/reference unless compatible licensing is chosen |

Always inspect the repository's current LICENSE before copying code. Architecture ideas and API patterns are not the same as copying source code.

---

# 15. Open Design Questions

## Cloud account model

Options:

1. User-supplied provider keys.
2. Platform-owned provider accounts.
3. Both.

Recommended: **Both**, with BYOK available early.

## Local database

Recommended:

```text
SQLite locally
+
PostgreSQL in cloud
+
explicit sync
```

## Brainstorm synthesis

Recommended:

- One active model becomes temporary synthesizer.
- User can choose it.
- Do not require a fifth model.

## Memory

Start with:

```text
Room history
+
conversation summaries
```

Add vector memory later.

## STT

Start with:

```text
Local whisper.cpp
```

Then add Parakeet and cloud providers.

## Platform

Start with:

```text
Windows 10/11
```

Then macOS. Linux after audio/capture abstractions stabilize.

---

# 16. Final Product Vision

The application should feel like:

> **A personal AI workspace where the user can build several teams of models, have them collaborate like a group of specialists, and switch into a real-time desktop assistant whenever they need contextual help.**

A representative journey:

```text
Open application
      ↓
Choose "Backend Architecture"
      ↓
GPT + Claude + Gemini + DeepSeek
      ↓
Ask a question
      ↓
Normal ranked discussion
      ↓
Select Brainstorm
      ↓
Models analyze independently
      ↓
Models critique each other
      ↓
Models revise
      ↓
Synthesis
      ↓
Save conclusion to room
      ↓
Switch to Assist
      ↓
Select Claude
      ↓
Capture coding window
      ↓
Speak question
      ↓
Local STT
      ↓
Context builder
      ↓
Claude
      ↓
Concise contextual assistance
```

The architecture should make these experiences parts of one coherent platform rather than separate applications glued together.

---

# 17. Initial Success Criteria

The first meaningful milestone is reached when a user can:

1. Install the desktop application.
2. Connect at least two AI providers.
3. Create multiple rooms.
4. Select up to four models per room.
5. Configure ranked or random turn order.
6. Send a message and receive streamed responses from all active models.
7. Enable Brainstorm for a single question.
8. View Brainstorm progress without flooding normal chat.
9. Select one model for Assist Mode.
10. Capture a screen, window, or region.
11. Speak through the microphone.
12. Receive a contextual answer based on voice + screen input.
13. Keep provider credentials out of logs.
14. Recover gracefully when a model, provider, microphone, STT engine or capture subsystem fails.

Once this milestone works reliably, the project has a meaningful foundation. The later phases should deepen functionality, privacy, performance, evaluation, and polish rather than repeatedly changing the core architecture.

---

# 18. Research Sources

Primary GitHub references used during research:

- https://github.com/MinhOmega/interview-assistant
- https://github.com/Dimerin1/natively
- https://github.com/MVCpp/dev-interview-assistant
- https://github.com/ShiroKatsuya/open-interview-coder
- https://github.com/sinnerconsort/ST-Multi-Model-Chat
- https://github.com/bjeans/Multi-AI-Chat
- https://github.com/mohamadmsalman82/multi-agent-debate
- https://github.com/mit-ai-studio/multi-agent-debate
- https://github.com/instadeepai/DebateLLM
- https://github.com/wan-huiyan/agent-review-panel
- https://github.com/ggml-org/whisper.cpp
- https://github.com/bigsk1/parakeet
- https://github.com/ajsteiger/parakeet_web
- https://github.com/electron/electron

This research should be revisited during implementation because provider APIs, desktop capture APIs, STT engines, licenses and open-source projects change over time.
