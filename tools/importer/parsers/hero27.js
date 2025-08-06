/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must exactly match: 'Hero (hero27)'
  const headerRow = ['Hero (hero27)'];

  // Get the first image in the block (background image)
  const img = element.querySelector('img');

  // Find content container (headings, subheading, button)
  const contentContainer = element.querySelector('.content-font-container');

  // Second row: image only, or null if not found
  const imageRow = [img || ''];

  // Third row: Title (as heading), Subheading (as p), CTA (as a link)
  const content = [];
  if (contentContainer) {
    // Title
    const heading = contentContainer.querySelector('.right-heading');
    if (heading) {
      // Use as h1 since it's the main hero heading
      const h1 = document.createElement('h1');
      h1.textContent = heading.textContent;
      content.push(h1);
    }
    // Subheading
    const subheading = contentContainer.querySelector('.right-content-font');
    if (subheading) {
      // Make it a p tag
      const p = document.createElement('p');
      p.textContent = subheading.textContent;
      content.push(p);
    }
    // CTA button (convert to a link, preserve text and aria-label if any)
    const button = contentContainer.querySelector('button');
    if (button) {
      const a = document.createElement('a');
      a.textContent = button.textContent;
      a.href = '#';
      if (button.hasAttribute('aria-label')) {
        a.setAttribute('aria-label', button.getAttribute('aria-label'));
      }
      // Optionally add button classes for style reference
      if (button.className) {
        a.className = button.className;
      }
      content.push(a);
    }
  }
  const contentRow = [content.length ? content : ''];

  // Compose block table (1 column, 3 rows: header, image, content)
  const cells = [
    headerRow,
    imageRow,
    contentRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
