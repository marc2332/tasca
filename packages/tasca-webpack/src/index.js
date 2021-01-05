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
						info.errors.map(err => {
							task.print(chalk.red(` ↳❌ [webpack] Error in: ${err.moduleName}\n\n`)+` ${err.message}`)
						})
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
						task.print(`\n\n ${info.errors.map(err => err.message)[0]} <--`)
						task.error(`↳❌ [webpack] Couldn't compile for '${config.name}'.`)
					} else{
						task.next()
					}
				})
			}
		}
	}
}

module.exports = useWebpack