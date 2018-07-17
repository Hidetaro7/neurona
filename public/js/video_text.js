function TextVideo () {
	var stageWidth = window.innerWidth, stageHeight = window.innerHeight;
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera( 75, stageWidth / stageHeight, 0.1, 10000 );
	var renderer = new THREE.WebGLRenderer();
	var animationId;
	var controls = new THREE.OrbitControls(camera);
	renderer.setSize(stageWidth, stageHeight); // canvasサイズ指定
	renderer.setClearColor(0xeeeeee); // 画面を黒く
	renderer.domElement.id = 'canvas';
	document.body.appendChild(renderer.domElement);

	camera.position.set(0, 0, 10);

	// ライト
	var directionalLight = new THREE.DirectionalLight('#aaaaff', 1);
	directionalLight.position.set(0, 10, 10);
	scene.add(directionalLight);

	var t = new Text("君");
	var pl = t.create();
	pl.material.map.needsUpdate = true;
	//console.log(pl)
	scene.add(pl)

	function update () {
		animationId = requestAnimationFrame(update);
		controls.update();
		pl.rotation.y+=0.01;
		render()
	}

	function render () {
		renderer.render(scene, camera);
	}
	update();

	function Text (_text) {
		this.x, this.y, this.text = _text, this.z;
		var self = this;
		var cv = document.createElement("canvas");
		this.create = function () {
			cv.width = cv.height = 1024;
			var _ctx = cv.getContext("2d");
			_ctx.font = "1000px 'Noto Sans Japanese'";
			_ctx.fillStyle = "#000"
			_ctx.fillText(self.text, 0, 860);
			var texture = new THREE.Texture(cv);
			var plane = new THREE.Mesh(
	            new THREE.PlaneGeometry(3, 3, 4, 4),
	            new THREE.MeshBasicMaterial({map: texture, wireframe: false, side: THREE.DoubleSide, transparent:true})  // {map: texture}がキモ
	        );
	        return plane;
		}
	}

}

window.onload = TextVideo;