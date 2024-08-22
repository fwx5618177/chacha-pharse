export class WalletInfoComponent extends Phaser.GameObjects.Container {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    walletData: any,
    backgroundImage: string
  ) {
    super(scene, x, y);

    const background = scene.add
      .image(0, 0, backgroundImage)
      .setOrigin(0.5, 0.5);
    const walletText = scene.add
      .text(
        0,
        0,
        `Wallet: ${walletData.address}\nBalance: ${walletData.balance}`,
        {
          fontSize: "18px",
          color: "#ffffff",
        }
      )
      .setOrigin(0.5, 0.5);

    this.add([background, walletText]);

    scene.add.existing(this);
  }
}
