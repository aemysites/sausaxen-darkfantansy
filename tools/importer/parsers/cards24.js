/* global WebImporter */
export default function parse(element, { document }) {
  // The input HTML contains only a decorative divider, not actual cards content.
  // The block should only produce the header row, as there is no card data/content present.
  // The header must exactly match: 'Cards (cards24)'
  const cells = [
    ['Cards (cards24)']
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}