document.getElementById('download-cv').addEventListener('click', function(e) {
    e.preventDefault();
    fetch('resources/Thiago-Schumann-CV.pdf')
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'Thiago-Schumann-CV.pdf';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch(() => alert('Falha ao baixar o arquivo.'));
});

document.querySelectorAll('.language-toggle').forEach(button => {
    button.addEventListener('click', event => {
        event.preventDefault();
        const lang = event.currentTarget.getAttribute('data-lang');
        setLanguage(lang);
    });
});

function setLanguage(lang) {
    document.querySelectorAll('[data-en]').forEach(element => {
        if (lang === 'en') {
            element.textContent = element.getAttribute('data-en');
        } else if (lang === 'pt') {
            element.textContent = element.getAttribute('data-pt');
        }
    });
}


function toggleList(button) {
    var ul = button.previousElementSibling;
    ul.classList.toggle('expanded');
    var lang = document.documentElement.lang || 'pt'; // Assume 'pt' if language is not set
    if (ul.classList.contains('expanded')) {
        button.textContent = lang === 'en' ? button.getAttribute('data-en-less') : button.getAttribute('data-pt-less');
    } else {
        button.textContent = lang === 'en' ? button.getAttribute('data-en') : button.getAttribute('data-pt');
    }
}

function toggleSection(element, sectionClass) {
    var section = document.querySelector('.' + sectionClass);
    var arrowIcon = element.querySelector('#arrow-icon');
    if (section.classList.contains('hidden')) {
        section.classList.remove('hidden');
        arrowIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 15l-7-7-7 7" />';
    } else {
        section.classList.add('hidden');
        arrowIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />';
    }
}