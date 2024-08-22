export class CardComponent extends Phaser.GameObjects.Container {
  private background: Phaser.GameObjects.Image;
  private label: Phaser.GameObjects.Text;
  private flipped: boolean = false;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    label: string,
    backgroundImage: string,
    flipOnHover: boolean = true,
    offsetX: number = 0, // 左右偏移量
    offsetY: number = 0, // 上下偏移量
    scaleFactor: number = 1 // 缩放倍数
  ) {
    super(scene, x + offsetX, y + offsetY); // 应用偏移量

    // 创建背景图像
    this.background = scene.add
      .image(0, 0, backgroundImage)
      .setOrigin(0.5, 0.5)
      .setScale(scaleFactor); // 应用缩放倍数

    // 创建文本对象
    this.label = scene.add
      .text(0, 0, label, {
        fontSize: "24px",
        color: "#ffffff",
      })
      .setOrigin(0.5, 0.5)
      .setScale(scaleFactor); // 应用缩放倍数

    // 将子对象添加到 Container
    this.add([this.background, this.label]);

    // 设置 Container 的 hitArea 和 hitAreaCallback
    this.setSize(
      this.background.width * scaleFactor,
      this.background.height * scaleFactor
    );
    this.setInteractive(
      new Phaser.Geom.Rectangle(
        0,
        0,
        this.background.width * scaleFactor,
        this.background.height * scaleFactor
      ),
      Phaser.Geom.Rectangle.Contains
    );

    // 处理鼠标悬停效果
    if (flipOnHover) {
      this.on("pointerover", this.flipCard, this).on(
        "pointerout",
        this.resetCard,
        this
      );
    } else {
      this.on("pointerover", this.rotateCard, this).on(
        "pointerout",
        this.resetCard,
        this
      );
    }

    // 将 Container 添加到场景中
    scene.add.existing(this);
  }

  // 翻转卡片
  private flipCard() {
    this.scene.tweens.add({
      targets: this,
      scaleX: 0,
      ease: "Power1",
      duration: 300,
      onComplete: () => {
        this.flipped = !this.flipped;
        // this.label.setText(this.flipped ? "Flipped!" : "Connect Wallet");
        this.scene.tweens.add({
          targets: this,
          scaleX: 1,
          ease: "Power1",
          duration: 300,
        });
      },
    });
  }

  // 旋转卡片
  private rotateCard() {
    this.scene.tweens.add({
      targets: this,
      angle: 10,
      ease: "Power1",
      duration: 300,
    });
  }

  // 重置卡片到初始状态
  private resetCard() {
    this.scene.tweens.add({
      targets: this,
      angle: 0,
      scaleX: 1,
      ease: "Power1",
      duration: 300,
    });
  }

  // 插入粒子特效的接口（未来扩展用）
  public addParticleEffect(
    particles: Phaser.GameObjects.Particles.ParticleEmitter
  ) {
    this.add(particles);
  }
}
