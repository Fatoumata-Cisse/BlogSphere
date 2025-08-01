
import Article from '../models/Article.js';


export const createArticle = async (req, res) => {
  const { title, content } = req.body;
  try {
    const article = await Article.create({
      title,
      content,
      author: req.user._id
    });
    res.status(201).json(article);
  } catch (err) {
    res.status(500).json({ message: 'Erreur création article' });
  }
};


export const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find()
      .populate('author', 'username email')
      .sort({ createdAt: -1 });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: 'Erreur chargement articles' });
  }
};


export const viewArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    ).populate('author', 'username email');

    if (!article) return res.status(404).json({ message: 'Article non trouvé' });

    res.json(article);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lecture article' });
  }
};


export const updateArticle = async (req, res) => {
  const { title, content } = req.body;
  try {
    const article = await Article.findById(req.params.id);

    if (!article) return res.status(404).json({ message: 'Article non trouvé' });
    if (article.author.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Non autorisé' });

    article.title = title || article.title;
    article.content = content || article.content;

    const updated = await article.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Erreur modification article' });
  }
};


export const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) return res.status(404).json({ message: 'Article non trouvé' });
    if (article.author.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Non autorisé' });

    await article.remove();
    res.json({ message: 'Article supprimé' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur suppression article' });
  }
};
