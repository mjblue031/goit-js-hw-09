!function(){var t=document.getElementById("startbutton"),e=document.getElementById("stopbutton"),n="";t.addEventListener("click",(function(){t.disabled=!0,e.disabled=!1,n=setInterval((function(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}),1e3)})),e.addEventListener("click",(function(){t.disabled=!1,e.disabled=!0,clearInterval(n)}))}();
//# sourceMappingURL=01-color-switcher.8553301d.js.map