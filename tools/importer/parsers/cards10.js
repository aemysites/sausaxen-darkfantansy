/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must match exactly
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Find all card containers
  const cardDivs = element.querySelectorAll(':scope > div.exploreAllBlogsMainDiv');

  cardDivs.forEach(cardDiv => {
    // Get the 'a' link for the card (contains all card content)
    const cardLink = cardDiv.querySelector('a');
    // Get card image (main food image): Prefer .blog-card-img-container img
    let img = cardDiv.querySelector('.blog-card-img-container img');
    if (!img) {
      // fallback to the first image inside the card if structure changes
      img = cardDiv.querySelector('img');
    }
    // Ensure we reference the existing element, not clone

    // Get card title (headline)
    let title = cardDiv.querySelector('.bigTextDiv .bigText');
    let titleElem;
    if (title && title.textContent) {
      titleElem = document.createElement('h3');
      titleElem.textContent = title.textContent;
    }

    // Label (Explore/Create)
    let labelElem = cardDiv.querySelector('.smallImageDiv .name');
    // Date
    let dateElem = cardDiv.querySelector('.recipeTextDiv .bottomText .text');
    // Likes (span with number after heart img)
    let likesBox = cardDiv.querySelector('.recipeTextDiv .bottomText > div[style*="align-items:center"]');
    let likesElem = likesBox ? likesBox.querySelector('span') : null;
    let likesText = likesElem ? likesElem.textContent.trim() : null;
    let likesImg = likesBox ? likesBox.querySelector('img') : null;

    // Compose meta line (label, likes, date) in a single <div> for cell
    let metaDiv = document.createElement('div');
    metaDiv.style.display = 'flex';
    metaDiv.style.alignItems = 'center';
    metaDiv.style.gap = '8px';
    if (labelElem) {
      let labelSpan = document.createElement('span');
      labelSpan.textContent = labelElem.textContent;
      labelSpan.style.fontWeight = 'bold';
      metaDiv.appendChild(labelSpan);
    }
    if (likesImg && likesElem) {
      metaDiv.appendChild(likesImg);
      let countSpan = document.createElement('span');
      countSpan.textContent = likesText;
      metaDiv.appendChild(countSpan);
    }
    if (dateElem) {
      let dateSpan = document.createElement('span');
      dateSpan.textContent = dateElem.textContent;
      metaDiv.appendChild(dateSpan);
    }

    // Compose info cell (metaDiv, then title)
    const infoCell = [];
    if (metaDiv.childNodes.length > 0) {
      infoCell.push(metaDiv);
    }
    if (titleElem) {
      infoCell.push(titleElem);
    }
    // No separate CTA (title is not linked, per example)

    // Each row: [image, infoCell]
    rows.push([
      img,
      infoCell
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
