import * as Phaser from "phaser";
import { GameScene } from "./scenes/GameScene";
import { WalletConnectScene } from "./scenes/ConnectWalletScene";
import { ExtractCardScene } from "./scenes/ExtractCardScene";

let phaserGame: Phaser.Game | null = null;

export function initializePhaserGame(canvas: HTMLCanvasElement) {
  try {
    phaserGame = new Phaser.Game({
      type: Phaser.WEBGL,
      scale: {
        mode: Phaser.Scale.FIT, // 适应屏幕大小
        autoCenter: Phaser.Scale.CENTER_BOTH, // 自动居中
        width: window.innerWidth, // 使用窗口宽度
        height: window.innerHeight, // 使用窗口高度
      },
      scene: [WalletConnectScene, ExtractCardScene, GameScene],
      physics: {
        default: "arcade",
      },
      canvas,
    });

    // 监听窗口大小变化事件，动态调整游戏大小
    window.addEventListener("resize", () => {
      phaserGame.scale.resize(window.innerWidth, window.innerHeight);
    });
  } catch (e) {
    console.error("Failed to launch the game.", e);
  }
}

export function destroyPhaserGame() {
  if (phaserGame) {
    phaserGame.destroy(true);
    phaserGame = null;
  }
}
