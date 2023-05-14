console.log("%cSPA%c🔄 %cStarted...", "background-color: orange; color: white; padding: 1px 5px; border-radius: 3px; font-weight: bold", "", "font-weight: bold");

async function loadScript(scriptUrl) {
  console.log(`%cSPA%c🔄 %cLoading:%c ${new URL(scriptUrl).host}`, "background-color: orange; color: white; padding: 1px 5px; border-radius: 3px; font-weight: bold", "", "font-weight: bold", "font-style: italic;");
  await new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = scriptUrl;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
  console.log(`%cSPA%c✅ %c Loaded:%c ${new URL(scriptUrl).host}`, "background-color: green; color: white; padding: 1px 5px; border-radius: 3px; font-weight: bold", "", "font-weight: bold", "font-style: italic;");
}

async function loadScripts(scripts) {
  for (const script of scripts) {
    await loadScript(script);
  }
}

async function main() {
  // Create and show the loading overlay
  const loadingOverlay = document.createElement('div');
  loadingOverlay.id = 'loading-overlay';
  loadingOverlay.innerHTML = `
    <style>
      #loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgb(10, 10, 15);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .spinner {
        border: 10px solid #3c3b41;
        border-bottom: 10px solid #646eff;
        border-radius: 50%;
        filter: blur(1px);
        width: 120px;
        height: 120px;
        animation: spin 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    </style>
    <div class="spinner"></div>
  `;
  document.body.append(loadingOverlay);

  // Load scripts and parse markdown content
  const scripts = [
    "https://cdnjs.cloudflare.com/ajax/libs/showdown/1.9.1/showdown.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/highlight.min.js"
  ];
  
  await loadScripts(scripts);
  const markdownBlocks = document.querySelectorAll('pre.markdown');
  const converter = new showdown.Converter();
  markdownBlocks.forEach((block) => {
      block.innerHTML = converter.makeHtml(block.textContent);
  });
  hljs.highlightAll();
  
  // Hide and remove the loading overlay
  await new Promise(resolve => setTimeout(resolve, 250));
  loadingOverlay.style.display = 'none';
  loadingOverlay.remove();

  console.log("%cSPA%c✅ %cAll done!", "background-color: green; color: white; padding: 1px 5px; border-radius: 3px; font-weight: bold", "", "font-weight: bold");
}

main();
