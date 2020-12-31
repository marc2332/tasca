const chalk = require('chalk')
const runFile = process.argv[1]
const path = require('path')
const defaultTasks = require(path.relative(process.cwd, runFile)).default
const ora = require('ora');
const { performance } = require('perf_hooks')

runTasks(defaultTasks, '', 0).then(() => {
	if(errors > 0){
		console.log(chalk.red(`\n Exited with ${errors} ${errors === 1 ? 'error' : 'errors'}.`))
	}else{
		console.log(chalk.green(`\n Exited with 0 errors.`))
	}
})

let errors = 0

async function runTasks(tasks, prefix, level){
	for(let i = 0; i < tasks.length; i++){
		const task = tasks[i]
		await new Promise((resolve, reject) => {

			const get_prefix = (loading = false) => {
				if(level > 0) return `${loading ? '' : '  '}${prefix}|-`
				else return `${loading ? '' : '  '}`
			}
			
			const get_time = (endingPoint) => {
				return `${(endingPoint - startingPoint).toFixed(0)}ms`
			}

			const respond = async (res = true, err) => {
				
				let endingPoint = performance.now()
				
				spinner.stopAndPersist()
				if(res === true) {
					console.log(chalk.green(`${get_prefix(false)}✅ Success in ${task.name} (${get_time(endingPoint)})`))
					resolve()
				} else if (res === false){
					console.log(chalk.red(`${get_prefix(false)}❌ Error in ${task.name} (${get_time(endingPoint)})`))
					if(err) console.log(chalk.red(`${get_prefix()}📝 ${err}`))
					errors++
					resolve()
				} else if (Array.isArray(res)){
					await runTasks(res, `${prefix}  `, level+1)
					resolve()
				}
			}
			
			let startingPoint = performance.now()
			
			const spinner = ora({
				text: chalk.blue(`${get_prefix(true)}:: ${task.name}`)
			}).start();
			
			try {
				const funcResult = task(respond)
				if(Array.isArray(funcResult)) respond(funcResult)
			} catch(err){
				respond(false, err)
			}
		})
	}
}