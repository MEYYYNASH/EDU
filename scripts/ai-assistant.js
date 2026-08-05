/**
 * Edu STUDENT - AI Study Assistant Module
 * Features: Explainer, Homework Helper, Summarizer, Quiz Generator & Flashcards
 */

window.EduAI = {
  knowledgeBase: {
    "physics": "Physics is the branch of science concerned with the nature and properties of matter and energy. Quantum Mechanics and Thermodynamics are two pillars of modern physics.",
    "math": "Mathematics studies quantity, structure, space, and change. Calculus provides tools for analyzing rates of change and accumulation of areas.",
    "ai": "Artificial Intelligence involves creating algorithms and models that enable machines to perform tasks requiring human intelligence, such as computer vision and natural language processing.",
    "python": "Python is a high-level, interpreted programming language known for readability, extensive libraries, and widespread application in AI and Web Development."
  },

  async ask(prompt, mode = 'explain') {
    const p = prompt.toLowerCase();
    
    // Simulate thinking delay for dynamic island / typing animation
    await new Promise(r => setTimeout(r, 600));

    if (mode === 'quiz') {
      return {
        type: 'quiz',
        question: `AI Generated Question: What is the primary function of neural networks in deep learning?`,
        options: [
          'A. Sorting array elements',
          'B. Extracting hierarchical features from data',
          'C. Querying relational databases',
          'D. Managing network bandwidth'
        ],
        correctIndex: 1,
        explanation: 'Deep neural networks excel at extracting hierarchical feature representations directly from raw data.'
      };
    }

    if (mode === 'summarize') {
      return `📌 **AI Summary:**\n• Key Takeaway: Core concepts synthesized into actionable points.\n• Recommended Focus: Review section 3 for upcoming exams.\n• Estimated Study Time: 15 mins.`;
    }

    if (mode === 'flashcard') {
      return {
        type: 'flashcard',
        front: `Flashcard: Define Overfitting in AI`,
        back: `Overfitting occurs when a machine learning model learns noise in training data, performing poorly on unseen data.`
      };
    }

    // Default Question Answering & Explanation
    if (p.includes("quantum") || p.includes("physics")) {
      return `⚛️ **Physics Insight:** Quantum mechanics describes physical properties at atomic scales. Particles exhibit wave-particle duality and superposition.`;
    } else if (p.includes("pythagoras") || p.includes("math")) {
      return `📐 **Math Theorem:** In a right-angled triangle, a² + b² = c², where c is the hypotenuse opposite the right angle.`;
    } else if (p.includes("ai") || p.includes("machine learning")) {
      return `🤖 **AI Explanation:** Machine Learning uses statistical algorithms to build models from data, allowing prediction and automation without explicit hardcoded rules.`;
    } else {
      return `✨ **AI Assistant Response:**\nI analyzed your query regarding "${prompt}". Focus on mastering fundamental principles first, breaking complex problems into smaller sub-tasks, and taking active recall quizzes!`;
    }
  }
};
