var container = document.querySelector("#unity-container");
      var canvas = document.querySelector("#unity-canvas");
      var loadingBar = document.querySelector("#unity-loading-bar");
      var warningBanner = document.querySelector("#unity-warning");

      function unityShowBanner(msg, type)
      {
          function updateBannerVisibility()
          {
            warningBanner.style.display = warningBanner.children.length ? 'block' : 'none';
          }
        var div = document.createElement('div');
        div.innerHTML = msg;
        warningBanner.appendChild(div);
        if (type == 'error')
        {
          div.style = 'background: red; padding: 10px;';
        }
        else 
        {
          if (type == 'warning') div.style = 'background: yellow; padding: 10px;';
          setTimeout(function() 
          {
            warningBanner.removeChild(div);
            updateBannerVisibility();
          }, 5000);
        }
        updateBannerVisibility();
      }

      var buildUrl = "Build";
      var loaderUrl = buildUrl + "/ArchvizApp.loader.js";
      var config = {
        dataUrl: buildUrl + "/ArchvizApp.data",
        frameworkUrl: buildUrl + "/ArchvizApp.framework.js",
        codeUrl: buildUrl + "/ArchvizApp.wasm",
        streamingAssetsUrl: "StreamingAssets",
        companyName: "DefaultCompany",
        productName: "WebGLProject",
        productVersion: "0.1",
        showBanner: unityShowBanner,
      };

      // By default, Unity keeps WebGL canvas render target size matched with
      // the DOM size of the canvas element (scaled by window.devicePixelRatio)
      // Set this to false if you want to decouple this synchronization from
      // happening inside the engine, and you would instead like to size up
      // the canvas DOM size and WebGL render target sizes yourself.
      // config.matchWebGLToCanvasSize = false;

      canvas.style.width = "100%";
      canvas.style.height = "100%";
      loadingBar.style.display = "block";
      
      var script = document.createElement("script");
      script.src = loaderUrl;
      script.onload = () => { createUnityInstance(canvas, config).then((unityInstance) => {
              Unity = unityInstance
              loadingBar.style.display = "none";
            }).catch((message) => {
              alert(message);
            });
          };

      document.body.appendChild(script);