"use strict";
cc._RFpush(module, '8e7e53kJcJK9rwMSxnloqI5', 'select_mapai');
// scripts\select_mapai.js

cc.Class({
    "extends": cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        pai: cc.Node,
        mapai: {
            "default": [],
            type: cc.SpriteFrame
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.selectMa = this.node.getComponent("select_ma");
        this.selectMa.onLoad();
        this.com = this.pai.getComponent(cc.Sprite);
    },

    clickBtnComfirm: function clickBtnComfirm() {
        this.com.spriteFrame = this.mapai[cc.from.ma];
        //console.log(this.com.spriteFrame);
    }

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();