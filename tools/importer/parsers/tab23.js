/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct tab wrappers
  const tabWrappers = element.querySelectorAll(':scope > div');
  // Prepare rows for the table.
  // We need to determine the number of columns for content rows (should be 2 for label/content)
  // Header row: single cell. Content rows: 2 cells (label, content)
  const rows = [];
  // Header row: single cell
  rows.push(['Tabs (tab23)']);
  // Each tab row: [label, content]
  tabWrappers.forEach((tabWrap) => {
    // Find the label: within .box-container > div[class$='box']
    const labelDiv = tabWrap.querySelector('.box-container > div[class$="box"]');
    const label = labelDiv ? labelDiv.textContent.trim() : '';
    // For this HTML, there is no content block shown for the tab, so use empty string
    rows.push([label, '']);
  });
  // Create table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Make the header row span two columns
  const firstRow = table.querySelector('tr');
  if (firstRow && firstRow.children.length === 1) {
    firstRow.children[0].setAttribute('colspan', '2');
  }
  element.replaceWith(table);
}
