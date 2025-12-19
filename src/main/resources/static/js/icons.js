document.addEventListener('DOMContentLoaded', function() {
    //addLogoIcon();
    addFeatureIcons();
    addAppIcons();
});
/*
function addLogoIcon() {
    document.querySelectorAll('.logo-icon').forEach(icon => {
        icon.innerHTML = '<img src="images/logo.png" alt="BoneDensity Logo" style="
        width: clamp(1.5rem, 4vw, 2.5rem);
        height: clamp(1.5rem, 4vw, 2.5rem);
        vertical-align: middle;
        display: inline-block;
        ">';
        icon.style.textAlign = 'center';
        icon.style.lineHeight = '1';
    });
}
*/
function addFeatureIcons() {
    const iconMapping = {
        'space': 'images/space-ready.png',
        'acoustic': 'images/acoustic.png',
        'accessibility': 'images/Accessibility.png',
        'analytics': 'images/analytics.png'
    };

    document.querySelectorAll('.feature-icon').forEach(icon => {
        const iconKey = getIconKeyFromContext(icon);
        const imagePath = iconMapping[iconKey];
        if (imagePath) {
            icon.innerHTML = `<img src="${imagePath}" alt="${iconKey.replace('-', ' ')}" style="
                width: clamp(5rem, 16vw, 32rem);
                height: clamp(4rem, 10vw, 5rem);
                object-fit: contain;
                display: block;
                margin: 0 auto;
            ">`;
            // Centering
            icon.style.display = 'flex';
            icon.style.alignItems = 'center';
            icon.style.justifyContent = 'center';
            icon.style.minHeight = '4rem';
        }
    });
}

function addAppIcons() {
    const appIconMapping = {
        'space': 'images/space-exploration.png',
        'osteoporosis': 'images/osteoporosis.png',
        'elderly': 'images/elderly-care.png'
    };

    document.querySelectorAll('.app-card h3').forEach(h3 => {
        const titleText = h3.textContent.toLowerCase();
        let iconKey = '';
        if (titleText.includes('space')) iconKey = 'space';
        else if (titleText.includes('osteoporosis') || titleText.includes('diagnosis')) iconKey = 'osteoporosis';
        else if (titleText.includes('elderly')) iconKey = 'elderly';

        const imagePath = appIconMapping[iconKey];
        if (imagePath) {
            h3.innerHTML = `<img src="${imagePath}" alt="${iconKey.replace('-', ' ')}" style="
                width: clamp(1.25rem, 3vw, 2rem);
                height: clamp(1.25rem, 3vw, 2rem);
                vertical-align: middle;
                margin-right: 0.75rem;
                object-fit: contain;
                display: inline-block;
            "> ${h3.textContent}`;
        }
    });
}

function getIconKeyFromContext(icon) {
    const card = icon.closest('.feature-card');
    if (!card) return '';
    const title = card.querySelector('h3');
    if (!title) return '';

    const titleText = title.textContent.toLowerCase();
    if (titleText.includes('space')) return 'space';
    if (titleText.includes('acoustic')) return 'acoustic';
    if (titleText.includes('accessible') || titleText.includes('care')) return 'accessibility';
    if (titleText.includes('real-time') || titleText.includes('tracking')) return 'analytics';
    return '';
}
