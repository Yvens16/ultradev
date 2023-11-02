import ConvertkitSignupForm from '~/components/newsletter/ConvertkitSignupForm';
import configuration from '~/configuration';
import Heading from '~/core/ui/Heading';

function NewsletterSignup() {
  return (
    <div className={'flex flex-col space-y-4'}>
      <div>
        <Heading type={6}>Rejoindre la liste d'attente</Heading>

        <div className={'text-sm text-gray-500 dark:text-gray-400'}>
          Recevoir les mises à jour sur le lancement de la plateforme.
        </div>
      </div>

      <div>
        <ConvertkitSignupForm formId={configuration.site.convertKitFormId}>
          Rejoindre la liste d'attente
        </ConvertkitSignupForm>
      </div>
    </div>
  );
}

export default NewsletterSignup;
