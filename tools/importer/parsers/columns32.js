/* global WebImporter */
export default function parse(element, { document }) {
  // Find all directions-detail-container blocks (steps)
  let stepContainers = [];
  const setWidth = element.querySelector(':scope > .set-width');
  if (setWidth) {
    stepContainers = Array.from(setWidth.querySelectorAll(':scope > .directions-detail-container'));
  } else {
    // fallback if missing .set-width
    stepContainers = Array.from(element.querySelectorAll(':scope > .directions-detail-container'));
  }

  // Prepare table rows
  const cells = [];
  // Header row exactly as required
  cells.push(['Columns (columns32)']);

  // For each step, create a row with 2 columns: text block and video
  stepContainers.forEach((step) => {
    // Left column: all text (heading, duration, description)
    const detail = step.querySelector(':scope > .directions-detail');
    let leftCol = null;
    if (detail) {
      leftCol = detail;
    }
    // Right column: the video (if any, including its source)
    let rightCol = null;
    const video = step.querySelector(':scope > video');
    if (video) {
      rightCol = video;
    }
    cells.push([leftCol, rightCol]);
  });

  // Create and replace table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
