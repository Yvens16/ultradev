import { Link } from '@remix-run/react';
import Container from '~/core/ui/Container';
import LogoImage from '~/core/ui/Logo/LogoImage';
import configuration from '~/configuration';
import Heading from '~/core/ui/Heading';
import NewsletterSignup from '~/components/NewsletterSignup';

const YEAR = new Date().getFullYear();

function Footer() {
  return (
    <footer className={'py-8 lg:py-24'}>
      <Container>
        <div className={'flex flex-col space-y-8 lg:flex-row lg:space-y-0'}>
          <div
            className={
              'flex w-full space-x-2 lg:w-4/12 xl:w-3/12' +
              ' xl:space-x-6 2xl:space-x-8'
            }
          >
            <div className={'flex flex-col space-y-4'}>
              <div>
                <LogoImage className={'w-[85px] md:w-[115px]'} />
              </div>

              <div>
                <p className={'text-sm text-gray-500 dark:text-gray-400'}>
                  Apprendre et gagner le salaire que l'on mérite.
                </p>
              </div>

              <div className={'flex text-xs text-gray-500 dark:text-gray-400'}>
                <p>
                  © Copyright {YEAR} {configuration.site.siteName}. Tous droits réservés.
                </p>
              </div>
            </div>
          </div>

          <div
            className={
              'flex flex-col space-y-8 lg:space-y-0 lg:space-x-6' +
              ' xl:space-x-16 2xl:space-x-20' +
              ' w-full lg:flex-row lg:justify-end'
            }
          >
            <div>
              <div className={'flex flex-col space-y-4'}>
                <Heading type={6}>À propos</Heading>

                <FooterSectionList>
                  <FooterLink>
                    <Link to={'#'}>Qui sommes-nous</Link>
                  </FooterLink>
                  <FooterLink>
                    <Link to={'/blog'}>Blog</Link>
                  </FooterLink>
                  <FooterLink>
                    <Link to={'/contact'}>Contacts</Link>
                  </FooterLink>
                </FooterSectionList>
              </div>
            </div>

            <div>
              <div className={'flex flex-col space-y-2.5'}>
                <Heading type={6}>Produit</Heading>

                <FooterSectionList>
                  <FooterLink>
                    <Link to={'/examples'}>Cours gratuits</Link>
                  </FooterLink>
                  <FooterLink>
                    <Link to={'/FAQ'}>FAQ</Link>
                  </FooterLink>
                  <FooterLink>
                    <Link to={'/roadMap'}>RoadMap</Link>
                  </FooterLink>
                </FooterSectionList>
              </div>
            </div>

            <div>
              <div className={'flex flex-col space-y-4'}>
                <Heading type={6}>Légal</Heading>

                <FooterSectionList>
                  <FooterLink>
                    <Link to={'#'}>Conditions d'utilisations</Link>
                  </FooterLink>
                  <FooterLink>
                    <Link to={'#'}>Mentions légales</Link>
                  </FooterLink>
                  <FooterLink>
                    <Link to={'#'}>Protéction des données</Link>
                  </FooterLink>
                  <FooterLink>
                    <Link to={'#'}>Paramétrer les cookies</Link>
                  </FooterLink>
                </FooterSectionList>
              </div>
            </div>

            <NewsletterSignup />
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterSectionList(props: React.PropsWithChildren) {
  return (
    <ul className={'flex flex-col space-y-4 text-gray-500 dark:text-gray-400'}>
      {props.children}
    </ul>
  );
}

function FooterLink(props: React.PropsWithChildren) {
  return (
    <li
      className={
        'text-sm [&>a]:transition-colors [&>a]:hover:text-gray-800' +
        ' dark:[&>a]:hover:text-white'
      }
    >
      {props.children}
    </li>
  );
}

export default Footer;
