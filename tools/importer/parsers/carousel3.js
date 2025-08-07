/* global WebImporter */
export default function parse(element, { document }) {
  // Header row - must match exactly from instructions
  const headerRow = ['Carousel (carousel3)'];

  // Find all the slide containers
  const stepContainers = element.querySelectorAll(':scope > .set-width > .directions-detail-container');

  const rows = [headerRow];

  stepContainers.forEach((step) => {
    // --- IMAGE/VIDEO COLUMN --- //
    // Each step contains a video with a <source src> (mandatory for carousel)
    let media = '';
    const video = step.querySelector('video');
    if (video) {
      // Reference the actual video element in the DOM
      media = video;
    }

    // --- TEXT COLUMN --- //
    const textContent = [];
    const textContainer = step.querySelector('.directions-detail-text-container');
    if (textContainer) {
      // Heading (p.directions-heading-font)
      const heading = textContainer.querySelector('.directions-heading-font');
      if (heading && heading.textContent.trim()) {
        // Use h2 for semantic heading, reference text
        const h2 = document.createElement('h2');
        h2.textContent = heading.textContent.trim();
        textContent.push(h2);
      }
      // Duration (div.duration-container) -> just the text (skip img)
      const duration = textContainer.querySelector('.duration-container');
      if (duration) {
        let durationText = '';
        Array.from(duration.childNodes).forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) durationText += node.textContent;
        });
        if (durationText.trim()) {
          const p = document.createElement('p');
          p.textContent = durationText.trim();
          textContent.push(p);
        }
      }
      // Description body (span.directions-detail-font)
      const spanDetail = textContainer.querySelector('span.directions-detail-font');
      if (spanDetail) {
        // Add all child elements (p, ul, ol, etc.) if non-empty
        Array.from(spanDetail.children).forEach((child) => {
          if (child.textContent.trim()) textContent.push(child);
        });
      }
    }
    // If no text, cell is empty string for compatibility
    rows.push([
      media,
      textContent.length ? textContent : ''
    ]);
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
