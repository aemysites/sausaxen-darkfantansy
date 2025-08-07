/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified
  const headerRow = ['Cards (cards21)'];
  const cells = [headerRow];

  // Get all timestamp card containers
  const cardContainers = element.querySelectorAll('.timeStampContainer');

  cardContainers.forEach(card => {
    // Image: always in a child div with padding, contains .timestampThumbnail
    let img = null;
    const imgDiv = card.querySelector('div[style*="padding"]');
    if (imgDiv) {
      img = imgDiv.querySelector('img.timestampThumbnail');
    }

    // Time: in .timeBox span
    let timeDiv = null;
    const timeSpan = card.querySelector('.timeBox span');
    if (timeSpan && timeSpan.textContent.trim()) {
      timeDiv = document.createElement('div');
      timeDiv.textContent = timeSpan.textContent.trim();
      // No need for extra inline styles, let downstream handle formatting
    }

    // Title: .timestampTitle (if present)
    let title = card.querySelector('.timestampTitle');
    // Subtitle: .timestampSubtitle (if present)
    let subtitle = card.querySelector('.timestampSubtitle');

    // Assemble the text content cell
    const textCellContent = [];
    if (timeDiv) textCellContent.push(timeDiv);
    if (title) textCellContent.push(title);
    if (subtitle) textCellContent.push(subtitle);

    // Only add the card if it has at least image and some text (per spec)
    if (img && textCellContent.length > 0) {
      cells.push([img, textCellContent]);
    }
  });

  // Create and replace with the table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
