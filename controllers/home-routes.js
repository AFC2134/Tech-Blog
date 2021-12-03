const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth')

router.get('/', (req, res) => {
    console.log(req.session);
    Post.findAll({
      attributes: [
        'id',
        'title',
        'created_at',
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => {
        // pass a single post object into the homepage template
        const posts = dbPostData.map(post => post.get({ plain: true }));
        console.log(dbPostData[0]);
        res.render('homepage', { 
          posts,
          loggedIn: req.session.loggedIn
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

router.get('/signup', (req, res) => {
    res.render('signup')
});

router.get('/login', (req, res) => {
    res.render('login')
});

router.get('/dashboard', withAuth, (req,res) => {
  Post.findAll({
    where: {
      // use the ID from the session
      user_id: req.session.user_id
    },
    attributes: [
      'id',
      'title',
      'body',
      'created_at',
      'user_id'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      // serialize data before passing to template
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('dashboard', { posts, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/singlepost/:id', (req, res) => {
  Post.findOne({
    where: {
        id: req.params.id
    },
    attributes: ['id',
        'title',
        'body',
        'created_at',
        'user_id'
    ],

    include: [
        {
            model: User,
            attributes: ['username']
        },
        {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
              model: User,
              attributes: ['username']
            }
          },
       
    ]
})
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        console.log(dbPostData.dataValues)
        console.log(dbPostData.dataValues.user.dataValues.username)
        res.render('single-post', {
          post: dbPostData.dataValues,
          loggedIn: req.session.loggedIn

        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
  
});



module.exports = router;