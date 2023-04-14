import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  const { name, last_name, username, password, email, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      name,
      last_name,
      username,
      password: hashedPassword,
      email,
      role,
    },
  });

  res.status(201).json(newUser);
};

export const login = async (req: Request, res: Response) => {
      
        const {usuario, senha} = req.body.data;
    
        const user = await prisma.user.findUnique({
            where: {
                username: usuario
            }
        })
     
        if(!user){
            throw new Error("usuario ou senha incorretos")
        }
        if(user.status_ !== 'ativo'){
            throw new Error("usuario sem permissão de acesso, entre em contato com o administrtador do sistema")
        }
        
        const verifyPassword = await bcrypt.compare(senha, user.password)
    
        if(!verifyPassword){
            throw new Error("usuario ou senha incorretos")
        }
        //@ts-ignore
        const accessToken = jwt.sign({id: user.id}, process.env.JWT_PASS, {expiresIn: '12h'})
    
        const {password: _, ...userLogin} = user
     
        res.json({user: userLogin, accessToken: accessToken});
    
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

  res.json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedUser = await prisma.user.delete({
    where: { id: Number(id) },
  });

  res.json(deletedUser);
};
