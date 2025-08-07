/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for block name
  const headerRow = ['Hero (hero6)'];

  // Get the main carousel image (the recipe-image inside the current active slide)
  let imgEl = null;
  const activeLi = element.querySelector('.slider li.slide.selected, .slider li.slide');
  if (activeLi) {
    imgEl = activeLi.querySelector('img.recipe-image');
  }
  if (!imgEl) {
    imgEl = element.querySelector('img.recipe-image');
  }
  const backgroundRow = [imgEl ? imgEl : ''];

  // 3rd row: Headline, subheadline, CTA (optional)
  // These are inside .absolute-content-carousel
  let textContentCell = '';
  if (imgEl && imgEl.parentElement) {
    const absContent = imgEl.parentElement.querySelector('.absolute-content-carousel');
    if (absContent) {
      // Collect all children (p, h1-h6, a, etc) that have non-empty text
      const nodes = Array.from(absContent.childNodes)
        .filter(node => {
          if (node.nodeType === 1) {
            return node.textContent && node.textContent.trim().length > 0;
          }
          return false;
        });
      if (nodes.length > 0) {
        const frag = document.createElement('div');
        nodes.forEach(node => frag.appendChild(node));
        textContentCell = frag;
      }
    }
  }
  const textRow = [textContentCell];

  const cells = [
    headerRow,
    backgroundRow,
    textRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
