import prisma from "../lib/prisma.js";
export const createPost=async(req,res)=>{
    try{
        const post = await prisma.post.create({
            data:{
                ...req.body
            }
        });
        res.status(201).send(post);
    }catch(err){
        console.log(err);
    }
}

export const getPostsById=async(req,res)=>{
    try{
        const posts = await prisma.post.findMany({
            where:{
                userId:req.params.userId
            }
        });
        res.status(200).send(posts);
    }catch(err){
        console.log(err);
    }
}

export const deletePost=async(req,res)=>{
    try{
        const post = await prisma.post.delete({
            where:{
                id:req.params.id
            }
        });
        res.status(200).send("Post has been deleted");
    }catch(err){
        console.log(err);
    }
}

export const likePost=async(req,res)=>{
    try{
        const post = await prisma.post.findUnique({
            where:{
                id:req.params.id
            }
        });
        if(!post.likes.includes(req.body.userId)){
            const updatedPost = await prisma.post.update({
                where:{
                    id:req.params.id
                },
                data:{
                    likes:{
                        push:req.body.userId
                    }
                }
            });
            res.status(200).send(updatedPost);
        }else{
            const updatedPost = await prisma.post.update({
                where:{
                    id:req.params.id
                },
                data:{
                    likes:{
                        set:updatedPost.likes.filter(id=>id!==req.body.userId)
                    }
                }
            });
            res.status(200).send(updatedPost);
        }
    }catch(err){
        console.log(err);
    }
}

export const createComment=async(req,res)=>{
    try{
        const comment = await prisma.comment.create({
            data:{
                ...req.body
            }
        });
        res.status(201).send(comment);
    }catch(err){
        console.log(err);
    }
}

