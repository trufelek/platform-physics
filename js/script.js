function loop() {
    // skok
    if (game.keys[38]) {
        if(!player.jump) {
            player.jump = true;

            // prędkość w osi y: Vn+1 = Vn - g * dt
            player.vy -= game.g * game.dt;
        }
    }

    // w prawo
    if (game.keys[39]) {
        if(!player.jump) {
            player.move = 'right';

            // prędkość w osi x: Vn+1 = Vn - g * dt
            if(player.vx < player.speed) {
                player.vx += game.g * game.dt + game.a;
            }

            //przyspieszenie liniowe
            if(player.vx < player.speed) {
                game.a += 0.5;
            }

            //tarcie: Ft = -μmq
            player.vx *= -game.μ * game.m * game.g;
        }
    }

    // w lewo
    if (game.keys[37]) {
        if(!player.jump) {
            player.move = 'left';

            // prędkość w osi x: Vn+1 = Vn - g * dt
            if(player.vx > -player.speed) {
                player.vx -= game.g * game.dt + game.a;
            }

            //przyspieszenie liniowe
            if(player.vx > -player.speed) {
                game.a += 0.5;
            }

            //tarcie: Ft = -μmq
            player.vx *= -game.μ * game.m * game.g;
        }
    }

    // grawitacja
    if (player.jump) {
        player.vy += game.gravity;

        if(player.move == 'right') {
            if(player.vx < player.speed) {
                player.vx += game.g * game.dt + game.a;
                //TODO: opór powietrza
                player.vx *= 0.2;
            }
        }

        if (player.move == 'left') {
            if(player.vx > -player.speed) {
                player.vx -= game.g * game.dt + game.a;
                //TODO: opór powietrza
                player.vx *= 0.2;
            }
        }
    } else {
        player.vy = 0;
    }

    // Yn+1 = Yn + Vn * dt
    player.x += player.vx * game.dt;
    player.y += player.vy * game.dt;

    if (player.x >= canvas.width - player.width) {
        player.x = canvas.width - player.width;
    } else if (player.x <= 0) {
        player.x = 0;
    }

    if (player.y >= canvas.height - player.height){
        player.y = canvas.height - player.height;
        player.jump = false;
        player.vx = 0;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = player.fill;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    //drawTiles(tile);

    fps(loop);
};

window.onload = function() {
    game.init();
}