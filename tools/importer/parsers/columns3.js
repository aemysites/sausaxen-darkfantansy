/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per spec
  const headerRow = ['Columns (columns3)'];

  // Gather all filter suggestion elements directly under the main suggestion container
  const suggestionContainer = element.querySelector('.home-carousel_mainSuggestionDiv__OZ8e_');
  if (!suggestionContainer) {
    // fallback: no content, just header
    const block = WebImporter.DOMUtils.createTable([headerRow], document);
    element.replaceWith(block);
    return;
  }
  const suggestions = Array.from(suggestionContainer.querySelectorAll(':scope > .suggestion-list_filterContainerSuggestion__8sPsh'));

  // Defensive: If not enough items, pad with empty cells
  const totalCols = 3;
  const totalRows = Math.ceil(suggestions.length / totalCols);

  // Utility to reference the icon and label in the existing suggestion node
  function composeCell(suggestionEl) {
    if (!suggestionEl) return '';
    // Use the existing node so that SVG and text are preserved
    return suggestionEl;
  }

  // Build the columns rows
  const rows = [headerRow];
  for (let i = 0; i < totalRows; i++) {
    const row = [];
    for (let j = 0; j < totalCols; j++) {
      const idx = i * totalCols + j;
      row.push(composeCell(suggestions[idx]));
    }
    rows.push(row);
  }

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
