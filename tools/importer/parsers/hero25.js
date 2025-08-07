/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified in the example
  const headerRow = ['Hero (hero25)'];
  // Second row: Background image -- none in provided HTML, so blank
  const backgroundRow = [''];

  // Third row: Title and Subheading extraction
  // The structure is:
  // h1.recipe-name-container
  //   div.heading-text-parent
  //     div.heading-text
  //       span (may be empty or contain subheading)
  //       div.box-container > div.green-shadow-box (title)
  //       span (may be empty or contain subheading)

  let title = '';
  let subheading = '';

  const headingText = element.querySelector('.heading-text');
  if (headingText) {
    // Find box-container for title
    const boxContainer = headingText.querySelector('.box-container');
    if (boxContainer) {
      const box = boxContainer.querySelector('.green-shadow-box');
      if (box && box.textContent.trim()) {
        title = box.textContent.trim();
      }
    }
    // Find all span children directly under .heading-text
    const spans = Array.from(headingText.querySelectorAll(':scope > span'));
    // The subheading is any non-empty span, but not if it's just whitespace
    // There can be 0, 1 or 2 spans, so check both
    subheading = spans.map(s => s.textContent.trim()).filter(t => t).join(' ');
    // If subheading ends up as just whitespace, set to ''
    if (!subheading.trim()) subheading = '';
  }

  // Build the content for the third row
  const contentArr = [];
  if (title) {
    // Use <h1> for the main title, per semantic meaning of the source
    const h1 = document.createElement('h1');
    h1.textContent = title;
    contentArr.push(h1);
  }
  if (subheading) {
    // Use <p> for subheading
    const p = document.createElement('p');
    p.textContent = subheading;
    contentArr.push(p);
  }
  // If no content, leave blank
  const contentRow = [contentArr.length ? contentArr : ''];

  // Build the table block
  const cells = [headerRow, backgroundRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element with the new block
  element.replaceWith(block);
}
