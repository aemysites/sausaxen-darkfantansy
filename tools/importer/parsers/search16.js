/* global WebImporter */
export default function parse(element, { document }) {
  // Build the block's table as per the requirements:
  // Header: 'Search'
  // Second row: must contain all content, including all text, as one cell

  // Gather all relevant content from the element,
  // including all direct children (headings, search bar, button, etc) to preserve text content
  const content = Array.from(element.children);
  // If the element has no children (edge case), include itself
  const cellContent = content.length ? content : [element];

  // Build the table structure
  const cells = [
    ['Search'],
    [cellContent]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}