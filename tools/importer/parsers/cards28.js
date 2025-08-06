/* global WebImporter */
export default function parse(element, { document }) {
  // Header row per spec
  const headerRow = ['Cards (cards28)'];
  const cells = [headerRow];

  // Find the container that holds the card links
  const cardsContainer = element.querySelector('.must-try-options');
  if (!cardsContainer) return;

  // For each card (each direct <a> child)
  cardsContainer.querySelectorAll(':scope > a').forEach(cardLink => {
    // Find the image element (mandatory)
    const img = cardLink.querySelector('img');

    // Find the text container
    const textDiv = cardLink.querySelector('.option1-text');
    let textCellContent = [];
    if (textDiv) {
      // Extract heading (as <strong>), then description
      const heading = textDiv.querySelector('.option1-heading');
      const desc = textDiv.querySelector('.option1-content');
      if (heading) {
        const strong = document.createElement('strong');
        strong.textContent = heading.textContent.trim();
        textCellContent.push(strong);
        textCellContent.push(document.createElement('br'));
      }
      if (desc) {
        const span = document.createElement('span');
        span.textContent = desc.textContent.trim();
        textCellContent.push(span);
      }
    }
    // If no textDiv, fallback to empty cell
    if (textCellContent.length === 0) {
      textCellContent = [''];
    }

    cells.push([
      img,
      textCellContent
    ]);
  });

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
