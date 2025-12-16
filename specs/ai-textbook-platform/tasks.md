---
description: "Task list for AI-Native Textbook Platform implementation"
---

# Tasks: AI-Native Textbook Platform

**Input**: Design documents from `/specs/ai-textbook-platform/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The feature specification implies the need for testing to ensure personalized content, translation, and chatbot functionality work as expected. Specific test tasks are included.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `backend/src/`, `frontend/src/`
- Paths shown below assume web app structure - adjust based on plan.md structure

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create `backend/` and `frontend/` project directories
- [ ] T002 Initialize Docusaurus in `frontend/`
- [ ] T003 Initialize FastAPI project in `backend/`
- [ ] T004 [P] Configure linting and formatting for `frontend/` and `backend/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T005 Setup Neon Serverless Postgres connection and base schema for users/chapters/preferences in `backend/src/models/` and `backend/src/services/db.py`
- [ ] T006 Implement user signup/signin with Better Auth in `backend/src/auth/` (FR-002, FR-003)
- [ ] T007 [P] Configure FastAPI application for basic routing and middleware in `backend/src/main.py`
- [ ] T008 [P] Configure Qdrant client and connection in `backend/src/services/qdrant_client.py`
- [ ] T009 [P] Setup environment configuration management for secrets and API keys (e.g., `.env` files)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Core Textbook Browsing (Priority: P1) 🎯 MVP

**Goal**: Enable users to browse modular textbook chapters.

**Independent Test**: User can navigate through available chapters and view their content.

### Implementation for User Story 1

- [ ] T010 [P] [US1] Create initial Docusaurus markdown chapters (e.g., `frontend/docs/chapter1.md`, `chapter2.md`)
- [ ] T011 [P] [US1] Configure Docusaurus sidebar and navigation in `frontend/docusaurus.config.js`
- [ ] T012 [US1] Develop React component for basic chapter content display in `frontend/src/components/ChapterViewer.js`
- [ ] T013 [US1] Create FastAPI endpoint to fetch chapter content (markdown) in `backend/src/api/chapters.py`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - User Authentication & Personalized Content (Priority: P1)

**Goal**: Allow users to sign up/sign in, provide background, and receive personalized content.

**Independent Test**: New user can sign up, log in, set preferences, and see content changes based on personalization.

### Implementation for User Story 2

- [ ] T014 [US2] Extend user database model for background data (e.g., hardware/software experience) in `backend/src/models/user.py`
- [ ] T015 [US2] Implement FastAPI endpoints for user profile management and preference updates in `backend/src/api/users.py`
- [ ] T016 [US2] Develop frontend UI components for signup/signin forms in `frontend/src/components/AuthForms.js`
- [ ] T017 [US2] Implement frontend logic (e.g., React hooks) for personalization toggle and applying personalized content variants in `frontend/src/hooks/usePersonalization.js`

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Multilingual Content Access (Priority: P2)

**Goal**: Enable users to toggle between English and Urdu translations for chapters.

**Independent Test**: User can view a chapter and successfully switch its language to Urdu and back to English.

### Implementation for User Story 3

- [ ] T018 [P] [US3] Prepare sample Urdu translated versions of existing chapters or define translation integration strategy
- [ ] T019 [US3] Implement FastAPI endpoint to serve translated chapter content in `backend/src/api/translation.py`
- [ ] T020 [US3] Develop frontend UI component for the Urdu translation toggle in `frontend/src/components/LanguageToggle.js`
- [ ] T021 [US3] Implement frontend logic (e.g., React hooks) for switching chapter language and fetching translations in `frontend/src/hooks/useTranslation.js`

**Checkpoint**: All user stories 1, 2, and 3 should now be independently functional

---

## Phase 6: User Story 4 - RAG Chatbot Interaction (Priority: P2)

**Goal**: Provide an embedded RAG chatbot for answering questions from selected text or the full book corpus.

**Independent Test**: User can ask questions, receive relevant answers from selected text, and from the full book corpus.

### Implementation for User Story 4

