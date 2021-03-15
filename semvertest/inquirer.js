const inquirer = require("inquirer");

inquirer
  .prompt([
    {
      type: "checkbox",
      name: "vueVersion",
      message: "请选择要使用的vue版本",
      default: "vue2",
      choices: [
        { name: "vue", value: "vue",short:1 },
        { name: "vue2", value: "vue2",short:2 },
        { name: "vue3", value: "vue3",short:3 },
      ],
      validate:function(input){
          console.log(input,'hhh')
          const done = this.async()
          done(null,true)
      },

    },
  ])
  .then((answers) => {
      console.log(answers,'kkk')
  })
  .catch((error) => {});
