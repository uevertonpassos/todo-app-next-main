import Head from 'next/head'
import ThemeProvider from "@/context/ThemeProvider";
import MainApp from "@/components/MainApp";
import {MongoClient} from "mongodb";
import {resetServerContext} from "react-beautiful-dnd";
import {Todo} from "@/types/types";
interface HomeProps {
    myTodos: Todo[]
}
export default function Home(props:HomeProps) {
    return (
        <ThemeProvider>
            <Head>
                <title>Todo app</title>
                <meta name="description" content="Todo app built with nextjs"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <MainApp todos={props.myTodos}/>
        </ThemeProvider>
)
}
export const getStaticProps = async () => {
    try{
        const client = await MongoClient.connect("mongodb+srv://test_user:CyIxNuOeNZX4xzmf@mycluster.tw0suos.mongodb.net/?retryWrites=true&w=majority")
        const db = await client.db('todos')
        const todosCollection = await db.collection('todos');
        const allTodos = await todosCollection.find({}).toArray();
        await client.close();
        resetServerContext();
        return{
            props: {
                myTodos: allTodos.map(myTodo => {
                    return{
                        name: myTodo.name,
                        status: myTodo.status,
                        id: myTodo._id.toString()
                    }
                })
            },
            revalidate: 1
        }
    }
    catch (e){
        console.error(e);
    }
}
