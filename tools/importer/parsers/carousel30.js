/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: matches the block name exactly
  const headerRow = ['Carousel (carousel30)'];

  // Find the video element, if any
  const video = element.querySelector('video');
  let videoCell = '';
  if (video && video.src) {
    // Replace video with a link to its source, per guidelines
    const a = document.createElement('a');
    a.href = video.src;
    a.textContent = video.src;
    videoCell = a;
  }

  // Gather all other content in the element except the video
  const textNodes = [];
  Array.from(element.childNodes).forEach((node) => {
    if (node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() === 'video') {
      return; // skip video
    } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) {
      // Text content directly in element
      textNodes.push(document.createTextNode(node.textContent));
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      textNodes.push(node); // Reference, not clone
    }
  });
  let textContentCell = '';
  if (textNodes.length === 1) {
    textContentCell = textNodes[0];
  } else if (textNodes.length > 1) {
    textContentCell = textNodes;
  }

  // Compose cells as in the example: header is 1 column; data row is 2 columns
  const cells = [headerRow, [videoCell, textContentCell]];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
