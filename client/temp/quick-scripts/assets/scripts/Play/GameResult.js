(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Play/GameResult.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6a3cdd+2shGlZ+jeI3trSsB', 'GameResult', __filename);
// scripts/Play/GameResult.js

'use strict';

var KQCard = require('KQCard');
var AudioManager = require('AudioManager');

var ResultStatus = {
  WIN: 2,
  DRAW: 1,
  LOSE: 0
};

var GameResult = cc.Class({
  extends: cc.Component,

  properties: {
    winNode: cc.Node,
    loseNode: cc.Node,
    drawNode: cc.Node,
    contentNode: cc.Node,

    resultItems: [cc.Node],

    _deskInfo: null,
    _userId: null,
    _closeCallback: null
  },

  // use this for initialization
  onLoad: function onLoad() {
    this._hideResultItems();
  },

  showResults: function showResults(deskInfo, currentUserId) {
    this._deskInfo = deskInfo;
    this._userId = currentUserId;

    var resultStatus = this._resultStatus();
    this.contentNode.active = true;
    this.winNode.active = resultStatus == ResultStatus.WIN;
    this.drawNode.active = resultStatus == ResultStatus.DRAW;
    this.loseNode.active = resultStatus == ResultStatus.LOSE;

    if (this.winNode.active) {
      AudioManager.instance.playWin();
    } else if (this.loseNode.active) {
      AudioManager.instance.playLose();
    }

    this.node.getComponent('alert').alert();
    this.node.getComponent('alert').setDismissCallback(function () {
      this._closeCallback;
    }.bind(this));

    var playerInfos = deskInfo.players.sort(function (p1, p2) {
      return p2.cScore - p1.cScore;
    });
    var itemComps = this.resultItems.map(function (node) {
      return node.getComponent('ResultItem');
    });
    itemComps.forEach(function (itemComp, index) {
      itemComp.node.active = index < playerInfos.length;
      if (!itemComp.node.active) {
        return;
      }

      var user = playerInfos[index];
      itemComp.updateWithPlayerInfo(user, deskInfo.isRandomDesk);
      var cards = this._cardsFromUser(user);
      itemComp.setCards(cards);
    }.bind(this));
  },

  setCloseCallback: function setCloseCallback(callback) {
    this._closeCallback = callback;
  },

  _cardsFromUser: function _cardsFromUser(user) {
    var cards = user.cardInfo.map(function (cardInfoItem) {
      return KQCard.cardsFromArray(cardInfoItem.cards);
    }).reduce(function (array, subCards) {
      return array.concat(subCards);
    }, []);

    return cards;
  },

  _hideResultItems: function _hideResultItems() {
    this.resultItems.forEach(function (node) {
      node.acitve = false;
    });
  },

  _resultStatus: function _resultStatus() {
    var playerInfos = this._deskInfo.players;
    var user = playerInfos.find(function (user) {
      return user.id == this._userId;
    }.bind(this));

    var score = user.cScore;
    if (this._deskInfo.isRandomDesk) {
      // 如果是随机场的话，应该用钻石来判断输赢
      score = user.diamond;
    }

    if (score > 0) {
      return ResultStatus.WIN;
    } else if (score < 0) {
      return ResultStatus.LOSE;
    }

    return ResultStatus.DRAW;
  }
});

module.exports = GameResult;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=GameResult.js.map
        