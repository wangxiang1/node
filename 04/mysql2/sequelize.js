// 基于Promise的ORM(Object Relation Mapping)，是一种数据库中间件 支持多种数据库、事务、关联等
(async () => {
  const Sequelize = require("sequelize");
  const sequelize = new Sequelize("nodemysql", "root", "root", {
    host: "localhost",
    dialect: "mysql"
  });

  // 定义模型
  const Fruit = sequelize.define("Fruit", {
    id: {
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.DataTypes.UUIDV1,
      primaryKey: true
    },
    name: { type: Sequelize.STRING(20), allowNull: false },
    price: { type: Sequelize.FLOAT, allowNull: false },
    store: { type: Sequelize.INTEGER, defaultValue: 0 }
  });

  // 强制同步：创建表之前先删除已存在的表 {force: true}
  let ret = await Fruit.sync(); // 同步(创建表)
  // ret = await Fruit.create({
  //   name: '香蕉',
  //   price: 3.5
  // })
  // console.log('create:',ret);
  // ret = await Fruit.update({
  //   price: 5.5,
  // }, {
  //   where: {name: '香蕉'}
  // });

  const Op = Sequelize.Op;
  ret = await Fruit.findAll({
    where: { price: { [Op.lt]: 5, [Op.gt]: 2 } }
  });

  console.log("select:", JSON.stringify(ret));
})();
