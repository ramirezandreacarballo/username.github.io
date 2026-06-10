// Configuración del efecto de escritura letra a letra
const targetContainer = document.getElementById("typing-text");

// Los estados de lo que pasará en la pantalla

let currentStep = 0;
const steps = [
  { action: "type", text: "ARCHITECT" },
  { action: "wait", time: 1300 },
  { action: "delete", count: 9 },
  { action: "wait", time: 300 },
  { action: "type", text: "DEVELOPER" },
  { action: "wait", time: 1300 },
  { action: "delete", count: 9 },
  { action: "wait", time: 400 },
  { action: "type", text: "SOLVER." }
];
function executeNextStep() {
  if (currentStep >= steps.length) return; // Se detiene al llegar a SOLVER

  const step = steps[currentStep];

  if (step.action === "type") {
    let charIndex = 0;
    const typeInterval = setInterval(() => {
      targetContainer.textContent += step.text[charIndex];
      charIndex++;
      if (charIndex >= step.text.length) {
        clearInterval(typeInterval);
        currentStep++;
        setTimeout(executeNextStep, 100);
      }
    }, 120); // Velocidad al escribir (120ms por letra)

  } else if (step.action === "delete") {
    let deleteCount = 0;
    const deleteInterval = setInterval(() => {
      let currentText = targetContainer.textContent;
      targetContainer.textContent = currentText.substring(0, currentText.length - 1);
      deleteCount++;
      if (deleteCount >= step.count) {
        clearInterval(deleteInterval);
        currentStep++;
        setTimeout(executeNextStep, 100);
      }
    }, 80); // Velocidad al borrar (más rápido, 80ms por letra)

  } else if (step.action === "wait") {
    currentStep++;
    setTimeout(executeNextStep, step.time);
  }
}

// Disparar la animación en cuanto cargue la página
window.addEventListener("DOMContentLoaded", executeNextStep);