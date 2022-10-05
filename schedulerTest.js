const { Scheduler } = require("./build/Scheduler");

const scheduler = new Scheduler(10);

for (let i = 0; i < 100; i++) {
	scheduler.schedule(async () => {
		console.log("starting task", i);
		await new Promise((resolve) => {
			setTimeout(resolve, Math.random() * 1000 + 200);
		});
		console.log("completed task", i);
		return i;
	});
}

scheduler.start().then((result) => console.log(result));

const scheduler2 = new Scheduler(0);
scheduler2.start().then((result) => console.log(result));
