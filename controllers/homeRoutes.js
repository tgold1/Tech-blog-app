const router = require('express').Router();
const { Blogpost, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    console.log("Hello World")
    //Get all projects and JOIN with user data
   const blogpostData = await Blogpost.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    console.log(blogpostData)
    // Serialize data so the template can read it
     const blogData = blogpostData.map((Blogpost) => Blogpost.get({ plain: true }));
    //res.render('homepage')
    // Pass serialized data and session flag into template
    res.render('homepage', { 
     blogData, 
     logged_in: req.session.logged_in 
    });
  } catch (err)
   {
    console.log(err)
    res.status(500).json(err);
  }
});

router.get('/Blogpost/:id', async (req, res) => {
  try {
    const blogpostData = await Blogpost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const blogPost = blogpostData.get({ plain: true });

    res.render('Blogpost', {
      ...blogPost,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    console.log("--------------------")
    console.log(req.session.user_id)
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blogpost }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
