$(function() {

  var bankCredit = {
    "jibun": 0,
    "mitsui": 0,
    "yuucho": 0,
    "kitakyu": 0
  };
  var bankHash = {
    "jibun": {
      "print": "じぶん",
      "class": "jibunBank"
    },
    "mitsui": {
      "print": "三井住友",
      "class": "mitsuiBank"
    },
    "yuucho": {
      "print": "ゆうちょ",
      "class": "yuuchoBank"
    },
    "kitakyu": {
      "print": "北九州",
      "class": "kitakyuBank"
    },
    "outcome": {
      "print": "支出",
      "class": "outcome"
    },
    "income": {
      "print": "収入",
      "class": "income"
    },
  }
  var historyArr = [];
  var dayDate = new Date();
  var yy = dayDate.getFullYear();
  var mm = dayDate.getMonth() + 1;
  var dd = dayDate.getDate();
  var todayDate = ('0' + yy).slice(-2) + "/" + ('0' + mm).slice(-2) + "/" + ('0' + dd).slice(-2);

  var init = function() {
    setevent();
    loadLocal();
    printHistory();
  };

  var setevent = function() {
    $('.bankPrint').on('touchstart', function() {
      var target = $(this).attr("id");
      var id = "#" + target;
      console.log(target);
      $(id).children('.centerCredit').text(bankCredit[target]);
    });
    $('.bankPrint').on('touchend', function() {
      var target = $(this).attr("id");
      var id = "#" + target;
      $(id).children('.centerCredit').text("********");
    });
    /*
    $('.bankPrint').on('mousedown', function() {
      var target = $(this).attr("id");
      var id = "#" + target;
      $(id).children('.centerCredit').text(bankCredit[target]);
    });
    $('.bankPrint').on('mouseup', function() {
      var target = $(this).attr("id");
      var id = "#" + target;
      $(id).children('.centerCredit').text("********");
    });
    */
    $('.registerBtn').on('click', function() {
      var outTarget = $('.outcomeSel').val();
      var inTarget = $('.incomeSel').val();
      var mes = $('.category').val();
      var price = $('.moveprice').val();
      movedMoney(outTarget, inTarget, price);
      addHistory(outTarget, inTarget, mes, price);
      printHistory();
      $('.category').val("");
      $('.moveprice').val("");
      saveLocal();
    });
  };

  var movedMoney = function(outT, inT, price) {
    bankCredit[outT] = bankCredit[outT] - Number(price);
    bankCredit[inT] = bankCredit[inT] + Number(price);
  };

  var printHistory = function() {
    $('.history_tbody').empty();
    historyArr.forEach(function(his) {
      var tr = $('<tr>').attr({
        class: "tbody_tr"
      }).prependTo('.history_tbody');
      $('<td>').attr({
        class: "history_date"
      }).text(his.date).appendTo(tr);
      $('<td>').attr({
        class: "history_out " + bankHash[his.outTarget].class
      }).text(bankHash[his.outTarget].print).appendTo(tr);
      $('<td>').attr({
        class: "history_in " + bankHash[his.inTarget].class
      }).text(bankHash[his.inTarget].print).appendTo(tr);
      $('<td>').attr({
        class: "history_price"
      }).text(his.price).appendTo(tr);
      $('<td>').attr({
        class: "history_reason"
      }).text(his.mes).appendTo(tr);
    });
  };

  var addHistory = function(outT, inT, reason, price) {
    historyArr.push({
      "date": todayDate,
      "outTarget": outT,
      "inTarget": inT,
      "mes": reason,
      "price": price
    });
  };

  var saveLocal = function(){
    localStorage.setItem("credit", JSON.stringify(bankCredit));
    localStorage.setItem("history", JSON.stringify(historyArr));
  };

  var loadLocal = function(){
    var creJson = localStorage.getItem("credit");
    var hisJson = localStorage.getItem("history");
    if(creJson)bankCredit = JSON.parse(creJson);
    if(hisJson)historyArr = JSON.parse(hisJson);
  };

  init();
})
