const handler = require('serve-handler')
const express = require('express')
const chalk = require('chalk')
const path = require('path')

function useServe(public_path,{
	port = 8080,
	host = '127.0.0.1'
}){
	
	const app = express()
	
	return {
		connect(task){
			task.watch()
			task.pass()
			
			app.use((req,res) => {
				handler(req,res,{
					public: public_path
				})
			})
			
			app.listen(port, host, () => {
				task.print(chalk.yellow(` ↳✨ Serving ${path.join(path.dirname(public_path),path.basename(public_path))} in port ${port}`))
			})
		}
	}
}

module.exports = useServe