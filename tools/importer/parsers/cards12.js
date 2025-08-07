/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: collect text content for the card text cell
  function getTextCell(cardContainer) {
    const textContent = [];
    // 1. Card label (e.g., 'Veg + Egg')
    const label = cardContainer.querySelector('.recipeTextDiv .bottomText .text');
    if (label && label.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = label.textContent.trim();
      textContent.push(p);
    }
    // 2. Main title (e.g., 'Butter Pecan Ice Cream.')
    const title = cardContainer.querySelector('.bigTextDiv .bigText');
    if (title && title.textContent.trim()) {
      const h3 = document.createElement('h3');
      h3.textContent = title.textContent.trim();
      textContent.push(h3);
    }
    // 3. Yellow info bar (time and difficulty)
    const yellowBar = cardContainer.querySelector('.yellowDiv .yellowSubDiv');
    if (yellowBar) {
      const left = yellowBar.querySelector('.leftText .leftSpan');
      const right = yellowBar.querySelector('.rightText .rightSpan');
      let info = '';
      if (left && left.textContent.trim()) {
        info += left.textContent.trim();
      }
      if ((left && left.textContent.trim()) && (right && right.textContent.trim())) {
        info += ' | ';
      }
      if (right && right.textContent.trim()) {
        info += right.textContent.trim();
      }
      if (info) {
        const p = document.createElement('p');
        p.textContent = info;
        textContent.push(p);
      }
    }
    return textContent;
  }

  // Find all .slick-slide elements representing the cards
  const cardSlides = element.querySelectorAll('.slick-slide');
  const rows = [['Cards (cards12)']];
  cardSlides.forEach((slide) => {
    // Find anchor containing the recipe-card-container
    const anchor = slide.querySelector('a[href]');
    if (!anchor) return; // skip if missing
    const cardContainer = anchor.querySelector('.recipe-card-container');
    if (!cardContainer) return; // skip if missing
    // Find card image (the recipe photo)
    const mainImg = cardContainer.querySelector('.recipe-image-container img.topRecipeImage');
    // Fallback: If no image, cell will be null
    const imgCell = mainImg || '';
    // Text cell
    const textCell = getTextCell(cardContainer);
    rows.push([imgCell, textCell]);
  });

  // Only replace if there is at least one card (header + content)
  if (rows.length > 1) {
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }
}
