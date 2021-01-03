const { spawn } = require('child_process')
const chalk = require('chalk')
const path = require('path')

function getElectronBin(projectDir){
	if(process.platform === 'win32'){
		return path.join(projectDir, 'node_modules', '.bin', 'electron.cmd')
	}else {
		return path.join(projectDir, 'node_modules', '.bin', 'electron')
	}
}

function useElectron(projectDir, mainFile, extraArguments = []){
	const electronBin = getElectronBin(projectDir)
	
	return {
		connect(task){
			task.watch()
			task.pass()

			task.print(chalk.yellow(` ↳✨ [electron] Running in ${path.basename(mainFile)}`))

			const electronProcess = spawn(electronBin, [mainFile, ...extraArguments],{
				stdio: null
			})

			electronProcess.stdout.on('data', (data) => {
				const purifiedData = data.toString().replace(/^\s*$/,'')
				if(purifiedData !== ''){
					task.print(chalk.yellow(` →✨ [electron]:  ${data}`))
				}
			})

			electronProcess.stdout.on('error', (error) => {
				task.print(chalk.red(` →✨ [electron]:  ${error}`))
			})

			electronProcess.on('close', () => {
				task.next()
			})

		}
	}
}

module.exports = useElectron