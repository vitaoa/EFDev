const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');
const cssFormat = require('gulp-css-format');
const base64 = require('gulp-base64');
const glob = require("glob");
const path = require("path");
const spritesmith = require('gulp.spritesmith');
const vinylBuffer = require("vinyl-buffer");
const px2rem = require('gulp-px2rem-plugin');
const fileinclude = require('gulp-file-include');


//---------------------------------------参数声明----------------------------//
const SRC_DIR = './';     // 项目根目录
const fileinclude_DIR = './fileinclude/';   // 源文件目录
const DIST_DIR = './dist/';   // 文件输出目录
const SASS_DIR =   './scss/'; // 样式预处理文件目录

const HTMLNAME = 'index'; //页面名称
const NAME = 'index'; //项目样式名
const REMNAME = 'mw979'; //对应的响应式样式名
const REM = true; //是否支持rem
const REMwidth = 750; //移动端设计稿宽

// 具体项目文件目录
//const CUR_PATH =   'gwfxglobal/app/';
const CUR_PATH =   'gwfxglobal/main/promote/lp8/';
//const CUR_PATH =   'gwfxglobal/main/';
//const CUR_PATH =   'gwfxglobal/edm/rule/';
//const CUR_PATH =   'ID/pc/promote/lp2/';
//const CUR_PATH =   '';

// 清除dist
gulp.task('clean:dist', ()=> {
	del(
		[DIST_DIR + CUR_PATH],
		(err, paths)=> {
			console.log(err);
			console.log('Deleted files/folders:\n', paths.join('\n'));
		}
	);
});

// copy images
gulp.task('copy-img',function () {
	return gulp.src(fileinclude_DIR + CUR_PATH + 'images/*.{png,jpg,gif,jpeg}')
		.pipe(gulp.dest(SRC_DIR+CUR_PATH + 'images/'))
});
gulp.task('copy-video',function () {
	return gulp.src(fileinclude_DIR + CUR_PATH + 'video/*.*')
		.pipe(gulp.dest(SRC_DIR+CUR_PATH + 'video/'))
});

// html编译
gulp.task('html-lp',['copy-img','copy-video'], function() {
	gulp.src([fileinclude_DIR + CUR_PATH + HTMLNAME + '.html'])
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file',
			indent:true,
			context: {
				arr: ['test1', 'test2']
			}
		}))
		.pipe(gulp.dest(SRC_DIR + CUR_PATH));
});

// 打包
gulp.task('packaging',['html-lp'],function () {
	gulp.watch(fileinclude_DIR + CUR_PATH + HTMLNAME + '.html', ['html-lp']);
});

//---------------------------------------lp----------------------------//
// sprites
gulp.task('sprites:more',function(){
	let dirs = glob.sync(fileinclude_DIR + CUR_PATH+"/images/slice/*/*/");
	for(let i = 0;i<dirs.length;i++){
		let baseDir = dirs[i].split("/")[dirs[i].split("/").length-3];
		let basename = path.basename(dirs[i]);
		console.log(baseDir);
		console.log(basename);
		let spriteData = gulp.src(fileinclude_DIR + CUR_PATH + `images/slice/${baseDir}/${basename}/*.{png,jpg,gif,jpeg}`)//需要合并的图片地址
			.pipe(spritesmith({
				imgName: `sp-${baseDir}-${basename}.png`,//保存合并后图片的地址
				cssName: `sp-${baseDir}-${basename}.scss`,//保存合并后对于css样式的地址
				padding:10,//合并时两个图片的间距
				algorithm: 'top-down',
				cssTemplate: function(data){
					let arr1,width1,height1;
					let arr = ["/* ============ sprites ============ */","\n"],
						width = data.spritesheet.px.width,
						height = data.spritesheet.px.height,
						url =  data.spritesheet.image;
					let mVar = data.spritesheet.image.split("/")[data.spritesheet.image.split("/").length-1].indexOf('-m');

					data.sprites.forEach(function(sprite) {
						arr.push(
							"."+sprite.name+
							"{ "+
							"background-position:"+sprite.px.offset_x+" "+sprite.px.offset_y+";"+
							"background-size: "+ width+" "+height+";"+
							"width: "+sprite.px.width+";"+
							"height: "+sprite.px.height+";"+
							"background-image: url('"+url+"');"+
							"background-repeat:no-repeat;"+
							" }\n"
						);
					});

					if(REM && mVar!==-1){
						arr1 = ["\n","/* ============ sprites rem ============ */","\n"];
						width1 = data.spritesheet.rem.width;
						height1 = data.spritesheet.rem.height;

						arr1.push('@media(max-width:'+REMwidth+'px){\n');
						data.sprites.forEach(function(sprite) {
							arr1.push(
								"."+sprite.name+
								"{ "+
								"background-position:"+sprite.rem.offset_x+" "+sprite.rem.offset_y+";"+
								"background-size: "+ width1+" "+height1+";"+
								"width: "+sprite.rem.width+";"+
								"height: "+sprite.rem.height+";"+
								" }\n"
							);
						});
						arr1.push('}');
						return arr.join("")+(arr1.join(""));
					}
					return arr.join("");
				},
				imgPath: `../images/sp-${baseDir}-${basename}.png`,
				spritestamp: true
			}));

		spriteData.img
			.pipe(vinylBuffer())
			.pipe(gulp.dest(SRC_DIR + CUR_PATH + "images"));

		spriteData.css.pipe(gulp.dest(SASS_DIR + CUR_PATH + 'css'));
	}
});

