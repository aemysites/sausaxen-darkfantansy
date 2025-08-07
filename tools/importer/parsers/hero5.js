/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: Block name, exactly as in the example
  const headerRow = ['Hero (hero5)'];

  // Second row: Background Image (none present in this HTML), so use empty string
  const bgRow = [''];

  // Third row: Main content (Title, possibly subheading or decorated words)
  // We want to reference existing elements where possible, but the structure is complex
  // We'll extract the h2 (which is the only real visible content here)
  const h2 = element.querySelector('h2');

  // If no h2 is found for some edge case, create an empty cell
  let contentCell;
  if (h2) {
    // Reference the existing h2 for resilience and semantic correctness
    contentCell = h2;
  } else {
    // Defensive fallback: create an empty div
    contentCell = document.createElement('div');
  }

  // Compose the table rows
  const cells = [
    headerRow,
    bgRow,
    [contentCell],
  ];

  // Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
