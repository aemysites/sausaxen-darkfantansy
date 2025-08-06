/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row exactly as specified
  const headerRow = ['Cards (cards18)'];

  // Find the track that contains the cards
  const track = element.querySelector('.slick-track');
  const cardDivs = track ? Array.from(track.children) : [];

  const rows = [headerRow];

  cardDivs.forEach((cardDiv) => {
    // Find the card's image (required)
    const img = cardDiv.querySelector('img');
    // Find the card's title (Plating, Pairing, Garnishing)
    const titleBox = cardDiv.querySelector('.orange-shadow-box');

    // We'll use a <strong> for the title just as the example uses a bold heading
    let title = null;
    if (titleBox && titleBox.textContent.trim()) {
      title = document.createElement('strong');
      title.textContent = titleBox.textContent.trim();
    }

    // Find the card's description (inside .description-font > p)
    const descFont = cardDiv.querySelector('.description-font');
    let desc = null;
    if (descFont) {
      // Use the existing <p> (with <i> if present)
      const p = descFont.querySelector('p');
      if (p) {
        desc = p;
      } else {
        desc = descFont;
      }
    }

    // Compose the text cell: title (strong), <br>, description (if both)
    // Only existing elements, no cloning
    const textCell = [];
    if (title) textCell.push(title);
    if (title && desc) textCell.push(document.createElement('br'));
    if (desc) textCell.push(desc);

    rows.push([
      img || '',
      textCell.length ? textCell : ''
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
