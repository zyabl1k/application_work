import {Button} from "flowbite-react";

export const Application = ({title, date, id}) => {
    return (
        <div className="w-80 border-2 border-solid border-blue-400">
            <li className="bg-blue-300 rounded flex justify-between px-4 py-2" key={app.id}>
                <div>
                    <p className='text-xl font-bold'>{app.name}</p>
                    <p className="text-sm">Дата: {app.date}</p>
                </div>
                <Button onClick={() => navigate(`/app/${app.id}`)}>Вперед</Button>
            </li>
        </div>
    )
}