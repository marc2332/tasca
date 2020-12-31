# Tasca

Tasca is a task runner, useful to automate the process of compiling your app.

Install:
```shell
npm i tasca -D
```

Usage:
```shell
tasca ./tasca.js
```

Example tasks file:

```ts
function Task1(cb){
	cb()
}

function Task2(cb){
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
```
