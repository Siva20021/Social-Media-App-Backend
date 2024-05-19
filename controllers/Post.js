import prisma from "../lib/prisma.js";
export const createPost=async(req,res)=>{
    try{
        const post = await prisma.posts.create({
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
        const posts = await prisma.posts.findMany({
            where:{
                userId:req.params.userId
            }
        });
        res.status(200).send(posts);
    }catch(err){
        console.log(err);
    }
}

export const getPost = async(req,res)=>{
    try{
        const post = await prisma.posts.findMany({
            include:{
                comments:true,
                Likes:true
            }
        });
        res.status(200).send(post);
    }catch(err){
        console.log(err);
    }
}

export const deletePost=async(req,res)=>{
    try{
        const post = await prisma.posts.delete({
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
    const { userId } = req.body;
    const { id: postId } = req.params;
    try{
        const existingLike = await prisma.likes.findFirst({
            where: {
              userId,
              postId,
            },
          });
        if(existingLike){
            await prisma.likes.delete({
                where:{
                    id:existingLike.id
                }
            });
            res.status(200).send("Post has been unliked");
        }else{
            const like = await prisma.likes.create({
                data:{
                    userId,
                    postId
                }
            });
            res.status(201).send(like);
        }
    }catch(err){
        console.log(err);
    }
}

export const createComment=async(req,res)=>{
    try{
        const comment = await prisma.comments.create({
            data:{
                ...req.body,
                postId:req.params.id
            }
        });
        res.status(201).send(comment);
    }catch(err){
        console.log(err);
    }
}

