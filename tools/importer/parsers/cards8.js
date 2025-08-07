/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children by selector
  function getDirectChildren(parent, selector) {
    return Array.from(parent.children).filter(el => el.matches(selector));
  }

  // Header row as specified in the example
  const rows = [['Cards (cards8)']];

  // Find the track containing the cards
  const track = element.querySelector('.slick-track');
  if (!track) return;

  // Each .slick-slide is a card
  const slides = Array.from(track.children).filter(el => el.classList.contains('slick-slide'));

  slides.forEach(slide => {
    // Find the <a> inside the card
    const a = slide.querySelector('a[href]');
    if (!a) return; // skip if not found

    // IMAGE: find the .blog-card-img-container > img
    let img = a.querySelector('.blog-card-img-container img');
    if (!img) return; // skip if no main image

    // TEXT cell: build content from DOM
    // 1. Label (optional)
    const labelP = a.querySelector('.smallImageDiv .name');
    // 2. Date (optional)
    const dateDiv = a.querySelector('.bottomText .text');
    // 3. Title (mandatory)
    const titleDiv = a.querySelector('.bigText');

    // Compose the text cell
    const textCell = document.createElement('div');
    textCell.style.display = 'flex';
    textCell.style.flexDirection = 'column';
    textCell.style.gap = '0.25em';

    if (labelP) {
      const label = document.createElement('p');
      label.textContent = labelP.textContent.trim();
      label.style.fontWeight = 'bold';
      label.style.fontSize = '1em';
      label.style.margin = '0';
      textCell.appendChild(label);
    }
    if (dateDiv) {
      const date = document.createElement('p');
      date.textContent = dateDiv.textContent.trim();
      date.style.fontSize = '0.9em';
      date.style.color = '#888';
      date.style.margin = '0';
      textCell.appendChild(date);
    }
    if (titleDiv) {
      const title = document.createElement('p');
      title.innerHTML = `<strong>${titleDiv.textContent.trim()}</strong>`;
      title.style.margin = '0';
      textCell.appendChild(title);
    }

    // Additional: If none of these, fallback to all text in the card
    if (!labelP && !dateDiv && !titleDiv) {
      textCell.textContent = a.textContent.trim();
    }

    rows.push([img, textCell]);
  });

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