// px2rem
gulp.task('px2rem:lp', function() {
	return gulp.src(SASS_DIR + CUR_PATH + 'css/'+ REMNAME +'.scss')
		.pipe(px2rem({
			'width_design':750,
			'valid_num':2,
			'pieces':7.5,
			'ignore_px':[-1,1]
		}))
		.pipe(gulp.dest(SASS_DIR + CUR_PATH));
});

// scss编译
// gulp.task('sass', function(){
// 	return gulp.src(SASS_DIR + CUR_PATH + 'css/' + NAME + '.scss')
// 		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
// 		.pipe(gulp.dest(SRC_DIR + CUR_PATH + 'css'))
// });
// base64
gulp.task('picbase64:sass',function () {
	return gulp.src(SASS_DIR + CUR_PATH + 'css/' + NAME + '.scss')
		.pipe(base64({
			extensions: ['png', /\.jpg#datauri$/i],
			include:    ['/base64/'],
			maxImageSize:8*1024, // bytes
			debug: true
		}))
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
		.pipe(gulp.dest(SRC_DIR + CUR_PATH + 'css'));
});
// css格式化
gulp.task('css-format', ['picbase64:sass'],function() {
	gulp.src(SRC_DIR + CUR_PATH + 'css/' + NAME + '.css')
		.pipe(cssFormat({tab:4,indent: 1, hasSpace: false}))
		.pipe(gulp.dest(SRC_DIR + CUR_PATH + 'css'));
});
gulp.task('sass:watch',['css-format'],function(event){
	gulp.watch(SASS_DIR + CUR_PATH + '**/*.scss', ['css-format']);
});


//---------------------------------------lp_public----------------------------//
//const lp_public = 'ID/pc/public/css'; //ID
const lp_public = 'gwfxglobal/main/public/css'; //gwfxglobal
// gulp.task('sass:lp_public',function(){
// 	return gulp.src(SASS_DIR + lp_public +'/lp_public.scss')
// 		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
// 		.pipe(gulp.dest(SRC_DIR + lp_public));
// });
gulp.task('picbase64:lp_public',function () {
	return gulp.src(SASS_DIR + lp_public +'/lp_public.scss')
		.pipe(base64({
			extensions: ['png', /\.jpg#datauri$/i],
			include:    ['/base64/'],
			maxImageSize:8*1024, // bytes
			debug: true
		}))
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
		.pipe(gulp.dest(SRC_DIR + lp_public));
});
gulp.task('css-format:lp_public', ['picbase64:lp_public'],function() {
	gulp.src(SRC_DIR + lp_public + '/lp_public.css')
		.pipe(cssFormat({tab:4,indent: 1, hasSpace: false}))
		.pipe(gulp.dest(SRC_DIR + lp_public));
});
gulp.task('lp_public',['css-format:lp_public'],function(event){
	gulp.watch(SASS_DIR + lp_public +'/lp_public.scss', ['css-format:lp_public']);
});