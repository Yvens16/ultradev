import React from 'react'
import ChevronRightIcon from "@heroicons/react/24/outline/ChevronRightIcon";
import Button from "~/core/ui/Button";
import SubHeading from '~/core/ui/SubHeading';
import Heading from '~/core/ui/Heading';
import { useNavigate } from "react-router-dom";
import ConvertkitSignupForm from '~/components/newsletter/ConvertkitSignupForm';
import configuration from '~/configuration';


function HeroTitle({ children }: React.PropsWithChildren) {
  return (
    <h1
      className={
        'text-center text-4xl text-black-500 dark:text-white md:text-5xl' +
        ' flex flex-col space-y-1 font-heading xl:text-7xl'
      }
    >
      {children}
    </h1>
  );
}

function waitlist() {
  return (
    <div className='container mx-auto px-5'>

      <div
        className={
          'my-12 flex flex-col items-center md:flex-row lg:my-24' +
          'mx-auto flex-1 justify-center'
        }
      >
        <div className={'flex w-full flex-1 flex-col items-center space-y-10'}>
          <Button variant={'flat'} size={'small'} round>
            <span className={'flex items-center space-x-2 font-normal'}>
              <span>Explore our leading solution</span>

              <ChevronRightIcon className={'h-3'} />
            </span>
          </Button>

          <HeroTitle>
            <span>Tell your visitors why</span>

            <span
              className={
                'bg-gradient-to-br bg-clip-text text-transparent' +
                ' from-primary-500 to-primary-400' +
                ' to-primary-400 leading-[1.2]'
              }
            >
              your SaaS is awesome
            </span>
          </HeroTitle>

          <div
            className={
              'text-center text-gray-500 dark:text-gray-400' +
              ' font-heading flex max-w-lg flex-col space-y-1 md:w-full'
            }
          >
            <span>Here you can write a short description of your SaaS</span>

            <span>This subheading is usually laid out on multiple lines</span>

            <span>Impress your customers, straight to the point.</span>
          </div>

          <div className={'flex items-center space-x-4'}>
            <ConvertkitSignupForm formId={configuration.site.convertKitFormId}>
              Rejoindre la liste d'attente
            </ConvertkitSignupForm>
          </div>
        </div>
      </div>
      <div className='my-12 flex flex-col items-center md:flex-row lg:my-24mx-auto flex-1 justify-center'>
        <HeroTitle>
          <span className='mb-[16px] lg:mb-[40px] text-primary'>Essaye l'un de nos cours</span>
          <span>gratuitement</span>
        </HeroTitle>
      </div>
      <FeaturesList />
    </div>
  )
}


function FeaturesList() {
  const navigate = useNavigate();

  return (
    <div className={'flex flex-col space-y-16 lg:space-y-24'}>
      <div
        onClick={() => navigate("/")}
        className={
          'flex flex-col lg:flex-row items-center justify-between px-4 lg:space-x-8 lg:px-24 cursor-pointer'
        }
      >
        <div className={'relative  lg:h-80 lg:w-6/12 lg:hidden'}>
          <img
            className={'object-cover'}
            alt={''}
            src={
              '/assets/images/nextjs_free.png'
            }
          />
        </div>
        <div className={'flex w-full flex-col space-y-4 lg:w-6/12 lg:px-8'}>

          <Heading type={2}>NextJs 13 et son nouveau App directory</Heading>

          <SubHeading>
            Créez une application super rapide en utilisant la toute nouvelle version de NextJs.
          </SubHeading>

          <div className={'text-gray-500 dark:text-gray-400'}>
            Next.js 13 introduit the nouvelle App Router crée pour améliorer les performances de votre application.
            Vous pourrez utiliser les Server Component, les layouts, les routes imbriquées, les loading, (errors et  handling) states et bien plus encore.
          </div>
        </div>

        <div className={'relative hidden h-80 lg:w-6/12 flex-1 lg:flex'}>
          <img
            className={'object-cover'}
            alt={''}
            src={
              '/assets/images/nextjs_free.png'
            }
          />
        </div>
      </div>

      <div
        onClick={() => navigate("/")}
        className={
          'flex flex-col lg:flex-row items-center justify-between px-4 lg:space-x-8 lg:px-24 cursor-pointer'
        }
      >
        <div className={'relative  lg:h-80 lg:w-6/12 lg:flex'}>
          <img
            className={'object-cover'}
            alt={''}
            src={
              '/assets/images/angular_poster.png'
            }
          />
        </div>

        <div className={'flex w-full flex-col space-y-4 lg:w-6/12 lg:px-8'}>
          <Heading type={2}>Apprend Angular, très utiliser dans les grandes entreprises</Heading>

          <SubHeading>
            Angular est un framework open source développé par Google. Il est utilisé pour créer des applications web et mobiles.
          </SubHeading>

          <div className={'text-gray-500 dark:text-gray-400'}>
            Angular est très orienté  dans sa manière de voir la construction d'une application.
            Cela veut dire qu'il y aura toujours une "bonne manière" de faire les choses qui vous sera conseillé.
            Ce qui veut dire que toutes les applications rencontrées seront construites de la même manière.
            Et ça c'est plutôt cool quand on change de projet.
          </div>
        </div>
      </div>

      <div
        onClick={() => navigate("/")}
        className={
          'flex flex-col lg:flex-row items-center justify-between px-4 lg:space-x-8 lg:px-24 cursor-pointer'
        }
      >
        <div className={'relative  lg:h-80 lg:w-6/12 lg:hidden'}>
          <img
            className={'object-cover'}
            alt={''}
            src={
              '/assets/images/typescript_poster.png'
            }
          />
        </div>
        <div className={'flex w-full flex-col space-y-4 lg:w-6/12 lg:px-8'}>

          <Heading type={2}>Apprendre Typescript pour un code plus safe</Heading>

          <SubHeading>
            Avec le typage statique, il est possible de détecter des erreurs pendant la phase de développement, bien avant l'exécution.
          </SubHeading>

          <div className={'text-gray-500 dark:text-gray-400'}>
            Avoir un code typé est un avantage pour les développeurs. Cela permet de marquer ses intentions et de les partager avec les autres développeurs.
            Vous pourrez gagner en productivité avec un code plus maintenable.
          </div>
        </div>

        <div className={'relative hidden  h-80 lg:w-6/12 flex-1 lg:flex'}>
          <img
            className={'object-cover'}
            alt={''}
            src={
              '/assets/images/typescript_poster.png'
            }
          />
        </div>
      </div>

      <div
        onClick={() => navigate("/")}
        className={
          'flex flex-col lg:flex-row items-center justify-between px-4 lg:space-x-8 lg:px-24 cursor-pointer'
        }
      >
        <div className={'relative  lg:h-80 lg:w-6/12 lg:flex'}>
          <img
            className={'object-cover'}
            alt={''}
            src={
              '/assets/images/algo_poster.png'
            }
          />
        </div>

        <div className={'flex w-full flex-col space-y-4 lg:w-6/12 lg:px-8'}>
          <Heading type={2}>Une bonne connaissance de l'algorithmie est primordiale</Heading>

          <SubHeading>
            Vous passez 80% de votre temps à lire du code et 20% à l'écrire. Il est donc très important de le comprendre pour le manipuler.
          </SubHeading>

          <div className={'text-gray-500 dark:text-gray-400'}>
            La plupart des entretiens techniques se basent sur l'algorithmie. Il est donc important de bien comprendre les bases.
            Mais le plus important va bien sûr être la capacité à résoudre des problèmes.
          </div>
        </div>
      </div>
    </div>
  );
}

export default waitlist;