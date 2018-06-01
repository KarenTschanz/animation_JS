var canvas = document.querySelector('canvas');

//largeur de la fenêtre qd elle s'ouvre
// le canvas va s'adapter à ça
canvas.width = window.innerWidth;
//longeur de la fenêtre
canvas.height = window.innerHeight;

// call context
var c = canvas.getContext('2d');

/*------------------------------------------------
---------------DESSINER FORMES-----------------
--------------------------------------------------*/

// RECTANGLE / CARRE
// determine ou dessiner
// la position
//fillRect = carré et rectangle rempli
// fillStyle change le fond du rectangle
// x, y, width, height
/*c.fillStyle = 'rgba(255,0,0,0.5)';
c.fillRect(100, 100, 100, 100);
c.fillStyle = 'rgba(0,0,255,0.5)';
c.fillRect(400, 100, 100, 100);
c.fillStyle = 'rgba(0,255,0,0.5)';
c.fillRect(300, 300, 100, 100);*/


/*//LIGNE
// peut pas definir le x et le y dans le beginPath
c.beginPath();
// donc on crée le moveTo(créer un point de départ)
//x y
c.moveTo(50, 300);
// le relie avec le lineTo
c.lineTo(300, 100);
c.lineTo(400, 300);
//va dessiner la ligne
c.strokeStyle = "blue";
c.stroke();*/


// ARC / CERCLE
// rajouter un beginPath pour séparé les formes "dans des claques différents"
// x y r startAngle endAngle drawCounterClockwise
/*c.beginPath();
c.arc(300, 300, 30, 0, Math.PI * 2, false);
c.strokeStyle = 'orange';
c.stroke();*/

// éviter de copier 1000 fois le code faire une boucle
// peut lui dire combien de fois en utilisant le i pour incrémenter
/*for (var i = 0; i < 100; i++) {
    // changer la position de chaque cercle (x et y )
    // Math.random = aléatoire
    // pour être sur que les cercle sont dans la fenetre windowInner
    var x = Math.random() * window.innerWidth;
    var y = Math.random() * window.innerHeight;
    c.beginPath();
    c.arc(x, y, 30, 0, Math.PI * 2, false);
    c.strokeStyle = 'orange';
    c.stroke();
}*/

/*------------------------------------------------
---------------Mouvement Souris-----------------
--------------------------------------------------*/

//coordonnée de la souris a chaque mouvement = indefinis
var mouse = {
    x: undefined,
    y: undefined
}

var maxRadius = 40;
//var minRadius = 3;

// changement de couleur des ronds
var colorArray = [
    //nombre de couleur différentes
    '#4FB9BF',
    '#347B7F',
    '#1A3E40',
    '#5EDEE5',
    '#69F7FF',
];

window.addEventListener('mousemove',
    function (event) {
        mouse.x = event.x;
        mouse.y = event.y;
    }); /*window...*/

// Si la fenêtre change de taille les cercles vont s'eparpiller sur la nouvelle taille petit a petit
window.addEventListener('resize', function () {
    //largeur de la fenêtre qd elle s'ouvre
    // le canvas va s'adapter à ça
    canvas.width = window.innerWidth;
    //longeur de la fenêtre
    canvas.height = window.innerHeight;

    init();
}) /*window...*/

/*------------------------------------------------
---------------BOUGER LES CERCLES-----------------
--------------------------------------------------*/

// function pour ne par répeter la fonction animate si on veut que chaque cercle se déplace différement
// Si on veut le fair qu'une fois il faut enlever juste tout les this et aussi ne pas mettre dans les fonction 
function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    // mettre le colorArray.lenght pour éviter de mettre le nombre de couleurs total du tableau
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function () {
        // permet de rebondire sur les bords du canvas
        // + radius pour prendre en compte les bard du rond et non le point d'encrage central lors de la sortie
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            // pour que ça revienne en arrière
            this.dx = -this.dx;
        }

        // fais la même chose pour la hauteur
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            // pour que ça revienne en arrière
            this.dy = -this.dy;
        }

        // x += la vitesse de déplacement
        this.x += this.dx;
        this.y += this.dy;

        //interactivity with mouse
        // grossissement des ronds
        // rapdissement des ronds
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            //limite le grossisment a par ex:40
            if (this.radius < maxRadius) {
                this.radius += 1;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

        ///////////
        this.draw();
    }

}



// Creation des cercle
//tableau pour les cercles
var circleArray = [];
//generation de plus de cercle en fonction de la taille de la fenêtre
function init() {
    circleArray = [];
    for (var i = 0; i < 100; i++) {
        // dx et dy sont la vitesse de déplacement
        //var radius = 30;
        // rajoute le math.random pour qd la souris reste immobile ça fasse rien 
        var radius = Math.random() * 3 + 1;
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var dx = (Math.random() - 0.5);
        var dy = (Math.random() - 0.5);

        //var circle = new Circle(200, 200, 3, 3, 30);

        // va mettre toutes les infos des cercles dans un tableau
        circleArray.push(new Circle(x, y, dx, dy, radius));
    }
}


// création de la fonction
function animate() {
    // va incrémenter encore et encore
    requestAnimationFrame(animate);

    // evviter de voir tout le déplacement
    // va afficher plus que 1 image a la fois
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }

}

// appele de la fonction
init();
animate();
