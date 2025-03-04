document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.testimonials-slider');
    const testimonials = document.querySelectorAll('.testimonial');
    
    if (!slider || testimonials.length === 0) return;

    function duplicateTestimonials() {
        const originalTestimonials = slider.innerHTML;
        slider.innerHTML = originalTestimonials + originalTestimonials;
    }

    duplicateTestimonials();

    let position = 0;
    const testimonialWidth = testimonials[0].offsetWidth + parseInt(getComputedStyle(testimonials[0]).marginRight);
    const totalWidth = testimonialWidth * (testimonials.length / 2); // Divide by 2 because of duplicates
    
    function moveSlider() {
        position -= 1; // Adjust speed by changing this value
        
        // Reset position when reaching half of the testimonials
        if (Math.abs(position) >= totalWidth) {
            position = 0;
        }
        
        slider.style.transform = `translateX(${position}px)`;
    }

    // Start animation
    let animationId;
    const startAnimation = () => {
        animationId = setInterval(moveSlider, 30); // Adjust interval for smoother/faster animation
    };

    // Pause animation on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(animationId);
    });

    // Resume animation when mouse leaves
    slider.addEventListener('mouseleave', () => {
        startAnimation();
    });

    // Start initial animation
    startAnimation();
});