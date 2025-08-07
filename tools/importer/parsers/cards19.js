/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as specified
  const headerRow = ['Cards (cards19)'];
  const cards = [];

  // Get all cards: from .filterMainDiv > .loadMoreCards > .topRecipesDiv > a > .recipe-card-container
  const filterMainDivs = element.querySelectorAll(':scope > .filterMainDiv');
  filterMainDivs.forEach((mainDiv) => {
    const loadMoreCards = mainDiv.querySelector(':scope > .loadMoreCards');
    if (!loadMoreCards) return;
    const topRecipesDivs = loadMoreCards.querySelectorAll(':scope > .topRecipesDiv');
    topRecipesDivs.forEach((recipesDiv) => {
      const a = recipesDiv.querySelector('a');
      if (!a) return;
      const card = a.querySelector('.recipe-card-container');
      if (!card) return;

      // First cell: image (main recipe image only)
      let mainImg = null;
      const imageContainer = card.querySelector('.recipe-image-container');
      if (imageContainer) {
        // Main card image is the one with class 'topRecipeImage'
        mainImg = imageContainer.querySelector('img.topRecipeImage') || imageContainer.querySelector('img');
      }
      if (!mainImg) {
        // fallback in unlikely case
        mainImg = card.querySelector('img.topRecipeImage') || card.querySelector('img');
      }

      // Second cell: text/meta
      const textCellItems = [];
      // Category (veg/non-veg/vegan)
      const categoryEl = card.querySelector('.bottomText .text');
      if (categoryEl) {
        const catDiv = document.createElement('div');
        catDiv.textContent = categoryEl.textContent.trim();
        textCellItems.push(catDiv);
      }
      // Title
      const titleEl = card.querySelector('.bigTextDiv .bigText');
      if (titleEl) {
        const titleDiv = document.createElement('div');
        titleDiv.style.fontWeight = 'bold';
        titleDiv.textContent = titleEl.textContent.trim();
        textCellItems.push(titleDiv);
      }
      // Meta info (time and difficulty)
      const yellowDiv = card.querySelector('.yellowDiv');
      if (yellowDiv) {
        // Reference the element directly
        textCellItems.push(yellowDiv);
      }

      // Push row: always two columns
      cards.push([mainImg, textCellItems]);
    });
  });

  // Compose the table
  const cells = [headerRow, ...cards];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
