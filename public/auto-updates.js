document.addEventListener('DOMContentLoaded', function () {
  const activityList = document.querySelector('#aktivitates .activity-list');
  if (activityList && !Array.from(activityList.querySelectorAll('.activity-card h3')).some(function (el) { return el.textContent.trim() === 'Nūjošana'; })) {
    const article = document.createElement('article');
    article.className = 'activity-card';
    article.innerHTML = '<span>Tautas sports</span><h3>Nūjošana</h3><p>Apgūstiet pareizu nūjošanas tehniku un uzziniet, kā izvēlēties savam augumam piemērotu nūju garumu.</p>';
    activityList.appendChild(article);
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
      mapEmbed.innerHTML = '<img src="/assets/map/festival-map-19sep.jpg" alt="Eiropas Ģimeņu festivāla teritorijas plāns Uzvaras parkā" loading="lazy" style="display:block;width:100%;height:auto;object-fit:contain;" />';
    }
  }
});
