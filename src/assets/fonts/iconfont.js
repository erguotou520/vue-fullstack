;(function(window) {

var svgSprite = '<svg>' +
  ''+
    '<symbol id="icon-refresh" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M938.336973 255.26894c-16.685369-6.020494-35.090879 2.752226-40.939358 19.437594l-24.770032 69.493701c-29.070385-65.537376-74.998152-123.162103-133.48295-166.337645-185.947253-137.611288-450.848984-100.112212-590.180413 83.942886C81.534688 350.908785 52.980346 460.653788 68.805644 570.742819c15.825298 110.605073 74.48211 208.481102 164.789518 275.394591 75.686209 55.904586 164.273476 83.082815 252.172686 83.082815 128.494541 0 255.26894-57.624727 338.007727-166.853687 36.639006-48.335965 61.581052-102.348396 74.48211-160.833193 3.78431-17.373425-7.224593-34.402822-24.426004-38.187133-17.201411-3.78431-34.402822 7.052579-38.187133 24.426004-10.836889 49.36805-31.994625 95.123803-62.957164 135.891147-118.173694 156.016798-342.996136 187.839409-500.90509 70.869814-76.546279-56.592642-126.086343-139.33143-139.503444-232.907106-13.417101-93.059634 10.664875-185.775239 67.77356-261.11742C318.05409 144.491853 542.704519 112.497228 700.785486 229.466823c57.280699 42.315471 100.112212 100.972283 123.334117 167.197715l-110.261045-43.003528c-16.513355-6.364522-35.090879 1.720141-41.627415 18.233496-6.536536 16.513355 1.720141 35.090879 18.233496 41.627415l162.38132 63.473207c3.78431 1.548127 7.740635 2.236183 11.69696 2.236183 0.516042 0 1.032085-0.172014 1.548127-0.172014 1.204099 0.172014 2.408198 0.688056 3.612296 0.688056 13.245087 0 25.630102-8.256677 30.274483-21.32975l57.796741-161.693264C963.623047 279.694944 955.022342 261.289434 938.336973 255.26894z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-last-page" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M576.056 479.964l-324.764-324.873c-16.53-16.53-43.32-16.53-59.852 0-16.53 16.53-16.53 43.321 0 59.852l295.944 296.010-295.91 295.879c-16.53 16.53-16.53 43.32 0 59.852 8.262 8.267 19.093 12.398 29.924 12.398s21.661-4.132 29.929-12.398l325.872-325.836c16.526-16.531 16.526-43.321 0-59.852-0.367-0.367-0.764-0.683-1.145-1.034z"  ></path>'+
      ''+
      '<path d="M801.859 144.973c-23.37 0-42.326 18.953-42.326 42.325v651.744c0 23.37 18.955 42.323 42.326 42.323s42.322-18.952 42.322-42.323v-651.744c0-23.37-18.952-42.325-42.322-42.325z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-home-page" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M447.168 544.094l324.764 324.873c16.531 16.53 43.319 16.53 59.852 0 16.53-16.53 16.53-43.321 0-59.852l-295.945-296.011 295.91-295.879c16.53-16.53 16.53-43.319 0-59.852-8.262-8.267-19.093-12.398-29.924-12.398s-21.661 4.132-29.929 12.398l-325.872 325.836c-16.526 16.531-16.526 43.321 0 59.852 0.367 0.366 0.764 0.683 1.145 1.034z"  ></path>'+
      ''+
      '<path d="M221.366 879.087c23.37 0 42.326-18.953 42.326-42.324v-651.744c0-23.37-18.955-42.322-42.326-42.322s-42.322 18.951-42.322 42.322v651.744c-0.001 23.37 18.951 42.324 42.322 42.324z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
'</svg>'
var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
var shouldInjectCss = script.getAttribute("data-injectcss")

/**
 * document ready
 */
var ready = function(fn){
  if(document.addEventListener){
      document.addEventListener("DOMContentLoaded",function(){
          document.removeEventListener("DOMContentLoaded",arguments.callee,false)
          fn()
      },false)
  }else if(document.attachEvent){
     IEContentLoaded (window, fn)
  }

  function IEContentLoaded (w, fn) {
      var d = w.document, done = false,
      // only fire once
      init = function () {
          if (!done) {
              done = true
              fn()
          }
      }
      // polling for no errors
      ;(function () {
          try {
              // throws errors until after ondocumentready
              d.documentElement.doScroll('left')
          } catch (e) {
              setTimeout(arguments.callee, 50)
              return
          }
          // no errors, fire

          init()
      })()
      // trying to always fire before onload
      d.onreadystatechange = function() {
          if (d.readyState == 'complete') {
              d.onreadystatechange = null
              init()
          }
      }
  }
}

/**
 * Insert el before target
 *
 * @param {Element} el
 * @param {Element} target
 */

var before = function (el, target) {
  target.parentNode.insertBefore(el, target)
}

/**
 * Prepend el to target
 *
 * @param {Element} el
 * @param {Element} target
 */

var prepend = function (el, target) {
  if (target.firstChild) {
    before(el, target.firstChild)
  } else {
    target.appendChild(el)
  }
}

function appendSvg(){
  var div,svg

  div = document.createElement('div')
  div.innerHTML = svgSprite
  svg = div.getElementsByTagName('svg')[0]
  if (svg) {
    svg.setAttribute('aria-hidden', 'true')
    svg.style.position = 'absolute'
    svg.style.width = 0
    svg.style.height = 0
    svg.style.overflow = 'hidden'
    prepend(svg,document.body)
  }
}

if(shouldInjectCss && !window.__iconfont__svg__cssinject__){
  window.__iconfont__svg__cssinject__ = true
  try{
    document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
  }catch(e){
    console && console.log(e)
  }
}

ready(appendSvg)


})(window)
