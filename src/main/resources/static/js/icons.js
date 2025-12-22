// ===== CONFIGURATION =====
const ICON_CONFIGS = {
    logo: {
        selector: '.logo-icon',
        mapping: { default: '/images/Logo.png' },
        styles: { width: 'clamp(2.25rem, 6vw, 3.75rem)', height: 'clamp(2.25rem, 6vw, 3.75rem)', verticalAlign: 'middle', display: 'inline-block' },
        containerStyles: { textAlign: 'center', lineHeight: '1' },
        position: 'replace'
    },
    feature: {
        selector: '.feature-card',
        iconSelector: '.feature-icon',
        titleSelector: 'h3',
        mapping: { space: 'images/Rocket.png', acoustic: 'images/SoundIcon.png', accessibility: 'images/Accessibility.png', analytics: 'images/GraphIcon.png' },
        keywords: { space: ['space'], acoustic: ['acoustic'], accessibility: ['accessible', 'care'], analytics: ['real-time', 'tracking'] },
        styles: { width: 'clamp(5rem, 16vw, 32rem)', height: 'clamp(4rem, 10vw, 5rem)', display: 'block', margin: '0 auto' },
        containerStyles: { display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '4rem' },
        objectFit: { accessibility: 'contain', default: 'cover' },
        position: 'replace'
    },
    app: {
        selector: '.application-card',
        iconSelector: '.app-icon',
        titleSelector: 'h3',
        mapping: { space: 'images/Space.png', osteoporosis: 'images/Osteoporosis.png', elderly: 'images/Accessibility2.png' },
        keywords: { space: ['space'], osteoporosis: ['osteoporosis', 'diagnosis'], elderly: ['elderly'] },
        styles: { width: 'clamp(12rem, 4vw, 5rem)', height: 'clamp(12rem, 4vw, 5rem)', display: 'block', margin: '0 auto 1rem' },
        objectFit: { elderly: 'contain', default: 'cover' },
        transform: { elderly: 'scale(0.5)' },
        position: 'replace'
    },
    stat: {
        selector: '.stat-card',
        iconSelector: '.stat-icon',
        titleSelector: '.stat-desc',
        mapping: { weight: 'images/Weight.png', time: 'images/Time.png', accuracy: 'images/Score_AssessmentIcon.png', budget: 'images/Cost.png' },
        keywords: { weight: ['weight'], time: ['time'], accuracy: ['accuracy', 'detection'], budget: ['budget', 'cost'] },
        styles: { width: 'clamp(10rem, 15vw, 16rem)', height: 'clamp(8rem, 10vw, 8rem)', objectFit: 'cover', objectPosition: 'center', display: 'block', margin: '0 auto' },
        position: 'replace'
    },
    metric: {
        selector: '.metric-card',
        iconSelector: '.metric-icon',
        titleSelector: '.metric-label',
        mapping: { 'current bone density': '/images/ChartIcon.png', 'acoustic impedance': '/images/SoundIcon.png', 'bone health score': '/images/Score_AssessmentIcon.png', 'health status guide': '/images/GuideIcon.png' },
        useExactMatch: true,
        styles: { position: 'absolute', top: '0', left: '-25%', width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'left center' },
        position: 'innerHTML'
    },
    dashboardCard: {
        selector: '.dashboard-card',
        titleSelector: 'h2',
        classMapping: { 'chart-card': '/images/Data_Analysis.png', 'recent-readings': '/images/ReadingsIcon.png', 'device-info': '/images/Settings.png' },
        styles: { width: 'clamp(5rem, 1vw, 1rem)', height: 'clamp(5rem, 1vw, 1rem)', objectFit: 'contain', marginLeft: '-1.75%', verticalAlign: 'middle', display: 'inline-block' },
        titleStyles: { display: 'flex', alignItems: 'center' },
        position: 'beforeTitle'
    },
    tech: {
        selector: '.tech-item',
        iconSelector: '.tech-icon',
        titleSelector: 'strong',
        mapping: { vibration: 'images/Settings.png', piezoelectric: 'images/Tech-Watch.png', esp32: 'images/Online.png' },
        keywords: { vibration: ['vibration', 'motor'], piezoelectric: ['piezoelectric', 'sensor'], esp32: ['esp32', 'devkit'] },
        styles: { width: 'clamp(4rem, 1vw, 1rem)', height: 'clamp(4rem, 1vw, 1rem)', objectFit: 'contain', display: 'block' },
        containerStyles: { display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: '0' },
        position: 'replace'
    },
    step: {
        selector: '.process-step',
        iconSelector: '.step-icon',
        titleSelector: 'h3',
        mapping: { vibration: 'images/SoundIcon.png', detection: 'images/Osteoporosis.png', analysis: 'images/Data_Analysis.png', assessment: 'images/Diagnosis.png' },
        keywords: { vibration: ['vibration', 'generation'], detection: ['signal', 'detection'], analysis: ['data', 'analysis'], assessment: ['health', 'assessment'] },
        styles: { width: 'clamp(6rem, 3vw, 2rem)', height: 'clamp(6rem, 3vw, 2rem)', objectFit: 'contain', display: 'block', margin: '0 auto 1rem' },
        position: 'replace'
    },
    benefit: {
        selector: '.benefit-card',
        iconSelector: '.benefit-icon',
        titleSelector: 'h3',
        mapping: { lightweight: 'images/Weight.png', 'non-invasive': 'images/Security.png', 'real-time': 'images/Time.png', 'cost-effective': 'images/Cost.png', wireless: 'images/Wireless.png', 'user-friendly': 'images/Accessibility.png' },
        keywords: { lightweight: ['lightweight', 'weight'], 'non-invasive': ['non-invasive', 'invasive'], 'real-time': ['real-time', 'instant'], 'cost-effective': ['cost', 'affordable'], wireless: ['wireless', 'connectivity'], 'user-friendly': ['user-friendly', 'friendly'] },
        styles: { 'user-friendly': { width: 'clamp(2.5rem, 3vw, 2rem)', height: 'clamp(2.5rem, 3vw, 2rem)' }, default: { width: 'clamp(4rem, 5vw, 3rem)', height: 'clamp(4rem, 5vw, 3rem)' } },
        containerStyles: { minHeight: 'clamp(4rem, 5vw, 3rem)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' },
        objectFit: { 'user-friendly': 'contain', default: 'cover' },
        position: 'replace'
    },
    science: {
        selector: '.science-card',
        titleSelector: 'h4',
        mapping: { research: 'images/Research.png', beyond: 'images/Applications.png', assessments: 'images/Score_AssessmentIcon.png' },
        keywords: { research: ['research', 'backed'], beyond: ['beyond', 'density'], assessments: ['assessment', 'multiple'] },
        styles: { width: 'clamp(3rem, 3vw, 0.5rem)', height: 'clamp(3rem, 3vw, 0.5rem)', objectFit: 'contain', display: 'inline-block', verticalAlign: 'middle', marginLeft: '-0.75rem' },
        titleStyles: { display: 'inline', alignItems: 'center' },
        position: 'beforeTitle'
    }
};

