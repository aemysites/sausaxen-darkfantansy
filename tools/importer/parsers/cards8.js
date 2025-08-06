/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must exactly match: 'Cards (cards8)'
  const rows = [['Cards (cards8)']];

  // Locate all cards within the slick-track
  const slickTrack = element.querySelector('.slick-track');
  if (!slickTrack) {
    // If no cards found, replace with only the header table
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
    return;
  }
  const cards = slickTrack.querySelectorAll(':scope > div.slick-slide');

  cards.forEach(slide => {
    const cardLink = slide.querySelector('a');
    if (!cardLink) return;
    // Main image: .blog-card-img-container img (not the options icon)
    let img = cardLink.querySelector('.blog-card-img-container img');
    if (!img) {
      // fallback: first img after icon
      const imgs = cardLink.querySelectorAll('img');
      img = imgs[1] || imgs[0] || null;
    }

    // Text cell
    const frag = document.createDocumentFragment();

    // Collect Type (Create / Learn / Explore)
    const typeEl = cardLink.querySelector('.smallImageDiv .name');
    if (typeEl && typeEl.textContent.trim()) {
      const strong = document.createElement('strong');
      strong.textContent = typeEl.textContent.trim();
      frag.appendChild(strong);
      frag.appendChild(document.createElement('br'));
    }
    // Collect Date
    const dateEl = cardLink.querySelector('.bottomText .text');
    if (dateEl && dateEl.textContent.trim()) {
      const dateNode = document.createElement('span');
      dateNode.textContent = dateEl.textContent.trim();
      frag.appendChild(dateNode);
      frag.appendChild(document.createElement('br'));
    }
    // Title: .bigText
    const titleEl = cardLink.querySelector('.bigText');
    if (titleEl && titleEl.textContent.trim()) {
      const h3 = document.createElement('h3');
      h3.textContent = titleEl.textContent.trim();
      frag.appendChild(h3);
    }
    // Optional: Add link as CTA if desired - only if href exists and not '#' (not shown in example, so don't add)
    // Compose row
    rows.push([
      img,
      frag,
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
