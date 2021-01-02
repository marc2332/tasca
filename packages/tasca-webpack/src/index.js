const webpack = require('webpack')
const chalk = require('chalk')

function useWebpack(config_file, options = {}){	
	const config = require(config_file)
	const instance = webpack(config)
	
	return {
		connect(task){
			if(options.watch === true){
				task.watch()
				let anyError = false
				let firstTime = true
				instance.watch({},(err, stats) => {
					const info = stats.toJson()
					if(stats.hasErrors() && info.errors.length > 0){
						task.print(`\n\n ${info.errors.map(err => err.message)[0]}`)
						anyError = true
					}else {
						if(anyError || firstTime){
							task.print(chalk.yellow(` ↳✨ [webpack] Compiled successfully for '${config.name}'.`))
							if(firstTime) task.pass()
							firstTime = false
						}
						anyError = false
					}
				})
			}else{
				instance.run((err, stats) => {
					const info = stats.toJson()
					if(info.errors.length > 0){
						throw info.errors
					} else{
						task.next()
					}
				})
			}
		}
	}
}

module.exports = useWebpack