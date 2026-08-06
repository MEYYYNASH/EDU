/**
 * Edu STUDENT - Intelligent AI Auto-Responder & Math Solver Engine
 * Features: Automatic Equation Solving, Step-by-Step Explanations, Bilingual (EN/KM) Support
 */

window.EduAI = {
  // Enhanced Math & Scientific Problem Solver
  solveMath(prompt) {
    const p = prompt.toLowerCase().trim();

    // Linear Equation Solver: ax + b = c or 2x + 5 = 15
    const linearMatch = p.match(/([+-]?\d*)\s*x\s*([+-]\s*\d+)?\s*=\s*([+-]?\d+)/i);
    if (linearMatch) {
      let a = linearMatch[1] === "" || linearMatch[1] === "+" ? 1 : (linearMatch[1] === "-" ? -1 : parseFloat(linearMatch[1]));
      let b = linearMatch[2] ? parseFloat(linearMatch[2].replace(/\s+/g, '')) : 0;
      let c = parseFloat(linearMatch[3]);
      if (a !== 0) {
        let x = (c - b) / a;
        return `📐 **Linear Equation Solution:**\n• Equation: ${a}x ${b >= 0 ? '+ ' + b : '- ' + Math.abs(b)} = ${c}\n• Step 1: Subtract ${b} from both sides ➔ ${a}x = ${c - b}\n• Step 2: Divide by ${a} ➔ **x = ${x}**`;
      }
    }

    // Quadratic Equation Solver: ax^2 + bx + c = 0
    const quadMatch = p.match(/([+-]?\d*)\s*x\^2\s*([+-]\s*\d*)\s*x\s*([+-]\s*\d+)?\s*=\s*0/i);
    if (quadMatch) {
      let a = quadMatch[1] === "" || quadMatch[1] === "+" ? 1 : (quadMatch[1] === "-" ? -1 : parseFloat(quadMatch[1]));
      let b = quadMatch[2] === "" || quadMatch[2] === "+" ? 1 : (quadMatch[2] === "-" ? -1 : parseFloat(quadMatch[2].replace(/\s+/g, '')));
      let c = quadMatch[3] ? parseFloat(quadMatch[3].replace(/\s+/g, '')) : 0;

      let delta = b * b - 4 * a * c;
      if (delta > 0) {
        let x1 = (-b + Math.sqrt(delta)) / (2 * a);
        let x2 = (-b - Math.sqrt(delta)) / (2 * a);
        return `🧮 **Quadratic Equation Solution:**\n• Discriminant (Δ): b² - 4ac = ${delta}\n• Two real roots: **x₁ = ${x1.toFixed(2)}**, **x₂ = ${x2.toFixed(2)}**`;
      } else if (delta === 0) {
        let x = -b / (2 * a);
        return `🧮 **Quadratic Equation Solution:**\n• Discriminant (Δ) = 0\n• One repeated root: **x = ${x.toFixed(2)}**`;
      } else {
        return `🧮 **Quadratic Equation Solution:**\n• Discriminant (Δ) = ${delta} < 0\n• Complex roots: **x = ${(-b / (2 * a)).toFixed(2)} ± ${Math.sqrt(-delta) / (2 * a).toFixed(2)}i**`;
      }
    }

    // Derivative Rules: d/dx (x^n)
    if (p.includes("derivative") || p.includes("d/dx")) {
      const powMatch = p.match(/x\^(\d+)/);
      if (powMatch) {
        let n = parseInt(powMatch[1]);
        let newPow = n - 1;
        let resPow = newPow === 1 ? 'x' : (newPow === 0 ? '' : `x^${newPow}`);
        return `✏️ **Derivative Solution:**\n• Function: f(x) = x^${n}\n• Power Rule: d/dx [xⁿ] = n·xⁿ⁻¹\n• **f'(x) = ${n}${resPow}**`;
      }
      if (p.includes("sin")) return `✏️ **Derivative Solution:**\n• d/dx [sin(x)] = **cos(x)**`;
      if (p.includes("cos")) return `✏️ **Derivative Solution:**\n• d/dx [cos(x)] = **-sin(x)**`;
      if (p.includes("tan")) return `✏️ **Derivative Solution:**\n• d/dx [tan(x)] = **sec²(x)**`;
    }

    // Basic Arithmetic: e.g. "calculate 25 * 4 + 10" or "solve 50 / 2"
    const calcMatch = p.match(/(?:calculate|solve|what is|\=)?\s*(\d+(?:\.\d+)?\s*[\+\-\*\/\^]\s*\d+(?:\.\d+)?(?:\s*[\+\-\*\/\^]\s*\d+(?:\.\d+)?)*)/i);
    if (calcMatch && !p.includes("x")) {
      try {
        let expr = calcMatch[1].replace(/\^/g, '**');
        let result = eval(expr);
        return `🔢 **Calculation Result:**\n• ${calcMatch[1]} = **${result}**`;
      } catch (e) {}
    }

    return null;
  },

  // Auto-Responder Engine
  async ask(prompt, mode = 'explain') {
    const p = prompt.toLowerCase().trim();
    
    // Smooth delay simulation
    await new Promise(r => setTimeout(r, 450));

    // Check for direct Math Solver match first
    const mathSol = this.solveMath(prompt);
    if (mathSol) return mathSol;

    if (mode === 'quiz') {
      return {
        type: 'quiz',
        question: `AI Active Recall: What is the integral of f(x) = 2x?`,
        options: [
          'A. x² + C',
          'B. 2x² + C',
          'C. x + C',
          'D. 2 + C'
        ],
        correctIndex: 0,
        explanation: 'Integration is the inverse of differentiation: ∫ 2x dx = x² + C.'
      };
    }

    if (mode === 'summarize') {
      return `📌 **AI Calculus Summary:**\n• Derivatives measure instantaneous rate of change (slope).\n• Integrals calculate cumulative area under curves.\n• Fundamental Theorem ties Integration & Differentiation together.`;
    }

    if (mode === 'flashcard') {
      return {
        type: 'flashcard',
        front: `Flashcard: What is Euler's Formula?`,
        back: `e^(iπ) + 1 = 0 (Relates Exponential, Trigonometric & Complex numbers).`
      };
    }

    // Khmer Language Auto Response
    if (/[\u1780-\u17FF]/.test(prompt)) {
      if (p.includes("គណិត") || p.includes("math")) {
        return `📐 **ចម្លើយស្វ័យប្រវត្តិកាត់គណិតវិទ្យា:**\nគណិតវិទ្យាជាគ្រឹះនៃវិទ្យាសាស្ត្រ និងបច្ចេកវិទ្យា។ ដើម្បីពូកែគណិតវិទ្យា សូមធ្វើលំហាត់ប្រចាំថ្ងៃ និងរំលឹកទ្រឹស្តីបទជាប្រចាំ!`;
      }
      return `✨ **ចម្លើយស្វ័យប្រវត្តិបញ្ញាសិប្បនិម្មិត:**\nខ្ញុំបានទទួលបានសំណួររបស់អ្នកគឺ: "${prompt}"។ ប្រព័ន្ធនឹងជួយអ្នកដោះស្រាយលំហាត់ និងផ្ដល់ការសិក្សាប្រកបដោយប្រសិទ្ធភាព!`;
    }

    // Comprehensive Knowledge Base Auto-Responses
    if (p.includes("pythagoras") || p.includes("pythagorean")) {
      return `📐 **Pythagorean Theorem:**\nIn any right-angled triangle:\n• **a² + b² = c²** (where c is the hypotenuse opposite the right angle).\n• Example: If a = 3 and b = 4, then c = √(3² + 4²) = √(9 + 16) = 5.`;
    }
    if (p.includes("matrix") || p.includes("matrices")) {
      return `📊 **Matrix Operations:**\nA matrix is a rectangular array of numbers arranged in rows and columns.\n• Addition & Subtraction: Performed element-wise on matrices of identical dimensions.\n• Multiplication (A · B): The number of columns in A must equal the number of rows in B.`;
    }
    if (p.includes("calculus") || p.includes("integral") || p.includes("limit")) {
      return `♾️ **Calculus Overview:**\n• Differential Calculus: Analyzes rates of change and slopes of curves (f'(x)).\n• Integral Calculus: Calculates total accumulation and areas under curves (∫ f(x) dx).\n• Limits: Define continuity, derivatives, and integrals as values approach infinity or points.`;
    }
    if (p.includes("physics") || p.includes("force") || p.includes("newton")) {
      return `⚛️ **Newton's Laws of Motion:**\n1. First Law (Inertia): Objects stay at rest or uniform velocity unless acted on by a force.\n2. Second Law: **F = m · a** (Force equals mass times acceleration).\n3. Third Law: For every action, there is an equal and opposite reaction.`;
    }
    if (p.includes("python") || p.includes("code") || p.includes("programming")) {
      return `🐍 **Python Programming Guide:**\nPython is a clean, versatile language used for AI, Data Science, and Web Apps.\n• Key Data Structures: Lists \`[]\`, Dictionaries \`{}\`, Tuples \`()\`, Sets \`{}\`.\n• Example: \`def square(x): return x ** 2\``;
    }
    if (p.includes("study") || p.includes("remember") || p.includes("exam")) {
      return `🧠 **Effective Study Techniques:**\n1. Active Recall: Test yourself with flashcards or quizzes instead of passive reading.\n2. Spaced Repetition: Review material at expanding time intervals (1 day, 3 days, 1 week).\n3. Feynman Technique: Explain concepts in simple terms as if teaching a beginner.`;
    }

    return `✨ **AI Auto-Responder:**\nI processed your query: "${prompt}".\n• Tip: You can ask me to solve linear equations like \`2x + 5 = 15\`, quadratic equations \`x^2 - 5x + 6 = 0\`, power derivatives \`d/dx x^3\`, or arithmetic calculations like \`250 * 4\`!`;
  }
};
