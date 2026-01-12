// Image data
const images = [
    {
        id: 1,
        src: "images/1.jpg",
        title: "lakeview Mountains",
        category: "nature",
        description: "A breathtaking view of snow-capped mountains at sunrise with soft morning light illuminating the peaks."
    },
    {
        id: 2,
        src: "images/5.jpg",
        title: "City Skyline",
        category: "city",
        description: "Modern city skyline during the golden hour with reflections on the river."
    },
    {
        id: 3,
        src: "images/13.jpg",
        title: "Portrait of a rabbit",
        category: "portrait",
        description: "A thoughtful portrait with soft natural lighting highlighting the subject's features."
    },
    {
        id: 4,
        src: "images/2.jpg",
        title: "Mountain Aurora",
        category: "nature",
        description: "The magical dance of aurora borealis in the night sky over a frozen lake."
    },
    {
        id: 5,
        src: "images/8.jpg",
        title: "Window Seeing",
        category: "travel",
        description: "Historic architecture with intricate details and patterns from a bygone era."
    },
    {
        id: 6,
        src: "images/10.jpg",
        title: "Colorful Abstract",
        category: "abstract",
        description: "Vibrant colors and fluid forms creating an intriguing abstract composition."
    },
    {
        id: 7,
        src: "images/3.jpg",
        title: "Forest Mist",
        category: "nature",
        description: "Mystical morning mist weaving through tall trees in a dense forest."
    },
    {
        id: 8,
        src: "images/7.jpg",
        title: "Urban life",
        category: "city",
        description: "Vibrant city streets at night with neon lights and bustling energy."
    },
    {
        id: 9,
        src: "images/12.jpg",
        title: "Smiling Portrait",
        category: "portrait",
        description: "A joyful portrait capturing genuine happiness and connection."
    },
    {
        id: 10,
        src: "images/9.jpg",
        title: "Tropical Paradise",
        category: "travel",
        description: "Pristine beach with turquoise water and palm trees under a clear blue sky."
    },
    {
        id: 11,
        src: "./images/14.jpg",
        title: "Monkey King",
        category: "portrait",
        description: "A joyful portrait capturing genuine happiness and connection."
    },
    {
        id: 12,
        src: "images/4.jpg",
        title: "Desert Nightlife",
        category: "nature",
        description: "Crystal clear mountain lake reflecting the surrounding peaks perfectly."
    },
    
    {
        id: 13,
        src: "./images/11.jpg",
        title: "Colorful Abstract",
        category: "abstract",
        description: "Crystal clear mountain lake reflecting the surrounding peaks perfectly."
    },
    
    {
        id: 14,
        src: "./images/6.jpg",
        title: "Modern Cityscape",
        category: "city",
        description: "Crystal clear mountain lake reflecting the surrounding peaks perfectly."
    }
];

// DOM Elements
const gallery = document.getElementById('imageGallery');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDescription = document.getElementById('lightboxDescription');
const lightboxCategory = document.getElementById('lightboxCategory');
const imageCounter = document.getElementById('imageCounter');
const closeLightbox = document.getElementById('closeLightbox');
const prevImageBtn = document.getElementById('prevImage');
const nextImageBtn = document.getElementById('nextImage');
const filterButtons = document.querySelectorAll('.filter-btn');
const gridViewBtn = document.getElementById('gridView');
const masonryViewBtn = document.getElementById('masonryView');

// State variables
let currentFilter = 'all';
let currentView = 'masonry';
let currentImageIndex = 0;
let filteredImages = [...images];

// Initialize the gallery
function initGallery() {
    renderGallery();
    setupEventListeners();
}

// Render gallery based on current filter
function renderGallery() {
    gallery.innerHTML = '';
    
    // Filter images based on current filter
    if (currentFilter === 'all') {
        filteredImages = [...images];
    } else {
        filteredImages = images.filter(image => image.category === currentFilter);
    }
    
    // Apply view mode
    if (currentView === 'masonry') {
        gallery.classList.add('masonry');
        gallery.classList.remove('grid');
    } else {
        gallery.classList.add('grid');
        gallery.classList.remove('masonry');
    }
    
    // Create gallery items
    filteredImages.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.style.animationDelay = `${index * 0.05}s`;
        galleryItem.dataset.index = index;
        
        galleryItem.innerHTML = `
            <img src="${image.src}" alt="${image.title}" loading="lazy">
            <div class="image-overlay">
                <span><i class="fas fa-search-plus"></i></span>
            </div>
            <div class="image-info">
                <h3 class="image-title">${image.title}</h3>
                <span class="image-category">${image.category}</span>
            </div>
        `;
        
        gallery.appendChild(galleryItem);
        
        // Add click event to open lightbox
        galleryItem.addEventListener('click', () => openLightbox(index));
    });
}

// Open lightbox with selected image
function openLightbox(index) {
    currentImageIndex = index;
    updateLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
    
    // Show loading indicator
    const loader = document.querySelector('.image-loader');
    loader.style.display = 'flex';
    
    // Preload image
    const img = new Image();
    img.src = filteredImages[currentImageIndex].src;
    img.onload = () => {
        loader.style.display = 'none';
        lightboxImage.src = img.src;
    };
}

// Update lightbox content
function updateLightbox() {
    const currentImage = filteredImages[currentImageIndex];
    
    lightboxTitle.textContent = currentImage.title;
    lightboxDescription.textContent = currentImage.description;
    lightboxCategory.textContent = currentImage.category;
    imageCounter.textContent = `${currentImageIndex + 1} / ${filteredImages.length}`;
}

// Close lightbox
function closeLightboxFunc() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

// Navigate to previous image
function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
    updateLightbox();
    
    // Show loading indicator
    const loader = document.querySelector('.image-loader');
    loader.style.display = 'flex';
    
    // Preload image
    const img = new Image();
    img.src = filteredImages[currentImageIndex].src;
    img.onload = () => {
        loader.style.display = 'none';
        lightboxImage.src = img.src;
    };
}

// Navigate to next image
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % filteredImages.length;
    updateLightbox();
    
    // Show loading indicator
    const loader = document.querySelector('.image-loader');
    loader.style.display = 'flex';
    
    // Preload image
    const img = new Image();
    img.src = filteredImages[currentImageIndex].src;
    img.onload = () => {
        loader.style.display = 'none';
        lightboxImage.src = img.src;
    };
}

// Setup event listeners
function setupEventListeners() {
    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            // Update filter and render gallery
            currentFilter = button.dataset.filter;
            renderGallery();
        });
    });
    
    // View mode buttons
    gridViewBtn.addEventListener('click', () => {
        gridViewBtn.classList.add('active');
        masonryViewBtn.classList.remove('active');
        currentView = 'grid';
        renderGallery();
    });
    
    masonryViewBtn.addEventListener('click', () => {
        masonryViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
        currentView = 'masonry';
        renderGallery();
    });
    
    // Lightbox controls
    closeLightbox.addEventListener('click', closeLightboxFunc);
    prevImageBtn.addEventListener('click', prevImage);
    nextImageBtn.addEventListener('click', nextImage);
    
    // Close lightbox when clicking on backdrop
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightboxFunc();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightboxFunc();
                break;
            case 'ArrowLeft':
                prevImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
        }
    });
}

// Initialize the gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', initGallery);