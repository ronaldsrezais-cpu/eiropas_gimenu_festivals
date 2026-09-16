document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('#aktivitates .activity-card');
  cards.forEach(function (card) {
    const heading = card.querySelector('h3');
    const description = card.querySelector('p');
    if (heading && description && heading.textContent.trim() === 'Nūjošana') {
      description.textContent = 'Apgūstiet pareizu nūjošanas tehniku un uzziniet, kā izvēlēties savam augumam piemērotu nūju garumu.';
    }
  });
});
