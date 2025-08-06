/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion container
  const accordionDiv = element.querySelector('.accordionDiv');
  if (!accordionDiv) return;

  // Find all accordion items (questions)
  const accordionItems = accordionDiv.querySelectorAll('.MuiAccordion-root');
  const rows = [];

  // Add header row as per spec
  rows.push(['Accordion']);

  // Populate rows as [question, answer] pairs
  accordionItems.forEach(item => {
    // Title cell: get first visible <p> or content in .MuiAccordionSummary-content
    let titleCell = '';
    const summary = item.querySelector('.MuiAccordionSummary-content');
    if (summary) {
      const p = summary.querySelector('p');
      titleCell = p ? p : summary;
    }
    
    // Content cell: get first .expandContent (or fallback to .MuiAccordionDetails-root)
    let contentCell = '';
    const details = item.querySelectorAll('.MuiAccordionDetails-root');
    for (const detail of details) {
      // Look for .expandContent with non-empty text
      const expandContent = detail.querySelector('.expandContent');
      if (expandContent && expandContent.textContent.trim()) {
        contentCell = expandContent;
        break;
      } else if (detail.textContent.trim()) {
        contentCell = detail;
        break;
      }
    }
    // Add the row
    rows.push([
      titleCell,
      contentCell
    ]);
  });

  // Create the block table and replace
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
