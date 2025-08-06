/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in the example
  const headerRow = ['Cards (cards11)'];
  const rows = [headerRow];

  // Each card is a .directions-detail-container
  const cardContainers = element.querySelectorAll('.directions-detail-container');
  cardContainers.forEach((cardEl) => {
    // -------- Media/Video cell --------
    let mediaCell = null;
    const video = cardEl.querySelector('video');
    if (video) {
      const src = video.querySelector('source')?.src;
      if (src) {
        const a = document.createElement('a');
        a.href = src;
        a.textContent = 'Video';
        a.target = '_blank';
        mediaCell = a;
      }
    }
    // -------- Text cell --------
    const textDiv = document.createElement('div');
    const textContainer = cardEl.querySelector('.directions-detail-text-container');
    if (textContainer) {
      // Heading (strong)
      const heading = textContainer.querySelector('.directions-heading-font');
      if (heading) {
        const strong = document.createElement('strong');
        strong.textContent = heading.textContent.trim();
        textDiv.appendChild(strong);
        textDiv.appendChild(document.createElement('br'));
      }
      // Duration text (skip icon)
      const duration = textContainer.querySelector('.duration-container');
      if (duration) {
        // Only text nodes (skipping img)
        Array.from(duration.childNodes).forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
            textDiv.appendChild(document.createTextNode(node.textContent.trim()));
            textDiv.appendChild(document.createElement('br'));
          }
        });
      }
      // Description: all <p> under .directions-detail-font, or fallback all <p>
      let descFound = false;
      const detailFont = textContainer.querySelector('.directions-detail-font');
      if (detailFont) {
        detailFont.querySelectorAll('p').forEach((p) => {
          descFound = true;
          // Reference existing element
          textDiv.appendChild(p);
        });
      }
      if (!descFound) {
        textContainer.querySelectorAll('p').forEach((p) => {
          textDiv.appendChild(p);
        });
      }
    }
    rows.push([mediaCell, textDiv]);
  });
  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
