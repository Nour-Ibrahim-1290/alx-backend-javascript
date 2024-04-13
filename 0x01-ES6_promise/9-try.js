export default function guardrail(mathFunction) {
  const queue = []; // Create the queue
  
  try {
    const result = mathFunction();
    queue.push(result); // Add the function's result
  } catch (error) {
    queue.push(error.message); // Add the error message
  } finally {
    queue.push("Guardrail was processed"); // Always add this message
  }
  
  return queue;
}
