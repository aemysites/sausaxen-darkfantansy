/* global WebImporter */
export default function parse(element, { document }) {
  // Find all .box-container children directly under the container (or fallback to all descendants)
  let boxContainers = Array.from(element.querySelectorAll(':scope > .box-container'));
  if (boxContainers.length === 0) {
    boxContainers = Array.from(element.querySelectorAll('.box-container'));
  }

  // Collect the column cells (each .blank-box as an element reference)
  const columnCells = boxContainers.map(container => {
    const box = container.querySelector('.blank-box');
    return box || '';
  });
  if (!columnCells.length) return;

  // The header row must be a single cell, not the same number of cells as columns
  // So we create: [['Columns (columns31)'], [col1, col2, col3, ...]]
  const tableData = [
    ['Columns (columns31)'],
    columnCells
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);
  // Replace the original element
  element.replaceWith(block);
}
