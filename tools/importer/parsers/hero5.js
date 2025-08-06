/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header must be exactly as in the example
  const headerRow = ['Hero (hero5)'];

  // 2. Row for background image (empty as none present in HTML)
  const backgroundRow = [''];

  // 3. Content row: all content, reference the main heading container
  // Find the h2 (which contains all heading markup)
  const h2 = element.querySelector('h2');
  // Defensive check: if h2 is missing, use an empty string
  const contentCell = h2 ? [h2] : [''];

  // 4. Build cells array: header, background, content
  const cells = [
    headerRow,
    backgroundRow,
    contentCell
  ];

  // 5. Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // 6. Replace the original element with the table
  element.replaceWith(table);
}