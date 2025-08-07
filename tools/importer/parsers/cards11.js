/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the cards block
  const headerRow = ['Cards (cards11)'];

  // Find all direct card containers
  const cardContainers = element.querySelectorAll('.directions-detail-container');

  const rows = [headerRow];

  cardContainers.forEach((card) => {
    // --- Left cell: video element (reference directly, no clone)
    const video = card.querySelector('video');
    const leftCell = video || '';

    // --- Right cell: all text content as in the visual structure ---
    const textEls = [];
    const textContainer = card.querySelector('.directions-detail-text-container');
    if (textContainer) {
      // Heading (use as-is)
      const heading = textContainer.querySelector('.directions-heading-font');
      if (heading) textEls.push(heading);
      // Duration (use as-is)
      const duration = textContainer.querySelector('.duration-container');
      if (duration) textEls.push(duration);
      // Description (use as-is, all <p> in .directions-detail-font)
      const descrWrap = textContainer.querySelector('.directions-detail-font');
      if (descrWrap) {
        // May contain multiple <p>
        Array.from(descrWrap.querySelectorAll('p')).forEach((p) => {
          if (p.textContent.trim()) textEls.push(p);
        });
      }
    }
    // Build cell: if only one element, use just that, else use array
    let rightCell;
    if (textEls.length === 1) {
      rightCell = textEls[0];
    } else if (textEls.length > 1) {
      rightCell = textEls;
    } else {
      rightCell = '';
    }
    rows.push([leftCell, rightCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
