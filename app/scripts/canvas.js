document.addEventListener('DOMContentLoaded', function() {
	
	
	
	function resizeCanvas() {
		
  	c.width = window.innerWidth * 2;
  	c.height = window.innerHeight * 2;
		resetAnimation();
		
	}
	
	
	
	function resetAnimation() {
		
		cancelAnimationFrame(raf);

		settings.minSwingRadius = Math.max(c.width, c.height) * settings.minSwingRadiusRatio;
		settings.maxSwingRadius = Math.max(c.width, c.height) * settings.maxSwingRadiusRatio;
		settings.numParticles = Math.min(settings.maxParticles, Math.max(settings.minParticles, Math.round(c.width * c.height * settings.particlesPerPixel)));
		
		document.getElementsByClassName('particles')[0].textContent = settings.numParticles;
		
		particles = {};
		particleIndex = 0;
		for(var i = 0; i < settings.numParticles; i++){
			new particle();
		}
		
		raf = requestAnimationFrame(render);
	
	}
	
	
	
	function particle() {
		
		this.size = Math.round((Math.pow(Math.random(), settings.sizePower) * (settings.maxSize - settings.minSize)) + settings.minSize);
		this.x = Math.round(Math.random() * c.width);
		this.y = Math.round(Math.random() * c.height);
		this.theta = Math.random() * 360;
		this.swingRadius = (Math.random() * (settings.maxSwingRadius - settings.minSwingRadius)) + settings.minSwingRadius;
		this.speed = (Math.pow(Math.random(), settings.speedPower) * (settings.maxSpeed - settings.minSpeed)) + settings.minSpeed;
		this.speed = (Math.random() > .5) ? this.speed : 0 - this.speed;
		this.opacity = (Math.pow(Math.random(), settings.opacityPower) * (settings.maxOpacity - settings.minOpacity)) + settings.minOpacity;
		
		particleIndex++;
		this.id = particleIndex;
		particles[particleIndex] = this;  
			
	}
	
	
	
	particle.prototype.draw = function(delta) {
		
		var secs = delta / 1000;
		this.theta += this.speed * secs;
		var drawX = this.x + this.swingRadius * Math.cos(this.theta);
		var drawY = this.y + this.swingRadius * Math.sin(this.theta);
		
    ctx.fillStyle = 'rgba(255,255,255,'+this.opacity+')';
		ctx.beginPath();
    ctx.arc(drawX, drawY, this.size, 0, Math.PI*2, true);
   	ctx.closePath();
    ctx.fill();

	}
	
	
	
	function render() {

		var delta = Date.now() - lastRender;
		lastRender = Date.now();

		if(delta > 0) {
			var fps = Math.round(1000/delta);
			fpsLog.push(fps);
			if(fpsLog.length > 1000) fpsLog.shift();
			fps = 0;
			for(var i = 0, l = fpsLog.length; i < l; i++){
				fps += fpsLog[i];
			}
			fps = Math.round(fps / fpsLog.length);
			document.getElementsByClassName('fps')[0].textContent = fps;
		}

		ctx.clearRect(0, 0, c.width, c.height);

		for(var i in particles) {
			particles[i].draw(delta);
		}

		raf = requestAnimationFrame(render);
	
	}

	
	
	var settings = {
		minSize: 6,
		maxSize: 30,
		sizePower: 7,
		minOpacity: .1,
		maxOpacity: .3,
		opacityPower: 5,
		minSwingRadiusRatio: .1,
		maxSwingRadiusRatio: .8,
		minSpeed: .01,
		maxSpeed: .1,
		speedPower: 2,
		particlesPerPixel: .0002,
		minParticles: 150,
		maxParticles: 1500
	};	
  
	var particleIndex = 0;
	var particles = {};
	
	var c = document.createElement("canvas");
	document.body.appendChild(c);
  var ctx = c.getContext("2d");
	var raf;
	var fpsLog = Array();
	var lastRender = Date.now();
	
	window.addEventListener('resize', resizeCanvas, false);
	resizeCanvas();
	
});