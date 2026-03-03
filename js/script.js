document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.querySelector('.menu-icon');
    const menuOverlay = document.querySelector('.menu-overlay');
    const body = document.body;

    if (menuIcon && menuOverlay) {
        menuIcon.addEventListener('click', () => {
            menuIcon.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            body.classList.toggle('menu-open');
        });

        // Fechar menu ao clicar em um link
        const menuLinks = menuOverlay.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuIcon.classList.remove('active');
                menuOverlay.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });
    }

    // --- Lightbox Logic ---

    // 1. Criar o HTML do Lightbox dinamicamente
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <span class="lightbox-close">&times;</span>
        <img class="lightbox-content" src="" alt="View Enlarged">
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('.lightbox-content');
    const lightboxClose = lightbox.querySelector('.lightbox-close');

    // 2. Selecionar todas as imagens que podem ser ampliadas
    // Pegamos imagens dentro de itens de grid e estampas (ignora o ticker para manter o redirecionamento)
    const galleryImages = document.querySelectorAll('.ilustracao-item img, .estampa-item img, .ilustracao-item-wide img');

    galleryImages.forEach(img => {
        img.addEventListener('click', (e) => {
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
            body.classList.add('lightbox-open');
        });
    });

    // 3. Fechar o Lightbox
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        body.classList.remove('lightbox-open');
    };

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Fechar com a tecla Esc
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
            if (menuOverlay.classList.contains('active')) {
                menuIcon.classList.remove('active');
                menuOverlay.classList.remove('active');
                body.classList.remove('menu-open');
            }
        }
    });
});
