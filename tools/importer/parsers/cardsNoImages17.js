/* global WebImporter */
export default function parse(element, { document }) {
  // Block header must match example exactly
  const headerRow = ['Cards (cardsNoImages17)'];

  // Find all card containers directly under the root element
  const cardDivs = element.querySelectorAll(':scope > .box-container');

  // Build one row per card
  const rows = Array.from(cardDivs).map((cardDiv) => {
    // The label text for the card
    const blankBox = cardDiv.querySelector('.blank-box');
    let text = '';
    if (blankBox && blankBox.textContent) {
      text = blankBox.textContent.trim();
    }
    // Only create a <strong> if there is text
    if (text) {
      const strong = document.createElement('strong');
      strong.textContent = text;
      return [strong];
    }
    return [''];
  });

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows,
  ], document);

  element.replaceWith(table);
}
