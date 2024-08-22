export class BoxComponent extends Phaser.GameObjects.Container {
  private textObject: Phaser.GameObjects.Text;
  private content: string;
  private index: number = 0;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    width: number,
    height: number,
    content: string
  ) {
    super(scene, x, y);

    // 创建半透明背景
    const background = scene.add
      .rectangle(0, 0, width, height, 0x000000, 0.5)
      .setOrigin(0.5, 0.5);
    this.add(background);

    // 创建文本对象
    this.content = content;
    this.textObject = scene.add.text(-width / 2 + 20, -height / 2 + 20, "", {
      fontSize: "18px",
      color: "#ffffff",
    });
    this.add(this.textObject);

    scene.add.existing(this);

    this.typewriteText();
  }

  private typewriteText() {
    this.scene.time.addEvent({
      callback: () => {
        if (this.index < this.content.length) {
          this.textObject.text += this.content[this.index];
          this.index++;
        }
      },
      repeat: this.content.length - 1,
      delay: 100, // 每100ms显示一个字符
    });
  }
}
