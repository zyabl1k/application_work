import { useParams } from 'react-router-dom';

export const HeaderWidget = () => {
  const { appId } = useParams();

  return (
    <div>
      <h1 className="text-2xl text-center bg-blue-300 py-2 mb-5">
        {appId ? appId : 'Все приложения'}
      </h1>
    </div>
  );
};
