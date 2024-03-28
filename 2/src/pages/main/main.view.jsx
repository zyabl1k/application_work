import { useNavigate } from 'react-router-dom';
import { Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import ModalWindowWidget from '../../widgets/modalWindow/modalWindow.widget.jsx';
import { ModalFormWidget } from '../../widgets/forms/modalForm.widget.jsx';
import { ApplicationEntity } from '../../entities/application.entity.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApps } from '../../app/store/slices/apps.slice.js';
import { $api } from '../../shared/axios.js';

const MainView = () => {
  const [isModal, setIsModal] = useState(false);
  const dispatch = useDispatch();
  const { apps } = useSelector((state) => state.apps);
  const navigate = useNavigate();

  const isAppsLoading = apps.status === 'loading';

  useEffect(() => {
    dispatch(fetchApps());
  }, []);

  const saveApp = async (name) => {
    try {
      const { data } = await $api.post('create', { applicationName: name });
      const id = data.app;
      navigate(`app/${id}`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex gap-5 flex-col w-full justify-center items-center">
      <Button onClick={() => setIsModal(true)}>Создать</Button>
      <ul className="flex flex-col w-[80%] gap-4">
        {(isAppsLoading ? Array() : apps.items).map((app) => (
          <ApplicationEntity
            key={app.id}
            title={app.name}
            date={app.date}
            id={app.id}
          />
        ))}
      </ul>
      <ModalWindowWidget isActive={isModal} onClose={() => setIsModal(false)}>
        <ModalFormWidget saveBtn={saveApp} />
      </ModalWindowWidget>
    </div>
  );
};

export default MainView;
