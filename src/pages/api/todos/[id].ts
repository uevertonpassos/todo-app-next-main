import {MongoClient, ObjectId} from "mongodb";
import {NextApiRequest, NextApiResponse} from "next";
export default async function handler (req:NextApiRequest, res: NextApiResponse){
    if(req.method === 'PUT'){
        try{
            const client = await MongoClient.connect("mongodb+srv://test_user:CyIxNuOeNZX4xzmf@mycluster.tw0suos.mongodb.net/?retryWrites=true&w=majority")
            const db = await client.db('todos')
            const todosCollection = await db.collection('todos');
            console.log(req.body);
            //@ts-ignore
            const modifiedTodo = await todosCollection.replaceOne({_id: new ObjectId(req.query.id!)}, {name: req.body.name, status: req.body.status})
            await client.close();

            res.status(200).json({todo: modifiedTodo})
        }
        catch (e) {
            console.error(e);
        }
    }
    if(req.method === 'DELETE'){
        try{
            const client = await MongoClient.connect("mongodb+srv://test_user:CyIxNuOeNZX4xzmf@mycluster.tw0suos.mongodb.net/?retryWrites=true&w=majority")
            const db = await client.db('todos')
            const todosCollection = await db.collection('todos');
            //@ts-ignore
            await todosCollection.deleteOne({_id: new ObjectId(req.query.id!)});
            await client.close();
            res.status(200).json({message: "Item deleted sucessfully"})
        }
        catch (e) {
            console.error(e)
        }
    }
}