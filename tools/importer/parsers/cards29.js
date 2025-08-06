/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children by selector
  function getStepCards(root) {
    // The structure is: .set-width > .directions-detail-container (repeat)
    const main = root.querySelector(':scope > .set-width');
    if (!main) return [];
    return Array.from(main.querySelectorAll(':scope > .directions-detail-container'));
  }

  const cards = getStepCards(element);
  const rows = [['Cards (cards29)']];

  cards.forEach(card => {
    // Left cell: video (if present)
    const video = card.querySelector('video');

    // Right cell: heading (strong), duration (span), description (paragraphs)
    const textContainer = card.querySelector('.directions-detail-text-container');
    const rightCellContent = [];

    if (textContainer) {
      // Heading
      const heading = textContainer.querySelector('.directions-heading-font');
      if (heading && heading.textContent.trim()) {
        const strong = document.createElement('strong');
        strong.textContent = heading.textContent.trim();
        rightCellContent.push(strong);
        rightCellContent.push(document.createElement('br'));
      }
      // Duration
      const duration = textContainer.querySelector('.duration-container');
      if (duration && duration.textContent.trim()) {
        // Use only the text content (not the icon)
        const durationText = duration.textContent.trim();
        if (durationText) {
          const span = document.createElement('span');
          span.textContent = durationText;
          span.style.display = 'block';
          rightCellContent.push(span);
          rightCellContent.push(document.createElement('br'));
        }
      }
      // Description (all <p> inside .directions-detail-font)
      const descBlock = textContainer.querySelector('.directions-detail-font');
      if (descBlock) {
        const ps = Array.from(descBlock.querySelectorAll('p')).filter(p => p.textContent.trim());
        ps.forEach((p, idx) => {
          rightCellContent.push(p);
          if (idx !== ps.length - 1) rightCellContent.push(document.createElement('br'));
        });
      }
    }
    // Push row: [leftCell, rightCellContent]
    rows.push([video, rightCellContent]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
