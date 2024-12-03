const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const Author = require('../models/Admin')
const multer = require('multer')




// To upload the image Route
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`);
            }
    })

    // file filter to allow specific images 
    const fileFilter = (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
            cb(null, true);
        } else {
            cb(new Error('Only JPEG, PNG, and GIF files are allowed'), false);
        }
    };
    


    const upload = multer ({storage, fileFilter})
// Route to add a blog
router.post('/addblog/:id', upload.single('image'),  async (req, res) => {
    try {
        const { title, content, category } = req.body;
        const id = req.params.id;
        const authoruser = await Author.findById(id);
        if (!authoruser) {
            return res.status(404).json({ message: "Author not found" });
        }
        const authorName = authoruser.name;
        const blog = await Blog.create({
            title,
            content,
            author: authorName,
            category,
            authorId: id,
            image: req.file.path,
        });
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: "Failed to add blog", error: error.message });
    }
});

// Route to update a blog
router.put('/updateblog/:id', upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, category, date, image } = req.body;
        const updateData = {title, category, date, content};

        if (req.file){
            updateData.image = req.file.path;
        }

        const updateBlog = await Blog.findByIdAndUpdate(
            id,
            { title, content, category, date, image },
            { new: true }
        );
        if (!updateBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.json(updateBlog);
    } catch (error) {
        res.status(500).json({ message: "Failed to update blog", error: error.message });
    }
});

// Route to display all blogs
router.get('/displayblog', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Failed to display blogs", error: error.message });
    }
});
router.get('/displayblog/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const blogs = await Blog.find({ authorId: id });
        if (!blogs) {
            return res.status(404).json({ message: "Blog not found for this author" });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to display blogs", error: error.message });
    }
});
// Route for single blog 
router.get('/blog/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: "Failed to display blog", error: error.message });

    }
})


// Route to delete a blog
router.delete('/deleteblog/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deleteBlog = await Blog.findByIdAndDelete(id);
        if (!deleteBlog) {
            return res.status(404).json({ message: "Blog not found", deleteBlog });
        }
        res.json({ message: "Blog Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete blog", error: error.message });
    }
});

// displaying unique authors 
router.get('/authors', async (req, res) => {
    try {
        const authors = await Blog.distinct('author');
        if (authors.length === 0) {
            return res.status(404).json({ message: "No authors found" });
        }
        res.json(authors);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to display authors", error: error.message })
    }

});

// To display unique category
router.get('/categories', async (req, res) => {
    try {
        const categories = [
            "Technology",
            "Sports",
            "Business",
            "Entertainment",
            "Politics",
            ];
        res.json(categories);
    } catch (error) {
        console.log("category errro: " , error)
    }s
    
})

module.exports = router;
