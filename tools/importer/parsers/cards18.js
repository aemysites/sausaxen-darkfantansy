/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as specified
  const headerRow = ['Cards (cards18)'];
  const rows = [headerRow];

  // Find all card slides; each .slick-slide is a card
  const slides = element.querySelectorAll('.slick-slide');

  slides.forEach((slide) => {
    // Get image (first <img> descendant)
    const img = slide.querySelector('img');
    // Get card title from .orange-shadow-box
    const titleBox = slide.querySelector('.orange-shadow-box');
    // Get card description (first <p> in .description-font)
    const descSpan = slide.querySelector('.description-font');
    const descP = descSpan ? descSpan.querySelector('p') : null;

    // Compose the text content cell
    const textCell = [];
    // Use <strong> for title to represent heading
    if (titleBox && titleBox.textContent.trim()) {
      const strong = document.createElement('strong');
      strong.textContent = titleBox.textContent.trim();
      textCell.push(strong);
      // Add a line break between title and description if both exist
      if (descP && descP.textContent.trim()) {
        textCell.push(document.createElement('br'));
      }
    }
    if (descP && descP.textContent.trim()) {
      // Preserve <i> for italics if present
      // Reference the existing <p> element rather than cloning
      textCell.push(descP);
    }
    // If there is no description, but a title, keep just the title
    // If neither, cell will be empty

    // Add row: [image, textCell]
    rows.push([
      img,
      textCell
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
