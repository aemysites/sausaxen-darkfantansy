/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row for block name
  const headerRow = ['Hero'];

  // 2. Background image row: none present in this HTML, so leave empty
  const backgroundRow = [''];

  // 3. Content row: Extract heading structure
  // We'll reference the main text parts as they appear, preserving hierarchy
  // Use the .heading-text structure, referencing actual child elements
  const headingText = element.querySelector('.heading-text');
  let contentCell;
  if (headingText) {
    // Use all children of .heading-text (normally: span, .box-container, span)
    // Reference the child elements directly for resiliency
    contentCell = document.createElement('div');
    // Only append non-empty children for robustness
    Array.from(headingText.childNodes).forEach(child => {
      // skip empty text nodes
      if (child.nodeType === Node.TEXT_NODE && !child.textContent.trim()) return;
      // skip empty spans
      if (child.nodeType === Node.ELEMENT_NODE && child.tagName === 'SPAN' && !child.textContent.trim()) return;
      contentCell.appendChild(child);
    });
  } else {
    // fallback: put all inside
    contentCell = element;
  }

  const contentRow = [contentCell];

  // 4. Compose and create the table
  const cells = [
    headerRow,
    backgroundRow,
    contentRow
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
