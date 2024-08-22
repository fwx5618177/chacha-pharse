export class UI {
  private config: any;
  private gameFi: any;

  constructor(config: any, gameFi: any) {
    this.config = config;
    this.gameFi = gameFi;
  }

  transitionToGame() {
    // 进入游戏的 UI 过渡
  }

  transitionOutOfGame() {
    // 退出游戏的 UI 过渡
  }

  showMain(show: boolean) {
    // 显示或隐藏主界面
  }

  showBalance() {
    // 显示余额
  }

  hideBalance() {
    // 隐藏余额
  }

  hideShop() {
    // 隐藏商店
  }
}
