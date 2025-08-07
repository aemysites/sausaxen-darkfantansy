/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per block specification
  const headerRow = ['Search'];

  // Create a container to hold all content (to retain structure and text)
  const content = document.createElement('div');
  // Move all children (not just direct children elements, but also text nodes) into our content container
  while (element.firstChild) {
    content.appendChild(element.firstChild);
  }

  // Table: header, then all original content (which contains all structure and text, preserving semantic meaning)
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    [content],
  ], document);

  element.replaceWith(table);
}
