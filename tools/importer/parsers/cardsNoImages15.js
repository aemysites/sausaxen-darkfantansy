/* global WebImporter */
export default function parse(element, { document }) {
  // Compose the table header as in the example
  const headerRow = ['Cards (cardsNoImages15)'];

  // Collect all .blurbCardDiv elements which represent the cards
  const cardDivs = element.querySelectorAll('.blurbCardDiv');

  // For each card, extract its content block (the blogTextDiv)
  const rows = Array.from(cardDivs).map((cardDiv) => {
    // blogTextDiv usually contains a <p> with the content
    let contentDiv = cardDiv.querySelector('.blogTextDiv');
    // Fallback: if not found, use cardDiv itself
    const cellContent = contentDiv ? contentDiv : cardDiv;
    return [cellContent];
  });

  // Final table data (header, then one row per card)
  const tableData = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the newly created table
  element.replaceWith(table);
}
