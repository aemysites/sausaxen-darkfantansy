/*
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* eslint-disable no-console */
(() => {
    const mainElement = document.querySelector('main.main.left-nav-column, main.main.all-three-column');
    if (mainElement) {
      mainElement.style.flexDirection = 'column';
  
      // make all direct children span the full width
      Array.from(mainElement.children).forEach((child) => {
        child.style.width = '100%';
      });
    }
  
    // remove slide-out librarian element if present
    document.getElementById('lcs_slide_out-11923')?.remove();
  
    // remove offline chatwidget
    document.querySelector('[aria-label="Chat Widget"]')?.remove();

    // remove login popup container if present (e.g., on foodiesonly.in)
    document.querySelector('.login-popup-container')?.remove();
  
    // selectors we always want removed
    const UNWANTED_SELECTORS = [
      '.left-nav',
      'header.header',
      'footer.footer',
      // FoodiesOnly specific header / footer selectors
      '.navbar',
      'div[class^="footer_"]', // footer element has hashed BEM/CSS-module class starting with footer_
    ];

    const removeUnwanted = () => {
      UNWANTED_SELECTORS.forEach((selector) => {
        document.querySelectorAll(selector).forEach((el) => el.remove());
      });
    };

    // run once immediately
    removeUnwanted();

    // keep watching – some sites re-inject these elements on scroll / route change
    const observer = new MutationObserver(() => {
      removeUnwanted();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  })();