/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as specified
  const headerRow = ['Cards (cards28)'];

  // Find all card <a> elements inside the cards block
  const cardLinks = element.querySelectorAll('.must-try-options > a');
  const rows = [];

  cardLinks.forEach((card) => {
    // First cell: the image (use the existing <img> element)
    const img = card.querySelector('img');

    // Second cell: the text content (reference the .option1-text node directly, if present)
    const textDiv = card.querySelector('.option1-text');
    const textCell = textDiv ? textDiv : '';

    rows.push([img, textCell]);
  });

  // Compose the table rows
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  
  // Replace the original element with the block table
  element.replaceWith(table);
}
