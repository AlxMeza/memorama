//Global var
var id = [20];
var count = 2;
var correctas = 0;
var aux1 = -1, aux2 = -1, w = 0, z = 0;
var show = true;
var intentos = 12;

class Bootloader extends Phaser.Scene
{
    constructor()
    {
        super({
            key: 'Bootloader' 
        });
    }

    init(){
        console.log("Soy init");
    }

    preload(){
        //console.log("Soy preload");
        this.load.path = "./assets/";
        this.load.image("fondo", "background.jpg");
        this.load.image("dorso", "dorso1.PNG");
        this.load.image("c1", "1.png");
        this.load.image("c2", "2.PNG");
        this.load.image("c3", "3.PNG");
        this.load.image("c4", "4.PNG");
        this.load.image("c5", "5.PNG");
        this.load.image("c6", "6.PNG");
        this.load.image("c7", "7.PNG");
        this.load.image("c8", "8.PNG");
        this.load.image("c9", "9.PNG");
        this.load.image("c10", "10.PNG");

        //Musica
        this.load.audio("mfondo", "./music/fondom.mp3");
        this.load.audio("flip", "./music/flip.mp3");
        this.load.audio("win", "./music/win.mp3");
        this.load.audio("lose", "./music/lose.mp3");
    }

    create()
    {
        const eventos = Phaser.Input.Events;
        this.scoreText = this.add.text(85, 0, 'CORRECTAS: 0    INTENTOS: 12', { font: 'bold 20pt andromeda', fill: '#9C0303'});
        this.winText = this.add.text(40,280, '', {font: 'bold 70pt andromeda', fill: '#9C0303'});
        this.loseText = this.add.text(40,280, '', {font: 'bold 70pt andromeda', fill: '#9C0303'});
        this.arr = [20];
        this.d = [20];
        this.carta = [20];
        this.fondo = this.add.image(320, 320, "fondo");
        for(var i = 0; i < 20; i++)
        {
            this.d[i] = this.add.image(320,320, "dorso").setInteractive();
            this.d[i].id = i;
        }

        //Texto score e intentos
        this.scoreText.setDepth(3);
        this.scoreText.setStroke('#f6eded', 6);

        this.winText.setDepth(3);
        this.winText.setStroke('#f6eded', 6);

        this.loseText.setDepth(3);
        this.loseText.setStroke('#f6eded', 6);

        //Cartas
        this.carta[0] = this.add.image(320, 320, "c1").setVisible(false);
        this.carta[19] = this.add.image(320, 320, "c1").setVisible(false);
        this.carta[1] = this.add.image(320, 320, "c2").setVisible(false);
        this.carta[18] = this.add.image(320, 320, "c2").setVisible(false);
        this.carta[2] = this.add.image(320, 320, "c3").setVisible(false);
        this.carta[17] = this.add.image(320, 320, "c3").setVisible(false);
        this.carta[3] = this.add.image(320, 320, "c4").setVisible(false);
        this.carta[16] = this.add.image(320, 320, "c4").setVisible(false);
        this.carta[4] = this.add.image(320, 320, "c5").setVisible(false);
        this.carta[15] = this.add.image(320, 320, "c5").setVisible(false);
        
        this.carta[5] = this.add.image(320, 320, "c6").setVisible(false);
        this.carta[14] = this.add.image(320, 320, "c6").setVisible(false);
        this.carta[6] = this.add.image(320, 320, "c7").setVisible(false);
        this.carta[13] = this.add.image(320, 320, "c7").setVisible(false);
        this.carta[7] = this.add.image(320, 320, "c8").setVisible(false);
        this.carta[12] = this.add.image(320, 320, "c8").setVisible(false);
        this.carta[8] = this.add.image(320, 320, "c9").setVisible(false);
        this.carta[11] = this.add.image(320, 320, "c9").setVisible(false);
        this.carta[9] = this.add.image(320, 320, "c10").setVisible(false);
        this.carta[10] = this.add.image(320, 320, "c10").setVisible(false);

        //Musica
        this.track1 = this.sound.add("mfondo");
        this.flip = this.sound.add("flip");
        this.win = this.sound.add("win");
        this.lose = this.sound.add("lose");
        this.track1.setVolume(0.3);
        this.track1.setLoop(true);
        this.track1.play();

        this.fondo.setDepth(0);

        var cont = 0;
        const x1 = 120;
        const y1 = 120;
        for(var i = 0; i < 5; i++)
        {
            for(var j = 0; j < 4; j++)
            {
                this.d[cont].y = 570 - (y1*i);
                this.d[cont].x = 120 + (x1*j);
                this.d[cont].setScale(0.2, 0.2);
                this.d[cont].setDepth(2);
                cont++;
            }
        }

        //Generar posiciones para las tarjetas
        random_posicion(this.arr);

        //ubicar las tarjetas
        var a = 0;
        for(var i = 0; i < 20; i++)
        {
            a = this.arr[i];
            this.carta[i].y = this.d[a].y;  
            this.carta[i].x = this.d[a].x;
            id[a] = i; 
            this.carta[i].setVisible(true);
            this.carta[i].setScale(0.2, 0.2);
            this.carta[i].setDepth(1);
        }

        //Cambiar tinte si el cursor esta encima de las cartas
        this.input.on(eventos.GAMEOBJECT_OVER, (pointer, gameObject) =>
        {
            //gameObject.setTint(0xf7a91f);
            gameObject.setTint(0xF8D66E);
        });

        this.input.on(eventos.GAMEOBJECT_OUT, (pointer, gameObject) =>
        {
            gameObject.clearTint(0xf7a91f);
        });

        //Mostrar Cartas por un momento
        if(show == true)
        {
            for(var i = 0; i < 20; i++)
            {
                this.d[i].setVisible(false);
                this.d[i].disableInteractive();
            }
            setTimeout(()=> {
                for(var i = 0; i < 20; i++)
                {
                    this.d[i].setVisible(true);
                    this.d[i].setInteractive();
                }
                show = false;
            }, 3000);
        }

        //Voltear cartas y validar match
        var identificador = 0;
        this.input.on(eventos.GAMEOBJECT_DOWN, (pointer, gameObject) =>
        {
            this.flip.setVolume(2);
            this.flip.play();
            //console.log("id:" + gameObject.id);
            identificador = gameObject.id; 
            this.d[identificador].setVisible(false);
            this.d[identificador].disableInteractive();

            if(aux1 == -1)
            {
                aux1 = identificador;
                count--;
            }else{
                aux2 = identificador;
                count--;
            }

            if(count == 0 && aux1 != -1 && aux2 != -1) 
            {
                for(var i = 0; i < 20; i++)
                {
                    this.d[i].disableInteractive();
                }
                if(Math.abs(id[aux1] + id[aux2]) == 19)
                {
                    correctas++;
                    this.scoreText.setText("CORRECTAS: " +correctas + "    INTENTOS: " +intentos);
                    //console.log("correctas: ", correctas);
                    for(var i = 0; i < 20; i++)
                    {
                        this.d[i].setInteractive();
                    }
                    count = 2;
                    aux1 = -1;
                    aux2 = -1;
                }
                else{
                        for(var i = 0; i < 20; i++)
                        {
                            this.d[i].disableInteractive();
                        }
                        if(intentos == 0)
                        {
                            this.lose.play();
                            this.loseText.setText("!PERDISTE¡");
                            setTimeout(() => {
                                aux1 = -1;
                                aux2 = -1;
                                correctas = 0;
                                intentos = 12;
                                count = 2;
                                this.track1.stop();
                                this.scene.restart();
                            }, 3000);
                            show = true;
                        }
                        else
                        {
                            intentos--;
                            this.scoreText.setText("CORRECTAS: " +correctas + "    INTENTOS: " +intentos);
                            setTimeout(()=> {
                                    //console.log("hello");
                                    this.d[aux1].setVisible(true);
                                    this.d[aux2].setVisible(true);
                                    for(var i = 0; i < 20; i++)
                                    {
                                        this.d[i].setInteractive();
                                    }
                                    count = 2;
                                    aux1 = -1;
                                    aux2 = -1;
                            }, 2000);
                        }        
                }
            }

            if(correctas == 10)
            {
                this.win.play();
                this.winText.setText("¡GANASTE!")
                setTimeout(() => {
                    aux1 = -1;
                    aux2 = -1;
                    correctas = 0;
                    intentos = 12;
                    this.track1.stop();
                    this.scene.restart();
                }, 3000);
                show = true;
            }
        });
    }

    getTime(){
        let tiempo = new Date();
        return tiempo.getTime();
    }

    showDelta(){
        let elapsed = this.getTime() - this.start;
        this.start = this.getTime();
        return elapsed;
    }

    update(time, delta)
    {
    
    }   
}

function random_posicion(arr) 
{
    var i, j, k = 0;
    for(var i = 0; i < 20; i++)
    {
        arr[i] = i;
    }

    for (i = arr.length; i; i--) 
    {
        j = Math.floor(Math.random() * i);
        k = arr[i - 1];
        arr[i - 1] = arr[j];
        arr[j] = k;
    }

}

export default Bootloader;