/**
 * Created by ushow jack on 2017/4/5.
 */
"use strict"

var gulp = require("gulp"),
    uglify = require("gulp-uglify"),
    changed = require("gulp-changed"),
    clean = require("gulp-clean"), // 文件清理
    plumber = require("gulp-plumber"), //异常处理插件，不会中断打包
    babel = require("gulp-babel"); //引入es6编译插件


//jsUglify 对JavaScript文件进行编译，并且压缩文件，在此避免压缩依赖压缩文件

gulp.task("jsUglify", function() {
    return gulp.src(["static/script/*.js", "static/script/base/*.js"], { base: "script" })
        .pipe(plumber())
        .pipe(babel({
            presets: ["es2015"]
        }))
        .pipe(uglify().on("error", function(e) {
            console.log(e)
        }))
        .pipe(gulp.dest("dist-npm/script/"));
})

//为解决删除文件时无法在打包文件处删除的问题，先将style下面所有文件删除，再重新打包一次，不推荐使用，只是用来玩一下
gulp.task("clean", function() {
    return gulp.src("dist-npm/*", { read: false })
        .pipe(clean());
})
gulp.task("build", ["jsUglify"])