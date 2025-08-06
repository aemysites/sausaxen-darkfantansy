/* global WebImporter */
export default function parse(element, { document }) {
  // Table header: must match the block/component name exactly
  const headerRow = ['Hero (hero25)'];

  // No background image row (empty cell)
  const backgroundRow = [''];

  // Compose the content row for the hero title, semantically as headline
  // The actual visual hierarchy in the screenshots is an h1-like element
  // We'll wrap the content of .heading-text in an <h1> for semantic correctness
  let contentCell;
  const headingText = element.querySelector('.heading-text');
  if (headingText) {
    // create an <h1> and move all children from .heading-text to it
    const h1 = document.createElement('h1');
    while (headingText.firstChild) {
      h1.appendChild(headingText.firstChild);
    }
    contentCell = h1;
  } else if (element.textContent.trim()) {
    // fallback: just use the element itself if it contains text
    contentCell = element;
  } else {
    // element is empty
    contentCell = '';
  }

  const contentRow = [contentCell];

  // Compose the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    backgroundRow,
    contentRow
  ], document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
