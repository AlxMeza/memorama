import Bootloader from "./scenes/Bootloader.js"

const config = {
    title: "Curso Phaser",
    url: "http://google.es",
    version: "0.0.1",
    type: Phaser.Auto,

    width: 640,
    height: 640,
    parent: "contenedor",

    pixelArt: true,
    backgroundColor: "#34495e",
    scene: [Bootloader],
};
    
const game = new Phaser.Game(config);