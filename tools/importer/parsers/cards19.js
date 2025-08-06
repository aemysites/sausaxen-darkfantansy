/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to safely get child by selector, returns null if not found
  function safeQuery(sel, parent) {
    return parent ? parent.querySelector(sel) : null;
  }

  const headerRow = ['Cards (cards19)'];
  const cards = [];

  // Each .filterMainDiv contains a card
  const cardContainers = element.querySelectorAll(':scope > .filterMainDiv');
  cardContainers.forEach((mainDiv) => {
    // Each .filterMainDiv > .loadMoreCards > .topRecipesDiv > a (card link)
    const topRecipesDiv = safeQuery(':scope > .loadMoreCards > .topRecipesDiv', mainDiv);
    if (!topRecipesDiv) return;
    const cardLink = safeQuery(':scope > a', topRecipesDiv);
    if (!cardLink) return;

    // Find image for the recipe in .recipe-image-container > img.topRecipeImage
    let imageElem = null;
    const recipeImgContainer = safeQuery('.recipe-image-container', cardLink);
    if (recipeImgContainer) {
      imageElem = safeQuery('img.topRecipeImage', recipeImgContainer);
    }

    // Compose the text cell
    const textBits = [];
    // Type/category, e.g. 'Veg', 'Non Veg', etc
    const typeElem = safeQuery('.bottomText .text', cardLink);
    if (typeElem && typeElem.textContent.trim()) {
      const typeDiv = document.createElement('div');
      typeDiv.textContent = typeElem.textContent.trim();
      textBits.push(typeDiv);
    }
    // Title in strong
    const titleElem = safeQuery('.bigTextDiv .bigText', cardLink);
    if (titleElem && titleElem.textContent.trim()) {
      const titleDiv = document.createElement('div');
      const strong = document.createElement('strong');
      strong.textContent = titleElem.textContent.trim();
      titleDiv.appendChild(strong);
      textBits.push(titleDiv);
    }
    // Meta info block: time and difficulty
    const leftSpan = safeQuery('.yellowDiv .leftText .leftSpan', cardLink);
    const rightSpan = safeQuery('.yellowDiv .rightText .rightSpan', cardLink);
    if ((leftSpan && leftSpan.textContent.trim()) || (rightSpan && rightSpan.textContent.trim())) {
      const metaDiv = document.createElement('div');
      if (leftSpan && leftSpan.textContent.trim()) {
        const timeSpan = document.createElement('span');
        timeSpan.textContent = leftSpan.textContent.trim();
        metaDiv.appendChild(timeSpan);
      }
      if (rightSpan && rightSpan.textContent.trim()) {
        // add separator if both exist
        if (leftSpan && leftSpan.textContent.trim()) {
          metaDiv.appendChild(document.createTextNode(' | '));
        }
        const diffSpan = document.createElement('span');
        diffSpan.textContent = rightSpan.textContent.trim();
        metaDiv.appendChild(diffSpan);
      }
      textBits.push(metaDiv);
    }
    // Compose cell
    let textCell = null;
    if (textBits.length === 1) {
      textCell = textBits[0];
    } else if (textBits.length > 1) {
      textCell = document.createElement('div');
      textBits.forEach(e => textCell.appendChild(e));
    }
    // Always add [image, textCell] row if at least image or textCell exists
    if (imageElem || textCell) {
      cards.push([imageElem, textCell]);
    }
  });
  // Compose table rows
  const rows = [headerRow, ...cards];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
