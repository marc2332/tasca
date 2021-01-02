# Tasca

Tasca is a task runner, useful to automate the process of compiling your app.

Install:
```shell
npm i tasca -D
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

Usage:
```shell
tasca ./tasca.js
```

## Contributing

This is a monorepo, meaning that there are different packages in the same repository, all under `./packages`

Installing dependencies:
```shell
yarn
```

Running tests:
```shell
yarn test --tasks default watch
```
