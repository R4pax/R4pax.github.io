class TaskMonitor {
  constructor(func) {
    this.complete = func;
    this.bots = [];
  }

  isEmpty() {
    return this.bots.filter((v) => v !== 0).length == 0;
  }

  setTask(bot, task) {
    this.bots[bot] = task;
    if (this.isEmpty()) this.complete();
  }

  watch() {
    console.log(this.bots.join("\t\t"));
    if (!this.isEmpty()) {
      setTimeout(() => {
        this.watch();
      }, 100);
    }
  }
}

class TaskManager {
  constructor(N) {
    this.queue = [];
    this.N = N;
    this.report = [];
    this.monitor = null;
    for (let i = 0; i < N; i++) {
      this.report[i] = {
        successCount: 0,
        failedCount: 0,
        tasks: [],
        timeSpent: 0,
      };
    }
  }

  addToQueue(task) {
    this.queue.push(task);
  }

  run() {
    this.queue.sort((a, b) => (Number(a.priority) > Number(b.priority) ? 1 : -1));

    const getTask = (id) => {
      if (this.queue.length < 1) {
        this.monitor.setTask(id, 0);
        return;
      }
      let task = this.queue.pop();
      let rep = this.report[id];
      rep.tasks.push(task.id);
      this.monitor.setTask(id, task.id);
      let startTime = new Date().getTime();
      task
        .job()
        .then((r) => {
          let endTime = new Date().getTime();
          rep.timeSpent += endTime - startTime;
          rep.successCount++;
          getTask(id);
        })
        .catch((r) => {
          let endTime = new Date().getTime();
          rep.timeSpent += endTime - startTime;
          rep.failedCount++;
          getTask(id);
        });
    };

    console.log(this.queue);
    return new Promise((resolve, reject) => {
      this.monitor = new TaskMonitor(() => {
        resolve(this.report);
      });
      for (let i = 0; i < this.N; i++) {
        getTask(i);
      }
      this.monitor.watch();
    });
  }
}

(async () => {
  const generateJob = (id) =>
    function () {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          Math.random() > 0.5 ? resolve() : reject();
        }, Math.random() * 2000);
      });
    };

  const tm = new TaskManager(5);

  for (let i = 0; i < 20; i++) {
    tm.addToQueue({
      id: `id${i}`,
      priority: (Math.random() * 10).toFixed(),
      job: generateJob(`id${i}`),
    });
  }

  const report = await tm.run();
  console.log(report);
})();
