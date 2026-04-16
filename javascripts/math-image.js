// WebView 友好的数学公式渲染方案
// 使用 KaTeX 渲染公式为 SVG，确保在移动端 WebView 中正常显示

(function() {
  'use strict';

  // 等待 KaTeX 加载完成
  function waitForKaTeX(callback) {
    if (typeof katex !== 'undefined') {
      callback();
    } else {
      setTimeout(function() {
        waitForKaTeX(callback);
      }, 100);
    }
  }

  // 渲染单个公式
  function renderFormula(element) {
    var tex = element.textContent || element.innerText;
    if (!tex) return;

    // 检查是否已经渲染
    if (element.getAttribute('data-rendered') === 'true') return;

    // 判断是否为块级公式
    var isBlock = element.tagName === 'DIV' ||
                  tex.indexOf('$$') === 0 ||
                  tex.indexOf('\\[') === 0;

    // 清理定界符
    tex = tex.replace(/^\$\$|\$\$$/g, '');
    tex = tex.replace(/^\\\[|\\\]$/g, '');
    tex = tex.replace(/^\\\(|\\\)$/g, '');
    tex = tex.replace(/^\$|\$$/g, '');

    try {
      // 使用 KaTeX 渲染为 HTML
      var html = katex.renderToString(tex, {
        displayMode: isBlock,
        throwOnError: false,
        trust: true
      });

      // 创建容器
      var container = document.createElement('span');
      container.innerHTML = html;
      container.style.display = isBlock ? 'block' : 'inline-block';
      container.style.verticalAlign = 'middle';

      // 清空原元素并添加渲染结果
      element.innerHTML = '';
      element.appendChild(container);
      element.setAttribute('data-rendered', 'true');
      element.style.border = 'none';
      element.style.background = 'transparent';

    } catch (e) {
      console.error('Formula render error:', e.message, tex);
      // 渲染失败时显示原始文本
      element.style.color = '#cc0000';
      element.title = '渲染失败: ' + e.message;
    }
  }

  // 渲染所有公式
  function renderAllFormulas() {
    var elements = document.querySelectorAll('.arithmatex');
    for (var i = 0; i < elements.length; i++) {
      renderFormula(elements[i]);
    }
  }

  // 多次尝试渲染，确保 WebView 中加载完成
  function init() {
    waitForKaTeX(function() {
      // 立即渲染
      renderAllFormulas();

      // DOM 加载完成后再次渲染
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderAllFormulas);
      }

      // 页面完全加载后再次渲染
      window.addEventListener('load', function() {
        setTimeout(renderAllFormulas, 100);
        setTimeout(renderAllFormulas, 500);
        setTimeout(renderAllFormulas, 1000);
      });

      // 监听动态内容变化
      if (typeof MutationObserver !== 'undefined') {
        var observer = new MutationObserver(function(mutations) {
          var hasNewMath = false;
          for (var i = 0; i < mutations.length; i++) {
            var nodes = mutations[i].addedNodes;
            for (var j = 0; j < nodes.length; j++) {
              if (nodes[j].nodeType === 1) {
                if (nodes[j].classList && nodes[j].classList.contains('arithmatex')) {
                  hasNewMath = true;
                } else if (nodes[j].querySelector && nodes[j].querySelector('.arithmatex')) {
                  hasNewMath = true;
                }
              }
            }
          }
          if (hasNewMath) {
            setTimeout(renderAllFormulas, 100);
          }
        });

        observer.observe(document.body, {
          childList: true,
          subtree: true
        });
      }
    });
  }

  // 启动
  init();
})();
