
// Simple mock AI service to simulate generating task descriptions
// In a real app, this would connect to an AI API like OpenAI or Google's Gemini

export async function generateTaskDescription(prompt: string): Promise<string> {
  console.log("AI generating description based on:", prompt);
  
  // This is a mock implementation
  // In a real app, replace with actual API call to AI service
  
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate a random description based on the prompt
      const templates = [
        `Enhanced version of "${prompt}" with additional details and action items.`,
        `Revised task: "${prompt}" - Split into actionable steps with clear deliverables.`,
        `Improved description for "${prompt}" with specific success criteria and timeline.`,
        `Refined objective: "${prompt}" - Added context, dependencies, and expected outcomes.`
      ];
      
      const randomIndex = Math.floor(Math.random() * templates.length);
      resolve(templates[randomIndex]);
    }, 1000); // Simulate network delay
  });
}

export async function improveTaskDescription(currentDescription: string): Promise<string> {
  console.log("AI improving existing description:", currentDescription);
  
  // This is a mock implementation
  // In a real app, replace with actual API call to AI service
  
  return new Promise((resolve) => {
    setTimeout(() => {
      const improvedDescriptions = [
        `${currentDescription} - Enhanced with clearer objectives and measurable outcomes.`,
        `Improved: ${currentDescription} - Added specific action items and timeline.`,
        `Refined: ${currentDescription} - Elaborated with implementation details and success criteria.`,
        `Restructured: ${currentDescription} - Organized with priority markers and dependency notes.`
      ];
      
      const randomIndex = Math.floor(Math.random() * improvedDescriptions.length);
      resolve(improvedDescriptions[randomIndex]);
    }, 1200); // Simulate network delay
  });
}
