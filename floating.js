	const floatingBox = document.querySelector('.floating-box');
        let posX = Math.random() * window.innerWidth;
        let posY = Math.random() * window.innerHeight;
        let speedX = (Math.random() - 0.5) * 4; // 随机水平速度
        let speedY = (Math.random() - 0.5) * 4; // 随机垂直速度
        const boxSize = 100; // 元素大小
	const escapeSpeed = 8; // 逃跑时的最大速度
        const friction = 0.95; // 摩擦力，用于减速
        const escapeDistance =100; // 躲避鼠标的距离
	let lock =0;
	let superspeek = false;
        function move() {
            // 更新位置
            posX += speedX;
            posY += speedY;

            // 边界检测
            if (posX < 0 || posX > window.innerWidth - boxSize) {
                speedX = -speedX;
            }
            if (posY < 0 || posY > window.innerHeight - boxSize) {
                speedY = -speedY;
            }

            // 设置新位置
            floatingBox.style.left = `${posX}px`;
            floatingBox.style.top = `${posY}px`;

            requestAnimationFrame(move);
        }

        // 躲避鼠标
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            const distanceX = mouseX - posX;
            const distanceY = mouseY - posY;
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            if (distance <= escapeDistance  ) {
		
 		if (lock ==0) {
		
		
		                // 如果鼠标靠近，改变方向
               const randomAngle = Math.random() * Math.PI * 2; // 随机角度
                const escapeX = Math.cos(randomAngle) * escapeSpeed;
                const escapeY = Math.sin(randomAngle) * escapeSpeed;
		
                // 加速逃跑
		superspeek = true;
                speedX = escapeX;
                speedY = escapeY;		}
		lock = (lock+1)%50;
            }else{lock=0; }
	 if (distance > 200  && superspeek) {
		
		 speedX *=0.6; // 随机水平速度
       		 speedY *=0.6; // 随机垂直速度
		if (speedX < 1) {superspeek = false;	}
 }

        });

        // 躲避点击
        floatingBox.addEventListener('click', () => {
            // 点击时随机改变位置
            posX = Math.random() * (window.innerWidth - boxSize);
            posY = Math.random() * (window.innerHeight - boxSize);
            speedX = (Math.random() - 0.5) * 4;
            speedY = (Math.random() - 0.5) * 4;
        });

        // 初始化位置
        floatingBox.style.left = `${posX}px`;
        floatingBox.style.top = `${posY}px`;

        // 开始移动
        move();
