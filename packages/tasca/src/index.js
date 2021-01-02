#!/usr/bin/env node

const chalk = require('chalk')

const path = require('path')
const ora = require('ora');
const { performance } = require('perf_hooks')
const { Command  } = require('commander');

const program = new Command();

program.option('-t, --tasks <string...>', 'specify custom tasks')
program.parse(process.argv);

const runFile = process.argv[2]
const Tasks = require(path.join(process.cwd(), runFile));

(async () => {
	if(program.tasks == null || program.tasks?.length === 0){
		executeTask(Tasks.default)
	}else{
		for(let taskName of program.tasks){
			await executeTasksGroup(taskName, Tasks[taskName])
		}
	}
})()

async function executeTasksGroup(tasksName, tasksGroup){
	console.log(chalk.magenta(`\n [${tasksName}] \n`))
	await runTasks(tasksGroup, '', 0)
	if(errors > 0){
		console.log(chalk.red(`\n Finished with ${errors} ${errors === 1 ? 'error' : 'errors'}. \n`))
	}else{
		console.log(chalk.green(`\n Finished with 0 errors. \n`))
	}
}

let errors = 0

async function runTasks(tasks, prefix, level){
	for(let i = 0; i < tasks.length; i++){
		const task = tasks[i]
		await new Promise((resolve, reject) => {
			
			const get_prefix = (loading = false) => {
				if(level > 0) return `${loading ? '' : '  '}${prefix}`
				else return `${loading ? '' : '  '}`
			}
			
			const get_time = (endingPoint) => {
				return `${(endingPoint - startingPoint).toFixed(0)}ms`
			}

			const respond = async (res = true, err) => {
				
				let endingPoint = performance.now()
				
				if(res === true) {
					spinner.stopAndPersist()
					console.log(chalk.green(`${get_prefix(false)} ↳✅ Success in ${task.name} (${get_time(endingPoint)})`))
					resolve()
				} else if (res === false){
					spinner.stopAndPersist()
					console.log(chalk.red(`${get_prefix(false)} ↳❌ Error in ${task.name} (${get_time(endingPoint)})`))
					if(err) console.log(chalk.red(`${get_prefix()}📝 ${err}`))
					errors++
					resolve()
				} else if (Array.isArray(res)){
					spinner.stopAndPersist()
					await runTasks(res, `${prefix}  `, level+1)
					resolve()
				} else if (res === 'pass'){
					spinner.stop()
					resolve()
				} else if (res === 'watch'){
					spinner.stopAndPersist()
					console.log(chalk.cyan(`${get_prefix(false)} ↳✨ Watching in ${task.name}`))
				}else{
					resolve()
				}
			}
			
			
			let startingPoint = performance.now()
			
			let spinner = ora({
				text: chalk.blue(`${get_prefix(true)}:: ${task.name}`)
			}).start()
			
			const wrapper = {
				watch(){
					respond('watch')
				},
				pass(){
					respond('pass')
				},
				use({ connect }){
					connect(wrapper)
				},
				next(result){
					respond(result)
				},
				print(...arguments){
					arguments.forEach(arg => {
						console.log(`${get_prefix(false)}${arg}`)
					})
				}
			}
			
			try {
				const funcResult = task.bind(wrapper)(respond)
				if(Array.isArray(funcResult)) respond(funcResult)
			} catch(err){
				respond(false, err)
			}
		})
	}
}