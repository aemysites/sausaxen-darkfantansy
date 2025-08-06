/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must match exactly
  const headerRow = ['Cards (cardsNoImages15)'];
  const rows = [headerRow];

  // Get all .blogTextDivs representing cards
  const blogTextDivs = element.querySelectorAll('.blogTextDiv');
  blogTextDivs.forEach(div => {
    // Defensive: only add non-empty cards
    if (div && div.textContent.trim() !== '') {
      rows.push([div]); // Use existing node reference
    }
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
