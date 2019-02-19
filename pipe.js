(function(){
    var Pipe=window.Pipe=function(){
        this.image_down=[game.R.pipe_down,game.R.pipe2_down];
        this.image_up=[game.R.pipe_up,game.R.pipe2_up];
        this.y=(Math.random() * (0.55 - 0.1) + 0.1)*game.canvas.height-320;
        this.w=52;
        this.h=320;
        this.x=game.canvas.width; //起始X位置
        this.speed=game.land.speed; //速度跟随大地速度
        this.gap=140; //空隙距离
        this.colorIndex_1=Math.floor(Math.random() * (2 - 0)) + 0;//随机数一
        this.colorIndex_2=Math.floor(Math.random() * (2 - 0)) + 0;//随机数二

        //是否已经加过分
        this.scoreflag=false;

        //将自己放入到数组
        game.pipeArr.push(this);
    };
    Pipe.prototype.render=function(){
        //顶部管子渲染
        game.ctx.drawImage(this.image_down[this.colorIndex_1],this.x,this.y);
        game.ctx.drawImage(this.image_up[this.colorIndex_1],this.x,this.y-this.h);
        //底部管子渲染
        game.ctx.drawImage(this.image_up[this.colorIndex_2],this.x,this.y+this.h+this.gap);
        game.ctx.drawImage(this.image_down[this.colorIndex_2],this.x,this.y+this.h+this.gap+this.h);

    };
    Pipe.prototype.update=function(){
        this.x-=this.speed;
        //检查自己是否撞到鸟
        if(game.bird.R>this.x&&game.bird.L<this.x+52)
        {
            if(game.bird.T<this.y+330||game.bird.B>this.y+this.gap+330)
            {
                clearInterval(game.timer);
                
                setTimeout(function(){
                    game.score=0;
                    game.start();
                },1200)
                
            }
        }

        //加分
        if(!this.scoreflag && game.bird.R>this.x+this.w)
        {
            game.score++;
            this.scoreflag=true;
        }


    };


})();
