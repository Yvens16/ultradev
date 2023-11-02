import {
  CubeIcon,
  DocumentIcon,
  ChevronRightIcon,
  RocketLaunchIcon,
  BookOpenIcon,
  ClockIcon,
  CalendarDaysIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import {hello} from "@domain/test";
// import firebaseLogo from '~/assets/logo_language/firebase.svg';
// import reactLogo from './logo_language/react.svg';
// import angularLogo from './logo_language/angular.svg';
// import springLogo from './logo_language/spring.svg';
// import flutterLogo from './logo_language/flutter.svg';
// import vueLogo from './logo_language/vuejs.svg';
// import tailwindLogo from './logo_language/tailwind.svg';



import Heading from '~/core/ui/Heading';
import Button from '~/core/ui/Button';
import Hero from '~/core/ui/Hero';
import SubHeading from '~/core/ui/SubHeading';

import Divider from '~/core/ui/Divider';
import Container from '~/core/ui/Container';
import SlideUpTransition from '~/core/ui/SlideUpTransition';


const COLORS = {
  "teal": "text-[#2CD3E1]",
  "pink": "text-[#FC62D6]",
  "orange": "text-[#FC6D26]",
  "red": "text-[#F51F02]",
  "light_purple": "text-[#D7BBF5]",
  "purple": "text-[#6528F7]",
  "dark_teal": "text-[#35A29F]",
  "bright_yellow": "text-[#FFEA20]"
}

import { ReactNode } from 'react';
import NewsletterSignup from '~/components/NewsletterSignup';
import ConvertkitSignupForm from '~/components/newsletter/ConvertkitSignupForm';
import configuration from '~/configuration';


const ColoredSpan = ({ color, children }: { color: string, children: ReactNode }) => <span className={`${color}`}>{children}</span>;

export default function Index() {
  console.log("@@@@@@@@@@", hello)
  return (
    <div>
      <Container>
        <SlideUpTransition>
          <div
            className={
              'my-12 flex flex-col items-center md:flex-row lg:my-24' +
              ' mx-auto flex-1 justify-center'
            }
          >
            <div
              className={'flex w-full flex-1 flex-col items-center space-y-10'}
            >
              <Button variant={'flat'} size={'small'} round>
                <span className={'flex items-center space-x-2 font-normal'}>
                  <span>Le moyen le plus rapide d'obtenir le poste que tu veux {hello}</span>

                  <ChevronRightIcon className={'h-3'} />
                </span>
              </Button>

              <HeroTitle>
                <span>Apprend à coder</span>

                <span
                  className={
                    'bg-gradient-to-br bg-clip-text text-transparent' +
                    ' from-primary-500 to-primary-400' +
                    ' to-primary-400 leading-[1.2]'
                  }
                >
                  3x plus vite
                </span>
              </HeroTitle>

              <div
                className={
                  'text-center text-gray-500 dark:text-gray-400' +
                  ' flex w-10/12 flex-col space-y-1 font-heading md:w-full'
                }
              >
                <span>Des tutoriels court mais complets directement dans VS Code</span>

                <span>
                  plutôt qu’une vidéo interminable.
                </span>

              </div>

              <div className={'flex space-x-4'}>
                <ConvertkitSignupForm formId={configuration.site.convertKitFormId}>
                  Rejoindre la liste d'attente
                </ConvertkitSignupForm>
                {/* <Button round href={'/auth/sign-up'}>
                  <span className={'flex items-center space-x-2'}>
                    <span>Essayer Gratuitement</span>

                    <ChevronRightIcon className={'h-3'} />
                  </span>
                </Button> */}

              </div>
            </div>
          </div>

          <div className={'flex justify-between my-12 flex-wrap'}>
            <img className='' width={40} height={40} src={`/assets/logo_language/firebase.svg`} alt="firebase logo" />
            <img className='' width={40} height={40} src={`/assets/logo_language/angular.svg`} alt="angular logo" />
            <img className='' width={40} height={40} src={`/assets/logo_language/flutter.svg`} alt="flutter logo" />
            <img className='' width={40} height={40} src={`/assets/logo_language/react.svg`} alt="react logo" />
            <img className='' width={40} height={40} src={`/assets/logo_language/spring.svg`} alt="spring logo" />
            <img className='' width={40} height={40} src={`/assets/logo_language/typescript.svg`} alt="typescript logo" />
            <img className='' width={40} height={40} src={`/assets/logo_language/vuejs.svg`} alt="vuejs logo" />
          </div>

          <div className={'flex justify-center py-12'}>
            <img
              decoding={'async'}
              loading={'lazy'}
              className={
                'hero-image-shadow rounded-2xl' +
                ' shadow-primary-500/40 dark:shadow-primary-500/30'
              }
              width={2894}
              height={1950}
              src={`/assets/images/dashboard-dark.webp`}
              alt={`App`}
            />
          </div>
        </SlideUpTransition>
      </Container>

      <Divider />

      <Container>
        <div
          className={
            'flex flex-col items-center justify-center space-y-24 py-12'
          }
        >
          {/* <div
            className={
              'flex max-w-3xl flex-col items-center space-y-4 text-center'
            }
          >
            <div className={'flex flex-col items-center space-y-2'}>
              <div>
                <FireIcon className={'h-6 text-primary-500'} />
              </div>

              <b className={'text-primary-500'}>Fonctionnalités</b>
            </div>

            <Hero>Ne plus se soucier du marché</Hero>

            <SubHeading>
              Unbeatable Features and Benefits for Your SaaS Business
            </SubHeading>
          </div> */}

          <div>
            <div className={'grid gap-12 lg:grid-cols-3'}>
              <div className={'flex flex-col space-y-3 text-center'}>
                <FeatureIcon>
                  <RocketLaunchIcon className={'h-6'} />
                </FeatureIcon>

                <Heading type={3}>Apprendre devrait être  <ColoredSpan color={COLORS.teal}>rapide et efficace</ColoredSpan></Heading>

                <div className={'text-gray-500 dark:text-gray-400'}>
                  Soit stratégique: Sois <ColoredSpan color={COLORS.teal}>paresseux</ColoredSpan> et intelligent, pense <ColoredSpan color={COLORS.teal}>80/20</ColoredSpan>
                </div>
              </div>

              <div className={'flex flex-col space-y-3 text-center'}>
                <FeatureIcon>
                  <BookOpenIcon className={'h-6'} />
                </FeatureIcon>

                <Heading type={3}>Tu vas bien <ColoredSpan color={COLORS.pink}>plus vite</ColoredSpan> qu’une vidéo</Heading>

                <div className={'text-gray-500 dark:text-gray-400'}>
                  Un tuto vidéo c’est environ <ColoredSpan color={COLORS.pink}>110-150 mots/min</ColoredSpan>.
                  Tu es capable de lire à une vitesse de <ColoredSpan color={COLORS.pink}>250-300 mots/min</ColoredSpan>.
                </div>
              </div>

              <div className={'flex flex-col space-y-3 text-center'}>
                <FeatureIcon>
                  <ClockIcon className={'h-6'} />
                </FeatureIcon>

                <Heading type={3}>Gain de <ColoredSpan color={COLORS.orange}>temps</ColoredSpan> </Heading>

                <div className={'text-gray-500 dark:text-gray-400'}>
                  Apprends plus vite pour reprendre le <ColoredSpan color={COLORS.orange}>contrôle de ton temps</ColoredSpan>.
                  <br />
                  <br />
                  Tu devrais avoir du <ColoredSpan color={COLORS.orange}>temps libre</ColoredSpan> pour faire ce que tu préfère faire ! <ColoredSpan color={COLORS.red}><span className='line-through'>(TRAVAILLER)</span></ColoredSpan> 🙅‍♂️
                </div>
              </div>

              <div className={'flex flex-col space-y-3 text-center'}>
                <FeatureIcon>
                  <CalendarDaysIcon className={'h-6'} />
                </FeatureIcon>

                <Heading type={3}>Le temps est <ColoredSpan color={COLORS.light_purple}>limlité</ColoredSpan> </Heading>

                <div className={'text-gray-500 dark:text-gray-400'}>
                  Nous avons tous le même temps disponible <ColoredSpan color={COLORS.light_purple}>chaque semaine</ColoredSpan>.
                  <br />
                  <br />
                  Le meilleur moyen d’avoir plus d’impact n’est pas de dépenser plus de temps mais <ColoredSpan color={COLORS.light_purple}>d’optimiser celui qu’on à déjà à disposition</ColoredSpan>.
                </div>
              </div>

              <div className={'flex flex-col space-y-3 text-center'}>
                <FeatureIcon>
                  <ArrowPathIcon className={'h-6'} />
                </FeatureIcon>

                <Heading type={3}>Toujours <ColoredSpan color={COLORS.dark_teal}> à jour</ColoredSpan> !</Heading>

                <div className={'text-gray-500 dark:text-gray-400'}>
                  Tu pense qu’une ressource <ColoredSpan color={COLORS.dark_teal}>n’est pas à jour</ColoredSpan> sur la dernière version ?
                  <br />
                  <br />
                  Demande en un click <ColoredSpan color={COLORS.dark_teal}>une mise à jour</ColoredSpan> de la dite ressource !
                </div>
              </div>

              {/* <div className={'flex flex-col space-y-3 text-center'}>
                <FeatureIcon>
                  <DocumentIcon className={'h-6'} />
                </FeatureIcon>

                <Heading type={3}>Blog and Documentation</Heading>

                <div className={'text-gray-500 dark:text-gray-400'}>
                  Pre-built Blog and Documentation Pages to Help Your Users
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </Container>

      <Divider />

      <Container>
        <div
          className={
            'flex flex-col items-center justify-center space-y-24 py-12'
          }
        >
          <div
            className={
              'flex max-w-3xl flex-col items-center space-y-4 text-center'
            }
          >
            <Hero>Une communauté pour t”épauler</Hero>
          </div>
          <div className='grid gap-12 lg:grid-cols-3'>
            <div className={'flex flex-col space-y-3 text-left lg:text-center'}>
              <div>
                <Heading type={3}>Entre-aide est le mot d’ordre !</Heading>
                <div className='text-[18px] font-semibold'><ColoredSpan color={COLORS.bright_yellow}>Coming Soon</ColoredSpan></div>
              </div>

              <div className={'text-gray-500 dark:text-gray-400'}>
                Nous sommes une grande équipe, n’hésite pas à te reposer les membres de la communauté.
              </div>
            </div>
            <div className={'flex flex-col space-y-3 text-left lg:text-center'}>
              <div>
                <Heading type={3}>Préparation aux entretiens</Heading>
                <div className='text-[18px] font-semibold'><ColoredSpan color={COLORS.bright_yellow}>Coming Soon</ColoredSpan></div>
              </div>

              <div className={'text-gray-500 dark:text-gray-400'}>
                Une suite de conseils et d’entrainement pour réussir son entretien d’embauche. (Technique et soft skills)
              </div>
            </div>
            <div className={'flex flex-col space-y-3 text-left lg:text-center'}>
              <div>
                <Heading type={3}>Job board</Heading>
                <div className='text-[18px] font-semibold'><ColoredSpan color={COLORS.bright_yellow}>Coming Soon</ColoredSpan></div>
              </div>

              <div className={'text-gray-500 dark:text-gray-400'}>
                Liste d’opportunité pour augmenter ton salaire ou obtenir ton 1er job.
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Divider />

      <Container>
        <div className={'py-12'}>
          <div
            className={
              'flex flex-col justify-between rounded-lg lg:flex-row' +
              ' space-y-4 bg-primary-50 px-8 py-10 dark:bg-primary-500/5' +
              ' lg:space-y-0'
            }
          >
            <div className={'flex flex-col justify-between space-y-2'}>
              <Heading type={3}>
                <p className={'text-gray-800 dark:text-white'}>
                  La communauté que tu attendais.
                </p>
              </Heading>

              <Heading type={4}>
                <p className={'text-primary-500'}>Rejoins la liste d'attente.</p>
              </Heading>
            </div>

            <div className={'flex flex-col justify-end space-y-2'}>
              <div>
                <Button
                  className={'w-full lg:w-auto'}
                  size={'large'}
                  href={'/waitlist'}
                >
                  Essayer gratuitement
                </Button>
              </div>

              <div className="flex flex-col space-y-2 text-center">
                <span className={'text-xs'}>Carte de crédit non requise</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

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

function FeatureIcon(props: React.PropsWithChildren) {
  return (
    <div className={'flex justify-center'}>
      <div
        className={'rounded-xl bg-primary-500/10 p-4 dark:bg-primary-500/20'}
      >
        {props.children}
      </div>
    </div>
  );
}
