import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const create = async (req: Request, res: Response) => {
  const { name, last_name, password, email, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      name,
      last_name,
      username: name.trim() + '.' + last_name.trim(),
      password: hashedPassword,
      email,
      role,
    },
  });

  res.status(201).json({
    message: "Usuário criado com sucesso!",
    user: newUser
  });
};

export const login = async (req: Request, res: Response) => {

  console.log(req.body);
  
      
        const {username, password} = req.body;
    
        const newUser = await prisma.user.findUnique({
            where: {
                username
            }
        })
     
        if(!newUser){
            throw new Error("usuario ou senha incorretos")
        }
        if(newUser.status_ !== 'enabled'){
            throw new Error("usuario sem permissão de acesso, entre em contato com o administrtador do sistema")
        }
        
        const verifyPassword = await bcrypt.compare(password, newUser.password)
    
        if(!verifyPassword){
            throw new Error("usuario ou senha incorretos")
        }
        //@ts-ignore
        const accessToken = jwt.sign({id: newUser.id}, process.env.JWT_PASS, {expiresIn: '12h'})
    
        const {password: _, ...userLogin} = newUser
     
        res.json({newUser: userLogin, accessToken: accessToken});
    
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      last_name: true,
      username: true,
      email: true,
      created_at: true,
      updated_at: true,
      role: true,
      status_: true,
    },
  });

  res.json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
    select: {
      id: true,
      name: true,
      last_name: true,
      username: true,
      email: true,
      created_at: true,
      updated_at: true,
      role: true,
      status_: true,
    },
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, last_name, username, email, role, status_ } = req.body;

  const user = await prisma.user.update({
    where: { id: Number(id) },
    data: {
      name,
      last_name,
      username,
      email,
      role,
      status_,
    },
  });

  res.status(200).json({
    message: "Usuário alterado com sucesso!",
    user: user
  });
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedUser = await prisma.user.delete({
    where: { id: Number(id) },
  });

  res.status(200).json({
    message: "Usuário deletado com sucesso!",
    user: deletedUser
  });
};
