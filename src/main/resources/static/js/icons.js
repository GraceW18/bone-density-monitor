document.addEventListener('DOMContentLoaded', function() {
    addLogoIcon();
    addFeatureIcons();
    addAppIcons();
    addStatIcons();
    addMetricIcons();
    addDashboardCardIcons();
    addTechIcons();
    addStepIcons();
    addBenefitIcons();
    addScienceIcons();
});

function addLogoIcon() {
    document.querySelectorAll('.logo-icon').forEach(icon => {
        const img = document.createElement('img');
        img.src = '/images/Logo.png';
        img.alt = 'BoneDensity Logo';

        img.style.width = 'clamp(2.25rem, 6vw, 3.75rem)';
        img.style.height = 'clamp(2.25rem, 6vw, 3.75rem)';
        img.style.verticalAlign = 'middle';
        img.style.display = 'inline-block';

        icon.innerHTML = '';
        icon.appendChild(img);
        icon.style.textAlign = 'center';
        icon.style.lineHeight = '1';
    });
}

function addFeatureIcons() {
    const iconMapping = {
        'space': 'images/Rocket.png',
        'acoustic': 'images/SoundIcon.png',
        'accessibility': 'images/Accessibility.png',
        'analytics': 'images/GraphIcon.png'
    };

    document.querySelectorAll('.feature-icon').forEach(icon => {
        const iconKey = getIconKeyFromContext(icon);
        const imagePath = iconMapping[iconKey];

        if (imagePath) {
            const objectFit = (iconKey === 'accessibility') ? 'contain' : 'cover';
            icon.innerHTML = `<img src="${imagePath}" alt="${iconKey.replace('-', ' ')}" style="
            width: clamp(5rem, 16vw, 32rem);
            height: clamp(4rem, 10vw, 5rem);
            object-fit: ${objectFit};
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
        'space': 'images/Space.png',
        'osteoporosis': 'images/Osteoporosis.png',
        'elderly': 'images/Accessibility2.png'
    };

    document.querySelectorAll('.application-card').forEach(card => {
        const iconDiv = card.querySelector('.app-icon');
        const h3 = card.querySelector('h3');

        if (!iconDiv || !h3) return;
        const titleText = h3.textContent.toLowerCase();
        let iconKey = '';
        if (titleText.includes('space')) iconKey = 'space';
        else if (titleText.includes('osteoporosis') || titleText.includes('diagnosis')) iconKey = 'osteoporosis';
        else if (titleText.includes('elderly')) iconKey = 'elderly';
        const imagePath = appIconMapping[iconKey];
        if (imagePath) {
            const objectFit = (iconKey === 'elderly') ? 'contain' : 'cover';
            const img = document.createElement('img');
            img.src = imagePath;
            img.alt = `${iconKey} icon`;
            img.style.width = 'clamp(12rem, 4vw, 5rem)';
            img.style.height = 'clamp(12rem, 4vw, 5rem)';
            img.style.objectFit = objectFit;
            img.style.display = 'block';
            img.style.margin = '0 auto 1rem';
            if (iconKey === 'elderly') {
                img.style.transform = 'scale(0.5)';  // tweak this factor by eye
                img.style.transformOrigin = 'center center';
            }
            iconDiv.innerHTML = '';
            iconDiv.appendChild(img);
        }
    });
}

function addStatIcons() {
    const statIconMapping = {
        'weight': 'images/Weight.png',
        'time': 'images/Time.png',
        'accuracy': 'images/Score_AssessmentIcon.png',
        'budget': 'images/Cost.png'
    };

    document.querySelectorAll('.stat-card').forEach(card => {
        const iconDiv = card.querySelector('.stat-icon');
        const descText = card.querySelector('.stat-desc');

        if (!iconDiv || !descText) return;

        const desc = descText.textContent.toLowerCase();
        let iconKey = '';

        if (desc.includes('weight')) iconKey = 'weight';
        else if (desc.includes('time')) iconKey = 'time';
        else if (desc.includes('accuracy') || desc.includes('detection')) iconKey = 'accuracy';
        else if (desc.includes('budget') || desc.includes('cost')) iconKey = 'budget';

        const imagePath = statIconMapping[iconKey];

        if (imagePath) {
            const img = document.createElement('img');
            img.src = imagePath;
            img.alt = `${iconKey} icon`;
            img.style.width = 'clamp(10rem, 15vw, 16rem)';
            img.style.height = 'clamp(8rem, 10vw, 8rem)';
            img.style.objectFit = 'cover';
            img.style.objectPosition = 'center';
            img.style.display = 'block';
            img.style.margin = '0 auto';

            iconDiv.innerHTML = '';
            iconDiv.appendChild(img);
        }
    });
}

function addMetricIcons() {
    document.querySelectorAll('.metric-card').forEach(card => {
        const metricIconMapping = {
            'current bone density': '/images/ChartIcon.png',
            'acoustic impedance': '/images/SoundIcon.png',
            'bone health score': '/images/Score_AssessmentIcon.png',
            'health status guide': '/images/GuideIcon.png'
        };

        const labelEl = card.querySelector('.metric-label');
        const iconDiv = card.querySelector('.metric-icon');
        if (!labelEl || !iconDiv) return;

        const key = labelEl.textContent.trim().toLowerCase();
        const src = metricIconMapping[key];
        if (!src) return;

        iconDiv.innerHTML = `<img src="${src}" alt="${key} icon" style="
            position: absolute;
            top: 0;
            left: -25%;
            width: 100%;
            height: 100%;
            object-fit: contain;
            object-position: left center;
        ">`;
    });
}

function addDashboardCardIcons() {
    const dashboardIconMapping = {
        'chart-card': '/images/Data_Analysis.png',
        'recent-readings': '/images/ReadingsIcon.png',
        'device-info': '/images/Settings.png'
    };
    Object.entries(dashboardIconMapping).forEach(([cardClass, src]) => {
        document.querySelectorAll(`.${cardClass}`).forEach(card => {
            const h2 = card.querySelector('.dashboard-card h2');
            if (!h2) return;

            // Check if icon already exists to avoid duplicates
            if (h2.querySelector('.card-icon')) return;

            const img = document.createElement('img');
            img.src = src;
            img.alt = `${cardClass} icon`;
            img.className = 'card-icon';
            img.style.width = 'clamp(5rem, 1vw, 1rem)';
            img.style.height = 'clamp(5rem, 1vw, 1rem)';
            img.style.objectFit = 'contain';
            img.style.marginLeft = '-1.75%';
            img.style.verticalAlign = 'middle';
            img.style.display = 'inline-block';

            // Wrap existing text in a span and prepend icon
            const textContent = h2.textContent;
            h2.textContent = '';

            const textSpan = document.createElement('span');
            textSpan.textContent = textContent;
            textSpan.style.verticalAlign = 'baseline';

            h2.appendChild(img);
            h2.appendChild(textSpan);

            h2.style.display = 'flex';
            h2.style.alignItems = 'center';
        });
    });
}

function addTechIcons() {
    const techMapping = {
        'vibration': 'images/Settings.png',
        'piezoelectric': 'images/Tech-Watch.png',
        'esp32': 'images/Online.png',
    };

    // Select all tech-item containers
    document.querySelectorAll('.tech-item').forEach(item => {
        const iconSpan = item.querySelector('.tech-icon');
        const strong = item.querySelector('strong');

        if (!iconSpan || !strong) return;

        // Determine which icon based on the <strong> text
        const titleText = strong.textContent.toLowerCase();
        let iconKey = '';

        if (titleText.includes('vibration') || titleText.includes('motor')) {
            iconKey = 'vibration';
        } else if (titleText.includes('piezoelectric') || titleText.includes('sensor')) {
            iconKey = 'piezoelectric';
        } else if (titleText.includes('esp32') || titleText.includes('devkit')) {
            iconKey = 'esp32';
        }

        const imagePath = techMapping[iconKey];

        if (imagePath) {
            // Create img element properly
            const img = document.createElement('img');
            img.src = imagePath;
            img.alt = `${iconKey} icon`;
            img.style.width = 'clamp(4rem, 1vw, 1rem)';
            img.style.height = 'clamp(4rem, 1vw, 1rem)';
            img.style.objectFit = 'contain';
            img.style.display = 'block';

            // Clear and add the image
            iconSpan.innerHTML = '';
            iconSpan.appendChild(img);

            // Style the icon span for proper centering
            iconSpan.style.display = 'flex';
            iconSpan.style.alignItems = 'center';
            iconSpan.style.justifyContent = 'center';
            iconSpan.style.flexShrink = '0';
        }
    });
}

function addStepIcons() {
    const stepIconMapping = {
        'vibration': 'images/SoundIcon.png',
        'detection': 'images/Osteoporosis.png',
        'analysis': 'images/Data_Analysis.png',
        'assessment': 'images/Diagnosis.png'
    };

    // Select all process-step containers
    document.querySelectorAll('.process-step').forEach(step => {
        const iconDiv = step.querySelector('.step-icon');
        const h3 = step.querySelector('h3');

        if (!iconDiv || !h3) return;

        // Determine which icon based on the h3 text
        const titleText = h3.textContent.toLowerCase();
        let iconKey = '';

        if (titleText.includes('vibration') || titleText.includes('generation')) {
            iconKey = 'vibration';
        } else if (titleText.includes('signal') || titleText.includes('detection')) {
            iconKey = 'detection';
        } else if (titleText.includes('data') || titleText.includes('analysis')) {
            iconKey = 'analysis';
        } else if (titleText.includes('health') || titleText.includes('assessment')) {
            iconKey = 'assessment';
        }

        const imagePath = stepIconMapping[iconKey];

        if (imagePath) {
            // Create img element
            const img = document.createElement('img');
            img.src = imagePath;
            img.alt = `${iconKey} icon`;
            img.style.width = 'clamp(6rem, 3vw, 2rem)';
            img.style.height = 'clamp(6rem, 3vw, 2rem)';
            img.style.objectFit = 'contain';
            img.style.display = 'block';
            img.style.margin = '0 auto 1rem';

            // Clear the icon div and add the image
            iconDiv.innerHTML = '';
            iconDiv.appendChild(img);
        }
    });
}

function addBenefitIcons() {
    const benefitIconMapping = {
        'lightweight': 'images/Weight.png',
        'non-invasive': 'images/Security.png',
        'real-time': 'images/Time.png',
        'cost-effective': 'images/Cost.png',
        'wireless': 'images/Wireless.png',
        'user-friendly': 'images/Accessibility.png'
    };

    document.querySelectorAll('.benefit-card').forEach(card => {
        const iconDiv = card.querySelector('.benefit-icon');
        const h3 = card.querySelector('h3');

        if (!iconDiv || !h3) return;

        const titleText = h3.textContent.toLowerCase();
        let iconKey = '';

        if (titleText.includes('lightweight') || titleText.includes('weight')) {
            iconKey = 'lightweight';
        } else if (titleText.includes('non-invasive') || titleText.includes('invasive')) {
            iconKey = 'non-invasive';
        } else if (titleText.includes('real-time') || titleText.includes('instant')) {
            iconKey = 'real-time';
        } else if (titleText.includes('cost') || titleText.includes('affordable')) {
            iconKey = 'cost-effective';
        } else if (titleText.includes('wireless') || titleText.includes('connectivity')) {
            iconKey = 'wireless';
        } else if (titleText.includes('user-friendly') || titleText.includes('friendly')) {
            iconKey = 'user-friendly';
        }

        const imagePath = benefitIconMapping[iconKey];

        if (imagePath) {
            const img = document.createElement('img');
            const objectFit = (iconKey === 'user-friendly') ? 'contain' : 'cover';
            img.src = imagePath;
            img.alt = `${iconKey} icon`;
            if (iconKey === 'user-friendly') {
                img.style.width = 'clamp(2.5rem, 3vw, 2rem)';
                img.style.height = 'clamp(2.5rem, 3vw, 2rem)';
            } else {
                img.style.width = 'clamp(4rem, 5vw, 3rem)';
                img.style.height = 'clamp(4rem, 5vw, 3rem)';
            }
            img.style.objectFit = objectFit;
            img.style.display = 'block';
            img.style.margin = '0 auto';

            iconDiv.innerHTML = '';
            iconDiv.appendChild(img);

            iconDiv.style.minHeight = 'clamp(4rem, 5vw, 3rem)';
            iconDiv.style.display = 'flex';
            iconDiv.style.alignItems = 'center';
            iconDiv.style.justifyContent = 'center';
            iconDiv.style.marginBottom = '0.75rem';
        }
    });
}

function addScienceIcons() {
    const scienceIconMapping = {
        'research': 'images/Research.png',
        'beyond': 'images/Applications.png',
        'assessments': 'images/Score_AssessmentIcon.png'
    };

    document.querySelectorAll('.science-card').forEach(card => {
        const h4 = card.querySelector('h4');

        if (!h4) return;
        const titleText = h4.textContent.toLowerCase();
        let iconKey = '';

        if (titleText.includes('research') || titleText.includes('backed')) {
            iconKey = 'research';
        } else if (titleText.includes('beyond') || titleText.includes('density')) {
            iconKey = 'beyond';
        } else if (titleText.includes('assessment') || titleText.includes('multiple')) {
            iconKey = 'assessments';
        }

        const imagePath = scienceIconMapping[iconKey];

        if (imagePath) {
            const img = document.createElement('img');
            img.src = imagePath;
            img.alt = `${iconKey} icon`;
            img.style.width = 'clamp(3rem, 3vw, 0.5rem)';
            img.style.height = 'clamp(3rem, 3vw, 0.5rem)';
            img.style.objectFit = 'contain';
            img.style.display = 'inline-block';
            img.style.verticalAlign = 'middle';
            img.style.marginLeft = '-0.75rem';
            h4.insertBefore(img, h4.firstChild);
            h4.style.display = 'inline';
            h4.style.alignItems = 'center';
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
