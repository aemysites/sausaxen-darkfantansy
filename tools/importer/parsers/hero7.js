/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must match the example exactly
  const headerRow = ['Hero (hero7)'];

  // 2nd row: background image (none in these HTMLs, so empty)
  const bgRow = [''];

  // 3rd row: Headline content
  // Strategy: Build a heading element that preserves the headline with the highlighted (box) segment in <strong>.
  const headingTextParent = element.querySelector('.heading-text-parent');
  let headlineElem;

  if (headingTextParent) {
    const headingText = headingTextParent.querySelector('.heading-text');
    if (headingText) {
      // We'll wrap the whole thing in a <h1> for semantics
      headlineElem = document.createElement('h1');
      Array.from(headingText.childNodes).forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('box-container')) {
          // Get the bolded word
          const box = node.querySelector('.green-shadow-box');
          if (box) {
            const strong = document.createElement('strong');
            strong.textContent = box.textContent;
            headlineElem.appendChild(strong);
          }
        } else {
          // Text nodes and spans (for before/after parts)
          headlineElem.appendChild(document.createTextNode(node.textContent));
        }
      });
    }
  }

  // Fallback if parsing failed, use the textContent
  if (!headlineElem) {
    headlineElem = document.createElement('h1');
    headlineElem.textContent = element.textContent.trim();
  }

  const contentRow = [[headlineElem]];

  // Compose the table structure: 1 col, 3 rows
  const cells = [
    headerRow,
    bgRow,
    contentRow[0]
  ];
  
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