// ===== CORE APPLICATION =====
function applyStyles(el, styles) {
    Object.entries(styles).forEach(([k, v]) => el.style[k] = v);
}

function findIconKey(text, keywords) {
    text = text.toLowerCase();
    for (const [key, terms] of Object.entries(keywords)) {
        if (terms.some(term => text.includes(term))) return key;
    }
    return null;
}

function addIcons(config) {
    const containers = document.querySelectorAll(config.selector);

    containers.forEach(container => {
        let iconKey, imagePath;

        if (config.classMapping) {
            for (const [className, path] of Object.entries(config.classMapping)) {
                if (container.classList.contains(className)) {
                    imagePath = path;
                    iconKey = className;
                    break;
                }
            }
        } else if (config.mapping.default) {
            imagePath = config.mapping.default;
            iconKey = 'default';
        } else {
            const titleEl = container.querySelector(config.titleSelector);
            if (!titleEl) return;

            if (config.useExactMatch) {
                const exactKey = titleEl.textContent.trim().toLowerCase();
                imagePath = config.mapping[exactKey];
                iconKey = exactKey;
            } else {
                iconKey = findIconKey(titleEl.textContent, config.keywords);
                imagePath = config.mapping[iconKey];
            }
        }

        if (!imagePath) return;
        const img = document.createElement('img');
        img.src = imagePath;
        img.alt = `${iconKey} icon`;

        const styleSet = config.styles[iconKey] || config.styles.default || config.styles;
        applyStyles(img, styleSet);

        if (config.objectFit) {
            img.style.objectFit = config.objectFit[iconKey] || config.objectFit.default || 'contain';
        }

        if (config.transform && config.transform[iconKey]) {
            img.style.transform = config.transform[iconKey];
            img.style.transformOrigin = 'center center';
        }

        const iconDiv = config.iconSelector ? container.querySelector(config.iconSelector) : container;

        if (config.position === 'replace') {
            iconDiv.innerHTML = '';
            iconDiv.appendChild(img);
            if (config.containerStyles) applyStyles(iconDiv, config.containerStyles);
        } else if (config.position === 'innerHTML') {
            const styleStr = Object.entries(styleSet).map(([k, v]) => `${k.replace(/[A-Z]/g, m => '-' + m.toLowerCase())}: ${v};`).join(' ');
            iconDiv.innerHTML = `<img src="${imagePath}" alt="${iconKey} icon" style="${styleStr}">`;
        } else if (config.position === 'beforeTitle') {
            const titleEl = container.querySelector(config.titleSelector);
            if (!titleEl || titleEl.querySelector('.card-icon')) return;
            img.className = 'card-icon';
            const textContent = titleEl.textContent;
            titleEl.textContent = '';
            const textSpan = document.createElement('span');
            textSpan.textContent = textContent;
            textSpan.style.verticalAlign = 'baseline';
            titleEl.appendChild(img);
            titleEl.appendChild(textSpan);
            if (config.titleStyles) applyStyles(titleEl, config.titleStyles);
        }
    });
}

// ===== INITIALIZE ALL =====
document.addEventListener('DOMContentLoaded', () => {
    Object.values(ICON_CONFIGS).forEach(config => addIcons(config));
});