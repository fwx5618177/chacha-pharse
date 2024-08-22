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
    offsetX: number = 0,
    offsetY: number = 0,
    scaleFactor: number = 1,
    callback: (payload: string) => void
  ) {
    super(scene, x + offsetX, y + offsetY);

    // 创建背景图像并设置缩放
    this.background = scene.add
      .image(0, 0, backgroundImage)
      .setOrigin(0.5, 0.5)
      .setScale(scaleFactor);

    // 创建文本标签并设置缩放
    this.label = scene.add
      .text(0, 0, label, {
        fontSize: "24px",
        color: "#ffffff",
      })
      .setOrigin(0.5, 0.5)
      .setScale(scaleFactor);

    // 将背景和标签添加到容器
    this.add([this.background, this.label]);

    // 设置容器的大小和交互区域
    this.setSize(
      this.background.width * scaleFactor,
      this.background.height * scaleFactor
    );
    this.setInteractive(
      new Phaser.Geom.Rectangle(
        (-this.background.width * scaleFactor) / 2,
        (-this.background.height * scaleFactor) / 2,
        this.background.width * scaleFactor,
        this.background.height * scaleFactor
      ),
      Phaser.Geom.Rectangle.Contains
    );

    // 根据配置处理悬停效果
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

    // 处理点击事件
    this.on("pointerdown", () => {
      this.flipped = !this.flipped;
      this.flipCard();
      callback(label); // 执行回调函数
    });

    scene.add.existing(this);
  }

  // 卡片翻转动画
  private flipCard() {
    this.scene.tweens.add({
      targets: this,
      scaleX: 0,
      ease: "Power1",
      duration: 300,
      onComplete: () => {
        this.label.setText(this.flipped ? "Flipped!" : "Connect Wallet");
        this.scene.tweens.add({
          targets: this,
          scaleX: 1,
          ease: "Power1",
          duration: 300,
        });
      },
    });
  }

  // 卡片旋转动画
  private rotateCard() {
    this.scene.tweens.add({
      targets: this,
      angle: 10,
      ease: "Power1",
      duration: 300,
    });
  }

  // 卡片复位动画
  private resetCard() {
    this.scene.tweens.add({
      targets: this,
      angle: 0,
      scaleX: 1,
      ease: "Power1",
      duration: 300,
    });
  }

  // 添加粒子特效
  public addParticleEffect(
    particles: Phaser.GameObjects.Particles.ParticleEmitter
  ) {
    this.add(particles);
  }
}
