# 📑 Tasca

Tasca is a easy-to-use task runner, useful to automate the process of compiling your app.

Install with npm:
```shell
npm i tasca -D
```
Or with yarn:
```shell
yarn add tasca -D
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
	// This is a tree of tasks (it allows you to group different tasks)
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

### Usage

Default task:
```shell
tasca ./tasks.js
```

Custom tasks:
```shell
tasca ./tasks.js --tasks my_task another_task
```

Passing info to the task file as global variables:
```shell
tasca ./tasks.js --info something=Whatever
```

## 🤓 Contributing

This is a monorepo, meaning that there are different packages in the same repository, all under `./packages`

Installing dependencies:
```shell
yarn
```

Running tests:
```shell
yarn test --tasks default watch
```
