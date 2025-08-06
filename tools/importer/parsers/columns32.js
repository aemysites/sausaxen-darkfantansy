/* global WebImporter */
export default function parse(element, { document }) {
  // Find all step containers (each step is a row)
  const stepContainers = element.querySelectorAll(':scope > .set-width > .directions-detail-container');

  // Header: must match exactly
  const headerRow = ['Columns (columns32)'];
  const rows = [headerRow];

  // For each step, construct a row with left (text) and right (video)
  stepContainers.forEach((step) => {
    // Left cell: all content except the video
    const left = step.querySelector('.directions-detail-text-container');
    // Reference the left cell directly as it's already an existing element
    // Right cell: video (reference video element directly, not clone)
    const video = step.querySelector('video');
    rows.push([left, video]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
