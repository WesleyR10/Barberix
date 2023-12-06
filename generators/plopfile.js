module.exports = function (plop) {
  plop.setGenerator("entities", {
    description: "Create a new entity",
    prompts: [
      { type: "input", name: "name", message: "What is the name of the entity?" },
    ],
    actions: [...entitiesCreations]
  });
  plop.setGenerator("useCases", {
    description: "Create a new useCase",
    prompts: [
      { type: "input", name: "name", message: "What is the name of the useCase?" },
    ],
    actions: [...useCasesCreations],
  });
};

const entitiesCreations = [
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/entities/{{camelCase name}}Entity.ts",
    templateFile: "./templates/entities/DomainEntity.ts.hbs",
  },
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/entities/{{camelCase name}}Entity.spec.ts",
    templateFile: "./templates/entities/DomainEntity.spec.ts.hbs",
  },
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/entities/index.ts",
    templateFile: "./templates/entities/index.ts.hbs",
  },
];

const useCasesCreations = [
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/repositories/contracts/index.ts",
    templateFile: "./templates/repositories/contracts/index.ts.hbs",
  },
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/repositories/contracts/add{{pascalCase name}}Repository.ts",
    templateFile: "./templates/repositories/contracts/addDomainRepository.ts.hbs",
  },
];