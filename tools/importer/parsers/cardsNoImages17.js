/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must match exactly
  const headerRow = ['Cards (cardsNoImages17)'];
  const cells = [headerRow];

  // Get all immediate .box-container children
  const boxContainers = element.querySelectorAll(':scope > .box-container');
  boxContainers.forEach((box) => {
    // Find .blank-box inside .box-container
    const blankBox = box.querySelector('.blank-box');
    let content = '';
    if (blankBox) {
      content = blankBox.textContent || '';
      content = content.trim().replace(/\s+/g, ' ');
    }
    // Only add if there's non-empty content
    if (content) {
      cells.push([content]);
    }
  });

  // Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
