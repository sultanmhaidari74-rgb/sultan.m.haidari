
/* ==================================================
   HAIDARI SPATIAL LAB — Interactivity
   ================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ---------- MOBILE NAV TOGGLE ---------- */
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    /* ---------- GALLERY FILTERS ---------- */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Toggle active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            galleryItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    /* ---------- LIGHTBOX ---------- */
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    let currentIndex = 0;
    let visibleItems = [];

    const openLightbox = (index) => {
        // Only navigate within currently visible (filtered) items
        visibleItems = Array.from(galleryItems).filter(item => !item.classList.contains('hidden'));
        currentIndex = visibleItems.indexOf(galleryItems[index]);
        if (currentIndex < 0) currentIndex = 0;

        updateLightbox();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const updateLightbox = () => {
        const currentItem = visibleItems[currentIndex];
        if (!currentItem) return;

        const img = currentItem.querySelector('img');
        const caption = currentItem.querySelector('figcaption');

        lightboxImage.src = currentItem.dataset.src || img.src;
        lightboxImage.alt = img.alt;
        lightboxCaption.textContent = caption ? caption.textContent : '';
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };

    const nextImage = () => {
        currentIndex = (currentIndex + 1) % visibleItems.length;
        updateLightbox();
    };

    const prevImage = () => {
        currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
        updateLightbox();
    };

    // Attach click handlers
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxNext) lightboxNext.addEventListener('click', nextImage);
    if (lightboxPrev) lightboxPrev.addEventListener('click', prevImage);

    // Click outside image closes lightbox
    lightbox?.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    });

    /* ---------- MODAL (Projects & Research) ---------- */
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    const modalClose = modal?.querySelector('.modal-close');

    // Project data — EDIT THESE to customize each project
    const projectData = {
        uhi: {
            title: 'Kabul Urban Heat Island',
            role: 'Spatial-Temporal Analysis · 2024–2025',
            body: `
                <p>This project investigates the spatial and temporal dynamics of
                Urban Heat Island (UHI) effects in Kabul, Afghanistan, using
                multi-temporal Landsat satellite imagery.</p>

                <p><strong>Objectives:</strong></p>
                <p>• Analyze Land Surface Temperature (LST) changes between 2007 and 2025<br>
                • Assess Land Use / Land Cover (LULC) transformation<br>
                • Calculate the Urban Thermal Field Variance Index (UTFVI)<br>
                • Predict future LST patterns for 2030 and 2040</p>

                <p><strong>Methods:</strong> Google Earth Engine, QGIS, Python,
                supervised classification (Random Forest), and cellular automata
                modelling.</p>

                <p><strong>Key Findings:</strong> Significant increase in built-up
                areas correlates with rising LST intensity, with the highest
                UTFVI classes expanding across central Kabul districts.</p>
            `,
            tags: ['LST', 'LULC', 'UTFVI', 'Remote Sensing', 'Google Earth Engine']
        },
        hazard: {
            title: 'Kabul Natural Hazard Assessment',
            role: 'GIS-Based Risk Mapping · 2025',
            body: `
                <p>A comprehensive GIS-based assessment of natural and environmental
                hazards affecting urban Kabul, including seismic, hydrological,
                and thermal risks.</p>

                <p><strong>Hazards analyzed:</strong></p>
                <p>• Earthquake vulnerability<br>
                • Flood risk zones<br>
                • Landslide susceptibility<br>
                • Extreme heat exposure</p>

                <p><strong>Methods:</strong> Multi-criteria decision analysis (MCDA),
                weighted overlay in ArcGIS, and raster analysis.</p>
            `,
            tags: ['GIS', 'Risk Assessment', 'MCDA', 'ArcGIS', 'Spatial Analysis']
        },
        lulc: {
            title: 'LULC Change & Prediction',
            role: 'Land Use / Land Cover Modelling · 2025',
            body: `
                <p>Detection and prediction of Land Use / Land Cover (LULC)
                change in the Kabul metropolitan area using remote sensing
                and machine learning.</p>

                <p><strong>Time periods:</strong> 2007 → 2025 (observed),
                2030 → 2040 (predicted)</p>

                <p><strong>Methods:</strong> Supervised classification
                (Random Forest), change detection, CA-Markov prediction
                in TerrSet / Python.</p>

                <p><strong>Outcome:</strong> Forecast maps highlighting urban
                expansion trends and loss of vegetation cover.</p>
            `,
            tags: ['LULC', 'Machine Learning', 'CA-Markov', 'Prediction', 'Remote Sensing']
        }
    };

    const researchData = {
        'uhi-paper': {
            title: 'Kabul UHI Research Paper',
            role: 'Monograph · In Progress',
            body: `
                <p>A monograph investigating the relationship between urban
                growth, land surface temperature, and environmental resilience
                in Kabul, Afghanistan.</p>

                <p>The research combines satellite imagery, spatial modelling,
                and computational analysis to provide evidence-based insights
                for urban planners and policymakers.</p>

                <p><strong>Status:</strong> In progress — expected completion 2026.</p>
            `,
            tags: ['Urban Climate', 'LST', 'UTFVI', 'In Progress']
        },
        'uhi-chapter': {
            title: 'UHI Chapter',
            role: 'Book Chapter',
            body: `
                <p>A book chapter focusing on Urban Heat Island methodologies,
                indices, and applications in urban planning practice.</p>

                <p>The chapter covers thermal remote sensing techniques,
                the UTFVI index, and case studies from rapidly urbanizing
                cities in South and Central Asia.</p>
            `,
            tags: ['UTFVI', 'Methodology', 'Urban Climate']
        },
        'climate-agri': {
            title: 'Climate Change & Agriculture',
            role: 'Geospatial Research',
            body: `
                <p>Investigating climate change impacts on agricultural systems
                using geospatial and remote sensing approaches.</p>

                <p><strong>Methods:</strong> NDVI time-series analysis,
                precipitation trends, drought indices.</p>

                <p>Focused on semi-arid regions and their vulnerability to
                shifting climatic patterns.</p>
            `,
            tags: ['Climate', 'NDVI', 'Agriculture', 'Remote Sensing']
        }
    };

    const openModal = (data) => {
        if (!data) return;
        modalBody.innerHTML = `
            <h3>${data.title}</h3>
            <p class="modal-role">${data.role}</p>
            ${data.body}
            <div class="tags">
                ${data.tags.map(t => `<span class="tag">${t}</span>`).join('')}
            </div>
        `;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Project cards
    document.querySelectorAll('.card-project').forEach(card => {
        card.addEventListener('click', () => {
            openModal(projectData[card.dataset.project]);
        });
    });

    // Research cards
    document.querySelectorAll('.card-research').forEach(card => {
        card.addEventListener('click', () => {
            openModal(researchData[card.dataset.research]);
        });
    });

    // Close modal
    modalClose?.addEventListener('click', closeModal);
    modal?.querySelectorAll('[data-close-modal]').forEach(el => {
        el.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    /* ---------- SMOOTH SCROLL for nav links ---------- */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

});
