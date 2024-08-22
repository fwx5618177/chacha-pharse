import { CardComponent } from "../ui/CardComponent";

export class ExtractCardScene extends Phaser.Scene {
  constructor() {
    super({ key: "ExtractCardScene" });
  }

  preload() {
    this.load.image("cardBackgroundImage", "/assets/card.png");
  }

  create() {
    const card = new CardComponent(
      this,
      400,
      300,
      "Select",
      "cardBackgroundImage",
      true,
      50,
      0,
      0.4
    );
  }
}
