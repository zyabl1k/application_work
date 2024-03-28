import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import ModalWindowWidget from '../../widgets/modalWindow/modalWindow.widget.jsx';
import { ModalFormWidget } from '../../widgets/forms/modalForm.widget.jsx';
import { $api } from '../../shared/axios.js';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRemoveApp } from '../../app/store/slices/apps.slice.js';

const SecondView = () => {
  const [isModal, setIsModal] = useState(false);
  const [app, setApp] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { appId } = useParams();

  useEffect(() => {
    async function fetchData() {
      const { data } = await $api.get(`app/${appId}`);
      setApp(data.application);
      setIsLoading(false);
    }
    fetchData().catch((e) => console.log(e));
  }, [appId]);

  const deleteApp = async () => {
    if (window.confirm('Are u sure?')) {
      await dispatch(fetchRemoveApp(appId));
      navigate('/');
    }
  };

  const refactorApp = async (title) => {
    await $api.put(`app/${appId}`, { applicationName: title });
    app.name = title;
    setIsModal(false);
  };

  if (isLoading) return null;

  return (
    <div className="flex flex-col">
      <div className="flex flex-col mb-5">
        <h1 className="font-bold">Данные application:</h1>
        <h2>Name: {app.name}</h2>
        <h2>Date: {app.date}</h2>
      </div>
      <div className="flex flex-col gap-5">
        <Button onClick={() => navigate('/')}>Назад</Button>
        <Button onClick={() => setIsModal(true)}>Редактировать</Button>
        <Button onClick={() => deleteApp()}>Удалить</Button>
      </div>
      <ModalWindowWidget isActive={isModal} onClose={() => setIsModal(false)}>
        <ModalFormWidget saveBtn={refactorApp} />
      </ModalWindowWidget>
    </div>
  );
};

export default SecondView;
