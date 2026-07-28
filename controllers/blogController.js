const prisma = require('../config/database');

exports.index = async (req, res) => {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    });
    const categories = await prisma.blogPost.groupBy({
      by: ['category'],
      _count: { id: true },
    });
    res.render('pages/blog', { title: 'Blog - Ngure', posts, categories });
  } catch (err) {
    res.render('pages/blog', { title: 'Blog - Ngure', posts: [], categories: [] });
  }
};

exports.byCategory = async (req, res) => {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true, category: req.params.category },
      orderBy: { createdAt: 'desc' },
    });
    const categories = await prisma.blogPost.groupBy({
      by: ['category'],
      _count: { id: true },
    });
    res.render('pages/blog', {
      title: `${req.params.category} - Blog - Ngure`,
      posts,
      categories,
      activeCategory: req.params.category,
    });
  } catch (err) {
    res.render('pages/blog', { title: 'Blog - Ngure', posts: [], categories: [] });
  }
};

exports.show = async (req, res) => {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug: req.params.slug },
    });
    if (!post || !post.published) return res.status(404).render('pages/404', { title: 'Post Not Found' });
    const related = await prisma.blogPost.findMany({
      where: { published: true, id: { not: post.id }, category: post.category },
      take: 3,
    });
    res.render('pages/blog-post', {
      title: `${post.title} - Ngure`,
      post,
      related,
    });
  } catch (err) {
    res.status(404).render('pages/404', { title: 'Post Not Found' });
  }
};
