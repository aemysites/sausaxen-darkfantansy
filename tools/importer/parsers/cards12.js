/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as in the example
  const rows = [['Cards (cards12)']];

  // Select all slides (cards)
  const slides = element.querySelectorAll('.slick-slide');

  slides.forEach((slide) => {
    // The anchor wrapping the card content
    const cardLink = slide.querySelector('.topRecipesDiv > a');
    if (!cardLink) return;

    // --- Cell 1: Main image (reference existing element) ---
    const mainImg = cardLink.querySelector('.recipe-image-container img');
    const firstCell = mainImg || '';

    // --- Cell 2: All main text content from the card ---
    const cell2 = document.createElement('div');

    // 1. Title (big text, bold)
    const title = cardLink.querySelector('.bigTextDiv .bigText');
    if (title) {
      const strong = document.createElement('strong');
      strong.textContent = title.textContent.trim();
      cell2.appendChild(strong);
      cell2.appendChild(document.createElement('br'));
    }

    // 2. Description (e.g., "Veg + Egg")
    const desc = cardLink.querySelector('.bottomText .text');
    if (desc) {
      cell2.appendChild(document.createTextNode(desc.textContent.trim()));
      cell2.appendChild(document.createElement('br'));
    }

    // 3. Like count (if present)
    const like = cardLink.querySelector('.like-image span');
    if (like) {
      const likeDiv = document.createElement('div');
      likeDiv.textContent = `Likes: ${like.textContent.trim()}`;
      cell2.appendChild(likeDiv);
    }

    // 4. Time & Difficulty (yellowSubDiv)
    const yellow = cardLink.querySelector('.yellowDiv .yellowSubDiv');
    if (yellow) {
      const left = yellow.querySelector('.leftText');
      const right = yellow.querySelector('.rightText');
      const detailArr = [];
      if (left && left.textContent.trim()) {
        detailArr.push(left.textContent.replace(/\s+/g, ' ').trim());
      }
      if (right && right.textContent.trim()) {
        detailArr.push(right.textContent.replace(/\s+/g, ' ').trim());
      }
      if (detailArr.length) {
        const details = document.createElement('div');
        details.textContent = detailArr.join(' | ');
        cell2.appendChild(details);
      }
    }

    // Fallback: If cell2 is empty, put all text content from cardLink
    if (!cell2.textContent.trim()) {
      cell2.textContent = cardLink.textContent.trim();
    }

    rows.push([
      firstCell,
      cell2
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
