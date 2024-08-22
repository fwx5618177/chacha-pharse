import { ButtonComponent } from "../ui/ButtonComponent";

export class WalletConnectScene extends Phaser.Scene {
  private walletButton: ButtonComponent | null = null;

  constructor() {
    super({ key: "WalletConnectScene" });
  }

  preload() {
    this.load.image("buttonBg", "/assets/blue.png");
  }

  create() {
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    this.walletButton = new ButtonComponent(
      this,
      centerX,
      centerY,
      "Connect Wallet",
      this.connectWallet.bind(this),
      "buttonBg"
    );
  }

  private async connectWallet() {
    this.scene.start("ExtractCardScene");
  }
}
