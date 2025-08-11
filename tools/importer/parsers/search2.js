/* global WebImporter */
export default function parse(element, { document }) {
  // Header row must exactly match the example
  const headerRow = ['Search'];

  // To ensure all text content and structure is included, reference all direct children of the element as a group
  // This is more robust than cloning, and preserves references for the importer
  const children = Array.from(element.childNodes);
  // If the element is empty, provide an empty string
  const contentCell = children.length > 0 ? children : [''];

  // Add the query index link below the content
  const queryIndexUrl = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';
  const link = document.createElement('a');
  link.href = queryIndexUrl;
  link.textContent = queryIndexUrl;

  // Compose final cell content, including all referenced nodes and the required link
  const cellContent = Array.isArray(contentCell) ? [...contentCell, document.createElement('br'), link] : [contentCell, document.createElement('br'), link];

  // Create the block table
  const cells = [
    headerRow,
    [cellContent]
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
