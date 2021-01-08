const useWebpack = require('../../tasca-webpack/src/index.js')
const useElectron = require('../../tasca-electron/src/index.js')
const useServe = require('../../tasca-serve/src/index.js')
const useElectronBuilder = require('../../tasca-electron-builder/src/index.js')
const path = require('path')

function Task1(cb){
	cb()
}

function Task2(cb){
		throw "hola"
	cb()
}

function Task3(cb){
	cb()
}

function MultipleTasks(){
	return [
		Task2,
		Task3
	]
}

exports.default = [
	Task1,
	MultipleTasks
]

function BuildWebpack(cb){
	this.use(useWebpack(path.join(__dirname,'./sample/webpack.config.js'), {
		watch: false
	}))
}

exports.buildWebpack = [
	BuildWebpack
]

function WatchWebpack(cb){
	this.use(useWebpack(path.join(__dirname,'./sample/webpack.config.js'), {
		watch: true
	}))
}

function RunElectron(cb){
	this.use(useElectron(
		path.join(__dirname, '..', '..', 'tasca-electron'),
		path.join(__dirname, 'sample','dist', 'dist.sample.js')
	))
}


exports.watch = [
	Task1,
	WatchWebpack,
	RunElectron,
	MultipleTasks
]

function serveFolder(){
	this.use(useServe(path.join(__dirname, 'sample', 'index.html'),{
		port: 9000
	}))
}

exports.serve = [
	serveFolder
]

function buildElectronBuilder(){
	this.use(useElectronBuilder(
		path.join(__dirname, '..', '..', 'tasca-electron-builder'),
		path.join(__dirname, 'sample')
	))
}

exports.build = [
	buildElectronBuilder
]

