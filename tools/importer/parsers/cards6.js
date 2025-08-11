/* global WebImporter */
export default function parse(element, { document }) {
  // Compose the header row as in the block definition
  const headerRow = ['Cards (cards6)'];

  // CARD IMAGE: find the card's main image (avoid icons)
  let cardImg = null;
  const imgContainers = element.querySelectorAll('img');
  // The main card image will have a class typical of the main image, or
  // will be visually largest. Here, look for .recipeImage if available
  cardImg = element.querySelector('.blog-card-img-container img');
  if (!cardImg) {
    // fallback: get the largest width image
    let maxImg = null;
    let maxWidth = 0;
    imgContainers.forEach(img => {
      const width = parseInt(img.getAttribute('width')||'0', 10);
      if (width > maxWidth) {
        maxImg = img;
        maxWidth = width;
      }
    });
    cardImg = maxImg;
  }

  // TEXTUAL CONTENT: Compose a div with the text info in vertical layout
  const textContentDiv = document.createElement('div');

  // Category/Badge (eg. 'Innovate')
  const badge = element.querySelector('.smallImageDiv .name');
  if (badge && badge.textContent.trim()) {
    const badgeDiv = document.createElement('div');
    badgeDiv.textContent = badge.textContent.trim();
    textContentDiv.appendChild(badgeDiv);
  }

  // Date (eg. '26 May 2024')
  const date = element.querySelector('.bottomText .text');
  if (date && date.textContent.trim()) {
    const dateDiv = document.createElement('div');
    dateDiv.textContent = date.textContent.trim();
    textContentDiv.appendChild(dateDiv);
  }

  // Title (eg. '7 Unique and Innovative Ways to Use Gochujang in Your Cooking')
  const title = element.querySelector('.bigText');
  if (title && title.textContent.trim()) {
    const strong = document.createElement('strong');
    strong.textContent = title.textContent.trim();
    textContentDiv.appendChild(strong);
  }

  // (No description/call-to-action in source, so nothing further)
  // Assemble row
  const row = [cardImg, textContentDiv];

  // Compose table array
  const cells = [headerRow, row];
  // Create block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
