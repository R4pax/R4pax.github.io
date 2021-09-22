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
      file: "@/pages/a.js",
      deps: [],
    },
    {
      file: "./src/pages/b.js",
      deps: ["./1.js"],
      hasChanged: false,
    },
  ],
  specs: [
    // информация о тестах
    {
      file: "@/specs/11.js",
      deps: ["/var/www/projects/project1/src/pages/a.js"],
    },
    {
      file: "./src/specs/2.js",
      deps: ["@/pages/b.js"],
    },
    {
      file: "./src/specs/3.js",
      deps: [
        "/var/www/projects/project1/src/pages/b.js",
        "/var/www/projects/project1/src/pages/a.js",
        "/var/www/projects/project1/src/pages/1.js",
      ],
    },
    {
      file: "./src/specs/4.js",
      deps: ["/var/www/projects/project1/src/pages/1.js"],
    },
  ],
};

func = function (input) {
  const obj = JSON.parse(JSON.stringify(input));
  const aliases = obj.aliases;
  const absPath = obj.absoluteRepoPath;

  function addParentPath(path, parent) {
    return path.replace(/^\./, parent);
  }

  for (const key in aliases) {
    aliases[key] = addParentPath(aliases[key], absPath);
  }

  function replaceAliases(path) {
    for (const key in aliases) {
      const value = aliases[key];
      const reg = new RegExp(`^${key}`);
      path = path.replace(reg, value);
    }
    return path;
  }

  function normalizePaths(obj) {
    for (const key in obj) {
      const elem = obj[key];
      elem.file = addParentPath(replaceAliases(elem.file), absPath);
      const path = elem.file.replace(/\/[^\/]*$/, "");
      for (let i = 0; i < elem.deps.length; i++) {
        elem.deps[i] = addParentPath(replaceAliases(elem.deps[i]), path);
      }
    }
  }

  normalizePaths(obj.modules);
  normalizePaths(obj.specs);

  let hasChanged = [];
  obj.modules.forEach((v) => {
    if (v.hasChanged) hasChanged.push(v.file);
  });
  hasChanged = [...new Set(hasChanged)];
  console.log(1, hasChanged);

  let someChanged = true;
  while (someChanged) {
    someChanged = false;
    obj.modules.forEach((module) => {
      if (module.hasChanged) return;
      module.deps.forEach((dep) => {
        if (hasChanged.includes(dep)) {
          hasChanged.push(module.file);
          module.hasChanged = true;
          someChanged = true;
        }
      });
    });
  }
  console.log(2, hasChanged);

  let testToRun = [];
  obj.specs.forEach((test) => {
    test.deps.forEach((dep) => {
      if (hasChanged.includes(dep)) {
        testToRun.push(test.file);
      }
    });
  });

  testToRun = [...new Set(testToRun)];

  return testToRun.sort();
};

console.log(3, func(obj));
