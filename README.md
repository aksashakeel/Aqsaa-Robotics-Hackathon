# Hackathon Humanoid Robotics Book

**Physical AI & Humanoid Robotics Textbook with RAG Chatbot**

## 📖 Project Description

The **Hackathon Humanoid Robotics Book** is an AI-native educational platform designed to provide an interactive learning experience in the field of Humanoid Robotics and Physical AI. Unlike traditional textbooks, this project integrates a Retrieval-Augmented Generation (RAG) chatbot that allows learners to converse with the textbook, ask complex questions, and receive context-aware answers based on the material.

The platform combines a structured, high-quality curriculum presented through a modern web interface with an intelligent backend that understands the content and assists users in their learning journey.

## ✨ Features

*   **Interactive AI Chatbot:** A built-in chatbot capable of answering questions specifically related to the course content using RAG technology.
*   **Structured Learning Modules:** organized documentation and chapters on Humanoid Robotics (Introduction, Modules 1-3).
*   **User Authentication:** Secure Signup and Login functionality to personalize the user experience.
*   **Vector Search:** Utilizes vector embeddings to perform semantic searches across the textbook content.
*   **Modern UI/UX:** A sleek, dark-themed user interface built with Docusaurus and React for optimal reading and interaction.
*   **Responsive Design:** Accessible on various devices, ensuring learning on the go.

## 🛠 Technologies Used

### Backend
*   **Language:** Python
*   **Framework:** [FastAPI](https://fastapi.tiangolo.com/) - High-performance web framework for building APIs.
*   **AI & LLM:** [LangChain](https://www.langchain.com/) & [OpenAI](https://openai.com/) - For handling LLM interactions and chains.
*   **Vector Database:** [Qdrant](https://qdrant.tech/) - For storing and retrieving vector embeddings.
*   **Authentication:** Python-Jose (JWT) & Passlib (Bcrypt) - For secure user authentication.

### Frontend
*   **Framework:** [Docusaurus](https://docusaurus.io/) - Static site generator based on React.
*   **Library:** [React](https://reactjs.org/) & TypeScript - For building interactive UI components.
*   **Styling:** CSS Modules & Custom CSS - For theming and layout.

## 🚀 Installation

Follow these steps to set up the project locally.

### Prerequisites
*   **Node.js** (v16 or higher)
*   **Python** (v3.10 or higher)
*   **Git**

### 1. Clone the Repository
```bash
git clone https://github.com/Muhammad-Sufyan-SBR/Hackathon-Humanoid-Robotics-Book.git
cd Hackathon-Humanoid-Robotics-Book
```

### 2. Backend Setup
Navigate to the backend directory and set up the Python environment.

```bash
cd backend
# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

**Configuration:**
Create a `.env` file in the `backend` directory based on `.env.example`. You will need to provide your API keys:

```env
OPENAI_API_KEY=your_openai_api_key
QDRANT_URL=your_qdrant_url
QDRANT_API_KEY=your_qdrant_api_key
SECRET_KEY=your_generated_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

**Run the Backend:**
```bash
# Start the FastAPI server
uvicorn src.main:app --reload
```
The backend API will be available at `http://localhost:8000`.

### 3. Frontend Setup
Open a new terminal, navigate to the frontend directory, and install dependencies.

```bash
cd frontend
npm install
```

**Run the Frontend:**
```bash
npm start
```
The application will open in your browser at `http://localhost:3000`.

## 📖 Usage

1.  **Ingest Content (Optional):** If setting up for the first time, you may need to run the ingestion script to populate the vector database with the book's content.
    ```bash
    # From the backend directory (with venv activated)
    python src/scripts/ingest_book.py
    ```
2.  **Explore Modules:** Navigate through the documentation sidebar to read different chapters (Module 1, Module 2, etc.).
3.  **Sign Up/Login:** Create an account to access personalized features.
4.  **Ask the AI:** Use the floating chatbot widget to ask questions like "What are the key components of a humanoid robot?" and receive answers sourced directly from the text.

## 🤝 Contribution Guidelines

We welcome contributions! If you'd like to improve the book content or the platform features:

1.  **Fork** the repository.
2.  Create a new **Branch** (`git checkout -b feature/AmazingFeature`).
3.  **Commit** your changes (`git commit -m 'Add some AmazingFeature'`).
4.  **Push** to the branch (`git push origin feature/AmazingFeature`).
5.  Open a **Pull Request**.

Please ensure your code follows the existing style and includes relevant tests or documentation updates.

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

## 📞 Contact Information

For questions, feedback, or collaboration opportunities, please reach out:

*   **Maintainer:** Muhammad Sufiyan
*   **GitHub:** [Muhammad-Sufyan-SBR](https://github.com/Muhammad-Sufyan-SBR)