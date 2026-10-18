// 禁用IOS双指缩放和双击缩放, 安卓则不需要下面这个段代码
(function () {
  var isIOS = /iphone|ipad/i.test(navigator.userAgent.toLowerCase());

  if (isIOS) {
    // 禁用双指缩放
    document.documentElement.addEventListener(
      "touchstart",
      function (event) {
        if (event.touches.length > 1) {
          event.preventDefault();
        }
      },
      false,
    );

    // 禁用双击缩放
    var lastTouchEnd = 0;
    document.documentElement.addEventListener(
      "touchend",
      function (event) {
        var now = Date.now();
        if (now - lastTouchEnd <= 300) {
          event.preventDefault();
        }
        lastTouchEnd = now;
      },
      false,
    );
  }
  const preventGesture = e => e.preventDefault();
  document.addEventListener("gesturestart", preventGesture);
  document.addEventListener("gesturechange", preventGesture);
  document.addEventListener("gestureend", preventGesture);
  document.addEventListener(
    "touchmove",
    e => {
      if (e.scale && e.scale !== 1) {
        e.preventDefault();
      }
    },
    { passive: false },
  );
})();
