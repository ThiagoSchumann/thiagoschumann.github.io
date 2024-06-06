document.addEventListener('DOMContentLoaded', () => {
  // Definir as seções a serem carregadas
  const sections = [
    'about',
    'experience',
    'education',
    'skills',
    'certifications',
    'contact',
  ];

  // Carregar todas as seções na ordem desejada
  loadSections(sections, 0);

  // Configurar navegação suave para âncoras
  document.querySelectorAll("a[href^='#']").forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const target = event.target.getAttribute('href').substring(1);
      document.getElementById(target).scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Configurar alternância de idioma
  document.querySelectorAll('.language-toggle').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      setLanguage(event.currentTarget.getAttribute('data-lang'));
    });
  });

  // Configurar alternância de menu para dispositivos móveis
  const menuToggle = document.getElementById('menu-toggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      const menu = document.getElementById('mobile-menu');
      if (menu) {
        menu.classList.toggle('hidden');
      } else {
        console.error(
          "Menu mobile não encontrado. Verifique se o ID 'mobile-menu' está correto e o elemento está presente no HTML.",
        );
      }
    });
  } else {
    console.error(
      "Botão de alternância do menu não encontrado. Verifique se o ID 'menu-toggle' está correto e o elemento está presente no HTML.",
    );
  }
});

// Função para carregar seções de forma dinâmica
function loadSections(sections, index) {
  if (index < sections.length) {
    fetch(`sections/${sections[index]}.html`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro ao carregar a seção: ${sections[index]}`);
        }
        return response.text();
      })
      .then((html) => {
        const sectionName = sections[index];
        document.getElementById(sectionName).innerHTML = html;
        setLanguage(document.documentElement.lang || 'pt');

        // Adicionar evento de clique ao botão de download após carregar o about.html
        if (sectionName === 'about') {
          const downloadButton = document.getElementById('download-cv');
          if (downloadButton) {
            downloadButton.addEventListener('click', function (e) {
              e.preventDefault(); // Previne o comportamento padrão do botão
              downloadCV(
                'static/resources/Thiago-Schumann-CV.pdf',
                'Thiago-Schumann-CV.pdf',
              );
            });
          } else {
            console.error(
              "Botão de download não encontrado após carregar a seção. Verifique se o ID 'download-cv' está correto no HTML carregado.",
            );
          }
        }

        if (sectionName === 'education') {
          const seeMoreButtons = document.querySelectorAll(
            "[onclick='toggleDescription(this)']",
          );
          seeMoreButtons.forEach((button) => {
            button.addEventListener('click', function () {
              toggleDescription(button);
            });
          });
        }

        loadSections(sections, index + 1); // Carregar a próxima seção
      })
      .catch((error) => console.error('Erro ao carregar a seção:', error));
  }
}

// Função para definir o idioma da página
function setLanguage(lang) {
  document.querySelectorAll('[data-en], [data-pt]').forEach((element) => {
    element.textContent =
      lang === 'en'
        ? element.getAttribute('data-en')
        : element.getAttribute('data-pt');
  });
}

// Função para baixar o CV com fetch e forçar o download
function downloadCV(filePath, fileName) {
  fetch(filePath)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Falha ao baixar o arquivo.');
      }
      return response.blob();
    })
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    })
    .catch(() => alert('Falha ao baixar o arquivo.'));
}

// Função para alternar a visibilidade da descrição
function toggleDescription(button) {
  const description = button.previousElementSibling;
  if (
    description.style.display === 'none' ||
    description.style.display === ''
  ) {
    description.style.display = 'block';
    button.textContent = button.getAttribute('data-pt-less') || 'Veja menos';
  } else {
    description.style.display = 'none';
    button.textContent = button.getAttribute('data-pt') || 'Veja mais';
  }
}

// Função para alternar a visibilidade de uma lista
function toggleList(button) {
  const ul = button.previousElementSibling;
  ul.classList.toggle('expanded');
  const lang = document.documentElement.lang || 'pt';
  button.textContent = ul.classList.contains('expanded')
    ? lang === 'en'
      ? button.getAttribute('data-en-less')
      : button.getAttribute('data-pt-less')
    : lang === 'en'
    ? button.getAttribute('data-en')
    : button.getAttribute('data-pt');
}

// Função para alternar a visibilidade de uma seção
function toggleSection(element, sectionClass) {
  const section = document.querySelector(`.${sectionClass}`);
  const arrowIcon = element.querySelector('#arrow-icon');
  if (section.classList.contains('hidden')) {
    section.classList.remove('hidden');
    arrowIcon.innerHTML =
      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 15l-7-7-7 7" />';
  } else {
    section.classList.add('hidden');
    arrowIcon.innerHTML =
      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />';
  }
}