- [ ] T022 [US4] Implement embedding generation pipeline for chapters using OpenAI API (`text-embedding-ada-002`) in `backend/src/services/embedding.py`
- [ ] T023 [US4] Populate Qdrant with generated chapter embeddings
- [ ] T024 [US4] Implement RAG logic in `backend/src/services/chatbot.py` to query Qdrant and integrate with Claude Code agents/ChatKit SDK for response generation
- [ ] T025 [US4] Create FastAPI endpoint for chatbot queries (receiving question and optional selected text) in `backend/src/api/chatbot.py`
- [ ] T026 [US4] Develop frontend UI component for the chatbot widget (input, output, send selected text button) in `frontend/src/components/Chatbot.js`
- [ ] T027 [US4] Implement frontend logic for sending selected text to the chatbot API

**Checkpoint**: All core user stories for the MVP are implemented.

---

## Phase 7: CI/CD & Deployment (Cross-Cutting Concern)

**Purpose**: Automate building, testing, embedding updates, and deployment.

- [ ] T028 Setup GitHub Actions workflow for `frontend/` deployment to GitHub Pages/Vercel
- [ ] T029 Setup GitHub Actions workflow for `backend/` deployment to a serverless cloud platform
- [ ] T030 Configure automated embedding updates via GitHub Actions on content changes in `frontend/docs/`

---

## Phase 8: Testing & Documentation (Cross-Cutting Concern)

**Purpose**: Ensure quality and provide user/developer guidance.

- [ ] T031 Write unit and integration tests for `backend/` components (auth, API, services)
- [ ] T032 Write component and E2E tests for `frontend/` (chapter viewing, authentication flow, chatbot interaction)
- [ ] T033 Create user guide documentation for personalized textbook and chatbot usage
- [ ] T034 Create developer guide documentation for extending agents and content

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P1 → P2 → P2)
- **CI/CD & Deployment (Phase 7)**: Can start once core `frontend/` and `backend/` structure is in place (after Phase 2/3 roughly)
- **Testing & Documentation (Phase 8)**: Depends on relevant features being implemented (can run incrementally)

### User Story Dependencies

- **User Story 1 (P1 - Core Textbook Browsing)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1 - Auth & Personalized Content)**: Can start after Foundational (Phase 2) - Integrates with US1 chapter content
- **User Story 3 (P2 - Multilingual Content)**: Can start after Foundational (Phase 2) - Integrates with US1 chapter content
- **User Story 4 (P2 - RAG Chatbot)**: Can start after Foundational (Phase 2) - Depends on content from US1, and could benefit from personalization from US2.

### Within Each User Story

- Database models/schema before API endpoints
- API endpoints before frontend integration
- Embedding pipeline before RAG chatbot query logic

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- Many Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, User Stories 1 and 2 (both P1) can start in parallel; User Stories 3 and 4 (both P2) can also start in parallel with each other or with P1 stories, as long as their specific dependencies (e.g., chapter content, auth) are met.
- Frontend and backend development for a story can run in parallel if API contracts are defined.

---

## Implementation Strategy

### MVP First (User Stories 1 & 2)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 (Core Textbook Browsing)
4. Complete Phase 4: User Story 2 (User Authentication & Personalized Content)
5. **STOP and VALIDATE**: Test User Stories 1 and 2 independently and together.
6. Deploy/demo if ready.

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add US1 → Test independently → Deploy/Demo (Basic Textbook)
3. Add US2 → Test independently → Deploy/Demo (Personalized Textbook)
4. Add US3 → Test independently → Deploy/Demo (Multilingual Textbook)
5. Add US4 → Test independently → Deploy/Demo (AI-Native Chatbot Integrated)
6. Each story adds value without breaking previous stories.

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together.
2. Once Foundational is done:
   - Developer A: User Story 1 (Core Textbook Browsing)
   - Developer B: User Story 2 (User Authentication & Personalized Content)
   - Developer C: User Story 3 (Multilingual Content Access)
   - Developer D: User Story 4 (RAG Chatbot Interaction)
3. Stories complete and integrate independently based on defined APIs.

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Define clear API contracts between frontend and backend to enable parallel development.
