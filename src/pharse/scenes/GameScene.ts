import * as Phaser from "phaser";

export class GameScene extends Phaser.Scene {
  private gameUi: any;

  constructor(gameUi: any) {
    super({ key: "GameScene" });
    this.gameUi = gameUi;
  }

  preload() {
    // 预加载资源
  }

  create() {
    // 创建游戏世界
  }

  update() {
    // 游戏逻辑更新
  }
}
