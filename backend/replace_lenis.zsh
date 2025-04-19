#!/usr/bin/env zsh

find . -type f \( -name '*.html' -o -name '*.jinja' \) -exec perl -0777 -i -pe '
  s{
    <script\ type="text/javascript"\ src="\{\{url_for\(static,\ filename=js/lenis\.js\)\}\}"></script>\s*
    <script>.*?requestAnimationFrame\(raf\);\s*</script>
  }{<script
            type="text/javascript"
            src="{{url_for('\''static'\'', filename='\''js/lenis.js'\'')}}"
        ></script>
        <script>
            const lenis = new Lenis({
                duration: 0.1,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                smooth: true,
            });
            function raf(time) {
                lenis.raf(time);
                requestAnimationFrame(raf);
            }
            requestAnimationFrame(raf);
        </script>
  }gsx
' {} +
