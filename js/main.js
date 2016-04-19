$(function() {
  var isSuccess = false;

  // markdown editor
  var editor = new Editor();
  editor.render();


  // let the height of typingarea adaptive
  // I didn't put them in the "begin" function because input GUI of mobiles would influence the height of window.innerHeight
  var $header = $("header");
  var $headerHeight = $header.height();

  var $footer = $("footer");
  var $footerHeight = $footer.height();
  
  var $mainWrapper = $(".main-wrapper"); 

  var $codeMirror = $(".CodeMirror");

  var pre = window.innerHeight - $headerHeight - $footerHeight;
  $mainWrapper.height(pre);
  $codeMirror.height(pre - 120);
  $codeMirror.css("background-color", "lightblue");


  var remainingSet, expireSet, remainingOrigin, expireOrigin;

  // check whether the input for time is number
  $("form.intro :input").bind("blur", function() {
    if ($(this).is("#remainingTime")) {
      if (this.value > 0) {
        remainingSet = this.value * 60 * 1000;
        // save the initial set and prepare for users' choice to write again
        remainingOrigin = remainingSet;
      } else {
        alert("Please input positive numbers");
      }
    }
    if ($(this).is("#expireTime")) {
      if (this.value > 0) {
        expireSet = this.value * 1000;
        expireOrigin = expireSet;
      } else {
        alert("Please input positive numbers");
      }
    }
  })  

  $("button.submit").bind("click", function() {
    if ((typeof remainingSet) == "number" && (typeof expireSet) == "number") {
      $("div.fullpage-intro").css("display", "none");
      begin();
    } else {
      alert("Please input two positive numbers");
    }
  })

  var begin = function() {
    // show the remaining time and expire time
    var $remainingShow = $("#remaining")
    var $expireShow = $("#expire")

    if (remainingSet <= 60000) {
      $remainingShow.text((remainingSet / 1000).toFixed(1) + "\"");
    } else {
      $remainingShow.text((remainingSet / 60000).toFixed(2) + "\'");
    }

    $expireShow.text((expireSet / 1000).toFixed(1) + "\"");


    function setExpire(value) {
      var value = value - 100;
      $expireShow.text((value / 1000).toFixed(1) + "\"");
      if (value <= 0) {
        // if both the time equals 0 at the same time, dont't show the ".fail" overlay
        if (remainingSet + 100 == expireSet) {
          return false;
        } else {
          editor.codemirror.setValue('');
          clearInterval(timer);
          $codeMirror.stop(true, true);
          if (remainingSet != expireSet) {
            $("div.fullpage-overlay.fail").removeClass("hidden");
          }
        }
      }
      return;
    }

    function setRemaining(value) {
      if (value <= 60000) {
        $remainingShow.text((remainingSet / 1000).toFixed(1) + "\"");
      } else {
        $remainingShow.text((remainingSet / 60000).toFixed(2) + "\'");
      }
      if (value <= 0) {
        // alert ("remaining"+value);
        clearInterval(timer);
        isSuccess = true;
        $codeMirror.stop();
        $codeMirror.css("opacity", "1");
        $("div.fullpage-overlay.success").removeClass("hidden");
      }
    }

    var timer = setInterval(function(){
      remainingSet = remainingSet - 100;
      setExpire(expireSet);
      setRemaining(remainingSet);
      expireSet = expireSet - 100;
    }, 100);

    // make text gradient
    $codeMirror.animate({opacity:'0'}, expireOrigin);
    // remember to clear the animation queue first
    editor.codemirror.on("change", function() {
      if (isSuccess === false) {
        expireSet = expireOrigin;
        $codeMirror.stop(true, true);
        $codeMirror.css("opacity", "1");
        $codeMirror.animate({opacity:'0'}, expireOrigin);
      }
      return;
    });
  }


  $(".go-copy").bind("click", function() {
    $("div.fullpage-overlay").addClass("hidden");
  })

  $(".write-again").bind("click", function() {
    $("div.fullpage-overlay").addClass("hidden");
    $codeMirror.css("background-color", "lightblue");
    remainingSet = remainingOrigin;
    expireSet = expireOrigin;
    isSuccess = false;
    begin();
  })
});