import React from 'react';
import ReactDOM from 'react-dom/client';
import { AdvertisementWidget } from './components/AdvertisementWidget';
import styles from './index.css?inline';

class NexaCoreAdElement extends HTMLElement {
  private root: ReactDOM.Root | null = null;

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    
    // Inject styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    shadow.appendChild(styleSheet);
    
    // Create container
    const container = document.createElement('div');
    shadow.appendChild(container);
    
    // Render React component
    this.root = ReactDOM.createRoot(container);
    this.root.render(
      <React.StrictMode>
        <AdvertisementWidget />
      </React.StrictMode>
    );
  }

  disconnectedCallback() {
    if (this.root) {
      this.root.unmount();
      this.root = null;
    }
  }
}

// Register the custom element
if (!customElements.get('nexacore-ad')) {
  customElements.define('nexacore-ad', NexaCoreAdElement);
}

export { NexaCoreAdElement };
