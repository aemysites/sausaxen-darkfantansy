/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare header row as per example
  const headerRow = ['Cards (cards29)'];
  const rows = [];
  // Each card is a .directions-detail-container
  const cards = element.querySelectorAll('.directions-detail-container');
  cards.forEach(card => {
    // --- First cell: the duration container (icon + text)
    let imageCell = '';
    const duration = card.querySelector('.duration-container');
    if (duration) imageCell = duration;
    // --- Second cell: all text content (title + paragraphs)
    const detail = card.querySelector('.directions-detail-text-container');
    const cellContent = [];
    if (detail) {
      // Title
      const title = detail.querySelector('.directions-heading-font');
      if (title && title.textContent.trim()) {
        const strong = document.createElement('strong');
        strong.textContent = title.textContent.trim();
        cellContent.push(strong);
        cellContent.push(document.createElement('br'));
      }
      // All paragraphs in .directions-detail-font
      const descSpan = detail.querySelector('.directions-detail-font');
      if (descSpan) {
        descSpan.querySelectorAll('p').forEach(p => {
          if (p.textContent && p.textContent.trim() && p.textContent.trim() !== '\u00A0') {
            cellContent.push(p);
          }
        });
      }
    }
    // Add video CTA as a link if present
    const video = card.querySelector('video');
    if (video) {
      const source = video.querySelector('source');
      if (source && source.src) {
        cellContent.push(document.createElement('br'));
        const a = document.createElement('a');
        a.href = source.src;
        a.textContent = 'Watch Step';
        cellContent.push(a);
      }
    }
    // Remove trailing <br>
    while (cellContent.length > 0 && cellContent[cellContent.length-1].tagName === 'BR') {
      cellContent.pop();
    }
    rows.push([imageCell, cellContent]);
  });
  const tableCells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(table);
}
