import styles from 'highlight.js/styles/night-owl.css';
import { Outlet, useNavigate } from '@remix-run/react';
import Container from '~/core/ui/Container';
import Button from '~/core/ui/Button';
import { Trans } from 'react-i18next/TransWithoutContext';
import {
  ArrowLeftIcon,
  BellIcon
} from '@heroicons/react/24/outline';
export const links = () => {
  return [
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
};

export default function Content() {
  const navigate = useNavigate();
  return <div className='flex justify-center'>
    <div className='prose lg:prose-xl py-10 dark:prose-invert'>
      <Container>
        <div className='flex items-center justify-between relative mx-auto max-w-7xl mb-10 mt-24 lg:mb-24'>
          <div className='max-w-xs flex items-center'>
            <ArrowLeftIcon className={'h-6'} onClick={() => navigate('/tutorials')} />
            <span className='ml-2'>Retour</span>
          </div>
          <Button className=''>
            <BellIcon className='h-6' />
            Mettre à jour ce contenu !
          </Button>
        </div>
        <Outlet />
      </Container>
    </div >
  </div>;
}
