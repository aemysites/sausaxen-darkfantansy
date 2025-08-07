/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row
  const headerRow = ['Hero (hero27)'];

  // Row 2: Background Image (optional)
  // Find first image in the block, if any
  const img = element.querySelector('img');
  const imgRow = [img ? img : ''];

  // Row 3: Title, Subheading, CTA
  // Find text content and CTA button
  let contentCell = [];
  const content = element.querySelector('.content-font-container');
  if (content) {
    // We want to preserve the existing elements (not clone)
    // We'll gather all direct children of the content container
    const children = Array.from(content.childNodes).filter(node => {
      // Include element nodes and non-empty text nodes
      return (node.nodeType === 1) || (node.nodeType === 3 && node.textContent.trim());
    });
    if (children.length > 0) {
      contentCell = children;
    } else {
      // Fallback in case all children are empty
      contentCell = [''];
    }
  } else {
    // If no content container, just leave empty
    contentCell = [''];
  }
  const contentRow = [contentCell];

  // Compose the table rows
  const rows = [headerRow, imgRow, contentRow];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
