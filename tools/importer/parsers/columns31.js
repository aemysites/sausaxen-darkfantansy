/* global WebImporter */
export default function parse(element, { document }) {
  // Find all direct box-container children, which represent the columns
  let boxContainers = element.querySelectorAll(':scope > .box-container');

  // Fall back if unique wrapper class is used (e.g. orange-container-outside-div)
  if (boxContainers.length === 0) {
    boxContainers = element.querySelectorAll(':scope > div.box-container');
  }

  // If still no box-containers, handle edge case (empty or invalid block)
  if (boxContainers.length === 0) {
    // Replace with empty columns block
    const table = WebImporter.DOMUtils.createTable([
      ['Columns (columns31)'],
      ['']
    ], document);
    element.replaceWith(table);
    return;
  }

  // Each column: use the direct blank-box child (label)
  const columns = Array.from(boxContainers).map(boxContainer => {
    // Use the existing blank-box element directly to preserve original styling/semantics
    const label = boxContainer.querySelector('.blank-box');
    // Fallback for empty label
    if (label) {
      return label;
    } else {
      const span = document.createElement('span');
      span.textContent = '';
      return span;
    }
  });

  // Build the block table as in the example: header (single cell), then one row with all columns
  const rows = [
    ['Columns (columns31)'], // header row must be a single cell only
    columns // content row: one cell per column
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
