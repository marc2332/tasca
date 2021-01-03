const { spawn } = require('child_process')
const dargs = require('dargs')
const path = require('path')
const chalk = require('chalk')

function getElectronBuilderBin(rootDir){
	if(process.platform === 'win32'){
		return path.join(rootDir, 'node_modules', '.bin', 'electron-builder.cmd')
	}else {
		return path.join(rootDir, 'node_modules', '.bin', 'electron-builder')
	}
}

function useElectronBuilder(rootDir,projectDir, args = {}){
	
	const electronBuilderBin = getElectronBuilderBin(rootDir)
	
	return {
		connect(task){
			task.watch()
			task.pass()
			
			const electronBuilderProcess = spawn(electronBuilderBin, ['build', ...dargs({
				project: projectDir,
				...args
			}) ],{
				stdio: null
			})

			electronBuilderProcess.stdout.on('data', (data) => {
				const purifiedData = data.toString().replace(/^\s*$/,'')
				if(purifiedData !== '' && !data.includes('•')){
					task.print(chalk.yellow(` →✨ [electron-builder]:  • ${data}`))
				}
			})

			electronBuilderProcess.stderr.on('data', (error) => {
				task.print(chalk.red(` →✨ [electron-builder]:  ${error}`))
			})

			electronBuilderProcess.on('close', () => {
				task.next()
			})
		}
	}
}

module.exports = useElectronBuilder