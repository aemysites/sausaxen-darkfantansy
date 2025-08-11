/* global WebImporter */
export default function parse(element, { document }) {
  // Table header exactly as in the example
  const cells = [['Cards (cards4)']];

  // Get heading and subheading content
  const headingContainer = element.querySelector('.green_bubble_heading_container');
  let headingText = '';
  if (headingContainer) {
    headingText = headingContainer.textContent.trim();
  }
  const textDiv = element.querySelector('.textDiv');
  let subText = '';
  if (textDiv) {
    subText = textDiv.textContent.trim();
  }

  // Get all card links (each card is an <a> inside .fruitBowlDiv)
  const fruitBowlDiv = element.querySelector('.fruitBowlDiv');
  if (!fruitBowlDiv) return;
  const cardAnchors = fruitBowlDiv.querySelectorAll(':scope > .fruitImage > a');

  cardAnchors.forEach((a, i) => {
    // Get the card image (reference original)
    const img = a.querySelector('img');

    // Get the card title (from .small-green-box)
    let cardTitle = '';
    const smallGreenBox = a.querySelector('.small-green-box');
    if (smallGreenBox) {
      cardTitle = smallGreenBox.textContent.trim();
    }
    // Create heading element for title
    const titleEl = document.createElement('strong');
    titleEl.textContent = cardTitle;

    // Compose text cell: title, line break, then for first card only the main heading/subtext
    const textCellContent = [titleEl];
    if (i === 0) {
      if (headingText) {
        textCellContent.push(document.createElement('br'));
        const headingSpan = document.createElement('span');
        headingSpan.textContent = headingText;
        textCellContent.push(headingSpan);
      }
      if (subText) {
        textCellContent.push(document.createElement('br'));
        const subTextSpan = document.createElement('span');
        subTextSpan.textContent = subText;
        textCellContent.push(subTextSpan);
      }
    }
    // Add the row for this card
    cells.push([
      img,
      textCellContent
    ]);
  });

  // Build and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
