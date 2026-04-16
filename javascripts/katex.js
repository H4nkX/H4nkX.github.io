function renderMath() {
  var mathElements = document.querySelectorAll(".arithmatex:not(.katex-rendered)");
  for (var i = 0; i < mathElements.length; i++) {
    var tex = mathElements[i].textContent || mathElements[i].innerText;
    if (!tex) continue;
    
    // 判断是否为块级公式
    var isBlock = mathElements[i].tagName === "DIV" || 
                  tex.indexOf("$$") === 0 ||
                  tex.indexOf("\\[") === 0;
    
    // 清理各种定界符
    tex = tex.replace(/^\$\$|\$\$$/g, "");           // $$
    tex = tex.replace(/^\\\[|\\\]$/g, "");           // \[ \]
    tex = tex.replace(/^\\\(|\\\)$/g, "");           // \( \)
    tex = tex.replace(/^\$|\$$/g, "");               // $
    
    try {
      mathElements[i].innerHTML = katex.renderToString(tex, {
        displayMode: isBlock,
        throwOnError: false
      });
      // 标记为已渲染，防止重复渲染
      mathElements[i].classList.add("katex-rendered");
    } catch (e) {
      console.log("KaTeX render failed: " + e.message);
    }
  }
}

document.addEventListener("DOMContentLoaded", renderMath);
window.addEventListener("load", function() {
  setTimeout(renderMath, 300);
});
