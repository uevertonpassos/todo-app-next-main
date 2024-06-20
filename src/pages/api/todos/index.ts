import {MongoClient} from "mongodb";
import {NextApiRequest, NextApiResponse} from "next";
export default async function handler(req: NextApiRequest,res:NextApiResponse){
    if(req.method === 'POST'){
        try{
            const client = await MongoClient.connect("mongodb+srv://test_user:CyIxNuOeNZX4xzmf@mycluster.tw0suos.mongodb.net/?retryWrites=true&w=majority")
            const db = await client.db('todos')
            const todosCollection = await db.collection('todos');
            await todosCollection.insertOne(req.body)
            await client.close();
            res.status(201).json({message: "Todo created!"})
        }
        catch (e) {
            res.status(500).json({message: "Something went wrong"})
        }

    }
    if (req.method === 'GET'){
        const client = await MongoClient.connect("mongodb+srv://test_user:CyIxNuOeNZX4xzmf@mycluster.tw0suos.mongodb.net/?retryWrites=true&w=majority")
        const db = await client.db('todos')
        const todosCollection = await db.collection('todos');
        const allTodos = await todosCollection.find({}).toArray();
        await client.close();
        const processedTodos = allTodos.map(todo =>{
            return {
                name: todo.name,
                status: todo.status,
                id: todo._id.toString()
            }
        })
        res.status(200).json(processedTodos);
    }
    if(req.method === 'DELETE'){
        const client = await MongoClient.connect("mongodb+srv://test_user:CyIxNuOeNZX4xzmf@mycluster.tw0suos.mongodb.net/?retryWrites=true&w=majority")
        const db = await client.db('todos')
        const todosCollection = await db.collection('todos');
        const deletedItems = await todosCollection.deleteMany({status: "completed"})
        res.status(200).json({deletedItems})
    }
}