/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract the image(s) and text from each side
  function getColumnContent(curveDiv) {
    const imgs = Array.from(curveDiv.querySelectorAll('img'));
    const textDiv = curveDiv.querySelector('div');
    const cells = [];
    if (imgs.length > 0) {
      cells.push(...imgs);
    }
    if (textDiv) {
      cells.push(textDiv);
    }
    return cells;
  }

  const leftCurve = element.querySelector('.vegLeftCurve');
  const rightCurve = element.querySelector('.vegRightCurve');

  // Defensive: fall back to empty arrays if missing
  const leftContent = leftCurve ? getColumnContent(leftCurve) : [];
  const rightContent = rightCurve ? getColumnContent(rightCurve) : [];

  // Header row is a single cell array, as per the markdown example
  const headerRow = ['Columns (columns22)'];
  // Content row is an array with each column's content as a separate cell
  const contentRow = [leftContent, rightContent];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Make sure the header <th> spans across all columns
  const th = table.querySelector('th');
  if (th && contentRow.length > 1) {
    th.setAttribute('colspan', contentRow.length);
  }

  element.replaceWith(table);
}
