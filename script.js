// script to handle the quote form, search, and WhatsApp functionality
(() => {
  const phone = '254796234446'; // Kenya country code + number without leading zero

  // set copyright year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- Marquee initializer: clone track items and set animation dynamically ---
  // --- Marquee initializer: dynamically generate images from folder list ---
  (function initMarquee(){
    const track = document.getElementById('marqueeTrack');
    if (!track) return;

    // Selected subset of image files for the marquee display
    const imageFiles = [
      // Popular promotional items
      "branded-caps.png",
      "Corporate-Mugs.png",
      "T-shirt-printing.png",
      "Polo-T-shirt.png",
      "Pens.png",
      "mouse-pad.png",
      "power-bank.png",
      // Signage and branding
      "3D-Signage.png",
      "Office-Branding.png",
      "Roll-up-banner.png",
      "Tear-drop-banner.png",
      // Identity items
      "Staff-ID-card.png",
      "Name-tags.png",
      "Lanyard-and-ID-card.png",
      // Accessories
      "tote-bags.png",
      "Umbrella.png",
      "Wall-clock.png",
      "wristband.png"
    ];

    // Helper to create a readable caption from filename
    function makeCaption(filename) {
      return filename
        .replace(/[-_]/g, ' ')
        .replace(/\.[^.]+$/, '')
        .replace(/\b([a-z])/g, c => c.toUpperCase())
        .replace(/\bId\b/g, 'ID')
        .replace(/\bRip\b/g, 'R.I.P')
        .replace(/\bT Shirt\b/g, 'T-shirt')
        .replace(/\bMugs\b/g, 'Mugs')
        .replace(/\bKey Holders\b/g, 'Key holders');
    }

    // Generate HTML for all images
    track.innerHTML = imageFiles.map(file => {
      const caption = makeCaption(file);
      return `<figure class="marquee-item"><img src="images/${file}" alt="${caption}"><figcaption>${caption}</figcaption></figure>`;
    }).join('');

    // compute animation duration based on distance and speed
    function applyAnimation(){
      requestAnimationFrame(() => {
        const totalWidth = track.scrollWidth;
        const pxPerSec = 900; // pixels per second, 5x faster than before
        const durationSec = Math.max(1, Math.round(totalWidth / pxPerSec));
        track.style.animation = `marqueeScrollFull ${durationSec}s linear infinite`;
        track.dataset.marqueeInit = '1';
      });
    }

    // pause on pointer enter / resume on leave for better UX
    track.addEventListener('mouseenter', () => { track.style.animationPlayState = 'paused'; });
    track.addEventListener('mouseleave', () => { track.style.animationPlayState = 'running'; });

    applyAnimation();
    window.addEventListener('resize', () => {
      track.dataset.marqueeInit = '0';
      setTimeout(applyAnimation, 200);
    });
  })();

  const form = document.getElementById('quoteForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = (document.getElementById('name') || {}).value || '';
    const service = (document.getElementById('service') || {}).value || '';
    const notes = (document.getElementById('notes') || {}).value || '';

    const messageLines = [
      'Hello Calidad Conquista, I need printing/branding services.',
      `Service: ${service}`,
      `Name: ${name}`,
      `Notes: ${notes}`
    ];

    const message = messageLines.filter(Boolean).join('\n');
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    // open WhatsApp (web or app)
    window.open(url, '_blank', 'noopener');
  });
  // Product search functionality
  const searchInput = document.getElementById('productSearch');
  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      const searchTerm = e.target.value.toLowerCase();
      const products = document.querySelectorAll('.product-info');
      
      products.forEach(product => {
        const productName = product.querySelector('.product-name').textContent.toLowerCase();
        const productItem = product.closest('li');
        
        if (productName.includes(searchTerm)) {
          productItem.style.display = '';
        } else {
          productItem.style.display = 'none';
        }
      });
    });
  }
})();
