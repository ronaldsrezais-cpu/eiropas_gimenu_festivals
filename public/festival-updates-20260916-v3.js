document.addEventListener('DOMContentLoaded', function () {
  const activityList = document.querySelector('#aktivitates .activity-list');
  if (activityList) {
    const existing = Array.from(activityList.querySelectorAll('.activity-card')).find(function (card) {
      const heading = card.querySelector('h3');
      return heading && heading.textContent.trim() === 'Nūjošana';
    });

    if (existing) {
      const description = existing.querySelector('p');
      if (description) {
        description.textContent = 'Apgūstiet pareizu nūjošanas tehniku un uzziniet, kā izvēlēties savam augumam piemērotu nūju garumu.';
      }
    } else {
      const article = document.createElement('article');
      article.className = 'activity-card';
      article.innerHTML = '<span>Tautas sports</span><h3>Nūjošana</h3><p>Apgūstiet pareizu nūjošanas tehniku un uzziniet, kā izvēlēties savam augumam piemērotu nūju garumu.</p>';
      activityList.appendChild(article);
    }
  }

  const mapSection = document.getElementById('karte');
  if (mapSection) {
    const mapCopy = mapSection.querySelector('.map-copy');
    if (mapCopy) {
      const note = mapCopy.querySelector('p');
      if (note) note.remove();
    }

    const mapEmbed = mapSection.querySelector('.map-embed');
    if (mapEmbed) {
      mapEmbed.setAttribute('aria-label', 'Eiropas Ģimeņu festivāla teritorijas plāns');
      mapEmbed.style.minHeight = '0';
      mapEmbed.style.overflow = 'hidden';
      mapEmbed.innerHTML = '';

      const img = document.createElement('img');
      img.src = '/assets/map/festival-map.png?v=20260916-4';
      img.alt = 'Eiropas Ģimeņu festivāla teritorijas plāns Uzvaras parkā';
      img.loading = 'eager';
      img.decoding = 'async';
      img.style.display = 'block';
      img.style.width = '100%';
      img.style.height = 'auto';
      img.style.objectFit = 'contain';
      mapEmbed.appendChild(img);
    }
  }
});
