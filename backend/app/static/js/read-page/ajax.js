const _0xf538d6 = _0x308e;
function _0x308e(_0x459acc, _0x21ac32) {
  const _0x471465 = _0x4714();
  return (
    (_0x308e = function (_0x308e23, _0xcb611e) {
      _0x308e23 = _0x308e23 - 0x1b8;
      let _0x25bdd7 = _0x471465[_0x308e23];
      return _0x25bdd7;
    }),
    _0x308e(_0x459acc, _0x21ac32)
  );
}
(function (_0x6cf994, _0x57506e) {
  const _0x5483ff = _0x308e,
    _0x4d6b4f = _0x6cf994();
  while (!![]) {
    try {
      const _0x183443 =
        -parseInt(_0x5483ff(0x1d9)) / 0x1 +
        parseInt(_0x5483ff(0x1bf)) / 0x2 +
        (parseInt(_0x5483ff(0x1d6)) / 0x3) *
          (parseInt(_0x5483ff(0x1b8)) / 0x4) +
        (parseInt(_0x5483ff(0x1c1)) / 0x5) *
          (-parseInt(_0x5483ff(0x1c9)) / 0x6) +
        (parseInt(_0x5483ff(0x1d4)) / 0x7) *
          (-parseInt(_0x5483ff(0x1d2)) / 0x8) +
        (-parseInt(_0x5483ff(0x1bc)) / 0x9) *
          (-parseInt(_0x5483ff(0x1c3)) / 0xa) +
        -parseInt(_0x5483ff(0x1c8)) / 0xb;
      if (_0x183443 === _0x57506e) break;
      else _0x4d6b4f["push"](_0x4d6b4f["shift"]());
    } catch (_0x3f769a) {
      _0x4d6b4f["push"](_0x4d6b4f["shift"]());
    }
  }
})(_0x4714, 0x66a71);
function _0x4714() {
  const _0x188793 = [
    "6CfuBYc",
    "then",
    "opacity",
    "temporary-message",
    "textContent",
    "none",
    "fileter",
    "addEventListener",
    "application/json",
    "19512OLkpUT",
    "ajax_p",
    "679RvhMwU",
    "DOMContentLoaded",
    "1500531vNDtNw",
    "classList",
    "error",
    "48188PZJzbb",
    "getElementById",
    "message",
    "add",
    "body",
    "4YbcPrE",
    "stringify",
    "remove",
    "appendChild",
    "45sPgFqk",
    "createElement",
    "ajax_img",
    "503254MMjtXx",
    "POST",
    "50005AMlsDi",
    "grayscale(100%)",
    "1362310lvjutF",
    "style",
    "src",
    "pointerEvents",
    "innerHTML",
    "7894942NOiUSE",
  ];
  _0x4714 = function () {
    return _0x188793;
  };
  return _0x4714();
}
function displayMessage(_0x11e7e2, _0x1012a4) {
  const _0x32d28d = _0x308e,
    _0x146c61 = document[_0x32d28d(0x1bd)]("div");
  _0x146c61[_0x32d28d(0x1d7)][_0x32d28d(0x1dc)](_0x32d28d(0x1cc)),
    _0x1012a4 && _0x146c61[_0x32d28d(0x1d7)][_0x32d28d(0x1dc)](_0x1012a4),
    (_0x146c61[_0x32d28d(0x1cd)] = _0x11e7e2),
    document[_0x32d28d(0x1dd)][_0x32d28d(0x1bb)](_0x146c61),
    setTimeout(() => {
      const _0x5320ec = _0x32d28d;
      _0x146c61[_0x5320ec(0x1ba)]();
    }, 0xbb8);
}
document["addEventListener"](_0xf538d6(0x1d5), () => {
  const _0xfc9355 = _0xf538d6,
    _0x4ab736 = document["getElementById"]("summary"),
    _0xaa9c86 = document[_0xfc9355(0x1da)](_0xfc9355(0x1d3)),
    _0x5b92e8 = document[_0xfc9355(0x1da)](_0xfc9355(0x1be));
  _0x4ab736[_0xfc9355(0x1d0)]("click", () => {
    const _0x1475cd = _0xfc9355;
    var _0x59193f = _0xaa9c86[_0x1475cd(0x1cd)];
    fetch("/make_summary", {
      method: _0x1475cd(0x1c0),
      headers: { "Content-Type": _0x1475cd(0x1d1) },
      body: JSON[_0x1475cd(0x1b9)]({
        imgUrl: _0x5b92e8[_0x1475cd(0x1c5)],
        textToSummarise: _0x59193f,
      }),
    })
      [_0x1475cd(0x1ca)]((_0x30f235) => _0x30f235["json"]())
      [_0x1475cd(0x1ca)]((_0x5e5312) => {
        const _0x436f99 = _0x1475cd;
        if (_0x5e5312[_0x436f99(0x1d8)])
          displayMessage(_0x5e5312[_0x436f99(0x1d8)], _0x436f99(0x1d8));
        else
          _0x5e5312[_0x436f99(0x1db)]
            ? displayMessage(_0x5e5312[_0x436f99(0x1db)], _0x436f99(0x1db))
            : (_0xaa9c86[_0x436f99(0x1c7)] = _0x5e5312["summary"]);
      })
      ["catch"]((_0x4480d1) => {
        const _0x136953 = _0x1475cd;
        displayMessage(_0x4480d1, _0x136953(0x1d8)),
          console["error"]("Error:", _0x4480d1);
      })
      ["finally"](() => {
        const _0x48b0c7 = _0x1475cd;
        (_0x4ab736[_0x48b0c7(0x1c4)][_0x48b0c7(0x1c6)] = _0x48b0c7(0x1ce)),
          (_0x4ab736[_0x48b0c7(0x1c4)][_0x48b0c7(0x1cb)] = 0.5),
          (_0x4ab736["style"][_0x48b0c7(0x1cf)] = _0x48b0c7(0x1c2));
      });
  });
});
