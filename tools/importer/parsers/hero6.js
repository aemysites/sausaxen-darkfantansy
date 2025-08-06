/* global WebImporter */
export default function parse(element, { document }) {
  // Header row must match the example exactly
  const headerRow = ['Hero (hero6)'];

  // 2nd row: Background Image (optional)
  // Get the first <img> in the block
  const imgEl = element.querySelector('img');
  const imageRow = [imgEl ? imgEl : ''];

  // 3rd row: Title, Subheading, CTA, etc. (all text content)
  // Try to find a wrapper for headline/subheadline
  let contentParent = element.querySelector('.absolute-content-carousel');
  let contentRowContent = '';
  if (contentParent) {
    // Use all children of the content container
    const children = Array.from(contentParent.children);
    contentRowContent = children.length ? children : '';
  } else {
    // Fallback: look for any <p>, <h1>-<h6> directly under the carousel/container
    const possibleContent = Array.from(element.querySelectorAll('p, h1, h2, h3, h4, h5, h6'));
    // Filter out anything that is inside .absolute-content-carousel if present
    if (possibleContent.length) {
      contentRowContent = possibleContent;
    } else {
      // Nothing found
      contentRowContent = '';
    }
  }

  // Compose table: 3 rows, 1 column
  const cells = [
    headerRow,
    imageRow,
    [contentRowContent]
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
