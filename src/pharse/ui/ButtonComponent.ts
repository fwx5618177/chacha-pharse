export class ButtonComponent extends Phaser.GameObjects.Container {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    label: string,
    callback: () => void,
    backgroundImage: string
  ) {
    super(scene, x, y);

    const text = scene.add
      .text(0, 0, label, {
        fontSize: "24px",
        color: "#ffffff",
      })
      .setOrigin(0.5, 0.5);

    const textWidth = text.width;
    const textHeight = text.height;

    const paddingW = 40;
    const paddingY = 40;
    const background = scene.add
      .image(0, 0, backgroundImage)
      .setDisplaySize(textWidth + paddingW, textHeight + paddingY)
      .setOrigin(0.5, 0.5);

    this.add([background, text]);
    this.setSize(background.width, background.height);

    this.setInteractive(
      new Phaser.Geom.Rectangle(0, 0, background.width, background.height),
      Phaser.Geom.Rectangle.Contains
    );

    this.on("pointerover", () => {
      background.setAlpha(0.8);
    })
      .on("pointerout", () => {
        background.setAlpha(1);
      })
      .on("pointerdown", callback);

    scene.add.existing(this);
  }
}
