/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as per the example
  const headerRow = ['Hero (hero7)'];
  // Second row: background image (none in these examples, so blank)
  const bgRow = [''];

  // Third row: headline content
  // Extract the .heading-text-parent > .heading-text div for the headline and style structure
  let contentCell = null;
  const headingTextParent = element.querySelector(':scope > .heading-text-parent');
  if (headingTextParent) {
    const headingText = headingTextParent.querySelector(':scope > .heading-text');
    if (headingText) {
      // Wrap in h1 for semantic meaning as hero heading
      const h1 = document.createElement('h1');
      // Move all children of headingText into h1, preserving structure
      while (headingText.firstChild) {
        h1.appendChild(headingText.firstChild);
      }
      contentCell = h1;
    }
  }
  // Fallback: if structure is unexpected, use the full element
  if (!contentCell) {
    // Try to use the whole element content
    const h1 = document.createElement('h1');
    while (element.firstChild) {
      h1.appendChild(element.firstChild);
    }
    contentCell = h1;
  }

  const contentRow = [contentCell];

  // Compose table
  const cells = [headerRow, bgRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
