/* global WebImporter */
export default function parse(element, { document }) {
  // Build header row: block name exactly as required
  const headerRow = ['Columns (columns8)'];

  // Extract all immediate children of the root element
  const columns = Array.from(element.children);

  // Defensive: make sure at least one column exists
  if (columns.length === 0) {
    // If there are no children, just put the entire element in a single cell
    columns.push(element);
  }

  // Build final cells array: header row (single column), then one row containing all columns
  const cells = [
    headerRow,              // first row: header, exactly one cell
    columns                 // second row: all columns, each cell is an immediate child
  ];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
