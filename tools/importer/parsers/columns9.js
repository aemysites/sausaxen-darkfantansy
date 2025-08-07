/* global WebImporter */
export default function parse(element, { document }) {
  // Find left and right content: left is all but the video, right is the <video> as a link
  const children = Array.from(element.children);
  const video = children.find((child) => child.tagName.toLowerCase() === 'video');
  const leftContentNodes = children.filter((child) => child !== video);
  let leftCellContent;
  if (leftContentNodes.length === 1) {
    leftCellContent = leftContentNodes[0];
  } else if (leftContentNodes.length > 1) {
    const div = document.createElement('div');
    leftContentNodes.forEach((node) => div.appendChild(node));
    leftCellContent = div;
  } else {
    leftCellContent = '';
  }
  let rightCellContent = '';
  if (video) {
    const source = video.querySelector('source');
    if (source && source.src) {
      const link = document.createElement('a');
      link.href = source.src;
      link.textContent = source.src;
      rightCellContent = link;
    }
  }
  // Header row must be a single cell (one column)
  const headerRow = ['Columns (columns9)'];
  // Content row has two columns
  const contentRow = [leftCellContent, rightCellContent];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);
  element.replaceWith(table);
}
