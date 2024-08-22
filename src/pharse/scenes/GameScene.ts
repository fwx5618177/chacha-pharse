import { BoxComponent } from "../ui/BoxComponent";
import { CardComponent } from "../ui/CardComponent";
// import glowParticlesFrag from "../ui/glowParticles.frag";
import bg from "../../assets/bg.png";
import card from "../../assets/card.png";

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  preload() {
    this.load.image("backgroundImage", bg);
    this.load.image("cardBackgroundImage", card);
    // this.load.glsl("glowParticles", glowParticlesFrag); // 加载 Shader
  }

  create() {
    const { width, height } = this.cameras.main;

    // 确保背景图像覆盖整个屏幕
    const background = this.add
      .image(width / 2, height / 2, "backgroundImage")
      .setOrigin(0.5, 0.5)
      .setDisplaySize(width, height)
      .setAlpha(0);

    // 让背景逐渐出现
    this.tweens.add({
      targets: background,
      alpha: 1,
      duration: 2000,
      ease: "Power1",
    });

    // 创建卡片
    const card = new CardComponent(
      this,
      width / 2,
      height / 2,
      "Game Card",
      "cardBackgroundImage",
      false,
      0,
      0,
      1,
      (payload: string) => {
        console.log(`Card clicked: ${payload}`);
      }
    );

    // 让卡片旋转
    this.tweens.add({
      targets: card,
      angle: 360,
      duration: 5000,
      ease: "Linear",
      repeat: -1,
    });

    // 创建 Shader 以实现粒子效果
    // const shader = this.add
    //   .shader("glowParticles", width / 2, height / 2, width, height)
    //   .setOrigin(0.5, 0.5);

    // // 实时更新 Shader 中的时间和卡片位置
    // this.events.on("update", () => {
    //   shader.setUniform("time.value", this.time.now / 1000);
    //   shader.setUniform(
    //     "cardPosition.value",
    //     new Phaser.Math.Vector2(card.x, card.y)
    //   );
    // });

    // 创建一个BoxComponent显示文字
    const box = new BoxComponent(
      this,
      width / 2,
      height - 100,
      width * 0.8,
      100,
      "Welcome to the Game!"
    );
  }
}
