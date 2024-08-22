import { CardComponent } from "../ui/CardComponent";

export class ExtractCardScene extends Phaser.Scene {
  constructor() {
    super({ key: "ExtractCardScene" });
  }

  preload() {
    this.load.image("cardBackgroundImage", "/assets/card.png");
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // 根据设备宽度动态调整布局和间距
    const isMobile = width < 768; // 假设宽度小于768px的为移动设备
    const padding = isMobile ? 10 : 20; // 移动设备上的间距更小

    // 根据设备类型设置布局
    const rows = isMobile ? 2 : 3;
    const cols = isMobile ? 2 : 3;

    // 获取卡片图片的实际宽度和高度
    const cardImage = this.textures.get("cardBackgroundImage").getSourceImage();
    const cardImageWidth = cardImage.width;
    const cardImageHeight = cardImage.height;

    // 计算卡片的宽度和高度
    const cardWidth = (width - (cols + 1) * padding) / cols;
    const cardHeight = (height - (rows + 1) * padding) / rows;

    // 计算缩放比例，并设置一个最小缩放值
    const scaleFactor = Math.max(
      0.5,
      Math.min(cardWidth / cardImageWidth, cardHeight / cardImageHeight)
    );

    // 动态生成卡片
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const cardX = padding + col * (cardWidth + padding) + cardWidth / 2;
        const cardY = padding + row * (cardHeight + padding) + cardHeight / 2;

        new CardComponent(
          this,
          cardX,
          cardY,
          "Select",
          "cardBackgroundImage",
          true,
          0, // 无偏移
          0,
          scaleFactor,
          this.selectCard.bind(this)
        );
      }
    }
  }

  private async selectCard() {
    this.scene.start("GameScene");
  }
}
