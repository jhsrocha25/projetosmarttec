/**
 * Aura Mobile - Core Interaction Logic
 * Implements Taste-Skill:
 * - Magnetic Hover Effects
 * - Intersection Observer Reveal Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    
    /* 1. Intersection Observer for Smooth Staggered Reveals */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add active class for CSS animation cascade
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-item');
    revealElements.forEach(el => revealObserver.observe(el));


    /* 2. Magnetic Buttons (Performance Optimized via requestAnimationFrame logic) */
    const magneticElements = document.querySelectorAll('.magnetic');

    magneticElements.forEach(elem => {
        elem.addEventListener('mousemove', (e) => {
            const rect = elem.getBoundingClientRect();
            // Get mouse position relative to the element center
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Get magnetic strength from data attribute or default to 20
            const strength = elem.dataset.strength ? parseFloat(elem.dataset.strength) : 20;

            // Apply slight translation based on strength
            elem.style.transform = `translate(${x / strength}px, ${y / strength}px)`;
        });

        elem.addEventListener('mouseleave', () => {
            // Spring back via CSS transition
            elem.style.transform = 'translate(0px, 0px)';
        });
    });

});

// ============================================
// MODAL DE AGENDAMENTO
// ============================================
function openScheduleModal() {
  const modal = document.getElementById('scheduleModal');
  if (modal) modal.classList.add('active');
}

function closeScheduleModal() {
  const modal = document.getElementById('scheduleModal');
  if (modal) modal.classList.remove('active');
}

function submitSchedule() {
  const name = document.getElementById('schedName').value;
  const date = document.getElementById('schedDate').value;
  const time = document.getElementById('schedTime').value;

  if (!name || !date || !time) {
    alert("Por favor, preencha todos os campos para prosseguirmos.");
    return;
  }

  // Format YYYY-MM-DD para DD/MM/YYYY
  const parts = date.split('-');
  const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;

  const text = `*NOVO AGENDAMENTO*\n\nOlá, Rede Smarttec. Meu nome é *${name}* e gostaria de deixar um horário marcado.\n\n📅 *Dia:* ${formattedDate}\n⏰ *Horário:* ${time}`;
  const encodedText = encodeURIComponent(text);
  window.open(`https://api.whatsapp.com/send/?phone=553832210581&text=${encodedText}`, '_blank');
  
  closeScheduleModal();
}

// Fechar modal ao clicar fora dele
window.addEventListener('click', (e) => {
  const modal = document.getElementById('scheduleModal');
  if (e.target === modal) {
    closeScheduleModal();
  }
});
