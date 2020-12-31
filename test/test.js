
function test(cb){
	setTimeout(() => {
		cb()
	}, 2000)
}

function test2(cb){
	//throw new Error("Oh no!")
	cb()
}

function MoreTasks(cb){
	return [
		test,
		test2
	]
}


function Subtree(){
	return [
		test2,
		MoreTasks
	]
}

module.exports.default = [
	test,
	Subtree,
	Subtree
]