/* global WebImporter */
export default function parse(element, { document }) {
  // The provided HTML is just a decorative divider, not a real card grid.
  // There is no text content or card structure to extract.
  // The correct block is a table with only the block name as header.
  const cells = [
    ['Cards (cards24)']
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}