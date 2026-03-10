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
    let currentGroup = [];
    let currentIndex = 0;

    // 1. Criar o HTML do Lightbox dinamicamente
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <span class="lightbox-close">&times;</span>
        <button class="lightbox-nav lightbox-prev">&lsaquo;</button>
        <img class="lightbox-content" src="" alt="View Enlarged">
        <button class="lightbox-nav lightbox-next">&rsaquo;</button>
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('.lightbox-content');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');

    // 2. Selecionar todas as imagens que podem ser ampliadas
    const galleryImages = document.querySelectorAll('.ilustracao-item img, .ticker__item img, .highlight-item img, .certificado-item img');

    const updateLightbox = () => {
        if (currentGroup.length > 0) {
            const img = currentGroup[currentIndex];
            lightboxImg.src = img.src;
            // Mostrar/esconder botões baseado no índice
            prevBtn.style.display = currentIndex > 0 ? 'block' : 'none';
            nextBtn.style.display = currentIndex < currentGroup.length - 1 ? 'block' : 'none';
        }
    };

    galleryImages.forEach(img => {
        img.addEventListener('click', (e) => {
            // Se estiver dentro de um link (ticker), evita o redirecionamento para abrir o zoom
            if (img.closest('a')) {
                e.preventDefault();
            }

            // Encontrar o grupo: o contêiner mais próximo que agrupa essas imagens
            const container = img.closest('.grid-ilustracoes, .ticker__list, .certificados, .projeto-secao, .highlights-feed, .highlights-section, .certificados-section');
            if (container) {
                // Pegamos apenas as imagens que fazem parte da galeria dentro deste contêiner
                currentGroup = Array.from(container.querySelectorAll('.ilustracao-item img, .ticker__item img, .highlight-item img, .certificado-item img'));
                currentIndex = currentGroup.indexOf(img);
            } else {
                currentGroup = [img];
                currentIndex = 0;
            }

            updateLightbox();
            lightbox.classList.add('active');
            body.classList.add('lightbox-open');
        });
    });

    // 3. Navegação
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentIndex > 0) {
            currentIndex--;
            updateLightbox();
        }
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentIndex < currentGroup.length - 1) {
            currentIndex++;
            updateLightbox();
        }
    });

    // 4. Fechar o Lightbox
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

    // Fechar com a tecla Esc e Navegação por setas
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (lightbox.classList.contains('active')) {
                closeLightbox();
            } else if (menuOverlay && menuOverlay.classList.contains('active')) {
                menuIcon.classList.remove('active');
                menuOverlay.classList.remove('active');
                body.classList.remove('menu-open');
            }
            return;
        }

        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            currentIndex--;
            updateLightbox();
        } else if (e.key === 'ArrowRight' && currentIndex < currentGroup.length - 1) {
            currentIndex++;
            updateLightbox();
        }
    });
});
