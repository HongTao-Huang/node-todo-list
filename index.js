const inquirer = require('inquirer')
const db = require('./db.js')

// 删除
const del = (index, list) => {
  list && list.splice(index, 1)
  db.write(list)
}

// 完成
const finish = (index, list) => {
  list[index].done = true
  db.write(list)
}

// 未完成
const unfinished = (index, list) => {
  list[index].done = false
  db.write(list)
}

// 编辑标题
const edit = (index, list) => {
  inquirer
    .prompt({
      type: 'input',
      name: 'title',
      message: '新的标题',
      default: list[index].title,
    })
    .then(async (answer) => {
      list[index].title = answer.title
      await db.write(list)
    })
}

// 新建任务
const createTask = (list) => {
  inquirer
    .prompt({
      type: 'input',
      name: 'title',
      message: '新建任务',
    })
    .then(async ({ title }) => {
      list.push({ title, done: false })
      await db.write(list)
      console.log('新建任务成功')
    })
}

// 操作
const operate = (index, list) => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'value',
        message: '请选择你的操作',
        default: true,
        choices: [
          { name: '退出', value: 'exit' },
          { name: '删除', value: 'del' },
          { name: '已完成', value: 'finish' },
          { name: '未完成', value: 'unfinished' },
          { name: '改标题', value: 'edit' },
        ],
      },
    ])
    .then((answers) => {
      const actions = { del, finish, unfinished, edit }
      const action = actions[answers.value]
      action && action(index, list)
    })
}

// 首页
const start = async () => {
  const list = await db.read()
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'index',
        message: '请选择你想操作的任务',
        default: true,
        choices: [
          { name: '退出', value: -1 },
          ...list.map((item, index) => {
            return {
              name: `${item.done ? '[✅]' : '[❌]'} ${index + 1} - ${
                item.title
              }`,
              value: index,
            }
          }),
          { name: '创建任务', value: -2 },
        ],
      },
    ])
    .then((answers) => {
      answers.index >= 0 && operate(answers.index, list)
      answers.index === -2 && createTask(list)
    })
}

module.exports = {
  async add(...arg) {
    const args = arg.slice(0, -1)
    const title = args.join('')
    const list = await db.read()
    list.push({ title, done: false })
    await db.write(list)
  },
  async clear() {
    await db.write([])
  },
  async show() {
    const list = await db.read()
    list &&
      list.forEach((item, index) =>
        console.log(`${item.done ? '[✅]' : '[❌]'}   ${item.title}`)
      )
  },
  start,
}
