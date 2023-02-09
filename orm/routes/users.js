var express = require('express');
const { Response } = require('../helpers/util');
var router = express.Router();
var models = require('../models')
const { Op } = require('sequelize');


/* GET users listing. */
// router.get('/', async function (req, res, next) {
//   try {
//     const users = await models.User.findAll()
//     res.json(new Response(users))
//   } catch (error) {
//     res.status(500).json(new Response(error, false))
//   }
// });

router.get('/', async function (req, res, next) {
  try {
    const { name, phone } = req.query
    console.log(name, phone);

    const page = parseInt(req.query.page) || 1
    const limit = 4
    const offset = (page - 1) * limit

    
    if (name && phone) {
      const {count, rows} = await models.User.findAndCountAll({
        where: {
          [Op.and]: [
            {
              name: {
                [Op.iLike]: '%' + name + '%'
              }
            },
            {
              phone: {
                [Op.iLike]: '%' + phone + '%'
              }
            }
          ]
        },
        limit: limit,
        offset: offset
      })
      const totalPage = Math.ceil(count / limit)
      res.json(new Response({ result: rows, page: page, totalPage: totalPage, offset }))
    } else if (name) {
      const {count, rows} = await models.User.findAndCountAll({
        where: {
          name: {
            [Op.iLike]: '%' + name + '%'
          }
        },
        limit: limit,
        offset: offset
      })
      const totalPage = Math.ceil(count / limit)

      res.json(new Response({ result: rows, page: page, totalPage: totalPage, offset }))
    } else if (phone) {
      const {count, rows} = await models.User.findAndCountAll({
        where: {
          phone: {
            [Op.iLike]: '%' + phone + '%'
          }
        }
      })
      const totalPage = Math.ceil(count / limit)
      res.json(new Response({ result: rows, page: page, totalPage: totalPage, offset }))
    } else {
      const {count, rows} = await models.User.findAndCountAll({
        order: [
          ["id", "ASC"]
        ],
        limit: limit,
        offset: offset
      })
      const totalPage = Math.ceil(count / limit)
      res.json(new Response({ result: rows, page: page, totalPage: totalPage, offset }))
    }
  } catch (err) {
    res.status(500).json(new Response(err, false))
  }
});

router.post('/', async function (req, res, next) {
  try {
    const users = await models.User.create(req.body)
    res.json(new Response(users))
  } catch (error) {
    res.status(500).json(new Response(error, false))

  }
});

router.put('/:id', async function (req, res, next) {
  try {
    const users = await models.User.update(req.body, {
      where: {
        id: req.params.id
      },
      returning: true,
      plain: true
    })
    res.json(new Response(users[1]))
  } catch (error) {
    res.status(500).json(new Response(error, false))
  }
});

router.delete('/:id', async function (req, res, next) {

  try {
    const users = await models.User.destroy({
      where: {
        id: req.params.id
      }
    })
    res.json(new Response(users))
  } catch (error) {
    res.status(500).json(new Response(error, false))
  }
});

module.exports = router;
