/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare table cells: header
  const rows = [['Carousel (carousel3)']];

  // Select all slides (direction steps)
  const slides = element.querySelectorAll(':scope > .set-width > .directions-detail-container');

  slides.forEach((slide) => {
    // --- First cell: video link (per requirements: must not use video/embed, just the link) ---
    let mediaCell = '';
    const video = slide.querySelector('video');
    if (video) {
      const source = video.querySelector('source');
      if (source && source.src) {
        const a = document.createElement('a');
        a.href = source.src;
        a.textContent = source.src;
        a.target = '_blank';
        mediaCell = a;
      }
    }

    // --- Second cell: All text (heading, duration, directions) ---
    const textCellArr = [];
    const textContainer = slide.querySelector('.directions-detail-text-container');
    if (textContainer) {
      // Heading
      const heading = textContainer.querySelector('.directions-heading-font');
      if (heading && heading.textContent.trim()) {
        const h2 = document.createElement('h2');
        h2.textContent = heading.textContent.trim();
        textCellArr.push(h2);
      }
      // Duration (get text node after the img in .duration-container)
      const durationDiv = textContainer.querySelector('.duration-container');
      if (durationDiv) {
        let got = false;
        durationDiv.childNodes.forEach((node) => {
          if (got) return;
          if (node.nodeType === 3 && node.textContent.trim()) {
            const p = document.createElement('p');
            p.textContent = node.textContent.trim();
            textCellArr.push(p);
            got = true;
          }
        });
      }
      // Main instructions (from .directions-detail-font)
      const detailFont = textContainer.querySelector('.directions-detail-font');
      if (detailFont) {
        Array.from(detailFont.children).forEach(child => {
          // Only add <ul>, <ol>, or <p> that have text/child elements
          if ((child.tagName === 'UL' || child.tagName === 'OL') && child.children.length > 0) {
            textCellArr.push(child);
          } else if (child.tagName === 'P' && child.textContent.trim()) {
            textCellArr.push(child);
          }
        });
      }
    }
    // Always ensure both cells (media, text) are present for this row
    rows.push([
      mediaCell,
      textCellArr.length > 0 ? textCellArr : ''
    ]);
  });
  // Create table & replace element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
