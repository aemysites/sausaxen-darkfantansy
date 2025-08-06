/* global WebImporter */
export default function parse(element, { document }) {
  // Extract left (text) and right (video) content columns
  const left = element.querySelector('.directions-detail-text-container');
  const right = element.querySelector('video');

  // Header row: must be a single cell (one-column row) as in the markdown example
  const headerRow = ['Columns (columns9)'];
  // Content row: two columns for the two sides
  const contentRow = [left, right];
  const cells = [headerRow, contentRow];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
