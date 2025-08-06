/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find all direct card slides
  const slickTrack = element.querySelector('.slick-track');
  if (!slickTrack) return;
  const slides = Array.from(slickTrack.children).filter(el => el.classList.contains('slick-slide'));
  if (slides.length === 0) return;

  // 2. Build rows: header first, then one row per card
  const rows = [ ['Cards (cards2)'] ];

  slides.forEach(slide => {
    // Each slide contains: <div><a href=...>
    const cardRoot = slide.querySelector('a');
    if (!cardRoot) return;

    // --- IMAGE CELL ---
    // Use the main card image (not the icon)
    const mainImg = cardRoot.querySelector('.blog-card-img-container img');
    // If not found, fallback to any img
    const imgCell = mainImg || cardRoot.querySelector('img');

    // --- TEXT CELL ---
    // We'll assemble a div with text content from the card
    const textCell = document.createElement('div');

    // Category (small label), e.g. Explore/Learn/Create/Innovate; keep as a bold div
    const catEl = cardRoot.querySelector('.smallImageDiv .name');
    if (catEl && catEl.textContent.trim()) {
      const catDiv = document.createElement('div');
      catDiv.style.fontWeight = 'bold';
      catDiv.textContent = catEl.textContent.trim();
      textCell.appendChild(catDiv);
    }

    // Date (usually in .recipeTextDiv .bottomText .text, but must exclude likes)
    const dateEl = cardRoot.querySelector('.recipeTextDiv .bottomText .text');
    if (dateEl && dateEl.textContent.trim()) {
      const dateDiv = document.createElement('div');
      dateDiv.textContent = dateEl.textContent.trim();
      dateDiv.style.fontSize = '0.85em';
      dateDiv.style.marginBottom = '3px';
      textCell.appendChild(dateDiv);
    }

    // Title (main headline, .bigText)
    const titleEl = cardRoot.querySelector('.bigTextDiv .bigText');
    if (titleEl && titleEl.textContent.trim()) {
      const title = document.createElement('strong');
      title.textContent = titleEl.textContent.trim();
      textCell.appendChild(title);
    }

    // Likes (number next to heart icon)
    const likesSpan = cardRoot.querySelector('.bottomText span');
    if (likesSpan && likesSpan.textContent.trim()) {
      const likesDiv = document.createElement('div');
      likesDiv.textContent = '♥ ' + likesSpan.textContent.trim();
      likesDiv.style.fontSize = '0.85em';
      textCell.appendChild(likesDiv);
    }

    // Compose row: always 2 columns: [image, text]
    rows.push([imgCell, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
