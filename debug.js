// Debug script for image loading
document.addEventListener('DOMContentLoaded', function() {
    console.log('Debug script loaded');
    
    // Get all product images
    const images = document.querySelectorAll('.product-image img');
    console.log(`Found ${images.length} product images`);
    
    // Monitor each image
    images.forEach((img, index) => {
        console.log(`Image ${index + 1}:`, {
            src: img.src,
            currentSrc: img.currentSrc,
            naturalWidth: img.naturalWidth,
            naturalHeight: img.naturalHeight,
            complete: img.complete
        });
        
        // Add load event listener
        img.addEventListener('load', function() {
            console.log(`Image loaded successfully:`, img.src);
        });
        
        // Add error event listener
        img.addEventListener('error', function() {
            console.error(`Failed to load image:`, img.src);
            // Try to load a fallback
            img.src = '/images/placeholder.jpg';
        });
    });
});