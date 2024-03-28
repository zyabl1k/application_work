import { Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

export const ApplicationEntity = ({ title, date, id }) => {
  const navigate = useNavigate();

  return (
    <li className="bg-blue-300 rounded flex justify-between px-4 py-2">
      <div>
        <p className="text-xl font-bold">{title}</p>
        <p className="text-sm">Дата: {date}</p>
      </div>
      <Button onClick={() => navigate(`/app/${id}`)}>Вперед</Button>
    </li>
  );
};
