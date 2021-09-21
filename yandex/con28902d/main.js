let obj = {
  // абсолютный путь до дирректории проекта в файловой системе
  absoluteRepoPath: "/var/www/projects/project1",
  // список алиасов по путям из исходной системы сборки
  aliases: {
    "@": "./src",
  },
  // информация обо всех модулях данного проекта
  modules: [
    {
      // относительный от корня путь
      file: "./src/pages/1.js",
      deps: [
        // валидная для исходной системы сборки строка, описывающая путь до модуля
        // гарантируется, что такой модуль существует и описан в данной секции
        "/var/www/projects/project1/src/pages/a.js",
        "./b.js",
      ],
      // был ли изменен программный код данного модуля
      // ключ может не присутствовать, это означает, что код не был изменен
      hasChanged: true,
    },
    {
      file: "./src/pages/a.js",
      deps: ["@/pages/b.js"],
    },
    {
      file: "./src/pages/b.js",
      deps: [],
      hasChanged: true,
    },
  ],
  specs: [
    // информация о тестах
    {
      file: "./src/specs/1.js",
      deps: ["/var/www/projects/project1/src/pages/a.js"],
    },
  ],
};

func = function (input) {
  function fileToAbsPath(file) {
    for (const key in input.aliases) {
      const value = input.aliases[key];
      file = file.replace(key, value);
    }
    return file.replace(/^\.\//, input.absoluteRepoPath + "/");
  }

  let hasChanged = [];
  input.modules.forEach((v) => {
    if (v.hasChanged) hasChanged.push(fileToAbsPath(v.file));
  });
  hasChanged = [...new Set(hasChanged)];

  let someChanged = true;
  while (someChanged) {
    someChanged = false;
    input.modules.forEach((module) => {
      if (module.hasChanged) return;
      let path = module.file.replace(/\/[^/]*$/, "");
      module.deps.forEach((dep) => {
        dep = fileToAbsPath(dep.replace(/^\.\//, path + "/"));
        if (hasChanged.includes(dep)) {
          hasChanged.push(fileToAbsPath(module.file));
          module.hasChanged = true;
          someChanged = true;
        }
      });
    });
  }

  let testToRun = [];
  input.specs.forEach((test) => {
    let path = test.file.replace(/\/[^/]*$/, "");
    test.deps.forEach((dep) => {
      dep = fileToAbsPath(dep.replace(/^\.\//, path + "/"));
      if (hasChanged.includes(dep)) {
        testToRun.push(fileToAbsPath(test.file));
      }
    });
  });

  testToRun = [...new Set(testToRun)];

  return testToRun.sort();
};

console.log(func(obj));
