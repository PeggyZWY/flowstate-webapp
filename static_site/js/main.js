$(function() {
  'use strict';
  var isSuccess = false,
      lang;

  // // confirmation before page's unloading
  // window.addEventListener("beforeunload", function() {
  //   var message = "Are you sure to leave?";
  //   event.returnValue = message; // for IE & FF
  //   return message; // for Safari & Chrome
  // }, false);


  /** ------------------------
   *
   * multi-language
   *
   * ------------------------ */
  var langDict = {
    english: {
      "lang-1": "<div>This may be the most dangerous app. You have to keep writing, or everything will be erased if you stop beyond the expiring time.</div><div>Now set the duration time you want to focus and the exciting expiring time.</div>",
      "lang-2": "Lasts for(minutes):",
      "lang-3": "Expires in(seconds):",
      "lang-4": "Begin",
      "lang-5": "Time's up :( <br> Be more focus next time.",
      "lang-6": "Again",
      "lang-7": "Reset time",
      "lang-8": "Good job!<br />Would you like to go back and copy what you have written?",
      "lang-9": "Go back to copy",
      "lang-10": "Give up"
    },
    chinese: {
      "lang-1": "<div>这也许是世界上最危险的写作应用：在你设定的时间段内，如果你停止输入文字超过设定的间隔时间，之前写下的所有内容都会消失。</div><div>现在请设定持续时间段和间隔时间。</div>",
      "lang-2": "持续时间（分）：",
      "lang-3": "间隔时间（秒）：",
      "lang-4": "开始",
      "lang-5": "时间到 _(:3 」∠)_ <br> 下次要更加专心哦~",
      "lang-6": "再来一次",
      "lang-7": "重设时间",
      "lang-8": "赞√<br />你想回去复制刚刚写的内容吗？",
      "lang-9": "回去复制",
      "lang-10": "我要重写"
    },
    japanese: {
      "lang-1": "<div>これは世界中の一番危ないアプリかもしれません：あなたのセッティングした間には、書き続けなければなりません。もしそうでなく、全ての入力したデータは削除されます。</div><div>今、持続時間と制限時間をセッティングしましょう！</div>",
      "lang-2": "持続時間（分）：",
      "lang-3": "制限時間（秒）：",
      "lang-4": "スタート",
      "lang-5": "時間切れ _(:3 」∠)_ <br> 今度は頑張ってくださいね～",
      "lang-6": "もう一度",
      "lang-7": "リセット",
      "lang-8": "すっごい√<br />戻ってデータを保存していいですか",
      "lang-9": "戻る",
      "lang-10": "書き直したい"
    }
  };

  $("[name=" + "english" + "]").addClass("hidden");

  function changeLanguage(lang) {
    for (var key in langDict) {
      $("[name=" + key + "]").removeClass("hidden");
    }
    $("[name=" + lang + "]").addClass("hidden");
    var chosenLang = langDict[lang];
    for (var langKey in chosenLang) {
      var langValue = chosenLang[langKey];
      $("." + langKey).html(langValue);
    }
  }

  $(".langSet").bind("click", function() {
    lang = $(this).attr("name");
    changeLanguage(lang);
  })



  /** ------------------------
   *
   * simplemde-markdown-editor
   * https://github.com/NextStepWebs/simplemde-markdown-editor
   *
   * ------------------------ */
  var simplemde = new SimpleMDE({
    element: $("#MyID")[0]
  });
  simplemde.value('');

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

  // resize the height of input area when user resizes the height of browser
  window.addEventListener("resize", function() {
    var pre = window.innerHeight - $headerHeight - $footerHeight;
    $mainWrapper.height(pre);
    $codeMirror.height(pre - 120);;
  }, false);



  /** ------------------------
   *
   * timer
   *
   * ------------------------ */
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
    // show the remaining time and expiring time
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
        // if both the time equal 0 at the same time, don't show the ".fail" overlay
        if (remainingSet + 100 == expireSet) {
          return false;
        } else {
          simplemde.value('');
          clearInterval(timer);
          $codeMirror.stop(true, true);
          if (remainingSet != expireSet) {
            $("div.fullpage-overlay.fail").removeClass("hidden");
          }
        }
      }
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

    var timer = setInterval(function() {
      remainingSet = remainingSet - 100;
      setExpire(expireSet);
      setRemaining(remainingSet);
      expireSet = expireSet - 100;
    }, 100);

    // make text gradient
    $codeMirror.animate({
      opacity: '0'
    }, expireOrigin);
    // remember to clear the animation queue first
    // change the event from "change" to "keydown"
    simplemde.codemirror.on("keydown", function() {
      if (isSuccess === false) {
        expireSet = expireOrigin;
        $codeMirror.stop(true, true);
        $codeMirror.css("opacity", "1");
        $codeMirror.animate({
          opacity: '0'
        }, expireOrigin);
      }
      return false;
    });
  }



  /** ------------------------
   *
   * overlay (success or fail)
   *
   * ------------------------ */
  $(".go-copy").bind("click", function() {
    $("div.fullpage-overlay").addClass("hidden");
  });

  $(".write-again").bind("click", function() {
    $("div.fullpage-overlay").addClass("hidden");
    $codeMirror.css("opacity", "1");
    simplemde.value('');
    remainingSet = remainingOrigin;
    expireSet = expireOrigin;
    isSuccess = false;
    begin();
    changeLanguage(lang);
  });
});
