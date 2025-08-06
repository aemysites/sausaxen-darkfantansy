/* global WebImporter */
export default function parse(element, { document }) {
  // Header row must be a single column with the block name
  const headerRow = ['Tabs (tab23)'];

  // Find all direct tab wrappers in the bubbleDiv
  const tabWrappers = Array.from(element.children).filter(
    (child) => child.querySelector('.box-container')
  );

  // For each tab, extract the label (element), and content (empty string, as in the screenshots)
  const tabRows = tabWrappers.map((tabWrap) => {
    let labelEl = tabWrap.querySelector('.orange-shadow-box, .grey-blank-box');
    // Fallback: first div in box-container
    if (!labelEl) {
      const boxContainer = tabWrap.querySelector('.box-container');
      if (boxContainer) {
        const firstDiv = boxContainer.querySelector('div');
        if (firstDiv) labelEl = firstDiv;
      }
    }
    // Defensive: skip row if we can't find the label
    if (!labelEl) return null;
    // Each tab row is two columns: [tab label element, empty string]
    return [labelEl, ''];
  }).filter(Boolean);

  // Compose final cells array: header is a single cell row, then all tab rows
  const cells = [headerRow, ...tabRows];

  // Create the table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element with the new block table
  element.replaceWith(block);
}
