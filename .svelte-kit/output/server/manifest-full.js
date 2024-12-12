export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","music1.opus","music2.opus","music3.opus","music4.opus","sprites/alphabets.png","sprites/figs.png","sprites/leafs.png","sprites/people.png","sprites/students.png","system_images/bg_images/black_board.jpg","system_images/bg_images/black_board_mat.jpg","system_images/bg_images/black_mat.jpg","system_images/bg_images/blue_waves.jpg","system_images/bg_images/brown_stone.jpg","system_images/bg_images/design_old.jpg","system_images/bg_images/drywall.jpg","system_images/bg_images/granite.jpg","system_images/bg_images/gray_marble.jpg","system_images/bg_images/gray_stone.jpg","system_images/bg_images/paper01.jpg","system_images/bg_images/tinted.jpg","system_images/bg_images/wall.jpg","system_images/bg_images/white_mat.jpg","system_images/bg_images/wood.jpg","system_images/gen/atom.png","system_images/gen/black_board.jpg","system_images/gen/carbon-atom.png","system_images/gen/fbise9math.png","system_images/gen/helium-atom.png","system_images/gen/hydrongen-atom.png","system_images/gen/oxygen-atom.png","system_images/gen/people.png","system_images/gen/solarsystem.jpg","system_images/gen/test.png","system_images/gen/wood.jpg"]),
	mimeTypes: {".png":"image/png",".opus":"audio/ogg",".jpg":"image/jpeg"},
	_: {
		client: {"start":"_app/immutable/entry/start.CCK6Elsb.js","app":"_app/immutable/entry/app.CI5Bx6AZ.js","imports":["_app/immutable/entry/start.CCK6Elsb.js","_app/immutable/chunks/entry.KdDpKPhJ.js","_app/immutable/chunks/scheduler.TTby4YTt.js","_app/immutable/chunks/index.CEPKbm7L.js","_app/immutable/entry/app.CI5Bx6AZ.js","_app/immutable/chunks/scheduler.TTby4YTt.js","_app/immutable/chunks/index.CBa6vb3G.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/canvasEditor",
				pattern: /^\/canvasEditor\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/canvasPlayer",
				pattern: /^\/canvasPlayer\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/eqEditor",
				pattern: /^\/eqEditor\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/eqPlayer",
				pattern: /^\/eqPlayer\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
