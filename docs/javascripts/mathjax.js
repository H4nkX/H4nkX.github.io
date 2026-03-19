MathJax = {
  tex: {
    inlineMath: [["$", "$"], ["\\(", "\\)"]],
    displayMath: [["$$", "$$"], ["\\[", "\\]"]],
    processEscapes: true,
    processEnvironments: true
  },
  options: {
    ignoreHtmlClass: ".*|",
    processHtmlClass: "arithmatex"
  },
  startup: {
    pageReady: () => {
      return MathJax.startup.defaultPageReady();
    }
  }
};

function renderMath() {
  if (typeof MathJax !== 'undefined' && MathJax.typesetPromise) {
    MathJax.typesetPromise().catch(function(err) {
      console.log('MathJax typeset failed: ' + err.message);
    });
  }
}

if (typeof document$ !== 'undefined') {
  document$.subscribe(() => {
    renderMath();
  });
}

document.addEventListener('DOMContentLoaded', function() {
  setTimeout(renderMath, 100);
});

window.addEventListener('load', function() {
  setTimeout(renderMath, 200);
});
