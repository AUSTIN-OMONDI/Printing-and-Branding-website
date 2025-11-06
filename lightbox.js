// Lightbox functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create lightbox container
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    document.body.appendChild(lightbox);

    // Handle product image clicks
    document.querySelectorAll('.product-info').forEach(product => {
        product.addEventListener('click', function(e) {
            const img = this.querySelector('img');
            const lightboxImg = document.createElement('img');
            lightboxImg.src = img.src;
            
            // Clear previous content and add new image
            lightbox.innerHTML = '';
            lightbox.appendChild(lightboxImg);
            lightbox.classList.add('active');
            
            // Prevent scroll on body
            document.body.style.overflow = 'hidden';
        });
    });

    // Close lightbox on click
    lightbox.addEventListener('click', function() {
        this.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Image loading animation
    document.querySelectorAll('.product-image img').forEach(img => {
        img.classList.add('loading');
        img.onload = function() {
            this.parentElement.classList.remove('loading');
        };
    });
});

// Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.product-image img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });
});