/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified
  const headerRow = ['Cards (cards2)'];
  // Each card is a .slick-slide (direct children of .slick-track)
  const slides = element.querySelectorAll('.slick-slide');
  const rows = [];

  slides.forEach((slide) => {
    // The main anchor for the card (direct child)
    const anchor = slide.querySelector('a');
    // The main blog card image (first .blog-card-img-container img)
    const img = anchor && anchor.querySelector('.blog-card-img-container img');
    // If image doesn't exist, insert an empty string (edge case)
    const imgCell = img || '';

    // Textual content cell construction
    const cellContent = [];
    // Category (Explore, Learn, etc)
    const category = anchor && anchor.querySelector('.smallImageDiv .name');
    if (category && category.textContent.trim()) {
      const catDiv = document.createElement('div');
      catDiv.textContent = category.textContent.trim();
      cellContent.push(catDiv);
    }
    // Date
    const date = anchor && anchor.querySelector('.recipeTextDiv .bottomText .text');
    if (date && date.textContent.trim()) {
      const dateDiv = document.createElement('div');
      dateDiv.textContent = date.textContent.trim();
      cellContent.push(dateDiv);
    }
    // Likes (number and icon)
    const likesFlex = anchor && anchor.querySelector('.recipeTextDiv .bottomText > div[style*="display: flex"]');
    if (likesFlex) {
      const likesSpan = likesFlex.querySelector('span');
      const heartImg = likesFlex.querySelector('img');
      const likesDiv = document.createElement('div');
      if (heartImg) likesDiv.append(heartImg);
      if (likesSpan && likesSpan.textContent.trim()) {
        const numSpan = document.createElement('span');
        numSpan.textContent = ' ' + likesSpan.textContent.trim();
        likesDiv.append(numSpan);
      }
      if (likesDiv.childNodes.length > 0) cellContent.push(likesDiv);
    }
    // Title (bigText)
    const title = anchor && anchor.querySelector('.bigTextDiv .bigText');
    if (title && title.textContent.trim()) {
      const titleStrong = document.createElement('strong');
      titleStrong.textContent = title.textContent.trim();
      cellContent.push(titleStrong);
    }
    // Wrap all cell content in a single div (for cell layout)
    const textDiv = document.createElement('div');
    cellContent.forEach(el => textDiv.append(el));
    // Make the entire cell clickable (like original), so wrap with anchor if present
    let cell;
    if (anchor && anchor.href) {
      const link = document.createElement('a');
      link.href = anchor.href;
      // Move all children into the link
      Array.from(textDiv.childNodes).forEach(child => link.append(child));
      cell = link;
    } else {
      cell = textDiv;
    }
    rows.push([imgCell, cell]);
  });

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}
