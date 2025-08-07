/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the accordionDiv
  const accordionDiv = element.querySelector('.accordionDiv');
  if (!accordionDiv) return;

  // Get all direct accordion panels
  const panels = accordionDiv.querySelectorAll(':scope > .MuiPaper-root, :scope > .accordion');
  const rows = [['Accordion']]; // Header row

  panels.forEach(panel => {
    // Title cell: Find the p inside the summary
    let questionEl = null;
    const summary = panel.querySelector('.MuiAccordionSummary-content, .MuiAccordionSummary-contentGutters');
    if (summary) {
      questionEl = summary.querySelector('p') || summary;
    }
    if (!questionEl) {
      // Fallback to panel text
      questionEl = document.createTextNode(panel.textContent.trim());
    }

    // Content cell: Find the answer/expanded content
    let answerEl = null;
    // Find the details span.expandContent or the container of the answer
    const details = panel.querySelector('.MuiAccordionDetails-root .expandContent');
    if (details) {
      // Only grab the main <p> or the expandContent span
      const p = details.querySelector('p');
      answerEl = p ? p : details;
    }
    // Fallback to an empty cell
    if (!answerEl) {
      answerEl = document.createTextNode('');
    }
    rows.push([questionEl, answerEl]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
