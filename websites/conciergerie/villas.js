fetch('villas.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('vignette-container');

    data.forEach(item => {
      const card = document.createElement('div');
      card.className = 'vignette';

      card.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      `;

      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error('Error loading JSON:', error);
  });
