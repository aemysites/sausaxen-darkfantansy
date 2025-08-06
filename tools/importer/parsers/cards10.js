/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block
  const rows = [['Cards (cards10)']];

  // Each card is inside div.exploreAllBlogsMainDiv
  const cardContainers = element.querySelectorAll(':scope > div.exploreAllBlogsMainDiv');

  cardContainers.forEach((mainDiv) => {
    const cardLink = mainDiv.querySelector('.loadMoreBlogCards > a');
    const cardDiv = cardLink ? cardLink.querySelector('.bloggCardDiv') : null;
    if (!cardDiv) return;

    // Image cell: The main card image (not the icon)
    const mainImg = cardDiv.querySelector('.blog-card-img-container img');
    // Reference the existing image element directly
    const imageEl = mainImg || '';

    // Text cell content
    const textParts = [];

    // Label (Explore/Create)
    const labelEl = cardDiv.querySelector('.smallImageDiv .name');
    if (labelEl && labelEl.textContent.trim()) {
      // Use a <span> for label
      const labelSpan = document.createElement('span');
      labelSpan.textContent = labelEl.textContent.trim();
      labelSpan.style.display = 'block';
      labelSpan.style.fontSize = '0.95em';
      labelSpan.style.fontWeight = 'bold';
      textParts.push(labelSpan);
    }

    // Date
    const dateEl = cardDiv.querySelector('.recipeTextDiv .bottomText .text');
    if (dateEl && dateEl.textContent.trim()) {
      const dateSpan = document.createElement('span');
      dateSpan.textContent = dateEl.textContent.trim();
      dateSpan.style.display = 'block';
      dateSpan.style.fontSize = '0.9em';
      dateSpan.style.color = '#888';
      textParts.push(dateSpan);
    }

    // Title as heading
    const bigTextEl = cardDiv.querySelector('.bigTextDiv .bigText');
    if (bigTextEl && bigTextEl.textContent.trim()) {
      // Use <h3> for semantic heading
      const heading = document.createElement('h3');
      heading.textContent = bigTextEl.textContent.trim();
      heading.style.margin = '0.5em 0 0 0';
      textParts.push(heading);
    }

    // Compose text cell
    let textCell;
    if (textParts.length === 1) {
      textCell = textParts[0];
    } else if (textParts.length > 1) {
      // Use a wrapper div for the text cell
      textCell = document.createElement('div');
      textParts.forEach((part) => textCell.appendChild(part));
    } else {
      textCell = '';
    }

    rows.push([
      imageEl,
      textCell,
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
