/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main scroll view container
  const scrollView = element.querySelector('.timestampsScrollView');
  if (!scrollView) return;

  // Get all direct children of scrollView that contain a .timeStampContainer (these are cards)
  const cardCandidates = Array.from(scrollView.querySelectorAll(':scope > div'));
  const cardDivs = cardCandidates.filter(div => div.querySelector('.timeStampContainer'));

  // Prepare the table rows
  const rows = [['Cards (cards21)']]; // Header row as per block name

  cardDivs.forEach(cardWrap => {
    const card = cardWrap.querySelector('.timeStampContainer');
    if (!card) return;
    // Image: .timestampThumbnail img
    const img = card.querySelector('img.timestampThumbnail');
    // Text content block
    const contentFragment = document.createElement('div');
    // Time (as bold text, on top)
    const timeSpan = card.querySelector('.timeBoxContainer .timeBox span');
    if (timeSpan && timeSpan.textContent.trim()) {
      const boldTime = document.createElement('b');
      boldTime.textContent = timeSpan.textContent.trim();
      contentFragment.appendChild(boldTime);
      contentFragment.appendChild(document.createElement('br'));
    }
    // Title
    const title = card.querySelector('.timestampTitle');
    if (title && title.textContent.trim()) {
      const h4 = document.createElement('h4');
      h4.textContent = title.textContent.trim();
      contentFragment.appendChild(h4);
    }
    // Subtitle/Description
    const subtitle = card.querySelector('.timestampSubtitle');
    if (subtitle && subtitle.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = subtitle.textContent.trim();
      contentFragment.appendChild(p);
    }
    rows.push([img, contentFragment]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
