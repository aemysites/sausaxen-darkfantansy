/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: one column, matches example EXACTLY
  const headerRow = ['Carousel (carousel30)'];

  // Get <video> element (slide visual)
  const video = element.querySelector('video');
  let firstCell = '';
  if (video && video.src) {
    const videoLink = document.createElement('a');
    videoLink.href = video.src;
    videoLink.textContent = video.src;
    firstCell = videoLink;
  }

  // Find all text nodes and non-video elements that are direct children
  // (future proof for text content in carousel slides)
  let secondCell = '';
  const textNodes = Array.from(element.childNodes).filter((node) => {
    return node !== video && (node.nodeType === Node.TEXT_NODE || node.nodeType === Node.ELEMENT_NODE);
  });
  if (textNodes.length > 0) {
    // Reference the original nodes directly, not clones
    secondCell = textNodes;
  }

  // Table structure: header row (1 col), then slide row (2 cols)
  const cells = [
    headerRow,
    [firstCell, secondCell]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
