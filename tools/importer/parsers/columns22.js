/* global WebImporter */
export default function parse(element, { document }) {
  // Extract left and right column content
  const left = element.querySelector('.vegLeftCurve');
  const right = element.querySelector('.vegRightCurve');
  const leftContent = left || document.createElement('div');
  const rightContent = right || document.createElement('div');

  // Build the table with a one-cell header row, and a two-cell content row
  // After table creation, set the colspan on the header row <th>
  const cells = [
    ['Columns (columns22)'],
    [leftContent, rightContent],
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Set colspan=2 on header's single <th>
  const headerRow = table.querySelector('tr');
  if (headerRow && headerRow.children.length === 1) {
    headerRow.children[0].setAttribute('colspan', '2');
  }
  element.replaceWith(table);
}
